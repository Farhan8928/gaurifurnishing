import { Phone, MessageCircle } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { CONTACT, fmtPhone, waLink, WA_DEFAULT } from '../data/site.js'

/**
 * Closing call to action.
 *
 * The last thing on the page before the footer should be the same two buttons
 * that were in the hero — a visitor who has scrolled the whole gallery is the
 * most likely to call, and should not have to scroll back up to do it.
 */
export default function FinalCta() {
  return (
    <section className="bg-ink py-20 text-linen lg:py-24">
      <div className="container-page text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-[2.75rem]">
            Tell us the room. We will bring the fabric to it.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-linen/70 text-pretty">
            Free measurement anywhere in Thane, a fixed price in writing, and no
            charge if you decide against it.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-primary !bg-linen !text-ink hover:!bg-linen-dark">
              <Phone size={17} aria-hidden="true" />
              Call {fmtPhone(CONTACT.phones[0])}
            </a>
            <a
              href={waLink(`${WA_DEFAULT}my home in Thane.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Message on WhatsApp
            </a>
          </div>

          <p className="mt-6 text-sm text-linen/45">
            Ask for {CONTACT.proprietor} · {CONTACT.hours}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
