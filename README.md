# Tshivhidzo "Moss" Mbedzi — professional portfolio

A complete, deployable portfolio site, CV and recruiter-facing content pack.

**18 pages · 0 runtime dependencies · ~73 ms build · ~530 kB total output**

---

## Quick start

```bash
npm run build     # writes ./dist
npm run serve     # preview http://localhost:4321
npm run check     # verify the build (links, SEO, accessibility, placeholders)
npm run cv        # regenerate the downloadable CV (.docx + .md)
```

There is nothing to install. `npm install` is not required and will install nothing, because
this project has no dependencies at all.

---

## Why this stack

The requirement was a maintainable, fast, SEO-friendly, deployable site. The decision was a
**zero-dependency static site generator in Node**, not Astro, Next.js or Eleventy. The reasons,
in order of how much they mattered:

1. **It deploys anywhere, including hosting that is already paid for.** The output is plain
   HTML, CSS and JS. It uploads to the existing Hostinger shared hosting by copying a folder —
   no Node on the server, no build step at the host, no platform lock-in. It works equally on
   Netlify, Cloudflare Pages or GitHub Pages.
2. **It builds offline, in milliseconds, forever.** No dependency tree to install over an
   unreliable connection, no transitive packages to audit, nothing that stops working in
   eighteen months because a plugin was abandoned.
3. **It is fast by construction, not by optimisation.** No framework runtime is shipped to the
   browser. The only JavaScript on the site is ~90 lines for the mobile menu, the contents
   highlight and the print button, and every page is fully readable with JavaScript disabled.
4. **It can be explained.** This portfolio's entire premise is not claiming things you cannot
   back up. A build system whose owner can read every line of it is consistent with that; a
   200 MB `node_modules` tree inherited from a scaffolding command is not.

The honest trade-off: a framework would give hot reload, image optimisation and a plugin
ecosystem. None of those were worth the cost here for an 18-page content site.

**No web fonts.** The type stack resolves to Segoe UI Variable on Windows, SF Pro on macOS and
Roboto on Android — high-quality faces already on the device. Zero font requests, no layout
shift, no third-party CDN, no privacy exposure.

## Design

Restrained and editorial: neutral charcoal, hairline rules, generous whitespace, and colour
used for meaning only — links, the active page, and three status markers. Separation comes from
rules and background value rather than elevation. Radii are 3–4px, because close to square
reads as serious and pill shapes read as consumer.

Deliberately avoided, because they are the house style of generated template sites: radial
"glow" backgrounds, grid overlays, large coloured statistics, drop shadows, lift-on-hover cards
and decorative icons. The rationale is written into the top of `site.css` so a future change
does not quietly reintroduce them.

---

## Project structure

```
build.js                 The entire build system (~150 lines)
check.js                 Build verification — run before every deploy
serve.js                 Local preview server with clean URLs and a real 404

src/
  data/                  ALL CONTENT LIVES HERE. Edit these, not the templates.
    profile.js           Name, contact, location, availability
    site.js              Base URL, navigation, footer      ← set baseUrl before deploying
    projects.js          The seven case studies
    skills.js            Skills in three tiers
    education.js         Qualifications
    lab.js               AI Laboratory entries
    verification.js      The six verification cases
    roadmap.js           Twelve-step career roadmap  ← update progress here
    roles.js             Recruiter role mapping
    cv.js                CV content (shared by the web CV and the .docx)
  lib/html.js            Escaping and small render helpers
  templates/
    layout.js            Page shell: head metadata, nav, footer
    diagrams.js          Architecture diagrams, authored as inline SVG
  pages/                 One module per page; each returns { path, title, description, content }

public/                  Copied verbatim into dist/
  assets/css/site.css    The design system
  assets/js/site.js      The only JavaScript on the site
  assets/img/            favicon.svg, og.png
  assets/docs/           Generated CV files

tools/
  make-cv.js             Generates the .docx and .md CV from src/data/cv.js
  make-og.js             Generates the 1200x630 social share image

docs/                    Public documentation
  DEPLOYMENT.md          How to publish, on five different hosts

private/                 GITIGNORED — never published. Job-application drafts,
                         internal planning notes, and server credentials.
  QUESTIONS.md           Decisions and their answers
  CHECKLIST.md           What is done and what is outstanding
  LINKEDIN.md            Headline, About, experience and project copy
  COVER-LETTER.md        Cover letter templates and recruiter introduction
  DEPLOY-SECRETS.md      SSH user/host/port/key — substituted into DEPLOYMENT.md

.github/workflows/
  deploy.yml             Build, verify, publish to GitHub Pages on push to main
```

---

## How to change things

**Text and content:** edit the relevant file in `src/data/`, then `npm run build`. You should
not need to touch `src/pages/` or `src/templates/` to change what the site says.

**Add a project:** append an object to the array in `src/data/projects.js`. A page, a route,
a sitemap entry, navigation between case studies and the home-page card are all generated
from it. Set `featured: true` to put it on the home page. Every field is required except
`disclaimer` and `links`.

