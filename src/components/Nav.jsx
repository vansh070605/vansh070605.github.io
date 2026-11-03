import { useEffect, useState } from "react";
import { profile } from "../data/content";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

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

  return (
    <header className={`nav ${scrolled || open ? "scrolled" : ""}`}>
      <nav className="wrap nav-inner" aria-label="Main">
        <a href="#top" className="nav-name">{profile.name}</a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link" aria-current={active === l.href ? "location" : undefined}>{l.label}</a>
          ))}
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link">Résumé</a>
        </div>
        <button
          className="nav-menu-btn"
          aria-expanded={open}
          aria-controls="nav-sheet"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <div id="nav-sheet" className="nav-sheet">
          {[...LINKS, { label: "Résumé", href: profile.resume }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}
