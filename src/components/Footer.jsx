import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const SOCIAL_LINKS = [
  {
    id: "footer-github",
    name: "GitHub",
    url: "https://github.com/vansh070605",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    id: "footer-linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/thevanshagrawal",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "footer-x",
    name: "X",
    url: "https://x.com/vansh070605",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "footer-instagram",
    name: "Instagram",
    url: "https://instagram.com/thevanshagrawal",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

/* ── Transparent Cutout Image generator via Canvas Boundary Fill ── */
function TransparentImage({ src, alt, className, style }) {
  const [dataUrl, setDataUrl] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const width = canvas.width;
      const height = canvas.height;

      // Map 2D coordinates to 1D index
      const getIdx = (x, y) => (y * width + x) * 4;

      // Track visited pixels for flood fill
      const visited = new Uint8Array(width * height);
      const queue = [];

      // Add border pixels to start queue if they are close to white
      const checkAndPush = (x, y) => {
        const idx = getIdx(x, y);
        if (data[idx] > 235 && data[idx + 1] > 235 && data[idx + 2] > 235) {
          const vIdx = y * width + x;
          if (!visited[vIdx]) {
            visited[vIdx] = 1;
            queue.push([x, y]);
          }
        }
      };

      // Scan outer borders
      for (let x = 0; x < width; x++) {
        checkAndPush(x, 0);
        checkAndPush(x, height - 1);
      }
      for (let y = 0; y < height; y++) {
        checkAndPush(0, y);
        checkAndPush(width - 1, y);
      }

      // Breadth-First-Search flood fill to make ONLY contiguous outer white transparent
      while (queue.length > 0) {
        const [x, y] = queue.shift();
        const idx = getIdx(x, y);
        data[idx + 3] = 0; // Set Alpha to 0

        const neighbors = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1],
        ];

        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nIdx = getIdx(nx, ny);
            const vIdx = ny * width + nx;
            if (!visited[vIdx] && data[nIdx] > 235 && data[nIdx + 1] > 235 && data[nIdx + 2] > 235) {
              visited[vIdx] = 1;
              queue.push([nx, ny]);
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setDataUrl(canvas.toDataURL());
    };
  }, [src]);

  return <img src={dataUrl} alt={alt} className={className} style={style} />;
}

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
    },
  });

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden transition-colors duration-500 bg-[#fcfbf9] dark:bg-[#08080a] border-t border-zinc-200/80 dark:border-zinc-800/60"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      id="footer-poster"
    >

      {/* ─── Main body: photo left, content right ─── */}
      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-[auto_1fr] items-end px-6 md:px-16 pb-0 gap-0 z-10">

        {/* Photo — bottom-anchored cutout, overlapping bottom line */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: {
              opacity: 1, y: 0,
              transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="self-end flex items-end translate-y-[2px] z-20"
          style={{
            height: "55vh",
            maxHeight: "500px",
          }}
        >
          <img
            src="/vansh_cutout copy.png"
            alt="Vansh Agrawal"
            className="h-[105%] w-auto object-contain object-bottom select-none pointer-events-none"
            style={{
              maxWidth: "340px",
              filter: "contrast(1.02) grayscale(100%)",
            }}
          />
        </motion.div>

        {/* Right — tagline + actions */}
        <div className="flex flex-col items-start md:items-end justify-end gap-6 py-12 md:pb-12 md:py-0 text-zinc-900 dark:text-zinc-100">

          {/* Big tagline */}
          <motion.h2
            variants={fadeUp(0.15)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display text-left md:text-right max-w-2xl"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.8rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              fontWeight: 500,
            }}
          >
            Engineering intelligence<br />through code.
          </motion.h2>

          {/* Social icon pill — high contrast rounded capsule */}
          <motion.div
            variants={fadeUp(0.22)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-0.5 rounded-full p-1.5 bg-zinc-900 dark:bg-zinc-100"
            style={{
              boxShadow: "0 6px 30px rgba(0,0,0,0.15)",
            }}
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                id={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 text-white dark:text-zinc-950 hover:text-zinc-300 dark:hover:text-zinc-700"
              >
                {link.icon}
              </a>
            ))}
          </motion.div>

          {/* Resume + Back to top */}
          <motion.div
            variants={fadeUp(0.28)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-3"
          >
            <a
              href="/Resume - Vansh Agrawal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 bg-transparent hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-950"
              style={{
                border: "1.5px solid currentColor",
                fontSize: "0.75rem",
              }}
              id="footer-resume"
            >
              Résumé ↗
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 border bg-transparent hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-950"
              style={{
                borderColor: "currentColor",
                fontSize: "1rem",
              }}
              id="back-to-top"
              aria-label="Back to top"
            >
              ↑
            </button>
          </motion.div>
        </div>
      </div>

      {/* ─── Horizontal divider ─── */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        className="w-full relative z-10 bg-zinc-900/30 dark:bg-zinc-100/20"
        style={{ height: "1.5px" }}
      />

      {/* ─── Bottom bar: copyright + signature ─── */}
      <div className="relative flex items-center justify-between px-6 md:px-16 py-8 z-10 text-zinc-900 dark:text-zinc-100">
        <motion.p
          variants={fadeUp(0.4)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[10px] tracking-wider uppercase font-mono text-zinc-500 dark:text-zinc-400"
        >
          © {new Date().getFullYear()} Vansh Agrawal · All rights reserved
        </motion.p>

        {/* Dancing Script signature */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 24 },
            visible: {
              opacity: 1, x: 0,
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative inline-flex flex-col"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
            fontWeight: 700,
            letterSpacing: "0.01em",
            lineHeight: 1.1,
          }}
        >
          <div className="flex select-none">
            {"Vansh Agrawal".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 12, filter: "blur(2px)" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.4 + index * 0.04,
                }}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          {/* Animated handwritten underline flourish */}
          <svg
            className="w-full text-zinc-900 dark:text-zinc-100"
            style={{
              height: "12px",
              marginTop: "-2px",
              overflow: "visible",
              pointerEvents: "none",
            }}
            viewBox="0 0 100 10"
            fill="none"
          >
            <motion.path
              d="M 2,5 Q 50,2 98,6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                delay: 0.4 + ("Vansh Agrawal".length * 0.04),
              }}
            />
          </svg>
        </motion.div>
      </div>
    </footer>
  );
}
