/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        /**
         * Height-based breakpoint, not width-based.
         *
         * Laptops are the case that width breakpoints miss entirely. A 1080p
         * panel at Windows 125% scaling reports ~1536 CSS px wide — firmly
         * `lg`, so it gets the desktop layout — but only ~730 px tall once
         * browser chrome is subtracted, and a 768p laptop gets ~625 px. A hero
         * sized for a 1000 px-tall window pushes its call-to-action buttons
         * clean off the screen on both.
         *
         * `short:` compresses the vertical rhythm on those screens while
         * leaving taller windows with the roomier design.
         */
        short: { raw: '(max-height: 820px)' },
      },
      colors: {
        // Linen base — the whole site sits on this rather than pure white, so
        // fabric photography reads as if laid on a showroom table.
        linen: {
          DEFAULT: '#faf6ef',
          deep: '#f0e9dd',
          dark: '#e3d9c8',
        },
        // Warm charcoal — body text, borders, the dark sections.
        ink: {
          DEFAULT: '#1c1917',
          soft: '#4a443d',
          faint: '#7a7269',
        },
        // Deep teal — pulled straight from the shop's own velvet sofas and
        // upholstered headboards, which are teal in photo after photo.
        teal: {
          DEFAULT: '#0f5f5c',
          deep: '#0a4442',
          bright: '#16867f',
          wash: '#e5f0ef',
        },
        // Brass — the gold inlay on their headboards and sofa trims.
        brass: {
          DEFAULT: '#b8893f',
          deep: '#966d2d',
          light: '#e0c48a',
        },
        whatsapp: '#1fb658',
        clay: '#b4552f',
      },
      fontFamily: {
        // Fraunces is a high-contrast editorial serif — it carries the
        // "interiors magazine" register that furnishing buyers expect.
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgb(28 25 23 / 0.10), 0 8px 24px -8px rgb(28 25 23 / 0.12)',
        lift: '0 4px 12px -4px rgb(28 25 23 / 0.14), 0 18px 40px -12px rgb(28 25 23 / 0.18)',
        frame: '0 0 0 1px rgb(28 25 23 / 0.08)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
