#!/usr/bin/env node
/**
 * Build verification. No dependencies.
 *
 * This is the project practising what the portfolio preaches: the build is not "done" because
 * it produced files, it is done when the output has been measured. Checks performed:
 *
 *   1. Every internal link, script, stylesheet and image resolves to a real file in dist.
 *   2. Every in-page anchor (#id) targets an element that exists on that page.
 *   3. Every page has exactly one <h1>, a <title>, a meta description and a canonical URL.
 *   4. Meta descriptions and titles are within the lengths search engines actually display.
 *   5. No unresolved placeholder text ships (TODO, FIXME, lorem, XXX).
 *   6. Every <img> has an alt attribute; every <a target="_blank"> has rel="noopener".
 *   7. The declared Open Graph image exists.
 *   8. Page weight is reported, so a regression in size is visible.
 *
 * Exit code is non-zero if any check fails, so it can gate a deployment.
 *
 * Usage: node check.js
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname, resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');

/**
 * When the site is built for a subpath (GitHub Pages project site), every internal link is
 * prefixed. The checker has to strip that prefix before resolving against dist/, or it would
 * report every link on the site as broken.
 */
const BASE = (() => {
  try {
    const u = process.env.SITE_URL || '';
    const p = u ? new URL(u).pathname.replace(/\/+$/, '') : '';
    return p === '/' ? '' : p;
  } catch {
    return '';
  }
})();
const stripBase = (href) =>
  BASE && href.startsWith(BASE + '/') ? href.slice(BASE.length) : href;

const errors = [];
const warnings = [];
let pagesChecked = 0;
let linksChecked = 0;
let totalBytes = 0;

const fail = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

/** Resolve an href as a browser would, relative to the page's URL path. */
async function resolveHref(href, pageFile) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return true; // pure anchor, handled separately

  let target;
  if (clean.startsWith('/')) {
    target = join(DIST, stripBase(clean));
  } else {
    target = resolve(dirname(pageFile), clean);
  }

  if (await exists(target)) {
    // A directory must contain an index.html to be servable.
    const s = await stat(target);
    if (s.isDirectory()) return exists(join(target, 'index.html'));
    return true;
  }
  // Allow extensionless paths to resolve to a directory index.
  if (!extname(target)) return exists(join(target, 'index.html'));
  return false;
}

function attrs(tag) {
  const out = {};
  const re = /([a-zA-Z_:][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(tag))) out[m[1].toLowerCase()] = m[2] !== undefined ? m[2] : m[3];
  return out;
}

