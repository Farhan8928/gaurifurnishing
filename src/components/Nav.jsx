import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { CONTACT, NAV_LINKS, fmtPhone } from '../data/site.js'

/**
 * Fixed header. Transparent over the hero, then solidifies once the page has
 * scrolled — so the hero photograph is never cropped by a bar of chrome, but
 * the links stay readable over the pale sections below.
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-ink/10 bg-linen/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#top" className="group flex items-baseline gap-2" aria-label="Gouri Mattresses & Furnishing — home">
          <span className="font-display text-xl font-semibold tracking-tight text-ink sm:text-[1.35rem]">
            Gouri
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-teal">
            Mattresses &amp; Furnishing
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition hover:text-teal"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:+91${CONTACT.phones[0]}`}
            className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex"
          >
            <Phone size={15} aria-hidden="true" />
            {fmtPhone(CONTACT.phones[0])}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-ink/10 bg-linen lg:hidden"
          aria-label="Mobile"
        >
          <ul className="container-page flex flex-col py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink/5 py-4 text-base font-medium text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a href={`tel:+91${CONTACT.phones[0]}`} className="btn-primary w-full">
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
