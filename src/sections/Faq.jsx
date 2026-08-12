import { FAQS } from '../data/faqs.js'

/**
 * FAQ.
 *
 * Native <details> rather than a JavaScript accordion, for three reasons: it
 * works before React hydrates, screen readers already know what it is, and the
 * answer text is in the DOM for crawlers even while collapsed — which is the
 * whole point, since this content is mirrored into the FAQPage JSON-LD and is
 * what feeds AI Overviews and voice answers.
 */
export default function Faq() {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span aria-hidden="true" className="rule-mark" />
          <h2 className="h-section text-balance">Things people ask before they call</h2>
          <p className="prose-body mt-5 text-pretty">
            If yours is not here, ask on WhatsApp — Firoz answers the number
            himself.
          </p>
        </div>

        <div>
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group border-t border-navy/15 py-5 last:border-b last:border-navy/15"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.02em] sm:text-xl">
                  {faq.q}
                </h3>
                {/* A plain rotating bar, not a circled icon. */}
                <span
                  aria-hidden="true"
                  className="relative mt-2 h-[3px] w-4 shrink-0 bg-red transition-transform duration-200 group-open:rotate-180"
                >
                  <span className="absolute inset-0 bg-red transition-transform duration-200 group-open:opacity-0 [transform:rotate(90deg)]" />
                </span>
              </summary>
              <p className="mt-3 max-w-[44rem] leading-relaxed text-navy/75 text-pretty">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
