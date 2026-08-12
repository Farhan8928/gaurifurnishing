/**
 * The brand palette, in one place.
 *
 * This file exists because the palette used to live in two: `tailwind.config.js`
 * for the site, and hard-coded hexes inside `scripts/make-brand-assets.mjs` for
 * the favicon, the PWA icons and the Open Graph card. When the design was
 * reworked from teal to the signboard's navy and red, the site changed and the
 * brand assets silently did not — the tab icon, the Android splash screen and
 * every WhatsApp link preview kept showing colours the site no longer used.
 * Nothing failed; they just quietly stopped matching.
 *
 * Both the Tailwind theme and the asset generator now import from here, so a
 * colour can only be changed in one place. The reasoning behind the choices is
 * in DESIGN.md — these values are transcribed from the shop's own signboard.
 */
export const BRAND = {
  /** Dominant surface (~60%). Never pure white. */
  paper: '#f5f1e6',
  paperDeep: '#eae3d2',
  paperDark: '#ddd3bc',

  /** Dominant ink (~30%). Headlines, dark sections, body text. */
  navy: '#20286e',
  navyDeep: '#161c4f',
  navySoft: '#4b5290',
  navyFaint: '#8085ad',

  /** Accent (~10%). One idea per screen, never decorative. */
  red: '#e1251b',
  redDeep: '#b81c14',

  /** The signboard's yellow rule. Underlines and markers only. */
  sunflower: '#ffc825',
  sunflowerDeep: '#e0a900',

  /** Semantic, deliberately outside the brand palette. WhatsApp controls only. */
  whatsapp: '#1fb658',
}

/**
 * Colours that must also appear in `public/site.webmanifest` and the browser
 * theme-color meta tag. Kept as named exports so the build can assert on them.
 */
export const THEME_COLOR = BRAND.paper
export const BACKGROUND_COLOR = BRAND.paper
