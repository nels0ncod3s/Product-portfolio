import ProjectPlaceholder from '../components/ProjectPlaceholder';

// To swap in real screenshots: drop them in src/assets/work/, import them here,
// and set `image` (and `alt`). Add `href` to make the whole card a link.
const projects = [
  {
    name: 'First Layer',
    description: 'Making authentication simpler for developers.',
    tags: ['Developer tools', 'Product design'],
    year: '2026',
    kind: 'dashboard',
    image: null,
    alt: '',
    href: null,
  },
  {
    name: 'Routly',
    description: 'A better way to plan and navigate journeys.',
    tags: ['Travel', 'Product design'],
    year: '2026',
    kind: 'landing',
    image: null,
    alt: '',
    href: null,
  },
  {
    name: 'Buy Me Zobo',
    description: 'Helping creators receive support from their audience.',
    tags: ['Fintech', 'Product design'],
    year: '2026',
    kind: 'profile',
    image: null,
    alt: '',
    href: null,
  },
];

function Project({ project }) {
  const { name, description, tags, year, kind, image, alt, href } = project;
  const Wrapper = href ? 'a' : 'article';
  const wrapperProps = href
    ? { href, target: '_blank', rel: 'noreferrer', 'aria-label': `${name}, opens project` }
    : {};

  return (
    <Wrapper className={`project ${href ? 'is-link' : ''}`} {...wrapperProps}>
      <div className="project-frame">
        {image ? (
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
          <h3>{name}</h3>
          <p>{description}</p>
        </div>

        <div className="project-meta">
          <ul className="project-tags">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <span className="project-year">{year}</span>
        </div>
      </div>
    </Wrapper>
  );
}

function SelectedWork() {
  return (
    <section className="work-section" id="work">
      <div className="container">
        <div className="section-heading">
          <h2>Selected work</h2>
          <p>2025 – 2026</p>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <Project project={project} key={project.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SelectedWork;
