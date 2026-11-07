/**
 * Skills profile.
 *
 * THE RULE THAT GOVERNS THIS FILE
 * Three tiers, defined strictly:
 *
 *   demonstrated  - There is a shipped, inspectable artefact or a verifiable qualification
 *                   behind it. If a recruiter asks "show me", there is something to show.
 *   working       - Used successfully in real work, with AI assistance, and I can explain
 *                   what I did and why. I could not pass a closed-book exam in it.
 *   learning      - Currently studying. No claim of capability.
 *
 * REVISED 8 November 2026. Private business work is excluded from this portfolio, so eight
 * skills that were evidenced only by it have been REMOVED rather than re-tiered or softened:
 * Linux server operation, software licensing and anti-abuse, customer support, product version
 * management, pricing and commercial mechanics, and three languages. A skill with no evidence
 * that can be shown is not a skill this portfolio claims.
 *
 * Where a skill survives, its evidence has been re-sourced to work that can be shown, or
 * described without identifying the private system it came from. No tier was raised to
 * compensate for a lost source.
 *
 * Deliberately absent from every tier: AWS, Kubernetes, Docker, TypeScript, React and model
 * training. Those live on the Career Development roadmap as targets, which is a different
 * claim entirely.
 */

export const TIERS = {
  demonstrated: {
    key: 'demonstrated',
    label: 'Demonstrated',
    short: 'Can show you',
    blurb:
      'There is a working artefact or a verifiable qualification behind this. Ask me to show it and I will open it, not describe it.',
  },
  working: {
    key: 'working',
    label: 'Working knowledge',
    short: 'Used in real work',
    blurb:
      'Used successfully in shipped work, with AI assistance. I can explain my decisions and defend them. I am not claiming unaided fluency.',
  },
  learning: {
    key: 'learning',
    label: 'Currently learning',
    short: 'In progress',
    blurb:
      'Under active study. Listed for direction, not as a capability claim. Nothing moves out of this tier until there is something built with it.',
  },
};

