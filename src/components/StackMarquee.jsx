import { stack } from '../data/stack';

// Three identical copies make the loop seamless (see .marquee-track in the CSS).
// Only the first copy is exposed to screen readers.
function StackMarquee() {
  return (
    <section className="stack" aria-label="Tools and technologies I use">
      <p className="stack-label">Stack &amp; tools</p>

      <div className="marquee">
        <div className="marquee-track">
          {[0, 1, 2].map((copy) => (
            <ul
              className="marquee-group"
              key={copy}
              aria-hidden={copy > 0 ? 'true' : undefined}
            >
              {stack.map(({ name, path }) => (
                <li className="marquee-item" key={name}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={path} />
                  </svg>
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StackMarquee;