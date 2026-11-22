import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

function Navbar({ ready }) {
  const [active, setActive] = useState('work');
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const itemRefs = useRef({});

  // Highlight the section that crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      // Past the top of the page, the bar condenses into the floating pill.
      setScrolled(window.scrollY > 40);

      // The last section can end before it reaches mid-screen, so catch the bottom of the page.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom) setActive('contact');
    };
    onScroll(); // covers a reload that restores a scrolled position
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
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
        Nelson Wey.
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
