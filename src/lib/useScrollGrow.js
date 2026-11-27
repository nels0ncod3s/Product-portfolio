import { useEffect } from 'react';

// Scroll-linked grow: each card scales up into place as it enters the screen and
// shrinks back if you scroll up past it. It sets --grow (0 to 1) on every
// .project; the CSS decides how much that scales (see .project-frame).
export function useScrollGrow(ref) {
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
