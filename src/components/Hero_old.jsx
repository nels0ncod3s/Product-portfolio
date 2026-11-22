function Hero({ ready }) {
  return (
    <section className={`hero ${ready ? 'is-ready' : ''}`} id="home">
      <h1 className="hero-title" aria-label="Hi, I'm Nelson. Product Designer.">
        <span className="line" aria-hidden="true">
          <span style={{ '--d': 0 }}>Hi, I’m Nelson.</span>
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
