/**
 * Builds the static landing pages that sit alongside the single-page app.
 *
 * Two page types come out of here:
 *
 *   /<service>-thane/   six service hubs — the head terms
 *                       ("curtains in Thane", "sofa repair in Thane")
 *   /<service>-<area>/  the service × area grid — the long tail
 *                       ("curtains in Naupada", "sofa repair in Majiwada")
 *
 * A word of caution that belongs next to the code rather than buried in a doc:
 * a grid like this only works if each page is genuinely useful. Google calls
 * mass-produced near-identical location pages "doorway pages" and demotes
 * them. So every page below gets area-specific opening copy, an area-specific
 * angle paragraph, its own photograph selection, and its own FAQ ordering —
 * and if the shop later wants to prune, the near:false areas are the ones to
 * cut first. See SEO-PLAN.md § E.
 */
import { SERVICES, AREAS } from '../src/data/services.js'
import { FAQS } from '../src/data/faqs.js'
import { GALLERY } from '../src/data/gallery.gen.js'
import { CONTACT, SITE_URL } from '../src/data/site.js'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * A short, true, area-specific line for each locality.
 *
 * This is the main thing standing between a useful local page and a doorway
 * page: something a resident of that area would recognise as accurate.
 *
 * These must stay **service-neutral** — the same note is reused across all six
 * services, so a sentence about window drops would end up on the sofa repair
 * page talking about curtains. Anything service-specific belongs in
 * SERVICE_ANGLE instead.
 */
const AREA_NOTES = {
  'vartak-nagar':
    'Our shop is in Vartak Nagar, so this is effectively our home ground — most jobs here get measured the same day you call.',
  'pokhran-road':
    'We are on Pokhran Road No. 1 ourselves, near the Mane H.P. gas godown, so we are usually only a few minutes from your door.',
  'thane-west':
    'We cover the whole of Thane West from the Vartak Nagar workshop, from Naupada across to Ghodbunder Road.',
  naupada:
    'Naupada has a lot of older buildings, where nothing is quite a standard size — which is the sort of work we are set up for.',
  'panch-pakhadi':
    'Panch Pakhadi is a short run down from the shop, so we can usually fit a visit in on the same day you ask.',
  majiwada:
    'Majiwada is minutes from the workshop, so deliveries, fittings and pick-ups are all straightforward here.',
  louiswadi:
    'Louiswadi is close enough that we can come round the same evening you call, samples in hand.',
  'wagle-estate':
    'We work across the Wagle Estate residential blocks as well as the office and shop units there.',
  kopri:
    'Kopri is an easy run from Vartak Nagar, and its older flats are often better served by repairing what you have than replacing it.',
  balkum:
    'We work the Balkum belt regularly, in both the older buildings and the newer towers going up along it.',
  'kolshet-road':
    'The Kolshet Road high-rises are on our regular route, and their larger flats usually need something made rather than bought off a shelf.',
  manpada:
    'Manpada is well within our area, and we are there often enough that scheduling a visit is rarely a problem.',
  'hiranandani-estate':
    'Hiranandani Estate apartments are generously sized, and almost everything we make for them is cut to the specific room.',
  'ghodbunder-road':
    'We travel the length of Ghodbunder Road for measurement visits — tell us the building and we will plan the trip around it.',
  waghbil: 'Waghbil sits on our regular Ghodbunder run, so visits here are easy to schedule.',
  kasarvadavali:
    'Kasarvadavali is the far end of our usual route, and we are happy to make the trip for a measurement.',
  mulund:
    'Mulund is just over the border from Thane and well within the area we cover, for fittings and for pick-ups alike.',
  bhandup:
    'Bhandup is comfortably within our range — call and we will fix a visit at a time that suits you.',
}

