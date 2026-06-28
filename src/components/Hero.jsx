import { useRef }          from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion }           from "framer-motion";
import { MaskReveal, FadeReveal } from "./ui/TextReveal";
import Magnetic              from "./ui/Magnetic";

/* ── Three.js rotating wireframe orb ───────────────────────────── */
function FloatingOrb() {
  const meshRef = useRef();
  const t       = useRef(0);

  useFrame((_, delta) => {
    t.current += delta * 0.28;
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.07;
    meshRef.current.rotation.y += delta * 0.11;
    meshRef.current.position.y  = Math.sin(t.current) * 0.35;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 3]} />
      <meshStandardMaterial
        color="#818CF8"
        wireframe
        opacity={0.18}
        transparent
      />
    </mesh>
  );
}

/* ── Hero ───────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "5.5rem" }}
    >
      {/* Background dots */}
      <div
        className="absolute inset-0 bg-dot-pattern pointer-events-none"
        style={{ opacity: 0.32 }}
      />

      {/* Three.js orb — right side */}
      <div
        className="absolute right-0 top-0 bottom-0 pointer-events-none w-full md:w-[52%] opacity-[0.25] md:opacity-55 z-0"
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 4, 2]} intensity={0.8} />
          <pointLight position={[-2, -2, 2]} intensity={0.4} color="#E11D48" />
          <FloatingOrb />
        </Canvas>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="section-container relative z-10 w-full">
        <div style={{ maxWidth: "820px" }}>

          {/* Label — mask reveal */}
          <MaskReveal delay={0.05} duration={0.7} animateOnMount={true}>
            <p className="label-text mb-8">
              AIML Engineer &amp; Full-Stack Developer
            </p>
          </MaskReveal>

          {/* "Hello, I'm" — direct reveal */}
          <div className="overflow-hidden block">
            <motion.span
              style={{
                display:       "block",
                fontFamily:    "var(--font-sans)",
                fontSize:      "clamp(2.2rem, 7vw, 5.5rem)",
                fontWeight:    800,
                letterSpacing: "-0.03em",
                color:         "var(--text)",
                lineHeight:    1.05,
              }}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            >
              Hello, I'm
            </motion.span>
          </div>

          {/* "Vansh." — direct reveal */}
          <div className="overflow-hidden block" style={{ marginBottom: "2rem" }}>
            <motion.span
              className="display-text"
              style={{
                display:       "block",
                fontSize:      "clamp(3rem, 12vw, 10rem)",
                color:         "var(--accent)",
                lineHeight:    0.95,
                letterSpacing: "-0.04em",
              }}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.30 }}
            >
              Vansh.
            </motion.span>
          </div>

          {/* Rotating stamp badge */}
          <div className="w-32 h-32 lg:w-40 lg:h-40 my-6 lg:my-0 lg:absolute lg:right-[8%] lg:top-[22%] flex items-center justify-center z-20 pointer-events-none select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              animate={{ opacity: 0.72, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Spinning Text Ring */}
              <svg className="w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                <path
                  id="circlePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  fill="transparent"
                />
                <text className="fill-zinc-500 dark:fill-zinc-400 font-mono text-[6px] uppercase tracking-[0.2em] font-semibold">
                  <textPath href="#circlePath" startOffset="0%">
                    ✦ AIML RESEARCH ✦ SYSTEM ARCHITECT ✦ FULL-STACK DEV ✦
                  </textPath>
                </text>
              </svg>
              {/* Central Core Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Status Badge */}
          <FadeReveal delay={0.45} animateOnMount={true}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 text-[10px] tracking-wider uppercase text-zinc-600 dark:text-zinc-400 font-mono mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Available for Internships &amp; Projects
            </div>
          </FadeReveal>

          {/* Description */}
          <FadeReveal delay={0.55} style={{ marginBottom: "2.5rem" }} animateOnMount={true}>
            <p
              style={{
                fontSize:  "clamp(1rem, 2vw, 1.2rem)",
                color:     "var(--text-muted)",
                lineHeight: 1.8,
                maxWidth:  "520px",
              }}
            >
              6th-semester AIML Engineering student passionate about deep
              learning, computer vision, and full-stack development. Turning
              complex problems into clean, scalable solutions.
            </p>
          </FadeReveal>

          {/* CTA Buttons — wrapped in Magnetic */}
          <FadeReveal delay={0.65} animateOnMount={true}>
            <div className="flex flex-wrap gap-3">
              <Magnetic strength={0.3} radius={80}>
                <a
                  href="#projects"
                  className="btn-primary"
                  id="hero-view-work"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View my work
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </a>
              </Magnetic>

              <Magnetic strength={0.3} radius={80}>
                <a
                  href="/Vansh_Agrawal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  id="hero-resume"
                >
                  Download CV ↗
                </a>
              </Magnetic>
            </div>
          </FadeReveal>

          {/* Social quick links */}
          <FadeReveal delay={0.78} animateOnMount={true}>
            <div className="flex flex-wrap items-center gap-y-3 gap-x-5 mt-10">
              <span className="label-text" style={{ fontSize: "0.68rem" }}>FIND ME ON</span>
              <div className="flex gap-4">
                {[
                  { label: "GitHub",   url: "https://github.com/vansh070605"        },
                  { label: "LinkedIn", url: "https://linkedin.com/in/thevanshagrawal" },
                  { label: "X",        url: "https://x.com/vansh070605"             },
                ].map((s) => (
                  <Magnetic key={s.label} strength={0.25} radius={60}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-text transition-all duration-200 hover:opacity-100"
                      style={{ fontSize: "0.72rem", opacity: 0.55 }}
                      id={`hero-social-${s.label.toLowerCase()}`}
                    >
                      {s.label}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </FadeReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden sm:flex absolute bottom-16 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
      >
        <span className="label-text" style={{ fontSize: "0.65rem" }}>SCROLL</span>
        <div
          className="w-[1px] h-12"
          style={{
            background: "linear-gradient(to bottom, var(--text-muted), transparent)",
            animation:  "float 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
