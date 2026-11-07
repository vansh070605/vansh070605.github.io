import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { swarm } from "../swarm";

const EASE = [0.76, 0, 0.24, 1];
const MIN_MS = 2200;  // long enough for the monogram to form
const MAX_MS = 7000;  // never get stuck, whatever fails to load
const STRIPS = 6;

/* Opening screen. A cloud of particles gathers into a "VA" monogram as the
   site loads, a giant counter rolls to 100 and a status line names the real
   loading steps. On exit the particles burst and the screen lifts away in
   staggered strips. */

// Sample points from the monogram drawn on an offscreen canvas
function sampleMonogram(size, count) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${size * 0.62}px Unbounded, system-ui, sans-serif`;
  ctx.fillText("VA", size / 2, size * 0.53);
  const { data } = ctx.getImageData(0, 0, size, size);
  const lit = [];
  for (let i = 0; i < size * size; i++) if (data[i * 4 + 3] > 128) lit.push(i);
  return Array.from({ length: count }, () => {
    const p = lit[(Math.random() * lit.length) | 0] ?? 0;
    return [(p % size) / size, Math.floor(p / size) / size];
  });
}

function Monogram({ progress, leaving }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio, 2);
    const box = canvas.clientWidth;
    canvas.width = canvas.height = box * dpr;
    ctx.scale(dpr, dpr);

    const count = box < 300 ? 900 : 1500;
    let targets = sampleMonogram(220, count);
    // Resample once the real font is in, so the letters are crisp
    document.fonts?.load("700 100px Unbounded").then(() => { targets = sampleMonogram(220, count); });

    const parts = Array.from({ length: count }, () => {
      const a = Math.random() * Math.PI * 2, r = box * (0.4 + Math.random() * 0.5);
      return {
        sx: box / 2 + Math.cos(a) * r, sy: box / 2 + Math.sin(a) * r,
        delay: Math.random() * 0.35, phase: Math.random() * 6.28,
        pink: Math.random() < 0.08, size: 0.8 + Math.random() * 1.3,
      };
    });

    let raf, burstAt = 0;
    const draw = (now) => {
      const p = progress.current;
      ctx.clearRect(0, 0, box, box);
      if (leaving.current && !burstAt) burstAt = now;
      const burst = burstAt ? Math.min(1, (now - burstAt) / 700) : 0;
      parts.forEach((q, i) => {
        const t = Math.min(1, Math.max(0, (p * 1.25 - q.delay) / 0.9));
        const e = 1 - Math.pow(1 - t, 3);
        const [tx, ty] = targets[i];
        let x = q.sx + (tx * box - q.sx) * e + Math.sin(now / 600 + q.phase) * (1 - e * 0.85) * 3;
        let y = q.sy + (ty * box - q.sy) * e + Math.cos(now / 700 + q.phase) * (1 - e * 0.85) * 3;
        if (burst) {
          // Fly outward from the centre on exit
          const dx = x - box / 2, dy = y - box / 2, d = Math.hypot(dx, dy) || 1;
          const k = burst * burst * box * 0.9;
          x += (dx / d) * k; y += (dy / d) * k;
        }
        ctx.globalAlpha = (0.35 + 0.65 * e) * (1 - burst);
        ctx.fillStyle = q.pink ? "#D4145A" : "#1C2321";
        ctx.beginPath();
        ctx.arc(x, y, q.size, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [progress, leaving]);

  return <canvas ref={ref} className="ld-mono" aria-hidden="true" />;
}

// Counter digit that rolls to its value
function Digit({ value }) {
  return (
    <span className="ld-col">
      <span className="ld-strip" style={{ transform: `translateY(${-value}em)` }}>
        {Array.from({ length: 10 }, (_, n) => <span key={n}>{n}</span>)}
      </span>
    </span>
  );
}

export default function Preloader({ onDone }) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [pct, setPct] = useState(0);
  const [step, setStep] = useState("Loading fonts");
  const [leaving, setLeaving] = useState(false);
  const progress = useRef(0);
  const leavingRef = useRef(false);
  const finished = useRef(false);

  // No scrolling underneath while it is up
  useEffect(() => {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => { lenis?.start(); document.documentElement.style.overflow = ""; };
  }, [lenis]);

  useEffect(() => {
    let fonts = false;
    document.fonts?.ready.then(() => { fonts = true; });
    const start = performance.now();
    let value = 0, raf;
    const tick = () => {
      const elapsed = performance.now() - start;
      const ready = (fonts && swarm.loaded) || elapsed > MAX_MS;
      setStep(ready ? "Ready" : fonts ? "Building portrait" : "Loading fonts");
      // Time-paced: creep toward 90 while loading, run to 100 once ready
      const cap = ready ? 100 : Math.min(90, 30 + elapsed / 40);
      value += (cap - value) * (ready ? 0.1 : 0.04);
      const shown = Math.min(100, Math.round(value));
      progress.current = value / 100;
      setPct(shown);
      if (ready && shown >= 100 && elapsed > (reduce ? 300 : MIN_MS)) {
        leavingRef.current = true;
        setLeaving(true);
        return;
      }
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

  // Hard stop on a plain timer: animation frames pause in hidden tabs, timers do not
  useEffect(() => {
    const id = setTimeout(done, MAX_MS + 3000);
    return () => clearTimeout(id);
  }, []);

  // Backup: finish even if the exit animation never reports back
  useEffect(() => {
    if (!leaving) return;
    const id = setTimeout(done, 2200);
    return () => clearTimeout(id);
  }, [leaving]);

  const digits = String(pct).padStart(3, "0").split("").map(Number);

  return (
    <div className="loader" role="status" aria-label={`Loading, ${pct}%`}>
      {/* Background strips that lift away one after another */}
      {Array.from({ length: STRIPS }, (_, i) => (
        <m.span
          key={i}
          className="ld-strip-bg"
          style={{ left: `${(i / STRIPS) * 100}%`, width: `${100 / STRIPS + 0.2}%` }}
          animate={leaving ? { y: "-100%" } : { y: "0%" }}
          transition={{ duration: reduce ? 0.2 : 0.9, ease: EASE, delay: leaving && !reduce ? 0.45 + i * 0.06 : 0 }}
          onAnimationComplete={() => leaving && i === STRIPS - 1 && done()}
        />
      ))}

      <m.div
        className="ld-content"
        animate={leaving ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5, delay: leaving ? 0.25 : 0 }}
      >
        <div className="ld-top">
          <span>Vansh Agrawal</span>
          <span>AI/ML engineer</span>
        </div>

        {!reduce && <Monogram progress={progress} leaving={leavingRef} />}

        <div className="ld-bottom">
          <p className="ld-count" aria-hidden="true">
            {digits.map((d, i) => <Digit key={i} value={d} />)}
            <span className="ld-pct">%</span>
          </p>
          <div className="ld-status">
            <span className="ld-dot" />
            <span>{step}</span>
          </div>
        </div>
        <span className="ld-bar" style={{ transform: `scaleX(${pct / 100})` }} aria-hidden="true" />
      </m.div>
    </div>
  );
}
