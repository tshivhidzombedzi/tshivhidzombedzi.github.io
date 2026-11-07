/**
 * Recruiter-facing role mapping.
 *
 * For each target role: the evidence that supports it, and the gap that does not. The gaps are
 * rendered on the page. A role page that only lists strengths is read as a sales pitch and
 * discounted; one that names its own gaps is read as an assessment and trusted.
 *
 * ATS keywords are placed in real sentences in `evidence` and `summary`, not in a hidden block
 * or a comma-separated dump. Keyword stuffing is detectable by both software and people.
 */

export const roleGroups = [
  {
    id: 'evaluation',
    name: 'AI Quality, Evaluation and Training',
    fit: 'strongest',
    fitLabel: 'Strongest match',
    roles: [
      'AI Quality Rater',
      'AI Trainer',
      'AI Evaluator',
      'AI Content Analyst',
      'AI Quality Assurance Analyst',
    ],
    summary:
      'These roles ask one question: can this person tell a correct output from a convincing one, and will they say so when the convincing one is their own? I have six documented cases where I found the fault in my own results and reversed my own conclusion.',
    evidence: [
      {
        point: 'Documented self-correction under no external pressure',
        detail:
          'Six recorded cases of discarding my own results on measurement grounds, including a full session of parameter work invalidated by one simulation setting. Nobody asked me to check.',
        link: '/verification/',
      },
      {
        point: 'Content evaluation judgement, not just fact-checking',
        detail:
          'I caught a chart in my own educational material that was entirely accurate and taught the opposite of its lesson. Evaluating the inference a reader draws — rather than only the facts on the page — is the core of quality rating work.',
        link: '/verification/#chart',
      },
      {
        point: 'Automated evaluation at scale',
        detail:
          'Speech-recognition verification of narration across thirty produced lessons, and delivery gates that measure output against a specification and refuse to ship on failure.',
        link: '/projects/course-pipeline/',
      },
      {
        point: 'Held-out validation as standard practice',
        detail:
          'Split-half in-sample and out-of-sample testing with an adoption rule, and documented rejections of changes that improved the aggregate while failing a half.',
        link: '/verification/#metric',
      },
      {
        point: 'Instrument validation',
        detail:
          'Established that my platform\'s own reported success metric was wrong for my system and rebuilt the measurement. Trusting the dashboard would have rejected a genuine improvement.',
        link: '/verification/#metric',
      },
      {
        point: 'Written communication',
        detail:
          'Technical documentation, honest product limitation statements and thirty fact-checked educational scripts. Rating work is only useful if the rationale is legible to the next person.',
        link: '/projects/',
      },
    ],
    gaps: [
      'I have never worked to a published rating rubric or had my ratings calibrated against another rater. My judgements are documented and consistent, but inter-rater agreement is a measurement I have not been subject to.',
      'No experience with commercial annotation platforms or their specific guideline formats.',
      'My evaluation experience is on my own systems. I have never rated another organisation\'s model outputs to their guidelines, at volume, against a deadline.',
    ],
    ready:
      'I would be productive in the first week. The judgement is there and demonstrable; the rubric and platform specifics are a short onboarding, not a skills gap.',
  },

  {
    id: 'operations',
    name: 'AI Operations and Support',
    fit: 'strong',
    fitLabel: 'Strong match',
    roles: ['AI Operations Specialist', 'IT Support Specialist', 'Software Testing Assistant'],
    summary:
      'Formally qualified in IT support and currently the entire operations function for my own products — eight production domains, a licensing API that software in the field depends on, and every support request that follows a sale.',
    evidence: [
      {
        point: 'Formal IT qualification',
        detail:
          'Higher Certificate in Information Technology Support Services, IIE Rosebank College, completed March 2024.',
        link: '/education/',
      },
      {
        point: 'Real production operations',
        detail:
          'Eight live domains on Linux shared hosting: deployment over SSH with retries, idempotent migration scripts, timestamped backups before every change, and a lint gate before anything goes live.',
        link: '/projects/mcp-labs/',
      },
      {
        point: 'Customer support for paying customers',
        detail:
          'First-line and only-line support: installation, licence rebinding, configuration and fault resolution, for customers who have paid for software that has to work.',
        link: '/projects/mcp-labs/',
      },
      {
        point: 'Root-cause diagnosis',
        detail:
          'Traced a repeating GPU-level display failure to a verified cause; diagnosed production faults through CDN caching behaviour, stylesheet precedence and server-side title truncation.',
        link: '/projects/mcp-labs/',
      },
      {
        point: 'Operating AI systems in practice',
        detail:
          'Local model serving on GPU, long unattended job scheduling, storage lifecycle management under multi-hundred-gigabyte workloads, and recovery when a render queue or a disk fills.',
        link: '/projects/hoshi-nova/',
      },
      {
        point: 'Documentation discipline',
        detail:
          'Runbooks, architecture notes and deployment guides, including this site\'s own. I document for the version of me that has forgotten.',
        link: '/projects/',
      },
    ],
    gaps: [
      'No formal ticketing system experience — Jira, ServiceNow, Zendesk. My support volume has never needed one.',
      'No enterprise environment experience: no Active Directory, no managed fleet, no change-control board.',
      'No containerisation or cloud infrastructure. Everything I operate is a single workstation or shared hosting. This is roadmap steps 7 through 11.',
    ],
    ready:
      'The troubleshooting instinct and the ownership are proven. The gap is enterprise tooling, which is learned on the job rather than studied.',
  },

  {
    id: 'engineering',
    name: 'AI and Software Engineering',
    fit: 'developing',
    fitLabel: 'Developing — honest about the gap',
    roles: ['Junior AI Engineer', 'AI Product Developer'],
    summary:
      'I ship working AI products: two released desktop applications and a live commercial platform. I do it with AI assistants as my engineering partner, and I will not claim otherwise in an interview or on a CV.',
    evidence: [
      {
        point: 'Shipped AI products, not demos',
        detail:
          'Two released Windows applications built on local speech and language models, with published pricing, a download and support. Twenty animated episodes produced through one of them.',
        link: '/projects/hoshidub/',
      },
      {
        point: 'Non-obvious AI architecture decisions',
        detail:
          'Spoiler safety enforced by context windowing rather than prompt instruction; zero latency achieved by read-ahead scheduling rather than faster inference; an information boundary enforced by an automated test.',
        link: '/lab/',
      },
      {
        point: 'Systems that run unattended',
        detail:
          'A resumable render queue that outlives its controlling session, an autonomy loop with no operator input, and automated delivery gates with rollback.',
        link: '/projects/hoshi-nova/',
      },
      {
        point: 'Backend and API work in production',
        detail:
          'A licensing API in production handling issuing, validation, account binding, expiry, revocation and abuse detection, with commercial software in the field depending on it.',
        link: '/projects/mcp-labs/',
      },
      {
        point: 'Engineering discipline',
        detail:
          'Dependency-free code where it matters, 38 automated tests on the simulation engine, checksum-stamped builds with retained rollback artefacts, and seeded determinism.',
        link: '/projects/friend-debt-engine/',
      },
    ],
    gaps: [
      'I cannot currently write production code unaided at interview speed, and this portfolio does not claim I can. What I can do is specify, direct, test and verify systems — and that is a genuine and useful engineering contribution, stated accurately.',
      'No team engineering experience: no code review given or received, no shared branch, no CI pipeline, no on-call rotation.',
      'No cloud, containers or orchestration. Roadmap steps 7 through 11.',
      'No model training. I integrate and evaluate models; I have never trained one. Roadmap step 9.',
    ],
    ready:
      'A junior AI engineering role where the work is building and evaluating AI product features, in a team that uses AI-assisted development as normal practice. I would be honest about my level on day one.',
  },
];

