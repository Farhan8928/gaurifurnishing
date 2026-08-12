import { useEffect, useState } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { CONTACT, waLink, WA_DEFAULT } from '../data/site.js'

/**
 * The sticky call / WhatsApp bar pinned to the bottom on phones.
 *
 * Almost every enquiry this shop gets starts as a phone call or a WhatsApp
 * message, and the overwhelming majority of visitors are on a phone. Two
 * full-width thumb targets that follow the reader down the page are worth more
 * than any other single element on the site.
 *
 * It stays hidden while the hero's own Call and WhatsApp buttons are on screen.
 * Showing it immediately put two near-identical button rows within 50px of each
 * other, which reads as a mistake and wastes the bottom of the first screen.
 *
 * The trigger is those buttons themselves, not the hero as a whole. Watching
 * the whole hero looked equivalent and was not: on a small phone (360×640) the
 * hero's buttons already sit below the fold at rest, so the bar stayed hidden
 * while nothing tappable was visible — leaving that visitor with no call to
 * action at all on the first screen. Keying off the buttons means the bar is
 * hidden exactly when it would be redundant, and present whenever it would not.
 */
export default function CtaBars() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const heroCta = document.getElementById('hero-cta')

    // If the hero's buttons are missing, or the browser cannot observe them,
    // the safe default is a visible bar — never no CTA at all.
    if (!heroCta || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(heroCta)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-navy/15 bg-paper transition-transform duration-300 ease-out md:hidden ${
          shown ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-hidden={!shown}
      >
        <div className="grid grid-cols-2 gap-2 p-2.5">
          <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-red !py-3.5" tabIndex={shown ? 0 : -1}>
            <Phone size={17} aria-hidden="true" />
            Call now
          </a>
          <a
            href={waLink(`${WA_DEFAULT}my home in Thane.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !py-3.5"
            tabIndex={shown ? 0 : -1}
          >
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Reserves the height of the fixed bar so the footer is never hidden
          behind it. Kept unconditionally — by the time anyone reaches the
          footer the bar is always showing. */}
      <div aria-hidden="true" className="h-[var(--cta-bar-height)] md:h-0" />
    </>
  )
}
