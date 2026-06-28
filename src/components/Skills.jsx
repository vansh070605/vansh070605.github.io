import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MaskReveal, TextReveal } from "./ui/TextReveal";
import Magnetic from "./ui/Magnetic";

const SKILL_CATEGORIES = {
  "AI / ML": [
    { name: "Python",      level: 95, icon: "🐍" },
    { name: "TensorFlow",  level: 88, icon: "🔶" },
    { name: "PyTorch",     level: 85, icon: "🔥" },
    { name: "Scikit-learn",level: 90, icon: "📐" },
    { name: "NumPy",       level: 92, icon: "🔢" },
    { name: "Pandas",      level: 90, icon: "🐼" },
  ],
  "Web Dev": [
    { name: "React",       level: 92, icon: "⚛️" },
    { name: "JavaScript",  level: 90, icon: "🟨" },
    { name: "Node.js",     level: 85, icon: "🟩" },
    { name: "Flask",       level: 88, icon: "🌶️" },
    { name: "HTML/CSS",    level: 95, icon: "🌐" },
  ],
  "Vision": [
    { name: "OpenCV",      level: 90, icon: "👁️" },
    { name: "MediaPipe",   level: 85, icon: "🖐️" },
    { name: "YOLO",        level: 82, icon: "📸" },
    { name: "NumPy",       level: 92, icon: "🔢" },
  ],
  "Tools": [
    { name: "Git",         level: 90, icon: "🌿" },
    { name: "Linux",       level: 85, icon: "🐧" },
    { name: "Docker",      level: 82, icon: "🐳" },
    { name: "MySQL",       level: 88, icon: "🗄️" },
  ],
};

const ACCENT_COLORS = {
  "AI / ML": "#4F46E5",
  "Web Dev":  "#E11D48",
  "Vision":   "#D97706",
  "Tools":    "#6B8F71",
};

const TABS = Object.keys(SKILL_CATEGORIES);

