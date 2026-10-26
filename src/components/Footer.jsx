import { personal } from '../data/personal'
import { socialLinks } from '../data/social'
import { GithubIcon, InstagramIcon, FacebookIcon, TikTokIcon } from './SocialBrandIcons'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

const iconMap = {
  github: <GithubIcon size={16} />,
  instagram: <InstagramIcon size={16} />,
  facebook: <FacebookIcon size={16} />,
  tiktok: <TikTokIcon size={16} />,
}

function handleNavClick(e, href) {
  e.preventDefault()
  const el = document.getElementById(href.slice(1))
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const configuredSocials = socialLinks.filter(l => l.href)

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <span className="footer-brand">{personal.brand}</span>

          <nav aria-label="Footer navigation">
            <ul className="footer-nav">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-nav-link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {configuredSocials.length > 0 && (
            <div className="footer-social">
              {configuredSocials.map(link => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="footer-social-icon"
                >
                  {iconMap[link.icon] ?? null}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">{personal.copyright}</p>
          <p className="footer-credit">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