**Update roadmap progress:** change a step's `status` in `src/data/roadmap.js` and fill in
`evidence`. Per the rule stated on the page itself, do not set a step to `complete` until its
named proof artefact exists and has been verified.

**Update the CV:** edit `src/data/cv.js`, then `npm run cv && npm run build`. The web CV page
and the downloadable file are generated from the same source, so they cannot drift apart.

**Change the design:** everything is driven by the custom properties at the top of
`public/assets/css/site.css`.

---

## Verification

`npm run check` is a real gate, not a formality. It fails the build on:

- any broken internal link, missing asset or dead in-page anchor;
- a page with no `<h1>`, more than one `<h1>`, or no title, description or canonical URL;
- any `<img>` without `alt`, or any `target="_blank"` without `rel="noopener"`;
- leftover placeholder text (`TODO`, `FIXME`, `lorem`, `PLACEHOLDER`);
- a missing `sitemap.xml` or `robots.txt`.

It warns on titles and meta descriptions outside the lengths search engines display, and on
skipped heading levels.

Current status: **18 pages, 730 links and assets checked, 0 errors, 0 warnings.**

Manually verified in a browser as well: desktop (1440px) and mobile (375px) layouts, no
horizontal overflow at 375px, the mobile menu's `aria-expanded` and visibility toggling, and
the sticky contents highlight on case-study pages.

---

## Accessibility

- Skip link as the first focusable element; visible focus rings throughout.
- Semantic landmarks, exactly one `<h1>` per page, `aria-current="page"` on the active nav item.
- The mobile menu is a real `<button>` with `aria-expanded`, operable by keyboard, closed by Escape.
- Every diagram is `role="img"` with a `<title>` and a `<desc>` summarising it, rather than a
  wall of disconnected labels.
- `prefers-reduced-motion` honoured.
- Body text contrast is roughly 16:1; the dimmest text in use stays above 4.5:1. The accent
  colour is never used for body copy on a dark surface, which is where this palette would
  otherwise fail WCAG AA.

---

## SEO

- Per-page `<title>` and meta description, all within displayed lengths.
- Canonical URL on every page. **Set `baseUrl` in `src/data/site.js` before deploying** —
  an incorrect value is the most common cause of duplicate-content problems.
- Open Graph and Twitter card tags with a real 1200×630 PNG.
- JSON-LD: `Person` sitewide, plus `CreativeWork` and `BreadcrumbList` on case studies,
  `CollectionPage`, `AboutPage`, `ContactPage` and `ItemList` where appropriate.
- Generated `sitemap.xml` and `robots.txt`.

---

## The CV

Three formats, one source (`src/data/cv.js`):

| Format | Where | Use |
|---|---|---|
| Web page | `/cv/` | Linked from the site |
| `.docx` | `public/assets/docs/` | **ATS primary** — single column, standard headings, no tables, text boxes, columns or graphics |
| `.md` | `public/assets/docs/` | Plain text for forms that want pasted content |

**PDF:** open `/cv/` in a browser and use Print → Save as PDF. The print stylesheet renders it
single-column, black on white, with navigation and decoration removed. This is deliberately not
generated by a script: converting `.docx` to PDF needs Word or LibreOffice, neither of which is
guaranteed on this machine, and a hand-rolled PDF writer would not beat what the browser does.

The `.docx` is written directly as WordprocessingML and zipped with Node's built-in `zlib`, so
it contains exactly the markup in `tools/make-cv.js` — verified to contain 0 tables, 0 text
boxes, 0 drawings and 0 column definitions, which are the structures applicant tracking systems
most reliably mangle.

---

## Editorial rules this project follows

These are enforced by review, not by code, and they are the reason the site is worth anything:

1. **No fabricated evidence.** No invented screenshots, user numbers, revenue or performance
   figures anywhere.
2. **No completed-feature claims for unfinished work.** Every case study carries a rendered
   "not built, or not proven" list.
3. **No trading performance claims.** The Apex case study contains no return, win-rate or
   profit figure, because those figures are simulated and the product is sold commercially.
4. **No unverified credential claims.** CS50 AI with Python is marked in progress everywhere
   and is excluded from the CV's Education section entirely.
5. **No skill claimed that cannot be demonstrated.** AWS, Kubernetes, Docker and model training
   appear only on the roadmap, never in the skills list.
6. **Stated limits stay stated.** Approved as a standing constraint on 7 November 2026. The
   AI-assisted working method, the absence of commercial employment history and team
   experience, and every case study's "not built, or not proven" list are not draft hedges to
   be tidied away later. If the positioning changes it changes deliberately and in all three
   places at once — site, CV and LinkedIn pack — because its value depends on them agreeing.

---

## Before you deploy

Read `private/QUESTIONS.md` first, then follow `docs/DEPLOYMENT.md`.

**Nothing in `private/` is committed.** Those files contain job-application drafts, internal
notes and server credentials, and this repository is public. They exist on disk only, so back
them up separately — they are not protected by having pushed this repo.
