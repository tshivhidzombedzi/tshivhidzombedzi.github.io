import { esc, prose, list, when, section } from '../lib/html.js';
import labEntries, { LAB_STATUS, labAreas, labCounts } from '../data/lab.js';
import { projectBySlug } from '../data/projects.js';

/**
 * AI Laboratory.
 *
 * Grouped by capability area rather than by project, because that is how an employer reads it:
 * they want to know whether he has done RAG, not which of his apps contains it.
 *
 * The `planned` entries are the point of the page. Listing what has not been built is what makes
 * the implemented entries worth believing.
 */
export default function lab() {
  const counts = labCounts();

  const entry = (e) => {
    const st = LAB_STATUS[e.status];
    const proj = e.project ? projectBySlug(e.project) : null;
    return `
    <article class="lab-entry lab-entry--${esc(e.status)}">
      <div class="lab-top">
        <span class="pill pill--${esc(st.tone)}">${esc(st.label)}</span>
        ${when(
          proj,
          () => `<a class="lab-proj" href="/projects/${esc(proj.slug)}/">${esc(proj.title)}</a>`,
        )}
      </div>
      <h3>${esc(e.title)}</h3>
      <div class="lab-rows">
        <div class="lab-row"><p class="lab-k">What it is</p><p class="lab-v">${esc(e.what)}</p></div>
        <div class="lab-row"><p class="lab-k">How it works</p><p class="lab-v">${esc(e.how)}</p></div>
        <div class="lab-row lab-row--take"><p class="lab-k">What it taught me</p><p class="lab-v">${esc(
          e.takeaway,
        )}</p></div>
      </div>
    </article>`;
  };

  const content = `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">AI Laboratory</p>
    <h1>Fourteen AI capabilities, including the four I have not built.</h1>
    <p class="page-lead">
      Organised by capability rather than by project, because that is the question an employer is
      actually asking. Each entry says what it is, how it works, and what it taught me — and
      carries a status that is enforced strictly.
    </p>

    <div class="lab-key">
      <div class="lab-key-i"><span class="pill pill--live">${esc(LAB_STATUS.implemented.label)}</span>
        <p><strong>${esc(counts.implemented)}</strong> — built, tested and in use. There is an artefact.</p></div>
      <div class="lab-key-i"><span class="pill pill--beta">${esc(LAB_STATUS.partial.label)}</span>
        <p><strong>${esc(counts.partial)}</strong> — built in part, or built and not yet proven in the real world.</p></div>
      <div class="lab-key-i"><span class="pill pill--planned">${esc(LAB_STATUS.planned.label)}</span>
        <p><strong>${esc(counts.planned)}</strong> — not built. No capability claim of any kind.</p></div>
    </div>

    <div class="head-note">
      <p>
        <strong>Why the unbuilt entries are here.</strong> A laboratory page listing only successes
        is a marketing page. RAG, document extraction and production deployment are common
        requirements in AI roles and I have not built them — so they appear with their status
        stated, linked to the roadmap step that will close each gap.
      </p>
    </div>
  </div>
</section>

${list(labAreas, (area, i) => {
  const entries = labEntries.filter((e) => e.area === area);
  return section({
    id: area.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    eyebrow: `Capability area`,
    title: area,
    className: i % 2 === 1 ? 'alt' : '',
    body: `<div class="lab-list">${list(entries, entry)}</div>`,
  });
})}

${section({
  title: 'The pattern across all of it',
  body: `
  <div class="rich">
    ${prose(`Reading these back, the same idea keeps appearing in different clothes: where a behaviour
      genuinely must not happen, remove the capability rather than asking a model to decline.

      The companion that cannot spoil an episode does not have the ending in its context. The
      reasoning agents that must not be omniscient are prevented by a test that fails the build. The
      pipeline that must not deliver bad output has a gate that restores the previous version instead.
      In each case the alternative was an instruction, a convention or a reminder — and all three of
      those are things I would eventually forget or a model would eventually talk its way around.

      That is the most useful thing I have learned building AI products, and it generalises well
      beyond the specific systems here.`)}
    <p class="rich-actions">
      <a class="btn btn--primary" href="/verification/">How I verify results</a>
      <a class="btn btn--ghost" href="/career/">The roadmap that closes the gaps</a>
    </p>
  </div>`,
})}`;

  return {
    path: '/lab/',
    title: 'AI Laboratory',
    description:
      'Fourteen AI capabilities: LLM applications, agents, content evaluation, model testing and ' +
      'workflow automation, including the four I have not built.',
    content,
  };
}
