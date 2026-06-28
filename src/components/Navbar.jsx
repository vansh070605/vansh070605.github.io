import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Magnetic from "./ui/Magnetic";

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{time}</span>;
}

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export default function Navbar({ isDark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  // Scroll Spy — IntersectionObserver fires reliably for both normal and tall sticky-pinned sections
  useEffect(() => {
    const sectionIds = ["about", "projects", "skills", "experience", "contact"];

    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${id}`);
          }
        },
        {
          // Fire when section occupies the middle 20% of the viewport
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Also run a one-time check on mount so we start with the right active link
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (scrollPos >= top && scrollPos < top + el.offsetHeight) {
          setActiveLink(`#${id}`);
          break;
        }
      }
    }

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Single unified fixed top bar ──────────────────────────── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pointer-events-auto"
        style={{
          height: "3.25rem",
          paddingLeft: "1.75rem",
          paddingRight: "1.75rem",
          background: scrolled
            ? isDark ? "rgba(8,8,10,0.88)" : "rgba(252,251,249,0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)"
            : "none",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        id="main-nav"
      >
        {/* Left — Brand */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
          style={{ textDecoration: "none" }}
        >
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold"
            style={{
              background: "var(--accent)",
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "0.85rem",
            }}
          >
            VA
          </span>
          <span
            style={{
              fontSize: "0.88rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
            }}
          >
            Vansh Agrawal
          </span>
        </a>

        {/* Centre — Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <Magnetic key={link.href} strength={0.28} radius={70}>
              <NavLink
                link={link}
                active={activeLink === link.href}
                onClick={() => handleNavClick(link.href)}
              />
            </Magnetic>
          ))}
        </div>

        {/* Right — Clock + actions */}
        <div className="flex items-center gap-3">
          {/* Location + clock */}
          <div
            className="hidden md:flex items-center gap-2"
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono, monospace)",
              color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: isDark ? "#34d399" : "#111" }}
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <span>Chennai, India</span>
            <span>·</span>
            <LiveClock />
          </div>

          {/* Divider */}
          <span
            className="hidden md:block w-px h-4 opacity-20"
            style={{ background: "var(--text)" }}
          />

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              background: "var(--bg-surface)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
            aria-label="Toggle dark mode"
            id="dark-mode-toggle"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Resume button */}
          <Magnetic strength={0.32} radius={70}>
            <a
              href="public/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-85"
              style={{
                background: "var(--text)",
                color: "var(--bg)",
                fontSize: "0.82rem",
                letterSpacing: "0.02em",
              }}
              id="resume-btn"
            >
              Résumé ↗
            </a>
          </Magnetic>

          {/* Mobile menu button */}
          <button
            className="flex md:hidden flex-col items-center justify-center w-8 h-8 gap-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            <span
              className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(45deg) translateY(3.75px)" : "rotate(0)",
              }}
            />
            <span
              className="block h-[1.5px] transition-all duration-300"
              style={{
                background: "var(--text)",
                width: menuOpen ? "0" : "1.25rem",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(-45deg) translateY(-3.75px)" : "rotate(0)",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{
              background: isDark ? "rgba(12,12,14,0.97)" : "rgba(248,247,244,0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onClick={() => handleNavClick(link.href)}
                className="text-4xl font-display italic transition-all duration-200 hover:opacity-60"
                style={{ color: "var(--text)", background: "none", border: "none" }}
              >
                {link.name}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              href="/Vansh_Agrawal_Resume.pdf"
              target="_blank"
              className="btn-outline mt-4 text-base"
              style={{ fontSize: "0.9rem" }}
            >
              Download Résumé ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ link, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 group"
      style={{
        color: active ? "var(--text)" : "var(--text-muted)",
        background: active ? "var(--bg-surface)" : "transparent",
        border: "none",
        fontSize: "0.85rem",
      }}
    >
      <span className="relative z-10">{link.name}</span>
      {/* Underline indicator */}
      <span
        className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
        style={{
          width: active ? "60%" : "0%",
          background: "var(--accent)",
          opacity: active ? 1 : 0,
        }}
      />
      {/* Hover bg */}
      <span
        className="absolute inset-0 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
        style={{ background: "var(--bg-surface)" }}
      />
    </button>
  );
}
