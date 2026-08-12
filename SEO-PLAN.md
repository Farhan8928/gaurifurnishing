# Gouri Mattresses & Furnishing — SEO / GEO / AEO Plan

**Goal:** when someone in Thane searches *"curtains near me"*, *"sofa repair Thane"*,
*"sofa cum bed"*, *"blinds Thane"*, *"gadda banane wala"*, or asks an AI assistant
where to get curtains made in Thane — **this shop's Google Business Profile and
website (gourifurnishing.com) come up.**

There are two halves: **(A)** what is already built into the website, and **(B)** the
off-site work that still has to happen. Local ranking is roughly 50% Google
Business Profile + reviews, so **Section B matters as much as the site does.**

> 🎯 Chasing a specific number of enquiries? See **[CALLS-PLAYBOOK.md](CALLS-PLAYBOOK.md)** —
> the week-by-week operating manual, with copy-paste WhatsApp and review templates.

---

## ⚠️ Read this first — five things to confirm before launch

These are the only places where the site currently states something we were not
told. Each one is a single-line fix, and each one matters, because Google
cross-checks the website against the Google Business Profile and a mismatch
quietly costs ranking.

| # | What | Where to fix | Why it matters |
|---|---|---|---|
| 1 | **Opening hours** — the site says *7 days, 10:00 am – 9:00 pm* | `src/data/site.js` → `CONTACT.hours` and `hoursSpec` | If wrong, Google shows "Open now" when the shutter is down. Costs walk-ins and trust. |
| 2 | **Map coordinates** — currently the Pokhran Road No. 1 area, not the verified pin | `src/data/site.js` → `CONTACT.geo` | Must match the Google Business Profile pin exactly or the local pack weakens. |
| 3 | **Domain** — everything is hard-coded to `https://gourifurnishing.com` | `src/data/site.js` → `SITE_URL`, plus `public/robots.txt` and `vercel.json` | Canonical, sitemap, JSON-LD and OG tags all derive from it. |
| 4 | **Years in business / jobs done** | `src/data/site.js` → `TRUST_STATS` | Deliberately left out rather than guessed. Real numbers convert better than adjectives — get them from Firoz. |
| 5 | **Google rating** | `src/data/site.js` → `RATING.showRating` | Currently `false`, and there is **no `aggregateRating` in the schema**. See the warning below. |

> **On the star rating — do not shortcut this.** It is tempting to put "4.8★ from
> 120 reviews" in the schema before the reviews exist. Google treats a rating in
> structured data that is not visible and verifiable on the page as a violation,
> and it can trigger a manual action that removes *all* rich results for the
> domain. The build's SEO audit warns if `aggregateRating` ever appears. Turn it
> on once the Google Business Profile has real reviews, and make the numbers match
> the profile exactly.

---

## A. Already done on the website ✅

**Technical foundation**
- Canonical set to `https://gourifurnishing.com/`, `www` → apex redirect in `vercel.json`.
- **Prerendered homepage** — the React app's rendered markup is baked into
  `dist/index.html` at build time, so Bing, the AI crawlers and WhatsApp's link
  preview fetcher see real content on the first request instead of an empty `<div>`.
- **114 generated landing pages** (see § E) with their own titles, descriptions,
  schema, photographs and internal links.
- `sitemap.xml` (115 URLs) regenerated on every build; `robots.txt` allows Google
  **and** the AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended,
  Applebot-Extended, OAI-SearchBot…) so answer engines can cite the shop.
- `llms.txt` — a plain-text brief written for AI assistants, including an explicit
  note *not* to attribute a star rating to the business.
- **Build-time SEO audit** (`scripts/final-seo-audit.mjs`) fails the build on a
  missing canonical, a broken JSON-LD block, an `<img>` without alt text, more than
  one `<h1>`, a phone number that has drifted out of sync, or a sitemap URL with no
  corresponding page.

**Structured data (schema.org JSON-LD)**
- `HomeGoodsStore` + `FurnitureStore` — full NAP, geo, opening hours, founder,
  payment methods, 18 `areaServed` places, 29 `knowsAbout` terms (including Hindi
  and Marathi), and a six-item `hasOfferCatalog`.
