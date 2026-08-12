/**
 * The six things the shop actually sells, in the order a customer is most
 * likely to want them.
 *
 * `slug` drives both the on-site anchor and the generated landing page at
 * `/<slug>-thane/`, plus the whole `/<slug>-<area>/` grid — so these strings
 * are load-bearing for SEO. Changing one means changing sitemap.xml and any
 * links already indexed, so treat them as permanent once launched.
 *
 * `keywords` feed the generated pages' titles and the JSON-LD `knowsAbout`.
 * `image` is a gallery `name` from scripts/image-manifest.mjs.
 */
export const SERVICES = [
  {
    slug: 'curtains',
    icon: 'Blinds',
    title: 'Curtains, Made to Measure',
    short: 'Curtains',
    tagline: 'Stitched to your window, hung by us',
    body:
      'Pinch pleat, eyelet, sheer and blackout — cut and stitched to your exact window size, then fitted with the rod or track included. We bring the fabric book home so you choose against your own wall and your own light.',
    points: [
      'Free measurement at your home',
      'Pinch pleat · eyelet · sheer · blackout · double layer',
      'Rod, track and fitting included',
      'Loose covers and cushion covers to match',
    ],
    image: 'curtains-peach-sheer-layered-living-room-thane',
    // Kept under ~105 chars so the generated pages' meta descriptions, which
    // append the call-to-action, stay inside Google's ~160-char display limit.
    meta: 'Pinch pleat, sheer and blackout curtains stitched to your window size, with rod and fitting included.',
    keywords: [
      'curtains in Thane',
      'made to measure curtains Thane',
      'curtain stitching near me',
      'blackout curtains Thane',
      'curtain shop Vartak Nagar',
    ],
  },
  {
    slug: 'blinds',
    icon: 'AlignHorizontalJustifyStart',
    title: 'Blinds — Zebra, Roller & Roman',
    short: 'Blinds',
    tagline: 'Including custom photo prints',
    body:
      'Zebra day-and-night blinds, blackout rollers, and soft Roman blinds stitched in your own fabric. We also print any image you like straight onto the blind — customers have picked everything from mountains to their kids’ favourite planets.',
    points: [
      'Zebra / day-and-night, roller, Roman and vertical',
      'Custom digital printing on the blind fabric',
      'Blackout options for bedrooms and nurseries',
      'Measured, fitted and levelled by our own team',
    ],
    image: 'zebra-blinds-printed-mountain-scene',
    meta: 'Zebra, roller and Roman blinds measured and fitted — including any picture printed onto the fabric.',
    keywords: [
      'blinds in Thane',
      'zebra blinds Thane',
      'roller blinds near me',
      'window blinds Vartak Nagar',
      'customised printed blinds Thane',
    ],
  },
  {
    slug: 'sofa-repair',
    icon: 'Hammer',
    title: 'Sofa Repair & Re-upholstery',
    short: 'Sofa repair',
    tagline: 'Old sofa, new life — for far less than new',
    body:
      'Sagging seats, torn fabric, broken frames and collapsed foam. We re-web the base, replace the foam, rebuild the frame where it needs it, and re-cover the whole thing in the fabric you choose. Most sofas come back looking better than the day they arrived.',
    points: [
      'New foam, springs, webbing and frame repair',
      'Complete re-covering in your chosen fabric',
      'Pick-up and drop-back from your home',
      'Loose covers stitched if you would rather not re-upholster',
    ],
    image: 'l-shape-sofa-tan-suede-bolsters',
    meta: 'New foam, webbing and frame repair with full re-covering in your fabric. Picked up from your home.',
    keywords: [
      'sofa repair in Thane',
      'sofa repairing near me',
      'sofa re-upholstery Thane',
      'old sofa repair Vartak Nagar',
      'sofa cover stitching Thane',
    ],
  },
  {
    slug: 'sofa-cum-bed',
    icon: 'Sofa',
    title: 'Sofa Cum Bed & New Sofas',
    short: 'Sofa cum bed',
    tagline: 'Built to your room, not to a catalogue',
    body:
      'L-shapes, 3+2 sets and sofa cum beds with storage underneath — built in our own workshop to the exact size of your room. A Thane flat rarely fits a showroom sofa properly; ours are cut to the wall you actually have.',
    points: [
      'Sofa cum bed with pull-out mechanism and storage',
      'L-shape, 3+2, and single-seater sets',
      'Velvet, chenille, suede and leatherette',
      'Made to your room size — any dimension',
    ],
    image: 'sofa-cum-bed-green-l-shape-closed',
    meta: 'Sofa cum beds with storage, L-shape and 3+2 sets, built in our workshop to your room size.',
    keywords: [
      'sofa cum bed in Thane',
      'sofa set Thane',
      'L shape sofa Thane',
      'customised sofa near me',
      'sofa maker Vartak Nagar',
    ],
  },
  {
    slug: 'mattress',
    icon: 'BedDouble',
    title: 'Coir & Cotton Mattresses, Pillows',
    short: 'Mattresses',
    tagline: 'Any size, made the same week',
    body:
      'Coir, cotton and foam mattresses cut to any size — including the odd sizes that fold-out beds, diwans and window seats need and no showroom stocks. Pillows, bolsters and cushions made to order alongside.',
    points: [
      'Coir, cotton and foam — any thickness',
      'Non-standard sizes for diwans and storage beds',
      'Pillows, bolsters and cushion inners',
      'Old mattress re-filling and re-covering',
    ],
    // The shop-front photo, because it is the only one showing actual pillow
    // and mattress stock (the hanging Kohinoor / Dream Sleep / Fresh packs).
    // This slot previously held a headboard photo, which was simply the wrong
    // product on the wrong card.
    // TODO(client): ask Firoz for photographs of finished mattresses — coir,
    // cotton, an odd-size cut. For a shop whose name begins with "Mattresses",
    // having no dedicated mattress photography is the biggest content gap on
    // the site. Same for a worn sofa photographed before re-upholstery.
    image: 'gouri-furnishing-shop-entrance-pokhran-road',
    meta: 'Coir, cotton and foam mattresses cut to any size, plus pillows and bolsters made to order.',
    keywords: [
      'mattress shop in Thane',
      'coir mattress Thane',
      'cotton mattress near me',
      'custom size mattress Thane',
      'pillow shop Vartak Nagar',
    ],
  },
  {
    slug: 'headboard',
    icon: 'PanelTop',
    title: 'Upholstered Headboards & Wall Panels',
    short: 'Headboards',
    tagline: 'The wall behind your bed, done properly',
    body:
      'Channel-tufted, diamond-tufted, scalloped and geometric headboards in velvet or leatherette, with brass inlay if you want it. We build the panel, fit it to the wall, and match wallpaper or fluted panelling around it.',
    points: [
      'Channel, diamond, scalloped and geometric designs',
      'Velvet, suede and leatherette with brass inlay',
      'Full-wall panels, not just bed-width',
      'Wallpaper and fluted panelling fitted to match',
    ],
    image: 'headboard-grey-chevron-gold-inlay-thane',
    meta: 'Channel, diamond and scalloped headboards in velvet or leatherette, with matching wall panelling.',
    keywords: [
      'headboard designs Thane',
      'upholstered headboard near me',
      'cushion headboard Thane',
      'wall panelling Vartak Nagar',
      'wallpaper installation Thane',
    ],
  },
]

