import { PROCESS } from '../data/faqs.js'
import { CONTACT } from '../data/site.js'

/**
 * From first call to fitted.
 *
 * Written as a horizontal band of prose steps rather than four numbered cards
 * in a row — that card pattern is a named signature of generated layouts, and
 * it also wastes space repeating a shape the eye has already learned.
 *
 * The point of spelling this out at all is to remove the two things that stop
 * people phoning a furnishing shop: not knowing whether the visit costs
 * anything, and fearing the price will move once the sofa is already stripped.
 */
export default function Process() {
  return (
    <section id="process" className="bg-paper-deep py-16 lg:py-24">
      <div className="container-page">
        <div className="max-w-3xl">
          <span aria-hidden="true" className="rule-mark" />
          <h2 className="h-section text-balance">
            Four steps, and you know the price before step three
          </h2>
        </div>

        {/* A single flowing row on desktop with hairline dividers, stacking on
            mobile. Numbers are typographic, not badges. */}
        <ol className="mt-12 grid gap-y-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-0">
          {PROCESS.map((step, i) => (
            <li
              key={step.step}
              className="relative sm:px-6 sm:first:pl-0 lg:px-7 lg:first:pl-0 lg:last:pr-0"
            >
              {/* Divider drawn as a border on the element rather than a rule
                  element, so it disappears cleanly at the wrap points. */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 hidden w-px bg-navy/20 sm:block"
                />
              )}
              <p className="font-display text-sm font-extrabold text-red">
                {step.step}
              </p>
              <h3 className="mt-3 text-xl leading-snug">{step.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-navy/70 text-pretty">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-12 max-w-2xl border-l-[5px] border-sunflower pl-5 text-lg leading-relaxed text-navy/80 text-pretty">
          The visit and the measurement cost nothing, and nothing is cut or
          stripped until you have agreed the price in writing. Ask for{' '}
          {CONTACT.proprietor}.
        </p>
      </div>
    </section>
  )
}