- `FAQPage` — 9 Q&As, feeding "People also ask", AI Overviews and voice answers.
- `WebSite` entity.
- Per-landing-page: `Service` + `BreadcrumbList` + `FAQPage`.

**Content & performance**
- **59 real photographs** of the shop's own work, categorised and captioned with
  descriptive alt text — this is the single biggest asset the business has, and
  Google Images is a real traffic source for furnishing searches.
- Every photo rendered at three widths as WebP with `srcset` and intrinsic
  `width`/`height`, so there is no layout shift and phones never download the
  1600px file.
- **JS bundle 203 kB / 63 kB gzipped.** (The first build was 1,081 kB — an
  `import * as Icons` was pulling in all ~1,500 lucide icons, and framer-motion was
  costing ~100 kB gzipped for one fade. Both were removed. If either creeps back
  in, the bundle will quadruple.)
- Multilingual keyword coverage: English, Hinglish, Hindi and Marathi in the meta
  keywords, the JSON-LD, and a `<noscript>` fallback carrying the full NAP in all three.

---

## B. Off-site — do these after launch, highest impact first

### 1. Google Business Profile — the #1 local ranking asset
**Nothing on this list is optional. The GBP will out-rank the website for
"near me" searches, and the two reinforce each other.**

- [ ] **Create / claim** the profile at business.google.com and verify it.
- [ ] **Name:** exactly `Gouri Mattresses & Furnishing` — matching the signboard and
      the website. Do **not** stuff keywords into the name; it is against Google's
      rules and risks suspension. Keywords belong in the *description*.
- [ ] **Primary category:** *Curtain shop*. Secondary: *Furniture store*,
      *Upholstery shop*, *Mattress store*, *Blinds shop*.
- [ ] **NAP must match the website character for character**, including the
      landmarks: *Gala No. 1-2, Pokhran Road No. 1, Near Mane H.P. Gas Godown &
      Thirani School, Vartak Nagar, Thane (W) 400606*.
- [ ] Add all six **services** with short descriptions (copy them from the site).
- [ ] Set the **service area**: Vartak Nagar, Pokhran Road, Naupada, Panch Pakhadi,
      Majiwada, Louiswadi, Wagle Estate, Kopri, Kolshet, Manpada, Hiranandani
      Estate, Ghodbunder Road, Kasarvadavali, Mulund, Bhandup.
- [ ] **Upload the photos.** You already have 59 — start with the shop front, then
      10–15 of the best work, and add 3 more every month. Profiles with recent
      photos measurably out-perform ones without.
- [ ] Add the **website link**, and turn on **messaging / WhatsApp**.
- [ ] Add a **Hindi/Marathi line to the description**, e.g.
      *"पडदे, ब्लाइंड्स, सोफा दुरुस्ती, गाद्या — मापाप्रमाणे. घरी मोफत मापन."*
- [ ] Fill the profile **Q&A** with the same nine FAQs as the website.
- [ ] Post a **Google Post** weekly — a finished job, an offer, a tip. Free reach.

### 2. Reviews — the strongest trust *and* ranking signal
- [ ] Ask **every** happy customer. Aim for 4–8 new reviews a month; steady beats bursts.
- [ ] Make it one tap: get the short review link from GBP → "Ask for reviews", put it
      in a WhatsApp template and on a **QR sticker at the shop counter**.
- [ ] **Reply to every review**, positive and negative. Google rewards owner responses.
- [ ] Encourage reviewers to mention **the service and the area** naturally —
      *"got curtains made for our flat in Majiwada"* ranks the shop for that phrase.
- [ ] Some reviews **in Hindi or Marathi** — these rank you for Devanagari searches
      that meta tags cannot touch.

### 3. Local citations / directories (NAP consistency)
List with the **identical** name, address, phone and website. Consistency across
the web is what makes Google — and AI assistants — trust the data.
- [ ] Justdial, Sulekha, IndiaMART, AskLaila, TradeIndia
- [ ] Bing Places, Apple Business Connect
- [ ] Facebook Page + Instagram — link the site, post finished jobs
- [ ] UrbanClap/Urban Company and local Thane directories

