import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import { CONTACT, fmtPhone, waLink, WA_DEFAULT } from '../data/site.js'
import { SERVICE_LINKS, AREA_LINKS } from '../data/services.js'

/**
 * Footer.
 *
 * Beyond the obvious contact block, this is where the homepage passes link
 * equity to the generated `/service-area/` landing pages — those pages exist to
 * rank, and an orphan page with no internal link pointing at it will not.
 * Keep the two link lists in sync with scripts/seo-pages.mjs.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/10 bg-ink text-linen/80">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-linen">
            Gouri Mattresses &amp; Furnishing
          </p>
          <p className="mt-1 text-sm text-linen/50">{CONTACT.nameMarathi}</p>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-linen/70">
            Curtains, blinds, sofas, mattresses and upholstered headboards — made
            to order in our own workshop on Pokhran Road and fitted across Thane.
          </p>

          <address className="mt-6 space-y-3 not-italic text-sm">
            <span className="flex gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
              <span className="text-linen/70">
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </span>
            <span className="flex gap-3">
              <Clock size={17} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
              <span className="text-linen/70">{CONTACT.hours}</span>
            </span>
            <span className="flex gap-3">
              <Phone size={17} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
              <a href={`tel:+91${CONTACT.phones[0]}`} className="text-linen hover:text-brass">
                {fmtPhone(CONTACT.phones[0])}
              </a>
            </span>
          </address>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-primary !px-5 !py-3">
              <Phone size={16} aria-hidden="true" />
              Call {CONTACT.proprietor}
            </a>
            <a
              href={waLink(`${WA_DEFAULT}my home in Thane.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !px-5 !py-3"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">
            What we make
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-linen/70 transition hover:text-linen">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-areas">
          <h2 id="footer-areas" className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">
            Areas we cover
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {AREA_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-linen/70 transition hover:text-linen">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-linen/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-linen/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Gouri Mattresses &amp; Furnishing · Proprietor {CONTACT.proprietor} · Vartak
            Nagar, Thane (W)
          </p>
          <p>All photographs on this site are of our own work.</p>
        </div>
      </div>
    </footer>
  )
}
