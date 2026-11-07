import { esc, prose, list, when, section, link } from '../lib/html.js';
import profile from '../data/profile.js';

/**
 * Contact page.
 *
 * NO CONTACT FORM. A form on a static site needs a third-party endpoint, which means a
 * dependency, a privacy policy obligation and a thing that silently breaks. A mailto link
 * always works and he will actually receive the mail. Recruiters email; they do not fill in forms.
 *
 * Phone number and GitHub are deliberately absent. Private business addresses and properties
 * are excluded entirely: this portfolio is for employment, not for advertising them.
 */
export default function contact() {
  const channels = [
    {
      k: 'Email',
      v: profile.contact.emailLabel,
      href: `mailto:${profile.contact.email}`,
      note: 'The fastest way to reach me. I reply to everything that is not automated.',
      primary: true,
    },
    {
      k: 'LinkedIn',
      v: profile.contact.linkedinLabel,
      href: profile.contact.linkedin,
      note: 'Connect or message directly.',
      primary: true,
    },
  ];

  const content = `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Contact</p>
    <h1>Get in touch.</h1>
    <p class="page-lead">
      I am ${esc(profile.availability.toLowerCase())}, based in ${esc(profile.location.city)},
      ${esc(profile.location.country)}, working in ${esc(profile.timezone)} — which overlaps the
      full European working day and the first half of the US Eastern one.
    </p>
  </div>
</section>

${section({
  body: `
  <div class="contact-grid">
    <div class="contact-main">
      <ul class="contact-list">
        ${list(
          channels,
          (c) => `
        <li class="contact-item${c.primary ? ' contact-item--primary' : ''}">
          <p class="contact-k">${esc(c.k)}</p>
          <p class="contact-v">${link(c.href, c.v)}</p>
          <p class="contact-n">${esc(c.note)}</p>
        </li>`,
        )}
      </ul>

      <div class="callout">
        <p class="callout-h">There is no contact form on this page, on purpose</p>
        ${prose(`A form on a static site needs a third-party endpoint to receive it — which is a
          dependency that can break silently and a privacy obligation I would rather not take on for
          no benefit. Email reaches me directly and always works. Recruiters email anyway.`)}
      </div>
    </div>

    <aside class="contact-side">
      <div class="side-card">
        <p class="side-h">What I am looking for</p>
        <ul class="side-list">
          <li>AI quality rating, evaluation and training</li>
          <li>AI operations and technical support</li>
          <li>Software testing and QA</li>
          <li>Junior AI engineering, in a team that uses AI-assisted development openly</li>
        </ul>
        <p class="side-note">Fully remote. Contract or permanent.</p>
        <a class="btn btn--sm btn--ghost" href="/career/#roles">Role-by-role fit</a>
      </div>

      <div class="side-card">
        <p class="side-h">Before you write</p>
        ${prose(`If you want to know whether I can actually do something, the
          <a href="/verification/">Verification page</a> is the most useful thing on this site, and
          every case study lists what is <em>not</em> built. I would rather be assessed on that than
          on a pitch.`)}
      </div>

      <div class="side-card">
        <p class="side-h">Documents</p>
        <ul class="side-list">
          <li><a href="/cv/">Curriculum vitae (online)</a></li>
          <li><a href="/assets/docs/${esc(profile.cv.fileName)}" download>Download CV (.docx)</a></li>
          <li><a href="/assets/docs/${esc(profile.cv.mdName)}" download>Download CV (plain text)</a></li>
        </ul>
      </div>
    </aside>
  </div>`,
})}

${section({
  title: 'Also worth knowing',
  className: 'alt',
  body: `
  <div class="cards cards--3">
    <article class="card">
      <h3>Time zone overlap</h3>
      <p>${esc(profile.timezone)}. Full overlap with Europe and the UK; mornings overlap with US Eastern. I have been running unattended overnight jobs for a year, so asynchronous work is already how I operate.</p>
    </article>
    <article class="card">
      <h3>English</h3>
      <p>Fluent, and all my written documentation, product copy and 30 scripted lessons are my own work. Written communication is a large part of what I am offering.</p>
    </article>
    <article class="card">
      <h3>Verification of claims</h3>
      <p>My qualifications are verifiable directly with IIE Rosebank College and UNISA, and the produced episode work is public and linked from its case study. Please check any of it.</p>
    </article>
  </div>`,
})}

<section class="cta">
  <div class="wrap cta-in">
    <h2>Tell me what the role needs</h2>
    <p>I will say plainly whether I can do it, including when the answer is no.</p>
    <div class="cta-actions">
      <a class="btn btn--primary" href="mailto:${esc(profile.contact.email)}">${esc(profile.contact.emailLabel)}</a>
      <a class="btn btn--ghost" href="${esc(profile.contact.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn<span class="ext" aria-hidden="true">↗</span></a>
    </div>
  </div>
</section>`;

  return {
    path: '/contact/',
    title: 'Contact',
    description:
      'Contact Tshivhidzo "Moss" Mbedzi, AI & Technology Specialist in Pretoria, South Africa. ' +
      'Open to remote AI evaluation, operations and support roles.',
    content,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact',
        description: 'How to reach Tshivhidzo Mbedzi.',
      },
    ],
  };
}
