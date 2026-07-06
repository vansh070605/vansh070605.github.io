import { motion, useMotionValue, useSpring, useMotionTemplate, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { TextReveal, MaskRevealRight } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";

const EASE = [0.33, 1, 0.68, 1];

const SERVICE_ID = "service_si7f718";
const TEMPLATE_ID = "template_p1t8lmh";
const PUBLIC_KEY = "pngCmIUDAWre8sQXg";

const SOCIALS = [
  { name: "GitHub", handle: "@vansh070605", url: "https://github.com/vansh070605", emoji: "⌥", id: "contact-social-github" },
  { name: "LinkedIn", handle: "thevanshagrawal", url: "https://linkedin.com/in/thevanshagrawal", emoji: "in", id: "contact-social-linkedin" },
  { name: "X", handle: "@vansh070605", url: "https://x.com/vansh070605", emoji: "𝕏", id: "contact-social-x" },
];

const TEMPLATES = [
  { label: "Say Hello 👋", message: "Hi Vansh!\n\nI came across your portfolio and wanted to reach out to say hello and connect." },
  { label: "Internship Opportunity 💼", message: "Hi Vansh,\n\nWe have an exciting internship opportunity that aligns perfectly with your skills. Let's discuss!" },
  { label: "Project Collaboration 🚀", message: "Hey Vansh,\n\nI have a project idea and would love to collaborate with you. Let's build something cool together!" }
];

const onFocus = (e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.12)"; };
const onBlur = (e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; };

/* ── Hover-sweep social card ── */
function SocialCard({ s, index }) {
  return (
    <motion.a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden flex items-center justify-between rounded-2xl"
      style={{ padding: "1.1rem 1.25rem", background: "var(--bg-surface)", border: "1px solid var(--border)", textDecoration: "none" }}
      initial={{ opacity: 0, x: -50, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: EASE, delay: 0.1 + index * 0.1 }}
      whileHover={{ borderColor: "var(--accent)" }}
      id={s.id}
    >
      {/* Hover fill sweep */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: "var(--accent)", originX: 0 }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.32, ease: EASE }}
      />
      <div className="relative z-10 flex items-center gap-3">
        <span className="group-hover:bg-white/20 group-hover:text-white transition-all duration-300 flex items-center justify-center rounded-xl text-sm font-bold"
          style={{ width: "2.2rem", height: "2.2rem", background: "var(--bg-elevated)", color: "var(--text)" }}>
          {s.emoji}
        </span>
        <div>
          <p className="group-hover:text-white transition-colors duration-300 font-bold text-sm" style={{ color: "var(--text)", lineHeight: 1.2 }}>{s.name}</p>
          <p className="group-hover:text-white/70 transition-colors duration-300 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{s.handle}</p>
        </div>
      </div>
      <span className="relative z-10 group-hover:text-white transition-colors duration-300 text-base" style={{ color: "var(--text-muted)" }}>↗</span>
    </motion.a>
  );
}

