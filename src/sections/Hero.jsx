import { Phone, MessageCircle, Check, MapPin } from 'lucide-react'
import Photo from '../components/Photo.jsx'
import { CONTACT, HERO_POINTS, RATING, fmtPhone, waLink, WA_DEFAULT } from '../data/site.js'

/**
 * Above the fold.
 *
 * The job here is to answer, within one screen on a phone: what is this, is it
 * near me, is it real, and how do I reach them. The photograph carries "what",
 * the Thane line carries "near me", the shop-front thumbnail carries "real",
 * and two thumb-sized buttons carry "how".
 */
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[4.5rem]">
      {/* A soft wash behind the copy so the linen page does not read flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-teal-wash blur-3xl"
      />

      {/* The `short:` variants below target viewport HEIGHT (≤820px), which is
          where nearly every laptop lands. Without them the two CTA buttons sit
          at ~836px and fall below the fold on a 1366×625 or 1536×730 screen —
          the buttons are the entire point of the section, so they have to be
          visible without scrolling. */}
      <div className="container-page relative grid items-center gap-12 py-14 short:py-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20 short:lg:py-9">
        <div>
          {/* Location only. A founding year would belong here and would earn
              trust — but the shop has not told us one, and a guessed date is
              exactly the kind of detail a long-standing customer would catch. */}
          <p className="eyebrow">
            <MapPin size={13} aria-hidden="true" />
            Vartak Nagar, Thane (W) · Pokhran Road No. 1
          </p>

          {/* At 2.5rem the first line fits "Curtains, sofas and blinds" on one
              line inside the narrower left column, turning a four-line heading
              into two — which is where most of the reclaimed height comes from. */}
          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-balance short:mt-3 sm:text-6xl lg:text-[3.4rem] short:lg:text-[2.5rem] xl:text-[3.9rem] short:xl:text-[2.7rem]">
            Curtains, sofas and blinds
            <span className="block text-teal">made for your room.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty short:mt-4 short:text-base">
            We measure at your home, bring the fabric books to you, and make it
            in our own workshop on Pokhran Road — curtains, blinds, sofa cum
            beds, mattresses and upholstered headboards. Old sofas repaired and
            re-covered too.
          </p>

          <ul className="mt-8 space-y-3 short:mt-5 short:space-y-2">
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-wash text-teal">
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3 short:mt-6">
            {/* The number is written without the +91 prefix here so both CTAs
                fit on one row at desktop widths — the tel: href still carries it. */}
            <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-primary">
              <Phone size={17} aria-hidden="true" />
              Call 93265 44812
            </a>
            <a
              href={waLink(`${WA_DEFAULT}my home in Thane.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Free measurement on WhatsApp
            </a>
          </div>

          {RATING.showRating && (
            <p className="mt-6 text-sm text-ink-faint">
              <strong className="text-ink">{RATING.score}★</strong> from {RATING.count} Google
              reviews
            </p>
          )}
        </div>

        {/* Two photographs: the work, and the shop that made it. */}
        <div className="relative">
          <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 shadow-lift">
            <Photo
              name="curtains-peach-sheer-layered-living-room-thane"
              priority
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <figure className="absolute -bottom-8 -left-2 w-40 overflow-hidden rounded-2xl border-4 border-linen shadow-lift sm:w-52 lg:-left-10">
            <Photo
              name="gouri-mattresses-furnishing-shop-vartak-nagar-thane"
              sizes="(max-width: 640px) 40vw, 13rem"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="bg-ink px-3 py-2 text-[0.65rem] font-medium uppercase tracking-wider text-linen/70">
              Our shop · Pokhran Rd 1
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
