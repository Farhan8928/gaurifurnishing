/**
 * Curated manifest of the client's WhatsApp photos.
 *
 * Every usable photo the shop sent is listed here exactly once, mapped to an
 * SEO-friendly filename, a category and a descriptive alt text. This file is
 * the single source of truth for both `scripts/process-images.mjs` (which
 * renders the WebP derivatives) and `src/data/gallery.js` (which renders them).
 *
 * `src` is the original filename inside /client-images.
 * `rotate` is degrees clockwise, applied when the camera wrote the photo
 * sideways — a handful of the WhatsApp images came through rotated.
 *
 * EXCLUDED originals and why — do not re-add these:
 *   "…12.30.45 AM.jpeg"      screenshot of a chat (phone status bar visible)
 *   "…12.30.45 AM (1).jpeg"  carries a "CARVE STYLE" watermark — not their work
 *   "…12.30.45 AM (2).jpeg"  shot inside a large retail showroom, unverifiable
 *   "…12.30.48 AM (2).jpeg"  carries a "LIVSPACE" watermark — a competitor's photo
 * Publishing another company's watermarked photography would be both a
 * copyright problem and a trust problem if a customer recognised it.
 *
 * Byte-identical duplicates the client sent twice are simply not listed:
 *   12.30.44 AM (2)/(3), 3.27.17 PM (2)/(3), 3.34.38 PM (1)
 */