export const longTerm = {
  title: 'Long-term direction',
  body: `AI/ML Engineer, and eventually AI/ML Lead Engineer. The route runs through the twelve
    steps on this page's companion roadmap, and it is deliberately not a short one. The nearest
    realistic step is work in AI evaluation or AI operations, where what I already have —
    measurement discipline, product ownership and the willingness to discard my own results — is
    immediately useful, and where the engineering gaps close through the work instead of alongside
    it.`,
};

/** Keywords for ATS parsing. Placed in real prose above; collected here only for the CV generator. */
export const atsKeywords = [
  'AI quality evaluation', 'AI training', 'model evaluation', 'content evaluation',
  'quality assurance', 'software testing', 'test methodology', 'held-out validation',
  'generative AI', 'large language models', 'LLM applications', 'AI agents',
  'prompt engineering', 'speech recognition', 'speech synthesis', 'ASR', 'TTS',
  'AI workflow automation', 'pipeline automation', 'process automation',
  'IT support', 'technical support', 'troubleshooting', 'root cause analysis',
  'technical documentation', 'information security', 'privacy by design',
  'product development', 'product management', 'customer support', 'version management',
  'JavaScript', 'Node.js', 'Python', 'PHP', 'SQLite', 'Electron', 'MQL5',
  'Linux', 'SSH', 'Git', 'HTML', 'CSS', 'REST API', 'JSON-LD', 'technical SEO',
  'remote work', 'South Africa',
];

export default roleGroups;