/**
 * Areas the shop serves, used to generate the `/<service>-<area>/` grid.
 *
 * Ordered roughly by how close they are to the gala on Pokhran Road — the near
 * ones convert, the far ones catch long-tail searches. `label` is what a local
 * would type; `slug` must stay stable once these pages are indexed.
 */
export const AREAS = [
  { label: 'Vartak Nagar', slug: 'vartak-nagar', near: true },
  { label: 'Pokhran Road', slug: 'pokhran-road', near: true },
  { label: 'Thane West', slug: 'thane-west', near: true },
  { label: 'Naupada', slug: 'naupada', near: true },
  { label: 'Panch Pakhadi', slug: 'panch-pakhadi', near: true },
  { label: 'Majiwada', slug: 'majiwada', near: true },
  { label: 'Louiswadi', slug: 'louiswadi', near: true },
  { label: 'Wagle Estate', slug: 'wagle-estate', near: true },
  { label: 'Kopri', slug: 'kopri', near: true },
  { label: 'Balkum', slug: 'balkum' },
  { label: 'Kolshet Road', slug: 'kolshet-road' },
  { label: 'Manpada', slug: 'manpada' },
  { label: 'Hiranandani Estate', slug: 'hiranandani-estate' },
  { label: 'Ghodbunder Road', slug: 'ghodbunder-road' },
  { label: 'Waghbil', slug: 'waghbil' },
  { label: 'Kasarvadavali', slug: 'kasarvadavali' },
  { label: 'Mulund', slug: 'mulund' },
  { label: 'Bhandup', slug: 'bhandup' },
]

/** Footer links to the generated per-service landing pages. */
export const SERVICE_LINKS = SERVICES.map((s) => ({
  label: `${s.short} in Thane`,
  href: `/${s.slug}-thane/`,
}))

/** Footer links to the generated per-area pages (curtains is the head term). */
export const AREA_LINKS = AREAS.map((a) => ({
  label: a.label,
  href: `/curtains-${a.slug}/`,
}))
