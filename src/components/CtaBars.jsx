import { Phone, MessageCircle } from 'lucide-react'
import { CONTACT, waLink, WA_DEFAULT } from '../data/site.js'

/**
 * The sticky call / WhatsApp bar pinned to the bottom on phones.
 *
 * Almost every enquiry this shop gets starts as a phone call or a WhatsApp
 * message, and the overwhelming majority of visitors will be on a phone. Two
 * full-width thumb targets that follow the user down the page are worth more
 * than any other single element on the site.
 *
 * The spacer below it keeps the footer clear of the bar.
 */
export default function CtaBars() {
  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-linen/95 backdrop-blur-md md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid grid-cols-2 gap-2 p-2.5">
          <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-primary !py-3.5">
            <Phone size={17} aria-hidden="true" />
            Call now
          </a>
          <a
            href={waLink(`${WA_DEFAULT}my home in Thane.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !py-3.5"
          >
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Reserves the height of the fixed bar so nothing hides behind it. */}
      <div aria-hidden="true" className="h-[var(--cta-bar-height)] md:h-0" />
    </>
  )
}
