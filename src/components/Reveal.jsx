import { useEffect, useRef, useState } from 'react'

/**
 * Fades and lifts its children into view once, the first time they are
 * scrolled to.
 *
 * The hidden state lives in CSS under a `.js` class on <html>, not in an inline
 * `opacity: 0` style. That distinction matters because the homepage is
 * prerendered: with inline styles, the shipped HTML contained 26 sections at
 * `opacity: 0`, so anything that read the page without successfully running our
 * JavaScript — a blocked bundle, a failed chunk on a bad connection, a
 * screenshotting crawler — saw a mostly blank page with the text technically
 * present but invisible.
 *
 * Now the hiding only ever applies once JavaScript has proved it is running
 * (see the boot script in index.html), and a watchdog there un-hides everything
 * if the app fails to start. No JavaScript, or broken JavaScript, degrades to
 * plain visible content.
 *
 * Written against IntersectionObserver and a CSS transition rather than an
 * animation library: pulling in framer-motion for one fade cost ~100 kB
 * gzipped, more than every photograph above the fold put together.
 */
export default function Reveal({ children, delay = 0, y = 16, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect the OS "reduce motion" setting, and skip the observer entirely
    // where IntersectionObserver is unavailable — content must never be stuck
    // hidden.
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal${shown ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--reveal-y': `${y}px`, transitionDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  )
}
