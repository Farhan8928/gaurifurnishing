import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { CONTACT, NAV_LINKS, fmtPhone } from '../data/site.js'

/**
 * Fixed header. Transparent over the hero, then a solid paper bar with a navy
 * rule under it once scrolled — so the hero photograph is never cropped by a
 * band of chrome, but the links stay readable further down.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The mobile sheet covers the page, so the page behind it must not scroll.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open ? 'border-b-2 border-navy/15 bg-paper' : 'border-b-2 border-transparent'
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-baseline gap-2"
          aria-label="Gouri Mattresses & Furnishing — home"
        >
          {/* The signboard's two-tone lockup: navy name, red trade. */}
          <span className="font-display text-xl font-extrabold tracking-[-0.03em] text-navy sm:text-2xl">
            GOURI
          </span>
          <span className="font-display text-[0.6rem] font-bold uppercase leading-tight tracking-[0.14em] text-red">
            Mattresses &amp;
            <br />
            Furnishing
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-[0.82rem] font-bold uppercase tracking-[0.08em] text-navy/70 transition-colors hover:text-red"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-red hidden !py-2.5 sm:inline-flex">
            <Phone size={15} aria-hidden="true" />
            {fmtPhone(CONTACT.phones[0])}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center border-2 border-navy/20 text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t-2 border-navy/15 bg-paper lg:hidden" aria-label="Mobile">
          <ul className="container-page flex flex-col py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-navy/10 py-4 font-display text-base font-bold text-navy"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-red w-full">
                <Phone size={16} aria-hidden="true" />
                Call {fmtPhone(CONTACT.phones[0])}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
