import { useState, useEffect } from 'react'
import { personal } from '../data/personal'
import { socialLinks } from '../data/social'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { resolveImage } from '../utils/imageLoader'
import { GithubIcon, InstagramIcon, FacebookIcon, TikTokIcon } from './SocialBrandIcons'
import { InstallButton } from './InstallPrompt'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

function SocialIcon({ link }) {
  const icons = {
    github: <GithubIcon size={16} />,
    instagram: <InstagramIcon size={16} />,
    facebook: <FacebookIcon size={16} />,
    tiktok: <TikTokIcon size={16} />,
  }
  if (!link.href) return null
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="footer-social-icon"
    >
      {icons[link.icon] || null}
    </a>
  )
}

function ProfileAvatar({ size = 36, className = '' }) {
  const [src, setSrc] = useState(null)

  useEffect(() => {
    let cancelled = false
    resolveImage(personal.profileImage).then((found) => {
      if (!cancelled) setSrc(found)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      className={`nav-avatar ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src}
          alt={`${personal.name} profile`}
        />
      ) : (
        <span className="nav-avatar-fallback" style={{ fontSize: size * 0.4 }}>
          {personal.name.charAt(0)}
        </span>
      )}
    </div>
  )
}

export { ProfileAvatar, SocialIcon }

export default function Navbar({ theme, onToggleTheme, canInstall, onInstall }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Active section detection
  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const configuredSocials = socialLinks.filter(l => l.href)

  return (
    <>
      <nav className="nav-bar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          {/* Logo */}
          <a
            href="#home"
            className="nav-logo"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="KibaraTechs — Back to top"
          >
            <ProfileAvatar size={36} />
            <span className="nav-brand">{personal.brand}</span>
          </a>

          {/* Desktop nav links */}
          <ul className="nav-links" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={activeSection === link.href.slice(1) ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            <InstallButton canInstall={canInstall} promptInstall={onInstall} />

            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              id="mobile-menu-open-btn"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation overlay */}
      <div
        className={`mobile-nav${mobileOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="mobile-nav-header">
          <a
            href="#home"
            className="nav-logo"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <ProfileAvatar size={36} />
            <span className="nav-brand">{personal.brand}</span>
          </a>
          <button
            className="mobile-nav-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            id="mobile-menu-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="mobile-nav-links" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {canInstall && (
          <div className="mobile-nav-install">
            <InstallButton
              canInstall={canInstall}
              promptInstall={() => {
                setMobileOpen(false)
                onInstall()
              }}
              className="w-full"
            />
          </div>
        )}

        {configuredSocials.length > 0 && (
          <div className="footer-social" style={{ marginTop: 24 }}>
            {configuredSocials.map(link => (
              <SocialIcon key={link.id} link={link} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
