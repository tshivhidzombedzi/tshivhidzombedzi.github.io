#!/usr/bin/env node
/**
 * Static site generator.
 *
 * WHY THIS AND NOT A FRAMEWORK
 * This file is the whole build system. It has no dependencies, which means:
 *   - it builds offline, in milliseconds, on any machine with Node 18 or newer;
 *   - there is no dependency tree to patch, audit or watch rot;
 *   - the output is plain HTML, CSS and JS, so it deploys to literally any host — including
 *     the shared PHP hosting the author already pays for — by uploading a folder;
 *   - and the author can read every line of his own build, which matters for a portfolio
 *     whose entire premise is not claiming things you cannot explain.
 *
 * An Astro or Next.js build would be more conventional and would add roughly 200 MB of
 * node_modules, a required install step on a connection that has not always been reliable,
 * and a toolchain the author would have to defend in an interview without having chosen it.
 *
 * Usage:  node build.js            (writes ./dist)
 *         SITE_URL=https://… node build.js
 */

import { mkdir, writeFile, rm, cp, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import layout from './src/templates/layout.js';
import site from './src/data/site.js';
import projects from './src/data/projects.js';

import home from './src/pages/home.js';
import about from './src/pages/about.js';
import { projectsIndex, projectPage } from './src/pages/projects.js';
import skills from './src/pages/skills.js';
import lab from './src/pages/lab.js';
import verification from './src/pages/verification.js';
import educationPage from './src/pages/education.js';
import career from './src/pages/career.js';
import contact from './src/pages/contact.js';
import cvPage from './src/pages/cv.js';
import notFound from './src/pages/notfound.js';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');
const PUBLIC = join(ROOT, 'public');

/**
 * Base path support, derived automatically from baseUrl.
 *
 * Every internal link in this site is root-relative ("/about/"). That is correct when the site
 * is served from the root of a domain, and silently broken when it is served from a subpath —
 * which is exactly what a GitHub Pages *project* site does (user.github.io/repo-name/). The
 * usual symptom is a completely unstyled page, because /assets/css/site.css resolves to the
 * wrong place.
 *
 * Rather than add a separate setting to get out of sync, the prefix is taken from baseUrl's
 * own path. Set SITE_URL=https://user.github.io/repo and everything follows: canonical URLs,
 * the sitemap and every in-page link agree, with nothing else to configure.
 */
function basePathFrom(url) {
  try {
    const p = new URL(url).pathname.replace(/\/+$/, '');
    return p === '/' ? '' : p;
  } catch {
    return '';
  }
}
const BASE = basePathFrom(site.baseUrl);

/** Prefix root-relative href/src attributes. Absolute URLs and mailto: are untouched. */
function applyBasePath(html) {
  if (!BASE) return html;
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`);
}

/** Every page on the site, in navigation order. */
function collectPages() {
  return [
    home(),
    about(),
    projectsIndex(),
    ...projects.map((p) => projectPage(p)),
    skills(),
    lab(),
    verification(),
    educationPage(),
    career(),
    contact(),
    cvPage(),
    notFound(),
  ];
}

/** `/about/` -> `dist/about/index.html`; `/404.html` -> `dist/404.html`. */
function outputPathFor(page) {
  if (page.isFile) return join(DIST, page.path.replace(/^\//, ''));
  const clean = page.path.replace(/^\/|\/$/g, '');
  return clean ? join(DIST, clean, 'index.html') : join(DIST, 'index.html');
}

function sitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => !p.noindex && !p.isFile)
    .map((p) => {
      // Home is the most important page; case studies rank above utility pages.
      const priority =
        p.path === '/' ? '1.0' : p.path.startsWith('/projects/') ? '0.8' : '0.7';
      return `  <url>
    <loc>${site.baseUrl.replace(/\/$/, '')}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/1999/sitemap-image/1.1 http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
${urls}
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${site.baseUrl}/sitemap.xml
`;
}

async function copyPublic() {
  if (!existsSync(PUBLIC)) return 0;
  await cp(PUBLIC, DIST, { recursive: true });
  let count = 0;
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else count += 1;
    }
  }
  await walk(PUBLIC);
  return count;
}

async function main() {
  const started = Date.now();

  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const pages = collectPages();

  // Fail loudly on a duplicate route rather than silently overwriting one page with another.
  const seen = new Set();
  for (const p of pages) {
    if (seen.has(p.path)) throw new Error(`Duplicate route: ${p.path}`);
    seen.add(p.path);
    if (!p.title) throw new Error(`Page ${p.path} has no title`);
    if (!p.description) throw new Error(`Page ${p.path} has no meta description`);
  }

  let bytes = 0;
  for (const page of pages) {
    const html = layout({
      title: page.title,
      description: page.description,
      path: page.path,
      content: page.content,
      jsonLd: page.jsonLd || [],
      noindex: page.noindex,
      bodyClass: page.bodyClass || '',
    });
    const out = outputPathFor(page);
    await mkdir(dirname(out), { recursive: true });
    const final = applyBasePath(html);
    await writeFile(out, final, 'utf8');
    bytes += Buffer.byteLength(final);
  }

  await writeFile(join(DIST, 'sitemap.xml'), sitemap(pages), 'utf8');
  await writeFile(join(DIST, 'robots.txt'), robots(), 'utf8');

  const assets = await copyPublic();
  const ms = Date.now() - started;

  console.log(`\n  Built ${pages.length} pages + ${assets} assets in ${ms} ms`);
  console.log(`  HTML total: ${(bytes / 1024).toFixed(1)} kB`);
  console.log(`  Base URL:   ${site.baseUrl}${BASE ? `   (base path: ${BASE})` : ''}`);
  console.log(`  Output:     ${resolve(DIST)}\n`);

  if (!site.baseUrlConfirmed) {
    console.log(
      '  NOTE: baseUrl is not confirmed yet.\n' +
        `        Currently: ${site.baseUrl}\n` +
        '        Register that domain and set baseUrlConfirmed: true in src/data/site.js,\n' +
        '        or build with SITE_URL=https://your-domain. Deploying with the wrong value\n' +
        '        breaks every canonical URL, the sitemap and the share card.\n',
    );
  }
}

main().catch((err) => {
  console.error('\n  BUILD FAILED\n');
  console.error(err);
  process.exit(1);
});
