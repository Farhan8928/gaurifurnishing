/**
 * Catches Tailwind classes that silently generate no CSS.
 *
 * This exists because of a bug that shipped. The gallery lightbox was styled
 * `bg-navy-deep/97`, and 97 is not a value Tailwind emits — so the class
 * produced *nothing*. No build error, no console warning, no red squiggle. The
 * overlay was simply invisible: the page showed straight through it, the white
 * caption sat unreadable on top of a photograph, and the close button could not
 * be seen at all. The only way to notice was to open the lightbox and look.
 *
 * A typo'd Tailwind class is indistinguishable from a deliberate one in the
 * source, and the failure is always silent and always visual. So this checks
 * the two families where a wrong value is both easy to write and invisible in
 * review — colour-opacity modifiers (`text-navy/55`) and arbitrary values
 * (`text-[2.3rem]`) — by confirming each one actually appears in the compiled
 * stylesheet.
 *
 * Runs as part of `npm run build`, after Vite has produced dist/assets/*.css.
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const ASSETS = join(ROOT, 'dist', 'assets')

async function jsxFiles(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await jsxFiles(full, acc)
    else if (entry.name.endsWith('.jsx')) acc.push(full)
  }
  return acc
}

/** Tailwind escapes `/`, `.`, `[`, `]`, `%` and friends in generated selectors. */
const escapeForCss = (cls) => cls.replace(/([./[\]%(),:#])/g, '\\$1')

async function main() {
  const cssFiles = (await readdir(ASSETS)).filter((f) => f.endsWith('.css'))
  if (!cssFiles.length) {
    console.error('✗ css-audit: no stylesheet in dist/assets — run vite build first.')
    process.exit(1)
  }
  const css = (
    await Promise.all(cssFiles.map((f) => readFile(join(ASSETS, f), 'utf8')))
  ).join('\n')

  const files = await jsxFiles(SRC)
  const missing = new Map()

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    const name = file.slice(ROOT.length + 1).replace(/\\/g, '/')

    // Only look inside className strings, so prose and URLs are not scanned.
    for (const attr of source.match(/className=(?:"[^"]*"|{`[^`]*`})/g) ?? []) {
      const classes = attr.replace(/className=|["{}`]/g, '').split(/\s+/)

      for (const raw of classes) {
        // Strip variants (`lg:`, `hover:`, `short:lg:`) and the `!` important flag.
        const cls = raw.split(':').pop().replace(/^!/, '')
        if (!cls) continue

        // Template-literal interpolation leaves fragments — skip them.
        if (cls.includes('$') || cls.includes('?')) continue

        const isOpacity = /^[a-z-]+-[a-z0-9-]+\/\d+$/.test(cls)
        const isArbitrary = /\[[^\]]+\]/.test(cls)
        if (!isOpacity && !isArbitrary) continue

        if (!css.includes(escapeForCss(cls))) {
          if (!missing.has(cls)) missing.set(cls, new Set())
          missing.get(cls).add(name)
        }
      }
    }
  }

  if (missing.size) {
    console.error(`\n✗ css-audit: ${missing.size} class(es) generated no CSS:\n`)
    for (const [cls, where] of missing) {
      console.error(`   ${cls}`)
      console.error(`     used in: ${[...where].join(', ')}`)
    }
    console.error('\n   These render as nothing at all. Check the value is one')
    console.error('   Tailwind emits — colour opacities must be on the theme')
    console.error('   scale, and arbitrary values need valid CSS inside [].\n')
    process.exit(1)
  }

  console.log('✓ css-audit passed — every dynamic class compiles\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
