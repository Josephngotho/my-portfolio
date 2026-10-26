import { Briefcase, Code2 } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const experiences = [
  {
    id: 'novastack-ceo',
    title: 'Chief Executive Officer',
    company: 'NovaStack Developers',
    period: 'Present',
    icon: <Briefcase size={16} />,
    description:
      'Leading NovaStack Developers — a team focused on delivering practical digital solutions for businesses and institutions. Responsibilities include project oversight, client engagement, and hands-on development of web applications, management systems, and automation tools.',
  },
  {
    id: 'independent-dev',
    title: 'Independent Developer & Designer',
    company: 'Freelance',
    period: '3 years',
    icon: <Code2 size={16} />,
    description:
      'Over three years of self-directed work in graphic design, software development, and digital media. Projects have spanned branding, web development, management systems for schools and businesses, billing platforms, and WhatsApp automation — for both personal and client engagements.',
  },
]

export default function Experience() {
  const ref = useScrollReveal()

  return (
    <section id="experience" ref={ref}>
      <hr className="section-divider" />
      <div className="section">
        <p className="section-label reveal">Background</p>
        <h2 className="section-heading reveal">Experience</h2>
        <p className="section-subheading reveal">
          My professional journey — from independent creative work to leading a software development company.
        </p>

        <div className="experience-list reveal">
          {experiences.map((exp) => (
            <div className="experience-item" key={exp.id}>
              <div className="experience-dot" aria-hidden="true">
                {exp.icon}
              </div>
              <div className="experience-content">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-title">{exp.title}</h3>
                    <p className="experience-company">{exp.company}</p>
                  </div>
                  {exp.period && (
                    <span className="experience-period">{exp.period}</span>
                  )}
                </div>
                <p className="experience-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
