import { useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { profile, socials, emailjsConfig } from "../data/content";
import Heading from "./Heading";

const EASE = [0.16, 1, 0.3, 1];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, message }) {
  const e = {};
  if (!name.trim()) e.name = "Add your name so I know who's writing.";
  if (!EMAIL_RE.test(email.trim())) e.email = "Enter an email address I can reply to, like you@example.com.";
  if (message.trim().length < 10) e.message = "Write at least a sentence about what you have in mind.";
  return e;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // Everything in the section plays in once it comes into view, in sequence
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.15 });
  const show = reduce || seen;
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked: the mailto link still works */ }
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, {
        from_name: form.name, from_email: form.email, email: form.email, reply_to: form.email,
        message: form.message, to_name: "Vansh", to_email: profile.email,
      }, emailjsConfig.publicKey);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("failed");
    }
  };

  const field = (k, label, props = {}) => (
    <div className="field">
      <label htmlFor={`f-${k}`}>{label}</label>
      {props.rows ? (
        <textarea id={`f-${k}`} value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} {...props} />
      ) : (
        <input id={`f-${k}`} value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} {...props} />
      )}
      {errors[k] && <p id={`e-${k}`} className="field-error">{errors[k]}</p>}
    </div>
  );

  return (
    <section id="contact" className="section">
      <div className="wrap stage">
        <div className="cloud-anchor left" data-cloud-anchor aria-hidden="true" />
        <div className="stage-right" ref={ref}>
          <Heading>Have a role or a project in mind?</Heading>
          <a href={`mailto:${profile.email}`} className="contact-mail link">
            <span className="sr-only">{profile.email}</span>
            {/* Address types itself in, letter by letter */}
            <span className="mail-chars" aria-hidden="true">
              {[...profile.email].map((ch, i) => (
                <m.span
                  key={i}
                  initial={reduce ? false : { y: "110%", opacity: 0 }}
                  animate={show ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.022 }}
                >
                  {ch}
                </m.span>
              ))}
            </span>
          </a>
          <m.div className="contact-actions" {...rise(0.6)}>
            <button className="btn-text link" onClick={copy}>{copied ? "Copied to clipboard" : "Copy email address"}</button>
            <span className="muted">I usually reply within a day.</span>
          </m.div>

          <form className="form" onSubmit={submit} noValidate>
            <m.div {...rise(0.7)}>{field("name", "Your name", { autoComplete: "name" })}</m.div>
            <m.div {...rise(0.8)}>{field("email", "Your email", { type: "email", autoComplete: "email" })}</m.div>
            <m.div {...rise(0.9)}>{field("message", "What would you like to build?", { rows: 4 })}</m.div>
            <m.div className="form-row" {...rise(1)}>
              <button className="btn" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending message…" : "Send message"}
              </button>
              <p className="form-status" role="status">
                {status === "sent" && "Message sent. I'll reply to the address you gave."}
                {status === "failed" && (
                  <span style={{ color: "var(--signal)" }}>
                    The message didn't send. Try again, or email {profile.email} directly.
                  </span>
                )}
              </p>
            </m.div>
          </form>

          <ul className="socials" aria-label="Elsewhere">
            {socials.map((s, i) => (
              <m.li key={s.name} {...rise(1.1 + i * 0.08)}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  <span>{s.name}</span>
                  <span className="social-handle">
                    @{s.handle}
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                  </span>
                </a>
              </m.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