/** Service-specific angles, so the same service reads differently per page. */
const SERVICE_ANGLE = {
  curtains:
    'Ready-made curtains are cut to standard drops, and almost no window in a Thane flat is a standard drop. We measure yours, add the correct allowance for the pleat and the hem, and stitch to that — which is why the fall looks right instead of pooling on the floor or stopping short of it.',
  blinds:
    'Choosing between zebra, roller and Roman comes down to how much light you want to keep and how the window is framed. We bring samples of all three so you can hold them up to the actual window before deciding, and we fit the bracket properly so the blind hangs square and does not bind.',
  'sofa-repair':
    'A sofa usually fails in one of three places: the webbing under the seat gives way, the foam collapses, or the frame joint loosens. All three are fixable, and all three are cheaper to fix than to replace — we open it up, tell you exactly what has gone, and quote before touching anything else.',
  'sofa-cum-bed':
    'A sofa cum bed has to work as both, which means the mechanism and the foam density matter more than the fabric. We build the frame to your room dimension, fit a mechanism that will still slide in five years, and use seat foam firm enough to sleep on.',
  mattress:
    'Coir gives you a firm mattress that holds its shape, cotton a softer one that can be re-filled later, and foam something in between. We cut any of them to your exact size, which matters for diwans, storage beds and window seats where nothing standard fits.',
  headboard:
    'A headboard is the one piece of upholstery people look at every day, so the panel layout and the fabric matter more than on a sofa. We build the board, upholster it, and mount it to the wall — full wall width if you want it, not just bed width.',
}

/** Picks photographs relevant to a service, rotated so each area page differs. */
function photosFor(service, offset = 0) {
  const catMap = {
    curtains: ['curtains'],
    blinds: ['blinds'],
    'sofa-repair': ['sofas', 'sofa-cum-bed'],
    'sofa-cum-bed': ['sofa-cum-bed', 'sofas'],
    mattress: ['headboards'],
    headboard: ['headboards', 'wallpaper'],
  }
  const pool = GALLERY.filter((g) => catMap[service.slug].includes(g.category))
  if (!pool.length) return []
  return Array.from({ length: Math.min(6, pool.length) }, (_, i) => pool[(offset + i) % pool.length])
}

/** Rotates the FAQ order per page so no two pages carry the identical block. */
function faqsFor(offset) {
  const picked = Array.from({ length: 5 }, (_, i) => FAQS[(offset + i) % FAQS.length])
  // The "where is the shop" answer is useful on every page — pin it last.
  const shopFaq = FAQS[FAQS.length - 1]
  return picked.includes(shopFaq) ? picked : [...picked.slice(0, 4), shopFaq]
}

const SHARED_HEAD = (title, description, canonical, keywords) => `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="keywords" content="${esc(keywords)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${canonical}" />
    <meta http-equiv="content-language" content="en-IN" />
    <link rel="alternate" hreflang="en-IN" href="${canonical}" />
    <meta name="geo.region" content="IN-MH" />
    <meta name="geo.placename" content="Thane West, Maharashtra" />
    <meta name="geo.position" content="${CONTACT.geo.lat};${CONTACT.geo.lng}" />
    <meta name="ICBM" content="${CONTACT.geo.lat}, ${CONTACT.geo.lng}" />
    <meta name="theme-color" content="#faf6ef" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Gouri Mattresses &amp; Furnishing" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${SITE_URL}/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />`

/**
 * Self-contained CSS. These pages deliberately do not load the app bundle:
 * they are leaf pages a searcher lands on, and inline CSS with no JavaScript
 * means they render essentially instantly on a phone on mobile data.
 */
