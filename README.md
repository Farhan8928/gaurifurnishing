# Gouri Mattresses & Furnishing — website

Marketing site for a furnishing shop and workshop in Vartak Nagar, Thane (W).
Vite + React + Tailwind, deployed as static files.

- **[DESIGN.md](DESIGN.md)** — **read this before touching any layout.** The
  palette, type, shape and motion rules, and why each was chosen. The first
  version of this site looked machine-made; this file is what stops it drifting
  back.
- **[SEO-PLAN.md](SEO-PLAN.md)** — what is built in, what still has to be done
  off-site, and **five things to confirm with the client before launch**.
- **[CALLS-PLAYBOOK.md](CALLS-PLAYBOOK.md)** — the weekly routine and copy-paste
  WhatsApp / review templates for turning traffic into enquiries.

## Commands

```bash
npm install
npm run dev             # local dev server on :5174 — homepage only, see below
npm run images          # re-render the photo set after editing the manifest
npm run brand           # regenerate favicon, PWA icons and the OG share card
npm run build           # vite build → generate 114 pages → prerender → SEO audit
npm run preview         # serve dist/ locally — this is how to see everything
npm run seo-audit       # re-run the SEO audit against an existing dist/
npm run css-audit       # catch Tailwind classes that compile to nothing
npm run brand-audit     # catch favicon/icons/manifest drifting off-palette
npm run viewport-audit  # check every CTA is above the fold on real screen sizes
```

`npm run build` fails if the SEO audit fails. That is deliberate — see
`scripts/final-seo-audit.mjs` for what it checks.

> ### ⚠️ `npm run dev` only serves the homepage
>
> The 114 landing pages are generated at **build** time, so the dev server does
> not have them. Vite falls back to `index.html` for any unknown path, which
> means visiting `localhost:5174/curtains-hiranandani-estate/` silently shows
> you the **homepage** — it looks like the landing page is broken or ignoring
> its content, when in fact it does not exist yet in that context.
>
> To see the real thing:
>
> ```bash
> npm run build && npm run preview
> ```
>
> Prerendering only happens at build time too, so `dev` is also not
> representative of what a crawler receives.

## Where things live

```
src/data/site.js            ← every business fact: NAP, hours, geo, domain.
                              Change details HERE and nowhere else.
src/data/services.js        ← the six services and the 18 areas. The slugs
                              drive the generated URLs — treat as permanent
                              once the site is indexed.
src/data/faqs.js            ← FAQ copy, mirrored into the FAQPage JSON-LD in
                              index.html. Keep the two in sync.
src/data/gallery.gen.js     ← GENERATED. Do not edit.

DESIGN.md                   ← palette, type, shape, motion. Read before
                              changing any layout.
src/data/brand.js           ← the palette hexes, imported by BOTH
                              tailwind.config.js and the brand-asset
                              generator so they cannot drift apart.

scripts/image-manifest.mjs  ← which client photos are used, their SEO filenames
                              and alt text. The one file to edit when new
                              photos arrive.
scripts/process-images.mjs  ← renders 3 WebP sizes per photo + gallery.gen.js
scripts/seo-pages.mjs       ← the landing-page templates and per-area copy
scripts/generate-pages.mjs  ← writes them into dist/ + sitemap.xml
scripts/prerender.mjs       ← bakes the rendered React markup into dist/index.html
scripts/final-seo-audit.mjs ← the build gate
scripts/make-brand-assets.mjs ← favicon.svg + icons + og-image.jpg
scripts/css-audit.mjs       ← fails the build on classes that compile to nothing
scripts/brand-audit.mjs     ← fails the build if brand assets go off-palette

client-images/              ← the originals from the client, untouched
```

## Adding new photos

1. Drop the originals into `client-images/`.
2. Add an entry to `IMAGES` in `scripts/image-manifest.mjs` — source filename,
   an SEO-friendly `name`, a `category`, and honest descriptive `alt` text.
3. `npm run images`
4. `npm run build`

Four of the client's original photos are deliberately **excluded** and must not
be re-added — two carry other companies' watermarks (Livspace, Carve Style), one
is a screenshot of a chat, and one was shot in an unrelated retail showroom. The
reasons are documented at the top of `scripts/image-manifest.mjs`.

## Three things not to undo

- **No `aggregateRating` in the schema.** The shop has no verified Google rating
  yet. Publishing one is a structured-data violation that can strip the whole
  domain of rich results. The audit warns if it ever appears. See SEO-PLAN § A.
- **No `import * as Icons from 'lucide-react'`.** It defeats tree-shaking and
  pulls all ~1,500 icons into the bundle — it was 700 kB of the first build.
  Import the handful of functional icons by name, as the components do now.
- **No decorative icons, no blurred colour orbs, no three-card grids, no
  scroll-reveal on every section.** These are the specific patterns that made
  the first version read as generated. DESIGN.md explains each one.

## Deploying

Configured for Vercel (`vercel.json`): static output from `dist/`, trailing
slashes, `www` → apex redirect, long cache headers on `/images/`, security
headers. Any static host works; the redirect and header rules would need
re-expressing.

Before the first deploy, set the real domain in `src/data/site.js` (`SITE_URL`),
`public/robots.txt` and `vercel.json` — currently `https://gourifurnishing.com`.
