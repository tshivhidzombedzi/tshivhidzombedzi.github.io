/**
 * Core identity and contact facts.
 *
 * EVERY value in this file is either supplied by Tshivhidzo Mbedzi directly or
 * was read from a page he publishes himself (hoshidub.com / apexdrawdownzero.com
 * structured data, verified 2026-11-07). Nothing here is inferred.
 *
 * Values marked PLACEHOLDER are waiting on his confirmation - see docs/QUESTIONS.md.
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
    'real software products with AI assistants as my engineering partner - two shipped Windows ' +
    'applications, a live commercial storefront with a licensing API, and an automated trading ' +
    'product with paying customers. My working discipline is verification: I measure what I build ' +
    'and I retract my own results when the measurement was wrong.',

  contact: {
    // Publicly listed by him as the MCP Labs support address on apexdrawdownzero.com.
    email: 'support@mcpautomation.io',
    emailLabel: 'support@mcpautomation.io',
    emailNote: 'Business address, published on his own sites. See docs/QUESTIONS.md Q1.',
    phone: null, // PLACEHOLDER - not published anywhere; ask before adding.
    linkedin: 'https://www.linkedin.com/in/tshivhidzo-mbedzi-a74040233/',
    linkedinLabel: 'linkedin.com/in/tshivhidzo-mbedzi',
    // Checked 2026-11-07: no public account exists under mbedzimz1, mossmbedzi or
    // tshivhidzombedzi. Set this once the portfolio repository is published. See QUESTIONS.md Q3.
    github: null,
    mql5: 'https://www.mql5.com/en/users/mbedzimz1/seller',
    mql5Label: 'MQL5 verified seller',
  },

  sites: [
    {
      label: 'mcpautomation.io',
      url: 'https://mcpautomation.io',
      what: 'MCP Labs storefront, customer portal and licensing API',
    },
    {
      label: 'apexdrawdownzero.com',
      url: 'https://apexdrawdownzero.com',
      what: 'Product site for Apex Drawdown Zero',
    },
    {
      label: 'hoshidub.com',
      url: 'https://hoshidub.com',
      what: 'Product site for Hoshidub, the live AI dubbing app',
    },
  ],

  channels: [
    {
      label: 'MCP LABS FOREX',
      url: 'https://www.youtube.com/@KidosExpertsTrading',
      what: 'Product education and a 30-lesson free course',
    },
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
