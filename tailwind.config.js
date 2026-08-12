/**
 * Design tokens. The reasoning behind every value here is in DESIGN.md —
 * read it before adding anything, especially before adding a colour.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        /**
         * Height-based breakpoint, not width-based.
         *
         * Laptops are the case width breakpoints miss entirely. A 1080p panel
         * at Windows 125% scaling reports ~1536 CSS px wide — firmly `lg`, so
         * it gets the desktop layout — but only ~730px tall once browser chrome
         * is subtracted, and a 768p laptop gets ~625px. A hero sized for a
         * 1000px-tall window pushes its call-to-action clean off the screen.
         */
        short: { raw: '(max-height: 820px)' },
      },

      /**
       * Lifted from the shop's own signboard and visiting card: navy poster
       * lettering, a signal-red second line, a yellow rule, cream ground.
       * Three active hues. No teal, no indigo, no gradients.
       */
      colors: {
        paper: {
          DEFAULT: '#f5f1e6',
          deep: '#eae3d2',
          dark: '#ddd3bc',
        },
        navy: {
          DEFAULT: '#20286e',
          deep: '#161c4f',
          soft: '#4b5290',
          faint: '#8085ad',
        },
        red: {
          DEFAULT: '#e1251b',
          deep: '#b81c14',
        },
        sunflower: {
          DEFAULT: '#ffc825',
          deep: '#e0a900',
        },
        // Semantic, deliberately outside the brand palette — only ever used on
        // a control that opens WhatsApp.
        whatsapp: '#1fb658',
      },

      fontFamily: {
        // The inverse of the default serif-display/Inter-body pairing.
        display: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['Newsreader', 'Georgia', 'serif'],
      },

      // Printed things have corners. 2px on controls, square everywhere else.
      borderRadius: {
        none: '0',
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '3px',
        xl: '3px',
        '2xl': '4px',
        full: '9999px',
      },

      // Editorial scale, ×1.333.
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.55' }],
        base: ['1.0625rem', { lineHeight: '1.65' }],
        lg: ['1.1875rem', { lineHeight: '1.6' }],
        xl: ['1.4375rem', { lineHeight: '1.4' }],
        '2xl': ['1.75rem', { lineHeight: '1.25' }],
        '3xl': ['2.35rem', { lineHeight: '1.12' }],
        '4xl': ['3.1rem', { lineHeight: '1.05' }],
        '5xl': ['4.1rem', { lineHeight: '1.0' }],
        '6xl': ['5.5rem', { lineHeight: '0.96' }],
      },

      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
      },
    },
  },
  plugins: [],
}
