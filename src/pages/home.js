import { esc, prose, list, section } from '../lib/html.js';
import profile, { methodStatement } from '../data/profile.js';
import { featuredProjects } from '../data/projects.js';
import { completedEducation } from '../data/education.js';

/**
 * Home page.
 *
 * Ordered for how a recruiter actually reads: what am I looking at, can this person do the job
 * I am hiring for, is there proof, how do they work, how do I reach them.
 *
 * The "Open to" strip sits directly under the hero on purpose. Target roles previously lived
 * only on the Career page, which meant someone landing here could not tell in five seconds what
 * to hire him for — the most expensive thing a job-seeking portfolio can get wrong.
 *
 * Deliberately NOT included: a statistics panel duplicating the facts row, and a centred
 * call-to-action band. Both pad a page without adding information.
 */
export default function home() {
  // Every figure here is supported by a case study on this site.
  const facts = [
    { n: '2', label: 'desktop applications released', note: 'Built on locally hosted AI models' },
    { n: '20', label: 'episodes produced in 4K', note: 'Unattended, from structured data' },
    { n: '38', label: 'automated tests on one engine', note: 'Dependency-free, one command' },
    { n: '6', label: 'times I discarded my own results', note: 'Documented, with the evidence' },
  ];

  const openTo = [
    'AI Quality Rater',
    'AI Evaluator',
    'AI Trainer',
    'AI Content Analyst',
    'AI Operations Specialist',
    'IT Support Specialist',
    'Software Testing Assistant',
    'Junior AI Engineer',
  ];

  // Written in the language of the job rather than the language of the project.
  const canDo = [
    {
      t: 'Judge whether AI output is actually good',
      d: 'Not only whether the facts are right, but what a reader would conclude from it. I caught a chart in my own material that was completely accurate and taught the opposite of its lesson.',
      href: '/verification/',
      linkText: 'Six documented cases',
    },
    {
      t: 'Design an evaluation that survives scrutiny',
      d: 'Held-out splits with an adoption rule, instrument checks before hypothesis tests, and fixed randomness so that two runs are comparable at all.',
      href: '/verification/#metric',
      linkText: 'How I test',
    },
    {
      t: 'Build and run AI systems end to end',
      d: 'Speech recognition, synthesis and language models running locally, wired into pipelines that run unattended and refuse to deliver output failing a check.',
      href: '/projects/hoshi-nova/',
      linkText: 'Hoshi Nova',
    },
    {
      t: 'Keep a working system alive',
      d: 'A GPU workstation under sustained load, long unattended jobs, root-cause diagnosis, and a formal IT support qualification behind it.',
      href: '/career/#role-operations',
      linkText: 'Operations fit',
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
      <a class="btn btn--quiet" href="mailto:${esc(profile.contact.email)}">${esc(
        profile.contact.emailLabel,
      )}</a>
    </div>

    <div class="open-to">
      <p class="open-to-k">Open to &mdash; remote, available immediately</p>
      <ul class="chips">
        ${list(openTo, (r) => `<li>${esc(r)}</li>`)}
      </ul>
    </div>

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
  id: 'can-do',
  eyebrow: 'What I can do',
  title: 'Four things I would bring on day one',
  lead: 'Each one links to the evidence behind it, including the parts that did not work.',
  className: 'alt',
  body: `
  <div class="cards cards--2">
    ${list(
      canDo,
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
  id: 'work',
  eyebrow: 'Selected work',
  title: 'Six systems, built and shipped',
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
  <p class="sec-foot"><a href="/projects/">All six case studies</a></p>`,
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
  eyebrow: 'Education',
  title: 'Qualifications',
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
      <a class="btn btn--primary" href="/hire/">What you can hire me for</a>
      <a class="btn btn--ghost" href="/career/#roles">Role-by-role fit</a>
    </div>
  </div>
</section>`;

  return {
    path: '/',
    title: 'Home',
    description:
      'AI & Technology Specialist in Pretoria. Open to remote AI evaluation, AI operations ' +
      'and IT support roles. Two released AI applications, verified work.',
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
