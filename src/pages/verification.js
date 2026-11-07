import { esc, prose, list, section } from '../lib/html.js';
import {
  verificationIntro,
  verificationCases,
  verificationPractices,
} from '../data/verification.js';
import { renderDiagram } from '../templates/diagrams.js';

/**
 * Verification page — the most important page on the site for his stated targets.
 *
 * It is a page of six times he was wrong. That is an unusual thing to put in a portfolio and it
 * is the correct thing here: AI quality rating, evaluation and training roles hire for exactly
 * this disposition, and nobody else's portfolio has it.
 */
export default function verification() {
  const caseBlock = (c, i) => `
  <article class="vcase" id="${esc(c.id)}">
    <div class="vcase-head">
      <span class="vcase-n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <div>
        <p class="vcase-disc">${esc(c.discipline)}</p>
        <h3>${esc(c.title)}</h3>
        <p class="vcase-proj"><a href="/projects/${esc(c.project)}/">${esc(c.projectLabel)}</a></p>
      </div>
    </div>
    <div class="vcase-body">
      <div class="vrow">
        <p class="vk">What happened</p>
        <div class="vv">${prose(c.what)}</div>
      </div>
      <div class="vrow">
        <p class="vk">Why it mattered</p>
        <div class="vv">${prose(c.whyItMattered)}</div>
      </div>
      <div class="vrow">
        <p class="vk">What I did</p>
        <div class="vv">${prose(c.whatIDid)}</div>
      </div>
      <div class="vrow vrow--lesson">
        <p class="vk">The lesson</p>
        <div class="vv">${prose(c.lesson)}</div>
      </div>
      <div class="vrow vrow--rel">
        <p class="vk">Why this transfers to AI work</p>
        <div class="vv"><p>${esc(c.relevance)}</p></div>
      </div>
    </div>
  </article>`;

  const content = `
<section class="page-head page-head--verify">
  <div class="wrap">
    <p class="eyebrow">Verification practice</p>
    <h1>${esc(verificationIntro.claim)}</h1>
    <div class="page-lead">${prose(verificationIntro.body)}</div>
    <div class="head-note head-note--accent">
      <p>
        <strong>Why this page exists.</strong> The roles I am targeting — AI quality rating, AI
        evaluation, AI training, AI quality assurance — exist because AI output cannot be trusted
        without someone checking it. Anyone can claim to be rigorous. These are six dated cases
        where the flawed result was mine, it looked good, no one else would have caught it, and I
        threw the conclusion away.
      </p>
    </div>
  </div>
</section>

<section class="vcases-sec">
  <div class="wrap">
    <h2 class="sr-only">The six cases</h2>
    <div class="vcases">
      ${list(verificationCases, caseBlock)}
    </div>
  </div>
</section>

${section({
  eyebrow: 'The method',
  title: 'The adoption test those cases produced',
  className: 'alt',
  lead:
    'Every candidate change to my trading product now goes through this. The specific domain is ' +
    'incidental — the structure is the same one an evaluation harness needs.',
  body: renderDiagram('evalLoop'),
})}

${section({
  eyebrow: 'Practices',
  title: 'Eight rules, each earned by getting it wrong',
  body: `
  <ol class="practice-list">
    ${list(
      verificationPractices,
      (p) => `
    <li>
      <h3>${esc(p.rule)}</h3>
      <p>${esc(p.body)}</p>
    </li>`,
    )}
  </ol>`,
})}

${section({
  title: 'What I have not done',
  className: 'alt',
  body: `
  <div class="rich">
    ${prose(`To keep this page honest about itself: I have never worked to a published rating rubric,
      and my judgements have never been calibrated against another rater. Inter-rater agreement is a
      measurement I have not been subject to, and it is the standard instrument of the field I am
      applying into.

      I have also never evaluated another organisation's model outputs, to their guidelines, at
      volume, against a deadline. Doing it on my own systems where I set the standard is easier in
      one important respect: nobody was disagreeing with me.

      Building a published evaluation harness — a rubric, a scored test set and measured agreement
      with a second rater — is step 5 on my roadmap, and it is the step I most want to do.`)}
    <p class="rich-actions">
      <a class="btn btn--primary" href="/career/#roles">Role-by-role fit</a>
      <a class="btn btn--ghost" href="/contact/">Get in touch</a>
    </p>
  </div>`,
})}`;

  return {
    path: '/verification/',
    title: 'Verification practice',
    description:
      'Six documented cases where I found the fault in my own results and discarded the ' +
      'conclusion. The evidence behind my evaluation discipline.',
    content,
  };
}
