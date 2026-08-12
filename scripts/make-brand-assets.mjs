/**
 * Generates the brand raster assets that cannot be shipped as SVG:
 * the PWA icons and the 1200×630 Open Graph share card.
 *
 * The OG card is worth the effort for this business specifically. Most of its
 * traffic will arrive as a link forwarded in a WhatsApp group, and WhatsApp
 * renders that link as this image plus the title — so this file is, in
 * practice, the shop's business card online.
 *
 * Run once with `node scripts/make-brand-assets.mjs`; re-run only if the logo
 * or the hero photograph changes.
 */
import { mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUB = join(ROOT, 'public')

const TEAL = '#0f5f5c'
const LINEN = '#faf6ef'
const BRASS = '#e0c48a'

/** The favicon mark, scaled up. `pad` insets it for the maskable safe zone. */
const iconSvg = (size, pad = 0) => {
  const s = size
  const i = s * pad
  const inner = s - i * 2
  const u = (n) => i + inner * (n / 64)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <rect width="${s}" height="${s}" fill="${TEAL}"/>
    <g fill="none" stroke="${BRASS}" stroke-width="${(inner / 64) * 3.4}" stroke-linecap="round">
      <path d="M${u(17)} ${u(15)}V${u(49)}"/>
      <path d="M${u(27)} ${u(15)}V${u(49)}"/>
      <path d="M${u(37)} ${u(15)}V${u(49)}"/>
      <path d="M${u(47)} ${u(15)}V${u(49)}"/>
    </g>
    <path d="M${u(12)} ${u(15)}H${u(52)}" stroke="${LINEN}" stroke-width="${(inner / 64) * 4}" stroke-linecap="round"/>
  </svg>`
}

/**
 * Text layer for the OG card. Uses Georgia and Arial rather than the site's
 * webfonts: sharp rasterises SVG through librsvg using system fonts only, so a
 * webfont name here would silently fall back to something ugly.
 */
const ogTextSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0"   stop-color="#12100e" stop-opacity="0.94"/>
      <stop offset="0.55" stop-color="#12100e" stop-opacity="0.82"/>
      <stop offset="1"   stop-color="#12100e" stop-opacity="0.30"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#scrim)"/>
  <rect x="0" y="0" width="10" height="630" fill="${TEAL}"/>

  <text x="72" y="150" font-family="Arial, Helvetica, sans-serif" font-size="21"
        font-weight="bold" letter-spacing="4.5" fill="${BRASS}">VARTAK NAGAR · THANE (W)</text>

  <text x="72" y="248" font-family="Georgia, 'Times New Roman', serif" font-size="66"
        font-weight="bold" fill="${LINEN}">Gouri Mattresses</text>
  <text x="72" y="322" font-family="Georgia, 'Times New Roman', serif" font-size="66"
        font-weight="bold" fill="${LINEN}">&amp; Furnishing</text>

  <text x="72" y="396" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#d9d2c6">
    Curtains · Blinds · Sofa Repair · Sofa Cum Bed · Mattresses
  </text>

  <rect x="72" y="440" width="470" height="3" fill="${BRASS}" opacity="0.55"/>

  <text x="72" y="502" font-family="Arial, Helvetica, sans-serif" font-size="30"
        font-weight="bold" fill="${LINEN}">Free home measurement across Thane</text>
  <text x="72" y="551" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="${BRASS}">
    +91 93265 44812  ·  gourifurnishing.com
  </text>
</svg>`

async function main() {
  await mkdir(PUB, { recursive: true })

  // ── PWA + Apple icons ──────────────────────────────────────────────────
  await sharp(Buffer.from(iconSvg(192))).png().toFile(join(PUB, 'icon-192.png'))
  await sharp(Buffer.from(iconSvg(512))).png().toFile(join(PUB, 'icon-512.png'))
  // Maskable icons get cropped to a circle on Android, so the mark is inset.
  await sharp(Buffer.from(iconSvg(512, 0.14))).png().toFile(join(PUB, 'icon-maskable.png'))
  await sharp(Buffer.from(iconSvg(180))).png().toFile(join(PUB, 'apple-touch-icon.png'))

  // ── Open Graph card: real photograph of their work behind the text ─────
  const photo = await sharp(join(PUB, 'images', 'curtains-peach-sheer-layered-living-room-thane.webp'))
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .toBuffer()

  await sharp(photo)
    .composite([{ input: Buffer.from(ogTextSvg), top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(PUB, 'og-image.jpg'))

  console.log('✓ icons + og-image.jpg written to public/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
