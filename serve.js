#!/usr/bin/env node
/**
 * Local preview server for ./dist. No dependencies.
 *
 * It exists so the site can be checked exactly as it will be served: clean URLs resolving to
 * directory index files, a real 404 page, and correct content types. Opening dist/index.html
 * with file:// would break every absolute path on the site, which is the usual way a static
 * build appears broken when it is fine.
 *
 * Usage: node serve.js [port]
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'dist');
const PORT = Number(process.argv[2] || process.env.PORT || 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};

async function resolveFile(urlPath) {
  // Strip query/hash, decode, and normalise away any ../ traversal attempt.
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const safe = normalize(clean).replace(/^(\.\.[/\\])+/, '');
  let target = join(ROOT, safe);

  try {
    const s = await stat(target);
    if (s.isDirectory()) target = join(target, 'index.html');
  } catch {
    // Allow /about -> /about/index.html as well as /about/
    if (!extname(target)) {
      try {
        const alt = join(target, 'index.html');
        await stat(alt);
        return alt;
      } catch {
        return null;
      }
    }
    return null;
  }

  try {
    await stat(target);
    return target;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url || '/');

  if (!file) {
    try {
      const body = await readFile(join(ROOT, '404.html'));
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('404');
    }
    console.log(`  404  ${req.url}`);
    return;
  }

  try {
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': TYPES[extname(file)] || 'application/octet-stream',
      'cache-control': 'no-cache',
    });
    res.end(body);
    console.log(`  200  ${req.url}`);
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end('500');
    console.error(err);
  }
});

server.listen(PORT, () => {
  console.log(`\n  Serving ./dist on http://localhost:${PORT}\n  Ctrl+C to stop\n`);
});
