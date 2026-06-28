import { useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "../../context/CursorContext";

/**
 * Magnetic — spring-based cursor attraction.
 *
 * When the cursor enters within `radius` pixels of the element's center,
 * the element smoothly translates toward the pointer.
 * Also signals CursorContext so the custom cursor dot expands.
 *
 * Props:
 *  - strength {number}  — fraction of delta to move (default 0.38)
 *  - radius   {number}  — pixel radius of magnetic field (default 100)
 *  - className          — forwarded to wrapper div
 */
export default function Magnetic({
  children,
  strength = 0.38,
  radius   = 100,
  className = "",
}) {
  const ref          = useRef(null);
  const { enter, leave } = useCursor();

  // Source motion values for x / y displacement
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring config — slight overshoot for a satisfying "pull" feel
  const SPRING = { stiffness: 200, damping: 18, mass: 0.12 };
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect    = ref.current.getBoundingClientRect();
      const cx      = rect.left + rect.width  / 2;
      const cy      = rect.top  + rect.height / 2;
      const dx      = e.clientX - cx;
      const dy      = e.clientY - cy;
      const dist    = Math.hypot(dx, dy);

      if (dist < radius) {
        rawX.set(dx * strength);
        rawY.set(dy * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    },
    [rawX, rawY, strength, radius]
  );

  const handleMouseEnter = useCallback(() => enter(), [enter]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    leave();
  }, [rawX, rawY, leave]);

  // Global mousemove so attraction works even before the cursor is directly over the el
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-flex" }}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
