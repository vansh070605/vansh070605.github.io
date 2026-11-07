import { useEffect } from "react";
import { m, useMotionValueEvent } from "framer-motion";
import { experience, education } from "../data/content";
import { swarm } from "../swarm";
import { ChapterNav, Line, Odometer, ScrubTitle, pad, useChapters } from "./Scrub";

const COLORS = ["#D4145A", "#2F4BD8", "#0E7C6B", "#7C3AED", "#C2410C", "#3F7D20"];
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

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

function Chapter({ x, i, t }) {
  return (
    <article className="ch-entry">
      <Line i={i} t={t} delay={0} className="ch-kicker">
        <span className="ch-type">{x.type}</span>
        <span>{pad(i + 1)} / {pad(N)}</span>
      </Line>
      <ScrubTitle text={x.role} i={i} t={t} />
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
  const { ref, t, active, color, bar, go } = useChapters(N, ENTRIES.map((e) => e.color));

  useMotionValueEvent(t, "change", (v) => { swarm.xp = v / (N - 1); });
  useEffect(() => { swarm.tint = ENTRIES[active].color; }, [active]);

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
            <Odometer values={ENTRIES.map((e) => e.year)} t={t} label={x.year} />
            <div className="ch-entries">
              {ENTRIES.map((e, i) => <Chapter key={e.role + e.org} x={e} i={i} t={t} />)}
            </div>
            {/* Plain copy of the current entry for screen readers */}
            <p className="sr-only" aria-live="polite">{`${x.role}, ${x.org}, ${x.date}. ${x.desc}`}</p>
          </div>

          <ChapterNav
            labels={ENTRIES.map((e) => e.year)}
            ariaLabels={ENTRIES.map((e) => `${e.year}, ${e.role}`)}
            active={active}
            bar={bar}
            go={go}
          />
        </div>
      </m.div>
    </section>
  );
}
