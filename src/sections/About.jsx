import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { about } from '../data/about';
import { photo } from '../lib/photo';

// Labels for the index under the headline. Each `id` matches a block below.
const SECTIONS = [
  { id: 'story', label: 'Story' },
  { id: 'glance', label: 'At a glance' },
  { id: 'do', label: 'What I do' },
  { id: 'background', label: 'Background' },
  { id: 'now', label: 'Currently' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Splits text into words. The CSS lights each word up as `--p` (0 to 1, set by
// useScrubText) passes its position, so the text "reads itself" while you scroll.
function Scrub({ as: Tag = 'span', text, className = '' }) {
  const words = text.split(' ');
  return (
    <Tag className={`scrub ${className}`} data-scrub style={{ '--n': words.length }}>
      {words.map((word, i) => (
        <span className="w" style={{ '--i': i }} key={i}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

// Scroll-linked progress for every [data-scrub] element. Runs both directions,
// so scrolling back up dims the text again.
function useScrubText(ref) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const els = Array.from(root.querySelectorAll('[data-scrub]'));

    if (prefersReducedMotion()) {
      els.forEach((el) => el.style.setProperty('--p', '1'));
      return undefined;
    }

    const last = new Array(els.length).fill(-1);
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      els.forEach((el, k) => {
        const rect = el.getBoundingClientRect();
        // 0 when the block's top is 85% down the screen; 1 when its bottom
        // reaches 40% down the screen.
        const p = (vh * 0.85 - rect.top) / (rect.height + vh * 0.45);
        const v = Math.round(Math.min(1, Math.max(0, p)) * 500) / 500;
        if (v !== last[k]) {
          last[k] = v;
          el.style.setProperty('--p', v);
        }
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update(); // before first paint, so lit text never flashes
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

function useAboutScroll() {
  const ref = useRef(null);
  const [active, setActive] = useState(SECTIONS[0].id);

  useScrubText(ref);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const items = root.querySelectorAll('.rise');
    const blocks = root.querySelectorAll('[data-spy]');

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    // Fade items in as they scroll into view.
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );

    // Highlight whichever block crosses a thin band near the middle of the screen.
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.spy);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    items.forEach((item) => reveal.observe(item));
    blocks.forEach((block) => spy.observe(block));

    return () => {
      reveal.disconnect();
      spy.disconnect();
    };
  }, []);

  return { ref, active };
}

function About() {
  const { ref, active } = useAboutScroll();

  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="container about-layout">
        {/* Left: stays in place while the right column scrolls. */}
        <aside className="about-aside">
          <div className="about-sticky">
            <p className="eyebrow">About</p>

            <div className="about-photo rise">
              {photo ? (
                <img src={photo} alt="" loading="lazy" />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                </svg>
              )}
            </div>

            <h2>{about.headline}</h2>

            <nav className="about-index" aria-label="About sections">
              {SECTIONS.map(({ id, label }, i) => (
                <a
                  href={`#about-${id}`}
                  className={active === id ? 'is-active' : ''}
                  aria-current={active === id ? 'true' : undefined}
                  key={id}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right: the details. Text starts dim and lights up word by word. */}
        <div className="about-main">
          <div className="about-block about-story" id="about-story" data-spy="story">
            {about.intro.map((text, i) => (
              <Scrub as="p" text={text} key={i} />
            ))}
          </div>

          <dl className="about-block about-facts" id="about-glance" data-spy="glance">
            {about.facts.map(({ label, value }, i) => (
              <div className="rise" style={{ '--i': i }} key={label}>
                <dt>{label}</dt>
                <Scrub as="dd" text={value} />
              </div>
            ))}
          </dl>

          <div className="about-block" id="about-do" data-spy="do">
            <h3 className="list-heading about-pillars-heading">What I do</h3>
            <div className="about-pillars">
              {about.pillars.map(({ title, text, tags }, i) => (
                <article className="pillar rise" key={title}>
                  <span className="pillar-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Scrub as="h3" text={title} />
                  <Scrub as="p" text={text} />
                  <ul className="chips">
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="about-block" id="about-background" data-spy="background">
            <h3 className="list-heading">Background</h3>
            <ul className="about-list">
              {about.background.map(({ title, note }) => (
                <li key={title}>
                  <Scrub as="span" text={title} />
                  <small>{note}</small>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-block" id="about-now" data-spy="now">
            <h3 className="list-heading">Currently</h3>
            <ul className="about-list">
              {about.now.map(({ label, value }) => (
                <li key={label}>
                  <small>{label}</small>
                  <Scrub as="span" text={value} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;