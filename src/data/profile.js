/**
 * Core identity and contact facts.
 *
 * EVERY value in this file is either supplied by Tshivhidzo Mbedzi directly or
 * was read from a page he publishes himself (verified 2026-11-07). Nothing here is inferred.
 *
 * Open items are tracked in private/PROPOSED-PUBLIC-INVENTORY.md.
 */

export const profile = {
  name: 'Tshivhidzo Mbedzi',
  nickname: 'Moss',
  displayName: 'Tshivhidzo "Moss" Mbedzi',
  shortName: 'Moss Mbedzi',

  // Positioning (his own wording, kept consistent across site, CV and LinkedIn)
  role: 'AI & Technology Specialist',
  disciplines: [
    'AI Product Development',
    'Generative AI',
    'AI Workflow Automation',
    'Information Technology',
    'Information Security',
  ],

  location: {
    city: 'Pretoria',
    region: 'Gauteng',
    country: 'South Africa',
    countryCode: 'ZA',
    // Verified from his own Organization schema on hoshidub.com
    source: 'hoshidub.com Organization schema',
  },

  availability: 'Open to remote roles worldwide · Available immediately',
  timezone: 'SAST (UTC+2)',

  headline:
    'Building Practical Technology Solutions at the Intersection of AI, Automation and Innovation.',
  subheading:
    'Independent technology builder exploring generative AI, intelligent workflows, digital products and emerging software technologies.',

  // The one-paragraph version used in meta descriptions and the recruiter intro.
  summary:
    'Independent technology builder from Pretoria, South Africa. I design, build, test and ship ' +
    'real software with AI assistants as my engineering partner - two released Windows ' +
    'applications built on locally hosted speech and language models, and twenty 4K animated ' +
    'episodes produced by a pipeline I built. My working discipline is verification: I measure ' +
    'what I build and I retract my own results when the measurement was wrong.',

  contact: {
    // Personal address, chosen by him on 2026-11-08. Deliberately NOT a business address:
    // any address on a business domain lets a recruiter identify the private business in
    // one lookup, which defeats the purpose of keeping it out of this portfolio.
    email: 'mbedzimz1@gmail.com',
    emailLabel: 'mbedzimz1@gmail.com',
    phone: null, // Omitted deliberately - see private/PROPOSED-PUBLIC-INVENTORY.md.
    linkedin: 'https://www.linkedin.com/in/tshivhidzo-mbedzi-a74040233/',
    linkedinLabel: 'linkedin.com/in/tshivhidzo-mbedzi',
    // Checked 2026-11-07: no public account exists. Set this once the portfolio repository
    // is published.
    github: null,
  },

  // Private business properties are deliberately not listed here. This portfolio is for
  // employment and does not advertise them.
  sites: [],

  channels: [
    {
      label: 'Hoshi & Aiko',
      url: 'https://www.youtube.com/@HoshiandAiko',
      what: 'Two 10-episode animated seasons produced with Hoshi Nova',
    },
  ],

  cv: {
    fileName: 'Tshivhidzo-Mbedzi-CV.docx',
    pdfName: 'Tshivhidzo-Mbedzi-CV.pdf',
    mdName: 'Tshivhidzo-Mbedzi-CV.md',
  },
};

/** How I describe the AI-assisted working method. Used in several places verbatim. */
export const methodStatement = {
  claim:
    'I build software with AI assistants, and I verify every result before I claim it.',
  detail:
    'I am not a self-taught programmer who writes every line unaided, and this portfolio does not ' +
    'pretend otherwise. What I do is specify, direct, test and validate systems - then reject my ' +
    'own work when the evidence does not support it. The examples on the Verification page are all ' +
    'cases where I found the fault in my own results.',
};

export default profile;
