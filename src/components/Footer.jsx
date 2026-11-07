import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { profile, socials } from "../data/content";

const EASE = [0.16, 1, 0.3, 1];

function useLocalTime(timeZone) {
  const fmt = () => new Date().toLocaleTimeString("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const ICONS = {
  GitHub: <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />,
  LinkedIn: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />,
  X: <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24H16.17l-4.71-6.23-5.4 6.23H2.75l7.73-8.84L1.25 2.25H8.08l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />,
  Instagram: <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />,
};

/* Closing panel: big line on the right, social pill, résumé and back-to-top,
   a sticker cutout that pops up bottom-left, and a line that draws across
   into a handwritten signature. */
export default function Footer() {
  const time = useLocalTime(profile.timeZone);
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const show = reduce || seen;
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <footer id="footer" ref={ref} className="footer">
      <div className="wrap ft-inner">
        <div className="ft-right">
          <h2 className="ft-title">
            {["Building systems", "that see."].map((line, i) => (
              <span key={line} className="ft-mask">
                <m.span
                  initial={reduce ? false : { y: "105%" }}
                  animate={show ? { y: "0%" } : { y: "105%" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.12 }}
                >
                  {line}
                </m.span>
              </span>
            ))}
          </h2>

          <m.ul className="ft-socials" aria-label="Elsewhere" {...rise(0.35)}>
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">{ICONS[s.name]}</svg>
                </a>
              </li>
            ))}
          </m.ul>

          <m.div className="ft-actions" {...rise(0.45)}>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="ft-resume">Résumé</a>
            <a href="#top" className="ft-top" aria-label="Back to top">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </a>
          </m.div>
        </div>
      </div>

      {/* Sticker cutout that pops up from the bottom edge */}
      <m.img
        className="ft-sticker"
        src="/best_pic.png"
        alt="Vansh Agrawal"
        width="500"
        height="500"
        loading="lazy"
        initial={reduce ? false : { y: "60%", rotate: -8 }}
        animate={show ? { y: "0%", rotate: 0 } : { y: "60%", rotate: -8 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.3 }}
      />

      <div className="ft-baseline">
        <m.span
          className="ft-line"
          aria-hidden="true"
          initial={{ scaleX: reduce ? 1 : 0 }}
          animate={{ scaleX: show ? 1 : 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
        />
        <svg className="ft-sign" viewBox="0 0 390 90" role="img" aria-label={`Signature: ${profile.name}`}>
          <text
            x="10" y="66"
            className={show ? "draw" : ""}
          >
            {profile.name}
          </text>
        </svg>
      </div>

      <div className="wrap ft-meta">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>It's {time} in Chennai</span>
      </div>
    </footer>
  );
}
