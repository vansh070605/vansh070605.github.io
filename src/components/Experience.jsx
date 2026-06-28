import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { MaskReveal, TextReveal } from "./ui/TextReveal";

const experiences = [
  { id: 0, role: "High School",           company: "A.P.J School NOIDA",              date: "2020 – 2021",        desc: "Completed High School with Mathematics and Science. Score: 85.2%.",          tags: ["Mathematics","Science"],                   color: "#6B8F71" },
  { id: 1, role: "Senior Secondary",      company: "A.P.J School NOIDA",              date: "2022 – 2023",        desc: "Completed Senior Secondary with PCM curriculum. Score: 68.4%.",             tags: ["Physics","Chemistry","Mathematics"],         color: "#D97706" },
  { id: 2, role: "B.Tech CSE (AI/ML)",    company: "SRM IST",                         date: "Jul 2023 – Present", desc: "Bachelor's in CS specialising in AI & ML. Current CGPA: 7.78/10.",          tags: ["Algorithms","Data Structures","AI","ML"],   color: "#4F46E5" },
  { id: 3, role: "Technical Team Member", company: "LiftOff",                          date: "Mar – Aug 2024",     desc: "Strengthened front-end proficiency and built diverse website clones. Implemented CRUD operations.",  tags: ["HTML5","CSS3","JavaScript"],          color: "#0EA5E9" },
  { id: 4, role: "Internship Trainee",    company: "Digital Info Solutions Pvt. Ltd.", date: "Dec 2024",           desc: "Built full-stack applications with Flask & SQLite. Developed auth modules and RESTful APIs.",         tags: ["Flask","SQL","RESTful API"],          color: "#6B8F71" },
  { id: 5, role: "Internship",            company: "RCOTBA Industries",                date: "Jan – Jun 2025",     desc: "Led technical initiatives, optimised production code, collaborated cross-functionally.",             tags: ["React","Node.js","System Arch"],      color: "#4F46E5" },
  { id: 6, role: "Event Coordinator",     company: "SRMIST ACM SIGAI",                date: "Mar – Oct 2025",     desc: "Orchestrated AI symposiums, managed logistics and marketing for campus events.",                     tags: ["Leadership","Management","Speaking"],  color: "#E11D48" },
  { id: 7, role: "AI/ML Intern",          company: "Tata Steel",                       date: "Nov 2025 – Present", desc: "Engineered a Computer Vision pipeline for automated TMT rebar QC with 95% precision.",               tags: ["Computer Vision","OpenCV","ML"],      color: "#D97706" },
];

function getTagEmoji(tag) {
  const t = tag.toLowerCase();
  if (t.includes("math")) return "🧮";
  if (t.includes("phys")) return "⚛️";
  if (t.includes("algorithm")) return "🧬";
  if (t.includes("html") || t.includes("javascript")) return "🌐";
  if (t.includes("flask") || t.includes("sql")) return "🔌";
  if (t.includes("react") || t.includes("node")) return "🚀";
  if (t.includes("leader") || t.includes("speak")) return "📢";
  if (t.includes("vision") || t.includes("opencv")) return "👁️";
  return "💼";
}

