import { Phone, MessageCircle } from 'lucide-react'
import Photo from '../components/Photo.jsx'
import { CONTACT, HERO_POINTS, RATING, waLink, WA_DEFAULT } from '../data/site.js'

/**
 * Above the fold.
 *
 * Two constraints shaped this, both learned the hard way.
 *
 * One: on a phone the photograph has to be in the first screen. An earlier
 * version led with a headline, a six-line paragraph and four bullets, which put
 * the photo at 999px on a 390×844 screen — invisible. For a trade sold entirely
 * on how the work looks, the opening impression cannot be a wall of text. So the
 * DOM order is: what this is → what it looks like → why → how to act, and the
 * grid placement classes rearrange it into a two-column split at `lg`. One
 * `<img>` serves both: no duplicate markup, no second download, no rival `<h1>`.
 *
 * Two: no blurred colour orb behind the copy, no all-caps badge above the
 * headline, no pill buttons. Those are the three loudest tells of a generated
 * page and this section had all of them. See DESIGN.md.
 */
export default function Hero() {
  return (
    <section id="top" className="relative pt-[4.5rem]">
      <div className="container-page grid items-center gap-y-7 pb-12 pt-7 short:pt-5 lg:grid-cols-[1.08fr_1fr] lg:gap-x-14 lg:gap-y-0 lg:py-16 short:lg:py-10">
        {/* ── 1. What this is ─────────────────────────────────────────── */}
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="mb-4 flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-red">
            <span aria-hidden="true" className="h-[3px] w-8 bg-red" />
            Vartak Nagar, Thane (W)
          </p>

          {/* Archivo at 800 is a wide, heavy face — it eats horizontal space
              far faster than the previous serif did, so the `short:` steps here
              are much more aggressive than they look. Sized so the headline
              lands in three lines inside the left column at every breakpoint. */}
          <h1 className="text-[2.3rem] leading-[0.98] text-balance sm:text-[2.9rem] lg:text-[3rem] short:lg:text-[2.2rem] xl:text-[3.6rem] short:xl:text-[2.5rem]">
            Curtains, sofas
            <br />
            and blinds{' '}
            <span className="relative whitespace-nowrap text-red">
              made
              {/* The signboard's yellow rule, used as an underline. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-[6px] bg-sunflower lg:-bottom-2 lg:h-[9px]"
              />
            </span>{' '}
            for your room.
          </h1>
        </div>

        {/* ── 2. What it looks like ───────────────────────────────────── */}
        {/* Full-bleed on phones via negative margins; square on the page at lg. */}
        <div className="relative -mx-5 sm:-mx-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0">
          <Photo
            name="curtains-peach-sheer-layered-living-room-thane"
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            /* The portrait crop is the nicer composition, but at lg the photo
               is the tallest thing in the row and `items-center` lets it drive
               the row height — a 4:5 crop in a 512px column is 640px tall, which
               on a 625px-high laptop pushed the buttons off screen on its own.
               Short viewports get a landscape crop instead. */
            className="h-[40vh] max-h-[22rem] min-h-[14rem] w-full object-cover lg:aspect-[4/5] lg:h-auto lg:max-h-none short:lg:aspect-[4/3]"
          />

          {/* Proof the shop is real, sitting flat on the photograph. */}
          <figure className="absolute bottom-0 left-0 w-32 sm:w-40 lg:-left-8 lg:bottom-8 lg:w-48">
            <Photo
              name="gouri-mattresses-furnishing-shop-vartak-nagar-thane"
              sizes="(max-width: 640px) 33vw, 12rem"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="bg-navy px-2 py-1.5 font-display text-[0.55rem] font-bold uppercase tracking-[0.12em] text-paper/70 sm:text-[0.6rem] lg:px-3 lg:py-2">
              Our shop
              <span className="hidden sm:inline"> · Pokhran Rd 1</span>
            </figcaption>
          </figure>
        </div>

        {/* ── 3. Why, and 4. how to act ───────────────────────────────── */}
        {/* flex only at lg, because that is the sole reason it exists: the
            `order` utilities below need a flex parent, and on mobile the plain
            DOM order is already the order we want. */}
        <div className="lg:col-start-1 lg:row-start-2 lg:flex lg:flex-col">
          <p className="max-w-[34rem] text-lg leading-relaxed text-navy/75 text-pretty lg:mt-7 short:lg:mt-4 short:lg:text-base">
            Measured at your home, made in our own workshop on Pokhran Road, and
            fitted by us. Old sofas repaired and re-covered too.
          </p>

          {/* id is load-bearing: CtaBars watches this row and only slides the
              sticky bottom bar up once these buttons are off screen. */}
          <div
            id="hero-cta"
            className="mt-6 flex flex-wrap gap-2.5 lg:order-2 lg:mt-8 short:lg:mt-6"
          >
            <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-red !px-5 sm:!px-6">
              <Phone size={16} aria-hidden="true" />
              Call 93265 44812
            </a>
            <a
              href={waLink(`${WA_DEFAULT}my home in Thane.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !px-5 sm:!px-6"
            >
              <MessageCircle size={16} aria-hidden="true" />
              <span className="sm:hidden">Free visit</span>
              <span className="hidden sm:inline">Free measurement on WhatsApp</span>
            </a>
          </div>

          {/* Plain hanging dashes rather than ticks in coloured circles. */}
          <ul className="mt-8 max-w-[34rem] space-y-2 lg:order-1 lg:mt-8 short:lg:mt-5 short:lg:space-y-1">
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex gap-3 text-[0.95rem] leading-snug text-navy/70">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-red" />
                {point}
              </li>
            ))}
          </ul>

          {RATING.showRating && (
            <p className="mt-6 text-sm text-navy/60 lg:order-3">
              <strong className="text-navy">{RATING.score}★</strong> from {RATING.count} Google
              reviews
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
