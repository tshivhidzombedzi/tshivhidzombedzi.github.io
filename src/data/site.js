/**
 * Site-wide configuration.
 *
 * CHANGE `baseUrl` BEFORE DEPLOYING. It is used for canonical URLs, Open Graph tags,
 * the sitemap and robots.txt. An incorrect value is the single most common cause of
 * duplicate-content problems in search. It can also be supplied at build time:
 *
 *     SITE_URL=https://example.com npm run build
 */

const envUrl = (typeof process !== 'undefined' && process.env && process.env.SITE_URL) || '';

export const site = {
  name: 'Tshivhidzo Mbedzi',
  shortName: 'Moss Mbedzi',
  tagline: 'AI & Technology Specialist',

  // Checked available on 2026-11-07 and chosen as the recommended domain: his own full
  // name, which is the right shape for a job search. REGISTER IT, then set
  // `baseUrlConfirmed: true` below. If you would rather not buy a domain,
  // A subdomain of a domain you already own is a free alternative and needs one DNS record.
  baseUrl: (envUrl || 'https://tshivhidzombedzi.com').replace(/\/$/, ''),

  // The build warns on every run until this is true. It exists because deploying with the
  // wrong baseUrl silently breaks every canonical URL, the sitemap and the share card.
  baseUrlConfirmed: Boolean(envUrl),

  locale: 'en_ZA',
  lang: 'en',
  themeColor: '#0a0a0b',
  ogImage: '/assets/img/og.png',

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Skills', href: '/skills/' },
    { label: 'AI Lab', href: '/lab/' },
    { label: 'Verification', href: '/verification/' },
    { label: 'Education', href: '/education/' },
    { label: 'Career', href: '/career/' },
    { label: 'Contact', href: '/contact/' },
  ],

  footerGroups: [
    {
      title: 'Portfolio',
      links: [
        { label: 'Projects', href: '/projects/' },
        { label: 'Technical skills', href: '/skills/' },
        { label: 'AI Laboratory', href: '/lab/' },
        { label: 'Verification practice', href: '/verification/' },
      ],
    },
    {
      title: 'Professional',
      links: [
        { label: 'About me', href: '/about/' },
        { label: 'Education', href: '/education/' },
        { label: 'Career development', href: '/career/' },
        { label: 'For recruiters', href: '/career/#roles' },
      ],
    },
  ],
};

export default site;
