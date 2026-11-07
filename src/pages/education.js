import { esc, prose, list, when, section } from '../lib/html.js';
import education, { completedEducation, inProgressEducation } from '../data/education.js';

export default function educationPage() {
  const item = (e) => `
  <article class="edu-card${e.unverified ? ' edu-card--prog' : ''}">
    <div class="edu-card-top">
      <span class="pill pill--${e.status === 'completed' ? 'live' : 'beta'}">${esc(
        e.status === 'completed' ? 'Completed' : 'In progress',
      )}</span>
      <span class="card-cat">${esc(e.period)}</span>
    </div>
    <h3>${esc(e.qualification)}</h3>
    <p class="edu-card-i">${esc(e.institution)}${e.location ? ` · ${esc(e.location)}` : ''}</p>
    ${when(
      e.level || e.result,
      () => `
    <p class="edu-card-r">
      ${when(e.level, () => `<span class="tag-strong">${esc(e.level)}</span>`)}
      ${when(e.result, () => `<span class="tag-strong tag-strong--good">${esc(e.result)}</span>`)}
    </p>`,
    )}
    <p class="edu-card-n">${esc(e.note)}</p>
    ${when(
      e.credential,
      () => `<p class="edu-cred">${esc(e.credential)}</p>`,
    )}
    ${when(
      e.outcomes && e.outcomes.length,
      () => `
    <div class="edu-block">
      <p class="edu-block-k">Registered exit-level outcomes</p>
      <ul class="edu-sub">${list(e.outcomes, (o) => `<li>${esc(o)}</li>`)}</ul>
    </div>`,
    )}
    ${when(
      e.curriculum && e.curriculum.length,
      () => `
    <div class="edu-block">
      <p class="edu-block-k">Curriculum covered <span class="edu-src">${esc(
        e.curriculumSource || '',
      )}</span></p>
      <ul class="chips chips--sm">${list(e.curriculum, (c) => `<li>${esc(c)}</li>`)}</ul>
    </div>`,
    )}
    <p class="edu-card-rel"><span class="edu-rel-k">Why it matters here</span> ${esc(e.relevance)}</p>
  </article>`;

  const content = `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Education</p>
    <h1>Qualifications, stated exactly as they are.</h1>
    <p class="page-lead">
      Three completed credentials and one course in progress. The in-progress one is marked that
      way here, is excluded from my CV, and is described nowhere on this site as a completed
      certification — because its completion has not been verified.
    </p>
    <div class="head-note">
      <p>
        <strong>About the curriculum lists.</strong> Each one is taken from the official record
        for that qualification &mdash; the SAQA registration for the Higher Certificate, UNISA's
        own module listing, and the published course syllabus for CS50 AI. They state what the
        programme covers, not a claim that I have mastered every topic in it.
      </p>
    </div>
  </div>
</section>

${section({
  eyebrow: `Completed · ${completedEducation.length}`,
  title: 'Completed qualifications',
  body: `<div class="cards cards--2">${list(completedEducation, item)}</div>`,
})}

${section({
  eyebrow: `In progress · ${inProgressEducation.length}`,
  title: 'Studies in progress',
  className: 'alt',
  lead:
    'Listed separately and deliberately. A portfolio that blurs the line between studying ' +
    'something and having completed it is misrepresenting a qualification, which is the single ' +
    'easiest thing for an employer to check.',
  body: `<div class="cards cards--2">${list(inProgressEducation, item)}</div>`,
})}

${section({
  title: 'What formal study gave me, and what it did not',
  body: `
  <div class="rich">
    ${prose(`The Higher Certificate in IT Support Services is the reason troubleshooting appears on my
      skills page as demonstrated rather than claimed — it gave me a method for isolating a fault
      rather than guessing at it, and I use that method on production systems weekly.

      The Information Security module is my strongest academic result, and it shows up in my work in
      a way I did not expect: the decision that one of my products should process everything on the
      user's own device, hold no account and transmit nothing came from thinking about the data I
      would otherwise be responsible for. That is a security-trained instinct applied to a product
      decision, years after the exam.

      What formal study has not given me is the AI and machine learning foundation I am working
      towards. CS50 AI with Python is in progress and incomplete, and the twelve-step roadmap on my
      Career page is how I intend to close the rest. Nothing on that roadmap is marked complete
      today.`)}
    <p class="rich-actions">
      <a class="btn btn--primary" href="/career/">Career development roadmap</a>
      <a class="btn btn--ghost" href="/skills/">Technical skills</a>
    </p>
  </div>`,
})}`;

  return {
    path: '/education/',
    title: 'Education',
    description:
      'Higher Certificate in IT Support Services (2024), Information Security at NQF level 8 with ' +
      'distinction (2021), Google Analytics IQ, and CS50 AI in progress.',
    content,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Education and credentials',
        itemListElement: education.map((e, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${e.qualification} — ${e.institution}`,
        })),
      },
    ],
  };
}
