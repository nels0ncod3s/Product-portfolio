import { useEffect, useRef } from 'react';
import PhoneShowcase from './PhoneShowcase';

// A modal case study. Uses the native <dialog>, so Esc to close, focus
// trapping and an inert background all come for free.
function CaseStudy({ project, study, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    // No cleanup that closes the dialog: React StrictMode (used by `npm run dev`)
    // runs effects twice, and closing here made the case study open and then
    // instantly close. Removing the element already removes it from the screen.
    return undefined;
  }, []);

  const close = () => {
    const dialog = ref.current;
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      dialog.close(); // fires the dialog's own close event, which calls onClose
    } else {
      dialog.removeAttribute('open'); // very old browsers
      onClose();
    }
  };

  return (
    <dialog
      className="case"
      ref={ref}
      aria-labelledby="case-title"
      onClose={() => {
        // Ignore a stale 'close' event if the dialog has since been reopened.
        if (!ref.current?.open) onClose();
      }}
      onClick={(event) => {
        // A click on the dimmed backdrop lands on the <dialog> itself.
        if (event.target === ref.current) close();
      }}
    >
      <div className="case-inner">
        <button type="button" className="case-close" onClick={close} aria-label="Close case study">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <header className="case-head">
          <p className="eyebrow">Case study</p>
          <h2 id="case-title">{project.name}</h2>
          <p className="case-tagline">{study.tagline}</p>

          <dl className="case-meta">
            <div>
              <dt>Role</dt>
              <dd>{study.role}</dd>
            </div>
            {study.status && (
              <div>
                <dt>Status</dt>
                <dd>{study.status}</dd>
              </div>
            )}
            <div>
              <dt>Stack</dt>
              <dd>{study.stack.join(', ')}</dd>
            </div>
            {study.links?.length > 0 && (
              <div>
                <dt>Links</dt>
                <dd>
                  {study.links.map(({ label, href }) => (
                    <a href={href} target="_blank" rel="noreferrer" key={href}>
                      {label} ↗
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </header>

        {project.kind === 'mobile' ? (
          <div className="case-phones">
            <PhoneShowcase screens={project.screens} alt={project.alt} />
          </div>
        ) : (
          project.image && (
            <img className="case-image" src={project.image} alt={project.alt} />
          )
        )}

        <div className="case-body">
          {study.sections.map(({ heading, body, list }) => (
            <section key={heading}>
              <h3>{heading}</h3>
              {body?.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
              {list && (
                <ul>
                  {list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </dialog>
  );
}

export default CaseStudy;
