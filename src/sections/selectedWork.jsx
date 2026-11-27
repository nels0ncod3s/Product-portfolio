import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';

// The five projects shown in the fan, left to right. The middle one is the hero
// (largest, in front), so put the project you want to lead with in the centre.
// `focus` is where the screenshot is anchored when it is cropped to a card.
const FAN = ['Tix', 'Routly', 'Buy Me Zobo', 'First Layer', 'Naira Savvy']
  .map((name) => projects.find((p) => p.name === name))
  .filter(Boolean);

// Scroll-linked fan: the cards start stacked and spread out as the row scrolls
// into view. It sets --spread (0 to 1) on .fan; the CSS does the rest.
function useFanSpread(ref) {
  useEffect(() => {
    const fan = ref.current;
    if (!fan) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      // 0 while the row's top is at the bottom edge, 1 once it is 40% up the screen.
      const p = (vh - fan.getBoundingClientRect().top) / (vh * 0.6);
      const clamped = Math.min(1, Math.max(0, p));
      fan.style.setProperty('--spread', (1 - (1 - clamped) ** 3).toFixed(3));
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

// Phones (up to 560px wide) show the same cards as a swipeable carousel
// instead of a fan: one card in focus, its neighbours peeking in. This keeps
// track of which card is centred (--near on each card drives its size and
// fade) and starts on the middle project.
const PHONE = '(max-width: 560px)';
const START = Math.floor(FAN.length / 2);

const centerLeft = (fan, card) => card.offsetLeft - (fan.clientWidth - card.offsetWidth) / 2;

function useFanCarousel(ref, setActive) {
  useLayoutEffect(() => {
    const fan = ref.current;
    if (!fan) return undefined;
    const mq = window.matchMedia(PHONE);
    const cards = Array.from(fan.children);
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!mq.matches) {
        cards.forEach((card) => card.style.removeProperty('--near'));
        return;
      }
      const mid = fan.scrollLeft + fan.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
        card.style.setProperty('--near', Math.max(0, 1 - dist / (card.offsetWidth * 0.9)).toFixed(3));
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onModeChange = () => {
      if (mq.matches && cards[START]) fan.scrollLeft = centerLeft(fan, cards[START]);
      update();
    };

    onModeChange();
    fan.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    mq.addEventListener('change', onModeChange);
    return () => {
      fan.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mq.removeEventListener('change', onModeChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, setActive]);
}

function SelectedWork() {
  const fanRef = useRef(null);
  const [active, setActive] = useState(START);
  useFanSpread(fanRef);
  useFanCarousel(fanRef, setActive);

  const goTo = useCallback((index) => {
    const fan = fanRef.current;
    const card = fan?.children[index];
    if (card) fan.scrollTo({ left: centerLeft(fan, card), behavior: 'smooth' });
  }, []);

  const current = FAN[active] ?? FAN[START];

  const mid = (FAN.length - 1) / 2;

  return (
    <section className="work-section work-home" id="work">
      <div className="container">
        <div className="section-heading">
          <h2>Selected work</h2>
        </div>

        <ul className="fan" ref={fanRef}>
          {FAN.map((project, index) => {
            const offset = index - mid; // -2 ... 2, 0 is the centre card
            return (
              <li
                className={`fan-card ${Math.abs(offset) > 1.5 ? 'is-far' : ''}`}
                key={project.name}
                style={{ '--i': offset, '--d': Math.abs(offset) }}
              >
                {/* Every card opens the work page. Not a tab stop: the button
                    below is the one keyboard-friendly way in. */}
                <a href="#/work" tabIndex={-1} className="fan-card-inner">
                  <img src={project.image} alt={project.alt} loading="lazy" />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Phones only: names the card in focus, with dots to jump between them. */}
        <div className="fan-info" aria-live="polite">
          <h3>{current.name}</h3>
          <p>{current.tags.join(' · ')}</p>
          <div className="fan-dots">
            {FAN.map((project, i) => (
              <button
                type="button"
                key={project.name}
                className={i === active ? 'is-active' : ''}
                aria-label={`Show ${project.name}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        <div className="fan-cta">
          <p>
            {projects.length} projects, from developer tools to everyday finance.
          </p>
          <a href="#/work" className="btn btn-arrow">
            View all work
            <span className="btn-arrow-chip" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default SelectedWork;
