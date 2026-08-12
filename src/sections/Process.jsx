import Reveal from '../components/Reveal.jsx'
import { PROCESS } from '../data/faqs.js'

/**
 * The four steps from first call to fitted.
 *
 * The point of spelling this out is to remove the two things that stop people
 * calling a furnishing shop: not knowing whether the visit costs anything, and
 * fearing the price will move once the sofa is already stripped.
 */
export default function Process() {
  return (
    <section id="process" className="bg-teal py-20 text-linen lg:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow !text-brass-light">How it works</p>
          <h2 className="h-section mt-4 max-w-2xl !text-linen text-balance">
            Four steps, and you know the price before step three
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.07}>
              <li className="relative">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl font-semibold text-linen/20"
                >
                  {step.step}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-linen">{step.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-linen/70">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
