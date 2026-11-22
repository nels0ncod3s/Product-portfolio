import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site';

// Optional: set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to send messages
// straight from the form. Without it, the form opens the visitor's email app.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

// Clipboard API needs HTTPS; fall back to execCommand so it also works on plain http.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  }
}

function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error
  const [copied, setCopied] = useState(false);

  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    const ok = await copyText(site.email);
    if (!ok) return; // clipboard blocked: the email is still a visible mailto link
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Message from ${data.name}`);
      const body = encodeURIComponent(
        `${data.message}\n\n${data.name}\n${data.email}`
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const socials = site.socials.filter((s) => s.href);

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-grid">
        <div className="contact-intro">
          <p className="availability">
            <span className="availability-dot" aria-hidden="true" />
            Available for work
          </p>

          <h2>Let’s make something beautiful.</h2>

          <p className="contact-lede">
            Have a project, a role or an idea in mind? Tell me about it
            here, or write to me directly.
          </p>

          <div className="contact-direct">
            <a href={`mailto:${site.email}`} className="contact-email">
              {site.email}
            </a>
            <button
              type="button"
              className={`copy-btn ${copied ? 'is-copied' : ''}`}
              onClick={copyEmail}
              aria-label="Copy email address"
              title={copied ? 'Copied' : 'Copy email'}
            >
              <svg className="icon-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="11" height="11" rx="2.5" />
                <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
              </svg>
              <svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5 10 17.5 19 7" />
              </svg>
            </button>
            <span className="visually-hidden" role="status" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>

          {socials.length > 0 && (
            <ul className="socials">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>

          <label>
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>

          <label>
            <span>Message</span>
            <textarea name="message" rows="5" required />
          </label>

          {/* Honeypot: real visitors never see or fill this. */}
          <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="hp" aria-hidden="true" />

          <button type="submit" className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          <p className="form-status" role="status" aria-live="polite">
            {status === 'sent' && 'Message sent. Thanks for reaching out.'}
            {status === 'mailto' && 'Opening your email app with the message filled in.'}
            {status === 'error' &&
              `Couldn’t send your message. Email ${site.email} instead.`}
          </p>
        </form>
      </div>
    </section>
  );
}

export default Contact;
