import { esc, prose, list, when, section } from '../lib/html.js';
import skillCategories, { TIERS, tierCounts } from '../data/skills.js';
import { projectBySlug } from '../data/projects.js';

/**
 * Skills page.
 *
 * The design decision that matters here: NO PERCENTAGE BARS. A "Python 72%" meter is invented
 * precision — nobody can define what 72% means and it is the clearest signal of an inflated
 * portfolio. Instead every skill carries one of three defined tiers and a one-line statement of
 * the evidence behind it, with a link to the project that proves it.
 */
export default function skills() {
  const counts = tierCounts();

  const tierKey = `
  <div class="tier-key">
    ${list(
      Object.values(TIERS),
      (t) => `
    <div class="tier-key-item tier-${esc(t.key)}">
      <p class="tier-key-h"><span class="tier-dot" aria-hidden="true"></span>${esc(t.label)} <span class="tier-count">${esc(
        counts[t.key],
      )}</span></p>
      <p class="tier-key-d">${esc(t.blurb)}</p>
    </div>`,
    )}
  </div>`;

  const skillRow = (s) => {
    const linked = (s.projects || [])
      .map((slug) => projectBySlug(slug))
      .filter(Boolean);
    return `
    <li class="skill tier-${esc(s.tier)}">
      <div class="skill-head">
        <span class="skill-name">${esc(s.name)}</span>
        <span class="tier-tag tier-tag--${esc(s.tier)}">${esc(TIERS[s.tier].label)}</span>
      </div>
      <p class="skill-ev">${esc(s.evidence)}</p>
      ${when(
        linked.length,
        () => `
      <p class="skill-proj">
        ${list(
          linked,
          (pr) => `<a href="/projects/${esc(pr.slug)}/">${esc(pr.title)}</a>`,
        )}
      </p>`,
      )}
    </li>`;
  };

  const content = `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Technical skills</p>
    <h1>Three tiers, defined strictly, with the evidence attached.</h1>
    <p class="page-lead">
      There are no percentage bars on this page. Nobody can say what "Python 72%" means, and a
      skills list that implies that kind of precision is the clearest sign of an inflated
      portfolio. Instead every item sits in one of three tiers and states what is behind it.
    </p>
    ${tierKey}
    <div class="head-note">
      <p>
        <strong>Deliberately absent:</strong> AWS, Kubernetes, Docker, TypeScript, React and model
        training appear nowhere on this page, in any tier. I cannot demonstrate them, so they are
        not skills — they are targets, and they live on the
        <a href="/career/">career roadmap</a> instead. Python appears only under working knowledge,
        with an explicit note, because I have shipped real Python with AI assistance and have not
        completed formal fundamentals.
      </p>
    </div>
  </div>
</section>

${list(
  skillCategories,
  (cat, i) =>
    section({
      id: cat.id,
      eyebrow: `Category ${i + 1} of ${skillCategories.length}`,
      title: cat.name,
      lead: cat.summary,
      className: i % 2 === 1 ? 'alt' : '',
      body: `<ul class="skill-list">${list(cat.skills, skillRow)}</ul>`,
    }),
)}

${section({
  title: 'How to test any of this',
  body: `
  <div class="rich">
    ${prose(`Every "Demonstrated" item above points at a system on this site. I would rather open one
      and walk through the code and the test output than describe it. A claim that does not survive
      that should not be on this page.`)}
    <p class="rich-actions">
      <a class="btn btn--primary" href="/projects/">Case studies</a>
      <a class="btn btn--ghost" href="/verification/">How I verify my own work</a>
      <a class="btn btn--quiet" href="/contact/">Ask me to show you</a>
    </p>
  </div>`,
})}`;

  return {
    path: '/skills/',
    title: 'Technical skills',
    description:
      'Skills in three defined tiers, each with its evidence: demonstrated, working knowledge, ' +
      'currently learning. No percentage bars, no undemonstrable technologies.',
    content,
  };
}
