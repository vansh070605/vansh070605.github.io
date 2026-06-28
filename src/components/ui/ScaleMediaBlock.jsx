import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const EASE = [0.33, 1, 0.68, 1];

/**
 * ScaleMediaBlock — Podium-style scroll + hover media container.
 *
 * Three-layer composition:
 *   1. Outer wrapper  — carries rounded corners + box-shadow + scroll scale (0.88→1)
 *   2. Inner parallax — counter-scale (1.1→1) so content appears to "emerge"
 *   3. Hover layer    — additional 5% scale on hover, filtered shadow
 *
 * Props:
 *  - children              — the image / video / any content
 *  - className             — extra classes on the outer wrapper
 *  - style                 — extra inline styles on the outer wrapper
 *  - rounded               — Tailwind class (default "rounded-[2rem]")
 *  - scrollOffset          — [start, end] for useScroll offset (default ["0 1","0.65 1"])
 */
export default function ScaleMediaBlock({
  children,
  className    = "",
  style        = {},
  rounded      = "rounded-[2rem]",
  scrollOffset = ["0 1", "0.65 1"],
}) {
  const ref       = useRef(null);
  const [hovered, setHovered] = useState(false);

  /* ── Scroll progress for this block ───────────────────────────── */
  const { scrollYProgress } = useScroll({
    target:  ref,
    offset:  scrollOffset,
  });

  // Smooth the scroll progress so it doesn't feel mechanical
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping:   20,
    restDelta: 0.001,
  });

  // Layer 1: outer container scales up as it enters the viewport
  const outerScale = useTransform(smoothProgress, [0, 1], [0.88, 1.0]);

  // Layer 2: inner content counter-scales (creates parallax depth)
  const innerScale = useTransform(smoothProgress, [0, 1], [1.12, 1.0]);

  /* ── Hover callbacks ───────────────────────────────────────────── */
  const onEnter = useCallback(() => setHovered(true),  []);
  const onLeave = useCallback(() => setHovered(false), []);

  return (
    /* ── Shadow wrapper — stays outside scaled container ─────────── */
    <motion.div
      animate={{
        boxShadow: hovered
          ? "0 32px 64px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)"
          : "var(--shadow-lg)",
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`${rounded} overflow-hidden ${className}`}
      style={style}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* ── Layer 1: scroll-scale (outer) ───────────────────────── */}
      <motion.div
        ref={ref}
        style={{ scale: outerScale, width: "100%", height: "100%" }}
      >
        {/* ── Layer 2: counter-scale parallax (inner) ─────────── */}
        <motion.div
          style={{ scale: innerScale, width: "100%", height: "100%" }}
        >
          {/* ── Layer 3: hover +5% scale ────────────────────── */}
          <motion.div
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ width: "100%", height: "100%" }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
