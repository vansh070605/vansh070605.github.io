import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { MaskReveal, TextReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";

const projects = [
  {
    id: 1,
    num: "01",
    name: "LitterVision",
    category: "AI/ML",
    description: "Litter detection and classification system using computer vision and deep learning to identify different types of waste from real-world images.",
    tech: ["Python", "TensorFlow", "Flask", "OpenCV"],
    github: "https://github.com/vansh070605/LitterVision.git",
    live: "https://litter-vision.onrender.com/",
    accent: "#D97706",
    emoji: "♻️",
  },
  {
    id: 2,
    num: "02",
    name: "MultiGesture",
    category: "AI/ML",
    description: "Real-time hand gesture recognition system utilizing MediaPipe, OpenCV, and a TensorFlow/Keras deep learning model.",
    tech: ["Python", "OpenCV", "MediaPipe", "TensorFlow"],
    github: "https://github.com/vansh070605/MULTI-GESTURE-DETECTOR.git",
    live: "https://www.linkedin.com/in/thevanshagrawal",
    accent: "#4F46E5",
    emoji: "🤚",
  },
  {
    id: 3,
    num: "03",
    name: "AERIS",
    category: "AI/ML",
    description: "AI-driven emergency management platform replacing reactive disaster response with proactive ML-powered intelligence, built for Bihar's annual flood crisis.",
    tech: ["Python", "Flask", "Scikit-learn", "MySQL"],
    github: "https://github.com/vansh070605/AERIS.git",
    live: "#",
    accent: "#E11D48",
    emoji: "🌊",
  },
  {
    id: 4,
    num: "04",
    name: "Voxera",
    category: "Web App",
    description: "Real-time WebRTC application for peer-to-peer voice, video, and screen sharing with Socket.io integration.",
    tech: ["Node.js", "WebRTC", "Socket.io", "React"],
    github: "https://github.com/vansh070605/Voxera.git",
    live: "https://voxera-rtc.netlify.app/",
    accent: "#6B8F71",
    emoji: "📹",
  },
  {
    id: 5,
    num: "05",
    name: "CareerExplorer",
    category: "Full-Stack",
    description: "Explainable career recommendation engine mapping student profiles to ranked career suggestions using machine learning.",
    tech: ["React", "Python", "Flask", "ML"],
    github: "https://github.com/vansh070605/Career-Path-Explorer.git",
    live: "#",
    accent: "#818CF8",
    emoji: "🧭",
  },
  {
    id: 6,
    num: "06",
    name: "EmployeeTrack",
    category: "Full-Stack",
    description: "Employee work session tracking system with secure authentication and productivity analytics dashboard.",
    tech: ["Node.js", "MongoDB", "Express", "JWT"],
    github: "https://github.com/vansh070605/EMPLOYEE-DASHBOARD.git",
    live: "https://kanban-employee-dashboard.vercel.app/",
    accent: "#0EA5E9",
    emoji: "📊",
  },
];

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);

  const [activeNum, setActiveNum] = useState("01");
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(() => typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth);
      }
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportWidth > 0 && viewportWidth < 768;

  // Vertical scroll space driving horizontal track scroll (Desktop only)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const maxScroll = -(trackWidth - viewportWidth + 100);
  const x = useTransform(scrollYProgress, [0, 1], [0, maxScroll < 0 ? maxScroll : 0]);
  const smoothX = useSpring(x, { stiffness: 60, damping: 18, mass: 0.8 });

  // Update background counter based on active visible card
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * projects.length),
        projects.length - 1
      );
      setActiveNum(projects[idx].num);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div id="projects" ref={containerRef} className={`relative bg-cream dark:bg-zinc-950 ${isMobile ? "py-16" : "h-[350vh]"}`}>
      {/* Sticky layout container (only sticky on desktop) */}
      <div className={`${isMobile ? "flex flex-col gap-16" : "sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-16"}`}>

        {/* Section title — clip-path wipe entrance */}
        <div className="section-container w-full">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.33,1,0.68,1] }}
          >
            <p className="label-text mb-2 text-indigo">Works Showcase</p>
          </motion.div>
          <TextReveal
            as="h2"
            className="display-text text-zinc-900 dark:text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            delay={0.06}
            stagger={0.06}
            duration={0.9}
          >
            Things I've built.
          </TextReveal>
        </div>

        {/* Giant morphing background numbering (hidden on mobile for cleaner look) */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-10 dark:opacity-[0.03]">
            <motion.div
              key={activeNum}
              initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.3, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="font-display italic text-[35vw] leading-none text-zinc-900 dark:text-white"
            >
              {activeNum}
            </motion.div>
          </div>
        )}

        {/* Projects track (horizontal on desktop, vertical stack on mobile) */}
        <div className="relative flex-grow flex items-center z-10 w-full">
          <motion.div
            ref={trackRef}
            style={isMobile ? {} : { x: smoothX }}
            className={`flex w-full ${isMobile ? "flex-col items-center gap-12 px-6" : "items-center gap-16 px-[20vw] h-[480px]"}`}
          >
            {projects.map((project, idx) => (
              <ProjectScrollCard key={project.id} project={project} index={idx} isMobile={isMobile} />
            ))}
          </motion.div>
        </div>

        {/* Swipe tips (hidden on mobile since it scrolls vertically) */}
        {!isMobile && (
          <div className="section-container w-full flex items-center justify-between z-10 text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider">
            <p>◀ SCROLL TO DISCOVER PROJECTS ▶</p>
            <p>HOVER CARDS TO TILT &amp; GLOW ⚡</p>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── Project Scroll Card component ── */
function ProjectScrollCard({ project, index, isMobile }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 20 });

  const [hovered, setHovered] = useState(false);
  const [coords, setCoords]   = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isMobile) return; // Disable tilt on mobile
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    
    // Spotlight coordinates relative to card
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // 3D tilt angles
    const mx = e.clientX - rect.left - w / 2;
    const my = e.clientY - rect.top - h / 2;
    x.set(-my / 10);
    y.set(mx / 10);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      initial={isMobile
        ? { opacity: 0, y: 60, filter: "none", clipPath: "inset(20% 0 20% 0 round 2rem)" }
        : { opacity: 0, scale: 0.88, rotateY: 12, filter: "blur(6px)", clipPath: "inset(0 0 30% 0 round 2.5rem)" }
      }
      whileInView={isMobile
        ? { opacity: 1, y: 0, filter: "none", clipPath: "inset(0% 0 0% 0 round 2rem)" }
        : { opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)", clipPath: "inset(0% 0 0% 0 round 2.5rem)" }
      }
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: isMobile ? 0.05 * index : index * 0.1 }}
      style={isMobile ? {
        boxShadow: hovered ? `0 20px 40px ${project.accent}1c` : "var(--shadow-sm)",
        borderTop: `4px solid ${hovered ? project.accent : `${project.accent}55`}`,
      } : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        y: isEven ? -20 : 20,
        boxShadow: hovered ? `0 30px 60px ${project.accent}24` : "var(--shadow-md)",
        borderTop: `4px solid ${hovered ? project.accent : `${project.accent}55`}`,
      }}
      className={`relative p-8 rounded-[2.5rem] glass dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-300 w-full max-w-[500px] flex-shrink-0 z-20 flex flex-col justify-between ${isMobile ? "h-auto min-h-[380px]" : "h-[400px] cursor-none"}`}
    >
      {/* Glow spotlight follow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-[2.5rem]"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${project.accent}14, transparent 80%)`,
          opacity: hovered ? 1 : 0,
          zIndex: 0,
        }}
      />

      {/* Contents inside 3D layered space */}
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full justify-between">
        
        {/* Top details */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span
                className="flex items-center justify-center w-11 h-11 rounded-2xl text-2xl"
                style={{ background: `${project.accent}18` }}
              >
                {project.emoji}
              </span>
              <span className="tag-pill text-[10px] font-bold uppercase tracking-wider">
                {project.category}
              </span>
            </div>
            <span
              className="font-display italic text-3xl transition-all duration-300"
              style={{
                color: hovered ? project.accent : "var(--text-subtle)",
                opacity: hovered ? 0.75 : 0.45,
              }}
            >
              {project.num}
            </span>
          </div>

          <h3
            className="font-display italic text-4xl mb-3"
            style={{ color: project.accent }}
          >
            {project.name}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
            {project.description}
          </p>
        </div>

        {/* Bottom tags + actions */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all duration-300"
                style={{
                  background: hovered ? `${project.accent}12` : "var(--bg-surface)",
                  color: hovered ? project.accent : "var(--text-muted)",
                  borderColor: hovered ? `${project.accent}30` : "var(--border)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div
            className="flex items-center gap-4 pt-5"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <Magnetic strength={0.25} radius={60}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:opacity-70 text-zinc-500"
                id={`project-github-scroll-${project.id}`}
              >
                <GitHubIcon /> GitHub
              </a>
            </Magnetic>

            {project.live !== "#" && (
              <Magnetic strength={0.3} radius={70} className="ml-auto">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:opacity-85"
                  style={{ background: project.accent }}
                  id={`project-live-scroll-${project.id}`}
                >
                  <ExternalIcon /> Live Demo
                </a>
              </Magnetic>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
