import { GraduationCap, Building2, Code2, Lightbulb } from 'lucide-react'
import { personal } from '../data/personal'
import { useScrollReveal } from '../hooks/useScrollReveal'

const highlights = [
  {
    icon: <Building2 size={18} />,
    label: 'Company',
    value: 'CEO, NovaStack Developers',
  },
  {
    icon: <GraduationCap size={18} />,
    label: 'Education',
    value: 'BSc Animal Science, Chuka University',
  },
  {
    icon: <Code2 size={18} />,
    label: 'Focus',
    value: 'Management Systems, Web Applications & Automation',
  },
  {
    icon: <Lightbulb size={18} />,
    label: 'Interests',
    value: 'Technology, Digital Media & Artificial Intelligence',
  },
]

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" ref={ref}>
      <hr className="section-divider" />
      <div className="section">
        <p className="section-label reveal">About</p>
        <h2 className="section-heading reveal">The person behind the work</h2>

        <div className="about-grid">
          {/* Biography */}
          <div className="about-bio reveal">
            {personal.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Highlight cards */}
          <div className="about-highlights reveal">
            {highlights.map((item, i) => (
              <div className="about-highlight-card" key={i}>
                <div className="about-highlight-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <p className="about-highlight-label">{item.label}</p>
                <p className="about-highlight-value">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
