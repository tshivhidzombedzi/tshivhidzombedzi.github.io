#!/usr/bin/env node
/**
 * Generates public/assets/docs/Tshivhidzo-Mbedzi-CV.pdf from src/data/cv.js.
 *
 * WHY WRITE A PDF BY HAND
 * Converting the .docx needs Word or LibreOffice, neither of which is on this machine, and a
 * headless browser is a 200 MB dependency for one document. A PDF is a text format with an
 * object table at the end, and the base-14 fonts (Helvetica and Helvetica-Bold) are built into
 * every reader, so nothing has to be embedded.
 *
 * ATS READABILITY IS THE POINT
 * The text is written as real PDF text objects, not as an image. An applicant tracking system
 * extracts it the same way a reader selects it. The layout is a single column with standard
 * section headings, no tables, no columns, no text boxes and no graphics — exactly the same
 * constraints as the .docx, for the same reason.
 *
 * Visual direction follows the brief: white background, dark navy headings, charcoal body
 * text, thin grey rules.
 *
 * Usage: node tools/make-pdf.js
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import cv from '../src/data/cv.js';
import profile from '../src/data/profile.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'assets', 'docs', profile.cv.pdfName);

/* ───────────────────────── page geometry (A4, points) ───────────────────────── */

const PW = 595.28;
const PH = 841.89;
const MX = 56;           // left / right margin
const MT = 54;           // top margin
const MB = 54;           // bottom margin
const COL = PW - MX * 2; // usable width

const NAVY = [0.06, 0.11, 0.17];
const CHARCOAL = [0.13, 0.16, 0.22];
const BODY = [0.1, 0.1, 0.12];
const GREY = [0.42, 0.45, 0.5];
const RULE = [0.80, 0.82, 0.85];

/* ───────────────────────── Helvetica widths ─────────────────────────
   Widths from the standard AFM metrics, in 1/1000 em. Needed so that line wrapping
   is correct; guessing an average character width produces ragged or overflowing lines. */

const W_REG = {
  ' ':278,'!':278,'"':355,'#':556,'$':556,'%':889,'&':667,"'":191,'(':333,')':333,'*':389,
  '+':584,',':278,'-':333,'.':278,'/':278,'0':556,'1':556,'2':556,'3':556,'4':556,'5':556,
  '6':556,'7':556,'8':556,'9':556,':':278,';':278,'<':584,'=':584,'>':584,'?':556,'@':1015,
  'A':667,'B':667,'C':722,'D':722,'E':667,'F':611,'G':778,'H':722,'I':278,'J':500,'K':667,
  'L':556,'M':833,'N':722,'O':778,'P':667,'Q':778,'R':722,'S':667,'T':611,'U':722,'V':667,
  'W':944,'X':667,'Y':667,'Z':611,'[':278,'\\':278,']':278,'^':469,'_':556,'`':333,
  'a':556,'b':556,'c':500,'d':556,'e':556,'f':278,'g':556,'h':556,'i':222,'j':222,'k':500,
  'l':222,'m':833,'n':556,'o':556,'p':556,'q':556,'r':333,'s':500,'t':278,'u':556,'v':500,
  'w':722,'x':500,'y':500,'z':500,'{':334,'|':260,'}':334,'~':584,
};
const W_BOLD = {
  ...W_REG,
  'A':722,'B':722,'C':722,'D':722,'E':667,'F':611,'G':778,'H':722,'I':278,'J':556,'K':722,
  'L':611,'M':833,'N':722,'O':778,'P':667,'Q':778,'R':722,'S':667,'T':611,'U':722,'V':667,
  'W':944,'X':667,'Y':667,'Z':611,
  'a':556,'b':611,'c':556,'d':611,'e':556,'f':333,'g':611,'h':611,'i':278,'j':278,'k':556,
  'l':278,'m':889,'n':611,'o':611,'p':611,'q':611,'r':389,'s':556,'t':333,'u':611,'v':556,
  'w':778,'x':556,'y':556,'z':500,
  ' ':278,'-':333,'.':278,',':278,':':278,'/':278,'(':333,')':333,
};

const widthOf = (text, size, bold) => {
  const t = bold ? W_BOLD : W_REG;
  let w = 0;
  for (const ch of text) w += t[ch] ?? 556;
  return (w * size) / 1000;
};

/** Greedy wrap to a pixel width. */
function wrap(text, size, bold, maxW) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (widthOf(next, size, bold) <= maxW) line = next;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/* ───────────────────────── PDF primitives ───────────────────────── */

/** Escape for a PDF literal string, and fold anything outside WinAnsi to an ASCII equivalent. */
function pdfText(s) {
  return String(s)
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/·/g, '-')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

