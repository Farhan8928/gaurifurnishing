import { useCallback, useEffect, useMemo, useState } from 'react'
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import { GALLERY } from '../data/gallery.gen.js'
import { CATEGORIES } from '../../scripts/image-manifest.mjs'
import { waLink, WA_DEFAULT } from '../data/site.js'

/**
 * The portfolio.
 *
 * For a furnishing business this section is the sales pitch — nobody buys
 * curtains from a bulleted list. Every photograph here is the shop's own work,
 * filterable by what the visitor actually came for, and openable full-size
 * because people want to look closely at the pleat and the stitching.
 *
 * The grid is masonry-by-columns rather than a fixed aspect ratio: these are
 * phone photos in wildly different orientations, and cropping them all to a
 * square would butcher the tall curtain shots, which are the best ones.
 */
/**
 * How many photos to show before the "show all" button.
 *
 * All 59 at once is roughly nine screens of scrolling on a phone, which buries
 * the "why us", "how it works" and contact sections underneath it. Eighteen is
 * enough to prove the range and still let someone reach the phone number.
 */
const INITIAL_COUNT = 18

export default function Work() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const [expanded, setExpanded] = useState(false)

  const matching = useMemo(
    () => (filter === 'all' ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter],
  )

  // Every matching photo is rendered into the DOM and the overflow is hidden
  // with CSS, rather than sliced out of the array. Two reasons: the markup
  // stays complete for crawlers and Google Images (these photographs, with
  // their descriptive alt text, are themselves a search surface), and a
  // display:none image is never fetched, so hiding them costs no bandwidth.
  const hidden = expanded ? 0 : Math.max(0, matching.length - INITIAL_COUNT)

  // Categories that actually have photos — no empty tabs if the manifest changes.
  const tabs = useMemo(
    () => CATEGORIES.filter((c) => c.key === 'all' || GALLERY.some((g) => g.category === c.key)),
    [],
  )

  // Arrows walk the whole filtered set, not just the visible slice — once the
  // lightbox is open, "next" should keep going past the fold.
  const step = useCallback(
    (delta) =>
      setLightbox((i) => (i === null ? null : (i + delta + matching.length) % matching.length)),
    [matching.length],
  )

  // Keyboard control for the lightbox, and lock the page behind it.
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, step])

  const active = lightbox === null ? null : matching[lightbox]

  return (
    <section id="work" className="border-y border-ink/10 bg-linen-deep py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Our work</p>
          <h2 className="h-section mt-4 max-w-2xl text-balance">
            {GALLERY.length} jobs from homes across Thane
          </h2>
          <p className="prose-body mt-5 max-w-2xl text-pretty">
            Every photograph below is our own work, in a real customer's home or
            on our workshop floor. Nothing on this page is a stock photo or a
            catalogue render.
          </p>
        </Reveal>

        {/* Category filter — horizontally scrollable on phones. */}
        <div className="no-scrollbar mt-9 -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {tabs.map((c) => {
            const isActive = filter === c.key
            const count =
              c.key === 'all' ? GALLERY.length : GALLERY.filter((g) => g.category === c.key).length
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => {
                  setFilter(c.key)
                  setExpanded(false)
                }}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'border-teal bg-teal text-linen'
                    : 'border-ink/15 bg-linen text-ink-soft hover:border-ink/35'
                }`}
              >
                {c.label}
                <span className={isActive ? 'ml-1.5 text-linen/60' : 'ml-1.5 text-ink-faint'}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* CSS columns give a masonry flow without measuring anything in JS. */}
        <div className="mt-9 gap-4 [column-count:2] sm:[column-count:2] lg:[column-count:3]">
          {matching.map((img, i) => (
            <button
              key={img.name}
              type="button"
              onClick={() => setLightbox(i)}
              className={`group mb-4 w-full break-inside-avoid overflow-hidden rounded-xl border border-ink/10 bg-linen text-left shadow-frame transition hover:shadow-lift ${
                !expanded && i >= INITIAL_COUNT ? 'hidden' : 'block'
              }`}
              aria-label={`View larger: ${img.alt}`}
            >
              <Photo
                name={img.name}
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 46vw, 31vw"
                className="w-full transition duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>

        {hidden > 0 && (
          <div className="mt-4 text-center">
            <button type="button" onClick={() => setExpanded(true)} className="btn-ghost">
              Show all {matching.length} photos
            </button>
          </div>
        )}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="flex items-center justify-between p-4 text-linen/70">
            <span className="text-sm tabular-nums">
              {lightbox + 1} / {matching.length}
            </span>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="grid h-11 w-11 place-items-center rounded-full border border-linen/20 text-linen hover:bg-linen/10"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center px-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="mr-2 hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-linen/20 text-linen hover:bg-linen/10 sm:grid"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>

            <img
              src={`/images/${active.name}.webp`}
              width={active.width}
              height={active.height}
              alt={active.alt}
              className="max-h-full min-h-0 w-auto max-w-full rounded-lg object-contain"
            />

            <button
              type="button"
              onClick={() => step(1)}
              className="ml-2 hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-linen/20 text-linen hover:bg-linen/10 sm:grid"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div
            className="flex flex-col items-center gap-3 p-4 text-center sm:flex-row sm:justify-between sm:text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="max-w-2xl text-sm leading-relaxed text-linen/70">{active.alt}</p>
            <a
              href={waLink(`${WA_DEFAULT}something like this: ${active.alt}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp shrink-0 !py-3"
            >
              <MessageCircle size={16} aria-hidden="true" />
              I want something like this
            </a>
          </div>

          {/* Thumb-friendly prev/next on phones, where the side arrows are hidden. */}
          <div className="grid grid-cols-2 gap-2 p-3 sm:hidden" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => step(-1)} className="btn-ghost !bg-transparent !text-linen">
              <ChevronLeft size={18} aria-hidden="true" /> Previous
            </button>
            <button type="button" onClick={() => step(1)} className="btn-ghost !bg-transparent !text-linen">
              Next <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