export const skillCategories = [
  {
    id: 'ai',
    name: 'AI and Generative AI',
    summary:
      'Where most of my practical work sits. Every item here is backed by a system described on the Projects pages.',
    skills: [
      {
        name: 'Applied generative AI',
        tier: 'demonstrated',
        evidence:
          'Two shipped desktop applications built on generative speech and language models, running locally on the user device.',
        projects: ['hoshidub', 'hoshi-nova'],
      },
      {
        name: 'LLM application design',
        tier: 'demonstrated',
        evidence:
          'A spoiler-safe companion enforced by context windowing rather than prompt instruction, and an autonomous presenter whose director loop treats the model as one input among several.',
        projects: ['hoshidub', 'hoshi-live'],
      },
      {
        name: 'AI agents and autonomous loops',
        tier: 'demonstrated',
        evidence:
          'An unattended presenter that decides what to respond to, when to speak and when to change topic, with no operator input during a run.',
        projects: ['hoshi-live'],
      },
      {
        name: 'AI content evaluation',
        tier: 'demonstrated',
        evidence:
          'Automated narration verification by speech recognition as a release gate, plus the review practice that caught a factually correct chart teaching the opposite of its lesson.',
        projects: ['hoshi-nova'],
      },
      {
        name: 'AI workflow design and automation',
        tier: 'demonstrated',
        evidence:
          'Multi-stage production pipelines with gates: twenty animated episodes produced from structured data, unattended, with an automated check that can refuse to deliver.',
        projects: ['hoshi-nova'],
      },
      {
        name: 'AI-assisted software development',
        tier: 'demonstrated',
        evidence:
          'The working method behind everything on this site: specify, direct, test, verify, reject. Described without euphemism on the About page.',
        projects: [],
      },
      {
        name: 'Speech synthesis and recognition (applied)',
        tier: 'demonstrated',
        evidence:
          'Per-character voice assignment with episode-long consistency, read-ahead synthesis scheduling for zero-latency output, and speech recognition used as a verification instrument.',
        projects: ['hoshidub', 'hoshi-nova'],
      },
      {
        name: 'Prompt design and output constraint',
        tier: 'working',
        evidence:
          'Register filtering to stop a model sounding like an assistant; personality expressed as a constraint on style rather than as an instruction.',
        projects: ['hoshi-live'],
      },
      {
        name: 'Model evaluation methodology',
        tier: 'working',
        evidence:
          'Split-half validation, plateau-over-peak parameter selection and reproducibility control, applied rigorously to a simulation-driven system. The transfer to ML evaluation is real, but I have not yet applied it to a model.',
        projects: [],
      },
      {
        name: 'Retrieval-augmented generation',
        tier: 'learning',
        evidence:
          'Not built. Listed honestly as a gap: I have built context-constrained LLM features but never a retrieval pipeline over a vector store.',
        projects: [],
      },
      {
        name: 'Fine-tuning and model training',
        tier: 'learning',
        evidence: 'Not built. I have run and integrated models, never trained one.',
        projects: [],
      },
    ],
  },

  {
    id: 'qa',
    name: 'Testing, Evaluation and Quality',
    summary:
      'The strongest part of my profile, and the part most relevant to AI quality and evaluation work. Each item is a practice I can show the evidence for, including the times it caught me out.',
    skills: [
      {
        name: 'Experimental design and validation',
        tier: 'demonstrated',
        evidence:
          'Split-half in-sample and out-of-sample adoption testing, with changes rejected for failing one half despite improving the total.',
        projects: [],
      },
      {
        name: 'Measurement integrity',
        tier: 'demonstrated',
        evidence:
          'Discarded a full session of my own results after finding the simulator setting invalidated them; established that a platform\'s own success metric was wrong for my system and rebuilt the measurement.',
        projects: [],
      },
      {
        name: 'Automated verification gates',
        tier: 'demonstrated',
        evidence:
          'Delivery gates that measure resolution, frame rate and audio level and roll back on failure; speech-recognition verification of narration; an automated information-boundary test; and the build gate on this site.',
        projects: ['hoshi-nova', 'friend-debt-engine'],
      },
      {
        name: 'Content and factual review',
        tier: 'demonstrated',
        evidence:
          'Instructional material fact-checked under a compute-before-you-write rule, which caught both a materially wrong figure and a chart that was accurate and misleading by construction.',
        projects: [],
      },
      {
        name: 'Testing against reality, not fixtures',
        tier: 'demonstrated',
        evidence:
          'A rule affecting real people passed its fixture and produced false positives against the most legitimate users when run on real data. Fixtures are now treated as necessary and insufficient.',
        projects: [],
      },
      {
        name: 'Reproducibility discipline',
        tier: 'demonstrated',
        evidence:
          'Seeded determinism through a single generator after finding correlated seeds; fixed execution settings so simulation runs are comparable at all.',
        projects: ['friend-debt-engine'],
      },
      {
        name: 'Regression and rollback practice',
        tier: 'demonstrated',
        evidence:
          'Checksum-stamped builds with retained rollback artefacts, and a delivery gate that restores the previous output rather than shipping a failed one.',
        projects: ['hoshi-nova'],
      },
      {
        name: 'Adversarial testing',
        tier: 'working',
        evidence:
          'Adversarial questioning of a spoiler-constrained companion to verify the context boundary holds under pressure.',
        projects: ['hoshidub'],
      },
      {
        name: 'Structured annotation and rubric design',
        tier: 'learning',
        evidence:
          'Not yet done formally. My quality judgements are documented and consistent but have not been expressed as a scored rubric another person could be calibrated against.',
        projects: [],
      },
    ],
  },

  {
    id: 'it',
    name: 'Information Technology',
    summary:
      'Formally qualified here, and it is the layer everything else runs on.',
    skills: [
      {
        name: 'IT support fundamentals',
        tier: 'demonstrated',
        evidence:
          'Higher Certificate in Information Technology Support Services, IIE Rosebank College, completed March 2024. Hardware, operating systems, networking fundamentals and user support.',
        projects: [],
      },
      {
        name: 'Systematic troubleshooting',
        tier: 'demonstrated',
        evidence:
          'Diagnosed a repeating GPU-level display failure on a render workstation to a verified root cause; traced delivered-output defects back through an automated geometry scan rather than by guesswork.',
        projects: ['hoshi-nova'],
      },
      {
        name: 'Technical documentation',
        tier: 'demonstrated',
        evidence:
          'Architecture notes, deployment runbooks and handover documentation — including this site\'s own README, deployment guide and the commented rationale in its source.',
        projects: [],
      },
      {
        name: 'Software testing',
        tier: 'demonstrated',
        evidence: 'See the Testing, Evaluation and Quality category above.',
        projects: ['friend-debt-engine'],
      },
      {
        name: 'Windows workstation and GPU operations',
        tier: 'working',
        evidence:
          'Running a GPU render workstation: driver-level fault diagnosis, storage lifecycle under multi-hundred-gigabyte workloads, and long unattended job scheduling.',
        projects: ['hoshi-nova'],
      },
      {
        name: 'Systems thinking',
        tier: 'working',
        evidence:
          'Pipeline architectures with explicit stage boundaries, and an engine separated from its presentation layer so the simulation can be tested without a renderer.',
        projects: ['hoshi-nova', 'friend-debt-engine'],
      },
    ],
  },

  {
    id: 'security',
    name: 'Information Security',
    summary:
      'Academically my strongest subject (distinction at NQF level 8), and applied in product decisions rather than in a security role.',
    skills: [
      {
        name: 'Information security fundamentals',
        tier: 'demonstrated',
        evidence:
          'INF4831 Information Security, University of South Africa, NQF level 8, passed with distinction (2021).',
        projects: [],
      },
      {
        name: 'Privacy-by-design decisions',
        tier: 'demonstrated',
        evidence:
          'A shipped application that processes entirely on-device, requires no account, stores no video and transmits nothing — an architecture decision, not a policy page.',
        projects: ['hoshidub'],
      },
      {
        name: 'Credential and secret handling',
        tier: 'working',
        evidence:
          'OS-level encrypted storage for user-supplied keys; and a pre-publication audit of this repository that found and removed server credentials before anything was made public, including rewriting them out of git history.',
        projects: ['hoshi-live'],
      },
      {
        name: 'Risk assessment concepts',
        tier: 'working',
        evidence:
          'Applied to a copyleft dependency recorded as a condition on commercial use, and to deciding what may and may not be disclosed about a system that is still running.',
        projects: ['hoshi-live'],
      },
      {
        name: 'Security operations and incident response',
        tier: 'learning',
        evidence: 'Not done. No SOC, SIEM or incident-response experience of any kind.',
        projects: [],
      },
    ],
  },

  {
    id: 'product',
    name: 'Product and Delivery',
    summary:
      'Taking something from an idea to a released, documented artefact that other people can actually use.',
    skills: [
      {
        name: 'Digital product development',
        tier: 'demonstrated',
        evidence:
          'Two released Windows applications taken from concept to a public download, and a production pipeline that delivered twenty finished episodes.',
        projects: ['hoshidub', 'hoshi-nova'],
      },
      {
        name: 'Honest product communication',
        tier: 'demonstrated',
        evidence:
          'Stating the hardware requirement up front rather than after installation, and publishing a "not built, or not proven" list for every project on this site.',
        projects: ['hoshidub'],
      },
      {
        name: 'Technical SEO and structured data',
        tier: 'demonstrated',
        evidence:
          'This site: JSON-LD for Person, CreativeWork and BreadcrumbList, canonical URLs, Open Graph, a generated sitemap and robots.txt, with title and description lengths verified by an automated check.',
        projects: [],
      },
      {
        name: 'Product research and requirements',
        tier: 'working',
        evidence:
          'Defining a product by its constraints first — the four things one application must never do eliminated most architectures before any code existed.',
        projects: ['hoshidub'],
      },
    ],
  },

  {
    id: 'eng',
    name: 'Engineering and Tooling',
    summary:
      'Stated carefully. These are languages and tools I have shipped real work in, with AI assistance, and that is the claim — nothing more.',
    skills: [
      {
        name: 'JavaScript / Node.js',
        tier: 'working',
        evidence:
          'A dependency-free simulation engine with 38 tests, three Electron applications, render orchestration, and the zero-dependency generator that builds this website.',
        projects: ['friend-debt-engine', 'hoshi-nova', 'hoshi-live'],
      },
      {
        name: 'HTML, CSS and accessible markup',
        tier: 'working',
        evidence:
          'This site, built from scratch with no framework: semantic structure, keyboard navigation, visible focus, reduced-motion support and a print stylesheet.',
        projects: [],
      },
      {
        name: 'Python',
        tier: 'working',
        evidence:
          'Production pipelines: episode builders, render queues, 3D engine automation and analysis scripts. Written with AI assistance; formal fundamentals are on the roadmap and not yet complete, which is why this is not listed as a professional competency.',
        projects: ['hoshi-nova'],
      },
      {
        name: 'Electron desktop applications',
        tier: 'working',
        evidence: 'Three applications, two of them released to the public.',
        projects: ['hoshidub', 'hoshi-nova', 'hoshi-live'],
      },
      {
        name: 'ffmpeg and media processing',
        tier: 'working',
        evidence:
          'Assembly, mixing, loudness handling and container verification across twenty delivered 4K episodes.',
        projects: ['hoshi-nova'],
      },
      {
        name: '3D production tooling',
        tier: 'working',
        evidence:
          'Scripted set construction, character import, rigging and retargeting, and cinematic camera work in Unreal Engine and Blender via their Python APIs.',
        projects: ['hoshi-nova'],
      },
      {
        name: 'Git version control',
        tier: 'learning',
        evidence:
          'I commit locally and use history, but I have not worked in a branching team workflow, reviewed a pull request or resolved a shared-branch conflict. Stated as learning for that reason.',
        projects: [],
      },
    ],
  },
];

export const tierCounts = () => {
  const counts = { demonstrated: 0, working: 0, learning: 0 };
  for (const cat of skillCategories) {
    for (const s of cat.skills) counts[s.tier] += 1;
  }
  return counts;
};

export default skillCategories;
