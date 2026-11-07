/**
 * Skills profile.
 *
 * THE RULE THAT GOVERNS THIS FILE
 * Three tiers, defined strictly:
 *
 *   demonstrated  - There is a shipped, inspectable artefact on this site that required it.
 *                   If a recruiter asks "show me", there is something to show.
 *   working       - Used successfully in real work, with AI assistance, and I can explain
 *                   what I did and why. I could not pass a closed-book exam in it.
 *   learning      - Currently studying. No claim of capability. Listed because the
 *                   direction is part of the professional story, not to pad the list.
 *
 * Deliberately absent from every tier: AWS, Kubernetes, Docker, TypeScript, React,
 * SQL-at-scale, and anything else he cannot presently demonstrate. Those live on the
 * Career Development roadmap as targets, which is a different claim entirely.
 *
 * Python appears ONLY under `working`, with an explicit note, because he has shipped real
 * Python pipelines with AI assistance but has not completed formal fundamentals. Listing it
 * as a professional competency would be the exact misrepresentation he asked me to avoid.
 */

export const TIERS = {
  demonstrated: {
    key: 'demonstrated',
    label: 'Demonstrated',
    short: 'Can show you',
    blurb:
      'There is a working artefact behind this. Ask me to show it and I will open it, not describe it.',
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
      'Where most of my practical work sits. Every item here is backed by a system on the Projects pages.',
    skills: [
      {
        name: 'Applied generative AI',
        tier: 'demonstrated',
        evidence:
          'Two shipped desktop products built on generative speech and language models (Hoshidub, Hoshi Nova).',
        projects: ['hoshidub', 'hoshi-nova'],
      },
      {
        name: 'LLM application design',
        tier: 'demonstrated',
        evidence:
          'A spoiler-safe companion enforced by context windowing rather than prompt instruction, and an autonomous presenter whose director loop treats the model as one input.',
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
          'Automated narration verification by speech recognition across 30 produced lessons, plus the pedagogical review that caught a factually correct chart teaching the opposite of its lesson.',
        projects: ['course-pipeline'],
      },
      {
        name: 'AI workflow design and automation',
        tier: 'demonstrated',
        evidence:
          'Multi-stage production pipelines with gates: 20 animated episodes and 30 course videos produced from structured data, unattended.',
        projects: ['hoshi-nova', 'course-pipeline'],
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
          'Per-character voice assignment with episode-long consistency, read-ahead synthesis scheduling, and ASR used as a verification instrument.',
        projects: ['hoshidub', 'hoshi-nova', 'course-pipeline'],
      },
      {
        name: 'Prompt design and output constraint',
        tier: 'working',
        evidence:
          'Register filtering to keep a model from sounding like an assistant; constraint-based personality rather than instruction-based.',
        projects: ['hoshi-live'],
      },
      {
        name: 'Model evaluation methodology',
        tier: 'working',
        evidence:
          'Split-half validation, plateau-over-peak parameter selection and reproducibility control, applied rigorously to strategy testing. The transfer to ML evaluation is real but I have not yet applied it to a model.',
        projects: ['apex-drawdown-zero'],
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
      'The strongest part of my profile, and the part most relevant to AI quality and evaluation work. Each item below is a practice I can show the evidence for, including the times it caught me out.',
    skills: [
      {
        name: 'Experimental design and validation',
        tier: 'demonstrated',
        evidence:
          'Split-half in-sample/out-of-sample adoption testing, with changes rejected for failing one half despite improving the total.',
        projects: ['apex-drawdown-zero'],
      },
      {
        name: 'Measurement integrity',
        tier: 'demonstrated',
        evidence:
          'Discarded a full session of my own results after finding the simulation setting invalidated them; identified that the platform\'s own win-rate metric is wrong for my product and rebuilt the measurement.',
        projects: ['apex-drawdown-zero'],
      },
      {
        name: 'Automated verification gates',
        tier: 'demonstrated',
        evidence:
          'Delivery gates that measure resolution, frame rate and audio level and roll back on failure; speech-recognition verification of narration; an automated information-boundary test.',
        projects: ['hoshi-nova', 'course-pipeline', 'friend-debt-engine'],
      },
      {
        name: 'Content and factual review',
        tier: 'demonstrated',
        evidence:
          'Thirty educational scripts fact-checked with a compute-before-you-write rule, which caught both a materially wrong figure and a misleading-by-construction chart.',
        projects: ['course-pipeline'],
      },
      {
        name: 'Testing against production reality',
        tier: 'demonstrated',
        evidence:
          'A customer-facing rule that passed its fixture and falsely accused the two best customers when run against live data. Fixtures are now treated as necessary and insufficient.',
        projects: ['mcp-labs'],
      },
      {
        name: 'Reproducibility discipline',
        tier: 'demonstrated',
        evidence:
          'Seeded determinism with a single generator after finding correlated seeds; fixed execution-delay settings so simulation runs are comparable at all.',
        projects: ['friend-debt-engine', 'apex-drawdown-zero'],
      },
      {
        name: 'Regression and rollback practice',
        tier: 'demonstrated',
        evidence:
          'Checksum-stamped builds with kept rollback artefacts; a delivery gate that restores the previous master rather than shipping a failed one.',
        projects: ['apex-drawdown-zero', 'hoshi-nova'],
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
          'Not yet done formally. My quality judgements are documented and consistent but have not been expressed as a scored rubric against which another person could be calibrated.',
        projects: [],
      },
    ],
  },

  {
    id: 'it',
    name: 'Information Technology',
    summary:
      'Formally qualified here, and it is the layer everything else runs on. Operating my own production infrastructure is where most of this got real.',
    skills: [
      {
        name: 'IT support fundamentals',
        tier: 'demonstrated',
        evidence:
          'Higher Certificate in IT Support Services (IIE Rosebank College, 2024), plus first-line support for every customer of my own products.',
        projects: ['mcp-labs'],
      },
      {
        name: 'Systematic troubleshooting',
        tier: 'demonstrated',
        evidence:
          'Diagnosed a repeating GPU-level display failure to a verified root cause; traced production faults through CDN caching, stylesheet precedence and server-side title truncation.',
        projects: ['mcp-labs'],
      },
      {
        name: 'Technical documentation',
        tier: 'demonstrated',
        evidence:
          'Product documentation, customer-facing limitation statements, deployment runbooks and architecture notes — including this site\'s own README and deployment guide.',
        projects: ['apex-drawdown-zero', 'mcp-labs'],
      },
      {
        name: 'Software testing',
        tier: 'demonstrated',
        evidence: 'See the Testing, Evaluation and Quality category above.',
        projects: ['apex-drawdown-zero', 'friend-debt-engine'],
      },
      {
        name: 'Linux server operation',
        tier: 'working',
        evidence:
          'Operating eight production domains on shared hosting over SSH: deployment, backups, idempotent migration scripts and recovery on an unreliable link.',
        projects: ['mcp-labs'],
      },
      {
        name: 'Windows workstation and GPU operations',
        tier: 'working',
        evidence:
          'Managing a GPU render workstation: driver-level fault diagnosis, storage lifecycle under multi-hundred-gigabyte workloads, long unattended job scheduling.',
        projects: ['hoshi-nova'],
      },
      {
        name: 'Systems thinking',
        tier: 'working',
        evidence:
          'Pipeline architectures with explicit stage boundaries, and a licensing design that reused an existing primitive instead of adding a second protocol.',
        projects: ['hoshi-nova', 'mcp-labs'],
      },
    ],
  },

  {
    id: 'security',
    name: 'Information Security',
    summary:
      'Academically strongest subject (distinction at NQF level 8) and applied in product decisions rather than in a security role.',
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
          'A shipped product that processes entirely on-device, requires no account, stores no video and transmits nothing — a product-level architecture decision, not a policy page.',
        projects: ['hoshidub'],
      },
      {
        name: 'Software licensing and anti-abuse',
        tier: 'demonstrated',
        evidence:
          'Licence issuing, account binding, revocation and sharing detection in production, including correcting a false-positive rule that accused legitimate customers.',
        projects: ['mcp-labs'],
      },
      {
        name: 'Credential and secret handling',
        tier: 'working',
        evidence:
          'OS-level encrypted credential storage for user-supplied keys; secrets kept out of the web root and out of version control.',
        projects: ['hoshi-live', 'mcp-labs'],
      },
      {
        name: 'Risk assessment concepts',
        tier: 'working',
        evidence:
          'Applied to licensing design, to a copyleft dependency recorded as a commercial condition, and to consumer-protection exposure in promotional mechanics.',
        projects: ['mcp-labs', 'hoshi-live'],
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
    name: 'Product Development and Operations',
    summary:
      'I run the commercial side of my own products, which means the unglamorous parts are experience rather than theory.',
    skills: [
      {
        name: 'Digital product development',
        tier: 'demonstrated',
        evidence:
          'Two released desktop products and one commercial trading product, taken from concept to a public page with pricing and support.',
        projects: ['hoshidub', 'apex-drawdown-zero', 'hoshi-nova'],
      },
      {
        name: 'Customer support',
        tier: 'demonstrated',
        evidence:
          'All support for paying customers: installation, licence rebinding, configuration and fault resolution.',
        projects: ['mcp-labs', 'apex-drawdown-zero'],
      },
      {
        name: 'Product version management',
        tier: 'demonstrated',
        evidence:
          'Versioned releases with checksum-stamped builds, retained rollback artefacts and versioned configuration presets.',
        projects: ['apex-drawdown-zero'],
      },
      {
        name: 'Honest product communication',
        tier: 'demonstrated',
        evidence:
          'A sales page that states what the product does not do; a promotion restructured as a genuine bonus to avoid a misleading prior-price claim.',
        projects: ['apex-drawdown-zero', 'mcp-labs'],
      },
      {
        name: 'Technical SEO and structured data',
        tier: 'demonstrated',
        evidence:
          'JSON-LD across eight domains, indexing submission, and consolidation of four competing pages into a single evergreen URL.',
        projects: ['mcp-labs'],
      },
      {
        name: 'Product research and requirements',
        tier: 'working',
        evidence:
          'Defining a product by its constraints first — the four things Hoshidub must never do eliminated most architectures before any code existed.',
        projects: ['hoshidub'],
      },
      {
        name: 'Pricing and commercial mechanics',
        tier: 'working',
        evidence:
          'Published tiered pricing, licence seat models, catalogue focus decisions and promotion design.',
        projects: ['hoshidub', 'mcp-labs'],
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
          'A dependency-free simulation engine with 38 tests, two Electron applications, render orchestration, and the generator that builds this website.',
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
          'Production pipelines: course video generation, episode builders, render queues, analysis scripts and engine automation. Written with AI assistance; formal fundamentals are on the roadmap and not yet complete, which is why this is not listed as a professional competency.',
        projects: ['course-pipeline', 'hoshi-nova'],
      },
      {
        name: 'PHP',
        tier: 'working',
        evidence:
          'A live commercial storefront, customer portal, admin tooling and licensing API in PHP 8.3 with no framework.',
        projects: ['mcp-labs'],
      },
      {
        name: 'MQL5',
        tier: 'working',
        evidence:
          'A commercially sold Expert Advisor with preset configuration, licence integration and marketplace-compliant implementation.',
        projects: ['apex-drawdown-zero'],
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
          'Assembly, mixing, loudness handling and container verification across 50 delivered videos.',
        projects: ['hoshi-nova', 'course-pipeline'],
      },
      {
        name: '3D production tooling',
        tier: 'working',
        evidence:
          'Scripted set construction, character import, rigging and retargeting, and cinematic camera work in Unreal Engine and Blender via their Python APIs.',
        projects: ['hoshi-nova', 'friend-debt-engine'],
      },
      {
        name: 'Git version control',
        tier: 'learning',
        evidence:
          'I commit locally and use history, but I have not worked in a branching team workflow, reviewed a pull request or resolved a shared-branch conflict. Stated as learning for that reason.',
        projects: [],
      },
      {
        name: 'SQL and relational data',
        tier: 'learning',
        evidence:
          'SQLite in production for a real storefront, but simple queries only. No schema design at scale, no query optimisation.',
        projects: ['mcp-labs'],
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
