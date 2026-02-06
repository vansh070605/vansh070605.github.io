import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        {/* Code-style introduction */}
        <div className="hero-code">
          <span className="line">
            <span className="comment">// Portfolio initialized...</span>
          </span>
          <span className="line">
            <span className="keyword">const</span>{" "}
            <span className="variable">developer</span>{" "}
            <span className="operator">=</span> {"{"}
          </span>
          <span className="line">
            &nbsp;&nbsp;<span className="string">name</span>:{" "}
            <span className="string">"Vansh Agrawal"</span>,
          </span>
          <span className="line">
            &nbsp;&nbsp;<span className="string">role</span>:{" "}
            <span className="string">"AIML Engineer"</span>,
          </span>
          <span className="line">
            &nbsp;&nbsp;<span className="string">semester</span>:{" "}
            <span className="number">6</span>,
          </span>
          <span className="line">{"}"}</span>
        </div>

        {/* Main title */}
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Hello, I'm <span style={{ color: '#C3E88D' }}>Vansh</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="operator">&gt;</span> Building intelligent systems with{" "}
          <span className="keyword">AI/ML</span> & elegant code
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{ color: '#707A8A', marginBottom: '40px', fontFamily: 'var(--font-sans)' }}
        >
          6th semester AIML Engineering student passionate about deep learning,
          computer vision, and full-stack development. Turning complex problems
          into clean, scalable solutions.
        </motion.p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.a
            href="#projects"
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="function">viewProjects</span>()
          </motion.a>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              borderColor: '#C3E88D',
              color: '#C3E88D'
            }}
          >
            <span className="function">downloadResume</span>()
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '60px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          color: '#546E7A',
          animation: 'pulse 2s infinite'
        }}
        className="scroll-indicator"
      >
        <span className="operator">▼</span> scroll to explore
      </motion.div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 968px) {
          .hero {
            padding: 100px 6vw !important;
            text-align: left !important;
            align-items: flex-start !important;
          }
          
          .hero-content {
            width: 100%;
            max-width: 100%;
          }
          
          .hero-code {
            font-size: 0.85rem !important;
            margin-bottom: 35px !important;
          }
          
          .hero-title {
            font-size: clamp(2.2rem, 8vw, 3rem) !important;
            margin-bottom: 25px !important;
          }
          
          .hero-subtitle {
            font-size: clamp(1.2rem, 4vw, 1.5rem) !important;
            margin-bottom: 25px !important;
          }
          
          .hero-content p {
            font-size: 1rem !important;
            line-height: 1.7 !important;
          }
          
          .hero-content > div > a {
            width: 100% !important;
            justify-content: center !important;
            padding: 16px 24px !important;
            font-size: 1rem !important;
          }
          
          .hero-content > div {
            flex-direction: column !important;
            width: 100% !important;
            gap: 15px !important;
          }
          
          .scroll-indicator {
            bottom: 30px !important;
            font-size: 0.8rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero {
            padding: 80px 5vw !important;
            min-height: 90vh !important;
          }
          
          .hero-code {
            font-size: 0.8rem !important;
            margin-bottom: 30px !important;
          }
          
          .hero-code .line {
            line-height: 1.7 !important;
          }
          
          .hero-title {
            font-size: 2rem !important;
            margin-bottom: 20px !important;
          }
          
          .hero-subtitle {
            font-size: 1.15rem !important;
            margin-bottom: 20px !important;
          }
          
          .hero-content p {
            font-size: 0.95rem !important;
            line-height: 1.7 !important;
            margin-bottom: 35px !important;
          }
          
          .hero-content > div > a {
            padding: 15px 24px !important;
            font-size: 0.95rem !important;
          }
          
          .scroll-indicator {
            bottom: 20px !important;
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
