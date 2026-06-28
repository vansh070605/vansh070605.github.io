import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef } from "react";
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

const onFocus = (e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.12)"; };
const onBlur = (e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; };

/* ── Hover-sweep social card ── */
function SocialCard({ s, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });

  const onMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.18);
  };

  return (
    <motion.a
      ref={cardRef}
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden flex items-center justify-between rounded-2xl"
      style={{ padding: "1.1rem 1.25rem", background: "var(--bg-surface)", border: "1px solid var(--border)", textDecoration: "none", x: sx, y: sy }}
      initial={{ opacity: 0, x: -50, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: EASE, delay: 0.1 + index * 0.1 }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
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
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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
    <section id="contact" className="overflow-hidden" style={{ background: "var(--bg)", paddingBottom: "6rem" }}>

      {/* Label */}
      <div className="section-container pt-24 pb-0">
        <MaskRevealRight delay={0} duration={0.7}>
          <p className="label-text mb-5">Get In Touch</p>
        </MaskRevealRight>
      </div>

      {/* Giant heading with ruled lines */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", paddingTop: "1.75rem", paddingBottom: "1.75rem", marginBottom: "3.5rem" }}>
        <div className="section-container">
          <TextReveal
            as="h2"
            className="display-text"
            style={{ fontSize: "clamp(2.6rem, 7vw, 7.5rem)", lineHeight: 0.92, color: "var(--text)", letterSpacing: "-0.025em" }}
            delay={0.05} stagger={0.055} duration={1.1}
          >
            Let's build something great.
          </TextReveal>
        </div>
      </div>

      {/* ── Responsive layout: stacks on mobile, side-by-side on lg ── */}
      <div className="section-container">
        <div className="flex flex-col lg:grid lg:gap-4" style={{ gridTemplateColumns: "5fr 7fr", gap: "1rem" }}>

          {/* ── Left column ── */}
          <div className="flex flex-col gap-3 mb-8 lg:mb-0">

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
                  <span key={tag} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)", fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.28rem 0.65rem", borderRadius: "100px" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Social cards */}
            {SOCIALS.map((s, i) => <SocialCard key={s.name} s={s} index={i} />)}

            {/* Email pill */}
            <motion.a
              href="mailto:vansh070605@gmail.com"
              className="flex items-center gap-3 rounded-2xl"
              style={{ padding: "1rem 1.25rem", background: "var(--bg-surface)", border: "1px solid var(--border)", textDecoration: "none" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              whileHover={{ borderColor: "var(--accent)", scale: 1.01 }}
              id="contact-email"
            >
              <span style={{ fontSize: "1.1rem" }}>✉️</span>
              <div>
                <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.1rem" }}>Email</p>
                <p style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.84rem", fontFamily: "var(--font-mono)" }}>vansh070605@gmail.com</p>
              </div>
            </motion.a>
          </div>

          {/* ── Right column: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
          >
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="rounded-3xl flex flex-col gap-4"
              style={{ background: "var(--bg-surface)", padding: "clamp(1.5rem, 3vw, 2.5rem)", border: "1px solid var(--border)" }}
            >
              <div style={{ marginBottom: "0.25rem" }}>
                <p style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Send a message</p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Fill in the details and I'll get back to you.</p>
              </div>

              {/* Name + Email — side by side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Your Name", type: "text", name: "user_name", ph: "Enter your name", field: "name", id: "contact-name-input", delay: 0.28 },
                  { label: "Email", type: "email", name: "user_email", ph: "Enter your email", field: "email", id: "contact-email-input", delay: 0.36 },
                ].map((f) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, ease: EASE, delay: f.delay }}
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

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.44 }}
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
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.54 }}
              >
                <Magnetic strength={0.18} radius={70} className="w-full">
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    style={{ width: "100%", padding: "0.95rem 2rem", borderRadius: "0.75rem", border: "none", fontWeight: 700, fontSize: "0.95rem", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.65 : 1, background: sent ? "#16a34a" : "var(--text)", color: sent ? "#fff" : "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "background 0.4s" }}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    id="contact-submit-btn"
                  >
                    {sent ? "✓ Sent!" : isLoading ? "Sending…" : <><span>Send Message</span><span style={{ fontSize: "1rem" }}>→</span></>}
                  </motion.button>
                </Magnetic>
              </motion.div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
