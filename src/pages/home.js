import { esc, prose, list, section } from '../lib/html.js';
import profile, { methodStatement } from '../data/profile.js';
import { featuredProjects } from '../data/projects.js';
import { completedEducation } from '../data/education.js';

/**
 * Home page.
 *
 * Ordered the way a recruiter reads: who is this, what has he actually built, how does he work,
 * what is he qualified in, how do I contact him.
 *
 * Deliberately NOT included: a statistics panel duplicating the facts row, a six-card grid of
 * "technology interests", and a centred call-to-action band. All three are filler that pad a
 * page without adding information.
 */
export default function home() {
  const facts = [
    { n: '2', label: 'desktop products released', note: 'Hoshidub, Hoshi Nova' },
    { n: '20', label: 'animated episodes produced', note: 'Two seasons, verified 4K' },
    { n: '30', label: 'course videos published', note: 'Built and verified by pipeline' },
    { n: '38', label: 'automated tests on the engine', note: 'Dependency-free, one command' },
  ];

  const focus = [
    {
      t: 'AI evaluation and quality',
      d: 'Held-out validation, checking the measuring instrument before trusting a result, and judging what an output implies rather than only whether its facts are correct.',
      href: '/verification/',
      linkText: 'Verification practice',
    },
    {
      t: 'LLM applications and agents',
      d: 'Constraining behaviour architecturally rather than by instruction, and autonomy loops that decide for themselves what deserves a response.',
      href: '/lab/',
      linkText: 'AI Laboratory',
    },
    {
      t: 'Workflow automation',
      d: 'Production pipelines with gates that can refuse to deliver. Twenty published 4K episodes were produced through one of them, unattended.',
      href: '/projects/hoshi-nova/',
      linkText: 'Hoshi Nova',
    },
    {
      t: 'Privacy and security by design',
      d: 'Processing kept on the user device, guarantees enforced by architecture rather than policy, and an information boundary held in place by an automated test.',
      href: '/projects/hoshidub/',
      linkText: 'Hoshidub',
    },
  ];

  const content = `
<section class="hero">
  <div class="wrap">
    <p class="hero-eyebrow">${esc(profile.role)} &middot; ${esc(profile.location.city)}, ${esc(
      profile.location.country,
    )}</p>
    <h1 class="hero-title">${esc(profile.headline)}</h1>
    <p class="hero-sub">${esc(profile.subheading)}</p>

    <div class="hero-actions">
      <a class="btn btn--primary" href="/projects/">View the work</a>
      <a class="btn btn--ghost" href="/cv/">Curriculum vitae</a>
      <a class="btn btn--quiet" href="${esc(
        profile.contact.linkedin,
      )}" target="_blank" rel="noopener noreferrer">LinkedIn<span class="ext" aria-hidden="true">&#8599;</span></a>
    </div>

    <p class="hero-meta">${esc(profile.availability)}</p>

    <ul class="proof">
      ${list(
        facts,
        (p) => `
      <li>
        <span class="proof-n">${esc(p.n)}</span>
        <span class="proof-l">${esc(p.label)}</span>
        <span class="proof-note">${esc(p.note)}</span>
      </li>`,
      )}
    </ul>
  </div>
</section>

${section({
  id: 'work',
  eyebrow: 'Selected work',
  title: 'Four shipped products and platforms',
  lead:
    'Each case study covers the problem, the architecture, what I was responsible for, what ' +
    'went wrong, how it was tested, and what is not finished.',
  body: `
  <div class="cards cards--2">
    ${list(
      featuredProjects,
      (p) => `
    <article class="card card--project">
      <div class="card-top">
        <span class="pill pill--${esc(p.status.tone)}">${esc(p.status.label)}</span>
        <span class="card-cat">${esc(p.category)}</span>
      </div>
      <h3 class="card-title"><a href="/projects/${esc(p.slug)}/">${esc(p.title)}</a></h3>
      <p class="card-sub">${esc(p.subtitle)}</p>
      <p class="card-body">${esc(p.oneLiner)}</p>
      <ul class="card-metrics">
        ${list(
          p.metrics.slice(0, 3),
          (m) => `<li><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></li>`,
        )}
      </ul>
      <p class="card-more"><a href="/projects/${esc(p.slug)}/">Read the case study</a></p>
    </article>`,
    )}
  </div>
  <p class="sec-foot"><a href="/projects/">All four case studies</a></p>`,
})}

<section class="honesty">
  <div class="wrap">
    <div class="honesty-in">
      <p class="eyebrow">Working method</p>
      <p class="honesty-claim">${esc(methodStatement.claim)}</p>
      <div class="honesty-body">${prose(methodStatement.detail)}</div>
      <div class="honesty-links">
        <a class="btn btn--sm btn--ghost" href="/verification/">Verification practice</a>
        <a class="btn btn--sm btn--quiet" href="/about/">More about how I work</a>
      </div>
    </div>
  </div>
</section>

${section({
  eyebrow: 'Focus',
  title: 'Where my work concentrates',
  body: `
  <div class="cards cards--2">
    ${list(
      focus,
      (i) => `
    <article class="card">
      <h3>${esc(i.t)}</h3>
      <p>${esc(i.d)}</p>
      <p class="card-more"><a href="${esc(i.href)}">${esc(i.linkText)}</a></p>
    </article>`,
    )}
  </div>`,
})}

${section({
  eyebrow: 'Education',
  title: 'Qualifications',
  className: 'alt',
  body: `
  <ul class="edu-strip">
    ${list(
      completedEducation,
      (e) => `
    <li>
      <p class="edu-q">${esc(e.qualification)}</p>
      <p class="edu-i">${esc(e.institution)}</p>
      <p class="edu-m">${esc([e.level, e.result, e.period].filter(Boolean).join(' · '))}</p>
    </li>`,
    )}
  </ul>
  <p class="sec-foot"><a href="/education/">Education in full, including studies in progress</a></p>`,
})}

<section class="cta">
  <div class="wrap cta-in">
    <h2>Currently looking for remote work</h2>
    <p>
      AI evaluation and quality, AI operations, technical support, software testing, or a junior
      AI engineering role. The career page sets out where I fit and where I do not.
    </p>
    <div class="cta-actions">
      <a class="btn btn--primary" href="/contact/">Get in touch</a>
      <a class="btn btn--ghost" href="/career/#roles">Role-by-role fit</a>
    </div>
  </div>
</section>`;

  return {
    path: '/',
    title: 'Home',
    description:
      'AI & Technology Specialist in Pretoria. Two released AI desktop applications, twenty ' +
      'produced 4K episodes, and work I verify before I claim it.',
    content,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: profile.displayName,
        description: profile.subheading,
      },
    ],
  };
}
