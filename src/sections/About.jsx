import { useEffect, useRef } from 'react';
import { about } from '../data/about';

// Fades each `.rise` element in as it scrolls into view.
function useRevealOnScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const items = root.querySelectorAll('.rise');

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );

    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return ref;
}

function About() {
  const ref = useRevealOnScroll();

  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="container">
        <div className="about-content">
          <div className="rise">
            <p className="eyebrow">About</p>
            <h2>{about.headline}</h2>
          </div>

          <div className="about-description">
            {about.intro.map((text, i) => (
              <p className="rise" style={{ '--i': i + 1 }} key={i}>
                {text}
              </p>
            ))}
          </div>
        </div>

        <dl className="about-facts">
          {about.facts.map(({ label, value }, i) => (
            <div className="rise" style={{ '--i': i }} key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="about-pillars">
          {about.pillars.map(({ title, text, tags }, i) => (
            <article className="pillar rise" style={{ '--i': i }} key={title}>
              <span className="pillar-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul className="chips">
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="about-lists">
          <div className="rise">
            <h3 className="list-heading">Background</h3>
            <ul className="about-list">
              {about.background.map(({ title, note }) => (
                <li key={title}>
                  <span>{title}</span>
                  <small>{note}</small>
                </li>
              ))}
            </ul>
          </div>

          <div className="rise" style={{ '--i': 1 }}>
            <h3 className="list-heading">Currently</h3>
            <ul className="about-list">
              {about.now.map(({ label, value }) => (
                <li key={label}>
                  <small>{label}</small>
                  <span>{value}</span>
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