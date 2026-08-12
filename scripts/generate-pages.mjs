/**
 * Writes the generated landing pages into dist/, plus sitemap.xml.
 *
 * Runs after `vite build`, so it can drop static directories alongside the
 * built SPA. Each page lands at `dist/<slug>/index.html` — the trailing-slash
 * URL form that vercel.json is configured for.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { allPages } from './seo-pages.mjs'
import { SITE_URL } from '../src/data/site.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

async function main() {
  const pages = allPages()
  const today = new Date().toISOString().slice(0, 10)

  for (const page of pages) {
    const dir = join(DIST, page.slug)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), page.html, 'utf8')
  }

  // Homepage first and at the highest priority, then the six service hubs,
  // then the long tail — priority is a weak signal but costs nothing to get right.
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
    ...pages.map((p) => ({
      loc: p.canonical,
      priority: p.slug.endsWith('-thane') ? '0.8' : '0.6',
      changefreq: 'monthly',
    })),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
  await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8')

  console.log(`✓ ${pages.length} landing pages written to dist/`)
  console.log(`✓ sitemap.xml with ${urls.length} URLs`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