async function checkHtml(file, html) {
  pagesChecked += 1;
  const rel = '/' + relative(DIST, file).replace(/\\/g, '/');

  /* ---- head essentials ---- */
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  if (!title) fail(rel, 'missing <title>');
  else {
    const len = title.replace(/&[a-z]+;/g, 'x').length;
    if (len > 70) warn(rel, `title is ${len} chars; search results truncate near 60`);
    if (len < 15) warn(rel, `title is only ${len} chars`);
  }

  const descTag = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!descTag) fail(rel, 'missing meta description');
  else {
    const len = descTag[1].length;
    if (len > 165) warn(rel, `meta description is ${len} chars; truncates near 155`);
    if (len < 60) warn(rel, `meta description is only ${len} chars`);
  }

  if (!/<link\s+rel="canonical"/i.test(html)) fail(rel, 'missing canonical link');
  if (!/<meta\s+property="og:title"/i.test(html)) fail(rel, 'missing og:title');
  if (!/<html lang="/i.test(html)) fail(rel, 'missing lang attribute on <html>');

  /* ---- exactly one h1 ---- */
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) fail(rel, 'no <h1>');
  if (h1s.length > 1) fail(rel, `${h1s.length} <h1> elements; there must be exactly one`);

  /* ---- heading order (no skipped levels) ---- */
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      warn(rel, `heading jumps from h${levels[i - 1]} to h${levels[i]}`);
      break;
    }
  }

  /* ---- placeholders ---- */
  const body = html.replace(/<!--[\s\S]*?-->/g, '');
  for (const bad of ['lorem ipsum', 'TODO', 'FIXME', 'XXX', 'PLACEHOLDER']) {
    if (body.toLowerCase().includes(bad.toLowerCase())) {
      fail(rel, `unresolved placeholder text: "${bad}"`);
    }
  }

  /* ---- ids for anchor checking ---- */
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  /* ---- links ---- */
  for (const m of html.matchAll(/<a\s([^>]*)>/gi)) {
    const a = attrs(m[1]);
    const href = a.href;
    if (!href) {
      fail(rel, '<a> without href');
      continue;
    }
    if (/^(https?:|mailto:|tel:)/i.test(href)) {
      if (a.target === '_blank' && !/noopener/.test(a.rel || '')) {
        fail(rel, `target="_blank" without rel="noopener": ${href}`);
      }
      continue;
    }
    linksChecked += 1;

    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (id && !ids.has(id)) fail(rel, `anchor target not found on page: ${href}`);
      continue;
    }

    if (!(await resolveHref(href, file))) fail(rel, `broken internal link: ${href}`);

    // A link with a fragment to another page: verify the fragment on that page too.
    const hash = href.includes('#') ? href.split('#')[1] : null;
    if (hash) {
      const base = href.split('#')[0];
      const target = base.startsWith('/') ? join(DIST, stripBase(base)) : resolve(dirname(file), base);
      const indexFile = extname(target) ? target : join(target, 'index.html');
      if (await exists(indexFile)) {
        const other = await readFile(indexFile, 'utf8');
        if (!new RegExp(`\\sid="${hash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(other)) {
          warn(rel, `fragment "#${hash}" not found on ${base}`);
        }
      }
    }
  }

  /* ---- assets ---- */
  for (const m of html.matchAll(/<(?:script|link|img)\s([^>]*)>/gi)) {
    const a = attrs(m[1]);
    const src = a.src || (a.rel && a.rel !== 'canonical' ? a.href : null);
    if (!src || /^(https?:|data:)/i.test(src)) continue;
    linksChecked += 1;
    if (!(await resolveHref(src, file))) fail(rel, `missing asset: ${src}`);
  }

  for (const m of html.matchAll(/<img\s([^>]*)>/gi)) {
    const a = attrs(m[1]);
    if (a.alt === undefined) fail(rel, `<img> without alt: ${a.src || '(no src)'}`);
  }

  /* ---- og:image must exist ---- */
  const og = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i);
  if (og) {
    const path = og[1].replace(/^https?:\/\/[^/]+/, '');
    if (path.startsWith('/') && !(await exists(join(DIST, stripBase(path))))) {
      warn(rel, `og:image does not exist in dist: ${path}`);
    }
  }
}

async function main() {
  if (!(await exists(DIST))) {
    console.error('\n  dist/ does not exist. Run: npm run build\n');
    process.exit(1);
  }

  const files = await walk(DIST);
  for (const f of files) {
    const s = await stat(f);
    totalBytes += s.size;
    if (f.endsWith('.html')) {
      await checkHtml(f, await readFile(f, 'utf8'));
    }
  }

  // Sitemap and robots must be present for the SEO claims on this site to be true.
  for (const required of ['sitemap.xml', 'robots.txt']) {
    if (!(await exists(join(DIST, required)))) fail('/', `missing ${required}`);
  }

  console.log(`\n  Checked ${pagesChecked} pages, ${linksChecked} internal links/assets`);
  console.log(`  Output size: ${(totalBytes / 1024).toFixed(0)} kB across ${files.length} files`);

  if (warnings.length) {
    console.log(`\n  ${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`    · ${w}`);
  }

  if (errors.length) {
    console.log(`\n  ${errors.length} ERROR(S):`);
    for (const e of errors) console.log(`    ✗ ${e}`);
    console.log('');
    process.exit(1);
  }

  console.log(`\n  All checks passed.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
