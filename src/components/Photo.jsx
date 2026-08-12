import { GALLERY } from '../data/gallery.gen.js'

/** Fast lookup from a manifest `name` to its rendered dimensions and alt text. */
const BY_NAME = Object.fromEntries(GALLERY.map((g) => [g.name, g]))

/**
 * Renders one of the shop's photographs at the right size for its slot.
 *
 * Every photo exists as three WebP renditions (400 / 800 / 1600). This picks
 * between them with a srcset rather than shipping the 1600px file to a phone,
 * and always emits intrinsic width/height so the browser reserves the space
 * before the bytes arrive — on an image-heavy page that is the difference
 * between a calm load and the whole layout jumping twice.
 *
 * `priority` marks the one hero image that should load eagerly and be fetched
 * at high priority; everything else stays lazy.
 */
export default function Photo({
  name,
  className = '',
  sizes = '(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw',
  priority = false,
  alt: altOverride,
}) {
  const img = BY_NAME[name]

  // A typo in a `name` should be loud in development, not a silent empty box.
  if (!img) {
    if (import.meta.env.DEV) throw new Error(`Photo: unknown image "${name}"`)
    return null
  }

  return (
    <img
      src={`/images/${img.name}-800.webp`}
      srcSet={[
        `/images/${img.name}-400.webp 400w`,
        `/images/${img.name}-800.webp 800w`,
        `/images/${img.name}.webp ${img.width}w`,
      ].join(', ')}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={altOverride ?? img.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  )
}

export { BY_NAME }
