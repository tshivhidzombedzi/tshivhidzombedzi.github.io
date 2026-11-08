import { esc, prose, list, when, section } from '../lib/html.js';
import profile from '../data/profile.js';
import services, { engagementTypes, terms } from '../data/services.js';

/**
 * Hire me.
 *
 * The rest of the site explains what he has built. This page tells a company what they can
 * buy and how to start — which for a candidate with no formal employment history is the
 * difference between interest and action.
 *
 * The paid trial task is deliberately first. It is the offer that lowers the barrier for
 * exactly the hesitation he faces: no references, no employment history. A hiring manager
 * risking a few hours of paid work is a far easier yes than one risking a hire.
 *
 * No rates, no turnaround promises, no invented clients. See src/data/services.js.
 */
export default function hire() {
  const content = `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Hire me</p>
    <h1>What you can actually buy, and how to start.</h1>
    <p class="page-lead">
      Six things I can be engaged to do, each one backed by work on this site rather than by a
      claim. Available for a paid trial task, contract work, part-time hours or a full-time
      remote role.
    </p>
    <div class="hero-actions">
      <a class="btn btn--primary" href="mailto:${esc(profile.contact.email)}?subject=Work%20enquiry">Start a conversation</a>
      <a class="btn btn--ghost" href="/cv/">Curriculum vitae</a>
    </div>
    <p class="hero-meta">${esc(profile.availability)} &middot; ${esc(profile.timezone)}</p>
  </div>
</section>

${section({
  eyebrow: 'Ways to work together',
  title: 'Four ways in, smallest first',
  className: 'alt',
  body: `
  <div class="cards cards--2">
    ${list(
      engagementTypes,
      (e) => `
    <article class="card${e.featured ? ' card--lead' : ''}">
      ${when(e.featured, () => `<p class="card-flag">Start here</p>`)}
      <h3>${esc(e.t)}</h3>
      <p>${esc(e.d)}</p>
      <p class="card-best">${esc(e.best)}</p>
    </article>`,
    )}
  </div>`,
})}

${section({
  eyebrow: 'Services',
  title: 'Six things I can be engaged to do',
  lead:
    'Each lists what you actually receive, and links to the work that shows I have done it ' +
    'before. Nothing is offered here that I cannot point at prior evidence for.',
  body: `
  <div class="svc-list">
    ${list(
      services,
      (s, i) => `
    <article class="svc">
      <p class="svc-n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</p>
      <div class="svc-main">
        <h3>${esc(s.t)}</h3>
        <p class="svc-what">${esc(s.what)}</p>
        <div class="svc-cols">
          <div>
            <p class="svc-k">What you get</p>
            <ul class="check-list">${list(s.deliver, (d) => `<li>${esc(d)}</li>`)}</ul>
          </div>
          <div>
            <p class="svc-k">Evidence</p>
            <p class="svc-ev">${esc(s.evidence)}</p>
            <p class="svc-link"><a href="${esc(s.href)}">See it</a></p>
          </div>
        </div>
      </div>
    </article>`,
    )}
  </div>`,
})}

${section({
  eyebrow: 'Terms',
  title: 'Rates, and what I will not pretend',
  className: 'alt',
  body: `
  <div class="rich">
    ${prose(terms.rates)}
  </div>
  <div class="callout">
    <p class="callout-h">Three things worth saying before you ask</p>
    <ul class="honest-list">
      ${list(terms.honest, (h) => `<li>${esc(h)}</li>`)}
    </ul>
  </div>`,
})}

<section class="cta">
  <div class="wrap cta-in">
    <h2>Send me the scope and I will tell you honestly whether I can do it</h2>
    <p>
      Including when the answer is no. If a paid trial task is the easiest way to find out,
      propose one — that is what it is there for.
    </p>
    <div class="cta-actions">
      <a class="btn btn--primary" href="mailto:${esc(profile.contact.email)}?subject=Work%20enquiry">${esc(
        profile.contact.emailLabel,
      )}</a>
      <a class="btn btn--ghost" href="${esc(
        profile.contact.linkedin,
      )}" target="_blank" rel="noopener noreferrer">LinkedIn<span class="ext" aria-hidden="true">&#8599;</span></a>
    </div>
  </div>
</section>`;

  return {
    path: '/hire/',
    title: 'Hire me',
    description:
      'Six services you can engage me for: AI output evaluation, content review, evaluation ' +
      'design, workflow automation, technical documentation and IT support. Remote.',
    content,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Services',
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.t,
        })),
      },
    ],
  };
}
