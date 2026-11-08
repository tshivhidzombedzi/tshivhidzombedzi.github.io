# Tshivhidzo Mbedzi

**AI & Technology Specialist — AI Evaluation, Generative AI, IT Support**

mbedzimz1@gmail.com · linkedin.com/in/tshivhidzo-mbedzi · github.com/tshivhidzombedzi · Pretoria, South Africa

*Available immediately · Open to fully remote roles worldwide*

## Professional Summary

Independent technology builder with a verifiable record of shipping AI software: two released Windows desktop applications built on locally hosted speech and language models, and twenty 4K animated episodes produced end to end by a production pipeline I designed and operate. Formally qualified in IT support services, with a distinction at NQF level 8 in Information Security.

My core strength is evaluation discipline. I use held-out validation, I verify the measuring instrument before trusting a result, and I have repeatedly discarded my own conclusions when the measurement turned out to be invalid — including a full session of parameter work invalidated by a single simulator setting, and a platform-reported success metric that was wrong for the system it was measuring. I build software with AI assistants and state that plainly rather than implying unaided authorship.

Seeking AI quality evaluation, AI training, AI operations or IT support work where measurement rigour and operational ownership are the job.

## Professional Experience

*All roles below are independent and self-employed. I have no commercial employment history in software, and this CV does not imply otherwise.*

### AI Product Developer (Independent)
Independent AI & Technology Projects | Pretoria, South Africa (remote) | 2026 – Present

Two desktop AI applications taken from concept to public release, built on locally hosted speech and language models. Sole responsibility for architecture, implementation, testing and documentation.

- Released a Windows application (version 0.1.0) performing real-time AI dubbing of video, assigning a distinct synthetic voice to each speaker, with all speech recognition, speech synthesis and language-model inference running on the user device.
- Solved the real-time latency requirement as a scheduling problem rather than an inference-speed problem, pre-synthesising each line against known subtitle cue times so output lands on cue by construction rather than by optimisation.
- Implemented dialogue-selective audio ducking to measurable targets — original dialogue attenuated by approximately 15 dB while music and effects remain within approximately 2 dB — instead of reducing the whole mix.
- Designed spoiler containment for a language-model companion feature as an architectural guarantee: the model context contains only content already played, so it cannot reveal what is coming. A prompt instruction would have been circumvented on the first day.
- Established the privacy posture as an architecture decision rather than a policy statement: on-device processing, no account, no recording, nothing transmitted.
- Built an animation production platform that produced 20 episodes across two seasons at verified 3840x2160 resolution, running unattended from structured episode data.
- Implemented an automated delivery gate measuring resolution, frame rate and audio level, with speech-recognition verification of narration against script, which restores the previous output on failure rather than shipping.
- Diagnosed systemic animation defects using automated geometry scanning after they had passed human review: 61 of 70 clips contained limb-through-body intersection invisible at playback speed.

### AI Systems & Simulation Projects (Independent)
Independent AI & Technology Projects | Pretoria, South Africa (remote) | 2026 – 2026

Two self-directed engineering projects built to work out specific techniques: an autonomous agent loop, and a deterministic multi-agent simulation with an enforced information boundary.

- Built an autonomous presenter application in which an animated character hosts a live session unattended — reading chat, deciding when to respond and when to stay silent, opening new topics, and reacting to on-screen video — with language, speech-synthesis and speech-recognition models all running locally.
- Designed the director loop so the language model is one input to a decision rather than the decision-maker, and added a register filter that rejects assistant phrasing before it reaches speech synthesis.
- Built operator safety controls before any audience existed: emergency stop, moderation with a blocked-term list, and per-viewer data removal.
- Set a simulated-audience feature to be off by default and reachable only through an explicit environment flag, after it displayed fabricated activity during a real session. A development convenience that fabricates data must be structurally impossible to leave enabled.
- Built a dependency-free simulation engine for eight agents holding private knowledge with full provenance, covered by 38 automated tests runnable with a single command.
- Enforced the simulation's integrity with an automated test that fails the build if agent-reasoning code accesses the hidden ground truth it is meant to deduce — the same class of control as keeping a model away from its test set.
- Identified and fixed a determinism defect in which consecutive seeds produced correlated runs, invalidating batch measurements that had looked entirely reasonable.

### Technical Writing & Web Engineering (Independent)
Independent AI & Technology Projects | Pretoria, South Africa (remote) | 2026 – Present

Design, build and documentation of this portfolio: a zero-dependency static site generator and the supporting toolchain.

- Built an 18-page static site from scratch in Node with no runtime dependencies, no framework and no web fonts, producing plain HTML, CSS and JavaScript that deploys to any host.
- Wrote an automated verification gate that fails the build on broken internal links, missing or duplicate page headings, images without alternative text, absent canonical URLs or leftover placeholder text, and wired it into continuous deployment so a failed check keeps the previous version live.
- Generated an ATS-compatible .docx directly as WordprocessingML, zipped with the standard library, verified to contain no tables, text boxes, drawings or column definitions — the structures applicant tracking systems most reliably mangle.
- Implemented accessibility fundamentals: semantic landmarks, one heading hierarchy per page, keyboard-operable navigation with correct ARIA state, visible focus, described diagrams and reduced-motion support.
- Implemented technical SEO: JSON-LD structured data, canonical URLs, Open Graph metadata, a generated sitemap and robots.txt, with title and description lengths verified automatically.
- Audited the repository before publication, identified server credentials in a file about to be made public, removed them and rewrote them out of version-control history.

## Education

**Higher Certificate in Information Technology Support Services**
IIE Rosebank College | South Africa | Completed March 2024

**INF4831 Information Security (NQF Level 8) — Distinction**
University of South Africa (UNISA) | South Africa | 2021
*Single NQF level 8 module passed with distinction.*

**Google Analytics Individual Qualification**
Google | Online | Certified

## Continuing Professional Development

**CS50 AI with Python (CS50AI), Harvard University (online)**
Commenced February 2025 — In progress — not presented as a completed certification

**Structured 12-step technical roadmap toward AI engineering, each step completed by producing a verified artefact rather than by completing a course**
Ongoing — Python fundamentals, Git and collaborative workflow, API development, LLM architecture and evaluation methodology currently active

## Skills

**AI & Generative AI:** Applied generative AI; LLM application design; AI agents and autonomous loops; AI content evaluation; AI workflow design and automation; AI-assisted software development; applied speech synthesis and speech recognition; prompt design and output constraint.

**Testing, Evaluation & Quality Assurance:** Experimental design; held-out and split-half validation; measurement-instrument validation; automated verification gates; content and factual review; testing against real data rather than fixtures; reproducibility discipline; regression and rollback practice; adversarial testing.

**Information Technology:** IT support fundamentals; systematic troubleshooting and root-cause analysis; technical documentation; software testing; Windows and GPU workstation operations; long unattended job scheduling; systems thinking.

**Information Security:** Information security fundamentals (NQF 8, distinction); privacy-by-design architecture; credential and secret handling; risk assessment concepts.

**Product & Delivery:** Digital product development; honest product communication; technical SEO and structured data; product research and requirements definition.

**Technical (used in shipped work, with AI assistance):** JavaScript and Node.js; HTML, CSS and accessible markup; Python; Electron; ffmpeg; Unreal Engine and Blender scripting; Git.

## Statement on Working Method

I build software with AI assistants and I verify every result before claiming it. I am not presenting unaided programming experience, and I will describe my working method the same way in an interview as I do here. What I can demonstrate is the ability to take a vague requirement, turn it into a system with defined boundaries, build it, find the faults in it — including faults in my own measurements — and ship something that works.

## References

Available on request.
