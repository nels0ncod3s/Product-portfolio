import { useEffect, useRef } from 'react';
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
    alt: 'Buy Me Zobo landing page: “Your creativity. Their kindness. A little zobo.”',
    href: 'https://buyymezobo.vercel.app/',
  },
  {
    name: 'First Layer',
    description: 'Making authentication simpler for developers.',
    tags: ['Developer tools', 'Authentication'],
    kind: 'dashboard',
    image: firstLayer,
    alt: 'First Layer dashboard showing projects, app users and API keys',
    href: 'https://usefirstlayer.vercel.app/',
  },
  {
    name: 'Routly',
    description: 'A better way to plan and navigate journeys.',
    tags: ['Travel', 'Navigation'],
    kind: 'landing',
    image: routly,
    alt: 'Routly landing page: “More drops. Fewer detours.” with a route map',
    href: 'https://useroutly.vercel.app/',
  },
  {
    
    name: 'Naira Savvy',
    description: 'A better way to plan and manage money.',
    tags: ['News', 'Finance'],
    kind: 'landing',
    image: naira,
    alt: 'Naira Savvy website homepage',
    href: 'https://nairasavvy-mu.vercel.app/',
  },
  {
    
    name: 'Tix',
    description: 'Your home for event ticketing',
    tags: ['Events', 'Tickets'],
    kind: 'landing',
    image: tix,
    alt: 'Tix landing page: “Every ticket. Every city. One tap away.”',
    href: 'https://tix-ten.vercel.app/',
  },
];

// Scroll-linked grow: each card scales up into place as it enters the screen and
// shrinks back if you scroll up past it. It sets --grow (0 to 1) on every
// .project; the CSS decides how much that scales (see .project-frame).
function useScrollGrow(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const cards = Array.from(root.querySelectorAll('.project'));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      cards.forEach((card) => {
        // 0 while the card's top is at the bottom edge, 1 once it is 45% up the screen.
        const p = (vh - card.getBoundingClientRect().top) / (vh * 0.55);
        const clamped = Math.min(1, Math.max(0, p));
        const eased = 1 - (1 - clamped) ** 3; // ease-out, so it settles gently
        card.style.setProperty('--grow', eased.toFixed(3));
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

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
  const ref = useRef(null);
  useScrollGrow(ref);

  return (
    <section className="work-section" id="work" ref={ref}>
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