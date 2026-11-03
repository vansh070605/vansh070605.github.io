import { useRef } from "react";
import { m, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { skills } from "../data/content";
import Heading from "./Heading";

const EASE = [0.16, 1, 0.3, 1];
const ALL = skills.flatMap((s) => s.items.map((name) => ({ name, color: s.color })));

// Two giant rows of skill names that glide in opposite directions as you scroll
function Marquee({ progress }) {
  const reduce = useReducedMotion();
  const a = useTransform(progress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-35%"]);
  const b = useTransform(progress, [0, 1], reduce ? ["-35%", "-35%"] : ["-35%", "0%"]);
  const row = [...ALL, ...ALL];

  return (
    <div className="marquee" aria-hidden="true">
      <m.div className="marquee-row" style={{ x: a }}>
        {row.map((s, i) => <span key={i} style={{ "--c": s.color }}>{s.name}</span>)}
      </m.div>
      <m.div className="marquee-row outline" style={{ x: b }}>
        {row.slice().reverse().map((s, i) => <span key={i} style={{ "--c": s.color }}>{s.name}</span>)}
      </m.div>
    </div>
  );
}

const list = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } };
const chip = {
  hidden: { opacity: 0, y: 18, scale: 0.7 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 420, damping: 24 } },
};

// One group: its underline draws in, then its chips pop in one by one
function Group({ s, i }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="skill-group" style={{ "--c": s.color }}>
      <h3>
        {s.group}
        <span className="count">{s.items.length}</span>
      </h3>
      <m.span
        className="skill-line"
        aria-hidden="true"
        initial={{ scaleX: reduce ? 1 : 0 }}
        animate={{ scaleX: reduce || seen ? 1 : 0 }}
        transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
      />
      <m.ul variants={reduce ? undefined : list} initial={reduce ? false : "hidden"} animate={reduce || seen ? "show" : "hidden"}>
        {s.items.map((item) => <m.li key={item} variants={chip}>{item}</m.li>)}
      </m.ul>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="skills" ref={ref} className="section">
      <Marquee progress={scrollYProgress} />
      <div className="wrap stage">
        <div className="cloud-anchor right" data-cloud-anchor aria-hidden="true" />
        <div className="stage-left">
          <Heading>Toolkit</Heading>
          <div className="skills-grid">
            {skills.map((s, i) => <Group key={s.group} s={s} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
