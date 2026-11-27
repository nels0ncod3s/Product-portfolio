import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

// Order matters: it must match the order of the sections on the page, top to bottom.
const links = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

function Navbar({ ready }) {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const itemRefs = useRef({});

  // Highlight the section you are in: the last one whose top has passed a line
  // 40% down the screen. Re-checked on every scroll, so it stays right when
  // scrolling up too (the hero counts as "home", the marquee as part of it).
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      // Past the top of the page, the bar condenses into the floating pill.
      setScrolled(window.scrollY > 40);

      const probe = window.innerHeight * 0.4;
      let current = null;
      let first = null;
      links.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (!first) first = id;
        if (el.getBoundingClientRect().top <= probe) current = id;
      });

      // The last section can end before it reaches the line, so catch the bottom of the page.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom && document.getElementById('contact')) current = 'contact';

      setActive(current ?? first ?? 'home');
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update(); // covers a reload that restores a scrolled position
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Slide the highlight pill under the active link.
  useLayoutEffect(() => {
    const measure = () => {
      const el = itemRefs.current[active];
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  return (
    <header
      className={`nav ${ready ? 'is-ready' : ''} ${scrolled ? 'is-scrolled' : ''}`}
    >
      <div className="nav-inner">
      <a href="#home" className="nav-logo">
        Nelson Wey
      </a>

      <nav className="nav-pill" aria-label="Primary">
        <div className="nav-links">
          <span
            className="nav-indicator"
            aria-hidden="true"
            style={{
              transform: `translateX(${pill.x}px)`,
              width: pill.w,
              opacity: pill.w ? 1 : 0,
            }}
          />
          <ul>
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  ref={(el) => (itemRefs.current[id] = el)}
                  className={active === id ? 'is-active' : ''}
                  aria-current={active === id ? 'true' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <span className="nav-sep" aria-hidden="true" />
        <ThemeToggle />
      </nav>

      <a href="#contact" className="nav-status">
        <span className="availability-dot" aria-hidden="true" />
        Available for work
      </a>
      </div>
    </header>
  );
}

export default Navbar;
