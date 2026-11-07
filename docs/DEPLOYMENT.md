# Deployment

The build output is plain static files. There is no server runtime, no database and no build
step at the host, so this deploys anywhere that can serve a folder.

---

## Before every deploy

```bash
npm run cv        # regenerate the CV if src/data/cv.js changed
npm run build     # writes ./dist
npm run check     # must pass with 0 errors
```

**Set the real domain first.** Edit `baseUrl` in `src/data/site.js`, or pass it at build time:

```bash
SITE_URL=https://your-domain.com npm run build
```

`baseUrl` generates every canonical URL, the sitemap and the Open Graph tags. The build prints
a warning while the placeholder is still in place. Deploying with the wrong value is the single
most common cause of a new site being indexed badly.

---

## Option 1 — GitHub Pages via the included workflow (fastest route to a public URL)

`.github/workflows/deploy.yml` builds, verifies and publishes on every push to `main`. The
build is gated on `check.js`, so a broken link or a missing `<h1>` fails the deploy and the
previous version stays live.

1. Create the repository and push (see the project README).
2. Repository → **Settings → Pages → Source: GitHub Actions**.
3. Repository → **Settings → Secrets and variables → Actions → Variables** → add `SITE_URL`:
   - repo named `<username>.github.io` → `https://<username>.github.io`
   - any other repo name → `https://<username>.github.io/<repo-name>`
   - custom domain → `https://your-domain.com`
4. Push to `main`. The Actions tab shows the build, the verification step and the deploy.

**Why `SITE_URL` matters for a project repo.** A project site is served from a subpath, and
every internal link on this site is root-relative. The build derives a base path from
`SITE_URL`'s own path and prefixes every internal link automatically — so set it correctly and
everything follows. Set it wrongly and you get an unstyled page, which is the classic symptom.

No dependencies are installed in CI, because the project has none.

---

## Option 2 — Hostinger (the hosting you already pay for)

You already run eight domains on this host, so this costs nothing extra and keeps everything in
one place.

**Via SSH** (fastest, and matches how you already deploy).

> Your actual SSH user, host, port and key filename are deliberately **not** written in this
> file, because this repository is public. Keep them in `private/DEPLOY-SECRETS.md`, which is
> gitignored, or in your password manager. Substitute them below.

```bash
rsync -avz --delete dist/ USER@HOST:~/domains/YOURDOMAIN/public_html/ -e "ssh -p PORT -i ~/.ssh/YOUR_KEY"
```

If `rsync` is unavailable, `scp -r -P PORT dist/* USER@HOST:~/domains/YOURDOMAIN/public_html/`
works too.

**Two things specific to this host, from your own records:**

1. **The SSH connection drops frequently.** Run the command again if it fails partway; the
   output is just files, so a repeat is safe.
2. **Uploaded assets are edge-cached by the CDN for seven days and there is no purge over SSH.**
   If you replace `og.png` or the CV later and the old version keeps being served, upload it
   under a new filename and update the reference, rather than overwriting in place. HTML is not
   affected.

**Via hPanel:** zip the *contents* of `dist/` (not the folder itself) and extract into
`public_html`.

**Add this `.htaccess`** in `public_html` so the 404 page and clean URLs work properly:

```apache
ErrorDocument 404 /404.html

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

Caching CSS and JS for a year is safe here because a redeploy rewrites the whole folder; if you
ever see a stale stylesheet, hard-refresh once.

---

## Option 3 — Cloudflare Pages (recommended if you want it separate from MCP Labs)

Free, fast globally, free TLS, and it builds from a repository so deploying becomes `git push`.

1. Push this repository to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → connect the repository.
3. Build command: `npm run build` · Output directory: `dist`
4. Environment variable: `SITE_URL = https://your-domain.com`

Add `_redirects` to `public/` if you want custom redirects; Cloudflare serves `404.html`
automatically.

---

## Option 4 — Netlify

Same shape as Cloudflare. Build command `npm run build`, publish directory `dist`, environment
variable `SITE_URL`. `404.html` is picked up automatically.

Or drag the `dist` folder onto the Netlify dashboard for an instant deploy with no repository.

---

## Option 5 — GitHub Pages, manually

Only if you do not want the workflow in Option 1. Subpath serving is handled automatically as
long as `SITE_URL` is set correctly when you build — see Option 1.

---

## After the first deploy

1. **Check the live site** — load the home page, one case study, and the CV page. Confirm the
   CSS loaded (if the page is unstyled, the asset paths are wrong, which means a subpath
   deployment).
2. **Download the CV from the live site** and open it, to confirm it survived the upload.
3. **Verify the share card** — paste the URL into LinkedIn's post composer. It should show the
   dark card with your name. LinkedIn caches aggressively; use the Post Inspector to refresh it.
4. **Submit the sitemap** — Google Search Console → add property → submit
   `https://your-domain.com/sitemap.xml`. This is the only way Google finds a brand-new site
   quickly; there is no sitemap-ping any more.
5. **Bing/Yandex** — you already have an IndexNow key on the MCP Labs host. If this site is on a
   different domain it needs its own key file; otherwise just submit through Bing Webmaster
   Tools.
6. **Update your LinkedIn profile** with the URL in the Website field and in the About section
   (copy is ready in `private/LINKEDIN.md`).

---

## Updating the site later

```bash
# edit a file in src/data/
npm run build && npm run check
# then redeploy by whichever method above
```

Because all content lives in `src/data/`, routine updates — a new project, a roadmap step
moving to complete, a changed job target — never require touching templates or CSS.

---

## A note on the CV and PDFs

The `.docx` and `.md` are generated into `public/assets/docs/` and ship with the site.

For a PDF, open `/cv/` on the live site and use **Print → Save as PDF**. The print stylesheet
renders it single-column, black on white, with navigation, buttons and decoration removed. Save
it as `Tshivhidzo-Mbedzi-CV.pdf`.

If you want the PDF downloadable from the site too, drop it into `public/assets/docs/` and add a
link on the CV page; `profile.cv.pdfName` is already defined for it.
