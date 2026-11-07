import { esc, list } from '../lib/html.js';
import site from '../data/site.js';

export default function notFound() {
  const content = `
<section class="page-head nf">
  <div class="wrap">
    <p class="eyebrow">404</p>
    <h1>That page does not exist.</h1>
    <p class="page-lead">
      Here is everything that does:
    </p>
    <ul class="nf-links">
      ${list(site.nav, (n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`)}
      <li><a href="/cv/">Curriculum vitae</a></li>
    </ul>
  </div>
</section>`;

  return {
    path: '/404.html',
    title: 'Page not found',
    description:
      'That page does not exist. Links to every page of the AI and technology portfolio of ' +
      'Tshivhidzo Mbedzi.',
    content,
    noindex: true,
    isFile: true,
  };
}
