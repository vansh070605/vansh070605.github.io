import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "../context/CursorContext";

export default function CustomCursor() {
  const { isHovered } = useCursor();

  /* ── Only show on fine-pointer / wide screens ── */
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(max-width: 768px)").matches
    );
  });

  useEffect(() => {
    const fineQ   = window.matchMedia("(pointer: fine)");
    const narrowQ = window.matchMedia("(max-width: 768px)");
    const update  = () => setIsFinePointer(fineQ.matches && !narrowQ.matches);
    fineQ.addEventListener("change", update);
    narrowQ.addEventListener("change", update);
    return () => { fineQ.removeEventListener("change", update); narrowQ.removeEventListener("change", update); };
  }, []);

  /* ── Motion values ── */
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Dot follows tightly
  const dotX = useSpring(cursorX, { stiffness: 700, damping: 38, mass: 0.3 });
  const dotY = useSpring(cursorY, { stiffness: 700, damping: 38, mass: 0.3 });

  // Ring trails with soft lag
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    const onMove = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  if (!isFinePointer) return null;

  const ACCENT = "79, 70, 229"; // RGB of indigo-600

  return (
    <>
      {/* ── Dot — crisp, accent-colored ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position:    "fixed",
          top:         0,
          left:        0,
          x:           dotX,
          y:           dotY,
          translateX:  "-50%",
          translateY:  "-50%",
          pointerEvents: "none",
          zIndex:      99999,
          borderRadius: "50%",
          background:  isHovered
            ? `rgba(${ACCENT}, 1)`
            : "var(--text)",
          width:       isHovered ? "10px" : "5px",
          height:      isHovered ? "10px" : "5px",
          boxShadow:   isHovered
            ? `0 0 12px 3px rgba(${ACCENT}, 0.55)`
            : "none",
          transition:  "width 0.22s cubic-bezier(0.34,1.56,0.64,1), height 0.22s cubic-bezier(0.34,1.56,0.64,1), background 0.22s ease, box-shadow 0.22s ease",
        }}
      />

      {/* ── Ring — clean circle, no blend-mode ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position:    "fixed",
          top:         0,
          left:        0,
          x:           ringX,
          y:           ringY,
          translateX:  "-50%",
          translateY:  "-50%",
          pointerEvents: "none",
          zIndex:      99998,
          borderRadius: "50%",
          border:      isHovered
            ? `1.5px solid rgba(${ACCENT}, 0.85)`
            : "1.5px solid rgba(128,128,128,0.28)",
          background:  isHovered
            ? `rgba(${ACCENT}, 0.06)`
            : "transparent",
          width:        isHovered ? "48px" : "28px",
          height:       isHovered ? "48px" : "28px",
          boxShadow:    isHovered
            ? `0 0 20px 4px rgba(${ACCENT}, 0.18), inset 0 0 12px rgba(${ACCENT}, 0.06)`
            : "none",
          backdropFilter: isHovered ? "blur(1px)" : "none",
          transition:
            "width 0.38s cubic-bezier(0.34,1.56,0.64,1), " +
            "height 0.38s cubic-bezier(0.34,1.56,0.64,1), " +
            "border-color 0.25s ease, " +
            "background 0.25s ease, " +
            "box-shadow 0.3s ease",
        }}
      />
    </>
  );
}
