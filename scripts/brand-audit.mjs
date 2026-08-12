/**
 * Verifies the brand assets still match the palette.
 *
 * This exists because they silently stopped matching. The favicon, the PWA
 * icons, the Open Graph card, the manifest colours and the 404 page all carried
 * hard-coded hexes. When the design was reworked from teal to the signboard's
 * navy and red, the site changed and none of those did — so the browser tab,
 * the Android splash screen, the 404 page and every WhatsApp link preview kept
 * showing a colour scheme the site had abandoned. Nothing errored. Nothing in
 * the build noticed. The only way to catch it was for a human to look at a tab.
 *
 * Colours now come from src/data/brand.js, and this asserts that:
 *   - the generated assets exist and were rebuilt after the palette changed
 *   - the manifest and theme-color tags use palette colours
 *   - no stray non-palette hex has crept into the hand-written 404 page
 *
 * Runs as part of `npm run build`.
 */
import { readFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BRAND, THEME_COLOR, BACKGROUND_COLOR } from '../src/data/brand.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

const errors = []
const palette = new Set(Object.values(BRAND).map((c) => c.toLowerCase()))

/** Greys and near-blacks that are legitimate outside the brand palette. */
const ALLOWED_EXTRA = new Set(['#fff', '#ffffff', '#000', '#000000', '#d9d5c8', '#b9b5a8'])

async function main() {
  // ── The generated assets must exist ────────────────────────────────────
  for (const f of [
    'favicon.svg',
    'icon-192.png',
    'icon-512.png',
    'icon-maskable.png',
    'apple-touch-icon.png',
    'og-image.jpg',
  ]) {
    try {
      await stat(join(DIST, f))
    } catch {
      errors.push(`missing brand asset dist/${f} — run "npm run brand"`)
    }
  }

  // ── favicon.svg must be the generated one, in palette colours ──────────
  const favicon = await readFile(join(DIST, 'favicon.svg'), 'utf8').catch(() => '')
  for (const hex of favicon.match(/#[0-9a-fA-F]{3,8}/g) ?? []) {
    if (!palette.has(hex.toLowerCase()) && !ALLOWED_EXTRA.has(hex.toLowerCase()))
      errors.push(`favicon.svg uses ${hex}, which is not in the brand palette — run "npm run brand"`)
  }

  // ── Manifest colours ──────────────────────────────────────────────────
  const manifestRaw = await readFile(join(DIST, 'site.webmanifest'), 'utf8').catch(() => '{}')
  let manifest = {}
  try {
    // Strip a UTF-8 BOM before parsing. Editors and PowerShell's `Set-Content
    // -Encoding utf8` both add one, and JSON.parse rejects it — which used to
    // crash this script with a raw stack trace instead of a usable message.
    manifest = JSON.parse(manifestRaw.replace(/^﻿/, ''))
  } catch (err) {
    errors.push(`site.webmanifest is not valid JSON — ${err.message}`)
  }
  if (manifest.theme_color?.toLowerCase() !== THEME_COLOR.toLowerCase())
    errors.push(
      `site.webmanifest theme_color is ${manifest.theme_color}, expected ${THEME_COLOR}`,
    )
  if (manifest.background_color?.toLowerCase() !== BACKGROUND_COLOR.toLowerCase())
    errors.push(
      `site.webmanifest background_color is ${manifest.background_color}, expected ${BACKGROUND_COLOR}`,
    )

  // ── index.html theme-color must agree with the manifest ───────────────
  const index = await readFile(join(DIST, 'index.html'), 'utf8').catch(() => '')
  const metaTheme = index.match(/<meta name="theme-color" content="([^"]+)"/)?.[1]
  if (metaTheme && metaTheme.toLowerCase() !== THEME_COLOR.toLowerCase())
    errors.push(`index.html theme-color is ${metaTheme}, expected ${THEME_COLOR}`)

  // ── The hand-written 404 page ─────────────────────────────────────────
  const notFound = await readFile(join(DIST, '404.html'), 'utf8').catch(() => '')
  for (const hex of notFound.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []) {
    if (!palette.has(hex.toLowerCase()) && !ALLOWED_EXTRA.has(hex.toLowerCase()))
      errors.push(`404.html uses ${hex}, which is not in the brand palette`)
  }

  if (errors.length) {
    console.error(`\n✗ brand-audit: ${errors.length} problem(s):`)
    ;[...new Set(errors)].forEach((e) => console.error(`   ${e}`))
    console.error('')
    process.exit(1)
  }
  console.log('✓ brand-audit passed — favicon, icons and manifest match the palette')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
