import { Phone, MessageCircle, Navigation } from 'lucide-react'
import Photo from '../components/Photo.jsx'
import { CONTACT, fmtPhone, waLink, WA_DEFAULT } from '../data/site.js'

/**
 * Contact: address, hours, map, and the shop-front photograph.
 *
 * The photograph matters as much as the map. Vartak Nagar addresses are hard to
 * follow, and a customer who has seen the signboard will recognise the shop from
 * the road — which is also why the landmarks ("near Mane H.P. Gas Godown and
 * Thirani School") stay in the address exactly as they appear on the board and
 * in the Google Business Profile. NAP consistency is a ranking factor, and this
 * block is the canonical copy of it on the page.
 */
export default function Contact() {
  const rows = [
    ['Address', CONTACT.addressLines.join(' ')],
    ['Open', CONTACT.hours],
    ['Ask for', CONTACT.proprietor],
    ['Phone', fmtPhone(CONTACT.phones[0])],
  ]

  return (
    <section id="contact" className="border-t-2 border-navy/10 py-16 lg:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span aria-hidden="true" className="rule-mark" />
          <h2 className="h-section text-balance">Come and go through the fabric books</h2>
          <p className="prose-body mt-5 text-pretty">
            Walk in any day and see the materials in person — or call and we will
            bring the books to your home instead. Both cost nothing.
          </p>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-2">
          <div>
            <Photo
              name="gouri-mattresses-furnishing-shop-vartak-nagar-thane"
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="aspect-[16/10] w-full object-cover"
            />

            <dl className="mt-8">
              {rows.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-navy/15 py-3.5 first:border-t-0 first:pt-0"
                >
                  <dt className="font-display text-[0.7rem] font-bold uppercase tracking-[0.14em] text-red">
                    {label}
                  </dt>
                  <dd className="leading-relaxed text-navy/85">{value}</dd>
                </div>
              ))}
            </dl>

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
              <a
                href={CONTACT.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Navigation size={16} aria-hidden="true" />
                Directions
              </a>
            </div>
          </div>

          <iframe
            src={CONTACT.mapEmbed}
            title="Map showing Gouri Mattresses & Furnishing, Pokhran Road No. 1, Vartak Nagar, Thane West"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full min-h-[24rem] w-full border-0 lg:min-h-full"
          />
        </div>
      </div>
    </section>
  )
}
