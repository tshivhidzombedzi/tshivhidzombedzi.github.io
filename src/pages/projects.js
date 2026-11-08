import { esc, prose, list, when, section, link } from '../lib/html.js';
import projects from '../data/projects.js';
import moreWork from '../data/more-work.js';
import { renderDiagram } from '../templates/diagrams.js';
import { howItWorks } from '../data/how-it-works.js';

/** Projects index. */
export function projectsIndex() {
  const card = (p) => `
    <article class="card card--project">
      <div class="card-top">
        <span class="pill pill--${esc(p.status.tone)}">${esc(p.status.label)}</span>
        <span class="card-cat">${esc(p.category)}</span>
      </div>
      <h3 class="card-title"><a href="/projects/${esc(p.slug)}/">${esc(p.title)}</a></h3>
      <p class="card-sub">${esc(p.subtitle)}</p>
      <p class="card-body">${esc(p.tagline)}</p>
      <ul class="card-metrics">
        ${list(
          p.metrics.slice(0, 3),
          (m) => `<li><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></li>`,
        )}
      </ul>
      <p class="card-meta">${esc(p.period)}</p>
      <p class="card-more"><a href="/projects/${esc(p.slug)}/">Read the case study<span class="arr" aria-hidden="true">→</span></a></p>
    </article>`;

  const content = `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Projects</p>
    <h1>Seven case studies, with the unfinished parts listed.</h1>
    <p class="page-lead">
      Each case study covers the problem, the architecture, what I was responsible for, what went
      wrong, how it was tested, and exactly what is not built. The last of those is on the page
      rather than left out.
    </p>
    <div class="head-note">
      <p>
        <strong>No fabricated evidence.</strong> There are no invented screenshots, user counts or
        performance figures anywhere in these case studies. Where a product is live, the live URL is
        the demonstration. Where it is not, an authored architecture diagram describes the real
        system instead.
      </p>
    </div>
  </div>
</section>

${section({
  eyebrow: 'Case studies',
  title: 'Seven systems, built and shipped',
  lead:
    'Two released desktop applications built on locally hosted AI models, an autonomous agent, ' +
    'a deterministic simulation engine, and the generator that builds this site. Each is ' +
    'described in full, including what is not finished.',
  body: `<div class="cards cards--2">${list(projects.slice().sort((a, b) => a.order - b.order), card)}</div>`,
})}

${section({
  eyebrow: 'Also built',
  title: 'Smaller work, listed as what it is',
  className: 'alt',
  lead:
    'Neither of these is big enough for a full case study, and writing one would stretch it. ' +
    'They are here because they are real and checkable.',
  body: `
  <div class="more-list">
    ${list(
      moreWork,
      (m) => `
    <article class="more">
      <div class="more-head">
        <h3>${esc(m.t)}</h3>
        <p class="more-kind">${esc(m.kind)}</p>
      </div>
      <div class="more-body">
        <div class="rich">${prose(m.d)}</div>
        <p class="more-why"><span class="more-k">Why it is here</span> ${esc(m.why)}</p>
        <p class="more-status">${esc(m.status)}</p>
      </div>
    </article>`,
    )}
  </div>`,
})}`;

  return {
    path: '/projects/',
    title: 'Projects',
    description:
      'Seven technical case studies: a live streaming service, released AI desktop applications, ' +
      'an autonomous agent, a simulation engine and the generator behind this site.',
    content,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Projects',
        description: 'Technical case studies of systems built, tested and shipped.',
        hasPart: projects.map((p) => ({
          '@type': 'CreativeWork',
          name: p.title,
          description: p.subtitle,
        })),
      },
    ],
  };
}

