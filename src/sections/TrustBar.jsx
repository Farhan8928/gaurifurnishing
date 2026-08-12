import { MATERIALS, TRUST_STATS } from '../data/site.js'

/**
 * A dark band under the hero carrying the headline proof points, followed by a
 * marquee of the materials the shop works in.
 *
 * The marquee is decorative but does real work: "velvet", "chenille",
 * "blackout", "zebra blind" are the words customers actually search for, and
 * seeing their own material named is what tells a visitor this shop can do
 * their specific job.
 */
export default function TrustBar() {
  return (
    <section className="mt-10 bg-ink py-12 text-linen lg:mt-16" aria-label="What we are known for">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
        {TRUST_STATS.map((s) => (
          <div key={s.label}>
            <p className="font-display text-3xl font-semibold text-linen sm:text-4xl">{s.value}</p>
            <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-linen/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-11 flex overflow-hidden border-y border-linen/10 py-4">
        {/* Two identical tracks so the loop has no visible seam. */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 animate-marquee items-center gap-8 pr-8"
          >
            {MATERIALS.map((m) => (
              <li
                key={m}
                className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.16em] text-linen/45"
              >
                {m}
                <span aria-hidden="true" className="ml-8 text-brass/60">
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
