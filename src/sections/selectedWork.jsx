import ProjectPlaceholder from '../components/ProjectPlaceholder';
import zobo from '../assets/work/zobo.JPG';
import firstLayer from '../assets/work/firstLayer.JPG';
import routly from '../assets/work/Routly.JPG';
import naira from '../assets/work/naira.JPG';
import tix from '../assets/work/tix.JPG';

const projects = [
  {
    name: 'Buy Me Zobo',
    description: 'Helping creators receive support from their audience.',
    tags: ['Fintech', 'creators'],
    kind: 'profile',
    image: zobo,
    alt: '',
    href: 'https://buyymezobo.vercel.app/',
  },
  {
    name: 'First Layer',
    description: 'Making authentication simpler for developers.',
    tags: ['Developer tools', 'Authenticaton'],
    kind: 'dashboard',
    image: firstLayer,
    alt: 'first layer dashboard',
    href: 'https://usefirstlayer.vercel.app/',
  },
  {
    name: 'Routly',
    description: 'A better way to plan and navigate journeys.',
    tags: ['Travel', 'Navigation'],
    kind: 'landing',
    image: routly,
    alt: '',
    href: 'https://useroutly.vercel.app/',
  },
  {
    
    name: 'Naira Savvy',
    description: 'A better way to plan and manage money.',
    tags: ['News', 'Finance'],
    kind: 'landing',
    image: naira,
    alt: '',
    href: 'https://nairasavvy-mu.vercel.app/',
  },
  {
    
    name: 'Tix',
    description: 'Your home for event ticketing',
    tags: ['Events', 'Tickets'],
    kind: 'landing',
    image: tix,
    alt: '',
    href: 'https://tix-ten.vercel.app/',
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
