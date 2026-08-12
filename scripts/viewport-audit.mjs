/**
 * Checks that the primary call-to-action is visible without scrolling, at the
 * viewport sizes real customers actually have.
 *
 * This exists because of a bug that width-based testing cannot catch. A 1080p
 * laptop at Windows 125% scaling reports ~1536 CSS px wide — comfortably `lg`,
 * so it receives the full desktop layout — but only ~730 px tall after browser
 * chrome. A hero laid out and eyeballed in a 1000 px-tall window put both CTA
 * buttons at 836 px, i.e. off-screen on four of the five most common laptop
 * sizes, while looking perfect in the developer's browser.
 *
 * Run with `npm run viewport-audit` against a built dist/. Exits non-zero if a
 * call-to-action falls below the fold.
 */
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const PORT = 4191

/** Real-world CSS viewports, smallest usable height first. */
const VIEWPORTS = [
  { w: 1280, h: 600, label: '1280×600  small laptop' },
  { w: 1366, h: 625, label: '1366×625  768p laptop' },
  { w: 1536, h: 730, label: '1536×730  1080p @125%' },
  { w: 1440, h: 780, label: '1440×780  MacBook Air' },
  { w: 1920, h: 950, label: '1920×950  full HD' },
  { w: 390, h: 844, label: ' 390×844  iPhone 14' },
  { w: 360, h: 640, label: ' 360×640  budget Android' },
]

/** Pages to check. */
const TARGETS = [
  { url: '/', label: 'homepage' },
  { url: '/curtains-thane/', label: 'service hub' },
  { url: '/sofa-repair-naupada/', label: 'area page' },
]

/**
 * The question worth asking is not "is the hero button above the fold" but
 * "can the visitor tap a call or WhatsApp button without scrolling" — and on
 * phones the answer is yes via the fixed bottom bar, even though the hero's own
 * buttons sit well below the fold.
 *
 * So this measures the topmost *reachable* CTA of any kind: it walks every
 * tel:/wa.me link, discards ones that are hidden, and returns the smallest
 * distance from the top of the viewport to a fully-visible one. Fixed-position
 * elements report viewport-relative rects, so the sticky bar counts correctly.
 */
const measureCta = (page) =>
  page.evaluate(() => {
    const vh = window.innerHeight
    const vw = window.innerWidth
    let best = null

    for (const el of document.querySelectorAll('a[href^="tel:"], a[href*="wa.me"]')) {
      const style = getComputedStyle(el)
      if (style.display === 'none' || style.visibility === 'hidden' || !el.offsetParent) {
        // offsetParent is null for display:none ancestors — and also for
        // position:fixed elements, so those are re-admitted below.
        if (style.position !== 'fixed' && getComputedStyle(el.parentElement).position !== 'fixed')
          continue
      }
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.left >= vw || r.right <= 0) continue
      const bottom = Math.round(r.bottom)
      if (best === null || bottom < best.bottom)
        best = { bottom, label: (el.textContent || '').trim().slice(0, 28) }
    }
    return best
  })

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
}

function serve() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0])
      if (p.endsWith('/')) p += 'index.html'
      const file = join(DIST, p)
      try {
        await stat(file)
        res.writeHead(200, {
          'Content-Type': MIME[file.slice(file.lastIndexOf('.'))] ?? 'application/octet-stream',
        })
        createReadStream(file).pipe(res)
      } catch {
        res.writeHead(404).end('not found')
      }
    })
    server.listen(PORT, () => resolve(server))
  })
}

async function main() {
  let chromium
  try {
    ;({ chromium } = await import('playwright'))
  } catch {
    console.warn('⚠ playwright not installed — skipping viewport audit.')
    return
  }

  const server = await serve()
  let browser
  try {
    browser = await chromium.launch()
  } catch (err) {
    console.warn(`⚠ could not launch Chromium (${err.message.split('\n')[0]}) — skipping.`)
    server.close()
    return
  }

  const failures = []

  for (const target of TARGETS) {
    console.log(`\n${target.label} — ${target.url}`)
    for (const v of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: v.w, height: v.h } })
      await page.goto(`http://localhost:${PORT}${target.url}`, { waitUntil: 'networkidle' })
      const best = await measureCta(page)

      // Second, stricter assertion, desktop only: the hero's own in-flow CTA
      // must also clear the fold. The check above is satisfied by the header's
      // phone button, which would let the hero silently regress to the exact
      // bug this file was written for. On phones the hero CTA legitimately sits
      // below the fold — the fixed bottom bar covers that case.
      // Queried through evaluate rather than a Playwright locator: a locator
      // whose selector matches nothing blocks for its full 30s timeout before
      // resolving, and the hero selector legitimately matches nothing on the
      // generated landing pages — which turned a 20-second audit into a
      // five-minute one. A DOM query returns null immediately.
      let heroBottom = null
      if (v.w >= 1024) {
        heroBottom = await page.evaluate(() => {
          const scope = document.querySelector('#top') ?? document.querySelector('.cta-row')
          if (!scope) return null
          const el = scope.querySelector('a[href*="wa.me"]')
          if (!el) return null
          return Math.round(el.getBoundingClientRect().bottom)
        })
        if (heroBottom !== null && heroBottom > v.h)
          failures.push(
            `${target.label} @ ${v.w}×${v.h}: HERO CTA ${heroBottom - v.h}px below fold`,
          )
      }

      await page.close()

      if (!best) {
        console.log(`  ${v.label}  ✗ no call or WhatsApp button found at all`)
        failures.push(`${target.label} @ ${v.w}×${v.h}: no CTA found`)
        continue
      }
      const ok = best.bottom <= v.h
      const heroNote =
        heroBottom === null
          ? ''
          : `  hero CTA ${String(heroBottom).padStart(4)}px ${heroBottom <= v.h ? '✓' : '✗'}`
      console.log(
        `  ${v.label}  CTA "${best.label}" ends ${String(best.bottom).padStart(4)}px / ${v.h}px  ${
          ok ? '✓' : `✗ below fold by ${best.bottom - v.h}px`
        }${heroNote}`,
      )
      if (!ok)
        failures.push(`${target.label} @ ${v.w}×${v.h}: CTA ${best.bottom - v.h}px below fold`)
    }
  }

  await browser.close()
  server.close()

  if (failures.length) {
    console.error(`\n✗ ${failures.length} viewport failure(s):`)
    failures.forEach((f) => console.error(`   ${f}`))
    process.exit(1)
  }
  console.log('\n✓ viewport audit passed — every CTA is above the fold\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
