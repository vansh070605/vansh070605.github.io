import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Ambient layers */}
      <div className="hero-bg-glow main" />
      <div className="hero-bg-glow secondary" />

      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.18 }
          }
        }}
      >
        <motion.p
          className="hero-intro"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          Hello, I’m
        </motion.p>

        <motion.h1
          className="hero-title"
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          Vansh <span>Agrawal</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          Software Engineer · System Builder
        </motion.p>

        <motion.p
          className="hero-description"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          I design and engineer scalable, clean digital systems —
          combining modern web technologies with intelligent
          software to solve real-world problems.
        </motion.p>

        {/* Subtle CTA (optional but powerful) */}
        <motion.a
          href="#projects"
          className="hero-cta"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ x: 6 }}
        >
          View Projects →
        </motion.a>
      </motion.div>
    </section>
  );
}
