import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { profile } from "../data/content";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <m.span className="w" style={{ opacity }}>{children}</m.span>;
}

// Statement lights up word by word as it scrolls through the viewport
function ScrubStatement({ text }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  if (reduce) return <p className="statement">{text}</p>;
  return (
    <p ref={ref} className="statement">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

export default function About() {
  const imgRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(22% 18% 22% 18%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <section id="about" className="section">
      <div className="wrap stage">
        <div className="cloud-anchor right" data-cloud-anchor aria-hidden="true" />
        <div className="stage-left">
          <h2 className="sr-only">About</h2>
          <ScrubStatement text={profile.statement} />

          <div className="about-sub">
            <m.figure ref={imgRef} className="portrait" style={reduce ? undefined : { clipPath: clip }}>
              <m.img
                src="/portrait.webp"
                alt="Vansh Agrawal in a black hoodie, leaning on a desk in front of a neon sign reading Build, Solve, Impact"
                width="1100"
                height="1100"
                loading="lazy"
                style={reduce ? undefined : { scale }}
              />
            </m.figure>

            <dl className="facts">
              {profile.facts.map((f) => (
                <div key={f.term} style={{ display: "contents" }}>
                  <dt>{f.term}</dt>
                  <dd>{f.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
