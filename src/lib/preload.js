// The preloader plays once per browser session, so people who come back to the
// page (or follow a direct link to a case study) are never made to wait again.
const KEY = 'preloader-seen';

export function shouldSkipPreloader() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    if (window.location.hash.startsWith('#case-')) return true;
    return window.sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function markPreloaderSeen() {
  try {
    window.sessionStorage.setItem(KEY, '1');
  } catch {
    /* private mode: it simply plays again next time */
  }
}
