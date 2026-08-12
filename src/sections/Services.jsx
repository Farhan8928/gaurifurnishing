import { ArrowRight, Check } from 'lucide-react'
import { iconFor } from '../components/icons.js'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import { SERVICES } from '../data/services.js'
import { waLink, WA_DEFAULT } from '../data/site.js'

/**
 * The six things the shop makes.
 *
 * Each card links through to its own generated landing page — that page is what
 * ranks for "sofa repair in Thane", and this grid is the internal link that
 * makes Google find it. The photograph on each card is the shop's own work for
 * that exact service, which is the whole argument for choosing them.
 */
export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">What we make</p>
          <h2 className="h-section mt-4 max-w-2xl text-balance">
            Six things, all made on Pokhran Road
          </h2>
          <p className="prose-body mt-5 max-w-2xl text-pretty">
            Nothing here is bought in and resold. It is measured at your home,
            cut and stitched in our workshop, and fitted by the same people who
            made it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = iconFor(service.icon)
            return (
              <Reveal key={service.slug} delay={i * 0.05}>
                <article className="card-hover group flex h-full flex-col overflow-hidden">
                  <div className="overflow-hidden">
                    <Photo
                      name={service.image}
                      sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 31vw"
                      className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-teal-wash text-teal">
                      <Icon size={18} aria-hidden="true" />
                    </span>

                    <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brass-deep">{service.tagline}</p>

                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {service.body}
                    </p>

                    <ul className="mb-6 mt-5 space-y-2">
                      {service.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-ink-soft">
                          <Check
                            size={14}
                            strokeWidth={2.5}
                            className="mt-1 shrink-0 text-teal"
                            aria-hidden="true"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>

                    {/* mt-auto pins this row to the bottom of the card, so the
                        links line up across a row whose descriptions differ in
                        length — without it the grid reads as ragged. The gap
                        above it comes from the list's mb-6, since a margin-top
                        here would override the auto. */}
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/10 pt-5">
                      <a
                        href={`/${service.slug}-thane/`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition hover:gap-2.5"
                      >
                        {service.short} in Thane
                        <ArrowRight size={15} aria-hidden="true" />
                      </a>
                      <a
                        href={waLink(`${WA_DEFAULT}${service.short.toLowerCase()}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-ink-faint transition hover:text-whatsapp"
                      >
                        Ask on WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
