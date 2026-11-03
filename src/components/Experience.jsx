import { useEffect, useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { experience, education } from "../data/content";
import { swarm } from "../swarm";

const COLORS = ["#D4145A", "#2F4BD8", "#0E7C6B", "#7C3AED", "#C2410C", "#3F7D20"];
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const pad = (n) => String(n).padStart(2, "0");
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x) => x * x * (3 - 2 * x);

// Sort key from the start of a date like "Mar – Aug 2024" or "2023 – now"
const startOf = (date) => {
  const year = Number(date.match(/\d{4}/)?.[0] ?? 0);
  const month = MONTHS.indexOf(date.slice(0, 3).toLowerCase());
  return year * 12 + Math.max(0, month);
};

// Work and schooling together, oldest first
const ENTRIES = [
  ...experience.map((x) => ({ ...x, type: "Work" })),
  ...education.map((x) => ({
    ...x, type: "Education", tags: null,
    desc: `${x.label} ${x.score}${x.max === 100 ? "%" : ` / ${x.max}`}`,
  })),
]
  .sort((a, b) => startOf(a.date) - startOf(b.date))
  .map((x, i) => ({ ...x, color: COLORS[i % COLORS.length], year: x.date.match(/\d{4}/)?.[0] ?? "" }));
const N = ENTRIES.length;

/* Everything below is scrubbed: driven by `t`, a motion value that runs
   0 → N-1 as you scroll, so it moves exactly as fast as your hand. */

// One digit column of the year: a strip of digits that rolls like an odometer.
// Columns 3 and 4 spin a full turn on every chapter change, slot-machine style.
const SPIN = [0, 0, 1, 1];
const STRIP = 10 * (N + 2);
function DigitColumn({ k, t }) {
  const base = ENTRIES.map((e, i) => Number(e.year[k]) + 10 * i * SPIN[k]);
  const y = useTransform(t, (v) => {
    const i = Math.min(N - 2, Math.floor(v));
    const e = smooth(clamp01((v - i - 0.3) / 0.45));
    const pos = base[i] + (base[i + 1] - base[i]) * e;
    return `${-pos}em`;
  });
  return (
    <span className="odo-col">
      <m.span className="odo-strip" style={{ y }}>
        {Array.from({ length: STRIP }, (_, n) => <span key={n}>{n % 10}</span>)}
      </m.span>
    </span>
  );
}

// A letter of a role title: rises in with the chapter, lifts out as it leaves
function Letter({ ch, i, j, t }) {
  const y = useTransform(t, (v) => {
    const local = v - i;
    const inn = clamp01((local + 0.6 - j * 0.012) / 0.3);
    const out = clamp01((local - 0.35 - j * 0.008) / 0.3);
    return `${(1 - smooth(inn)) * 110 - smooth(out) * 110}%`;
  });
  return <m.span className="ch-letter" style={{ y }}>{ch}</m.span>;
}

// A supporting line (company, text, tags) that slides and fades with the chapter
function Line({ i, t, delay, className, children, as = "p" }) {
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

function Chapter({ x, i, t }) {
  return (
    <article className="ch-entry">
      <Line i={i} t={t} delay={0} className="ch-kicker">
        <span className="ch-type">{x.type}</span>
        <span>{pad(i + 1)} / {pad(N)}</span>
      </Line>
      <h3 className="ch-role" aria-label={x.role}>
        {/* Letters grouped per word so lines only break between words */}
        {x.role.split(" ").map((word, w, words) => {
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
      <Line i={i} t={t} delay={0.06} className="ch-org">{x.org}<span className="ch-date">{x.date}</span></Line>
      <Line i={i} t={t} delay={0.1} className="ch-desc">{x.desc}</Line>
      {x.tags && (
        <Line i={i} t={t} delay={0.14} as="ul" className="ch-tags">
          {x.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </Line>
      )}
    </article>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);

  // Pinned progress through the chapters, and a separate one for the intro wipe
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const t = useTransform(scrollYProgress, (v) => clamp01(v) * (N - 1));
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Accent colour blends from one chapter's colour to the next as you scroll
  const color = useTransform(t, ENTRIES.map((_, i) => i), ENTRIES.map((e) => e.color));

  useMotionValueEvent(t, "change", (v) => {
    swarm.xp = v / (N - 1);
    const i = Math.round(v);
    setActive((a) => (a === i ? a : i));
  });
  useEffect(() => { swarm.tint = ENTRIES[active].color; }, [active]);

  const go = (i) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + (i / (N - 1)) * (el.offsetHeight - window.innerHeight);
    lenis ? lenis.scrollTo(y, { duration: 1.6 }) : window.scrollTo({ top: y, behavior: "smooth" });
  };

  const x = ENTRIES[active];

  return (
    <section id="experience" ref={ref} className="ch" style={{ height: `${N * 90 + 40}vh` }}>
      <m.div className="ch-pin" style={{ "--c": color }}>

        <div className="wrap ch-layout">
          <div className="cloud-anchor ch-anchor" data-cloud-anchor aria-hidden="true" />

          <header className="ch-head">
            <h2 className="ch-title">Experience</h2>
            <p>Work and study, oldest first.</p>
          </header>

          <div className="ch-stage">
            <p className="odo" aria-label={x.year}>
              {[0, 1, 2, 3].map((k) => <DigitColumn key={k} k={k} t={t} />)}
            </p>
            <div className="ch-entries">
              {ENTRIES.map((e, i) => <Chapter key={e.role + e.org} x={e} i={i} t={t} />)}
            </div>
            {/* Plain copy of the current entry for screen readers */}
            <p className="sr-only" aria-live="polite">{`${x.role}, ${x.org}, ${x.date}. ${x.desc}`}</p>
          </div>

          <nav className="ch-nav" aria-label="Jump to entry">
            <span className="ch-bar" aria-hidden="true"><m.span style={{ scaleX: bar }} /></span>
            <div className="ch-dots">
              {ENTRIES.map((e, i) => (
                <button
                  key={e.role + e.org}
                  className={i === active ? "on" : ""}
                  onClick={() => go(i)}
                  aria-label={`${e.year}, ${e.role}`}
                  aria-current={i === active ? "step" : undefined}
                >
                  {e.year}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </m.div>
    </section>
  );
}
