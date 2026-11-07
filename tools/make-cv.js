#!/usr/bin/env node
/**
 * Generates the downloadable CV in two formats from src/data/cv.js:
 *
 *   public/assets/docs/Tshivhidzo-Mbedzi-CV.docx   (ATS primary)
 *   public/assets/docs/Tshivhidzo-Mbedzi-CV.md     (plain text / paste-anywhere)
 *
 * WHY WRITE THE .DOCX BY HAND
 * A .docx is a ZIP of XML parts. Node ships zlib, so the whole format is reachable with no
 * dependency at all — which keeps this project installable offline and keeps the build
 * auditable. It also means the generated file contains exactly the markup written here:
 * no tables, no text boxes, no columns, no headers/footers, no drawing objects. Those are
 * the five things applicant tracking systems most reliably mangle or skip, and a .docx
 * produced by a template or a converter usually contains several of them.
 *
 * The HTML CV page and this file read the SAME data module, so the downloaded CV can never
 * drift from the published one.
 *
 * PDF: deliberately not generated here. Converting .docx to PDF needs Word or LibreOffice,
 * neither of which is guaranteed on this machine, and a hand-rolled PDF writer would not
 * produce a better document than the browser does. The /cv/ page carries a print stylesheet,
 * so "Print -> Save as PDF" gives a clean single-column PDF from any browser. See README.
 *
 * Usage: node tools/make-cv.js
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { deflateRawSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import cv from '../src/data/cv.js';
import profile from '../src/data/profile.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'assets', 'docs');

/* ───────────────────────────── minimal ZIP writer ───────────────────────────── */

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

/**
 * Build a ZIP archive from [{ name, data }].
 * Fixed DOS timestamp so the output is byte-identical between runs, which makes the
 * generated file diffable and keeps it out of noisy version-control churn.
 */
function zip(entries) {
  const DOS_TIME = 0x6000; // 12:00:00
  const DOS_DATE = 0x5921; // 2024-09-01
  const locals = [];
  const centrals = [];
  let offset = 0;

  for (const entry of entries) {
    const name = Buffer.from(entry.name, 'utf8');
    const raw = Buffer.isBuffer(entry.data) ? entry.data : Buffer.from(entry.data, 'utf8');
    const deflated = deflateRawSync(raw, { level: 9 });
    const useDeflate = deflated.length < raw.length;
    const data = useDeflate ? deflated : raw;
    const method = useDeflate ? 8 : 0;
    const crc = crc32(raw);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0, 6); // flags
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(DOS_TIME, 10);
    local.writeUInt16LE(DOS_DATE, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, name, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4); // version made by
    central.writeUInt16LE(20, 6); // version needed
    central.writeUInt16LE(0, 8); // flags
    central.writeUInt16LE(method, 10);
    central.writeUInt16LE(DOS_TIME, 12);
    central.writeUInt16LE(DOS_DATE, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(raw.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30); // extra
    central.writeUInt16LE(0, 32); // comment
    central.writeUInt16LE(0, 34); // disk start
    central.writeUInt16LE(0, 36); // internal attrs
    central.writeUInt32LE(0, 38); // external attrs
    central.writeUInt32LE(offset, 42);
    centrals.push(central, name);

    offset += local.length + name.length + data.length;
  }

  const centralBuf = Buffer.concat(centrals);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(centralBuf.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([...locals, centralBuf, eocd]);
}

/* ───────────────────────────── WordprocessingML ───────────────────────────── */

const X = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    // Word rejects these; they can arrive from copied prose.
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '');

/** A paragraph. `style` is a style id defined in styles.xml. */
function p(text, { style = 'Normal', bold = false, spaceAfter = null, italic = false } = {}) {
  const pPr = [
    `<w:pStyle w:val="${style}"/>`,
    spaceAfter !== null ? `<w:spacing w:after="${spaceAfter}"/>` : '',
  ].join('');
  const rPr = [bold ? '<w:b/>' : '', italic ? '<w:i/>' : ''].join('');
  return (
    `<w:p><w:pPr>${pPr}</w:pPr>` +
    `<w:r>${rPr ? `<w:rPr>${rPr}</w:rPr>` : ''}` +
    `<w:t xml:space="preserve">${X(text)}</w:t></w:r></w:p>`
  );
}

/** A bulleted list item. Uses a real numbering definition so Word shows a bullet glyph. */
function bullet(text) {
  return (
    `<w:p><w:pPr><w:pStyle w:val="ListParagraph"/>` +
    `<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>` +
    `<w:spacing w:after="60"/></w:pPr>` +
    `<w:r><w:t xml:space="preserve">${X(text)}</w:t></w:r></w:p>`
  );
}

/** Collapse authored prose (wrapped for readability) into paragraphs. */
function paras(text, opts) {
  return String(text)
    .split(/\n\s*\n/)
    .map((s) => s.trim().replace(/\s*\n\s*/g, ' '))
    .filter(Boolean)
    .map((s) => p(s, opts))
    .join('');
}

