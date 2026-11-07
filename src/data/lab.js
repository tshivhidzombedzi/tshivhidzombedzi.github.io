/**
 * AI Laboratory.
 *
 * Organised by the capability areas that matter for AI roles. Each entry carries a status
 * that is enforced strictly:
 *
 *   implemented - Built AND tested AND in use. There is an artefact.
 *   partial     - Built in part, or built and not yet proven in the real world.
 *   planned     - Not built. No capability claim. Present because the gap is worth naming.
 *
 * `planned` entries are deliberately included. A laboratory page that lists only successes
 * is a marketing page. Naming what I have not built is the thing that makes the rest credible.
 */

export const LAB_STATUS = {
  implemented: { key: 'implemented', label: 'Implemented & tested', tone: 'live' },
  partial: { key: 'partial', label: 'Partially built', tone: 'beta' },
  planned: { key: 'planned', label: 'Planned — not built', tone: 'planned' },
};

export const labEntries = [
  {
    area: 'LLM applications',
    title: 'Spoiler-safe episode companion',
    status: 'implemented',
    project: 'hoshidub',
    what:
      'A conversational character that discusses a video the viewer is watching and is structurally unable to reveal what has not yet played.',
    how:
      'The guarantee is architectural, not instructional. The model is only ever given the portion of the episode that has already been shown, so a request for the ending cannot be satisfied — there is nothing in context to leak. A prompt instruction would have been talked around on day one.',
    takeaway:
      'Where a behaviour genuinely must not happen, remove the capability rather than asking the model to decline. Policies are negotiable; absent context is not.',
  },
  {
    area: 'LLM applications',
    title: 'Register control for a non-assistant voice',
    status: 'implemented',
    project: 'hoshi-live',
    what:
      'A live presenter that does not sound like a chatbot, despite being driven by an instruction-tuned model.',
    how:
      'Personality expressed as a constraint on style rather than a long instruction, plus a filtering layer that rejects assistant phrasing before it reaches speech synthesis.',
    takeaway:
      'The default register of an instruction-tuned model is a persistent product problem. Post-generation filtering proved more reliable than asking the model to be someone else.',
  },
  {
    area: 'AI agents',
    title: 'Unattended presenter with an autonomy loop',
    status: 'partial',
    project: 'hoshi-live',
    what:
      'An agent that decides what to respond to, when to speak, when to stay silent and when to introduce a new topic, over a long session, with no operator input.',
    how:
      'A director loop owns every decision and treats the language model as one input among several — chat events, silence duration, on-screen activity. Safety controls (emergency stop, moderation, per-viewer forget) were built before any thought of an audience.',
    takeaway:
      'Honest status: it runs unattended in testing and has never done so in public. The loop is built; the proof is not. That distinction is the whole reason this is marked partial.',
  },
  {
    area: 'AI agents',
    title: 'Enforced information boundary for reasoning agents',
    status: 'implemented',
    project: 'friend-debt-engine',
    what:
      'Eight simulated agents reasoning about each other under uncertainty, with an automated guarantee that none of them can see the hidden truth they are meant to deduce.',
    how:
      'Knowledge is modelled with provenance — who knows what, from whom, when — and a test scans the agent-reasoning code for any access to ground-truth state and fails the suite if it finds one.',
    takeaway:
      'This is the same control as keeping a model away from its test set, and it belongs in a test rather than in a convention. A documented rule decays; a failing test does not.',
  },
  {
    area: 'AI content evaluation',
    title: 'Automated narration verification',
    status: 'implemented',
    project: 'course-pipeline',
    what:
      'Every one of thirty produced lessons had its synthesised narration transcribed back by speech recognition and compared against the written script before release.',
    how:
      'ASR as an instrument rather than a feature. A synthesis dropout or a wrong take produces a transcript mismatch, which is detectable automatically; a human reviewing thirty videos will miss some and will be bored by the fourth.',
    takeaway:
      'Generated output needs a machine-checkable definition of correct. Without one, quality control is someone\'s attention span.',
  },
  {
    area: 'AI content evaluation',
    title: 'Pedagogical review: correct content that teaches the wrong thing',
    status: 'implemented',
    project: 'course-pipeline',
    what:
      'A review stage that asks what a reader would conclude, rather than only whether the facts are accurate.',
    how:
      'It exists because a chart in a risk-management lesson was entirely accurate and taught the opposite of the lesson: plotting balance over a profitable sequence made the high-risk setting look better. Changing the measure to drawdown-from-peak fixed it. No factual check would ever have flagged it.',
    takeaway:
      'The most dangerous failure in generated content is not inaccuracy, it is accurate material that implies something false. Catching it means evaluating the inference a reader will draw, not the facts on the page, which is what content evaluation work consists of.',
  },
  {
    area: 'Model testing and evaluation',
    title: 'Split-half adoption testing',
    status: 'implemented',
    project: 'apex-drawdown-zero',
    what:
      'A rule that a change is adopted only if it independently improves both halves of a held-out split, with documented rejections.',
    how:
      'Candidate changes are measured in-sample and out-of-sample separately. Several structurally appealing improvements were rejected for failing one half while improving the total — including one that produced more winners and lost money.',
    takeaway:
      'Aggregate improvement hides overfitting. A held-out split with an adoption rule is the cheapest defence available, and the discipline is identical whether the thing being evaluated is a strategy or a model.',
  },
  {
    area: 'Model testing and evaluation',
    title: 'Measurement-instrument validation',
    status: 'implemented',
    project: 'apex-drawdown-zero',
    what:
      'Establishing that the platform\'s own reported success metric was wrong for my system, and rebuilding the measurement before trusting any result.',
    how:
      'Partial closes mean one outcome produces two platform records, inflating the reported count and win rate. Records are now paired back into outcomes before anything is measured. The change I eventually adopted moves the platform\'s reported figure down while the true figure goes up.',
    takeaway:
      'Validate the instrument before the hypothesis. Trusting the dashboard would have rejected a genuine improvement, and I would never have known.',
  },
  {
    area: 'AI workflow automation',
    title: 'Unattended media production with a delivery gate',
    status: 'implemented',
    project: 'hoshi-nova',
    what:
      'Twenty 4K episodes produced from structured data with no human in the loop during production, and an automated gate that can refuse to deliver.',
    how:
      'Separately runnable stages, a resumable queue that outlives its controlling session, and a gate measuring resolution, frame rate and audio level that restores the previous master on failure.',
    takeaway:
      'Automating production without automating refusal just produces bad output faster. The gate is the part that makes the automation trustworthy.',
  },
  {
    area: 'AI workflow automation',
    title: 'Generated educational content at scale, published',
    status: 'implemented',
    project: 'course-pipeline',
    what:
      'Thirty lessons and thirty vertical shorts, each with six artefacts, generated, verified and scheduled across ten weeks.',
    how:
      'Lesson-as-data-file, real market data behind every chart, a compute-before-you-write rule for every figure, and resumable publishing automation.',
    takeaway:
      'Consistency is the real deliverable in a course, and consistency is the first thing a human doing repetitive work loses.',
  },
  {
    area: 'Document intelligence',
    title: 'Subtitle-track parsing and schedule-driven synthesis',
    status: 'partial',
    project: 'hoshidub',
    what:
      'Parsing a structured timed-text document and using its timing to drive real-time speech synthesis ahead of each cue.',
    how:
      'The subtitle track is the document; its cue times are the schedule. Lines are synthesised before they are needed, which is what produces zero delay.',
    takeaway:
      'Marked partial deliberately. This is structured-document parsing, not document intelligence in the sense an employer means it — no layout analysis, no extraction from unstructured or scanned sources, no OCR.',
  },
  {
    area: 'Retrieval-augmented generation',
    title: 'RAG over my own project corpus',
    status: 'planned',
    project: null,
    what:
      'Not built. The intended first build: retrieval over my own technical documentation, decisions and rejected experiments, so the reasoning behind a past decision is answerable with citations.',
    how:
      'Planned as chunking and embedding the corpus, a vector store, retrieval with citation of the source document, and an evaluation set scoring retrieval relevance and answer groundedness separately.',
    takeaway:
      'Named as a gap rather than implied as a capability. I have built context-constrained LLM features; I have never built a retrieval pipeline. It is step 6 on the roadmap and the evaluation harness matters to me more than the retrieval.',
  },
  {
    area: 'Document intelligence',
    title: 'Extraction from unstructured documents',
    status: 'planned',
    project: null,
    what:
      'Not built. Extracting structured fields from invoices, statements and reports with a confidence score and a human review path for low-confidence output.',
    how:
      'Planned with a labelled evaluation set from the start, scored per field, because an extraction system without per-field accuracy figures cannot be trusted or improved.',
    takeaway:
      'Listed because it is a common requirement in AI operations roles and I want the gap visible rather than papered over.',
  },
  {
    area: 'Production AI deployment',
    title: 'Containerised model serving with monitoring',
    status: 'planned',
    project: null,
    what:
      'Not built. Everything I have deployed runs either on a single workstation or on PHP shared hosting.',
    how:
      'Roadmap steps 7 through 12: containerisation, a managed inference service, then monitoring for latency, cost, error rate and output drift.',
    takeaway:
      'The honest boundary of my current ability. I can build and verify an AI product on one machine; I have never operated one at scale, and no part of this site implies I have.',
  },
];

export const labAreas = [...new Set(labEntries.map((e) => e.area))];
export const labByStatus = (key) => labEntries.filter((e) => e.status === key);
export const labCounts = () => ({
  implemented: labByStatus('implemented').length,
  partial: labByStatus('partial').length,
  planned: labByStatus('planned').length,
});

export default labEntries;
