/**
 * Architecture diagrams, authored as inline SVG.
 *
 * WHY INLINE SVG AND NOT IMAGES
 * - They theme with the page, because the fills are CSS classes rather than baked colours.
 * - They stay sharp at any size and cost no extra request.
 * - They are text, so they are searchable, diffable and translatable.
 * - Nothing here is a mock-up or a fabricated screenshot. Each one is a description of a
 *   system that exists, which is the honest substitute for a screenshot I do not have.
 *
 * Every diagram is built by `flow()` so they share one visual language. Each carries
 * role="img" with a <title> and <desc>, so a screen reader gets the summary rather than
 * a wall of disconnected labels.
 */

import { esc } from '../lib/html.js';

const W = 920; // viewBox width; height is computed
const PAD_X = 16;
const ROW_H = 62;
const ROW_GAP = 40;
const NOTE_H = 26;
const LABEL_W = 0;

/**
 * Build a top-to-bottom flow diagram.
 *
 * rows: [{ nodes: [{ t, sub, kind }], note }]
 *   kind: 'in' | 'proc' | 'model' | 'gate' | 'out' | 'store'
 */
function flow({ id, title, desc, rows }) {
  let y = 14;
  const parts = [];
  const arrows = [];

  rows.forEach((row, ri) => {
    const nodes = row.nodes;
    const n = nodes.length;
    const gap = 14;
    const avail = W - PAD_X * 2 - LABEL_W;
    const nw = (avail - gap * (n - 1)) / n;

    nodes.forEach((node, i) => {
      const x = PAD_X + LABEL_W + i * (nw + gap);
      const kind = node.kind || 'proc';
      const hasSub = Boolean(node.sub);
      const tY = hasSub ? y + ROW_H / 2 - 7 : y + ROW_H / 2 + 1;

      parts.push(`
    <g class="dg-node dg-${esc(kind)}">
      <rect x="${x.toFixed(1)}" y="${y}" width="${nw.toFixed(1)}" height="${ROW_H}" rx="10"/>
      <text class="dg-t" x="${(x + nw / 2).toFixed(1)}" y="${tY.toFixed(1)}">${wrapTspan(
        node.t,
        x + nw / 2,
        nw,
      )}</text>
      ${
        hasSub
          ? `<text class="dg-s" x="${(x + nw / 2).toFixed(1)}" y="${(y + ROW_H / 2 + 13).toFixed(
              1,
            )}">${esc(node.sub)}</text>`
          : ''
      }
    </g>`);
    });

    // arrow down to the next row
    if (ri < rows.length - 1) {
      const noteOffset = row.note ? NOTE_H : 0;
      const ay1 = y + ROW_H + 4;
      const ay2 = y + ROW_H + ROW_GAP + noteOffset - 6;
      arrows.push(
        `<line class="dg-arrow" x1="${W / 2}" y1="${ay1}" x2="${W / 2}" y2="${ay2}" marker-end="url(#dg-arrowhead-${esc(
          id,
        )})"/>`,
      );
    }

    if (row.note) {
      parts.push(
        `<text class="dg-note" x="${W / 2}" y="${(y + ROW_H + 20).toFixed(1)}">${esc(row.note)}</text>`,
      );
    }

    y += ROW_H + ROW_GAP + (row.note ? NOTE_H : 0);
  });

  const height = y - ROW_GAP + 14;

  return `
<figure class="diagram">
  <svg viewBox="0 0 ${W} ${height.toFixed(0)}" class="dg" role="img" aria-labelledby="dgt-${esc(
    id,
  )} dgd-${esc(id)}" preserveAspectRatio="xMidYMid meet">
    <title id="dgt-${esc(id)}">${esc(title)}</title>
    <desc id="dgd-${esc(id)}">${esc(desc)}</desc>
    <defs>
      <marker id="dg-arrowhead-${esc(id)}" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path class="dg-arrowhead" d="M 0 1 L 9 5 L 0 9 z"/>
      </marker>
    </defs>
    ${arrows.join('\n    ')}
    ${parts.join('\n')}
  </svg>
  <figcaption>${esc(title)} — ${esc(desc)}</figcaption>
</figure>`;
}

/**
 * Crude but effective SVG text wrapping: break a label onto at most three lines based on an
 * estimated character width. SVG has no text wrapping of its own, and measuring properly
 * would mean shipping a font metrics table for one diagram.
 */
function wrapTspan(text, cx, boxWidth) {
  const charW = 6.4; // approximate at 11px in the UI font
  const maxChars = Math.max(10, Math.floor((boxWidth - 18) / charW));
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if (!cur) cur = w;
    else if ((cur + ' ' + w).length <= maxChars) cur += ' ' + w;
    else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);

  if (lines.length === 1) return esc(lines[0]);

  const dy0 = lines.length === 2 ? -5 : -11;
  return lines
    .slice(0, 3)
    .map(
      (l, i) =>
        `<tspan x="${cx.toFixed(1)}" dy="${i === 0 ? dy0 : 12}">${esc(l)}</tspan>`,
    )
    .join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// The diagrams themselves.

