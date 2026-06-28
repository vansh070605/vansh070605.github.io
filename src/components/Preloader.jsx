import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHRASES = ["VANSH AGRAWAL", "AIML ENGINEER", "FULL STACK DEV"];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState("counting"); // counting | done | exit

  useEffect(() => {
    let val = 0;
    const tick = () => {
      const step = Math.random() * 14 + 3;
      val = Math.min(val + step, 100);
      setProgress(Math.floor(val));
      if (val < 100) {
        setTimeout(tick, Math.random() * 90 + 30);
      } else {
        setPhase("done");
        setTimeout(() => {
          setPhase("exit");
          setTimeout(onComplete, 900);
        }, 700);
      }
    };
    const t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, [onComplete]);

  const paddedProgress = String(progress).padStart(2, "0");

  return (
    <motion.div
      key="preloader"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
      initial={{ opacity: 1 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 bg-dot-pattern pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      {/* Main counter */}
      <div className="relative z-10 text-center select-none">
        <motion.div
          className="font-display"
          style={{
            fontSize: "clamp(6rem, 20vw, 16rem)",
            lineHeight: 1,
            color: "var(--text)",
            letterSpacing: "-0.04em",
            fontStyle: "italic",
          }}
          key={progress}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05 }}
        >
          {paddedProgress}
        </motion.div>

        {/* Label */}
        <motion.p
          className="label-text mt-6 tracking-widest"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {phase === "done" ? "Ready" : "Loading portfolio"}
        </motion.p>
      </div>

      {/* Name reveal strip */}
      <motion.div
        className="absolute bottom-24 left-0 right-0 flex justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p
          className="label-text text-center"
          style={{ letterSpacing: "0.25em", fontSize: "0.7rem" }}
        >
          {PHRASES[0]}
        </p>
      </motion.div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "var(--border)" }}
      >
        <motion.div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, var(--accent), var(--accent-rose))",
            originX: 0,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ ease: "linear", duration: 0.15 }}
        />
      </div>
    </motion.div>
  );
}
