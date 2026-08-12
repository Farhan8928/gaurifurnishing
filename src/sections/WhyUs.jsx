import Photo from '../components/Photo.jsx'
import { WHY_US } from '../data/faqs.js'

/**
 * Why choose this shop over the twenty other furnishing galas in Thane.
 *
 * Set as a plain numbered list against a photograph, with no icons at all. The
 * previous version put a thin-line icon in a tinted circle above every heading,
 * six times — a pattern that adds no information and is one of the clearest
 * signatures of a generated page. These are arguments; they are made of words.
 *
 * Every claim here is one a customer could check by phoning the shop.
 */
export default function WhyUs() {
  return (
    <section id="why-us" className="bg-navy py-16 text-paper lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span aria-hidden="true" className="rule-mark" />
          <h2 className="h-section text-balance">A workshop, not a showroom counter</h2>
          <p className="mt-5 text-lg leading-relaxed text-paper/70 text-pretty">
            Most furnishing shops take your order and send it out to whoever is
            cheapest that week. We cut, stitch and upholster on Pokhran Road
            ourselves — which is why we can build to an odd size, and why there
            is one person to hold responsible if something is off.
          </p>

          <figure className="mt-8">
            <Photo
              name="sofa-cum-bed-teal-workshop-build"
              sizes="(max-width: 1024px) 92vw, 34vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="mt-2 text-sm text-paper/50">
              A sofa cum bed part-built on our own workshop floor.
            </figcaption>
          </figure>
        </div>

        <ol className="lg:pt-2">
          {WHY_US.map((item, i) => (
            <li
              key={item.title}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-paper/15 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[3.5rem_1fr] lg:py-7"
            >
              <span
                aria-hidden="true"
                className="font-display text-xl font-extrabold leading-none text-sunflower sm:text-2xl"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl leading-snug sm:text-2xl">{item.title}</h3>
                <p className="mt-2.5 max-w-[36rem] leading-relaxed text-paper/70 text-pretty">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
