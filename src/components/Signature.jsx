import { motion } from "framer-motion";
import { useState } from "react";

export default function Signature({ isInView }) {
  const [animationKey, setAnimationKey] = useState(0);

  // Horizontal thick mask paths to guarantee 100% text visibility without any slice cut-offs
  const vanshMaskPath = "M 12,45 L 140,45";
  const agrawalMaskPath = "M 155,45 L 285,45";

  // Wavy, cursive paths for the pen tip trackers to follow for realistic signature motion
  const vanshPenPath = "M 15,35 L 24,55 L 34,22 L 44,52 L 110,48 L 120,18 L 128,52";
  const agrawalPenPath = "M 160,42 L 172,20 L 182,58 L 192,72 L 202,48 L 285,48 L 295,18 L 305,52";

  // Coordinates for the underline flourish, shortened to end precisely under the letter 'l' of Agrawal (at x=275)
  const flourishPath = "M 20,76 C 100,68 180,68 275,70";

  const handleRestart = () => {
    setAnimationKey((prev) => prev + 1);
  };

  // Timings for animations
  const vanshDuration = 1.2;
  const vanshDelay = 0.4;

  const agrawalDuration = 1.4;
  const agrawalDelay = vanshDelay + vanshDuration + 0.15; // Human pause between words

  const flourishDuration = 0.8;
  const flourishDelay = agrawalDelay + agrawalDuration + 0.1; // Pause before underline flourish

  return (
    <div 
      className="relative flex items-center justify-center cursor-pointer select-none group"
      onClick={handleRestart}
      title="Click to watch signature draw again"
    >
      <svg
        key={animationKey}
        className="w-[200px] sm:w-[235px] md:w-[265px] h-auto overflow-visible text-zinc-900 dark:text-zinc-100"
        viewBox="12 0 268 95"
        fill="none"
      >
        <defs>
          {/* Outer glow filter for the pen tip */}
          <filter id="pen-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Mask that hides/reveals the original cursive text */}
          <mask id="sig-mask">
            {/* Vansh reveal stroke (extra thick to prevent clipping) */}
            <motion.path
              d={vanshMaskPath}
              stroke="white"
              strokeWidth="50"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: vanshDuration, ease: "linear", delay: vanshDelay },
                opacity: { duration: 0.01, delay: vanshDelay }
              }}
            />
            {/* Agrawal reveal stroke (extra thick to prevent clipping) */}
            <motion.path
              d={agrawalMaskPath}
              stroke="white"
              strokeWidth="50"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: agrawalDuration, ease: "linear", delay: agrawalDelay },
                opacity: { duration: 0.01, delay: agrawalDelay }
              }}
            />
          </mask>
        </defs>

        {/* --- THE TEXT (Masked using original Dancing Script cursive font) --- */}
        <g mask="url(#sig-mask)">
          <text
            x="15"
            y="52"
            fontFamily="'Dancing Script', cursive"
            fontSize="38"
            fontWeight="700"
            fill="currentColor"
            letterSpacing="0.01em"
          >
            Vansh Agrawal
          </text>
        </g>

        {/* --- STROKE 3: Underline Flourish (drawn outside mask, animates natively) --- */}
        <motion.path
          d={flourishPath}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: flourishDuration,
            ease: "easeOut",
            delay: flourishDelay,
          }}
        />

        {/* --- MOVING PEN TIPS (Realistic glow trackers via custom CSS variables) --- */}
        {/* Vansh Pen Tip */}
        <motion.circle
          r="3"
          fill="currentColor"
          filter="url(#pen-glow)"
          className="text-zinc-900 dark:text-amber-400"
          style={{
            offsetPath: `path("${vanshPenPath}")`,
            offsetRotate: "0deg",
            offsetDistance: "var(--vansh-dist, 0%)",
          }}
          initial={{ "--vansh-dist": "0%", opacity: 0 }}
          animate={
            isInView
              ? {
                  "--vansh-dist": ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            "--vansh-dist": {
              duration: vanshDuration,
              ease: [0.45, 0, 0.55, 1], // Wavy cursive easing matches pen movement
              delay: vanshDelay,
            },
            opacity: {
              duration: vanshDuration,
              times: [0, 0.05, 0.95, 1],
              delay: vanshDelay,
            },
          }}
        />

        {/* Agrawal Pen Tip */}
        <motion.circle
          r="3"
          fill="currentColor"
          filter="url(#pen-glow)"
          className="text-zinc-900 dark:text-amber-400"
          style={{
            offsetPath: `path("${agrawalPenPath}")`,
            offsetRotate: "0deg",
            offsetDistance: "var(--agrawal-dist, 0%)",
          }}
          initial={{ "--agrawal-dist": "0%", opacity: 0 }}
          animate={
            isInView
              ? {
                  "--agrawal-dist": ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            "--agrawal-dist": {
              duration: agrawalDuration,
              ease: [0.45, 0, 0.55, 1], // Wavy cursive easing matches pen movement
              delay: agrawalDelay,
            },
            opacity: {
              duration: agrawalDuration,
              times: [0, 0.05, 0.95, 1],
              delay: agrawalDelay,
            },
          }}
        />

        {/* Underline Flourish Pen Tip */}
        <motion.circle
          r="3"
          fill="currentColor"
          filter="url(#pen-glow)"
          className="text-zinc-900 dark:text-amber-400"
          style={{
            offsetPath: `path("${flourishPath}")`,
            offsetRotate: "0deg",
            offsetDistance: "var(--flourish-dist, 0%)",
          }}
          initial={{ "--flourish-dist": "0%", opacity: 0 }}
          animate={
            isInView
              ? {
                  "--flourish-dist": ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            "--flourish-dist": {
              duration: flourishDuration,
              ease: "easeOut",
              delay: flourishDelay,
            },
            opacity: {
              duration: flourishDuration,
              times: [0, 0.1, 0.9, 1],
              delay: flourishDelay,
            },
          }}
        />
      </svg>
    </div>
  );
}



