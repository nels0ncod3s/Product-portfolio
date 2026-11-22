import { useCallback, useEffect, useRef, useState } from 'react';
import CaseStudy from '../components/CaseStudy';
import PhoneShowcase from '../components/PhoneShowcase';
import ProjectPlaceholder from '../components/ProjectPlaceholder';
import { caseStudies } from '../data/caseStudies';
import zobo from '../assets/work/zobo.JPG';
import firstLayer from '../assets/work/firstLayer.JPG';
import routly from '../assets/work/Routly.JPG';
import naira from '../assets/work/naira.JPG';
import tix from '../assets/work/tix.JPG';
import revolvAdd from '../assets/work/addFlow.jpg';
import revolvMain from '../assets/work/main.jpg';
import revolvCalendar from '../assets/work/calendar.jpg';

// Descriptions say what each product does, in plain words, using only things the
// products themselves show. Check each one is still accurate. Optional fields:
//   slug: opens the matching case study in data/caseStudies.js
//   kind: 'mobile' shows up to three phone frames from `screens`. The middle one is the
//         hero (largest, in front), so put the main screen second.
//   wide: true makes the card span the full row
//   href: leave out for projects with no live link (the card then opens the case study)
//   year: shown at the end of the tag row (hidden when empty)
const projects = [
  {
    name: 'Buy Me Zobo',
    description:
      'Tipping pages for Nigerian creators. Free to set up, and fans don’t need an account to support.',
    tags: ['Fintech', 'Creators'],
    kind: 'profile',
    image: zobo,
    alt: 'Buy Me Zobo landing page: “Your creativity. Their kindness. A little zobo.”',
    href: 'https://buyymezobo.vercel.app/',
  },
  {
    name: 'First Layer',
    slug: 'first-layer',
    description:
      'Hosted authentication for developers: sign-up, sessions and API keys behind one SDK.',
    tags: ['Developer tools', 'Authentication'],
    kind: 'dashboard',
    image: firstLayer,
    alt: 'First Layer dashboard showing projects, app users and API keys',
    href: 'https://usefirstlayer.vercel.app/',
  },
  {
    name: 'Routly',
    description:
      'Plans multi-stop routes with trip times and fuel estimates before you leave. Built for last-mile delivery.',
    tags: ['Travel', 'Navigation'],
    kind: 'landing',
    image: routly,
    alt: 'Routly landing page: “More drops. Fewer detours.” with a route map',
    href: 'https://useroutly.vercel.app/',
  },
  {
    name: 'Naira Savvy',
    description:
      'Plain-language money guides, tools and news for Nigerians. No financial jargon.',
    tags: ['News', 'Finance'],
    kind: 'landing',
    image: naira,
    alt: 'Naira Savvy homepage: “More power to your naira.”',
    href: 'https://nairasavvy-mu.vercel.app/',
  },
  {
    name: 'Tix',
    description:
      'Event ticketing across Nigeria: find concerts, comedy, football and festivals, and get a ticket in a tap.',
    tags: ['Events', 'Tickets'],
    kind: 'landing',
    image: tix,
    alt: 'Tix landing page: “Every ticket. Every city. One tap away.”',
    href: 'https://tix-ten.vercel.app/',
  },
  {
    name: 'Revolv',
    slug: 'revolv',
    description:
      'Keeps every subscription in one place and shows when each one renews, so payments don’t catch you off guard.',
    tags: ['Personal finance', 'PWA'],
    kind: 'mobile',
    wide: true,
    href: 'https://userevolv.vercel.app/',
    // Order is the frame order: add flow, dashboard (centre), calendar.
    screens: [revolvAdd, revolvMain, revolvCalendar],
    alt: 'Revolv screens: adding a subscription, the dashboard with total monthly spend and renewal countdowns, and the calendar of scheduled payments',
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

const CASE_PREFIX = '#case-';

function SelectedWork() {
  const ref = useRef(null);
  useScrollGrow(ref);

  // Which case study is open. It lives in the URL hash (#case-first-layer), so a
  // case study can be linked to directly, and Back closes it.
  const [openSlug, setOpenSlug] = useState(null);

  useEffect(() => {
    const sync = () => {
      const { hash } = window.location;
      const slug = hash.startsWith(CASE_PREFIX) ? hash.slice(CASE_PREFIX.length) : null;
      setOpenSlug(slug && caseStudies[slug] ? slug : null);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const openCase = useCallback((slug) => {
    window.location.hash = `case-${slug}`;
  }, []);

  const closeCase = useCallback(() => {
    setOpenSlug(null);
    if (window.location.hash.startsWith(CASE_PREFIX)) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const openProject = projects.find((p) => p.slug === openSlug);

  return (
    <section className="work-section" id="work" ref={ref}>
      <div className="container">
        <div className="section-heading">
          <h2>Selected work</h2>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <Project project={project} onOpenCase={openCase} key={project.name} />
          ))}
        </div>
      </div>

      {openProject && (
        <CaseStudy
          project={openProject}
          study={caseStudies[openProject.slug]}
          onClose={closeCase}
          key={openProject.slug}
        />
      )}
    </section>
  );
}

export default SelectedWork;