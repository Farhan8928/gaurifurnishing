import { useEffect, useRef, useState } from 'react'

/**
 * Fades and lifts its children into view once, the first time they are
 * scrolled to.
 *
 * Written against IntersectionObserver and a CSS transition rather than an
 * animation library on purpose. This is an image-heavy site whose visitors are
 * overwhelmingly on phones on mobile data, and pulling in framer-motion for one
 * fade cost about 100 kB gzipped — more than every photograph above the fold
 * put together. Twenty lines of CSS do the same job.
 *
 * Deliberately subtle: 16px of travel over 500ms. A furnishing site is judged
 * on whether the photographs look calm and expensive, and animation that draws
 * attention to itself works against that.
 */
export default function Reveal({ children, delay = 0, y = 16, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect the OS "reduce motion" setting, and skip the observer entirely
    // where IntersectionObserver is unavailable — content must never be stuck
    // at opacity 0.
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
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity 500ms cubic-bezier(.22,1,.36,1) ${delay}s, transform 500ms cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
