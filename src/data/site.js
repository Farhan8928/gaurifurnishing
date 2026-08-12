/**
 * Single source of truth for the shop's business facts.
 *
 * Every phone number, address and headline figure on the site reads from here,
 * so when a detail changes it changes in exactly one place and stays identical
 * across the nav, hero, contact block, footer, sticky call bar, the generated
 * landing pages and the JSON-LD. That last part matters more than it sounds:
 * Google cross-checks the site's NAP against the Google Business Profile and
 * every directory listing, and a mismatch quietly costs local ranking.
 *
 * The values below are transcribed from the shop's own signboard photo
 * (client-images/…3.34.38 PM.jpeg) so they match the physical board exactly.
 */

/** The canonical origin. Referenced by robots.txt, sitemap.xml and all JSON-LD. */
export const SITE_URL = 'https://gourifurnishing.com'

export const CONTACT = {
  name: 'Gouri Mattresses & Furnishing',
  /** Marathi name as painted on the board — used in the schema `alternateName`. */
  nameMarathi: 'गौरी मॅट्रेसेस आणि फर्निशिंग',
  shortName: 'Gouri Furnishing',
  proprietor: 'Firoz',
  phones: ['9326544812'],
  whatsapp: '919326544812',
  addressLines: [
    'Gala No. 1-2, Pokhran Road No. 1,',
    'Near Mane H.P. Gas Godown & Thirani School,',
    'Vartak Nagar, Thane (W), Maharashtra 400606',
  ],
  address:
    'Gala No. 1-2, Pokhran Road No. 1, Near Mane H.P. Gas Godown & Thirani School, Vartak Nagar, Thane (W), Maharashtra 400606',
  locality: 'Vartak Nagar',
  city: 'Thane',
  region: 'MH',
  postalCode: '400606',
  country: 'IN',

  // TODO(client): confirm the real opening hours before launch. These are the
  // usual hours for a Thane furnishing gala and are also written into the
  // JSON-LD `openingHoursSpecification` — if they are wrong, Google will show
  // "Open now" when the shutter is down, which costs walk-ins and trust.
  hours: 'Open 7 days · 10:00 am – 9:00 pm',
  hoursSpec: { opens: '10:00', closes: '21:00' },

  // TODO(client): replace with the exact pin from the Google Business Profile.
  // These coordinates are Pokhran Road No. 1 / Vartak Nagar and are close, but
  // the geo tag should match the verified GBP pin to the decimal.
  geo: { lat: 19.2063, lng: 72.964 },

  mapEmbed:
    'https://www.google.com/maps?q=Gouri+Mattresses+and+Furnishing,+Pokhran+Road+No.+1,+Vartak+Nagar,+Thane+West,+400606&output=embed',
  directions:
    'https://www.google.com/maps/search/?api=1&query=Gouri+Mattresses+and+Furnishing+Pokhran+Road+No+1+Vartak+Nagar+Thane+West+400606',
}

/**
 * Headline trust figures.
 *
 * `showRating` is deliberately false. The shop has no verified Google rating
 * to publish yet, and inventing an `aggregateRating` in the JSON-LD is both a
 * Google structured-data violation (it can earn a manual action) and the exact
 * kind of claim a customer can catch. Flip `showRating` to true and fill in the
 * real numbers once the Google Business Profile has reviews — the rating then
 * appears in the hero, the trust bar and the schema automatically.
 */
export const RATING = {
  showRating: false,
  score: null,
  count: null,
}

/**
 * The four figures in the dark band under the hero.
 *
 * Every one of these is something a customer could verify by phoning the shop —
 * deliberately so. It is tempting to put "15+ years" and "1,000+ homes" here,
 * and every competitor does, but nobody has told us those numbers and a claim
 * we cannot stand behind is worth less than a true one.
 *
 * TODO(client): once Firoz confirms the real founding year and an honest job
 * count, swap two of these for "N+ years in Thane" and "N+ homes fitted" —
 * concrete numbers outperform adjectives, when they are true.
 */
export const TRUST_STATS = [
  { value: 'Free', label: 'Home measurement' },
  { value: 'Fixed', label: 'Price before work' },
  { value: '7 days', label: 'Open every day' },
  { value: 'In-house', label: 'Our own workshop' },
]

export const NAV_LINKS = [
  { label: 'What We Make', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'How It Works', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Visit Us', href: '#contact' },
]

export const HERO_POINTS = [
  'Free home visit and measurement anywhere in Thane',
  'Fabric samples brought to your door — choose at home',
  'Fixed price agreed in writing before any work starts',
  'Old sofas re-upholstered, not replaced — at a fraction of new',
]

/** Fabric and material families the shop works with, for the marquee strip. */
export const MATERIALS = [
  'Velvet',
  'Chenille',
  'Jacquard',
  'Blackout',
  'Sheer / Net',
  'Linen',
  'Cotton',
  'Suede',
  'Leatherette',
  'Coir',
  'Foam',
  'Zebra Blind',
  'Roller Blind',
  'Roman Blind',
]

/** Format a bare 10-digit number as a readable +91 phone string. */
export const fmtPhone = (p) => `+91 ${p.replace(/(\d{5})(\d{5})/, '$1 $2')}`

/** Build a click-to-chat WhatsApp URL with a pre-filled message. */
export const waLink = (text) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`

/** The default WhatsApp message — pre-filling it removes a step for the customer. */
export const WA_DEFAULT =
  'Hi Gouri Furnishing, I saw your website. I would like a free measurement and quote for '
