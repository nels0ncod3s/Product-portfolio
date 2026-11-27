import { useEffect, useState } from 'react';

// Tiny hash router, so the site stays a static single page (no server rewrites).
//   (anything else)   -> the home page (#work, #about, #contact ... scroll to sections)
//   #/work            -> the full work page
//   #/work/<slug>     -> the work page with that case study open
//   #case-<slug>      -> old case-study links, still understood
export function parseHash(hash) {
  if (hash === '#/work') return { page: 'work', slug: null };
  if (hash.startsWith('#/work/')) return { page: 'work', slug: hash.slice('#/work/'.length) || null };
  if (hash.startsWith('#case-')) return { page: 'work', slug: hash.slice('#case-'.length) || null };
  return { page: 'home', slug: null };
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const sync = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return route;
}

// Change the hash without adding a history entry. replaceState does not fire
// 'hashchange' on its own, so fire it by hand to let useRoute catch up.
export function replaceHash(hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search + hash);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}
