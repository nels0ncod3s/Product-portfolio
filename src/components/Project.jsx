import { caseStudies } from '../data/caseStudies';
import PhoneShowcase from './PhoneShowcase';
import ProjectPlaceholder from './ProjectPlaceholder';

function Project({ project, onOpenCase }) {
  const { name, slug, description, tags, year, kind, image, alt, href, wide, screens } = project;
  const hasCase = Boolean(slug && caseStudies[slug]);
  // No live link? Then the whole card opens the case study instead.
  const caseIsMainLink = hasCase && !href;

  return (
    <article className={`project ${href ? 'is-link' : ''} ${wide ? 'is-wide' : ''} ${caseIsMainLink ? 'is-case-link' : ''}`}>
      <div className="project-frame">
        {kind === 'mobile' ? (
          <PhoneShowcase screens={screens} alt={alt} />
        ) : image ? (
          <img src={image} alt={alt} loading="lazy" />
        ) : (
          <ProjectPlaceholder kind={kind} />
        )}
        {href && (
          <span className="project-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        )}
      </div>

      <div className="project-info">
        <div>
          <h3>
            {href ? (
              // The link's ::after covers the whole card, so the card is one big
              // click target without nesting interactive elements.
              <a className="project-link" href={href} target="_blank" rel="noreferrer">
                {name}
                <span className="visually-hidden"> (opens the live project)</span>
              </a>
            ) : (
              name
            )}
          </h3>
          <p>{description}</p>

          {hasCase && (
            <button
              type="button"
              className={`case-btn ${caseIsMainLink ? 'is-stretched' : ''}`}
              onClick={() => onOpenCase(slug)}
            >
              Read case study
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          )}
        </div>

        <div className="project-meta">
          <ul className="project-tags">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {year && <span className="project-year">{year}</span>}
        </div>
      </div>
    </article>
  );
}

export default Project;
