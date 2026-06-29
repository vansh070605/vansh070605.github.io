import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "../context/CursorContext";

export default function CustomCursor() {
  const { isHovered: contextHovered } = useCursor();
  const [isHovered, setIsHovered] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState([]);

  /* ── Sync context hover state ── */
  useEffect(() => {
    if (contextHovered) {
      setIsHovered(true);
    }
  }, [contextHovered]);

  /* ── Only render cursor on desktop/fine-pointer screens ── */
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth > 768
    );
  });

  useEffect(() => {
    const fineQ = window.matchMedia("(pointer: fine)");
    const update = () => {
      setIsFinePointer(fineQ.matches && window.innerWidth > 768);
    };
    fineQ.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      fineQ.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* ── Motion coordinates ── */
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Smooth physics spring for pointer coordinates
  const dotX = useSpring(cursorX, { stiffness: 950, damping: 42, mass: 0.15 });
  const dotY = useSpring(cursorY, { stiffness: 950, damping: 42, mass: 0.15 });

  /* ── Event listeners for coordinate tracking & interaction ── */
  useEffect(() => {
    if (!isFinePointer) return;

    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Determine if interactive element
      const isInteractive =
        target.tagName === "A" ||
        target.closest("a") ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer") ||
        target.classList.contains("hoverable");

      // Determine if text editing field
      const isTextInput =
        (target.tagName === "INPUT" && ["text", "email", "search", "url", "tel", "password"].includes(target.type)) ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      setIsHovered(!!isInteractive);
      setIsText(!!isTextInput);
    };

    const onMouseDown = (e) => {
      setIsClicked(true);
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isFinePointer, cursorX, cursorY]);

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (!isFinePointer) return null;

  return (
    <>
      {/* ── 1. CLICK RIPPLES ── */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0.1, opacity: 0.5 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => removeRipple(ripple.id)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            x: ripple.x,
            y: ripple.y,
            translateX: "-50%",
            translateY: "-50%",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: "2px solid var(--accent)",
            pointerEvents: "none",
            zIndex: 99997,
          }}
        />
      ))}

      {/* ── 2. ENLARGED BESPOKE ANIMATED POINTER (SVG ARROWHEAD) ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: isText ? -18 : -2, // Offset to align tip of arrowhead (2,2) or center of I-beam (18,18)
          translateY: isText ? -18 : -2,
          pointerEvents: "none",
          zIndex: 99999,
        }}
      >
        <motion.svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transformOrigin: isText ? "18px 18px" : "2px 2px" }}
          animate={{
            rotate: isText ? 0 : isHovered ? -12 : 0,
            scale: isClicked ? 0.82 : isHovered ? 1.15 : 1,
          }}
          transition={{ type: "spring", stiffness: 450, damping: 28 }}
        >
          <AnimatePresence mode="wait">
            {isText ? (
              <motion.path
                key="text-beam"
                d="M 12,6 L 24,6 M 18,6 L 18,30 M 12,30 L 24,30"
                stroke="var(--text)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
              />
            ) : (
              <motion.path
                key="arrowhead"
                d="M 2,2 L 2,32 L 11,21 L 23,23 Z"
                fill={isHovered ? "var(--accent)" : "var(--text)"}
                stroke={isHovered ? "var(--accent-light)" : "var(--bg)"}
                strokeWidth="1.8"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
              />
            )}
          </AnimatePresence>
        </motion.svg>
      </motion.div>
    </>
  );
}
