import { Phone, MessageCircle, MapPin, Clock, User, Navigation } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import { CONTACT, fmtPhone, waLink, WA_DEFAULT } from '../data/site.js'

/**
 * Contact block: address, hours, map, and the shop-front photograph.
 *
 * The photograph matters as much as the map. Vartak Nagar addresses are hard to
 * follow, and a customer who has seen the signboard will recognise the shop
 * from the road — which is also why the landmarks ("near Mane H.P. Gas Godown
 * and Thirani School") stay in the address exactly as they are on the board and
 * in the Google Business Profile.
 */
export default function Contact() {
  const rows = [
    {
      icon: MapPin,
      label: 'Address',
      value: CONTACT.addressLines.join(' '),
    },
    { icon: Clock, label: 'Open', value: CONTACT.hours },
    { icon: User, label: 'Ask for', value: CONTACT.proprietor },
  ]

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Visit us</p>
          <h2 className="h-section mt-4 max-w-2xl text-balance">
            Come and go through the fabric books
          </h2>
          <p className="prose-body mt-5 max-w-2xl text-pretty">
            Walk in any day and see the materials in person — or call and we will
            bring the books to your home instead. Both cost nothing.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card overflow-hidden">
              <Photo
                name="gouri-mattresses-furnishing-shop-vartak-nagar-thane"
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="aspect-[16/10] w-full object-cover"
              />

              <div className="p-7">
                <dl className="space-y-5">
                  {rows.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-4">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-wash text-teal">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                          {label}
                        </dt>
                        <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-primary">
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
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card h-full overflow-hidden">
              <iframe
                src={CONTACT.mapEmbed}
                title="Map showing Gouri Mattresses & Furnishing, Pokhran Road No. 1, Vartak Nagar, Thane West"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full min-h-[26rem] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
