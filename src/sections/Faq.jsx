import { Plus } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { FAQS } from '../data/faqs.js'

/**
 * FAQ.
 *
 * Rendered as native <details> rather than a JS accordion, for three reasons:
 * it works before React hydrates, screen readers already know what it is, and
 * the answer text is in the DOM for crawlers even while collapsed — which is
 * the whole point, since this content is mirrored into the FAQPage JSON-LD and
 * is what feeds AI Overviews and voice answers.
 */
export default function Faq() {
  return (
    <section id="faq" className="border-y border-ink/10 bg-linen-deep py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="h-section mt-4 text-balance">Things people ask before they call</h2>
          <p className="prose-body mt-5 text-pretty">
            If yours is not here, ask on WhatsApp — Firoz answers the number
            himself.
          </p>
        </Reveal>

        <Reveal>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                    {faq.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/15 text-ink-soft transition group-open:rotate-45 group-open:border-teal group-open:bg-teal group-open:text-linen"
                  >
                    <Plus size={15} />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
