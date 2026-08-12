import { Phone, MessageCircle } from 'lucide-react'
import { CONTACT, fmtPhone, waLink, WA_DEFAULT } from '../data/site.js'

/**
 * Closing call to action.
 *
 * Left-aligned against a large photograph-free navy block, not a centred
 * three-line stack — centred hero-style closers are the default shape and this
 * page has already used a centred composition nowhere else, so a centred one
 * here would be the only symmetric moment on the site.
 */
export default function FinalCta() {
  return (
    <section className="bg-navy-deep py-16 text-paper lg:py-20">
      <div className="container-page grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
        <div>
          <span aria-hidden="true" className="rule-mark" />
          <h2 className="text-3xl leading-[1.05] text-balance sm:text-4xl lg:text-[3.1rem]">
            Tell us the room.
            <br />
            We will bring the fabric to it.
          </h2>
        </div>

        <div>
          <p className="text-lg leading-relaxed text-paper/70 text-pretty">
            Free measurement anywhere in Thane, a fixed price in writing, and no
            charge if you decide against it.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-red">
              <Phone size={16} aria-hidden="true" />
              {fmtPhone(CONTACT.phones[0])}
            </a>
            <a
              href={waLink(`${WA_DEFAULT}my home in Thane.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </a>
          </div>

          <p className="mt-5 text-sm text-paper/45">
            Ask for {CONTACT.proprietor} · {CONTACT.hours}
          </p>
        </div>
      </div>
    </section>
  )
}
