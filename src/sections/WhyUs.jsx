import { iconFor } from '../components/icons.js'
import Reveal from '../components/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import { WHY_US } from '../data/faqs.js'

/**
 * Why choose this shop over the twenty other furnishing galas in Thane.
 *
 * These are differences a customer can verify, not adjectives — "we make it
 * ourselves", "the fabric book comes to your house", "we will tell you to
 * repair instead of replace". Claims that can be checked are the only ones
 * worth printing.
 */
export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-16">
          <Reveal>
            <p className="eyebrow">Why us</p>
            <h2 className="h-section mt-4 text-balance">
              A workshop, not a showroom counter
            </h2>
            <p className="prose-body mt-5 text-pretty">
              Most furnishing shops take your order and send it out to whoever
              is cheapest that week. We cut, stitch and upholster on Pokhran Road
              ourselves — which is why we can build to an odd size, and why
              there is one person to hold responsible if something is off.
            </p>

            <div className="mt-9 overflow-hidden rounded-2xl border border-ink/10 shadow-soft">
              <Photo
                name="sofa-cum-bed-teal-workshop-build"
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-ink-faint">
              A sofa cum bed part-built on our own workshop floor.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {WHY_US.map((item, i) => {
              const Icon = iconFor(item.icon)
              return (
                <Reveal key={item.title} delay={i * 0.05}>
                  <article className="card h-full p-6">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brass/10 text-brass-deep">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {item.body}
                    </p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
