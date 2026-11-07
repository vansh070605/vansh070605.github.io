import { useEffect } from "react";
import { m } from "framer-motion";
import { projects } from "../data/content";
import { swarm } from "../swarm";
import { ChapterNav, Line, Odometer, ScrubTitle, pad, useChapters } from "./Scrub";

const N = projects.length;

function Links({ p }) {
  return (
    <div className="work-links">
      <a href={p.live} target="_blank" rel="noopener noreferrer" className="pill pill-solid">
        Open live site
        <span className="pill-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </a>
      <a href={p.github} target="_blank" rel="noopener noreferrer" className="pill pill-ghost">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
        </svg>
        View source
      </a>
    </div>
  );
}

function Chapter({ p, i, t, active }) {
  return (
    // Chapters are stacked; only the current one takes clicks
    <article className="ch-entry" style={{ "--accent": p.color, pointerEvents: i === active ? "auto" : "none" }}>
      <Line i={i} t={t} delay={0} className="ch-kicker">
        <span className="ch-type">{p.kind}</span>
        <span>{pad(i + 1)} / {pad(N)}</span>
      </Line>
      <ScrubTitle text={p.name} i={i} t={t} className="ch-role ch-name" />
      <Line i={i} t={t} delay={0.06} className="ch-org">{p.summary}</Line>
      <Line i={i} t={t} delay={0.1} className="ch-desc">{p.detail}</Line>
      <Line i={i} t={t} delay={0.14} as="ul" className="ch-tags">
        {p.stack.map((s) => <li key={s}>{s}</li>)}
      </Line>
      <Line i={i} t={t} delay={0.18} as="div" className="ch-links"><Links p={p} /></Line>
    </article>
  );
}

/* Pinned while you scroll, same as Experience: one chapter per project, the
   number rolls, the name rises letter by letter, and the 3D cloud on the left
   morphs into the project's symbol. */
export default function Work() {
  const { ref, t, active, color, bar, go } = useChapters(N, projects.map((p) => p.color));
  useEffect(() => { swarm.project = projects[active].name; }, [active]);
  const p = projects[active];

  return (
    <section id="work" ref={ref} className="ch ch-work" style={{ height: `${N * 90 + 40}vh` }}>
      <m.div className="ch-pin" style={{ "--c": color }}>
        <div className="wrap ch-layout">
          <div className="cloud-anchor ch-anchor" data-cloud-anchor aria-hidden="true" />

          <header className="ch-head">
            <h2 className="ch-title">Selected work</h2>
            <a href="https://github.com/vansh070605" target="_blank" rel="noopener noreferrer" className="link">More on GitHub</a>
          </header>

          <div className="ch-stage">
            <Odometer values={projects.map((_, i) => pad(i + 1))} t={t} label={pad(active + 1)} />
            <div className="ch-entries">
              {projects.map((proj, i) => <Chapter key={proj.name} p={proj} i={i} t={t} active={active} />)}
            </div>
            <p className="sr-only" aria-live="polite">{`${p.name}: ${p.summary}`}</p>
          </div>

          <ChapterNav labels={projects.map((x) => x.name)} active={active} bar={bar} go={go} />
        </div>
      </m.div>
    </section>
  );
}
