import { useCallback, useState } from 'react';
import Preloader from './components/Preloader';
import { shouldSkipPreloader } from './lib/preload';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StackMarquee from './components/StackMarquee';
import Footer from './components/Footer';
import SelectedWork from './sections/selectedWork';
import About from './sections/About';
import Contact from './sections/Contact';

function App() {
  // `loading` keeps the preloader mounted; `ready` starts the hero reveal
  // the moment the preloader's curtain begins to lift.
  const [skip] = useState(shouldSkipPreloader);
  const [loading, setLoading] = useState(!skip);
  const [ready, setReady] = useState(skip);

  const handleReveal = useCallback(() => setReady(true), []);
  const handleDone = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <Preloader onReveal={handleReveal} onDone={handleDone} />}

      <Navbar ready={ready} />

      <main>
        <Hero ready={ready} />
        <StackMarquee />
        <SelectedWork />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;