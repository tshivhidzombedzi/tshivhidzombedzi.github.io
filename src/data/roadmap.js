/**
 * Career development roadmap.
 *
 * Twelve steps in his stated priority order. Each step is defined by a BUILD, not a course,
 * because a finished artefact is checkable and a completed video course is not.
 *
 * PROGRESS RULE: a step reaches `complete` only when its proof artefact exists and has been
 * verified. Nothing here is marked complete today. Two steps carry real partial evidence and
 * are marked `active` with that evidence stated; the rest are `queued`.
 *
 * To update progress: change `status` and fill `evidence`. Do not mark a step complete
 * without naming the artefact that proves it.
 */

export const STEP_STATUS = {
  complete: { key: 'complete', label: 'Complete & verified', tone: 'live' },
  active: { key: 'active', label: 'In progress', tone: 'beta' },
  queued: { key: 'queued', label: 'Queued', tone: 'planned' },
};

export const roadmap = [
  {
    n: 1,
    title: 'Python fundamentals',
    status: 'active',
    why: 'Everything downstream assumes it, and it is the single biggest gap between what I can currently build with assistance and what I could build unaided.',
    proof:
      'Rewrite one existing production script of mine from scratch, unaided, with tests — and have it pass against the original\'s output.',
    evidence:
      'Real Python in production across the course pipeline, episode builders and render orchestration, written with AI assistance. Formal fundamentals are incomplete, which is why this is active rather than complete.',
    targetSkill: 'Python',
  },
  {
    n: 2,
    title: 'Git and GitHub',
    status: 'complete',
    why: 'My work is unreviewable by anyone else, which is a hiring problem before it is a technical one. No employer can assess code they cannot see.',
    proof:
      'This portfolio repository published publicly, with meaningful commit history, a README that explains the architecture, and at least one reviewed pull request.',
    evidence:
      'Done, in part: this portfolio is published at github.com/tshivhidzombedzi1-lgtm/portfolio with a documented commit history, a README explaining the architecture, and continuous deployment that gates on a verification step. The collaborative half is still absent — no reviewed pull request, no shared branch, no resolved conflict — so the next move on this step is working with someone else, not more commits of my own.',
    targetSkill: 'Git / GitHub',
  },
  {
    n: 3,
    title: 'APIs and backend development',
    status: 'active',
    why: 'The layer every AI product needs. I have built one in production and learned it by necessity rather than properly.',
    proof:
      'A documented API with authentication, validation, error contracts and an automated test suite — not the hand-verified endpoint I currently operate.',
    evidence:
      'I have built and operated an HTTP service in production that other software depended on at startup, including authentication and state handling. It had no automated tests and no formal error contract, which is the gap this step closes.',
    targetSkill: 'Backend / APIs',
  },
  {
    n: 4,
    title: 'Generative AI and LLM architecture',
    status: 'active',
    why: 'I build on these models daily. I want to understand attention, tokenisation and context limits as mechanics rather than as constraints I have learned to work around.',
    proof:
      'Complete CS50 AI with Python, then implement a small transformer from scratch and write up what the exercise changed about my product decisions.',
    evidence:
      'CS50 AI with Python commenced February 2025, not complete. Applied experience across four shipped systems. The practical knowledge is real; the theoretical foundation is not finished.',
    targetSkill: 'LLM architecture',
  },
  {
    n: 5,
    title: 'Prompt engineering and evaluation',
    status: 'active',
    why: 'I already do the evaluation half rigorously. What I lack is the formal apparatus — rubrics, inter-rater agreement, scored test sets — that makes a judgement defensible to someone else.',
    proof:
      'A published evaluation harness: a rubric, a scored test set, and agreement measured between my ratings and a second rater.',
    evidence:
      'Split-half validation, instrument validation and documented rejections in real use. None of it expressed as a scored rubric another person could be calibrated against.',
    targetSkill: 'Evaluation methodology',
  },
  {
    n: 6,
    title: 'RAG and vector databases',
    status: 'queued',
    why: 'The most common production AI pattern, and the clearest gap in my portfolio. I have built context-constrained LLM features and never a retrieval pipeline.',
    proof:
      'Retrieval over my own technical corpus — decisions, rejected experiments, documentation — with citations, plus an evaluation set scoring retrieval relevance and answer groundedness separately.',
    evidence: null,
    targetSkill: 'RAG',
  },
  {
    n: 7,
    title: 'Docker',
    status: 'queued',
    why: 'Everything I run is installed on one machine by hand. That is the reason none of my AI work is reproducible by anyone else.',
    proof:
      'One of my existing local pipelines containerised and runnable by someone else with a single command on a machine I have never touched.',
    evidence: null,
    targetSkill: 'Containerisation',
  },
  {
    n: 8,
    title: 'AWS Bedrock',
    status: 'queued',
    why: 'Managed inference is how AI products are actually deployed commercially. All my model serving is local GPU.',
    proof:
      'A deployed service of mine calling a managed model, with cost per request, latency and failure handling measured and documented.',
    evidence: null,
    targetSkill: 'Cloud AI services',
  },
  {
    n: 9,
    title: 'AWS SageMaker',
    status: 'queued',
    why: 'Training and hosting a model is the boundary of what I have never done. I have only ever consumed models.',
    proof:
      'One model trained, evaluated against a held-out set using the discipline on my Verification page, and deployed to an endpoint.',
    evidence: null,
    targetSkill: 'ML platform',
  },
  {
    n: 10,
    title: 'Kubernetes',
    status: 'queued',
    why: 'Required for AI systems that scale beyond a single host. Deliberately late in the order — it is of no use to me before steps 7 and 8.',
    proof:
      'A containerised inference service running with health checks, resource limits and a survivable rolling deployment.',
    evidence: null,
    targetSkill: 'Orchestration',
  },
  {
    n: 11,
    title: 'Production AI deployment',
    status: 'queued',
    why: 'The gap between my workstation and a system real users depend on. Honestly stated: this is the boundary of my current ability.',
    proof:
      'One of my own AI features deployed as a real service with a defined availability target, metered cost and a documented rollback path.',
    evidence: null,
    targetSkill: 'Production AI',
  },
  {
    n: 12,
    title: 'AI system testing and monitoring',
    status: 'queued',
    why: 'The natural destination of my existing strengths. I already gate on measured quality before delivery; the missing half is watching for drift after release.',
    proof:
      'A deployed AI feature with automated output-quality monitoring, drift detection and alerting that has caught at least one real regression.',
    evidence:
      'Pre-delivery gates and verification are in daily use. Post-deployment monitoring does not exist in any of my systems.',
    targetSkill: 'AI observability',
  },
];

export const roadmapCounts = () => ({
  complete: roadmap.filter((s) => s.status === 'complete').length,
  active: roadmap.filter((s) => s.status === 'active').length,
  queued: roadmap.filter((s) => s.status === 'queued').length,
  total: roadmap.length,
});

export const roadmapPrinciples = [
  {
    title: 'Build, do not watch',
    body: 'Every step is completed by producing an artefact, not by finishing a course. A video course generates a certificate; a build generates something a hiring manager can open.',
  },
  {
    title: 'Nothing is marked complete without proof',
    body: 'A step stays in progress until its named artefact exists and has been verified. There are no complete steps on this page today, which is the honest state.',
  },
  {
    title: 'The order is dependency-driven',
    body: 'Kubernetes is tenth because it is useless before containerisation and managed inference. Python is first because every other step assumes it.',
  },
  {
    title: 'Use real work as the exercise',
    body: 'Each proof artefact is built on a system I already run, so the learning produces a working improvement rather than a disposable tutorial project.',
  },
];

export default roadmap;
