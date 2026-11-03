import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Section heading that rises out of a mask the first time it scrolls into view.
// The untransformed <h2> is observed: the text itself starts clipped below the
// mask, so watching it directly never registers as visible.
export default function Heading({ children, className = "h2" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.3 });

  return (
    <h2 ref={ref} className={className}>
      <span className="mask">
        <m.span
          initial={reduce ? false : { y: "105%" }}
          animate={reduce || seen ? { y: "0%" } : { y: "105%" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {children}
        </m.span>
      </span>
    </h2>
  );
}
