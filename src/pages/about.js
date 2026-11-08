import { esc, prose, list, section } from '../lib/html.js';
import profile from '../data/profile.js';

/**
 * About page.
 *
 * The hardest page to write honestly. He asked explicitly not to misrepresent his abilities or
 * invent professional experience, and the temptation in a portfolio is to describe AI-assisted
 * work in language that implies unaided authorship.
 *
 * The approach taken: say it plainly, early, and then show why it is a credential rather than
 * an apology. A candidate who describes their own method accurately is more employable than one
 * who is caught overstating it in a technical interview.
 */
export default function about() {
  const principles = [
    {
      t: 'Smallest working version first',
      d: 'One episode rendered badly, end to end, before any attempt at a season. The first delivered pass came out at the wrong resolution — exactly the error an end-to-end run surfaces and a component test does not.',
    },
    {
      t: 'Verify, then claim',
      d: 'A file existing where one was expected is not a result. Resolution, frame rate, audio level and transcript are measured before anything is called finished. Several of my strongest conclusions were deleted by this rule.',
    },
    {
      t: 'Keep the rejections',
      d: 'When an idea is tested and fails, the evidence is recorded at the place in the code where somebody would try it again. Three ideas in one product have been tested, rejected, and re-rejected on a later attempt — the note is what eventually stopped the cycle.',
    },
    {
      t: 'Make the constraint executable',
      d: 'A rule in a document decays. A rule in a test does not. The honesty of my simulation engine is enforced by an automated check rather than by my memory of a convention I set.',
    },
    {
      t: 'State what is not done',
      d: 'Every case study on this site carries a list of what is unbuilt, and that list is rendered on the page rather than kept in a file. It is the reason the built list is worth reading.',
    },
    {
      t: 'Replace only if better',
      d: 'A new approach has to beat the old one on the same test before it replaces anything, and the old version is kept. Novelty is not evidence.',
    },
  ];

  const notThis = [
    'I am not a self-taught programmer who writes every line unaided. I build with AI assistants and I say so.',
    'I have no commercial employment history in software. My experience is my own products, with my own customers.',
    'I have never worked in a development team: no code review, no shared branch, no CI pipeline, no on-call.',
    'I have never trained a machine learning model. I integrate and evaluate models; that is a different skill.',
    'I have never deployed anything to cloud infrastructure, containers or an orchestrator.',
  ];

  const story = [
    {
      when: '2021',
      what: 'Information Security at NQF level 8, passed with distinction',
      d: 'My strongest academic result, and the origin of the privacy-first architecture decisions in my products years later.',
    },
    {
      when: 'March 2024',
      what: 'Higher Certificate in IT Support Services completed',
      d: 'Formal grounding in support, troubleshooting and service practice — the layer everything since has run on.',
    },
    {
      when: 'February 2025',
      what: 'Began CS50 AI with Python',
      d: 'In progress, not complete. Listed that way everywhere on this site, including being left out of my CV.',
    },
    {
      when: '2025',
      what: 'First independent software projects shipped',
      d: 'The year I stopped studying technology and started operating it: real systems, running unattended, that had to keep working.',
    },
    {
      when: '2026',
      what: 'Two desktop AI products released, two animated seasons produced, a 30-lesson course published',
      d: 'The year the portfolio on this site was actually built — and the year I learned most of what the Verification page documents.',
    },
  ];

  const content = `
<section class="page-head">
  <div class="wrap">
    <div class="who">
      <img class="who-img" src="${esc(profile.photo.src)}" width="80" height="80"
           alt="Portrait of ${esc(profile.name)}" loading="lazy" decoding="async">
      <div>
        <p class="eyebrow">About me</p>
        <p class="who-name">${esc(profile.name)}</p>
        <p class="who-role">${esc(profile.role)} &middot; ${esc(profile.location.city)}, ${esc(
          profile.location.country,
        )}</p>
      </div>
    </div>
    <h1>I build real products with AI, and I am precise about what that means.</h1>
    <p class="page-lead">
      Independent technology builder in ${esc(profile.location.city)}, ${esc(profile.location.country)}.
      Two released desktop applications built on locally hosted AI models, and twenty 4K animated
      episodes produced by a pipeline I built. All of it with AI assistants as my engineering
      partner.
    </p>
  </div>
</section>

${section({
  title: 'The working method, stated plainly',
  className: 'prose-sec',
  body: `
  <div class="rich">
    ${prose(`I use AI assistants to research, design, write, test and troubleshoot the systems on this
      site. That is not a disclaimer at the bottom of the page; it is the first thing I want a hiring
      manager to know, because the alternative is being found out in a technical interview, and
      because the method is more interesting than the euphemism.

      What I actually do is specify a system, decide its architecture and constraints, direct the
      implementation, and then test it hard enough to find out whether it works. The part I am good at
      is the last one. Most of what is on this site exists because I kept measuring things after they
      appeared to be finished.

      The specific claim is this. I cannot
      currently sit down and write production code unaided at interview speed. I can take a vague
      requirement, turn it into a system with defined boundaries, build it with assistance, find the
      faults in it — including the faults in my own measurements — and ship something that real people
      pay for and use. Those are different skills, and the second is much of what AI evaluation
      and AI operations work consists of.`)}
  </div>

  <div class="callout callout--accent">
    <p class="callout-h">Why I lead with this</p>
    ${prose(`The roles I am targeting — AI quality rating, AI evaluation, AI training, AI operations —
      exist precisely because AI output cannot be trusted without someone checking it. A candidate
      whose own portfolio overstates itself is the wrong person for that job, whatever their CV says.
      So the test I set myself for this site was that every claim on it should survive being
      checked.`)}
  </div>`,
})}

${section({
  title: 'How I work',
  className: 'alt',
  lead:
    'Six practices, each learned by getting something wrong first. They are the reason the ' +
    'projects on this site have gates, tests and rollback paths rather than just features.',
  body: `
  <div class="cards cards--3">
    ${list(
      principles,
      (p) => `
    <article class="card card--principle">
      <h3>${esc(p.t)}</h3>
      <p>${esc(p.d)}</p>
    </article>`,
    )}
  </div>`,
})}

${section({
  title: 'What I am not claiming',
  lead:
    'A portfolio is more useful when it has edges. These are mine, and none of them is hidden ' +
    'anywhere else on this site.',
  body: `
  <ul class="honest-list">
    ${list(notThis, (n) => `<li>${esc(n)}</li>`)}
  </ul>
  <div class="callout">
    ${prose(`Everything in that list is addressed by the twelve-step roadmap on the Career page, and
      every step there is completed by building something rather than by finishing a course. Nothing
      on that roadmap is marked complete today, which is the accurate state of it.`)}
    <p><a class="btn btn--sm btn--ghost" href="/career/">See the roadmap</a></p>
  </div>`,
})}

${section({
  title: 'How I got here',
  className: 'alt',
  body: `
  <ol class="timeline">
    ${list(
      story,
      (s) => `
    <li>
      <p class="tl-when">${esc(s.when)}</p>
      <p class="tl-what">${esc(s.what)}</p>
      <p class="tl-d">${esc(s.d)}</p>
    </li>`,
    )}
  </ol>`,
})}

${section({
  title: 'What I am looking for',
  body: `
  <div class="rich">
    ${prose(`Remote work, with an organisation that treats AI-assisted development as normal practice
      rather than something to be apologised for. My immediate fit is AI evaluation and quality work,
      where measurement discipline is the job itself, or AI operations and technical support, where my
      formal qualification and my experience running production systems both apply directly.

      Longer term I am working towards AI/ML engineering, through the roadmap on the Career page. I
      would rather start in a role where what I already have is immediately useful and close the
      engineering gaps through the work, than claim a level I am not at and spend six months being
      found out.`)}
    <p class="rich-actions">
      <a class="btn btn--primary" href="/career/#roles">Role-by-role fit, with the gaps</a>
      <a class="btn btn--ghost" href="/contact/">Get in touch</a>
    </p>
  </div>`,
})}`;

  return {
    path: '/about/',
    title: 'About me',
    description:
      'What AI-assisted development actually means, the six principles behind my work, and the ' +
      'five things I am explicitly not claiming.',
    content,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Tshivhidzo Mbedzi',
        description: 'Working method, principles, stated limitations and professional direction.',
      },
    ],
  };
}
