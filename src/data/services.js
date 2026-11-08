/**
 * "Hire me" — concrete engagements a company can actually buy.
 *
 * WHY THIS PAGE EXISTS
 * The rest of the site explains what he has built. None of it tells a company what they can
 * purchase, or how to start. For someone without formal employment history, that gap is
 * expensive: a hiring manager who is interested has nothing to act on short of a full
 * recruitment process, which is a much higher bar than a small paid piece of work.
 *
 * RULES FOR THIS FILE
 * - No rates. He has not set any, and inventing them would be a fabricated commercial term.
 *   The page says rates are discussed per engagement, which is both true and normal.
 * - No capacity or turnaround promises that have not been agreed.
 * - No client names, no testimonials, no case numbers. He has none, and the absence is
 *   stated rather than papered over.
 * - Every service listed must be backed by evidence already on this site. Nothing is offered
 *   that he cannot show prior work for.
 */

export const engagementTypes = [
  {
    t: 'A paid trial task',
    d: 'The lowest-risk way to find out whether I am any good: a small, scoped, paid piece of real work. Rate a set of outputs, review a document, test a feature, write up a process. You see the actual quality instead of reading about it, and you are out very little if the answer is no.',
    best: 'Best if you are unsure, or if my lack of formal employment history is the hesitation.',
    featured: true,
  },
  {
    t: 'Contract or freelance, by project',
    d: 'A defined piece of work with an agreed scope and deliverable — an evaluation set built and scored, a workflow automated, a body of content reviewed.',
    best: 'Best for a specific problem with a clear finish line.',
  },
  {
    t: 'Ongoing part-time',
    d: 'A fixed number of hours a week on continuing work: rating queues, QA passes, support cover, documentation upkeep.',
    best: 'Best for work that recurs rather than ends.',
  },
  {
    t: 'Full-time, remote',
    d: 'What I am primarily looking for. South Africa, UTC+2, which overlaps the full European working day and the first half of US Eastern.',
    best: 'Best if the work above would be continuous anyway.',
  },
];

export const services = [
  {
    t: 'AI output evaluation and quality rating',
    what:
      'Rating model outputs against your guidelines: accuracy, helpfulness, safety, tone, instruction-following. Written rationales for each judgement, not just scores, so your team can see the reasoning and disagree with it.',
    deliver: [
      'Scored outputs with a written rationale per item',
      'A list of the disagreements and edge cases your guidelines do not yet cover',
      'Notes on where the guideline itself is ambiguous',
    ],
    evidence: 'Six documented cases of catching errors in my own results',
    href: '/verification/',
  },
  {
    t: 'Content review and fact-checking',
    what:
      'Checking written or generated material for accuracy — and for the harder failure, material that is accurate and still leaves the reader with the wrong conclusion. Every figure traced back to its source.',
    deliver: [
      'Line-level corrections with the source for each',
      'Flagged claims that are true but misleading as presented',
      'A note on anything I could not verify, rather than a silent pass',
    ],
    evidence: 'Caught a chart in my own material that was accurate and taught the opposite of its lesson',
    href: '/verification/#chart',
  },
  {
    t: 'Evaluation design and test harnesses',
    what:
      'Building the thing that decides whether your output is good enough to ship: a rubric, a held-out set, an automated gate in your pipeline that fails the build rather than warning about it.',
    deliver: [
      'A written rubric your team can be calibrated against',
      'An automated check that exits non-zero on failure',
      'Documentation of what it does and does not catch',
    ],
    evidence: 'A twenty-three-rule gate, including accessibility, that blocks this site from publishing if anything is broken',
    href: '/projects/portfolio-site/',
  },
  {
    t: 'AI workflow automation',
    what:
      'Taking a repetitive process and making it run unattended, with a check at the end that can refuse to deliver. Generation, verification, assembly and publication.',
    deliver: [
      'A working pipeline you can run yourself',
      'A verification step before anything is released',
      'A runbook for when it fails at three in the morning',
    ],
    evidence: 'Twenty 4K episodes produced unattended, behind an automated delivery gate',
    href: '/projects/hoshi-nova/',
  },
  {
    t: 'Technical documentation and runbooks',
    what:
      'Writing the documentation that gets read: architecture notes, deployment runbooks, honest limitation statements, onboarding material. Written for the person who has forgotten, which is usually the author.',
    deliver: [
      'Documentation that someone unfamiliar can actually follow',
      'An explicit statement of what the system does not do',
      'Diagrams where a diagram is clearer than a paragraph',
    ],
    evidence: 'This entire site, its README and its deployment guide',
    href: '/projects/portfolio-site/',
  },
  {
    t: 'IT support and troubleshooting',
    what:
      'First-line and second-line support, systematic fault diagnosis, and the operational work around running systems that have to keep working. Backed by a formal qualification rather than enthusiasm.',
    deliver: [
      'Faults diagnosed to a root cause, not worked around',
      'Written resolution notes so the same fault is cheaper next time',
      'Honest escalation when something is beyond me',
    ],
    evidence: 'Higher Certificate in IT Support Services, and a GPU workstation kept running under sustained load',
    href: '/education/',
  },
];

export const terms = {
  rates:
    'Rates depend on the work, so I would rather quote against a real scope than publish a number that is wrong for both of us. Tell me what you need and I will give you a figure and an estimate.',
  honest: [
    'I have no commercial client references yet. You would be the first, and the paid trial task above exists precisely because of that.',
    'I build software with AI assistance and say so. If that is a problem for your organisation, better that we both know now.',
    'If something is outside what I can do, I will tell you rather than take the work and find out.',
  ],
};

export default services;
