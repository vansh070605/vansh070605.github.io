import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { TextReveal, MaskRevealRight } from "./ui/TextReveal";

const EASE = [0.33, 1, 0.68, 1];

const STATS = [
  { value: "7.86", label: "CGPA", decimals: 2, suffix: "/10" },
  { value: "60", label: "Projects Built", decimals: 0, suffix: "+" },
  { value: "3", label: "Internships", decimals: 0, suffix: "" },
  { value: "7", label: "Semester", decimals: 0, suffix: "th" },
];

const TAGS = ["Deep Learning", "Computer Vision", "Transformers", "Full-Stack", "React", "Python", "PyTorch", "Next.js"];

/* ── Animated counter ── */
function Counter({ value, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const numericValue = parseFloat(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        import("framer-motion").then(({ animate }) => {
          animate(0, numericValue, {
            duration: 1.8, ease: [0.16, 1, 0.3, 1],
            onUpdate(v) { node.textContent = v.toFixed(decimals) + suffix; },
          });
        });
      }
    }, { threshold: 0.1 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [numericValue, decimals, suffix]);

  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>0{suffix}</span>;
}

/* ── Scrolling marquee strip ── */
function Marquee({ children, speed = 30 }) {
  return (
    <div style={{ overflow: "hidden", display: "flex" }}>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          style={{ display: "flex", gap: "3rem", flexShrink: 0, whiteSpace: "nowrap" }}
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  const onMove = (e) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.04);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.04);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="overflow-hidden"
      style={{ background: "var(--bg)", paddingBottom: "5rem" }}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {/* Label */}
      <div className="section-container pt-24 pb-0">
        <MaskRevealRight delay={0} duration={0.7}>
          <p className="label-text mb-5">About Me</p>
        </MaskRevealRight>
      </div>

      {/* Giant headline */}
      <div className="section-container pb-10">
        <TextReveal
          as="h2"
          className="display-text"
          style={{ fontSize: "clamp(2.6rem, 7vw, 7rem)", lineHeight: 0.96, color: "var(--text)", letterSpacing: "-0.02em" }}
          delay={0.05} stagger={0.06} duration={1.1}
        >
          I build things that think.
        </TextReveal>
      </div>

      {/* Marquee */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", paddingTop: "0.8rem", paddingBottom: "0.8rem", marginBottom: "3.5rem" }}>
        <Marquee speed={28}>
          {TAGS.concat(TAGS).map((tag, i) => (
            <span key={i} style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: i % 4 === 1 ? "var(--accent)" : "var(--text-muted)" }}>
              {tag} <span style={{ opacity: 0.3, margin: "0 0.4rem" }}>✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── Responsive bento grid ── */}
      <div className="section-container">
        {/*
          Mobile  : single column stack
          lg+     : [photo | right-col]  → right col has [bio | stats | [dark-card | location]]
        */}
        <div className="flex flex-col lg:grid lg:gap-4" style={{ gridTemplateColumns: "5fr 7fr", gap: "1rem" }}>

          {/* ── Photo card ── */}
          <motion.div
            ref={photoRef}
            className="relative overflow-hidden rounded-3xl mb-4 lg:mb-0"
            style={{ background: "var(--bg-surface)", minHeight: "380px" }}
            initial={{ opacity: 0, scale: 0.93, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <motion.img
              src="/new_photo.png"
              alt="Vansh Agrawal"
              className="w-full h-full object-cover object-top block"
              style={{ minHeight: "380px", y: photoY, scale: 1.1 }}
            />
            {/* Gradient */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
            {/* Role tags */}
            <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
              {["AIML Engineer", "Full-Stack Dev"].map(t => (
                <span key={t} style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.3rem 0.7rem", borderRadius: "100px" }}>
                  {t}
                </span>
              ))}
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute top-5 right-4"
              style={{ background: "var(--bg-elevated)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", borderRadius: "100px", padding: "0.45rem 0.9rem", fontSize: "0.78rem", fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap", x: smx, y: smy, zIndex: 5 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
            >
              ✨ Open to Work
            </motion.div>
          </motion.div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-4">

            {/* Bio card */}
            <motion.div
              className="rounded-3xl p-6 md:p-8"
              style={{ background: "var(--bg-surface)" }}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            >
              <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: 1.8, color: "var(--text-muted)" }}>
                I'm <strong style={{ color: "var(--text)", fontWeight: 700 }}>Vansh Agrawal</strong> — a 7th-semester AIML Engineering student at SRM IST, Chennai.
                I believe in turning intelligent algorithms into real products. Currently deep in{" "}
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>transformers</span>,{" "}
                <span style={{ color: "#f43f5e", fontWeight: 600 }}>computer vision</span>, and{" "}
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>full-stack architecture</span>.
              </p>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl p-4 text-center"
                  style={{ background: i === 0 ? "var(--accent)" : "var(--bg-surface)", cursor: "default" }}
                  initial={{ opacity: 0, y: 28, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.09 }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                >
                  <p style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 800, lineHeight: 1, marginBottom: "0.3rem", fontFamily: "var(--font-display)", color: i === 0 ? "#fff" : "var(--text)" }}>
                    <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </p>
                  <p style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: i === 0 ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bottom row: dark card + location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Dark "currently exploring" card */}
              <motion.div
                className="sm:col-span-2 rounded-3xl p-6"
                style={{ background: "var(--text)", color: "var(--bg)", minHeight: "140px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
              >
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.75rem" }}>Currently Exploring</p>
                <p style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", fontWeight: 600, lineHeight: 1.55 }}>
                  Turning complex algorithms into clean, maintainable code{" "}
                  <em style={{ opacity: 0.6, fontStyle: "italic" }}>that actually ships.</em>
                </p>
              </motion.div>

              {/* Location card */}
              <motion.div
                className="rounded-3xl p-5 flex flex-col items-center justify-center gap-2 text-center"
                style={{ background: "var(--bg-surface)" }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.3 }}
              >
                <span style={{ fontSize: "1.75rem" }}>📍</span>
                <p style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.9rem" }}>Chennai</p>
                <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>India</p>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
