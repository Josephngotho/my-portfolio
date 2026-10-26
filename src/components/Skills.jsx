import { skillGroups } from '../data/skills'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section id="skills" ref={ref}>
      <hr className="section-divider" />
      <div className="section">
        <p className="section-label reveal">Expertise</p>
        <h2 className="section-heading reveal">Skills & Technologies</h2>
        <p className="section-subheading reveal">
          The tools, languages, and platforms I work with across software development, design, and automation.
        </p>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group reveal" key={group.id}>
              <p className="skill-group-label">{group.label}</p>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill.name} className="skill-tag">
                    {skill.name}
                    {skill.note && (
                      <span className="skill-tag-note"> ({skill.note})</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
