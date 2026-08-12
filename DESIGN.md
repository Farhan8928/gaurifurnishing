# Design direction — Gouri Mattresses & Furnishing

This file exists because the first version of this site looked machine-made, and
the client said so. Every decision below is written down specifically so the
design cannot drift back toward the statistical average of every landing page on
the internet. If you are adding a section, follow this document rather than your
instinct about "what a website looks like" — that instinct is the problem.

---

## The concept: printed, not rendered

The shop's own signboard is the brief. Navy and red poster lettering, a yellow
rule, Marathi and English side by side, real photographs of real work, hand-cut
and hung outside a gala on Pokhran Road.

The site should feel like **that board and a tailor's swatch book** — flat colour,
hard edges, heavy type, big photographs. It should not feel like a software
product's landing page, because this is not a software product; it is a
workshop where a man called Firoz cuts fabric to your window.

**Test before shipping any section:** could this section, unchanged, sit on a
website selling project-management software? If yes, it is wrong.

---

## Palette

Taken from the shop's own signboard and visiting card — not invented. Three
active hues, as per a 60/30/10 split, extended only by tint and shade.

| Token | Hex | Role |
|---|---|---|
| `paper` | `#F5F1E6` | Dominant surface (~60%). Never pure white. |
| `paper-deep` | `#EAE3D2` | Second surface, for banding sections without borders. |
| `navy` | `#20286E` | Dominant ink (~30%). Headlines, dark sections, body text. |
| `navy-deep` | `#161C4F` | Darkest block, footer. |
| `red` | `#E1251B` | Accent (~10%). One idea per screen, never decorative. |
| `sunflower` | `#FFC825` | The signboard's yellow rule. Underlines and markers only. |
| `whatsapp` | `#1FB658` | **Semantic, not brand.** Only ever on a WhatsApp control. |

Rules:
- No teal, no indigo-to-purple, no gradients of any kind as decoration.
- **No blurred colour orbs.** Ever. This is the single loudest AI tell.
- Red is for one thing per screen. If two things are red, neither is important.

## Typography

Deliberately the inverse of the default pairing (serif display + Inter body),
because that pairing is the most-produced combination on the web.

- **Display — `Archivo`, 700/800, tracking `-0.03em`.** A sturdy industrial
  grotesque. Set tight and heavy so headlines read like the painted signboard.
- **Body — `Newsreader`, 400/500, serif.** Warmth and readability; carries the
  long service descriptions without feeling like UI text.
- **No Inter, Poppins, Space Grotesk, Geist, or Fraunces.**
- Hierarchy comes from weight and size within these two families. Never add a
  third family.
- Scale ×1.333 (editorial). Body 17px minimum, measure 60–75 characters.

## Shape and surface

- **Radius: 2px on inputs and buttons, 0 elsewhere.** No `rounded-2xl`, no pill
  buttons. Printed things have corners.
- **No decorative 1px grey borders.** Separate content with whitespace first,
  then a background shift, then — rarely — a 2px navy or yellow rule that means
  something.
- **No card shadows.** Photographs sit flat on the paper.
- Subtle paper grain over the page. It is a furnishing brand; the surface should
  have texture.

## Layout

- **Never three equal cards in a row.** Services are an editorial list of
  alternating asymmetric rows — photograph on one side, a large index number
  and text on the other, sides swapping down the page.
- **Vary the vertical rhythm.** Hero, content and closing sections must not
  share the same padding. Some sections are full-bleed, some are inset.
- **No repeated all-caps eyebrow above every heading.** A section may carry a
  small index number and a yellow rule; most need nothing.
- **No icon-in-a-circle above headings.** Icons are functional only — phone,
  WhatsApp, arrow, close, menu. If an icon is decorating a heading, delete it.

## Motion

- No uniform fade-and-rise on every section. That reads as a template.
- Motion is reserved for things that genuinely change: the gallery lightbox, the
  sticky bar sliding in, hover on a photograph.
- Everything respects `prefers-reduced-motion`, and no content is ever hidden by
  default without a scripted fallback that reveals it (see `Reveal.jsx`).

## Copy

- Say the specific true thing, not the impressive-sounding thing. "We re-web the
  base and replace the foam" beats "premium restoration solutions".
- No "we don't just X, we Y". No "elevate", "seamless", "curated", "bespoke
  solutions", "transform your space".
- Prices: never invent one. Explain what the price depends on.
- Ratings and years in business: only if the client has confirmed the number.
  See `RATING` and `TRUST_STATS` in `src/data/site.js`.