export const IMAGES = [
  // ── Shop front & showroom ────────────────────────────────────────────────
  // The signboard photo is the most valuable image in the whole set: it proves
  // the shop is real and its text matches the NAP in the JSON-LD exactly.
  {
    src: 'WhatsApp Image 2026-08-12 at 3.34.38 PM.jpeg',
    name: 'gouri-mattresses-furnishing-shop-vartak-nagar-thane',
    category: 'shop',
    hero: true,
    alt: 'Gouri Mattresses & Furnishing shop front on Pokhran Road No. 1, Vartak Nagar, Thane West, with pillows and mattresses on display',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 3.27.16 PM.jpeg',
    name: 'gouri-furnishing-shop-entrance-pokhran-road',
    category: 'shop',
    alt: 'Entrance of Gouri Mattresses & Furnishing showing curtain fabric racks and pillow stock inside the shop',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 3.27.17 PM.jpeg',
    name: 'curtain-fabric-collection-pink-gold-thane',
    category: 'shop',
    alt: 'Curtain fabric samples in the Thane showroom — dusty pink damask and gold trellis pinch-pleat panels',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 3.27.17 PM (1).jpeg',
    name: 'curtain-fabric-collection-grey-thane',
    category: 'shop',
    alt: 'Grey striped sheer and charcoal blackout curtain samples hanging in the Gouri Furnishing showroom, Thane',
  },

  // ── Curtains ─────────────────────────────────────────────────────────────
  {
    src: 'WhatsApp Image 2026-08-12 at 12.10.30 AM.jpeg',
    name: 'curtains-peach-sheer-layered-living-room-thane',
    category: 'curtains',
    hero: true,
    alt: 'Peach pinch-pleat curtains layered over white sheers with fabric tie-backs in a Thane living room',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.10.28 AM.jpeg',
    name: 'curtains-teal-ombre-printed-bedroom',
    category: 'curtains',
    alt: 'Teal ombre printed pinch-pleat curtains fitted wall-to-wall in a bedroom, with a new mattress below',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.10.29 AM.jpeg',
    name: 'curtains-beige-pinch-pleat-bedroom',
    category: 'curtains',
    alt: 'Beige herringbone pinch-pleat curtains running floor to ceiling beside a fitted wardrobe',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.10.31 AM.jpeg',
    name: 'curtains-floral-print-cream-mustard-border',
    category: 'curtains',
    alt: 'Cream curtains with a hand-painted floral print and mustard border, custom stitched and installed',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.10.32 AM.jpeg',
    name: 'curtains-grey-sheer-double-layer-hall',
    category: 'curtains',
    alt: 'Double-layer window treatment — grey sheers behind taupe side curtains with matching tie-backs',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.10.35 AM.jpeg',
    name: 'curtains-maroon-floral-ombre-blackout',
    category: 'curtains',
    alt: 'Maroon and blush ombre floral blackout curtains covering a full bedroom wall',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.10.35 AM (1).jpeg',
    name: 'curtains-pink-blossom-print-bedroom',
    category: 'curtains',
    alt: 'Pink blossom-print curtains matched to a rose velvet headboard in a Thane bedroom',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.10.36 AM.jpeg',
    name: 'curtains-bronze-jacquard-bedroom-wallpaper',
    category: 'curtains',
    alt: 'Bronze jacquard curtains in a bedroom with a blush velvet headboard and gold leaf wallpaper',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.10.37 AM.jpeg',
    name: 'curtains-textured-ivory-pinch-pleat',
    category: 'curtains',
    alt: 'Textured ivory pinch-pleat curtains with a crisp pleat fall, fitted across a living room wall',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.56 AM (1).jpeg',
    name: 'curtains-blue-ombre-living-room',
    category: 'curtains',
    rotate: 90,
    alt: 'Blue ombre printed curtains fitted behind a cream sofa set in a Thane living room',
  },

  // ── Blinds ───────────────────────────────────────────────────────────────
  {
    src: 'WhatsApp Image 2026-08-12 at 12.12.59 AM.jpeg',
    name: 'zebra-blinds-printed-mountain-scene',
    category: 'blinds',
    hero: true,
    alt: 'Zebra day-and-night blind with a printed monochrome mountain scene, fitted over a bedroom window',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.15.19 AM.jpeg',
    name: 'zebra-blinds-printed-swans-dressing-room',
    category: 'blinds',
    alt: 'Printed zebra blind showing two swans on water, installed in a dressing area',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.13.02 AM.jpeg',
    name: 'roller-blinds-grey-blackout-bedroom',
    category: 'blinds',
    alt: 'Plain grey blackout roller blind with a chain control, fitted inside a bedroom window recess',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.15.17 AM (1).jpeg',
    name: 'roller-blinds-ginkgo-leaf-print',
    category: 'blinds',
    alt: 'Digitally printed roller blind with teal and gold ginkgo leaves on a full-height window',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.15.19 AM (1).jpeg',
    name: 'roller-blinds-lotus-butterfly-print',
    category: 'blinds',
    alt: 'Printed roller blind with line-drawn lotus flowers and a butterfly, fitted in a dining area',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.15.18 AM.jpeg',
    name: 'roller-blinds-geometric-study-table',
    category: 'blinds',
    alt: 'Geometric-print roller blind above a study table, framed in a black laminate window surround',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.13.00 AM.jpeg',
    name: 'roman-blinds-geometric-sage-green',
    category: 'blinds',
    alt: 'Roman blind in sage green with a geometric diamond band, stitched to order for a narrow window',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.15.18 AM (1).jpeg',
    name: 'roman-blinds-champagne-velvet-tall',
    category: 'blinds',
    alt: 'Tall champagne velvet Roman blind with even folds, covering a full-height panel',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.15.20 AM.jpeg',
    name: 'roman-blinds-gold-jacquard-study',
    category: 'blinds',
    alt: 'Gold jacquard Roman blind fitted over a study nook with a wooden desk',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.15.17 AM.jpeg',
    name: 'kids-blackout-blinds-planets-space',
    category: 'blinds',
    alt: "Blackout blinds printed with planets and stars for a child's bedroom in Thane",
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.15.20 AM (1).jpeg',
    name: 'kids-roller-blinds-bicycle-print',
    category: 'blinds',
    alt: "Roller blind with a bicycle and owl illustration for a child's room window",
  },

  // ── Sofas: new, custom-made and re-upholstered ───────────────────────────
  {
    src: 'WhatsApp Image 2026-08-12 at 12.20.49 AM.jpeg',
    name: 'l-shape-sofa-grey-velvet-living-room-thane',
    category: 'sofas',
    hero: true,
    alt: 'Grey velvet L-shape sofa with matching ottomans and a window seat, made to order for a Thane living room',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.53 AM.jpeg',
    name: 'sofa-blue-velvet-three-seater-channel-back',
    category: 'sofas',
    alt: 'Blue velvet three-seater sofa with a channel-tufted back and brass legs, in the Gouri Furnishing showroom',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.58 AM (1).jpeg',
    name: 'sofa-teal-velvet-gold-trim-designer',
    category: 'sofas',
    alt: 'Teal velvet designer sofa with gold metal trim on the arms and back, custom built to order',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.55 AM.jpeg',
    name: 'l-shape-sofa-tan-suede-bolsters',
    category: 'sofas',
    alt: 'Tan suede L-shape sofa with button-tufted back cushions and bolster pillows',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.20.49 AM (1).jpeg',
    name: 'l-shape-sofa-teal-with-ottoman',
    category: 'sofas',
    alt: 'Teal L-shape sofa with a separate storage ottoman, delivered to a Thane flat',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.58 AM.jpeg',
    name: 'sofa-set-teal-3-2-with-stools',
    category: 'sofas',
    alt: 'Teal 3+2 sofa set with printed cushions and matching wooden-leg stools',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.59 AM.jpeg',
    name: 'sofa-set-blue-quilted-3-2',
    category: 'sofas',
    alt: 'Blue quilted 3+2 sofa set with diamond-stitched side panels in a Thane living room',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.20.47 AM.jpeg',
    name: 'sofa-set-mustard-3-1-1-fluted',
    category: 'sofas',
    alt: 'Mustard 3+1+1 sofa set with fluted channel backs and patterned scatter cushions',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.20.50 AM.jpeg',
    name: 'sofa-set-teal-workshop-thane',
    category: 'sofas',
    alt: 'Teal 3+2 sofa set finished on the workshop floor before delivery',
  },

  // ── Sofa cum bed — the shop's strongest speciality ───────────────────────
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.54 AM (1).jpeg',
    name: 'sofa-cum-bed-green-l-shape-closed',
    category: 'sofa-cum-bed',
    hero: true,
    pairWith: 'sofa-cum-bed-green-l-shape-open',
    alt: 'Olive green L-shape sofa cum bed in sofa position, with a storage chaise',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.54 AM.jpeg',
    name: 'sofa-cum-bed-green-l-shape-open',
    category: 'sofa-cum-bed',
    alt: 'The same olive green sofa cum bed pulled out flat into a double bed',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.57 AM.jpeg',
    name: 'sofa-cum-bed-beige-closed',
    category: 'sofa-cum-bed',
    pairWith: 'sofa-cum-bed-beige-open',
    alt: 'Beige fluted sofa cum bed seated in front of a fitted wardrobe, in sofa position',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.57 AM (1).jpeg',
    name: 'sofa-cum-bed-beige-open',
    category: 'sofa-cum-bed',
    alt: 'The same beige sofa cum bed opened out into a full-size bed',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.20.41 AM.jpeg',
    name: 'sofa-cum-bed-navy-l-shape-closed',
    category: 'sofa-cum-bed',
    pairWith: 'sofa-cum-bed-navy-l-shape-open',
    alt: 'Navy velvet L-shape sofa cum bed with a storage base, in sofa position',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.20.42 AM.jpeg',
    name: 'sofa-cum-bed-navy-l-shape-open',
    category: 'sofa-cum-bed',
    alt: 'The same navy L-shape sofa cum bed extended into a bed on runners',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.20.50 AM (1).jpeg',
    name: 'sofa-cum-bed-blue-l-shape-open',
    category: 'sofa-cum-bed',
    alt: 'Blue L-shape sofa cum bed with adjustable headrests, opened into a bed',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.20.44 AM.jpeg',
    name: 'sofa-cum-bed-yellow-open',
    category: 'sofa-cum-bed',
    alt: 'Pale yellow sofa cum bed opened flat, showing the fold-out mattress section',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.31.59 AM.jpeg',
    name: 'sofa-cum-bed-teal-velvet-gold-trim',
    category: 'sofa-cum-bed',
    alt: 'Teal velvet sofa cum bed with gold trim on the arms, finished in the Thane workshop',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.53 AM (1).jpeg',
    name: 'sofa-cum-bed-teal-workshop-build',
    category: 'sofa-cum-bed',
    alt: 'Teal sofa cum bed mid-build on the workshop floor, showing the fluted base construction',
  },

  // ── Upholstered headboards & beds ────────────────────────────────────────
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.46 AM.jpeg',
    name: 'headboard-grey-chevron-gold-inlay-thane',
    category: 'headboards',
    hero: true,
    alt: 'Grey leatherette headboard with chevron panels and gold inlay strips, built to order at the Thane workshop',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.41 AM.jpeg',
    name: 'headboard-teal-scalloped-floral-wallpaper',
    category: 'headboards',
    alt: 'Teal velvet scalloped headboard panel with a pastel floral mural wallpaper above it',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.43 AM (2).jpeg',
    name: 'headboard-teal-scalloped-wall-bed',
    category: 'headboards',
    alt: 'Teal scalloped headboard fitted to a wall-mounted foldaway bed in oak laminate',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.42 AM (1).jpeg',
    name: 'headboard-rust-velvet-flamingo-arch',
    category: 'headboards',
    alt: 'Rust velvet padded headboard set beneath a backlit arch with flamingo mural wallpaper',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.43 AM.jpeg',
    name: 'headboard-beige-tufted-twin-panels',
    category: 'headboards',
    alt: 'Pair of beige diamond-tufted arched headboards against patchwork wallpaper',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.43 AM (1).jpeg',
    name: 'headboard-tan-channel-fluted-wall',
    category: 'headboards',
    alt: 'Tan channel-tufted headboard on a storage bed, against a fluted white wall panel',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.44 AM.jpeg',
    name: 'headboard-grey-channel-fluted-wall',
    category: 'headboards',
    alt: 'Grey channel-panel headboard fitted below fluted wall panelling in a new flat',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.48 AM (1).jpeg',
    name: 'headboard-beige-hexagon-channel-full-wall',
    category: 'headboards',
    alt: 'Full-wall beige headboard in elongated hexagon channels, wrapping behind a storage bed',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.47 AM.jpeg',
    name: 'headboard-grey-diamond-quilted',
    category: 'headboards',
    alt: 'Grey diamond-quilted headboard panel mounted flush to the wall above a bed',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.46 AM (1).jpeg',
    name: 'headboard-grey-geometric-fitting-onsite',
    category: 'headboards',
    alt: 'Grey geometric headboard being fitted on site, with the mattress still wrapped',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.47 AM (1).jpeg',
    name: 'headboard-brown-brick-panel-install',
    category: 'headboards',
    alt: 'Brown brick-pattern padded wall panels and a white tufted headboard during installation',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.48 AM.jpeg',
    name: 'headboard-black-gold-diamond',
    category: 'headboards',
    rotate: -90,
    alt: 'Black leatherette headboard with gold diamond inlay, paired with a storage bed and mattress',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.44 AM (1).jpeg',
    name: 'headboard-beige-geometric-triangle',
    category: 'headboards',
    alt: 'Beige geometric triangle-panelled headboard with a backlit cove, in a bedroom with orange curtains',
  },
  {
    src: 'WhatsApp Image 2026-08-12 at 12.19.56 AM.jpeg',
    name: 'bed-green-upholstered-storage',
    category: 'headboards',
    alt: 'Olive green upholstered storage bed with a quilted and channel-panelled headboard',
  },

  // ── Wallpaper & wall panelling ───────────────────────────────────────────
  {
    src: 'WhatsApp Image 2026-08-12 at 12.30.42 AM.jpeg',
    name: 'wallpaper-pastel-floral-mural-bedroom',
    category: 'wallpaper',
    hero: true,
    alt: 'Pastel floral mural wallpaper covering a full bedroom wall above a teal scalloped headboard',
  },
]

/** Categories in the order they should appear in the gallery filter. */
export const CATEGORIES = [
  { key: 'all', label: 'Everything' },
  { key: 'curtains', label: 'Curtains' },
  { key: 'blinds', label: 'Blinds' },
  { key: 'sofas', label: 'Sofas' },
  { key: 'sofa-cum-bed', label: 'Sofa cum bed' },
  { key: 'headboards', label: 'Headboards & beds' },
  { key: 'wallpaper', label: 'Wallpaper' },
  { key: 'shop', label: 'Our shop' },
]