const PAGE_CSS = `
    <style>
      *,*::before,*::after{box-sizing:border-box}
      body{margin:0;background:#faf6ef;color:#1c1917;font-family:Inter,system-ui,sans-serif;line-height:1.65;-webkit-font-smoothing:antialiased}
      a{color:#0f5f5c}
      .wrap{max-width:64rem;margin:0 auto;padding:0 1.25rem}
      header.bar{position:sticky;top:0;z-index:20;background:rgba(250,246,239,.92);backdrop-filter:blur(8px);border-bottom:1px solid rgba(28,25,23,.1)}
      header.bar .wrap{display:flex;align-items:center;justify-content:space-between;gap:1rem;height:4.25rem}
      .brand{font-family:Fraunces,Georgia,serif;font-weight:700;font-size:1.2rem;text-decoration:none;color:#1c1917}
      .brand span{display:block;font-family:Inter,sans-serif;font-size:.6rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#0f5f5c}
      .btn{display:inline-flex;align-items:center;gap:.5rem;border-radius:999px;padding:.8rem 1.4rem;font-size:.875rem;font-weight:600;text-decoration:none;white-space:nowrap}
      .btn-teal{background:#0f5f5c;color:#faf6ef}
      .btn-wa{background:#1fb658;color:#fff}
      .btn-ghost{border:1px solid rgba(28,25,23,.18);color:#1c1917}
      nav.crumbs{font-size:.8rem;color:#7a7269;padding:1.5rem 0 0}
      nav.crumbs a{color:#7a7269}
      h1{font-family:Fraunces,Georgia,serif;font-size:clamp(2rem,5.5vw,3.1rem);line-height:1.1;letter-spacing:-.02em;margin:1rem 0 0;text-wrap:balance}
      h2{font-family:Fraunces,Georgia,serif;font-size:clamp(1.4rem,3.4vw,2rem);line-height:1.2;margin:3rem 0 .75rem;text-wrap:balance}
      h3{font-family:Fraunces,Georgia,serif;font-size:1.1rem;margin:0 0 .35rem}
      p{color:#4a443d;text-wrap:pretty}
      .lede{font-size:1.1rem;margin-top:1.25rem}
      .cta-row{display:flex;flex-wrap:wrap;gap:.75rem;margin:2rem 0}
      ul.ticks{list-style:none;padding:0;margin:1.5rem 0;display:grid;gap:.6rem}
      ul.ticks li{padding-left:1.7rem;position:relative;color:#4a443d}
      ul.ticks li::before{content:"";position:absolute;left:0;top:.62em;width:.55rem;height:.55rem;border-radius:999px;background:#0f5f5c}
      .grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(min(100%,15rem),1fr));margin:1.75rem 0}
      .grid img{width:100%;height:100%;aspect-ratio:4/3;object-fit:cover;border-radius:.75rem;border:1px solid rgba(28,25,23,.1);display:block}
      .band{background:#0f5f5c;color:#faf6ef;padding:3rem 0;margin:4rem 0 0}
      .band h2{margin-top:0;color:#faf6ef}
      .band p{color:rgba(250,246,239,.75)}
      .card{border:1px solid rgba(28,25,23,.1);border-radius:1rem;padding:1.5rem;background:#faf6ef}
      details{border-top:1px solid rgba(28,25,23,.1);padding:1.1rem 0}
      details summary{cursor:pointer;font-family:Fraunces,Georgia,serif;font-weight:600;font-size:1.03rem;list-style:none}
      details summary::-webkit-details-marker{display:none}
      details summary::after{content:" +";color:#0f5f5c}
      details[open] summary::after{content:" –"}
      details p{margin:.7rem 0 0;font-size:.95rem}
      .links{display:flex;flex-wrap:wrap;gap:.5rem;margin:1.25rem 0 0;padding:0;list-style:none}
      .links a{display:inline-block;border:1px solid rgba(28,25,23,.15);border-radius:999px;padding:.45rem .95rem;font-size:.82rem;text-decoration:none;color:#4a443d;background:#faf6ef}
      footer{background:#1c1917;color:rgba(250,246,239,.7);margin-top:4rem;padding:3rem 0 6rem;font-size:.9rem}
      footer a{color:#e0c48a}
      .sticky{position:fixed;left:0;right:0;bottom:0;z-index:30;display:grid;grid-template-columns:1fr 1fr;gap:.5rem;padding:.6rem;background:rgba(250,246,239,.96);border-top:1px solid rgba(28,25,23,.1)}
      .sticky .btn{justify-content:center;flex:1}
      @media(min-width:768px){.sticky{display:none}footer{padding-bottom:3rem}}
    </style>`

const HEADER_HTML = `
    <header class="bar">
      <div class="wrap">
        <a class="brand" href="/">Gouri<span>Mattresses &amp; Furnishing</span></a>
        <a class="btn btn-teal" href="tel:+91${CONTACT.phones[0]}">Call 93265 44812</a>
      </div>
    </header>`

const footerHtml = (relatedLinks) => `
    <footer>
      <div class="wrap">
        <p style="font-family:Fraunces,Georgia,serif;font-size:1.25rem;color:#faf6ef;margin:0 0 .5rem">Gouri Mattresses &amp; Furnishing</p>
        <p style="margin:0 0 1.25rem">
          ${esc(CONTACT.address)}<br />
          Open 7 days, 10:00 am – 9:00 pm · Ask for ${esc(CONTACT.proprietor)}<br />
          <a href="tel:+91${CONTACT.phones[0]}">+91 93265 44812</a>
        </p>
        ${relatedLinks}
        <p style="margin:2rem 0 0;font-size:.8rem;color:rgba(250,246,239,.45)">
          © ${new Date().getFullYear()} Gouri Mattresses &amp; Furnishing, Vartak Nagar, Thane (W).
          All photographs are of our own work.
        </p>
      </div>
    </footer>
    <div class="sticky">
      <a class="btn btn-teal" href="tel:+91${CONTACT.phones[0]}">Call now</a>
      <a class="btn btn-wa" href="https://wa.me/${CONTACT.whatsapp}">WhatsApp</a>
    </div>`

