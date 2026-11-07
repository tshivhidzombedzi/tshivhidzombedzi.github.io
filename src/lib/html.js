/**
 * Minimal HTML helpers. No templating library - template literals plus escaping.
 *
 * The one rule that matters here: `esc()` on every value that reaches markup. Content in
 * this project is authored, not user-supplied, so this is defence in depth rather than a
 * live XSS boundary - but a generator that interpolates unescaped strings teaches the wrong
 * habit and breaks the moment an apostrophe or an ampersand appears in a project title.
 */

const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escape a value for HTML text or a double-quoted attribute. */
export function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/** Escape for inclusion inside a <script type="application/ld+json"> block. */
export function escJsonLd(obj) {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

/**
 * Turn authored multi-line prose into paragraphs.
 * Blank line = paragraph break. Single newlines inside a paragraph are collapsed, which is
 * what lets the data files wrap text for readability without affecting output.
 */
export function prose(text, className = '') {
  if (!text) return '';
  const cls = className ? ` class="${esc(className)}"` : '';
  const paras = String(text)
    .split(/\n\s*\n/)
    .map((p) => p.trim().replace(/\s*\n\s*/g, ' '))
    .filter(Boolean);
  return paras.map((p) => `<p${cls}>${esc(p)}</p>`).join('\n');
}

/** Single-paragraph inline prose: collapse all whitespace, escape, no wrapper. */
export function inline(text) {
  if (!text) return '';
  return esc(String(text).trim().replace(/\s+/g, ' '));
}

/** Join class names, dropping falsy values. */
export function cls(...names) {
  return names.filter(Boolean).join(' ');
}

/** Render a list of items with a mapper, joined by newlines. */
export function list(items, fn) {
  if (!items || !items.length) return '';
  return items.map(fn).join('\n');
}

/** Conditional render, with an optional fallback for the falsy branch. */
export function when(condition, fn, fallback = '') {
  const branch = condition ? fn : fallback;
  return typeof branch === 'function' ? branch() : branch;
}

/** An external link gets rel/target; an internal one does not. */
export function link(href, label, opts = {}) {
  if (!href) return esc(label);
  const external = /^https?:\/\//.test(href);
  const attrs = [`href="${esc(href)}"`];
  if (external) attrs.push('target="_blank"', 'rel="noopener noreferrer"');
  if (opts.className) attrs.push(`class="${esc(opts.className)}"`);
  if (opts.aria) attrs.push(`aria-label="${esc(opts.aria)}"`);
  const arrow = external && opts.arrow !== false ? '<span class="ext" aria-hidden="true">↗</span>' : '';
  return `<a ${attrs.join(' ')}>${esc(label)}${arrow}</a>`;
}

/** Section wrapper with an optional eyebrow, heading and lead paragraph. */
export function section({ id, eyebrow, title, lead, body, className, headingLevel = 2 }) {
  const h = `h${headingLevel}`;
  return `
<section${id ? ` id="${esc(id)}"` : ''}${className ? ` class="${esc(className)}"` : ''}>
  <div class="wrap">
    ${when(eyebrow || title || lead, () => `
    <header class="sec-head">
      ${when(eyebrow, () => `<p class="eyebrow">${esc(eyebrow)}</p>`)}
      ${when(title, () => `<${h} class="sec-title">${esc(title)}</${h}>`)}
      ${when(lead, () => `<div class="sec-lead">${prose(lead)}</div>`)}
    </header>`)}
    ${body || ''}
  </div>
</section>`;
}

/** A status / tier pill. */
export function pill(label, tone = 'default') {
  return `<span class="pill pill--${esc(tone)}">${esc(label)}</span>`;
}

export default { esc, escJsonLd, prose, inline, cls, list, when, link, section, pill };
