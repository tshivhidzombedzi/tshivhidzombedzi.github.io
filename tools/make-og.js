#!/usr/bin/env node
/**
 * Generates public/assets/img/og.png — the 1200x630 card that LinkedIn, X, Slack, WhatsApp and
 * Facebook show when a link to this site is shared.
 *
 * WHY HAND-ROLL A PNG
 * Those platforms want a raster image; several will not render an SVG og:image at all. Producing
 * one normally means a headless browser or an image library — hundreds of megabytes of dependency
 * for one 1200x630 file. A PNG is just chunks plus a zlib stream, and Node ships zlib, so the
 * whole format is reachable from the standard library.
 *
 * The type is drawn from a 5x7 cell font defined below and scaled up, which at this size reads as
 * deliberate technical lettering rather than as a missing font. It is also completely
 * deterministic: no font availability to depend on, no text metrics to guess, identical output on
 * every machine.
 *
 * LinkedIn is this portfolio's primary recruiter channel, so the shared-link card is a real
 * deliverable rather than a nicety.
 *
 * Usage: node tools/make-og.js
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { deflateSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'assets', 'img', 'og.png');

const W = 1200;
const H = 630;

/* ───────────────────────────── 5x7 cell font ───────────────────────────── */

const FONT = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  G: ['.###.', '#...#', '#....', '#..##', '#...#', '#...#', '.###.'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
  J: ['#####', '....#', '....#', '....#', '#...#', '#...#', '.###.'],
  K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  M: ['#...#', '##.##', '#.#.#', '#...#', '#...#', '#...#', '#...#'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  S: ['.###.', '#...#', '#....', '.###.', '....#', '#...#', '.###.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '##.##', '#...#'],
  X: ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
  '&': ['.##..', '#..#.', '#..#.', '.##..', '#.##.', '#..#.', '.##.#'],
  '-': ['.....', '.....', '.....', '#####', '.....', '.....', '.....'],
  '.': ['.....', '.....', '.....', '.....', '.....', '.##..', '.##..'],
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
};

/* ───────────────────────────── canvas ───────────────────────────── */

// RGB, 3 bytes per pixel.
const px = Buffer.alloc(W * H * 3);

function setPx(x, y, r, g, b, a = 1) {
  // Coordinates MUST be integers: a fractional index into a Buffer is silently ignored,
  // so a half-pixel offset makes a shape vanish with no error. Centring calculations
  // produce fractional values routinely, so they are floored here rather than at each
  // call site.
  x = Math.floor(x);
  y = Math.floor(y);
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 3;
  if (a >= 1) {
    px[i] = r;
    px[i + 1] = g;
    px[i + 2] = b;
  } else {
    px[i] = Math.round(px[i] * (1 - a) + r * a);
    px[i + 1] = Math.round(px[i + 1] * (1 - a) + g * a);
    px[i + 2] = Math.round(px[i + 2] * (1 - a) + b * a);
  }
}

function rect(x, y, w, h, [r, g, b], a = 1) {
  for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) setPx(xx, yy, r, g, b, a);
}

/** Draw a text string from the cell font. `scale` = pixels per cell. */
function text(str, x, y, scale, [r, g, b], a = 1) {
  let cx = x;
  for (const ch of str.toUpperCase()) {
    const glyph = FONT[ch] || FONT[' '];
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (glyph[row][col] === '#') {
          rect(cx + col * scale, y + row * scale, scale, scale, [r, g, b], a);
        }
      }
    }
    cx += 6 * scale; // 5 cells + 1 cell spacing
  }
  return cx - x - scale; // rendered width
}

function textWidth(str, scale) {
  return str.length * 6 * scale - scale;
}

/* ───────────────────────────── compose ───────────────────────────── */

const BG_TOP = [13, 13, 15];
const BG_BOT = [10, 10, 11];
const ACCENT = [122, 160, 255];
const TEXT = [237, 237, 239];
const DIM = [138, 138, 146];
const LINE = [34, 34, 37];
const LINE_3 = [58, 58, 65];

// 1. Vertical gradient background.
for (let y = 0; y < H; y++) {
  const t = y / (H - 1);
  const r = Math.round(BG_TOP[0] + (BG_BOT[0] - BG_TOP[0]) * t);
  const g = Math.round(BG_TOP[1] + (BG_BOT[1] - BG_TOP[1]) * t);
  const b = Math.round(BG_TOP[2] + (BG_BOT[2] - BG_TOP[2]) * t);
  rect(0, y, W, 1, [r, g, b]);
}

// 2. A single hairline framing the content, instead of a grid overlay and a glow.
//    The card follows the same rule as the site: separation by rule, not by decoration.
rect(90, 92, 1, H - 184, LINE);

// 3. Monogram block, top right.
const mSize = 62;
const mX = W - 112 - mSize;
const mY = 92;
for (let i = 0; i < 4; i++) {
  const [x, y, w, h] = [
    [mX, mY, mSize, 1],
    [mX, mY + mSize - 1, mSize, 1],
    [mX, mY, 1, mSize],
    [mX + mSize - 1, mY, 1, mSize],
  ][i];
  rect(x, y, w, h, LINE_3);
}
const mono = 'TM';
text(mono, mX + (mSize - textWidth(mono, 5)) / 2, mY + (mSize - 5 * 7) / 2, 5, DIM);

// 4. Name, two lines, set large and quiet.
const nameScale = 9;
text('TSHIVHIDZO', 124, 186, nameScale, TEXT);
text('MBEDZI', 124, 186 + 7 * nameScale + 26, nameScale, TEXT);

// 5. Role line. The accent appears exactly once on the card.
text('AI & TECHNOLOGY SPECIALIST', 124, 404, 3, ACCENT);

// 6. Supporting lines.
text('GENERATIVE AI - EVALUATION - AUTOMATION', 124, 448, 2, DIM);
text('PRETORIA SOUTH AFRICA - OPEN TO REMOTE WORK', 124, 480, 2, [106, 106, 114]);

// 7. Bottom hairline.
rect(0, H - 1, W, 1, LINE_3);

/* ───────────────────────────── PNG encoding ───────────────────────────── */

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

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

// Raw image data: each scanline prefixed with filter type 0 (None).
const raw = Buffer.alloc((W * 3 + 1) * H);
for (let y = 0; y < H; y++) {
  raw[y * (W * 3 + 1)] = 0;
  px.copy(raw, y * (W * 3 + 1) + 1, y * W * 3, (y + 1) * W * 3);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // colour type: truecolour RGB
ihdr[10] = 0; // compression: deflate
ihdr[11] = 0; // filter method
ihdr[12] = 0; // interlace: none

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, png);

console.log(`\n  Wrote ${OUT}`);
console.log(`  ${W}x${H} PNG, ${(png.length / 1024).toFixed(1)} kB\n`);
