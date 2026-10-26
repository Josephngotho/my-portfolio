import { useState, useEffect } from 'react'
import { Palette, ImageOff } from 'lucide-react'
import { graphicDesigns } from '../data/designs'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { resolveImage } from '../utils/imageLoader'
import Lightbox from './Lightbox'

function DesignCard({ design, onOpen }) {
  const [resolvedSrc, setResolvedSrc] = useState(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let cancelled = false
    resolveImage(design.src).then((found) => {
      if (!cancelled) {
        setResolvedSrc(found)
        setChecked(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [design.src])

  if (checked && !resolvedSrc) return null // hide missing posters cleanly

  return (
    <div
      className="design-card"
      onClick={() => resolvedSrc && onOpen({ ...design, src: resolvedSrc })}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && resolvedSrc) {
          onOpen({ ...design, src: resolvedSrc })
        }
      }}
      tabIndex={resolvedSrc ? 0 : -1}
      role={resolvedSrc ? 'button' : undefined}
      aria-label={resolvedSrc ? `View ${design.alt} in full size` : undefined}
    >
      <div className="design-card-image">
        {!checked ? (
          <div className="design-placeholder">
            <div style={{ opacity: 0.3 }}>
              <Palette size={28} color="var(--text-3)" />
            </div>
          </div>
        ) : (
          <img
            src={resolvedSrc}
            alt={design.alt}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      {design.caption && (
        <p className="design-card-caption">{design.caption}</p>
      )}
    </div>
  )
}

export default function DesignShowcase() {
  const [lightbox, setLightbox] = useState(null)
  const ref = useScrollReveal()
  const [hasAny, setHasAny] = useState(null)

  useEffect(() => {
    if (graphicDesigns.length === 0) {
      setHasAny(false)
      return
    }
    let cancelled = false
    Promise.all(graphicDesigns.map((d) => resolveImage(d.src))).then((results) => {
      if (!cancelled) {
        setHasAny(results.some(Boolean))
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="design" ref={ref}>
      <hr className="section-divider" />
      <div className="section">
        <p className="section-label reveal">Visual work</p>
        <h2 className="section-heading reveal">Selected Design Work</h2>
        <p className="section-subheading reveal">
          A curated selection of graphic design work — posters, branding, and digital visuals.
        </p>

        <div className="design-grid">
          {hasAny === false ? (
            <div className="design-empty-state reveal">
              <div className="design-empty-icon">
                <Palette size={24} />
              </div>
              <h3 className="design-empty-title">Design portfolio coming soon</h3>
              <p className="design-empty-desc">
                Place your poster images at{' '}
                <code style={{ color: 'var(--accent)', fontSize: 12 }}>
                  public/images/graphics/poster-1.png
                </code>{' '}
                through{' '}
                <code style={{ color: 'var(--accent)', fontSize: 12 }}>
                  poster-6.png
                </code>{' '}
                to display them here.
              </p>
            </div>
          ) : (
            graphicDesigns.map((design) => (
              <DesignCard
                key={design.id}
                design={design}
                onOpen={(d) => setLightbox({ images: [d.src], name: d.alt })}
              />
            ))
          )}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          projectName={lightbox.name}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}
