import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { profile } from "../data/content";
import { swarm } from "../swarm";

const EASE = [0.16, 1, 0.3, 1];

export default function Hero({ start = true }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // On scroll the name splits apart while the portrait swarm leaves for the next section
  const leftX = useTransform(scrollYProgress, [0, 1], ["0vw", reduce ? "0vw" : "-18vw"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0vw", reduce ? "0vw" : "18vw"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const burst = (e) => {
    if (e.target.closest("a, button")) return;
    swarm.burstAt = performance.now();
  };

  const [first, last] = profile.name.split(" ");
  // Name rises once the preloader has wiped away
  const rise = (delay) => ({
    initial: reduce ? false : { y: "105%" },
    animate: start ? { y: "0%" } : { y: "105%" },
    transition: { duration: 1.3, ease: EASE, delay },
  });

  return (
    <section id="top" ref={ref} className="hero" onClick={burst}>
      <div className="wrap hero-inner">
        <m.div
          className="hero-top"
          style={{ opacity: fade }}
          initial={reduce ? false : { opacity: 0 }}
          animate={start ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-meta">
            <a href="#work" className="link">See selected work</a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link">Résumé (PDF)</a>
          </div>
        </m.div>

        <m.p className="hero-hint" style={{ opacity: fade }}>
          Move through the points. Click to scatter them.
        </m.p>

        <h1 className="hero-name">
          <m.span className="mask" style={{ x: leftX }}><m.span {...rise(0.6)}>{first}</m.span></m.span>
          <m.span className="mask" style={{ x: rightX }}><m.span {...rise(0.72)}>{last}</m.span></m.span>
        </h1>
      </div>
    </section>
  );
}
