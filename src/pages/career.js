import { esc, prose, list, when, section } from '../lib/html.js';
import roadmap, { STEP_STATUS, roadmapCounts, roadmapPrinciples } from '../data/roadmap.js';
import roleGroups, { longTerm } from '../data/roles.js';

/**
 * Career development page. Two jobs in one page:
 *   1. The roadmap (his section 8) — a learning plan with progress tracking and a strict
 *      completion rule.
 *   2. The recruiter role mapping (his section 9) — evidence AND gaps per target role.
 *
 * The gaps are rendered. A role-fit page listing only strengths reads as a sales pitch and gets
 * discounted; one that names its own gaps reads as an assessment and gets trusted.
 */
export default function career() {
  const counts = roadmapCounts();

  const step = (s) => {
    const st = STEP_STATUS[s.status];
    return `
    <li class="step step--${esc(s.status)}">
      <div class="step-n" aria-hidden="true">${esc(s.n)}</div>
      <div class="step-main">
        <div class="step-head">
          <h3>${esc(s.title)}</h3>
          <span class="pill pill--${esc(st.tone)}">${esc(st.label)}</span>
        </div>
        <p class="step-why"><span class="step-k">Why</span> ${esc(s.why)}</p>
        <p class="step-proof"><span class="step-k">Completed when</span> ${esc(s.proof)}</p>
        ${when(
          s.evidence,
          () => `<p class="step-ev"><span class="step-k">Where I am</span> ${esc(s.evidence)}</p>`,
          () => `<p class="step-ev step-ev--none"><span class="step-k">Where I am</span> Not started. No capability claim.</p>`,
        )}
      </div>
    </li>`;
  };

  const roleBlock = (g) => `
  <article class="role role--${esc(g.fit)}" id="role-${esc(g.id)}">
    <div class="role-head">
      <div>
        <span class="pill pill--${g.fit === 'strongest' ? 'live' : g.fit === 'strong' ? 'beta' : 'planned'}">${esc(
          g.fitLabel,
        )}</span>
        <h3>${esc(g.name)}</h3>
      </div>
    </div>
    <ul class="role-titles">
      ${list(g.roles, (r) => `<li>${esc(r)}</li>`)}
    </ul>
    <div class="rich role-sum">${prose(g.summary)}</div>

    <div class="role-split">
      <div class="role-col">
        <h4><span class="status-ic" aria-hidden="true">✓</span> The evidence</h4>
        <ul class="role-ev">
          ${list(
            g.evidence,
            (e) => `
          <li>
            <p class="role-ev-p">${esc(e.point)}</p>
            <p class="role-ev-d">${esc(e.detail)}</p>
            ${when(e.link, () => `<p class="role-ev-l"><a href="${esc(e.link)}">See it<span class="arr" aria-hidden="true">→</span></a></p>`)}
          </li>`,
          )}
        </ul>
      </div>
      <div class="role-col role-col--gap">
        <h4><span class="status-ic" aria-hidden="true">○</span> The gaps</h4>
        <ul class="role-gaps">
          ${list(g.gaps, (x) => `<li>${esc(x)}</li>`)}
        </ul>
        <div class="role-ready">
          <p class="role-ready-k">Where I would start</p>
          <p>${esc(g.ready)}</p>
        </div>
      </div>
    </div>
  </article>`;

  const content = `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Career development</p>
    <h1>Where I am, where I am going, and what is missing.</h1>
    <p class="page-lead">
      Two things on this page. A twelve-step technical roadmap towards AI engineering, where every
      step is completed by building something rather than by finishing a course. And an honest
      role-by-role assessment for the jobs I am applying for — with the gaps listed next to the
      evidence.
    </p>
    <div class="progress-bar-wrap">
      <div class="progress-stats">
        <span><strong>${esc(counts.complete)}</strong> complete &amp; verified</span>
        <span><strong>${esc(counts.active)}</strong> in progress</span>
        <span><strong>${esc(counts.queued)}</strong> queued</span>
      </div>
      <div class="progress-bar" role="img" aria-label="${esc(
        `${counts.complete} of ${counts.total} roadmap steps complete, ${counts.active} in progress`,
      )}">
        <span class="pb pb--complete" style="width:${((counts.complete / counts.total) * 100).toFixed(1)}%"></span>
        <span class="pb pb--active" style="width:${((counts.active / counts.total) * 100).toFixed(1)}%"></span>
      </div>
      <p class="progress-note">
        Nothing is marked complete. That is the accurate state of this roadmap today, and it will
        stay that way until a step's named artefact exists and has been verified.
      </p>
    </div>
  </div>
</section>

${section({
  id: 'roadmap',
  eyebrow: 'Learning roadmap',
  title: 'Twelve steps, in dependency order',
  lead:
    'The order is not arbitrary. Kubernetes is tenth because it is useless before ' +
    'containerisation and managed inference; Python is first because every other step assumes it.',
  body: `<ol class="steps-list">${list(roadmap, step)}</ol>`,
})}

${section({
  eyebrow: 'Method',
  title: 'How this roadmap is run',
  className: 'alt',
  body: `
  <div class="cards cards--2">
    ${list(
      roadmapPrinciples,
      (p) => `
    <article class="card card--principle">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.body)}</p>
    </article>`,
    )}
  </div>`,
})}

${section({
  id: 'roles',
  eyebrow: 'For recruiters',
  title: 'Role-by-role fit, with the gaps',
  lead:
    'Three role groups, ordered by how well I actually match them. Each one lists the evidence ' +
    'and then the gaps. I would rather you discount me now on an accurate picture than in a ' +
    'technical interview on an inflated one.',
  body: `<div class="roles">${list(roleGroups, roleBlock)}</div>`,
})}

${section({
  title: longTerm.title,
  className: 'alt',
  body: `
  <div class="rich">
    ${prose(longTerm.body)}
    <p class="rich-actions">
      <a class="btn btn--primary" href="/cv/">Curriculum vitae</a>
      <a class="btn btn--ghost" href="/verification/">How I verify my own work</a>
      <a class="btn btn--quiet" href="/contact/">Get in touch</a>
    </p>
  </div>`,
})}`;

  return {
    path: '/career/',
    title: 'Career development',
    description:
      'A twelve-step roadmap to AI engineering, each step completed by building, plus honest ' +
      'role-by-role fit for AI evaluation, operations and support work.',
    content,
  };
}
