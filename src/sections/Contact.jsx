import { useState } from 'react';
import { site } from '../data/site';

// Optional: set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to send messages
// straight from the form. Without it, the form opens the visitor's email app.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the email is still a visible mailto link */
    }
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
            <button type="button" className="copy-btn" onClick={copyEmail}>
              {copied ? 'Copied' : 'Copy email'}
            </button>
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
