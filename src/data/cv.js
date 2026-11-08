/**
 * CV content — single source of truth.
 *
 * Used by BOTH the /cv/ page and tools/make-cv.js (which writes the .docx and .md). One source
 * means the downloadable CV can never drift from the published one, which is a real failure
 * mode when a recruiter has the file and the hiring manager is reading the site.
 *
 * ATS RULES OBSERVED
 * - Standard section headings ("Professional Experience", "Education", "Skills"). Parsers look
 *   for these exact kinds of words; creative headings get dropped.
 * - No tables, no text boxes, no columns, no headers/footers, no graphics in the .docx. All
 *   four are routinely mangled or skipped by applicant tracking systems.
 * - Reverse-chronological order. Keywords in real sentences, not a hidden block.
 *
 * HONESTY RULES OBSERVED
 * - Every role is independent and self-employed, and labelled as such. No invented employer.
 * - CS50 AI is excluded from Education entirely (completion not verified) and appears only
 *   under Continuing Professional Development, marked in progress.
 *
 * PRIVACY, 8 November 2026
 * - Private business activity is out of scope for this document: no business name, product
 *   name, customer, revenue or sector detail. Work history is presented as independent
 *   technical projects, which is what it is.
 */

import profile from './profile.js';

export const cv = {
  name: profile.name,
  headline: 'AI & Technology Specialist — AI Evaluation, Generative AI, IT Support',
  location: `${profile.location.city}, ${profile.location.country}`,
  availability: 'Available immediately · Open to fully remote roles worldwide',
  // Header line. GitHub is included now that there is a public repository to point at.
  contactLine: [
    profile.contact.email,
    profile.contact.linkedinLabel,
    profile.contact.githubLabel,
    `${profile.location.city}, South Africa`,
  ],

  summary: `Independent technology builder with a verifiable record of shipping AI software: two
released Windows desktop applications built on locally hosted speech and language models, and
twenty 4K animated episodes produced end to end by a production pipeline I designed and operate.
Formally qualified in IT support services, with a distinction at NQF level 8 in Information
Security.

My core strength is evaluation discipline. I use held-out validation, I verify the measuring
instrument before trusting a result, and I have repeatedly discarded my own conclusions when the
measurement turned out to be invalid — including a full session of parameter work invalidated by
a single simulator setting, and a platform-reported success metric that was wrong for the system
it was measuring. I build software with AI assistants and state that plainly rather than implying
unaided authorship.

Seeking AI quality evaluation, AI training, AI operations or IT support work where measurement
rigour and operational ownership are the job.`,

  experience: [
    {
      title: 'AI Product Developer (Independent)',
      org: 'Independent AI & Technology Projects',
      location: 'Pretoria, South Africa (remote)',
      from: '2026',
      to: 'Present',
      context:
        'Two desktop AI applications taken from concept to public release, built on locally hosted speech and language models. Sole responsibility for architecture, implementation, testing and documentation.',
      bullets: [
        'Released a Windows application (version 0.1.0) performing real-time AI dubbing of video, assigning a distinct synthetic voice to each speaker, with all speech recognition, speech synthesis and language-model inference running on the user device.',
        'Solved the real-time latency requirement as a scheduling problem rather than an inference-speed problem, pre-synthesising each line against known subtitle cue times so output lands on cue by construction rather than by optimisation.',
        'Implemented dialogue-selective audio ducking to measurable targets — original dialogue attenuated by approximately 15 dB while music and effects remain within approximately 2 dB — instead of reducing the whole mix.',
        'Designed spoiler containment for a language-model companion feature as an architectural guarantee: the model context contains only content already played, so it cannot reveal what is coming. A prompt instruction would have been circumvented on the first day.',
        'Established the privacy posture as an architecture decision rather than a policy statement: on-device processing, no account, no recording, nothing transmitted.',
        'Built an animation production platform that produced 20 episodes across two seasons at verified 3840x2160 resolution, running unattended from structured episode data.',
        'Implemented an automated delivery gate measuring resolution, frame rate and audio level, with speech-recognition verification of narration against script, which restores the previous output on failure rather than shipping.',
        'Diagnosed systemic animation defects using automated geometry scanning after they had passed human review: 61 of 70 clips contained limb-through-body intersection invisible at playback speed.',
      ],
      keywords:
        'Electron, Node.js, Python, generative AI, LLM applications, ASR, TTS, speech recognition, speech synthesis, ffmpeg, Unreal Engine, Blender, GPU',
    },
    {
      title: 'AI Systems & Simulation Projects (Independent)',
      org: 'Independent AI & Technology Projects',
      location: 'Pretoria, South Africa (remote)',
      from: '2026',
      to: '2026',
      context:
        'Two self-directed engineering projects built to work out specific techniques: an autonomous agent loop, and a deterministic multi-agent simulation with an enforced information boundary.',
      bullets: [
        'Built an autonomous presenter application in which an animated character hosts a live session unattended — reading chat, deciding when to respond and when to stay silent, opening new topics, and reacting to on-screen video — with language, speech-synthesis and speech-recognition models all running locally.',
        'Designed the director loop so the language model is one input to a decision rather than the decision-maker, and added a register filter that rejects assistant phrasing before it reaches speech synthesis.',
        'Built operator safety controls before any audience existed: emergency stop, moderation with a blocked-term list, and per-viewer data removal.',
        'Set a simulated-audience feature to be off by default and reachable only through an explicit environment flag, after it displayed fabricated activity during a real session. A development convenience that fabricates data must be structurally impossible to leave enabled.',
        'Built a dependency-free simulation engine for eight agents holding private knowledge with full provenance, covered by 38 automated tests runnable with a single command.',
        'Enforced the simulation\'s integrity with an automated test that fails the build if agent-reasoning code accesses the hidden ground truth it is meant to deduce — the same class of control as keeping a model away from its test set.',
        'Identified and fixed a determinism defect in which consecutive seeds produced correlated runs, invalidating batch measurements that had looked entirely reasonable.',
      ],
      keywords:
        'AI agents, autonomous systems, local LLM, multi-agent simulation, deterministic testing, automated testing, JavaScript, Node.js',
    },
    {
      title: 'Technical Writing & Web Engineering (Independent)',
      org: 'Independent AI & Technology Projects',
      location: 'Pretoria, South Africa (remote)',
      from: '2026',
      to: 'Present',
      context:
        'Design, build and documentation of this portfolio: a zero-dependency static site generator and the supporting toolchain.',
      bullets: [
        'Built an 18-page static site from scratch in Node with no runtime dependencies, no framework and no web fonts, producing plain HTML, CSS and JavaScript that deploys to any host.',
        'Wrote an automated verification gate that fails the build on broken internal links, missing or duplicate page headings, images without alternative text, absent canonical URLs or leftover placeholder text, and wired it into continuous deployment so a failed check keeps the previous version live.',
        'Generated an ATS-compatible .docx directly as WordprocessingML, zipped with the standard library, verified to contain no tables, text boxes, drawings or column definitions — the structures applicant tracking systems most reliably mangle.',
        'Implemented accessibility fundamentals: semantic landmarks, one heading hierarchy per page, keyboard-operable navigation with correct ARIA state, visible focus, described diagrams and reduced-motion support.',
        'Implemented technical SEO: JSON-LD structured data, canonical URLs, Open Graph metadata, a generated sitemap and robots.txt, with title and description lengths verified automatically.',
        'Audited the repository before publication, identified server credentials in a file about to be made public, removed them and rewrote them out of version-control history.',
      ],
      keywords:
        'HTML, CSS, JavaScript, Node.js, accessibility, WCAG, technical SEO, JSON-LD, technical documentation, CI/CD, Git',
    },
  ],

  education: [
    {
      qualification: 'Higher Certificate in Information Technology Support Services',
      institution: 'IIE Rosebank College',
      location: 'South Africa',
      date: 'Completed March 2024',
      detail: null,
    },
    {
      qualification: 'INF4831 Information Security (NQF Level 8) — Distinction',
      institution: 'University of South Africa (UNISA)',
      location: 'South Africa',
      date: '2021',
      detail: 'Single NQF level 8 module passed with distinction.',
    },
    {
      qualification: 'Google Analytics Individual Qualification',
      institution: 'Google',
      location: 'Online',
      date: 'Certified',
      detail: null,
    },
  ],

  development: [
    {
      item: 'CS50 AI with Python (CS50AI), Harvard University (online)',
      date: 'Commenced February 2025',
      status: 'In progress — not presented as a completed certification',
    },
    {
      item: 'Structured 12-step technical roadmap toward AI engineering, each step completed by producing a verified artefact rather than by completing a course',
      date: 'Ongoing',
      status: 'Python fundamentals, Git and collaborative workflow, API development, LLM architecture and evaluation methodology currently active',
    },
  ],

  skillGroups: [
    {
      group: 'AI & Generative AI',
      items:
        'Applied generative AI; LLM application design; AI agents and autonomous loops; AI content evaluation; AI workflow design and automation; AI-assisted software development; applied speech synthesis and speech recognition; prompt design and output constraint.',
    },
    {
      group: 'Testing, Evaluation & Quality Assurance',
      items:
        'Experimental design; held-out and split-half validation; measurement-instrument validation; automated verification gates; content and factual review; testing against real data rather than fixtures; reproducibility discipline; regression and rollback practice; adversarial testing.',
    },
    {
      group: 'Information Technology',
      items:
        'IT support fundamentals; systematic troubleshooting and root-cause analysis; technical documentation; software testing; Windows and GPU workstation operations; long unattended job scheduling; systems thinking.',
    },
    {
      group: 'Information Security',
      items:
        'Information security fundamentals (NQF 8, distinction); privacy-by-design architecture; credential and secret handling; risk assessment concepts.',
    },
    {
      group: 'Product & Delivery',
      items:
        'Digital product development; honest product communication; technical SEO and structured data; product research and requirements definition.',
    },
    {
      group: 'Technical (used in shipped work, with AI assistance)',
      items:
        'JavaScript and Node.js; HTML, CSS and accessible markup; Python; Electron; ffmpeg; Unreal Engine and Blender scripting; Git.',
    },
  ],

  statement: `I build software with AI assistants and I verify every result before claiming it. I
am not presenting unaided programming experience, and I will describe my working method the same
way in an interview as I do here. What I can demonstrate is the ability to take a vague
requirement, turn it into a system with defined boundaries, build it, find the faults in it —
including faults in my own measurements — and ship something that works.`,

  referees: 'Available on request.',
};

export default cv;