const galleryHtml = (photos) =>
  photos.length
    ? `<div class="grid">${photos
        .map(
          (p) =>
            `<img src="/images/${p.name}-800.webp" srcset="/images/${p.name}-400.webp 400w, /images/${p.name}-800.webp 800w" sizes="(max-width:640px) 92vw, 20rem" width="${p.width}" height="${p.height}" loading="lazy" decoding="async" alt="${esc(p.alt)}" />`,
        )
        .join('')}</div>`
    : ''

const faqHtml = (faqs) =>
  faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')

const jsonLd = ({ title, description, canonical, service, areaLabel, faqs }) => {
  const business = {
    '@type': 'HomeGoodsStore',
    '@id': `${SITE_URL}/#business`,
    name: CONTACT.name,
    telephone: '+91' + CONTACT.phones[0],
    url: SITE_URL + '/',
    image: `${SITE_URL}/images/gouri-mattresses-furnishing-shop-vartak-nagar-thane.webp`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Gala No. 1-2, Pokhran Road No. 1, Near Mane H.P. Gas Godown & Thirani School, Vartak Nagar',
      addressLocality: 'Thane',
      addressRegion: 'MH',
      postalCode: '400606',
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: CONTACT.geo.lat, longitude: CONTACT.geo.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: CONTACT.hoursSpec.opens,
        closes: CONTACT.hoursSpec.closes,
      },
    ],
  }

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description,
      serviceType: service.title,
      url: canonical,
      provider: business,
      areaServed: { '@type': 'Place', name: `${areaLabel}, Thane, Maharashtra` },
      availableChannel: {
        '@type': 'ServiceChannel',
        servicePhone: '+91' + CONTACT.phones[0],
        serviceUrl: canonical,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: `${service.short} in Thane`,
          item: `${SITE_URL}/${service.slug}-thane/`,
        },
        { '@type': 'ListItem', position: 3, name: title, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
    .join('\n    ')
}

