/**
 * Generates every brand asset that is not hand-written CSS:
 * favicon.svg, the PWA/Apple icons, and the 1200×630 Open Graph share card.
 *
 * All of them read their colours from src/data/brand.js, the same file the
 * Tailwind theme imports. That is the whole point of this script's existence in
 * its current form: these assets previously carried hard-coded hexes, so when
 * the design moved from teal to the signboard's navy and red, the site changed
 * and the tab icon, Android splash and every WhatsApp link preview quietly kept
 * the old colours. Nothing failed; they just stopped matching.
 *
 * The OG card is worth the effort for this business specifically. Most of its
 * traffic will arrive as a link forwarded in a WhatsApp group, and WhatsApp
 * renders that link as this image plus the title — so this file is, in
 * practice, the shop's business card online.
 *
 * Run with `npm run brand`. Re-run whenever the palette or the hero photo
 * changes; `npm run build` verifies the output still matches the palette.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { BRAND } from '../src/data/brand.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUB = join(ROOT, 'public')

/**
 * The mark: a curtain rail with pleats hanging from it.
 *
 * Three pleats rather than four, and square corners rather than a rounded
 * rectangle — at 16px in a browser tab, four strokes merge into a smear and a
 * radius reads as mush. `pad` insets the mark for the Android maskable icon,
 * which gets cropped to a circle.
 */
const markSvg = (size, pad = 0) => {
  const i = size * pad
  const inner = size - i * 2
  const u = (n) => i + inner * (n / 64)
  const w = (n) => (inner / 64) * n
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BRAND.navy}"/>
  <g stroke="${BRAND.sunflower}" stroke-width="${w(7)}" stroke-linecap="butt">
    <path d="M${u(19)} ${u(19)}V${u(53)}"/>
    <path d="M${u(32)} ${u(19)}V${u(53)}"/>
    <path d="M${u(45)} ${u(19)}V${u(53)}"/>
  </g>
  <path d="M${u(10)} ${u(15)}H${u(54)}" stroke="${BRAND.paper}" stroke-width="${w(7)}" stroke-linecap="butt"/>
</svg>`
}

/**
 * Text layer for the OG card.
 *
 * Uses Arial Black and Georgia rather than the site's webfonts: sharp
 * rasterises SVG through librsvg using system fonts only, so naming Archivo
 * here would silently fall back to something limp. Arial Black is the closest
 * system stand-in for the heavy signboard lettering.
 */
const ogTextSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0"    stop-color="${BRAND.navyDeep}" stop-opacity="0.97"/>
      <stop offset="0.58" stop-color="${BRAND.navyDeep}" stop-opacity="0.88"/>
      <stop offset="1"    stop-color="${BRAND.navyDeep}" stop-opacity="0.30"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#scrim)"/>
  <rect x="0" y="0" width="14" height="630" fill="${BRAND.red}"/>

  <text x="72" y="132" font-family="Arial Black, Arial, sans-serif" font-size="19"
        font-weight="900" letter-spacing="5" fill="${BRAND.sunflower}">VARTAK NAGAR · THANE (W)</text>

  <text x="72" y="228" font-family="Arial Black, Arial, sans-serif" font-size="68"
        font-weight="900" letter-spacing="-2" fill="${BRAND.paper}">GOURI</text>
  <text x="72" y="296" font-family="Arial Black, Arial, sans-serif" font-size="44"
        font-weight="900" letter-spacing="-1" fill="${BRAND.paper}">Mattresses &amp; Furnishing</text>

  <rect x="72" y="330" width="300" height="7" fill="${BRAND.sunflower}"/>

  <text x="72" y="404" font-family="Georgia, serif" font-size="27" fill="#d9d5c8">
    Curtains · Blinds · Sofa Repair · Sofa Cum Bed · Mattresses
  </text>

  <rect x="72" y="452" width="360" height="58" fill="${BRAND.red}"/>
  <text x="96" y="490" font-family="Arial Black, Arial, sans-serif" font-size="25"
        font-weight="900" fill="${BRAND.paper}">+91 93265 44812</text>

  <text x="72" y="556" font-family="Georgia, serif" font-size="24" fill="#b9b5a8">
    Free home measurement across Thane · gourifurnishing.com
  </text>
</svg>`

async function main() {
  await mkdir(PUB, { recursive: true })

  // favicon.svg is generated rather than hand-edited, so it cannot fall out of
  // step with the palette the way it did before.
  await writeFile(join(PUB, 'favicon.svg'), markSvg(64), 'utf8')

  await sharp(Buffer.from(markSvg(192))).png().toFile(join(PUB, 'icon-192.png'))
  await sharp(Buffer.from(markSvg(512))).png().toFile(join(PUB, 'icon-512.png'))
  // Maskable icons are cropped to a circle on Android, so the mark is inset.
  await sharp(Buffer.from(markSvg(512, 0.14))).png().toFile(join(PUB, 'icon-maskable.png'))
  await sharp(Buffer.from(markSvg(180))).png().toFile(join(PUB, 'apple-touch-icon.png'))

  // Open Graph card: a real photograph of their work behind the lettering.
  const photo = await sharp(
    join(PUB, 'images', 'curtains-peach-sheer-layered-living-room-thane.webp'),
  )
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .toBuffer()

  await sharp(photo)
    .composite([{ input: Buffer.from(ogTextSvg), top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(PUB, 'og-image.jpg'))

  console.log('✓ favicon.svg, icons and og-image.jpg written to public/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