### 4. Search Console + indexing (one-time, technical)
- [ ] Add the domain to **Google Search Console** and verify it.
- [ ] Submit `https://gourifurnishing.com/sitemap.xml`.
- [ ] "Request Indexing" on the homepage and the six `/…-thane/` service hubs.
- [ ] Add to **Bing Webmaster Tools** (Bing also powers some ChatGPT search results).
- [ ] Run the homepage through Google's **Rich Results Test** and the **Schema
      Validator** — confirm `HomeGoodsStore` and `FAQPage` show as eligible.

---

## C. Target keywords

**Primary:** curtains in Thane · blinds in Thane · sofa repair Thane · sofa cum bed
Thane · mattress shop Thane · curtain shop near me

**Problem-based:** sofa seat sagging · old sofa repair · curtain stitching near me ·
custom size mattress · blackout curtains for bedroom · sofa cover stitching

**Product:** zebra blinds · roller blinds · roman blinds · printed blinds ·
pinch pleat curtains · L shape sofa · upholstered headboard · coir mattress

**Local:** curtains in Naupada / Majiwada / Ghodbunder Road / Hiranandani Estate /
Wagle Estate / Kolshet …and 12 more — each has its own generated page.

### C2. Multilingual — how locals actually search
Most customers type **Hinglish** (*"curtain wala near me"*, *"sofa theek karne
wala"*, *"gadda banane wala"*), some **Hindi** (पर्दे, सोफा रिपेयरिंग, गद्दा) and
some **Marathi** (पडदे, सोफा दुरुस्ती, गादी).

All of these are already in the site's meta keywords, JSON-LD `knowsAbout` and the
`<noscript>` block. **But Google ranks these mainly through the Business Profile,
not meta tags** — so the wins come from the GBP description and from reviews
written in those languages (§ B1 and § B2).

> Do **not** paste Devanagari keyword walls into the visible page. Google penalises
> it. Keep the visible site clean; the schema, the GBP and the reviews carry the
> multilingual weight.

---

## D. Monthly rhythm — about 20 minutes a week

1. Ask 4–8 customers for a Google review. Reply to every review that arrives.
2. Post one Google Post (a finished job photo works best).
3. Add 2–3 new photos to the GBP — and drop the originals into `client-images/`,
   add them to `scripts/image-manifest.mjs`, and run `npm run images` to get them
   onto the website too.
4. Check Search Console for new queries. Whatever people are actually typing is
   the next page worth writing.

---

## E. On the 114 generated landing pages — a caveat worth understanding

The build generates six service hubs (`/curtains-thane/`, `/sofa-repair-thane/` …)
plus a 6 × 18 service-by-area grid (`/curtains-naupada/`, `/blinds-majiwada/` …).

This works, and it is how the long tail gets captured. **But it only works while
each page is genuinely useful.** Google's term for mass-produced, near-identical
location pages is *doorway pages*, and it demotes them. The generator therefore
gives every page:

- an **area-specific paragraph** a local would recognise as accurate
  (`AREA_NOTES` in `scripts/seo-pages.mjs`),
- a **service-specific "how we approach it"** section,
- **its own rotated photograph selection** and **its own FAQ ordering**,
- and unique title, description and breadcrumbs.

**If Search Console later shows the area pages getting impressions but no clicks,
or flags them as "Crawled – currently not indexed", prune them.** Cut the
`near: false` areas in `src/data/services.js` first — those are the far-flung ones
(Kasarvadavali, Waghbil, Bhandup) where the shop has the least genuine claim. Nine
strong pages beat 108 thin ones, every time.

### Content worth adding later (each targets a real keyword cluster)
- *"How much do made-to-measure curtains cost in Thane?"* — a genuine price-range
  guide, once Firoz is comfortable publishing ranges. This is the single most
  searched question in the category and nobody local answers it well.
- *"Repair or replace? How to tell if your sofa is worth re-upholstering"*
- *"Zebra vs roller vs Roman blinds — which suits which room"*
- A **before/after** page for sofa re-upholstery. The shop already has the
  sofa-cum-bed open/closed pairs; before/after shots of a *worn* sofa next to the
  finished one would be the most persuasive content on the whole site.
