import { useState, useEffect } from 'react'
import { MapPin, User, ArrowDown } from 'lucide-react'
import { personal } from '../data/personal'
import { useTypewriter } from '../hooks/useTypewriter'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { resolveImage } from '../utils/imageLoader'

function ProfileImage() {
  const [src, setSrc] = useState(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let cancelled = false
    resolveImage(personal.profileImage).then((found) => {
      if (!cancelled) {
        setSrc(found)
        setChecked(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="hero-portrait">
      {src ? (
        <img
          src={src}
          alt={`${personal.name} — software developer and graphic designer`}
        />
      ) : checked ? (
        <div className="hero-portrait-placeholder">
          <div className="hero-portrait-placeholder-icon">
            <User size={32} color="var(--text-3)" />
          </div>
          <p className="hero-portrait-placeholder-text">
            Place your photo at<br />
            <code style={{ fontSize: 10, color: 'var(--accent)' }}>
              public/images/profile/profile.jpeg
            </code>
          </p>
        </div>
      ) : null}
    </div>
  )
}

function scrollTo(sectionId) {
  const el = document.getElementById(sectionId)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const { value: role } = useTypewriter(personal.roles)
  const ref = useScrollReveal()

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero-inner">
        {/* Text content */}
        <div className="hero-content">
          <div className="hero-eyebrow reveal">
            <span className="hero-location-dot" aria-hidden="true" />
            <MapPin size={12} aria-hidden="true" />
            <span>{personal.location}</span>
          </div>

          <h1 className="hero-name reveal">{personal.name}</h1>

          <div className="hero-role-line reveal" aria-live="polite" aria-label={`Current role: ${role}`}>
            <span className="hero-role-prefix">I'm a</span>
            <span className="hero-role-text">{role}</span>
            <span className="hero-role-cursor" aria-hidden="true" />
          </div>

          <p className="hero-tagline reveal">{personal.tagline}</p>

          <div className="hero-actions reveal">
            <button
              id="hero-view-projects-btn"
              className="btn btn-primary"
              onClick={() => scrollTo('projects')}
            >
              View Projects
              <ArrowDown size={15} />
            </button>
            <button
              id="hero-contact-btn"
              className="btn btn-outline"
              onClick={() => scrollTo('contact')}
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Portrait */}
        <div className="hero-portrait-wrap reveal">
          <ProfileImage />
        </div>
      </div>
    </section>
  )
}
