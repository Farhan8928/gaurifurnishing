import { MATERIALS, TRUST_STATS } from '../data/site.js'

/**
 * A red band of proof points under the hero, then a marquee of materials.
 *
 * The band is the one place red covers a full width — DESIGN.md allows red for
 * a single idea per screen, and this is it. The marquee reads as a swatch rail:
 * "velvet", "chenille", "blackout", "zebra blind" are the words customers
 * actually search for, and seeing their own material named is what tells a
 * visitor this shop can do their specific job.
 */
export default function TrustBar() {
  return (
    <section aria-label="What we are known for">
      <div className="bg-red text-paper">
        <div className="container-page grid grid-cols-2 gap-x-6 gap-y-7 py-9 sm:grid-cols-4 lg:py-11">
          {TRUST_STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-extrabold leading-none sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.14em] text-paper/75">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex overflow-hidden border-b-2 border-navy/10 bg-navy py-3.5">
        {/* Two identical tracks so the loop has no visible seam. */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 animate-marquee items-center gap-7 pr-7"
          >
            {MATERIALS.map((m) => (
              <li
                key={m}
                className="flex items-center gap-7 whitespace-nowrap font-display text-xs font-bold uppercase tracking-[0.18em] text-paper/55"
              >
                {m}
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-sunflower" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