export default function Experience() {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);
  const svgRef       = useRef(null);

  const [activeYear, setActiveYear] = useState("2020");
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Monitor screen resizing to compute scrollable bounds
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

  // useScroll on container with 400vh tall height for a spacious timeline scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Smooth scroll translation with spring physics
  const maxScroll = -(trackWidth - viewportWidth + 100);
  const x = useTransform(scrollYProgress, [0, 1], [0, maxScroll < 0 ? maxScroll : 0]);
  const smoothX = useSpring(x, { stiffness: 60, damping: 18, mass: 0.8 });

  // Update active year indicator based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * experiences.length),
        experiences.length - 1
      );
      const rawDate = experiences[idx].date;
      const match = rawDate.match(/\d{4}/);
      if (match) {
        setActiveYear(match[0]);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // ── Elastic Timeline SVG String logic ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(150);

  const bendX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const bendY = useSpring(mouseY, { stiffness: 100, damping: 8, mass: 0.6 }); // bouncy plucking physics!

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    // Pluck the string if mouse is within 100px vertically
    if (Math.abs(localY - 150) < 100) {
      mouseX.set(localX);
      mouseY.set(localY);
    } else {
      mouseY.set(150);
    }
  }, [mouseX, mouseY, isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    mouseY.set(150);
  }, [mouseY, isMobile]);

  // Generate SVG path coordinate strings using Motion Values
  const [svgPath, setSvgPath] = useState("M 0 150 L 3000 150");

  useEffect(() => {
    const unsubscribeX = bendX.on("change", () => updatePath());
    const unsubscribeY = bendY.on("change", () => updatePath());
    
    function updatePath() {
      const w = trackWidth > 0 ? trackWidth : 3500;
      const bx = bendX.get();
      const by = bendY.get();
      
      // Control coordinates for quadratic bezier bend
      setSvgPath(`M 0 150 Q ${bx} ${by} ${w} 150`);
    }

    updatePath();
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [bendX, bendY, trackWidth]);

  return (
    <div id="experience" ref={containerRef} className={`relative bg-cream dark:bg-zinc-950 ${isMobile ? "py-16 h-auto" : "h-[400vh]"}`}>
      {/* Sticky screen container */}
      <div className={`${isMobile ? "flex flex-col gap-12" : "sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-16"}`}>
        
        {/* Header container */}
        <div className="section-container w-full">
          <MaskReveal delay={0} duration={0.7}>
            <p className="label-text mb-2 text-indigo">Interactive Timeline</p>
          </MaskReveal>
          <TextReveal
            as="h2"
            className="display-text text-zinc-900 dark:text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            delay={0.06}
            stagger={0.06}
            duration={0.9}
          >
            How I got here.
          </TextReveal>
        </div>

        {/* Dynamic morphing background year */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-10 dark:opacity-[0.04]">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
              transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
              className="font-display italic text-[24vw] leading-none text-zinc-900 dark:text-white"
            >
              {activeYear}
            </motion.div>
          </div>
        )}

        {/* Horizontal scroll track & elastic string container */}
        <div className="relative flex-grow flex items-center z-10 w-full">
          
          <motion.div
            ref={trackRef}
            style={isMobile ? {} : { x: smoothX }}
            className={`flex w-full ${isMobile ? "flex-col items-center gap-10 px-6" : "items-center gap-16 px-[20vw] relative h-[450px]"}`}
          >
            
            {/* ── Dynamic Elastic Timeline String ── */}
            {!isMobile && (
              <div
                className="absolute inset-x-0 h-[300px] top-[75px]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <svg
                  ref={svgRef}
                  style={{ width: trackWidth || "3500px", height: "300px" }}
                  className="absolute inset-0 pointer-events-none overflow-visible"
                >
                  {/* Background shadow line */}
                  <path
                    d={svgPath}
                    fill="transparent"
                    stroke="rgba(0, 0, 0, 0.04)"
                    strokeWidth="6"
                  />
                  {/* Interactive main elastic string */}
                  <path
                    d={svgPath}
                    fill="transparent"
                    stroke="url(#line-gradient)"
                    strokeWidth="2"
                    className="transition-colors duration-300"
                  />
                  
                  {/* Decorative gradients */}
                  <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="35%" stopColor="#E11D48" />
                      <stop offset="70%" stopColor="#D97706" />
                      <stop offset="100%" stopColor="#6B8F71" />
                    </linearGradient>
                  </defs>

                  {/* Milestone nodes directly bound to elastic string path */}
                  {experiences.map((exp, idx) => {
                    const nodeX = 200 + idx * 406; // matching spacing
                    return (
                      <circle
                        key={exp.id}
                        cx={nodeX}
                        cy="150"
                        r="6"
                        fill={exp.color}
                        style={{
                          filter: `drop-shadow(0 0 8px ${exp.color}88)`
                        }}
                      />
                    );
                  })}
                </svg>
              </div>
            )}

            {/* Experiences timeline cards */}
            {experiences.map((exp, idx) => (
              <TimelineCard key={exp.id} exp={exp} index={idx} isMobile={isMobile} />
            ))}

          </motion.div>
        </div>

        {/* Navigation tips */}
        {!isMobile && (
          <div className="section-container w-full flex items-center justify-between z-10 text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider">
            <p>◀ SCROLL TO NAVIGATE ▶</p>
            <p>HOVER &amp; DRAG MOUSE TO PLUCK TIMELINE STRING ⚡</p>
          </div>
        )}

      </div>
    </div>
  );
}

function TimelineCard({ exp, index, isMobile }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const mx = e.clientX - rect.left - w / 2;
    const my = e.clientY - rect.top - h / 2;
    
    // Tilt calculations
    x.set(-my / 10);
    y.set(mx / 10);
  };

  const handleMouseLeave = () => {
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
      initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, scale: 0.95 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isMobile ? 0 : index * 0.05 }}
      style={isMobile ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        y: isEven ? -110 : 110,
      }}
      className={`relative p-7 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md transition-shadow duration-300 w-full max-w-[340px] flex-shrink-0 z-20 flex flex-col justify-between ${isMobile ? "h-auto" : "h-[320px] hover:shadow-2xl cursor-none"}`}
    >
      
      {/* Decorative connecting stem to string (Desktop only) */}
      {!isMobile && (
        <div
          className="absolute left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-zinc-200 dark:border-zinc-800 pointer-events-none"
          style={{
            height: "110px",
            top: isEven ? "auto" : "-110px",
            bottom: isEven ? "-110px" : "auto",
          }}
        />
      )}

      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full text-white"
            style={{ backgroundColor: exp.color }}
          >
            {exp.date}
          </span>
          <span className="text-2xl">{exp.tags[0] ? getTagEmoji(exp.tags[0]) : "💼"}</span>
        </div>

        {/* Role & Company */}
        <h3 className="font-display italic text-2xl text-zinc-900 dark:text-white leading-tight mb-1">
          {exp.role}
        </h3>
        <p className="text-zinc-400 dark:text-zinc-500 text-sm font-semibold mb-3">
          @ {exp.company}
        </p>

        {/* Description */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 flex-grow">
          {exp.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${exp.color}15`,
                color: exp.color,
                border: `1.5px solid ${exp.color}35`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