/** Renders one page. `area` is null for the six `/…-thane/` service hubs. */
function renderPage(service, area, index) {
  const isHub = !area
  const areaLabel = isHub ? 'Thane' : area.label
  const slug = isHub ? `${service.slug}-thane` : `${service.slug}-${area.slug}`
  const canonical = `${SITE_URL}/${slug}/`

  // Titles and descriptions are kept inside Google's display limits (~60 and
  // ~160 characters). A truncated title loses the brand name at the end, which
  // is the part that earns the click on a repeat impression.
  const title = isHub
    ? `${service.short} in Thane — Made to Measure | Gouri Furnishing`
    : `${service.short} in ${areaLabel}, Thane | Gouri Furnishing`

  const description = isHub
    ? `${service.meta} Free home measurement across Thane. Call 93265 44812.`
    : `${service.short} in ${areaLabel}, Thane. Free home measurement, fixed price before work starts, made in our own Vartak Nagar workshop. Call 93265 44812.`

  const keywords = [
    ...service.keywords,
    `${service.short.toLowerCase()} ${areaLabel}`,
    `${service.short.toLowerCase()} near me`,
    `furnishing shop ${areaLabel}`,
  ].join(', ')

  const photos = photosFor(service, index * 2)
  const faqs = faqsFor(index)
  const note = isHub
    ? 'We work across the whole of Thane West and the surrounding areas from our workshop in Vartak Nagar.'
    : (AREA_NOTES[area.slug] ?? `We cover ${areaLabel} from our workshop in Vartak Nagar.`)

  // Cross-links: sibling services in the same area, and the same service in
  // nearby areas. These are what let Google crawl the whole grid.
  const siblingServices = SERVICES.filter((s) => s.slug !== service.slug)
    .map(
      (s) =>
        `<li><a href="/${s.slug}-${isHub ? 'thane' : area.slug}/">${esc(s.short)} in ${esc(areaLabel)}</a></li>`,
    )
    .join('')

  const siblingAreas = AREAS.filter((a) => isHub || a.slug !== area.slug)
    .slice(0, 12)
    .map((a) => `<li><a href="/${service.slug}-${a.slug}/">${esc(service.short)} in ${esc(a.label)}</a></li>`)
    .join('')

  const relatedLinks = `
        <p style="font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:#e0c48a;margin:0 0 .6rem">More from us</p>
        <ul class="links">
          <li><a href="/">Home</a></li>
          ${SERVICES.map((s) => `<li><a href="/${s.slug}-thane/">${esc(s.short)} in Thane</a></li>`).join('')}
        </ul>`

  return {
    slug,
    canonical,
    html: `<!doctype html>
<html lang="en-IN">
  <head>${SHARED_HEAD(title, description, canonical, keywords)}
    ${jsonLd({ title, description, canonical, service, areaLabel, faqs })}${PAGE_CSS}
  </head>
  <body>
    ${HEADER_HTML}

    <main class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> ›
        ${isHub ? `<span>${esc(service.short)} in Thane</span>` : `<a href="/${service.slug}-thane/">${esc(service.short)} in Thane</a> › <span>${esc(areaLabel)}</span>`}
      </nav>

      <h1>${isHub ? esc(service.title) + ' in Thane' : `${esc(service.short)} in ${esc(areaLabel)}, Thane`}</h1>

      <p class="lede">${esc(service.body)}</p>

      <p>${esc(note)}</p>

      <div class="cta-row">
        <a class="btn btn-teal" href="tel:+91${CONTACT.phones[0]}">Call +91 93265 44812</a>
        <a class="btn btn-wa" href="https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
          `Hi Gouri Furnishing, I would like a free measurement for ${service.short.toLowerCase()} in ${areaLabel}.`,
        )}">Free measurement on WhatsApp</a>
      </div>

      <h2>What you get</h2>
      <ul class="ticks">
        ${service.points.map((p) => `<li>${esc(p)}</li>`).join('')}
        <li>Free measurement at your home in ${esc(areaLabel)} — no charge if you do not order</li>
        <li>A fixed price in writing before anything is cut or stripped</li>
      </ul>

      <h2>How we approach it</h2>
      <p>${esc(SERVICE_ANGLE[service.slug])}</p>

      <h2>Our ${esc(service.short.toLowerCase())} work</h2>
      <p>Every photograph below is our own completed work — no stock images.</p>
      ${galleryHtml(photos)}

      <h2>How it works</h2>
      <ol>
        <li><strong>Call or WhatsApp us</strong> on +91 93265 44812 and tell us what you need. A photo of the window or the sofa helps.</li>
        <li><strong>We come to ${esc(areaLabel)} and measure</strong>, bringing the fabric sample books so you choose in your own light. Free, no obligation.</li>
        <li><strong>You get one fixed price</strong> in writing. Nothing starts until you agree to it.</li>
        <li><strong>We make it and fit it</strong> — built in our own workshop on Pokhran Road, then delivered and installed properly.</li>
      </ol>

      <h2>Questions</h2>
      ${faqHtml(faqs)}

      <h2>Also in ${esc(areaLabel)}</h2>
      <ul class="links">${siblingServices}</ul>

      <h2>${esc(service.short)} in nearby areas</h2>
      <ul class="links">${siblingAreas}</ul>

      <div class="card" style="margin-top:2.5rem">
        <h3>Visit the shop</h3>
        <p style="margin:0">
          ${esc(CONTACT.address)}<br />
          Open 7 days, 10:00 am – 9:00 pm · Ask for ${esc(CONTACT.proprietor)}<br />
          <a href="${CONTACT.directions}" rel="noopener">Get directions</a>
        </p>
      </div>
    </main>

    <div class="band">
      <div class="wrap">
        <h2>Free measurement in ${esc(areaLabel)}</h2>
        <p>Tell us the room. We will bring the fabric to it — and quote before we start.</p>
        <div class="cta-row" style="margin-bottom:0">
          <a class="btn" style="background:#faf6ef;color:#1c1917" href="tel:+91${CONTACT.phones[0]}">Call +91 93265 44812</a>
          <a class="btn btn-wa" href="https://wa.me/${CONTACT.whatsapp}">WhatsApp us</a>
        </div>
      </div>
    </div>

    ${footerHtml(relatedLinks)}
  </body>
</html>
`,
  }
}

/** Every page the build should write, hubs first. */
export function allPages() {
  const pages = []
  SERVICES.forEach((service, si) => {
    pages.push(renderPage(service, null, si))
    AREAS.forEach((area, ai) => pages.push(renderPage(service, area, si * AREAS.length + ai + 1)))
  })
  return pages
}
