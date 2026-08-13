/**
 * Post-build SEO gate.
 *
 * Runs last in `npm run build` and fails the build on anything that would
 * quietly cost rankings — a canonical pointing at the wrong host, a JSON-LD
 * block that no longer parses, an <img> with no alt text, a phone number that
 * drifted out of sync with src/data/site.js.
 *
 * The point is that these are all mistakes that look fine in a browser. Without
 * a check like this they ship, and nobody notices for three months.
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CONTACT, SITE_URL } from '../src/data/site.js'
import { SERVICES, AREAS } from '../src/data/services.js'
import { GALLERY } from '../src/data/gallery.gen.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

const errors = []
const warnings = []
const fail = (m) => errors.push(m)
const warn = (m) => warnings.push(m)

async function htmlFiles(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await htmlFiles(full, acc)
    else if (entry.name.endsWith('.html')) acc.push(full)
  }
  return acc
}

async function main() {
  const files = await htmlFiles(DIST)
  const rel = (f) => f.slice(DIST.length + 1).replace(/\\/g, '/')

  if (files.length < 100) warn(`only ${files.length} HTML pages in dist — expected 100+`)

  for (const file of files) {
    const raw = await readFile(file, 'utf8')
    const name = rel(file)
    // Strip HTML comments before any content check. Without this, a comment
    // that merely mentions a tag — as the explanatory comments in index.html
    // do — gets counted as that tag, and the audit reports phantom failures.
    const html = raw.replace(/<!--[\s\S]*?-->/g, '')
    // 404.html is intentionally noindex and has no canonical.
    const isErrorPage = name === '404.html'

    // ── Title & description ────────────────────────────────────────────
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
    if (!title) fail(`${name}: no <title>`)
    else if (title.length > 65) warn(`${name}: title is ${title.length} chars (Google shows ~60)`)

    const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1]
    if (!desc && !isErrorPage) fail(`${name}: no meta description`)
    else if (desc && desc.length > 165)
      warn(`${name}: meta description is ${desc.length} chars (Google shows ~160)`)

    // ── Canonical ──────────────────────────────────────────────────────
    if (!isErrorPage) {
      const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/)?.[1]
      if (!canonical) fail(`${name}: no canonical link`)
      else if (!canonical.startsWith(SITE_URL))
        fail(`${name}: canonical "${canonical}" does not start with ${SITE_URL}`)
    }

    // ── Headings ───────────────────────────────────────────────────────
    const h1s = html.match(/<h1[\s>]/g)?.length ?? 0
    if (!isErrorPage && h1s !== 1) fail(`${name}: ${h1s} <h1> tags (must be exactly 1)`)

    // ── Images ─────────────────────────────────────────────────────────
    for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
      if (!/\balt=/.test(tag)) fail(`${name}: <img> without alt — ${tag.slice(0, 90)}`)
      else if (/\balt=""/.test(tag)) warn(`${name}: <img> with empty alt`)
      if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag))
        warn(`${name}: <img> without width/height (causes layout shift)`)
    }

    // ── Structured data ────────────────────────────────────────────────
    const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? []
    if (!isErrorPage && blocks.length === 0) fail(`${name}: no JSON-LD structured data`)
    for (const block of blocks) {
      const json = block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '')
      try {
        const parsed = JSON.parse(json)
        // A rating must never appear unless the shop has genuinely earned it.
        if (JSON.stringify(parsed).includes('aggregateRating'))
          warn(`${name}: JSON-LD contains aggregateRating — only publish a real, verifiable rating`)
      } catch (e) {
        fail(`${name}: JSON-LD does not parse — ${e.message}`)
      }
    }

    // ── NAP consistency ────────────────────────────────────────────────
    if (!isErrorPage) {
      if (!html.includes(CONTACT.phones[0]))
        fail(`${name}: phone ${CONTACT.phones[0]} missing from the page`)
      if (!/400606/.test(html)) warn(`${name}: postal code 400606 not present`)
    }

    // ── Common own-goals ───────────────────────────────────────────────
    // XML namespace URIs are identifiers, not links — inline SVG icons carry
    // `xmlns="http://www.w3.org/2000/svg"` and must not trip the http check.
    const links = html.replace(/xmlns(:\w+)?="[^"]*"/g, '')
    if (/\bhttp:\/\/(?!localhost)/.test(links)) warn(`${name}: contains a plain http:// link`)
    if (/target="_blank"(?![^>]*rel=)/.test(html))
      warn(`${name}: target="_blank" without rel="noopener"`)
    if (/lorem ipsum/i.test(html)) fail(`${name}: placeholder text left in the page`)
    if (/PLACEHOLDER|TODO/.test(html)) warn(`${name}: contains TODO/PLACEHOLDER text`)
  }

  // ── Generated pages lead with a relevant, varying photograph ─────────
  //
  // Two bugs live here, both silent and both shipped once:
  //
  //   1. Adding the `mattress` gallery category did not update the catMap in
  //      seo-pages.mjs, so /mattress-thane/ opened with a quilted headboard.
  //      Nothing failed — the page was valid, just about the wrong product.
  //   2. The photo offset was `index * 2`, always even, so a primary pool with
  //      an even size never rotated: all 18 mattress area pages opened with the
  //      identical image. That is exactly the near-duplicate signature that
  //      gets a location-page grid demoted as doorway pages.
  //
  // Both are invisible without opening the pages and comparing them, so they
  // are asserted here instead.
  const categoryOf = Object.fromEntries(GALLERY.map((g) => [g.name, g.category]))
  const PRIMARY_CATEGORY = {
    curtains: 'curtains',
    blinds: 'blinds',
    'sofa-repair': 'sofas',
    'sofa-cum-bed': 'sofa-cum-bed',
    mattress: 'mattress',
    headboard: 'headboards',
  }

  for (const service of SERVICES) {
    const expected = PRIMARY_CATEGORY[service.slug]
    if (!expected) {
      warn(`no primary gallery category mapped for service "${service.slug}"`)
      continue
    }
    const poolSize = GALLERY.filter((g) => g.category === expected).length
    const leads = []

    for (const areaSlug of ['thane', ...AREAS.map((a) => a.slug)]) {
      const page = `${service.slug}-${areaSlug}`
      const html = await readFile(join(DIST, page, 'index.html'), 'utf8').catch(() => '')
      if (!html) continue

      const lead = html.match(/\/images\/([a-z0-9-]+)-800\.webp/)?.[1]
      if (!lead) {
        fail(`${page}: no gallery photograph on the page`)
        continue
      }
      leads.push(lead)
      if (categoryOf[lead] !== expected)
        fail(
          `${page}: leads with "${lead}" (${categoryOf[lead] ?? 'unknown'}), expected a ${expected} photo`,
        )
    }

    // With more than one photo available, the pages must not all show the same
    // one. Allowing a little slack: the check is that rotation happens at all.
    const distinct = new Set(leads).size
    if (poolSize > 1 && distinct < 2)
      fail(
        `${service.slug}: all ${leads.length} pages lead with the same photo despite ${poolSize} available — rotation is broken`,
      )
  }

  // ── Required files ───────────────────────────────────────────────────
  for (const required of [
    'sitemap.xml',
    'robots.txt',
    'llms.txt',
    'site.webmanifest',
    'og-image.jpg',
    'favicon.svg',
    '404.html',
    'icon-192.png',
    'icon-512.png',
  ]) {
    try {
      await stat(join(DIST, required))
    } catch {
      fail(`missing required file: dist/${required}`)
    }
  }

  // ── robots/sitemap agree with the canonical host ─────────────────────
  const robots = await readFile(join(DIST, 'robots.txt'), 'utf8').catch(() => '')
  if (robots && !robots.includes(`${SITE_URL}/sitemap.xml`))
    fail(`robots.txt does not point at ${SITE_URL}/sitemap.xml`)

  const sitemap = await readFile(join(DIST, 'sitemap.xml'), 'utf8').catch(() => '')
  const locs = sitemap.match(/<loc>([^<]+)<\/loc>/g) ?? []
  if (locs.some((l) => !l.includes(SITE_URL)))
    fail('sitemap.xml contains URLs on a different host')

  // Every sitemap URL must actually exist in dist.
  for (const loc of locs) {
    const url = loc.replace(/<\/?loc>/g, '')
    const path = url.slice(SITE_URL.length)
    const target = join(DIST, path === '/' ? 'index.html' : join(path, 'index.html'))
    try {
      await stat(target)
    } catch {
      fail(`sitemap lists ${url} but dist has no such page`)
    }
  }

  // ── Report ───────────────────────────────────────────────────────────
  console.log(`\nSEO audit — ${files.length} pages, ${locs.length} sitemap URLs`)
  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warning(s):`)
    // Warnings repeat across 100+ near-identical pages; show a sample.
    const shown = [...new Set(warnings.map((w) => w.replace(/^[^:]+:/, '…:')))].slice(0, 12)
    shown.forEach((w) => console.log(`   ${w}`))
    if (warnings.length > shown.length)
      console.log(`   …and ${warnings.length - shown.length} more of the same kinds`)
  }
  if (errors.length) {
    console.error(`\n✗ ${errors.length} error(s):`)
    ;[...new Set(errors)].slice(0, 25).forEach((e) => console.error(`   ${e}`))
    process.exit(1)
  }
  console.log('\n✓ SEO audit passed\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
