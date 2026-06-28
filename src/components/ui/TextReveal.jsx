import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   SHARED EASING — Podium formula
   ease: [0.33, 1, 0.68, 1]  ←  cubic-bezier matching the spec
   ───────────────────────────────────────────────────────────────── */
const EASE = [0.33, 1, 0.68, 1];

/* ─────────────────────────────────────────────────────────────────
   MaskReveal
   The fundamental primitive: a single hidden-mask wrapper.
   Parent has overflow:hidden; inner span translates y: 110% → 0%.
   Use this for block-level elements (headings, images, labels).

   Usage:
     <MaskReveal delay={0.15}>
       <h2 style={{...}}>Any JSX</h2>
     </MaskReveal>
   ───────────────────────────────────────────────────────────────── */
export function MaskReveal({
  children,
  delay    = 0,
  duration = 0.95,
  once     = true,
  style    = {},
  className = "",
  animateOnMount = false,
}) {
  return (
    <div
      className={className}
      style={{ overflow: "hidden", display: "block", ...style }}
    >
      <motion.div
        style={{ display: "block", willChange: "transform" }}
        initial={{ y: "110%" }}
        animate={animateOnMount ? { y: "0%" } : undefined}
        whileInView={animateOnMount ? undefined : { y: "0%" }}
        viewport={animateOnMount ? undefined : { once, margin: "-60px" }}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TextReveal
   Word-by-word mask reveal. Each word is wrapped in overflow:hidden
   and its inner span translates from 110% to 0% with a stagger.
   Use for headings or short sentences where word animation reads well.

   Usage:
     <TextReveal as="h2" className="display-text" stagger={0.06} delay={0.1}>
       Things I've built.
     </TextReveal>
   ───────────────────────────────────────────────────────────────── */
export function TextReveal({
  children,
  as: Tag  = "div",
  className = "",
  style     = {},
  delay     = 0,
  stagger   = 0.055,
  duration  = 0.9,
  once      = true,
}) {
  const words = String(children).split(" ");

  return (
    <Tag
      className={className}
      style={{
        display:   "flex",
        flexWrap:  "wrap",
        columnGap: "0.28em",
        rowGap:    "0",
        ...style,
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display:    "inline-block",
            overflow:   "hidden",
            lineHeight: "inherit",
            paddingBottom: "0.06em", // prevents descender clipping
          }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once, margin: "-60px" }}
            transition={{
              duration,
              ease:  EASE,
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FadeReveal
   Simple fade + slight Y shift for body text / paragraphs.
   Less theatrical than mask reveal — better for longer prose.
   ───────────────────────────────────────────────────────────────── */
export function FadeReveal({
  children,
  delay    = 0,
  duration = 0.75,
  once     = true,
  className = "",
  style     = {},
  animateOnMount = false,
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 22 }}
      animate={animateOnMount ? { opacity: 1, y: 0 } : undefined}
      whileInView={animateOnMount ? undefined : { opacity: 1, y: 0 }}
      viewport={animateOnMount ? undefined : { once, margin: "-60px" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SlideRightReveal
   Fades and slides elements in from left to right.
   ───────────────────────────────────────────────────────────────── */
export function SlideRightReveal({
  children,
  delay    = 0,
  duration = 0.85,
  once     = true,
  className = "",
  style     = {},
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MaskRevealRight
   A mask wrapper where the element slides in from the left (x: -110% to 0).
   ───────────────────────────────────────────────────────────────── */
export function MaskRevealRight({
  children,
  delay    = 0,
  duration = 0.95,
  once     = true,
  style    = {},
  className = "",
}) {
  return (
    <div
      className={className}
      style={{ overflow: "hidden", display: "block", ...style }}
    >
      <motion.div
        style={{ display: "block", willChange: "transform" }}
        initial={{ x: "-110%" }}
        whileInView={{ x: "0%" }}
        viewport={{ once, margin: "-60px" }}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default TextReveal;
