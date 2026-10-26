import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Accessible image lightbox / gallery modal.
 * Props:
 *  - images: string[]  — array of image src paths
 *  - initialIndex: number
 *  - projectName: string
 *  - onClose: () => void
 */
export default function Lightbox({ images, initialIndex = 0, projectName, onClose }) {
  const [index, setIndex] = useState(initialIndex)

  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const hasPrev = images.length > 1
  const hasNext = images.length > 1

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Image gallery for ${projectName}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="lightbox-content">
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close gallery"
        >
          <X size={16} />
        </button>

        <div className="lightbox-image-wrap">
          {hasPrev && (
            <button
              className="lightbox-nav lightbox-nav-prev"
              onClick={prev}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <img
            src={images[index]}
            alt={`${projectName} — screenshot ${index + 1} of ${images.length}`}
            key={index}
          />

          {hasNext && (
            <button
              className="lightbox-nav lightbox-nav-next"
              onClick={next}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        <div className="lightbox-footer">
          <span className="lightbox-title">{projectName}</span>
          {images.length > 1 && (
            <span className="lightbox-counter" aria-live="polite">
              {index + 1} / {images.length}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
