/**
 * Education and credentials.
 *
 * Supplied directly by Tshivhidzo Mbedzi. Nothing added, nothing upgraded.
 *
 * NOTE ON CS50 AI: his instruction was explicit - studies commenced February 2025 and
 * completion must be verified before it is described as a completed certification. It is
 * therefore rendered as IN PROGRESS with a visible "not verified as complete" note, and it
 * is excluded from the CV's certifications section. See docs/QUESTIONS.md Q4.
 */

export const education = [
  {
    qualification: 'Higher Certificate in Information Technology Support Services',
    institution: 'IIE Rosebank College',
    location: 'South Africa',
    status: 'completed',
    completed: 'March 2024',
    period: 'Completed March 2024',
    level: null,
    result: null,
    // CONFIRMED BY HIM 2026-11-08: it is a Higher Certificate, not the "Higher National
    // Diploma" his LinkedIn currently claims. This entry is correct; the LinkedIn entry is
    // the one that needs fixing. See private/LINKEDIN-FINDINGS.md section 1.
    verified: '2026-11-08',
    credential: 'NQF Level 5 · 120 credits · SAQA ID 126343',
    // CORRECTED 2026-11-08 against the institution's own qualification page, which he supplied.
    // I had first used SAQA record 81866 (132 credits, a different and older module set
    // including Web Development and End-User Computing A/B/C). The current registration is
    // 126343 at 120 credits with the modules below. Two registrations exist for a
    // similarly-named qualification, so the module list is NOT interchangeable between them —
    // if his transcript shows the older set, this list must be swapped back.
    //
    // These state what the programme covers. They are NOT a claim of mastery of each module.
    // CONFIRMED BY HIM 2026-11-08: this is the module set on his transcript.
    curriculumSource: 'Registered curriculum, SAQA ID 126343',
    curriculum: [
      'Technical Writing and Communication',
      'Computer Architecture',
      'Help Desk',
      'Introduction to Quantitative Thinking and Techniques',
      'Computer Networks 1A',
      'Client Systems Configuration',
      'Introduction to Cyber Security',
      'Work Integrated Learning',
    ],
    // Career outcomes the institution states the qualification prepares graduates for. These
    // map directly onto the IT support roles on the Career page, which is why they are shown.
    outcomes: [
      'Support Technician',
      'Helpdesk Support Technician',
      'Network LAN Technician',
      'System Support',
    ],
    outcomesLabel: 'Careers the qualification prepares for',
    note:
      'Formal grounding in IT support: hardware, operating systems, networking fundamentals, user support and service practice.',
    relevance:
      'The basis of the IT Support Specialist track on the Career page, and the reason troubleshooting appears as a demonstrated rather than a claimed skill. Its Introduction to Cyber Security module also sits alongside the UNISA information security work below.',
  },
  {
    qualification: 'INF4831 – Information Security',
    institution: 'University of South Africa (UNISA)',
    location: 'South Africa',
    status: 'completed',
    completed: '2021',
    period: '2021',
    level: 'NQF Level 8',
    result: 'Distinction',
    isModule: true,
    // CONFIRMED BY HIM 2026-11-08: it is INF4831 at NQF level 8, passed with distinction.
    // His LinkedIn describes the same study as "Certificate, Introduction to Information
    // Security", which UNDERSTATES it. This entry is correct; the LinkedIn entry needs
    // fixing. Keep the certificate or transcript to hand — this is the strongest academic
    // claim on the CV and the most likely to be checked.
    verified: '2026-11-08',
    credential: 'NQF Level 8 · 12 credits · Honours-year module',
    // NQF level, credits and honours-year status independently corroborated against UNISA's
    // own module registration listing on 2026-11-08, not taken on trust.
    curriculumSource: "Corroborated against UNISA's module listing",
    curriculum: [
      'Identification and authentication',
      'Authorisation and access control',
      'Confidentiality and integrity',
      'Non-repudiation',
      'Risk analysis',
      'Cryptography fundamentals',
      'Security planning and policy compliance',
    ],
    note:
      'A single NQF level 8 module passed with distinction, not a full qualification — stated that way deliberately.',
    relevance:
      'My strongest academic result, and the origin of the privacy-by-design decisions documented in the case studies — processing kept on the user device, no account, nothing transmitted.',
  },
  {
    qualification: 'Google Analytics Individual Qualification',
    institution: 'Google',
    location: 'Online',
    status: 'completed',
    completed: null,
    period: 'Certified',
    level: null,
    result: 'Certified',
    note: 'Measurement, reporting and analysis in Google Analytics.',
    relevance:
      'Applied directly to the technical SEO and structured-data work on this site.',
  },
  {
    qualification: 'CS50 AI with Python (CS50AI)',
    institution: 'Harvard University (online)',
    location: 'Online',
    status: 'in-progress',
    completed: null,
    period: 'Commenced February 2025',
    level: null,
    result: null,
    unverified: true,
    credential: 'HarvardX via edX · 7 topics',
    curriculumSource: 'Official course syllabus',
    curriculum: [
      'Search',
      'Knowledge representation',
      'Uncertainty',
      'Optimization',
      'Learning',
      'Neural networks',
      'Language',
    ],
    note:
      'IN PROGRESS. Not described as a completed certification anywhere on this site, and excluded from the CV, because completion has not been verified.',
    relevance:
      'Covers search, knowledge representation, optimisation, learning and neural networks — the formal underpinning of the applied AI work, and step 4 on the roadmap.',
  },
];

export const completedEducation = education.filter((e) => e.status === 'completed');
export const inProgressEducation = education.filter((e) => e.status === 'in-progress');

export default education;
