import { esc, prose, list, when, section } from '../lib/html.js';
import cv from '../data/cv.js';
import profile from '../data/profile.js';

/**
 * CV page.
 *
 * Rendered from the same data as the downloadable .docx, so the two can never drift apart.
 * Carries a print stylesheet, so "Print → Save as PDF" in any browser produces a clean,
 * single-column, ATS-safe PDF without me needing Word or LibreOffice on the machine.
 */
export default function cvPage() {
  const role = (r) => `
  <article class="cv-role">
    <div class="cv-role-head">
      <h3>${esc(r.title)}</h3>
      <p class="cv-dates">${esc(r.from)} – ${esc(r.to)}</p>
    </div>
    <p class="cv-org">${esc(r.org)} · ${esc(r.location)}</p>
    <p class="cv-context">${esc(r.context)}</p>
    <ul class="cv-bullets">
      ${list(r.bullets, (b) => `<li>${esc(b)}</li>`)}
    </ul>
  </article>`;

  const content = `
<section class="page-head cv-head no-print">
  <div class="wrap">
    <p class="eyebrow">Curriculum vitae</p>
    <h1>${esc(cv.name)}</h1>
    <p class="page-lead">${esc(cv.headline)}</p>
    <div class="cv-actions">
      <a class="btn btn--primary" href="/assets/docs/${esc(profile.cv.pdfName)}" download>Download PDF</a>
      <a class="btn btn--ghost" href="/assets/docs/${esc(profile.cv.fileName)}" download>Download .docx</a>
      <a class="btn btn--quiet" href="/assets/docs/${esc(profile.cv.mdName)}" download>Plain text</a>
      <button class="btn btn--quiet" type="button" data-print>Print this page</button>
    </div>
    <div class="head-note">
      <p>
        <strong>ATS notes.</strong> Both the PDF and the .docx are single-column with standard section
        headings and no tables, text boxes, columns or graphics — the four things applicant tracking
        systems most often mangle. The PDF is generated as real text rather than an image, so a
        parser extracts it exactly as you would by selecting it. Every role is labelled
        independent or self-employed; there is no invented employer. CS50 AI with Python is excluded from Education because its completion is
        unverified, and appears only under continuing development, marked in progress.
      </p>
    </div>
  </div>
</section>

<div class="wrap">
  <article class="cv-doc">
    <header class="cv-doc-head">
      <h2 class="cv-name">${esc(cv.name)}</h2>
      <p class="cv-headline">${esc(cv.headline)}</p>
      <p class="cv-contact">${list(cv.contactLine, (c) => `<span>${esc(c)}</span>`)}</p>
      <p class="cv-avail">${esc(cv.availability)}</p>
    </header>

    <section class="cv-sec">
      <h2>Professional Summary</h2>
      <div class="cv-prose">${prose(cv.summary)}</div>
    </section>

    <section class="cv-sec">
      <h2>Professional Experience</h2>
      <p class="cv-note">
        All roles below are independent and self-employed. I have no commercial employment history
        in software, and this CV does not imply otherwise.
      </p>
      ${list(cv.experience, role)}
    </section>

    <section class="cv-sec">
      <h2>Education</h2>
      <ul class="cv-edu">
        ${list(
          cv.education,
          (e) => `
        <li>
          <p class="cv-edu-q">${esc(e.qualification)}</p>
          <p class="cv-edu-i">${esc(e.institution)} · ${esc(e.location)} · ${esc(e.date)}</p>
          ${when(e.detail, () => `<p class="cv-edu-d">${esc(e.detail)}</p>`)}
        </li>`,
        )}
      </ul>
    </section>

    <section class="cv-sec">
      <h2>Continuing Professional Development</h2>
      <ul class="cv-edu">
        ${list(
          cv.development,
          (d) => `
        <li>
          <p class="cv-edu-q">${esc(d.item)}</p>
          <p class="cv-edu-i">${esc(d.date)}</p>
          <p class="cv-edu-d">${esc(d.status)}</p>
        </li>`,
        )}
      </ul>
    </section>

    <section class="cv-sec">
      <h2>Skills</h2>
      <dl class="cv-skills">
        ${list(
          cv.skillGroups,
          (g) => `
        <div>
          <dt>${esc(g.group)}</dt>
          <dd>${esc(g.items)}</dd>
        </div>`,
        )}
      </dl>
    </section>

    <section class="cv-sec">
      <h2>Statement on Working Method</h2>
      <div class="cv-prose">${prose(cv.statement)}</div>
    </section>

    <section class="cv-sec">
      <h2>References</h2>
      <p>${esc(cv.referees)}</p>
    </section>

    <footer class="cv-foot">
      <p>${esc(profile.contact.email)} · ${esc(profile.contact.linkedinLabel)} · ${esc(
        profile.location.city,
      )}, ${esc(profile.location.country)}</p>
    </footer>
  </article>
</div>

<section class="cta no-print">
  <div class="wrap cta-in">
    <h2>The case studies are the evidence behind this CV.</h2>
    <p>Every claim above points at a system described in full, including what is not finished.</p>
    <div class="cta-actions">
      <a class="btn btn--primary" href="/projects/">Read the case studies</a>
      <a class="btn btn--ghost" href="/contact/">Get in touch</a>
    </div>
  </div>
</section>`;

  return {
    path: '/cv/',
    title: 'Curriculum vitae',
    description:
      'ATS-compatible CV: independent AI product development, evaluation discipline and an ' +
      'IT support qualification. Download as .docx or plain text.',
    content,
  };
}