class Doc {
  constructor() {
    this.pages = [];
    this.newPage();
  }
  newPage() {
    this.ops = [];
    this.y = PH - MT;
    this.pages.push(this.ops);
  }
  room(h) {
    if (this.y - h < MB) this.newPage();
  }
  text(s, { size = 10, bold = false, color = BODY, x = MX, lead = 0 } = {}) {
    this.room(size + lead);
    this.ops.push(
      `BT /${bold ? 'FB' : 'FR'} ${size} Tf ${color.join(' ')} rg 1 0 0 1 ${x.toFixed(2)} ${(
        this.y - size
      ).toFixed(2)} Tm (${pdfText(s)}) Tj ET`,
    );
    this.y -= size + lead;
  }
  para(s, { size = 10, bold = false, color = BODY, x = MX, width = COL, lead = 3.4, after = 0 } = {}) {
    for (const line of wrap(s, size, bold, width)) {
      this.text(line, { size, bold, color, x, lead });
    }
    this.y -= after;
  }
  rule(after = 8) {
    this.room(6);
    this.ops.push(
      `${RULE.join(' ')} RG 0.6 w ${MX} ${this.y.toFixed(2)} m ${(PW - MX).toFixed(2)} ${this.y.toFixed(
        2,
      )} l S`,
    );
    this.y -= after;
  }
  bullet(s, { size = 9.6 } = {}) {
    const indent = 12;
    const lines = wrap(s, size, false, COL - indent);
    lines.forEach((line, i) => {
      this.room(size + 3);
      if (i === 0) {
        this.ops.push(
          `BT /FR ${size} Tf ${GREY.join(' ')} rg 1 0 0 1 ${MX} ${(this.y - size).toFixed(
            2,
          )} Tm (-) Tj ET`,
        );
      }
      this.ops.push(
        `BT /FR ${size} Tf ${BODY.join(' ')} rg 1 0 0 1 ${(MX + indent).toFixed(2)} ${(
          this.y - size
        ).toFixed(2)} Tm (${pdfText(line)}) Tj ET`,
      );
      this.y -= size + 3;
    });
  }
  heading(s) {
    this.y -= 8;
    this.room(26);
    this.text(s.toUpperCase(), { size: 10.5, bold: true, color: NAVY, lead: 5 });
    this.rule(7);
  }
}

/* ───────────────────────── build the document ───────────────────────── */

const flat = (t) =>
  String(t)
    .split(/\n\s*\n/)
    .map((s) => s.trim().replace(/\s*\n\s*/g, ' '))
    .filter(Boolean);

const d = new Doc();

// Header
d.text(cv.name, { size: 21, bold: true, color: NAVY, lead: 4 });
d.para(cv.headline, { size: 10.5, color: CHARCOAL, lead: 3, after: 3 });
d.para(cv.contactLine.join('  |  '), { size: 9, color: GREY, lead: 2 });
d.para(cv.availability, { size: 9, color: GREY, lead: 2, after: 4 });
d.rule(10);

d.heading('Professional Summary');
for (const p of flat(cv.summary)) d.para(p, { size: 9.8, lead: 3.4, after: 5 });

d.heading('Professional Experience');
d.para(
  'All roles below are independent and self-employed. I have no commercial employment history in software, and this CV does not imply otherwise.',
  { size: 8.8, color: GREY, lead: 3, after: 7 },
);
for (const r of cv.experience) {
  d.room(46);
  d.text(r.title, { size: 10.6, bold: true, color: CHARCOAL, lead: 2.5 });
  d.para(`${r.org}  |  ${r.location}  |  ${r.from} - ${r.to}`, {
    size: 8.8, color: GREY, lead: 2.5, after: 2,
  });
  d.para(r.context, { size: 9.4, color: CHARCOAL, lead: 3.2, after: 4 });
  for (const b of r.bullets) d.bullet(b);
  d.y -= 8;
}

d.heading('Education');
for (const e of cv.education) {
  d.room(32);
  d.text(e.qualification, { size: 10, bold: true, color: CHARCOAL, lead: 2.5 });
  d.para(`${e.institution}  |  ${e.location}  |  ${e.date}`, { size: 8.8, color: GREY, lead: 2.5 });
  if (e.detail) d.para(e.detail, { size: 8.8, color: GREY, lead: 2.5 });
  d.y -= 6;
}

d.heading('Continuing Professional Development');
for (const c of cv.development) {
  d.room(30);
  d.para(c.item, { size: 9.8, bold: true, color: CHARCOAL, lead: 3, after: 1 });
  d.para(`${c.date} - ${c.status}`, { size: 8.8, color: GREY, lead: 2.5, after: 6 });
}

d.heading('Skills');
for (const g of cv.skillGroups) {
  d.room(28);
  d.text(g.group, { size: 9.6, bold: true, color: CHARCOAL, lead: 2.5 });
  d.para(g.items, { size: 9.2, lead: 3, after: 6 });
}

d.heading('Statement on Working Method');
for (const p of flat(cv.statement)) d.para(p, { size: 9.6, lead: 3.4, after: 4 });

d.heading('References');
d.para(cv.referees, { size: 9.6 });

/* ───────────────────────── serialise ───────────────────────── */

const objects = [];
const add = (body) => {
  objects.push(body);
  return objects.length; // 1-based object number
};

const fontR = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
const fontB = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');

const pagesId = objects.length + d.pages.length * 2 + 1;
const pageIds = [];
for (const ops of d.pages) {
  const stream = ops.join('\n');
  const contentId = add(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
  pageIds.push(
    add(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PW.toFixed(2)} ${PH.toFixed(
        2,
      )}] /Resources << /Font << /FR ${fontR} 0 R /FB ${fontB} 0 R >> >> /Contents ${contentId} 0 R >>`,
    ),
  );
}
add(`<< /Type /Pages /Kids [${pageIds.map((i) => `${i} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
const infoId = add(
  `<< /Title (${pdfText(cv.name)} - Curriculum Vitae) /Author (${pdfText(
    cv.name,
  )}) /Subject (${pdfText(cv.headline)}) /Keywords (AI evaluation, AI training, quality assurance, software testing, IT support, information security, generative AI, remote) /Creator (Portfolio CV generator) >>`,
);
const catalogId = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
const offsets = [0];
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf, 'binary'));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xref = Buffer.byteLength(pdf, 'binary');
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, Buffer.from(pdf, 'binary'));

console.log(`\n  Wrote ${OUT}`);
console.log(`  ${d.pages.length} page(s), ${(Buffer.byteLength(pdf, 'binary') / 1024).toFixed(1)} kB`);
console.log(`  Text is selectable and extractable — no images, no embedded fonts.\n`);
