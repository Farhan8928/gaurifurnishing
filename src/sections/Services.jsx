import { ArrowRight } from 'lucide-react'
import Photo from '../components/Photo.jsx'
import { SERVICES } from '../data/services.js'
import { waLink, WA_DEFAULT } from '../data/site.js'

/**
 * The six things the shop makes.
 *
 * Set as alternating full-width editorial rows rather than a grid of cards.
 * That is a deliberate reversal: three rounded cards in a row, each with a
 * thin-line icon in a circle above its heading, is the single most reproduced
 * layout on the web and the reason the first version of this page read as
 * machine-made. Rows also serve the content better — these are six substantial
 * trades with real photographs, not six feature bullets.
 *
 * Each row links to its own generated landing page, which is what ranks for
 * "sofa repair in Thane"; this list is the internal link that gets it crawled.
 */
export default function Services() {
  return (
    <section id="services" className="border-t-2 border-navy/10 py-16 lg:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span aria-hidden="true" className="rule-mark" />
          <h2 className="h-section text-balance">Six things, all made on Pokhran Road</h2>
          <p className="prose-body mt-5 text-pretty">
            Nothing here is bought in and resold. It is measured at your home,
            cut and stitched in our workshop, and fitted by the same people who
            made it.
          </p>
        </div>

        <div className="mt-14 lg:mt-20">
          {SERVICES.map((service, i) => {
            // Sides swap down the page so the eye zig-zags instead of scanning
            // a column of identical blocks.
            const flip = i % 2 === 1
            return (
              <article
                key={service.slug}
                className="grid items-center gap-y-6 border-t border-navy/15 py-10 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-x-12 lg:py-14"
              >
                <div
                  className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : 'lg:col-start-1'}`}
                >
                  <Photo
                    name={service.image}
                    sizes="(max-width: 1024px) 92vw, 40vw"
                    className="aspect-[5/4] w-full object-cover"
                  />
                </div>

                <div
                  className={`lg:col-span-6 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}
                >
                  <div className="flex items-baseline gap-4">
                    <span aria-hidden="true" className="index-num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-2xl leading-tight sm:text-[1.9rem]">{service.title}</h3>
                      <p className="mt-1 font-display text-sm font-bold uppercase tracking-[0.1em] text-red">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 max-w-[38rem] text-base leading-relaxed text-navy/75 text-pretty">
                    {service.body}
                  </p>

                  {/* Inline, comma-separated rather than a ticked list — it is
                      supporting detail, not six more things to scan. */}
                  <p className="mt-4 max-w-[38rem] text-[0.9rem] leading-relaxed text-navy/55">
                    {service.points.join(' · ')}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <a
                      href={`/${service.slug}-thane/`}
                      className="group inline-flex items-center gap-2 font-display text-sm font-bold text-navy underline decoration-sunflower decoration-[3px] underline-offset-[6px] hover:decoration-red"
                    >
                      {service.short} in Thane
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </a>
                    <a
                      href={waLink(`${WA_DEFAULT}${service.short.toLowerCase()}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-sm font-bold text-navy/50 hover:text-whatsapp"
                    >
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