export default function Skills() {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);

  const [activeTab, setActiveTab] = useState(TABS[0]);
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

  // useScroll linked to container vertical scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const maxScroll = -(trackWidth - viewportWidth + 100);
  const x = useTransform(scrollYProgress, [0, 1], [0, maxScroll < 0 ? maxScroll : 0]);
  const smoothX = useSpring(x, { stiffness: 60, damping: 18, mass: 0.8 });

  // Update active category tab dynamically based on horizontal scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * TABS.length),
        TABS.length - 1
      );
      setActiveTab(TABS[idx]);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Click a tab pill to scroll to its corresponding vertical progress offset
  const handleTabClick = (tabIndex) => {
    if (isMobile) {
       // On mobile, just scroll to the category panel natively
       const el = document.getElementById(`skill-cat-${TABS[tabIndex]}`);
       if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
       return;
    }
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const targetScroll = scrollTop + (tabIndex / (TABS.length - 1)) * (containerRef.current.offsetHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  // Skill marquee scroll driven translation
  const tickerX = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const smoothTickerX = useSpring(tickerX, { stiffness: 70, damping: 22 });

  return (
    <div id="skills" ref={containerRef} className={`relative bg-cream dark:bg-zinc-950 ${isMobile ? "py-16" : "h-[300vh]"}`}>
      {/* Sticky layout container */}
      <div className={`${isMobile ? "flex flex-col gap-12" : "sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-16"}`}>

        {/* Header and navigation tabs */}
        <div className="section-container w-full z-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.33,1,0.68,1] }}
              >
                <p className="label-text mb-2 text-indigo">Tech Stacks</p>
              </motion.div>
              <TextReveal
                as="h2"
                className="display-text text-zinc-900 dark:text-white"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                delay={0.06}
                stagger={0.07}
                duration={1.0}
              >
                What I work with.
              </TextReveal>
            </div>

            {/* Scroll navigation tabs */}
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab, idx) => {
                const isActive = activeTab === tab;
                const accentColor = ACCENT_COLORS[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(idx)}
                    className="relative px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors duration-300 outline-none cursor-none"
                    style={{
                      color: isActive ? "#fff" : "var(--text-muted)",
                      border: `1.5px solid ${isActive ? accentColor : "var(--border)"}`,
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-indicator-scroll"
                        className="absolute inset-0 rounded-full -z-10"
                        style={{
                          background: accentColor,
                          boxShadow: `0 4px 16px ${accentColor}40`,
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Giant morphing background category name display */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-10 dark:opacity-[0.03]">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="font-display italic text-[24vw] leading-none text-zinc-900 dark:text-white"
            >
              {activeTab}
            </motion.div>
          </div>
        )}

        {/* Horizontal scrollable track for the categories */}
        <div className="relative flex-grow flex items-center z-10 w-full">
          <motion.div
            ref={trackRef}
            style={isMobile ? {} : { x: smoothX }}
            className={`flex w-full ${isMobile ? "flex-col gap-20 px-6" : "items-center gap-24 px-[20vw] h-[340px]"}`}
          >
            {TABS.map((tab) => (
              <CategoryPanel
                key={tab}
                categoryName={tab}
                skills={SKILL_CATEGORIES[tab]}
                accent={ACCENT_COLORS[tab]}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </div>

        {/* Infinite scrolling marquee ticker of all skills */}
        <div
          className="overflow-hidden py-5 w-[100vw] relative left-1/2 -translate-x-1/2"
          style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex gap-8 whitespace-nowrap animate-ticker w-max">
            {[...Object.values(SKILL_CATEGORIES).flat(), ...Object.values(SKILL_CATEGORIES).flat()].map((s, i) => (
              <span
                key={i}
                className="label-text flex items-center gap-4"
                style={{ fontSize: "0.72rem", opacity: 0.5 }}
              >
                <span className="opacity-40">✦</span>
                <span className="flex items-center gap-2">
                  <span>{s.icon}</span> {s.name}
                </span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Skill Category Panel component ── */
function CategoryPanel({ categoryName, skills, accent, isMobile }) {
  return (
    <motion.div
      id={`skill-cat-${categoryName}`}
      initial={isMobile ? { opacity: 0, y: 50 } : {}}
      whileInView={isMobile ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex-shrink-0 flex flex-col gap-6 ${isMobile ? "w-full" : "w-[80vw] max-w-[1100px]"}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 rounded-full" style={{ background: accent }} />
        <h3 className="font-display italic text-2xl text-zinc-900 dark:text-white">
          {categoryName} Skills
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {skills.map((skill, idx) => (
          <SkillNodeWidget
            key={skill.name}
            skill={skill}
            accent={accent}
            index={idx}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Interactive Skill Node Widget component ── */
function SkillNodeWidget({ skill, accent, index }) {
  const [hovered, setHovered] = useState(false);

  const size = 96;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <Magnetic strength={0.2} radius={60}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, rotateX: -55, scale: 0.85, clipPath: "inset(30% 0 0 0 round 2rem)" }}
        whileInView={{ opacity: 1, rotateX: 0, scale: 1, clipPath: "inset(0% 0 0 0 round 2rem)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
        whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.25, ease: [0.33,1,0.68,1] } }}
        className="relative flex flex-col items-center justify-center p-5 rounded-[2rem] border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-shadow duration-300 w-full aspect-square cursor-none select-none overflow-hidden"
        style={{ transformOrigin: "bottom center", transformPerspective: "600px" }}
      >
        {/* spotlight glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(70px circle at center, ${accent}15, transparent 80%)`,
            opacity: hovered ? 1 : 0.3,
          }}
        />

        {/* Circle SVG */}
        <div className="relative w-[96px] h-[96px] flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="var(--bg-surface)"
              strokeWidth={strokeWidth}
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={accent}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{
                strokeDashoffset: circumference - (skill.level / 100) * circumference,
              }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 + index * 0.06 }}
              strokeLinecap="round"
            />
          </svg>

          <motion.span
            animate={{
              rotate: hovered ? 360 : 0,
              scale: hovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl relative z-10"
          >
            {skill.icon}
          </motion.span>
        </div>

        <h4 className="font-semibold text-[11px] tracking-wider text-zinc-900 dark:text-white mt-3 text-center">
          {skill.name}
        </h4>

        {/* Hover percentage badge tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute bottom-3 tag-pill"
              style={{
                borderColor: `${accent}40`,
                color: accent,
                background: "var(--bg-surface)",
                fontSize: "0.65rem",
                padding: "0.2rem 0.6rem",
              }}
            >
              {skill.level}%
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </Magnetic>
  );
}