/** A single project case study. */
export function projectPage(p) {
  // The How it works entry is conditional: a project without one must not get a contents
  // link to a section that never renders. The build gate caught exactly that.
  const toc = [
    ['overview', 'Overview'],
    ['problem', 'The problem'],
    ['solution', 'The solution'],
    ...(howItWorks[p.slug] ? [['how', 'How it works']] : []),
    ['stack', 'Technology stack'],
    ['architecture', 'System architecture'],
    ['responsibilities', 'My responsibilities'],
    ['process', 'Development process'],
    ['challenges', 'Challenges'],
    ['testing', 'Testing & validation'],
    ['evidence', 'Evidence'],
    ['status', 'Current status'],
    ['future', 'Future improvements'],
  ];

  const content = `
<section class="page-head page-head--project">
  <div class="wrap">
    <p class="crumb"><a href="/projects/">Projects</a> <span aria-hidden="true">/</span> ${esc(p.title)}</p>
    <div class="proj-top">
      <span class="pill pill--${esc(p.status.tone)}">${esc(p.status.label)}</span>
      <span class="card-cat">${esc(p.category)}</span>
      <span class="card-cat">${esc(p.period)}</span>
    </div>
    <h1>${esc(p.title)}</h1>
    <p class="proj-subtitle">${esc(p.subtitle)}</p>
    <p class="page-lead">${esc(p.tagline)}</p>

    <dl class="proj-facts">
      <div><dt>My role</dt><dd>${esc(p.role)}</dd></div>
      <div><dt>Period</dt><dd>${esc(p.period)}</dd></div>
      <div><dt>Category</dt><dd>${esc(p.category)}</dd></div>
    </dl>

    ${when(
      p.links && p.links.length,
      () => `
    <ul class="proj-links">
      ${list(
        p.links,
        (l) =>
          `<li>${
            l.url
              ? link(l.url, l.label, { className: 'btn btn--sm btn--ghost' })
              : `<span class="btn btn--sm btn--disabled" aria-disabled="true">${esc(l.label)}</span>`
          }${l.note ? `<span class="link-note">${esc(l.note)}</span>` : ''}</li>`,
      )}
    </ul>`,
    )}

    <ul class="metrics">
      ${list(
        p.metrics,
        (m) => `
      <li>
        <span class="metrics-v">${esc(m.value)}</span>
        <span class="metrics-l">${esc(m.label)}</span>
        ${when(m.note, () => `<span class="metrics-n">${esc(m.note)}</span>`)}
      </li>`,
      )}
    </ul>

    ${when(
      p.keyPoints && p.keyPoints.length,
      () => `
    <div class="inshort">
      <p class="inshort-k">In short</p>
      <ul>${list(p.keyPoints, (k) => `<li>${esc(k)}</li>`)}</ul>
    </div>`,
    )}

    ${when(
      p.disclaimer,
      () => `
    <div class="callout callout--warn">
      <p class="callout-h">Important — read before the rest of this page</p>
      ${prose(p.disclaimer)}
    </div>`,
    )}
  </div>
</section>

<div class="wrap proj-body">
  <nav class="toc" aria-label="On this page">
    <p class="toc-h">On this page</p>
    <ol>
      ${list(toc, ([id, label]) => `<li><a href="#${esc(id)}">${esc(label)}</a></li>`)}
    </ol>
  </nav>

  <div class="proj-main">
    <section id="overview" class="ps">
      <h2>Project overview</h2>
      <div class="rich">${prose(p.overview)}</div>
    </section>

    <section id="problem" class="ps">
      <h2>The problem being addressed</h2>
      <div class="rich">${prose(p.problem)}</div>
    </section>

    <section id="solution" class="ps">
      <h2>The solution</h2>
      <div class="rich">${prose(p.solution)}</div>
    </section>

    ${when(
      howItWorks[p.slug],
      () => {
        const h = howItWorks[p.slug];
        return `
    <section id="how" class="ps ps--how">
      <h2>How it works</h2>
      <div class="how-intro">${prose(h.intro)}</div>
      <ol class="how-steps">
        ${list(
          h.steps,
          (st) => `
        <li>
          <h3>${esc(st.t)}</h3>
          <p>${esc(st.d)}</p>
        </li>`,
        )}
      </ol>
      ${when(
        h.hardPart,
        () => `
      <aside class="hard-part">
        <h3>${esc(h.hardPart.t)}</h3>
        <div class="rich">${prose(h.hardPart.d)}</div>
      </aside>`,
      )}
    </section>`;
      },
    )}

    <section id="stack" class="ps">
      <h2>Technology stack</h2>
      <div class="stack-grid">
        ${list(
          p.stack,
          (g) => `
        <div class="stack-group">
          <p class="stack-h">${esc(g.group)}</p>
          <ul class="tags">${list(g.items, (i) => `<li>${esc(i)}</li>`)}</ul>
        </div>`,
        )}
      </div>
    </section>

    <section id="architecture" class="ps">
      <h2>System architecture</h2>
      ${when(
        p.diagram,
        () => renderDiagram(p.diagram),
        '<p class="muted">No diagram for this project.</p>',
      )}
    </section>

    <section id="responsibilities" class="ps">
      <h2>My responsibilities</h2>
      <ul class="check-list">
        ${list(p.responsibilities, (r) => `<li>${esc(r)}</li>`)}
      </ul>
    </section>

    <section id="process" class="ps">
      <h2>Development process</h2>
      <ol class="steps">
        ${list(
          p.process,
          (s) => `
        <li>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.body)}</p>
        </li>`,
        )}
      </ol>
    </section>

    <section id="challenges" class="ps">
      <h2>Challenges encountered</h2>
      <div class="challenge-list">
        ${list(
          p.challenges,
          (c) => `
        <article class="challenge">
          <h3>${esc(c.title)}</h3>
          <div class="rich">${prose(c.body)}</div>
        </article>`,
        )}
      </div>
    </section>

    <section id="testing" class="ps">
      <h2>Testing and validation</h2>
      <div class="cards cards--2 cards--tight">
        ${list(
          p.testing,
          (t) => `
        <article class="card card--test">
          <h3>${esc(t.title)}</h3>
          <p>${esc(t.body)}</p>
        </article>`,
        )}
      </div>
    </section>

    <section id="evidence" class="ps">
      <h2>Evidence and demonstrations</h2>
      <div class="rich">
        ${
          p.links && p.links.some((l) => l.url)
            ? `<p>This project is publicly inspectable. The links below are the demonstration — a live
                page you can open is stronger evidence than a screenshot I could have made in any
                image editor.</p>
               <ul class="evidence-list">
                 ${list(
                   p.links.filter((l) => l.url),
                   (l) => `<li>${link(l.url, l.label)}${l.note ? ` — ${esc(l.note)}` : ''}</li>`,
                 )}
               </ul>`
            : `<p>There is no public URL for this project, and there are no screenshots on this page.
               That is deliberate: a screenshot is trivial to fabricate and I would rather show you a
               description of the real architecture than an image you have no way to verify. The
               diagram above is authored from the actual system.</p>`
        }
        <p class="muted small">
          Source code is not currently published. Publishing this portfolio repository and making my
          work reviewable is step 2 on my <a href="/career/">roadmap</a>, and it is a hiring problem
          before it is a technical one. I am happy to walk through any of this code in a screen share.
        </p>
      </div>
    </section>

    <section id="status" class="ps">
      <h2>Current development status</h2>
      <div class="status-split">
        <div class="status-col status-col--built">
          <h3><span class="status-ic" aria-hidden="true">✓</span> Built, tested and in use</h3>
          <ul>${list(p.statusDetail.built, (b) => `<li>${esc(b)}</li>`)}</ul>
        </div>
        <div class="status-col status-col--not">
          <h3><span class="status-ic" aria-hidden="true">○</span> Not built, or not proven</h3>
          <ul>${list(p.statusDetail.notBuilt, (b) => `<li>${esc(b)}</li>`)}</ul>
        </div>
      </div>
    </section>

    <section id="future" class="ps">
      <h2>Future improvements</h2>
      <ul class="arrow-list">
        ${list(p.future, (f) => `<li>${esc(f)}</li>`)}
      </ul>
    </section>

    <nav class="proj-nav" aria-label="Other projects">
      ${(() => {
        const idx = projects.findIndex((x) => x.slug === p.slug);
        const prev = projects[idx - 1];
        const next = projects[idx + 1];
        return `
        ${
          prev
            ? `<a class="proj-nav-a" href="/projects/${esc(prev.slug)}/"><span>Previous</span><strong>${esc(
                prev.title,
              )}</strong></a>`
            : '<span></span>'
        }
        ${
          next
            ? `<a class="proj-nav-a proj-nav-a--next" href="/projects/${esc(
                next.slug,
              )}/"><span>Next</span><strong>${esc(next.title)}</strong></a>`
            : '<span></span>'
        }`;
      })()}
    </nav>
  </div>
</div>`;

  return {
    path: `/projects/${p.slug}/`,
    title: p.title,
    description: p.meta,
    content,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: p.title,
        alternativeHeadline: p.subtitle,
        description: p.tagline,
        creator: { '@type': 'Person', name: 'Tshivhidzo Mbedzi' },
        about: p.category,
        dateCreated: p.period,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Projects', item: '/projects/' },
          { '@type': 'ListItem', position: 2, name: p.title },
        ],
      },
    ],
  };
}

export default projectsIndex;