export const diagrams = {
  hoshiNova: () =>
    flow({
      id: 'nova',
      title: 'Hoshi Nova production pipeline',
      desc:
        'An episode defined as structured data passes through cast resolution, voice synthesis, scripted set construction, 3D rendering, assembly and mixing, and an automated delivery gate that rolls back to the previous master on failure.',
      rows: [
        { nodes: [{ t: 'Episode as structured data', sub: 'scenes · dialogue · camera marks · moods', kind: 'in' }] },
        {
          nodes: [
            { t: 'Cast & voice resolution', kind: 'proc' },
            { t: 'Scripted set construction', sub: 'Unreal Python API', kind: 'proc' },
          ],
        },
        {
          nodes: [
            { t: 'Speech synthesis', sub: 'per-character voices', kind: 'model' },
            { t: 'Animation & camera', sub: 'lip-sync · acting clips', kind: 'proc' },
          ],
        },
        { nodes: [{ t: 'Frame render', sub: 'Unreal Engine / Blender · 3840×2160', kind: 'proc' }] },
        {
          nodes: [
            { t: 'Assembly & mix', sub: 'ffmpeg', kind: 'proc' },
            { t: 'Score & credits', kind: 'proc' },
          ],
          note: 'Stages are separately runnable, so a mix fault does not cost a four-hour render.',
        },
        {
          nodes: [
            {
              t: 'Delivery gate',
              sub: 'resolution · frame rate · loudness · ASR vs script · collision scan',
              kind: 'gate',
            },
          ],
          note: 'A failed gate restores the previous master rather than shipping the new one.',
        },
        {
          nodes: [
            { t: 'Delivered 4K master', kind: 'out' },
            { t: 'Previous master retained', kind: 'store' },
          ],
        },
      ],
    }),

  hoshidub: () =>
    flow({
      id: 'dub',
      title: 'Hoshidub real-time dubbing architecture',
      desc:
        'Where an official subtitle track exists, cue times are known in advance, so lines are synthesised before they are spoken and the delay is zero by construction. Without one, audio is transcribed and translated live. Only the original dialogue is attenuated.',
      rows: [
        { nodes: [{ t: "Stream in the user's own subscription", sub: 'played in the service player', kind: 'in' }] },
        {
          nodes: [
            { t: 'Official subtitle track', sub: 'cue times known in advance', kind: 'in' },
            { t: 'Live audio', sub: 'no subtitle track available', kind: 'in' },
          ],
        },
        {
          nodes: [
            { t: 'Read-ahead scheduler', sub: 'zero delay path', kind: 'proc' },
            { t: 'Speech recognition & translation', sub: 'translate-by-ear fallback', kind: 'model' },
          ],
          note: 'Latency is solved as a scheduling problem, not an inference-speed problem.',
        },
        { nodes: [{ t: 'Per-character voice assignment', sub: 'consistent for the whole episode', kind: 'proc' }] },
        { nodes: [{ t: 'Neural speech synthesis', sub: 'line prepared before its cue', kind: 'model' }] },
        {
          nodes: [
            {
              t: 'Dialogue-selective mixer',
              sub: 'Japanese dialogue −15 dB · music & effects within ~2 dB',
              kind: 'proc',
            },
          ],
        },
        {
          nodes: [
            { t: 'English dub on cue', kind: 'out' },
            { t: 'Companion LLM', sub: 'context = episode so far only', kind: 'model' },
          ],
          note: 'The companion cannot spoil the ending because the ending is not in its context.',
        },
      ],
    }),



  evalLoop: () =>
    flow({
      id: 'eval',
      title: 'Adoption test applied to every candidate change',
      desc:
        'Randomness is fixed first so runs are comparable, outcomes are measured whole rather than per platform record, and a change is adopted only if both halves of the split improve independently.',
      rows: [
        { nodes: [{ t: 'Candidate change', kind: 'in' }] },
        {
          nodes: [
            { t: 'Fix the randomness', sub: 'seed · fixed execution delay', kind: 'gate' },
          ],
          note: 'The default execution-delay setting is random, which makes runs non-reproducible.',
        },
        { nodes: [{ t: 'Simulate on real recorded data', sub: 'interpolated data is not evidence', kind: 'proc' }] },
        {
          nodes: [{ t: 'Measure whole outcomes', sub: 'pair two-stage records back together', kind: 'proc' }],
          note: 'The platform double-counts two-stage operations, inflating its reported success rate.',
        },
        {
          nodes: [
            { t: 'In-sample half', kind: 'proc' },
            { t: 'Out-of-sample half', kind: 'proc' },
          ],
        },
        {
          nodes: [{ t: 'Did BOTH halves improve?', kind: 'gate' }],
          note: 'Improvement in the total while failing a half is a fitted result, not an improvement.',
        },
        {
          nodes: [
            { t: 'Adopt — on a plateau, not a peak', kind: 'out' },
            { t: 'Reject — and record the evidence in code', kind: 'store' },
          ],
        },
      ],
    }),

  luna: () =>
    flow({
      id: 'luna',
      title: 'Project Luna autonomy loop',
      desc:
        'A director loop owns every decision and treats the language model as one input among several. Output passes a register filter before synthesis, and operator safety controls sit outside the loop.',
      rows: [
        {
          nodes: [
            { t: 'Live chat events', kind: 'in' },
            { t: 'Silence timer', kind: 'in' },
            { t: 'On-screen video', sub: 'ASR + scene cuts', kind: 'in' },
          ],
        },
        {
          nodes: [{ t: 'Director loop', sub: 'respond · stay silent · open a new topic', kind: 'proc' }],
          note: 'The model is an input to the decision, not the decision-maker.',
        },
        {
          nodes: [
            { t: 'Local LLM', sub: 'on GPU · no API key', kind: 'model' },
            { t: 'Scripted fallback', kind: 'proc' },
          ],
        },
        {
          nodes: [{ t: 'Register filter', sub: 'rejects assistant phrasing', kind: 'gate' }],
        },
        { nodes: [{ t: 'Speech synthesis', sub: 'fixed character voice', kind: 'model' }] },
        {
          nodes: [
            { t: 'Avatar performance', sub: 'expression · movement · lip sync', kind: 'out' },
            { t: 'Rendered 3D set', kind: 'out' },
          ],
        },
        {
          nodes: [
            {
              t: 'Operator safety, outside the loop',
              sub: 'emergency stop · moderation · forget a viewer',
              kind: 'gate',
            },
          ],
          note: 'Built before any thought of a real audience.',
        },
      ],
    }),

  friendDebt: () =>
    flow({
      id: 'fd',
      title: 'FRIEND//DEBT engine and its information boundary',
      desc:
        'Characters reason over what they believe, with provenance for every fact. An automated test fails the suite if reasoning code reads the hidden ground truth it is meant to deduce.',
      rows: [
        { nodes: [{ t: 'Seed', sub: 'one generator · fully reproducible run', kind: 'in' }] },
        {
          nodes: [
            { t: 'Hidden ground truth', sub: 'who the saboteur actually is', kind: 'store' },
            { t: 'Per-character knowledge', sub: 'fact + source + when learned', kind: 'store' },
          ],
        },
        {
          nodes: [{ t: 'Character reasoning', sub: 'goals · plans · deception · memory', kind: 'proc' }],
          note: 'An automated test fails the build if this layer touches the hidden truth.',
        },
        { nodes: [{ t: 'Dialogue acts, tells and votes', kind: 'proc' }] },
        {
          nodes: [
            { t: 'Player view', sub: 'filtered to what the player knows', kind: 'out' },
            { t: 'Developer view', sub: 'full state, separate payload', kind: 'out' },
          ],
        },
        {
          nodes: [{ t: 'Outcome', sub: 'not scripted · measured across many seeds', kind: 'out' }],
        },
      ],
    }),

  portfolio: () =>
    flow({
      id: 'site',
      title: 'Portfolio build and release pipeline',
      desc:
        'Content lives as plain data, a dependency-free generator renders it to static HTML, and a sixteen-rule gate measures the output. A failure stops the release and leaves the previous version live.',
      rows: [
        {
          nodes: [
            { t: 'Content as data files', sub: 'projects · skills · CV · roadmap', kind: 'in' },
            { t: 'Design tokens & templates', kind: 'in' },
          ],
        },
        {
          nodes: [{ t: 'Generator', sub: 'Node standard library only · no framework', kind: 'proc' }],
          note: 'Base path derived from the site URL, so a subpath deploy needs no second setting.',
        },
        {
          nodes: [
            { t: 'Static HTML', sub: '17 pages', kind: 'proc' },
            { t: 'ATS .docx', sub: 'WordprocessingML + zlib', kind: 'proc' },
            { t: 'Share image', sub: 'hand-written PNG encoder', kind: 'proc' },
          ],
        },
        {
          nodes: [
            {
              t: 'Verification gate — 16 rules',
              sub: 'links · anchors · headings · alt text · metadata · placeholders',
              kind: 'gate',
            },
          ],
          note: 'Exits non-zero on any failure, so the deploy stops before anything is published.',
        },
        {
          nodes: [
            { t: 'Published site', kind: 'out' },
            { t: 'Previous version kept live on failure', kind: 'store' },
          ],
        },
      ],
    }),

};

export function renderDiagram(key) {
  const fn = diagrams[key];
  return fn ? fn() : '';
}

export default diagrams;
