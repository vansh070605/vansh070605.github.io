import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";

/* Shared pieces for the pinned, scroll-scrubbed chapter sections (Work and
   Experience). Everything is driven by `t`, a motion value that runs
   0 → count-1 as you scroll, so it moves exactly as fast as your hand. */

export const clamp01 = (x) => Math.min(1, Math.max(0, x));
export const smooth = (x) => x * x * (3 - 2 * x);
export const pad = (n) => String(n).padStart(2, "0");

// Scroll progress, current chapter, a colour that blends between chapters,
// and a function that glides to chapter i
export function useChapters(count, colors) {
  const ref = useRef(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const t = useTransform(scrollYProgress, (v) => clamp01(v) * (count - 1));
  const color = useTransform(t, colors.map((_, i) => i), colors);

  useMotionValueEvent(t, "change", (v) => {
    const i = Math.round(v);
    setActive((a) => (a === i ? a : i));
  });

  const go = (i) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + (i / (count - 1)) * (el.offsetHeight - window.innerHeight);
    lenis ? lenis.scrollTo(y, { duration: 1.6 }) : window.scrollTo({ top: y, behavior: "smooth" });
  };

  return { ref, t, active, color, bar: scrollYProgress, go };
}

// Odometer: one rolling 0-9 strip per character of `values[i]`.
// Only digits that change move, straight to the next value.
function DigitColumn({ k, values, t }) {
  const base = values.map((v) => Number(v[k]));
  const n = values.length;
  const y = useTransform(t, (v) => {
    const i = Math.min(n - 2, Math.floor(v));
    const e = smooth(clamp01((v - i - 0.3) / 0.45));
    return `${-(base[i] + (base[i + 1] - base[i]) * e)}em`;
  });
  return (
    <span className="odo-col">
      <m.span className="odo-strip" style={{ y }}>
        {Array.from({ length: 10 }, (_, d) => <span key={d}>{d}</span>)}
      </m.span>
    </span>
  );
}

export function Odometer({ values, t, label, className = "odo" }) {
  return (
    <p className={className} aria-label={label}>
      {[...values[0]].map((_, k) => <DigitColumn key={k} k={k} values={values} t={t} />)}
    </p>
  );
}

// A letter that rises in with chapter i and lifts out as it leaves
function Letter({ ch, i, j, t }) {
  const y = useTransform(t, (v) => {
    const local = v - i;
    const inn = clamp01((local + 0.6 - j * 0.012) / 0.3);
    const out = clamp01((local - 0.35 - j * 0.008) / 0.3);
    return `${(1 - smooth(inn)) * 110 - smooth(out) * 110}%`;
  });
  return <m.span className="ch-letter" style={{ y }}>{ch}</m.span>;
}

// Title scrubbed in letter by letter; letters grouped per word so lines only break between words
export function ScrubTitle({ text, i, t, className = "ch-role" }) {
  return (
    <h3 className={className} aria-label={text}>
      {text.split(" ").map((word, w, words) => {
        const start = words.slice(0, w).join(" ").length + (w ? 1 : 0);
        return (
          <span key={w} className="ch-word" aria-hidden="true">
            {[...word].map((ch, k) => (
              <span key={k} className="ch-mask"><Letter ch={ch} i={i} j={start + k} t={t} /></span>
            ))}
          </span>
        );
      })}
    </h3>
  );
}

// A supporting line that slides and fades with chapter i
export function Line({ i, t, delay, className, children, as = "p" }) {
  const C = m[as];
  const style = {
    opacity: useTransform(t, (v) => {
      const local = v - i;
      return smooth(clamp01((local + 0.45 - delay) / 0.25)) * (1 - smooth(clamp01((local - 0.3) / 0.2)));
    }),
    y: useTransform(t, (v) => {
      const local = v - i;
      return (1 - smooth(clamp01((local + 0.45 - delay) / 0.25))) * 40 - smooth(clamp01((local - 0.3) / 0.2)) * 30;
    }),
  };
  return <C className={className} style={style}>{children}</C>;
}

// Progress bar plus a clickable label per chapter
export function ChapterNav({ labels, active, bar, go, ariaLabels }) {
  return (
    <nav className="ch-nav" aria-label="Jump to entry">
      <span className="ch-bar" aria-hidden="true"><m.span style={{ scaleX: bar }} /></span>
      <div className="ch-dots" style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}>
        {labels.map((label, i) => (
          <button
            key={i}
            className={i === active ? "on" : ""}
            onClick={() => go(i)}
            aria-label={ariaLabels?.[i] ?? label}
            aria-current={i === active ? "step" : undefined}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
