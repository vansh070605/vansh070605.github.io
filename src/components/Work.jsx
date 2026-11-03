import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";
import { projects } from "../data/content";
import { swarm } from "../swarm";
import Heading from "./Heading";

const EASE = [0.16, 1, 0.3, 1];
const pad = (n) => String(n).padStart(2, "0");

function useIsWide() {
  const query = "(min-width: 901px)";
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

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

/* Desktop: the section pins for one screen per project. Scrolling swaps the
   project on the right while the cloud on the left morphs into its symbol. */
function Pinned() {
  const ref = useRef(null);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  const n = projects.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    if (i !== active) { prev.current = active; setActive(i); }
  });

  useEffect(() => { swarm.project = projects[active].name; }, [active]);

  // Jump to the middle of a project's scroll segment
  const go = (i) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + ((i + 0.5) / n) * (el.offsetHeight - window.innerHeight);
    lenis ? lenis.scrollTo(y, { duration: 1.2 }) : window.scrollTo({ top: y, behavior: "smooth" });
  };

  const dir = active >= prev.current ? 1 : -1;
  const p = projects[active];
  const rise = (delay) => ({
    initial: reduce ? false : { y: 48 * dir, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE, delay } },
    exit: reduce ? undefined : { y: -32 * dir, opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
  });

  return (
    <section id="work" ref={ref} className="work-pinned" style={{ height: `${n * 100}vh` }}>
      <div className="work-pin" style={{ "--accent": p.color }}>
        <div className="wrap stage work-stage">
          <div className="work-head">
            <Heading>Selected work</Heading>
            <p className="work-count" aria-hidden="true">
              <span>{pad(active + 1)}</span> / {pad(n)}
            </p>
          </div>

          <div className="cloud-anchor work-anchor" data-cloud-anchor aria-hidden="true" />
          <div className="stage-right work-show" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <m.article key={p.name} className="work-card">
                <m.p className="work-kind" {...rise(0)}>{p.kind}</m.p>
                <h3 className="work-title">
                  <span className="mask"><m.span {...rise(0.04)}>{p.name}</m.span></span>
                </h3>
                <m.p className="work-summary" {...rise(0.1)}>{p.summary}</m.p>
                <m.p className="work-text" {...rise(0.16)}>{p.detail}</m.p>
                <ul className="stack" aria-label="Built with">
                  {p.stack.map((s, i) => <m.li key={s} {...rise(0.2 + i * 0.04)}>{s}</m.li>)}
                </ul>
                <m.div {...rise(0.3)}><Links p={p} /></m.div>
              </m.article>
            </AnimatePresence>
          </div>


          <div className="work-progress" aria-hidden="true">
            <m.span style={{ scaleX: bar }} />
          </div>
          <nav className="work-index" aria-label="Projects">
            {projects.map((proj, i) => (
              <button
                key={proj.name}
                className={i === active ? "on" : ""}
                aria-current={i === active ? "true" : undefined}
                onClick={() => go(i)}
                onMouseEnter={() => { swarm.project = proj.name; }}
                onMouseLeave={() => { swarm.project = projects[active].name; }}
                data-detect="project"
              >
                {proj.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

/* Phones: no pinning. Every project is open and reveals as it scrolls in. */
function Stacked() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <div className="work-head"><Heading>Selected work</Heading></div>
        {projects.map((p) => (
          <m.article
            key={p.name}
            className="work-card stacked"
            style={{ "--accent": p.color }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            onViewportEnter={() => { swarm.project = p.name; }}
          >
            <p className="work-kind">{p.kind}</p>
            <h3 className="work-title">{p.name}</h3>
            <p className="work-summary">{p.summary}</p>
            <p className="work-text">{p.detail}</p>
            <ul className="stack" aria-label="Built with">
              {p.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <Links p={p} />
          </m.article>
        ))}
      </div>
    </section>
  );
}

export default function Work() {
  return useIsWide() ? <Pinned /> : <Stacked />;
}
