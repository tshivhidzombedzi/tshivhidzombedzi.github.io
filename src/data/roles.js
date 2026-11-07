/**
 * Recruiter-facing role mapping.
 *
 * For each target role: the evidence that supports it, and the gap that does not. The gaps are
 * rendered on the page. A role-fit page listing only strengths reads as a sales pitch and gets
 * discounted; one that names its own gaps reads as an assessment and gets trusted.
 *
 * REVISED 8 November 2026: private business work is excluded from this portfolio, so evidence
 * that depended on it has been removed or re-sourced to work that can be shown. Several gaps
 * grew as a result, and they are stated as they now are rather than papered over.
 *
 * ATS keywords are placed in real sentences, not in a hidden block or a comma-separated dump.
 * Keyword stuffing is detectable by both software and people.
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
          'Six recorded cases of discarding my own results on measurement grounds, including a full session of parameter work invalidated by a single simulator setting. Nobody asked me to check.',
        link: '/verification/',
      },
      {
        point: 'Content evaluation judgement, not just fact-checking',
        detail:
          'I caught a chart in my own instructional material that was entirely accurate and taught the opposite of its lesson. Evaluating the inference a reader draws — rather than only the facts on the page — is the core of quality rating work.',
        link: '/verification/#chart',
      },
      {
        point: 'Automated evaluation as a release gate',
        detail:
          'Speech recognition used to verify synthesised narration against its source script, and delivery gates that measure output against a specification and refuse to ship on failure.',
        link: '/projects/hoshi-nova/',
      },
      {
        point: 'Held-out validation as standard practice',
        detail:
          'Split-half in-sample and out-of-sample testing with an adoption rule, and documented rejections of changes that improved the aggregate while failing a half.',
        link: '/verification/#carried',
      },
      {
        point: 'Instrument validation',
        detail:
          'Established that a platform metric I had been relying on was wrong for my system and rebuilt the measurement. Trusting the dashboard would have rejected a genuine improvement.',
        link: '/verification/#metric',
      },
      {
        point: 'Written communication',
        detail:
          'Technical documentation, honest limitation statements and scripted instructional material. Rating work is only useful if the rationale is legible to the next person.',
        link: '/projects/',
      },
    ],
    gaps: [
      'I have never worked to a published rating rubric or had my ratings calibrated against another rater. My judgements are documented and consistent, but inter-rater agreement is a measurement I have not been subject to.',
      'No experience with commercial annotation platforms or their specific guideline formats.',
      'My evaluation experience is on my own systems, where I set the standard. I have never rated another organisation\'s model outputs, to their guidelines, at volume, against a deadline.',
    ],
    ready:
      'I would be productive in the first week. The judgement is there and demonstrable; the rubric and platform specifics are a short onboarding, not a skills gap.',
  },

  {
    id: 'operations',
    name: 'AI Operations and IT Support',
    fit: 'strong',
    fitLabel: 'Strong match',
    roles: ['AI Operations Specialist', 'IT Support Specialist', 'Software Testing Assistant'],
    summary:
      'Formally qualified in IT support services, and running the full operational side of my own technical work: a GPU workstation under sustained load, long unattended jobs, and the diagnosis that follows when something fails at three in the morning.',
    evidence: [
      {
        point: 'Formal IT qualification',
        detail:
          'Higher Certificate in Information Technology Support Services, IIE Rosebank College, completed March 2024. Hardware, operating systems, networking fundamentals, user support and service practice.',
        link: '/education/',
      },
      {
        point: 'Root-cause diagnosis',
        detail:
          'Traced a repeating GPU-level display failure on a render workstation to a verified cause rather than replacing parts; found systemic output defects with an automated geometry scan after they passed human review.',
        link: '/projects/hoshi-nova/',
      },
      {
        point: 'Operating AI systems in practice',
        detail:
          'Local model serving on GPU, long unattended job scheduling, storage lifecycle management under multi-hundred-gigabyte workloads, and recovery when a queue stalls or a disk fills.',
        link: '/projects/hoshi-nova/',
      },
      {
        point: 'Resumable, restartable process design',
        detail:
          'Render queues that survive the session that started them, and publishing automation with tracked state, because a process that cannot be restarted is a process that will eventually lose a night of work.',
        link: '/projects/hoshi-nova/',
      },
      {
        point: 'Security-minded operational practice',
        detail:
          'Audited this repository before publication, found server credentials in a file about to go public, removed them and rewrote them out of git history. Backed by a distinction in Information Security at NQF level 8.',
        link: '/skills/#security',
      },
      {
        point: 'Documentation discipline',
        detail:
          'Runbooks, architecture notes and deployment guides, including this site\'s own. I document for the version of me that has forgotten.',
        link: '/projects/',
      },
    ],
    gaps: [
      'No formal ticketing system experience — Jira, ServiceNow, Zendesk.',
      'No enterprise environment experience: no Active Directory, no managed fleet, no change-control process.',
      'No containerisation or cloud infrastructure. Everything I operate is a single workstation. This is roadmap steps 7 to 11.',
      'My support experience is with my own systems and users rather than in a service desk with queues, priorities and response targets.',
    ],
    ready:
      'The troubleshooting instinct, the ownership and the formal grounding are all there. The gap is enterprise tooling and process, which is learned on the job rather than studied.',
  },

  {
    id: 'engineering',
    name: 'AI and Software Engineering',
    fit: 'developing',
    fitLabel: 'Developing — honest about the gap',
    roles: ['Junior AI Engineer', 'AI Product Developer'],
    summary:
      'I ship working AI products: two released desktop applications built on locally hosted models. I do it with AI assistants as my engineering partner, and I will not claim otherwise in an interview or on a CV.',
    evidence: [
      {
        point: 'Shipped AI products, not demos',
        detail:
          'Two released Windows applications built on local speech and language models, publicly downloadable. Twenty animated episodes produced through one of them.',
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
        point: 'Engineering discipline',
        detail:
          'Dependency-free code where it matters, 38 automated tests on the simulation engine, checksum-stamped builds with retained rollback artefacts, and seeded determinism.',
        link: '/projects/friend-debt-engine/',
      },
      {
        point: 'This site is itself a worked example',
        detail:
          'A zero-dependency static site generator, a verification gate that fails the build on broken links or missing headings, an ATS-safe .docx written directly as WordprocessingML, and a hand-rolled PNG encoder for the share image.',
        link: '/projects/',
      },
    ],
    gaps: [
      'I cannot currently write production code unaided at interview speed, and this portfolio does not claim I can. What I can do is specify, direct, test and verify systems — a genuine and useful engineering contribution, stated accurately.',
      'No team engineering experience: no code review given or received, no shared branch, no CI pipeline beyond my own, no on-call rotation.',
      'No cloud, containers or orchestration. Roadmap steps 7 to 11.',
      'No model training. I integrate and evaluate models; I have never trained one. Roadmap step 9.',
    ],
    ready:
      'A junior AI engineering role where the work is building and evaluating AI product features, in a team that treats AI-assisted development as normal practice. I would be honest about my level on day one.',
  },
];

export const longTerm = {
  title: 'Long-term direction',
  body: `AI/ML Engineer, and eventually AI/ML Lead Engineer. The route runs through the twelve
    steps on this page's companion roadmap, and it is deliberately not a short one. The nearest
    realistic step is work in AI evaluation or AI operations, where what I already have —
    measurement discipline, operational ownership and the willingness to discard my own results —
    is immediately useful, and where the engineering gaps close through the work instead of
    alongside it.`,
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
  'product development', 'JavaScript', 'Node.js', 'Python', 'Electron',
  'HTML', 'CSS', 'Git', 'GPU', 'remote work', 'South Africa',
];

export default roleGroups;