export default function Contact() {
  const form = useRef();
  const contactRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({ target: contactRef, offset: ["start end", "end start"] });
  const leftColY = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const leftColSpringY = useSpring(leftColY, { stiffness: 100, damping: 22 });

  const rightColY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const rightColSpringY = useSpring(rightColY, { stiffness: 100, damping: 22 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("vansh070605@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: formData.name, from_email: formData.email,
      email: formData.email, reply_to: formData.email,
      message: formData.message, to_name: "Vansh", to_email: "vansh070605@gmail.com",
    }, PUBLIC_KEY)
      .then(() => { setSent(true); setFormData({ name: "", email: "", message: "" }); setIsLoading(false); setTimeout(() => setSent(false), 5000); })
      .catch((err) => { console.error(err); alert(`Failed: ${err.text || "See console"}`); setIsLoading(false); });
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  return (
    <section id="contact" ref={contactRef} className="overflow-hidden" style={{ background: "var(--bg)", paddingBottom: "6rem" }}>

      {/* Label */}
      <div className="section-container pt-8 pb-0">
        <p className="label-text mb-3">Get In Touch</p>
      </div>

      {/* Giant heading */}
      <div style={{ paddingTop: "1.25rem", paddingBottom: "1.25rem", marginBottom: "2rem" }}>
        <div className="section-container">
          <h2
            className="display-text"
            style={{ fontSize: "clamp(2.6rem, 7vw, 7.5rem)", lineHeight: 0.92, color: "var(--text)", letterSpacing: "-0.025em" }}
          >
            Let's build something great.
          </h2>
        </div>
      </div>

      {/* ── Responsive layout: stacks on mobile, side-by-side on lg ── */}
      <div className="section-container">
        <div className="flex flex-col lg:grid lg:gap-4" style={{ gridTemplateColumns: "5fr 7fr", gap: "1rem" }}>

          {/* ── Left column ── */}
          <motion.div className="flex flex-col justify-between gap-3 mb-8 lg:mb-0 h-full" style={{ y: leftColSpringY }}>

            {/* Dark tagline card */}
            <motion.div
              className="rounded-3xl p-6"
              style={{ background: "var(--text)", color: "var(--bg)" }}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.6rem" }}>Available for</p>
              <p style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", fontWeight: 600, lineHeight: 1.6 }}>
                Internships, collaborations, and interesting project ideas.
                Usually respond within <span style={{ opacity: 0.65, fontStyle: "italic" }}>24 hours.</span>
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Open to Work", "Remote OK", "Chennai-based"].map(tag => (
                  <span key={tag} style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.28rem 0.65rem", borderRadius: "100px" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Social cards */}
            {SOCIALS.map((s, i) => <SocialCard key={s.name} s={s} index={i} />)}



            {/* Email pill */}
            <motion.div
              onClick={handleCopy}
              className="flex items-center justify-between rounded-2xl group cursor-pointer"
              style={{ padding: "1rem 1.25rem", background: "var(--bg-surface)", border: "1px solid var(--border)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              whileHover={{ borderColor: "var(--accent)" }}
              id="contact-email"
            >
              <div className="flex items-center gap-3">
                <span style={{ fontSize: "1.1rem" }}>✉️</span>
                <div>
                  <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.1rem" }}>Email (Click to copy)</p>
                  <p style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.84rem", fontFamily: "var(--font-mono)" }}>vansh070605@gmail.com</p>
                </div>
              </div>
              <button
                type="button"
                style={{
                  background: copied ? "var(--accent)" : "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: copied ? "#fff" : "var(--text)",
                  borderRadius: "8px",
                  padding: "0.3rem 0.6rem",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  transition: "all 0.2s"
                }}
              >
                {copied ? "Copied! ✓" : "Copy"}
              </button>
            </motion.div>
          </motion.div>

          {/* ── Right column: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
            className="group relative"
            style={{ y: rightColSpringY }}
          >
            <form
              ref={form}
              onSubmit={handleSubmit}
              onMouseMove={handleMouseMove}
              className="rounded-3xl flex flex-col gap-4 relative overflow-hidden"
              style={{ background: "var(--bg-surface)", padding: "clamp(1.5rem, 3vw, 2.5rem)", border: "1px solid var(--border)", minHeight: "530px", justifyContent: "center" }}
            >
              {/* Dynamic Glow Effect */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 z-0"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      350px circle at ${mouseX}px ${mouseY}px,
                      rgba(99, 102, 241, 0.12),
                      transparent 80%
                    )
                  `
                }}
              />

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.div
                    key="form-fields"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-4 w-full relative z-10"
                  >
                    <div style={{ marginBottom: "0.25rem" }}>
                      <p style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Send a message</p>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Fill in the details and I'll get back to you.</p>
                    </div>

                    {/* Name + Email — side by side on sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "Your Name", type: "text", name: "user_name", ph: "Enter your name", field: "name", id: "contact-name-input", delay: 0.1 },
                        { label: "Email", type: "email", name: "user_email", ph: "Enter your email", field: "email", id: "contact-email-input", delay: 0.15 },
                      ].map((f) => (
                        <motion.div
                          key={f.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: EASE, delay: f.delay }}
                        >
                          <label style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.45rem" }}>{f.label}</label>
                          <input
                            type={f.type} name={f.name} placeholder={f.ph}
                            value={formData[f.field]} onChange={set(f.field)} required
                            style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "0.75rem", outline: "none", border: "1.5px solid var(--border)", background: "var(--bg-elevated)", color: "var(--text)", fontSize: "0.9rem", fontFamily: "var(--font-sans)", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box" }}
                            onFocus={onFocus} onBlur={onBlur} id={f.id}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quick Template Chips */}
                    <div className="flex flex-col gap-2">
                      <label style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>Quick Templates</label>
                      <div className="flex flex-wrap gap-2">
                        {TEMPLATES.map((tmpl) => (
                          <button
                            key={tmpl.label}
                            type="button"
                            onClick={() => setFormData({ ...formData, message: tmpl.message })}
                            style={{
                              background: formData.message === tmpl.message ? "var(--accent)" : "var(--bg-elevated)",
                              color: formData.message === tmpl.message ? "#fff" : "var(--text)",
                              border: "1px solid var(--border)",
                              borderRadius: "100px",
                              padding: "0.35rem 0.75rem",
                              fontSize: "0.72rem",
                              fontWeight: 500,
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                            className="hover:scale-105 active:scale-95"
                          >
                            {tmpl.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
                    >
                      <label style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.45rem" }}>Message</label>
                      <textarea
                        name="message" placeholder="Tell me about your project or idea..."
                        value={formData.message} onChange={set("message")} required rows={6}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "0.75rem", outline: "none", border: "1.5px solid var(--border)", background: "var(--bg-elevated)", color: "var(--text)", fontSize: "0.9rem", fontFamily: "var(--font-sans)", resize: "none", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box" }}
                        onFocus={onFocus} onBlur={onBlur} id="contact-message-input"
                      />
                    </motion.div>

                    {/* Submit */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.25 }}
                    >
                      <Magnetic strength={0.15} radius={60} className="w-full">
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          style={{ width: "100%", padding: "0.95rem 2rem", borderRadius: "0.75rem", border: "none", fontWeight: 700, fontSize: "0.95rem", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.65 : 1, background: "var(--text)", color: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "background 0.4s" }}
                          whileHover={{ scale: isLoading ? 1 : 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          id="contact-submit-btn"
                        >
                          {isLoading ? "Sending…" : <><span>Send Message</span><span style={{ fontSize: "1rem" }}>→</span></>}
                        </motion.button>
                      </Magnetic>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center text-center p-6 relative z-10 w-full"
                  >
                    {/* Animated Paper Plane / Checkmark Icon */}
                    <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-indigo-500/10"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.25, 1] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                      />
                      <motion.svg
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ x: -20, y: 20, opacity: 0, scale: 0.8 }}
                        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </motion.svg>
                    </div>

                    <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem", letterSpacing: "-0.015em" }}>
                      Message Sent Successfully! 🚀
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "340px", lineHeight: 1.6, marginBottom: "1.8rem" }}>
                      Thank you! Vansh has received your message and will get back to you within 24 hours.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      style={{
                        background: "var(--text)",
                        color: "var(--bg)",
                        padding: "0.65rem 1.4rem",
                        borderRadius: "100px",
                        border: "none",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "var(--shadow-sm)"
                      }}
                      className="hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
