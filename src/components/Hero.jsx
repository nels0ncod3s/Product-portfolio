// To show your photo: put it at src/assets/me.jpg, then uncomment the import
// and set PHOTO = me. Until then a dashed placeholder holds the space.
import me from '../assets/me.jpg';

const PHOTO = me; // e.g. me

function Hero({ ready }) {
  return (
    <section className={`hero ${ready ? 'is-ready' : ''}`} id="home">
      <h1 className="hero-title" aria-label="Hi, I’m Nelson. Product Designer.">
        <span className="line" aria-hidden="true">
          <span className="line-inline" style={{ '--d': 0 }}>
            <span>Hi</span>
            <span className="wave">👋</span>
            <span className={`hero-photo ${PHOTO ? 'has-image' : ''}`}>
              {PHOTO ? (
                <img src={PHOTO} alt="" />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                </svg>
              )}
            </span>
            <span>I’m Nelson.</span>
          </span>
        </span>
        <span className="line" aria-hidden="true">
          <span style={{ '--d': 130 }}>Product Designer</span>
        </span>
      </h1>

      <p className="hero-sub reveal" style={{ '--d': 420 }}>
        Design Engineer in Lagos, I enjoy turning complex ideas into intuitive digital experiences. 
        From developer tools to SaaS products.
      </p>

      <a href="#contact" className="btn reveal" style={{ '--d': 560 }}>
        Get in touch
      </a>
    </section>
  );
}

export default Hero;
