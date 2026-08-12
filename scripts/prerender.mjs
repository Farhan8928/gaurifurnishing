/**
 * Bakes the rendered React markup into dist/index.html.
 *
 * The site is a React SPA, so the shipped HTML is an empty `<div id="root">`
 * until JavaScript runs. Google will usually render it anyway, but "usually" is
 * doing a lot of work in that sentence — Bing, the AI crawlers and WhatsApp's
 * link-preview fetcher mostly will not. For a business whose links are largely
 * forwarded in WhatsApp groups, that matters.
 *
 * This originally drove a headless Chromium through Playwright. That worked on
 * a developer machine and quietly did nothing on Vercel, which has no browser
 * binary: the script caught the launch failure, warned, and let the build pass —
 * so production shipped an empty root while the local build looked perfect.
 * A warning nobody reads in CI is not a safety net.
 *
 * It now renders through `react-dom/server` against the SSR bundle Vite emits.
 * No browser, no network, no download, deterministic output, and if it breaks it
 * breaks the build instead of silently degrading.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SSR_ENTRY = join(ROOT, 'dist-ssr', 'entry-server.js')

async function main() {
  let render
  try {
    ;({ render } = await import(pathToFileURL(SSR_ENTRY).href))
  } catch (err) {
    console.error('✗ could not load the SSR bundle at dist-ssr/entry-server.js')
    console.error('  Run "npm run build:ssr" first — it is part of "npm run build".')
    console.error(`  ${err.message}`)
    process.exit(1)
  }

  const markup = render()

  // A near-empty render means something broke upstream — fail loudly rather
  // than shipping a blank page that still passes every other check.
  if (!markup || markup.length < 5000) {
    console.error(`✗ prerender produced only ${markup?.length ?? 0} chars of markup — aborting.`)
    process.exit(1)
  }

  const indexPath = join(DIST, 'index.html')
  const html = await readFile(indexPath, 'utf8')

  if (!html.includes('<div id="root"></div>')) {
    console.error('✗ dist/index.html has no empty <div id="root"></div> to fill.')
    process.exit(1)
  }

  await writeFile(indexPath, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`), 'utf8')

  console.log(`✓ prerendered homepage (${(markup.length / 1024).toFixed(0)} kB of markup)`)
}

main().catch((err) => {
  console.error('✗ prerender failed:', err)
  process.exit(1)
})
