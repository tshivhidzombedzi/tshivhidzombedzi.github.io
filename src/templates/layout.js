/**
 * Page shell: head metadata, navigation, footer.
 *
 * SEO notes
 * - One <h1> per page, supplied by the page, never by the layout.
 * - Canonical URL on every page, built from site.baseUrl, which is why that value must be
 *   correct before deployment.
 * - Open Graph and Twitter card tags so a shared link renders properly.
 * - JSON-LD: Person on every page (he is the subject of the site), plus whatever the page adds.
 *
 * ACCESSIBILITY notes
 * - Skip link as the first focusable element.
 * - The mobile navigation is a real <button> with aria-expanded, not a checkbox hack, so it
 *   is announced correctly and works with a keyboard.
 * - aria-current="page" on the active navigation item.
 * - The only JavaScript on the site is the nav toggle and a scroll-spy for in-page contents.
 *   Every page is fully readable and navigable with JavaScript disabled.
 */

import { esc, escJsonLd, when, list } from '../lib/html.js';
import site from '../data/site.js';
import profile from '../data/profile.js';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.nickname,
  jobTitle: profile.role,
  description: profile.summary,
  url: site.baseUrl + '/',
  email: 'mailto:' + profile.contact.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location.city,
    addressRegion: profile.location.region,
    addressCountry: profile.location.countryCode,
  },
  knowsAbout: [
    'Generative AI',
    'Large language model applications',
    'AI evaluation and quality assurance',
    'AI workflow automation',
    'Information technology support',
    'Information security',
    'Digital product development',
  ],
  sameAs: [profile.contact.linkedin, profile.contact.github].filter(Boolean),
};

function navItem(item, path) {
  const isActive =
    item.href === '/' ? path === '/' : path === item.href || path.startsWith(item.href);
  return `<li><a href="${esc(item.href)}"${
    isActive ? ' aria-current="page"' : ''
  }>${esc(item.label)}</a></li>`;
}

export function layout({
  title,
  description,
  path = '/',
  bodyClass = '',
  content = '',
  jsonLd = [],
  ogType = 'website',
  noindex = false,
}) {
  const fullTitle =
    path === '/' ? `${profile.displayName} — ${profile.role}` : `${title} — ${profile.shortName}`;
  const canonical = site.baseUrl + path;
  const ld = [personJsonLd, ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd])].filter(Boolean);

  return `<!doctype html>
<html lang="${esc(site.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
${noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
<meta name="author" content="${esc(profile.name)}">
<meta name="theme-color" content="${esc(site.themeColor)}">

<meta property="og:type" content="${esc(ogType)}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:locale" content="${esc(site.locale)}">
<meta property="og:image" content="${esc(site.baseUrl + site.ogImage)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(site.baseUrl + site.ogImage)}">

<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/favicon.svg">
<link rel="stylesheet" href="/assets/css/site.css">
${list(
  ld,
  (obj) => `<script type="application/ld+json">${escJsonLd(obj)}</script>`,
)}
</head>
<body class="${esc(bodyClass)}">
<a class="skip" href="#main">Skip to content</a>

<header class="site-head">
  <div class="wrap head-in">
    <a class="brand" href="/">
      <span class="brand-mark" aria-hidden="true">TM</span>
      <span class="brand-text">
        <span class="brand-name">${esc(profile.displayName)}</span>
        <span class="brand-role">${esc(profile.role)}</span>
      </span>
    </a>

    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span class="nav-toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>
      <span class="sr-only">Menu</span>
    </button>

    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul>
        ${list(site.nav, (i) => navItem(i, path))}
      </ul>
      <a class="btn btn--sm btn--ghost nav-cv" href="/cv/">CV</a>
    </nav>
  </div>
</header>

<main id="main">
${content}
</main>

<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <p class="foot-name">${esc(profile.displayName)}</p>
        <p class="foot-role">${esc(profile.role)}</p>
        <p class="foot-loc">${esc(profile.location.city)}, ${esc(profile.location.country)} · ${esc(
          profile.timezone,
        )}</p>
        <p class="foot-avail">${esc(profile.availability)}</p>
      </div>
      ${list(
        site.footerGroups,
        (g) => `
      <nav class="foot-col" aria-label="${esc(g.title)}">
        <p class="foot-h">${esc(g.title)}</p>
        <ul>${list(g.links, (l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)}</ul>
      </nav>`,
      )}
      <div class="foot-col">
        <p class="foot-h">Contact</p>
        <ul>
          <li><a href="mailto:${esc(profile.contact.email)}">${esc(profile.contact.emailLabel)}</a></li>
          <li><a href="${esc(profile.contact.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn<span class="ext" aria-hidden="true">↗</span></a></li>
          <li><a href="${esc(profile.contact.github)}" target="_blank" rel="noopener noreferrer">GitHub<span class="ext" aria-hidden="true">&#8599;</span></a></li>
          <li><a href="/cv/">Curriculum vitae</a></li>
        </ul>
      </div>
    </div>

    <div class="foot-base">
      <p>© ${new Date().getFullYear()} ${esc(profile.name)}. All project work shown is my own.</p>
      <p class="foot-note">
        Built from scratch with Node.js and no framework or runtime dependencies.
        Every figure on this site was measured, and anything unverified says so.
      </p>
    </div>
  </div>
</footer>

<script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

export default layout;
