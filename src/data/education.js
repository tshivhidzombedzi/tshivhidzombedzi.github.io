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
    note:
      'Formal grounding in IT support: hardware, operating systems, networking fundamentals, user support and service practice.',
    relevance:
      'The basis of the IT Support Specialist track on the Career page, and the reason troubleshooting appears as a demonstrated rather than a claimed skill.',
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
    note:
      'A single NQF level 8 module passed with distinction, not a full qualification — stated that way deliberately.',
    relevance:
      'My strongest academic result, and the origin of the privacy-by-design and licensing decisions documented in the case studies.',
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
      'Applied directly to the technical SEO and traffic work on the MCP Labs properties.',
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
    note:
      'IN PROGRESS. Not described as a completed certification anywhere on this site, and excluded from the CV, because completion has not been verified.',
    relevance:
      'Covers search, knowledge representation, optimisation, learning and neural networks — the formal underpinning of the applied AI work, and step 4 on the roadmap.',
  },
];

export const completedEducation = education.filter((e) => e.status === 'completed');
export const inProgressEducation = education.filter((e) => e.status === 'in-progress');

export default education;
