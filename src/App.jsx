import { useCallback, useEffect, useRef, useState } from 'react';
import Preloader from './components/Preloader';
import { shouldSkipPreloader } from './lib/preload';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StackMarquee from './components/StackMarquee';
import Footer from './components/Footer';
import SelectedWork from './sections/selectedWork';
import About from './sections/About';
import Contact from './sections/Contact';
import WorkPage from './pages/WorkPage';
import { useRoute } from './lib/route';
import { titles } from './lib/head';

function App() {
  // `loading` keeps the preloader mounted; `ready` starts the hero reveal
  // the moment the preloader's curtain begins to lift.
  const [skip] = useState(shouldSkipPreloader);
  const [loading, setLoading] = useState(!skip);
  const [ready, setReady] = useState(skip);

  const handleReveal = useCallback(() => setReady(true), []);
  const handleDone = useCallback(() => setLoading(false), []);

  const route = useRoute();
  const prevPage = useRef(route.page);

  useEffect(() => {
    document.title = titles[route.page];
  }, [route.page]);

  // The browser only scrolls to #about / #contact if the element already exists.
  // When coming back from the work page it doesn't yet, so do it here. Going to
  // the work page always starts at the top. (Opening a case study, which only
  // changes the slug, leaves the scroll position alone.)
  useEffect(() => {
    if (prevPage.current === route.page) return;
    prevPage.current = route.page;
    if (route.page === 'work') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const id = window.location.hash.slice(1);
    const el = id ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route.page]);

  return (
    <>
      {loading && <Preloader onReveal={handleReveal} onDone={handleDone} />}

      {/* The work page has no nav, just its own Back button. key: the nav
          watches sections by id, so it restarts when the page changes. */}
      {route.page === 'home' && <Navbar ready={ready} key={route.page} />}

      <main>
        {route.page === 'work' ? (
          <WorkPage slug={route.slug} />
        ) : (
          <>
            <Hero ready={ready} />
            <StackMarquee />
            <SelectedWork />
            <About />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;