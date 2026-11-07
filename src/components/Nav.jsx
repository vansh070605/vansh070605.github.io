import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { profile, socials } from "../data/content";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
const EASE = [0.76, 0, 0.24, 1];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const lenis = useLenis();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Highlight the link whose section holds the middle of the viewport
      const mid = window.innerHeight / 2;
      const hit = LINKS.find((l) => {
        const r = document.querySelector(l.href)?.getBoundingClientRect();
        return r && r.top <= mid && r.bottom > mid;
      });
      setActive(hit ? hit.href : null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // No page scrolling behind the open menu (only touch Lenis on real toggles,
  // so this never restarts scrolling while the preloader holds it)
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) lenis?.stop();
    else if (wasOpen.current) lenis?.start();
    wasOpen.current = open;
  }, [open, lenis]);

  // Menu grows out of the button in the top-right corner
  const from = "circle(0% at calc(100% - 42px) 34px)";
  const to = "circle(150% at calc(100% - 42px) 34px)";

  return (
    <header className={`nav ${scrolled || open ? "scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <nav className="wrap nav-inner" aria-label="Main">
        <a href="#top" className="nav-name" onClick={() => setOpen(false)}>{profile.name}</a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link" aria-current={active === l.href ? "location" : undefined}>{l.label}</a>
          ))}
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link">Résumé</a>
        </div>
        <button
          className={`nav-burger ${open ? "open" : ""}`}
          aria-expanded={open}
          aria-controls="nav-sheet"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="nav-sheet"
            className="nav-sheet"
            initial={reduce ? { opacity: 0 } : { clipPath: from }}
            animate={reduce ? { opacity: 1 } : { clipPath: to }}
            exit={reduce ? { opacity: 0 } : { clipPath: from }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="sheet-links">
              {[...LINKS, { label: "Résumé", href: profile.resume }].map((l, i) => (
                <li key={l.href} className="sheet-mask">
                  <m.a
                    href={l.href}
                    {...(l.href === profile.resume ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.href ? "location" : undefined}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.06 }}
                  >
                    {l.label}
                  </m.a>
                </li>
              ))}
            </ul>
            <m.div
              className="sheet-foot"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <div>
                {socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
                ))}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
