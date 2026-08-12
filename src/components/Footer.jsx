import { Phone, MessageCircle } from 'lucide-react'
import { CONTACT, fmtPhone, waLink, WA_DEFAULT } from '../data/site.js'
import { SERVICE_LINKS, AREA_LINKS } from '../data/services.js'

/**
 * Footer.
 *
 * Beyond the contact block, this is where the homepage passes link equity to
 * the generated `/service-area/` landing pages. Those pages exist to rank, and
 * an orphan page with no internal link pointing at it will not. Keep the two
 * link lists in sync with scripts/seo-pages.mjs.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-paper/75">
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.35fr_1fr_1fr] lg:py-16">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-paper">
            GOURI <span className="text-sunflower">Mattresses &amp; Furnishing</span>
          </p>
          <p className="mt-1 text-sm text-paper/45">{CONTACT.nameMarathi}</p>

          <p className="mt-5 max-w-sm leading-relaxed text-paper/70">
            Curtains, blinds, sofas, mattresses and upholstered headboards — made
            to order in our own workshop on Pokhran Road and fitted across Thane.
          </p>

          <address className="mt-6 not-italic leading-relaxed text-paper/70">
            {CONTACT.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-2 block">{CONTACT.hours}</span>
            <a
              href={`tel:+91${CONTACT.phones[0]}`}
              className="mt-2 block font-display font-bold text-sunflower"
            >
              {fmtPhone(CONTACT.phones[0])}
            </a>
          </address>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-red !py-3">
              <Phone size={15} aria-hidden="true" />
              Call {CONTACT.proprietor}
            </a>
            <a
              href={waLink(`${WA_DEFAULT}my home in Thane.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !py-3"
            >
              <MessageCircle size={15} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>

        <nav aria-labelledby="footer-services">
          <h2
            id="footer-services"
            className="font-display text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sunflower"
          >
            What we make
          </h2>
          <ul className="mt-5 space-y-2.5">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-paper/65 transition-colors hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-areas">
          <h2
            id="footer-areas"
            className="font-display text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sunflower"
          >
            Areas we cover
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.95rem]">
            {AREA_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-paper/65 transition-colors hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-paper/15">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-paper/40 sm:flex-row sm:items-center sm:justify-between">
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
