import { useEffect, useState } from 'react';
import { site } from '../data/site';

function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: site.timeZone,
  }).format(now);

  return <span>Lagos, {time} WAT</span>;
}

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-wrap">
        <p className="footer-wordmark" aria-hidden="true">{site.name}</p>

        <div className="footer-inner">
          <p>© {year} {site.name}</p>

          <nav className="footer-links" aria-label="Footer">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="footer-end">
            <LocalTime />
            <a href="#home">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
