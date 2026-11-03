import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { swarm } from "../swarm";

const EASE = [0.76, 0, 0.24, 1];
const MIN_MS = 1600;  // never just flash
const MAX_MS = 6000;  // never get stuck, whatever fails to load

/* Opening screen in the site's detection style: a box opens, a scan line
   sweeps through it and a counter runs to 100 while the fonts and the 3D
   portrait load. Then the box expands and the screen wipes up. */
export default function Preloader({ onDone }) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const fontsReady = useRef(false);
  const finished = useRef(false);

  // No scrolling underneath while it is up
  useEffect(() => {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => { lenis?.start(); document.documentElement.style.overflow = ""; };
  }, [lenis]);

  useEffect(() => {
    document.fonts?.ready.then(() => { fontsReady.current = true; });
    const start = performance.now();
    let value = 0, raf;
    const tick = () => {
      const elapsed = performance.now() - start;
      const ready = (fontsReady.current && swarm.loaded) || elapsed > MAX_MS;
      // Ease toward 90 while loading, then run to 100 once everything is in
      const cap = ready ? 100 : 90;
      value += (cap - value) * (ready ? 0.12 : 0.035);
      const shown = Math.min(100, Math.round(value));
      setPct(shown);
      if (ready && shown >= 100 && elapsed > (reduce ? 300 : MIN_MS)) { setLeaving(true); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const done = () => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  };

  // Belt and braces: if the exit animation never reports back, finish anyway
  useEffect(() => {
    if (!leaving) return;
    const id = setTimeout(done, 1600);
    return () => clearTimeout(id);
  }, [leaving]);

  const score = (pct / 100 * 0.99).toFixed(2);

  return (
    <m.div
      className="loader"
      role="status"
      aria-label={`Loading, ${pct}%`}
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={leaving ? { clipPath: "inset(0% 0% 100% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: reduce ? 0.2 : 1, ease: EASE, delay: leaving && !reduce ? 0.35 : 0 }}
      onAnimationComplete={() => leaving && done()}
    >
      <m.div
        className="loader-box det"
        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
        animate={leaving ? { scale: 1.6, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: leaving ? 0.7 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="det-label">person {score}</span>
        {!reduce && <span className="loader-scan" aria-hidden="true" />}
        <span className="loader-num">{String(pct).padStart(2, "0")}<small>%</small></span>
      </m.div>
      <m.p
        className="loader-name"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={leaving ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: leaving ? 0 : 0.3 }}
      >
        Vansh Agrawal
      </m.p>
    </m.div>
  );
}
