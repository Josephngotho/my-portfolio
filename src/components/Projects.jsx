import { useState, useEffect } from 'react'
import { Monitor, ExternalLink, Images, ImageOff } from 'lucide-react'
import { projects, projectCategories } from '../data/projects'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { resolveImage } from '../utils/imageLoader'
import { GithubIcon } from './SocialBrandIcons'
import Lightbox from './Lightbox'

function ProjectImage({ screenshots, projectName, onGalleryOpen }) {
  const [validImages, setValidImages] = useState([])
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!screenshots || screenshots.length === 0) {
      setChecked(true)
      return
    }
    let cancelled = false
    Promise.all(screenshots.map((s) => resolveImage(s))).then((results) => {
      if (!cancelled) {
        setValidImages(results.filter(Boolean))
        setChecked(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [screenshots])

  if (!checked) {
    return (
      <div className="project-card-image">
        <div className="project-image-placeholder">
          <div className="project-image-placeholder-icon" style={{ opacity: 0.4 }}>
            <Monitor size={22} />
          </div>
        </div>
      </div>
    )
  }

  if (validImages.length === 0) {
    return (
      <div className="project-card-image">
        <div className="project-image-placeholder">
          <div className="project-image-placeholder-icon">
            <ImageOff size={22} />
          </div>
          <span className="project-image-placeholder-text">Preview coming soon</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="project-card-image gallery-trigger"
      onClick={() => onGalleryOpen(validImages)}
      role="button"
      tabIndex={0}
      aria-label={`View ${validImages.length} screenshot${validImages.length > 1 ? 's' : ''} for ${projectName}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onGalleryOpen(validImages) }}
    >
      <img src={validImages[0]} alt={`${projectName} — main screenshot`} loading="lazy" />
      {validImages.length > 1 && (
        <span className="project-image-count" aria-hidden="true">
          <Images size={11} style={{ display: 'inline', marginRight: 4 }} />
          {validImages.length}
        </span>
      )}
    </div>
  )
}

function ProjectCard({ project, onGalleryOpen }) {
  const categoryLabel = projectCategories.find(c => c.id === project.category)?.label ?? project.category

  return (
    <article className="project-card">
      <ProjectImage
        screenshots={project.screenshots}
        projectName={project.name}
        onGalleryOpen={(imgs) => onGalleryOpen(imgs, project.name)}
      />

      <div className="project-card-body">
        <span className="project-category-tag">{categoryLabel}</span>
        <h3 className="project-card-title">{project.name}</h3>
        <p className="project-card-desc">{project.shortDescription}</p>

        {project.technologies && project.technologies.length > 0 && (
          <ul className="project-tech-list">
            {project.technologies.map(tech => (
              <li key={tech} className="project-tech-tag">{tech}</li>
            ))}
          </ul>
        )}

        {(project.liveUrl || project.sourceUrl) && (
          <div className="project-card-actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                aria-label={`Live demo for ${project.name} (opens in new tab)`}
              >
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                aria-label={`Source code for ${project.name} (opens in new tab)`}
              >
                <GithubIcon size={13} /> Source Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null) // { images, projectName }
  const ref = useScrollReveal()

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const openGallery = (images, projectName) => {
    setLightbox({ images, projectName })
  }

  return (
    <section id="projects" ref={ref}>
      <hr className="section-divider" />
      <div className="section">
        <p className="section-label reveal">Work</p>
        <h2 className="section-heading reveal">Selected Projects</h2>
        <p className="section-subheading reveal">
          A selection of software I've designed, built, and shipped — spanning management systems, web applications, and automation tools.
        </p>

        {/* Filters */}
        <div
          className="project-filters reveal"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map(cat => (
            <button
              key={cat.id}
              id={`filter-${cat.id}`}
              className={`filter-btn${activeFilter === cat.id ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
              aria-pressed={activeFilter === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="project-grid" role="list" aria-label="Projects">
          {filtered.map(project => (
            <div role="listitem" key={project.id}>
              <ProjectCard project={project} onGalleryOpen={openGallery} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          projectName={lightbox.projectName}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}
