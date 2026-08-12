import { Phone, MessageCircle, Check, MapPin } from 'lucide-react'
import Photo from '../components/Photo.jsx'
import { CONTACT, HERO_POINTS, RATING, waLink, WA_DEFAULT } from '../data/site.js'

/**
 * Above the fold.
 *
 * The layout is driven by one hard constraint: on a phone, the photograph has
 * to be in the first screen. The original version put a headline, a six-line
 * paragraph and four bullet points first, which pushed the photo to 999px on a
 * 390×844 screen — completely invisible, so the opening impression of a
 * furnishing business was a wall of text. For a trade sold entirely on how the
 * work looks, that is backwards, and the client rightly rejected it.
 *
 * So the DOM order is: what this is (eyebrow + headline) → what it looks like
 * (photograph) → why (copy) → how to act (buttons). That order reads correctly
 * on a phone top-to-bottom, and the grid placement classes rearrange it into
 * the two-column split at `lg`, where the photo sits beside the copy instead of
 * between its parts. One `<img>` serves both — no duplicate markup, no second
 * download, no competing `<h1>`.
 *
 * The photo is deliberately reflowed above the text on mobile rather than used
 * as a full-bleed background with text over it: these are bright, pale interior
 * photographs, and white type over pale curtains needs a scrim heavy enough to
 * ruin the very thing it is showing.
 */
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[4.5rem]">
      {/* Soft wash behind the copy so the linen page does not read flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-teal-wash blur-3xl"
      />

      <div className="container-page relative grid items-center gap-y-6 pb-10 pt-6 short:pt-4 lg:grid-cols-[1.05fr_1fr] lg:gap-x-16 lg:gap-y-0 lg:py-16 short:lg:py-9">
        {/* ── 1. What this is ─────────────────────────────────────────── */}
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow">
            <MapPin size={13} aria-hidden="true" />
            Vartak Nagar, Thane (W)
          </p>

          <h1 className="mt-3 font-display text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:mt-5 lg:text-[3.4rem] short:lg:text-[2.5rem] xl:text-[3.9rem] short:xl:text-[2.7rem]">
            Curtains, sofas and blinds
            <span className="block text-teal">made for your room.</span>
          </h1>
        </div>

        {/* ── 2. What it looks like ───────────────────────────────────── */}
        {/* Full-bleed on phones via negative margins; a rounded card at lg. */}
        <div className="relative -mx-5 sm:-mx-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0">
          <div className="overflow-hidden lg:rounded-[1.75rem] lg:border lg:border-ink/10 lg:shadow-lift">
            <Photo
              name="curtains-peach-sheer-layered-living-room-thane"
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="h-[40vh] max-h-[22rem] min-h-[14rem] w-full object-cover lg:aspect-[4/3] lg:h-auto lg:max-h-none"
            />
          </div>

          {/* Proof the shop is real, sitting on the photograph. */}
          <figure className="absolute bottom-3 left-3 w-32 overflow-hidden rounded-xl border-2 border-linen shadow-lift sm:w-40 lg:-bottom-8 lg:-left-10 lg:w-52 lg:border-4">
            <Photo
              name="gouri-mattresses-furnishing-shop-vartak-nagar-thane"
              sizes="(max-width: 640px) 33vw, 13rem"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="bg-ink px-2 py-1.5 text-[0.55rem] font-medium uppercase tracking-wider text-linen/70 sm:text-[0.65rem] lg:px-3 lg:py-2">
              Our shop
              <span className="hidden sm:inline"> · Pokhran Rd 1</span>
            </figcaption>
          </figure>
        </div>

        {/* ── 3. Why, and 4. how to act ───────────────────────────────── */}
        {/* flex only at lg, because that is the sole reason it exists: the
            `order` utilities below need a flex parent to have any effect, and
            on mobile the plain DOM order is already the order we want. */}
        <div className="lg:col-start-1 lg:row-start-2 lg:flex lg:flex-col">
          <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft text-pretty lg:mt-6 lg:text-lg short:lg:mt-4 short:lg:text-base">
            Measured at your home, made in our own workshop on Pokhran Road, and
            fitted by us. Old sofas repaired and re-covered too.
          </p>

          {/* Buttons come before the detail list on phones — a visitor who is
              already convinced should not have to scroll past four bullets to
              find the phone number. At lg the list reads first, as usual. */}
          {/* Side by side rather than stacked on phones: stacking cost 58px of
              vertical space and pushed the second button underneath the fixed
              bottom bar, where it was invisible. The WhatsApp label shortens on
              small screens so both still fit on one row. */}
          {/* id is load-bearing: CtaBars watches this row and only slides the
              sticky bottom bar up once these buttons are off screen. */}
          <div
            id="hero-cta"
            className="mt-5 flex flex-wrap gap-2.5 lg:order-2 lg:mt-8 short:lg:mt-6"
          >
            <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-primary !px-5 sm:!px-6">
              <Phone size={17} aria-hidden="true" />
              Call 93265 44812
            </a>
            <a
              href={waLink(`${WA_DEFAULT}my home in Thane.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !px-5 sm:!px-6"
            >
              <MessageCircle size={17} aria-hidden="true" />
              <span className="sm:hidden">Free visit</span>
              <span className="hidden sm:inline">Free measurement on WhatsApp</span>
            </a>
          </div>

          <ul className="mt-7 space-y-2.5 lg:order-1 lg:mt-8 lg:space-y-3 short:lg:mt-5 short:lg:space-y-2">
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[0.9375rem] text-ink-soft">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-wash text-teal">
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          {RATING.showRating && (
            <p className="mt-6 text-sm text-ink-faint lg:order-3">
              <strong className="text-ink">{RATING.score}★</strong> from {RATING.count} Google
              reviews
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
