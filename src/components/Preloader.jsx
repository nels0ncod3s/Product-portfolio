import { useEffect, useState } from 'react';
import './Preloader.css';

const MIN_DURATION = 1400; // shortest the counter will run
const EXIT_MS = 1200; // curtain transition (900ms + stagger) plus a small buffer

function Preloader({ onReveal, onDone }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('is-loading'); // locks scroll while the curtain is up

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      onReveal();
      onDone();
      return () => html.classList.remove('is-loading');
    }

    // The counter waits for the display font, so the hero never reflows
    // while it is being revealed. Falls through after 2.5s on a slow network.
    let fontsReady = false;
    Promise.race([
      Promise.all([
        document.fonts.load('800 64px "Funnel Display"'),
        document.fonts.load('400 16px "Funnel Display"'),
      ]),
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]).then(() => {
      fontsReady = true;
    });

    let frame;
    let holdTimer;
    let doneTimer;
    const start = performance.now();

    const finish = () => {
      setExiting(true);
      onReveal();
      doneTimer = setTimeout(onDone, EXIT_MS);
    };

    const tick = (now) => {
      const t = Math.min((now - start) / MIN_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      // Hold at 94% until the font is in, so 100% means "actually ready".
      const shown = fontsReady ? eased : Math.min(eased, 0.94);
      setCount(Math.round(shown * 100));

      if (t >= 1 && fontsReady) {
        holdTimer = setTimeout(finish, 250);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
      html.classList.remove('is-loading');
    };
  }, [onReveal, onDone]);

  return (
    <div
      className={`preloader ${exiting ? 'exiting' : ''}`}
      role="status"
      aria-label="Loading"
    >
      <div className="preloader-panels" aria-hidden="true">
        {[0, 1, 2, 3].map((panel) => (
          <span key={panel} style={{ '--i': panel }} />
        ))}
      </div>

      <div className="preloader-content">
        <div className="preloader-label">
          <span>Nelson Wey</span>
          <span>Portfolio 2026</span>
        </div>

        <div className="preloader-counter" aria-hidden="true">
          {String(count).padStart(3, '0')}
          <span>%</span>
        </div>

        <div className="preloader-track" aria-hidden="true">
          <div
            className="preloader-progress"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Preloader;
