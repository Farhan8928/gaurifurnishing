/**
 * Prerenders the homepage into dist/index.html.
 *
 * The site is a React SPA, which means the served HTML is an empty <div id="root">
 * until JavaScript runs. Google will usually render it anyway, but "usually" is
 * doing a lot of work in that sentence — and Bing, the AI crawlers and WhatsApp's
 * link preview fetcher mostly will not. Baking the rendered markup into the
 * shipped HTML means every crawler sees the real content on the first request.
 *
 * React still hydrates over the top, so the page stays fully interactive.
 *
 * If Playwright's browser is not installed the build continues with a warning
 * rather than failing — the site works either way, it is just less crawlable,
 * and a broken deploy would be worse.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import { stat } from 'node:fs/promises'
import { createReadStream } from 'node:fs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const PORT = 4179

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

/** Minimal static file server over dist/, just for the prerender pass. */
function serve() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let path = decodeURIComponent(req.url.split('?')[0])
      if (path.endsWith('/')) path += 'index.html'
      const file = join(DIST, path)
      try {
        await stat(file)
        const ext = file.slice(file.lastIndexOf('.'))
        res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' })
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
    console.warn('⚠ playwright not installed — skipping prerender (site still builds).')
    return
  }

  const server = await serve()
  let browser
  try {
    browser = await chromium.launch()
  } catch (err) {
    console.warn(`⚠ could not launch Chromium (${err.message.split('\n')[0]}) — skipping prerender.`)
    console.warn('  Run "npx playwright install chromium" to enable it.')
    server.close()
    return
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
  // The gallery is the last thing to settle; wait for it rather than a fixed delay.
  await page.waitForSelector('#work img', { timeout: 15000 }).catch(() => {})

  const rendered = await page.evaluate(() => document.getElementById('root').innerHTML)
  await browser.close()
  server.close()

  const indexPath = join(DIST, 'index.html')
  const html = await readFile(indexPath, 'utf8')

  if (!rendered || rendered.length < 2000) {
    console.warn('⚠ prerender produced suspiciously little markup — leaving index.html as built.')
    return
  }

  const out = html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`)
  await writeFile(indexPath, out, 'utf8')

  console.log(`✓ prerendered homepage (${(rendered.length / 1024).toFixed(0)} kB of markup)`)
}

main().catch((err) => {
  console.warn('⚠ prerender failed, continuing:', err.message)
})