function documentXml() {
  const body = [];

  // ── header block
  body.push(p(cv.name, { style: 'CVName' }));
  body.push(p(cv.headline, { style: 'CVHeadline' }));
  body.push(p(cv.contactLine.join('  |  '), { style: 'CVContact' }));
  body.push(p(cv.availability, { style: 'CVContact', spaceAfter: 260 }));

  // ── summary
  body.push(p('PROFESSIONAL SUMMARY', { style: 'Heading1' }));
  body.push(paras(cv.summary));

  // ── experience
  body.push(p('PROFESSIONAL EXPERIENCE', { style: 'Heading1' }));
  body.push(
    p(
      'All roles below are independent and self-employed. I have no commercial employment history in software, and this CV does not imply otherwise.',
      { style: 'Normal', italic: true, spaceAfter: 200 },
    ),
  );

  for (const r of cv.experience) {
    body.push(p(`${r.title}`, { style: 'Heading2' }));
    body.push(p(`${r.org} | ${r.location} | ${r.from} – ${r.to}`, { style: 'CVMeta' }));
    body.push(p(r.context, { style: 'Normal', spaceAfter: 80 }));
    for (const b of r.bullets) body.push(bullet(b));
    body.push(p('', { style: 'Normal', spaceAfter: 120 }));
  }

  // ── education
  body.push(p('EDUCATION', { style: 'Heading1' }));
  for (const e of cv.education) {
    body.push(p(e.qualification, { style: 'Heading3' }));
    body.push(p(`${e.institution} | ${e.location} | ${e.date}`, { style: 'CVMeta' }));
    if (e.detail) body.push(p(e.detail, { style: 'Normal', italic: true, spaceAfter: 140 }));
  }

  // ── CPD
  body.push(p('CONTINUING PROFESSIONAL DEVELOPMENT', { style: 'Heading1' }));
  for (const d of cv.development) {
    body.push(p(d.item, { style: 'Heading3' }));
    body.push(p(`${d.date} — ${d.status}`, { style: 'CVMeta', spaceAfter: 140 }));
  }

  // ── skills
  body.push(p('SKILLS', { style: 'Heading1' }));
  for (const g of cv.skillGroups) {
    body.push(p(g.group, { style: 'Heading3' }));
    body.push(p(g.items, { style: 'Normal', spaceAfter: 140 }));
  }

  // ── statement
  body.push(p('STATEMENT ON WORKING METHOD', { style: 'Heading1' }));
  body.push(paras(cv.statement));

  // ── references
  body.push(p('REFERENCES', { style: 'Heading1' }));
  body.push(p(cv.referees));

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>${body.join('')}
<w:sectPr>
  <w:pgSz w:w="11906" w:h="16838"/>
  <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="0" w:footer="0" w:gutter="0"/>
</w:sectPr>
</w:body>
</w:document>`;
}

function stylesXml() {
  const style = (id, name, { size, bold, color, before, after, caps, italic, outline } = {}) => `
  <w:style w:type="paragraph" w:styleId="${id}">
    <w:name w:val="${name}"/>
    <w:qFormat/>
    ${outline !== undefined ? `<w:pPr><w:outlineLvl w:val="${outline}"/>` : '<w:pPr>'}
      ${before !== undefined || after !== undefined
        ? `<w:spacing${before !== undefined ? ` w:before="${before}"` : ''}${
            after !== undefined ? ` w:after="${after}"` : ''
          }/>`
        : ''}
    </w:pPr>
    <w:rPr>
      ${bold ? '<w:b/>' : ''}
      ${italic ? '<w:i/>' : ''}
      ${caps ? '<w:caps/>' : ''}
      ${color ? `<w:color w:val="${color}"/>` : ''}
      ${size ? `<w:sz w:val="${size}"/><w:szCs w:val="${size}"/>` : ''}
    </w:rPr>
  </w:style>`;

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault><w:rPr>
      <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>
      <w:sz w:val="21"/><w:szCs w:val="21"/>
    </w:rPr></w:rPrDefault>
    <w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/><w:qFormat/>
  </w:style>
  ${style('Heading1', 'heading 1', { size: 24, bold: true, color: '1F4E79', before: 280, after: 140, outline: 0 })}
  ${style('Heading2', 'heading 2', { size: 23, bold: true, before: 200, after: 20, outline: 1 })}
  ${style('Heading3', 'heading 3', { size: 21, bold: true, before: 120, after: 20, outline: 2 })}
  ${style('CVName', 'CV Name', { size: 44, bold: true, after: 40 })}
  ${style('CVHeadline', 'CV Headline', { size: 23, color: '1F4E79', after: 100 })}
  ${style('CVContact', 'CV Contact', { size: 19, color: '444444', after: 40 })}
  ${style('CVMeta', 'CV Meta', { size: 19, bold: false, color: '444444', after: 60 })}
  <w:style w:type="paragraph" w:styleId="ListParagraph">
    <w:name w:val="List Paragraph"/><w:qFormat/>
    <w:pPr><w:ind w:left="360" w:hanging="180"/><w:contextualSpacing/></w:pPr>
  </w:style>
</w:styles>`;
}

function numberingXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="0">
    <w:multiLevelType w:val="hybridMultilevel"/>
    <w:lvl w:ilvl="0">
      <w:start w:val="1"/>
      <w:numFmt w:val="bullet"/>
      <w:lvlText w:val="&#8226;"/>
      <w:lvlJc w:val="left"/>
      <w:pPr><w:ind w:left="360" w:hanging="180"/></w:pPr>
      <w:rPr><w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/></w:rPr>
    </w:lvl>
  </w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
</w:numbering>`;
}

function docxBuffer() {
  return zip([
    {
      name: '[Content_Types].xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`,
    },
    {
      name: '_rels/.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`,
    },
    {
      name: 'word/_rels/document.xml.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>`,
    },
    { name: 'word/document.xml', data: documentXml() },
    { name: 'word/styles.xml', data: stylesXml() },
    { name: 'word/numbering.xml', data: numberingXml() },
    {
      name: 'docProps/core.xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
  xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${X(cv.name)} — Curriculum Vitae</dc:title>
  <dc:subject>${X(cv.headline)}</dc:subject>
  <dc:creator>${X(cv.name)}</dc:creator>
  <cp:keywords>AI evaluation, AI quality assurance, generative AI, LLM applications, AI workflow automation, software testing, IT support, information security, product development, remote</cp:keywords>
  <dc:description>ATS-compatible CV. Single column, standard headings, no tables or graphics.</dc:description>
  <cp:lastModifiedBy>${X(cv.name)}</cp:lastModifiedBy>
</cp:coreProperties>`,
    },
    {
      name: 'docProps/app.xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
  <Application>Portfolio CV generator (zero-dependency)</Application>
  <Company>MCP Labs</Company>
</Properties>`,
    },
  ]);
}

/* ───────────────────────────── Markdown / plain text ───────────────────────────── */

function markdown() {
  const flat = (t) =>
    String(t)
      .split(/\n\s*\n/)
      .map((s) => s.trim().replace(/\s*\n\s*/g, ' '))
      .filter(Boolean);

  const L = [];
  L.push(`# ${cv.name}`, '', `**${cv.headline}**`, '', cv.contactLine.join(' · '), '', `*${cv.availability}*`, '');

  L.push('## Professional Summary', '');
  flat(cv.summary).forEach((s) => L.push(s, ''));

  L.push('## Professional Experience', '');
  L.push(
    '*All roles below are independent and self-employed. I have no commercial employment history in software, and this CV does not imply otherwise.*',
    '',
  );
  for (const r of cv.experience) {
    L.push(`### ${r.title}`);
    L.push(`${r.org} | ${r.location} | ${r.from} – ${r.to}`, '');
    L.push(r.context, '');
    r.bullets.forEach((b) => L.push(`- ${b}`));
    L.push('');
  }

  L.push('## Education', '');
  for (const e of cv.education) {
    L.push(`**${e.qualification}**`);
    L.push(`${e.institution} | ${e.location} | ${e.date}`);
    if (e.detail) L.push(`*${e.detail}*`);
    L.push('');
  }

  L.push('## Continuing Professional Development', '');
  for (const d of cv.development) {
    L.push(`**${d.item}**`);
    L.push(`${d.date} — ${d.status}`, '');
  }

  L.push('## Skills', '');
  for (const g of cv.skillGroups) L.push(`**${g.group}:** ${g.items}`, '');

  L.push('## Statement on Working Method', '');
  flat(cv.statement).forEach((s) => L.push(s, ''));

  L.push('## References', '', cv.referees, '');

  return L.join('\n');
}

/* ───────────────────────────── run ───────────────────────────── */

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const docx = docxBuffer();
  const docxPath = join(OUT_DIR, profile.cv.fileName);
  await writeFile(docxPath, docx);

  const md = markdown();
  const mdPath = join(OUT_DIR, profile.cv.mdName);
  await writeFile(mdPath, md, 'utf8');

  console.log(`\n  CV written:`);
  console.log(`    ${docxPath}  (${(docx.length / 1024).toFixed(1)} kB)`);
  console.log(`    ${mdPath}  (${(Buffer.byteLength(md) / 1024).toFixed(1)} kB)`);
  console.log(
    `\n  For a PDF: open /cv/ in a browser and use Print -> Save as PDF.\n` +
      `  The print stylesheet renders it single-column, black on white, without navigation.\n`,
  );
}

main().catch((err) => {
  console.error('CV generation failed:', err);
  process.exit(1);
});
