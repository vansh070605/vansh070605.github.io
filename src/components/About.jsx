import { motion } from "framer-motion";
import HyperText from "./ui/HyperText";

export default function About() {
  return (
    <section className="about" id="about">
      {/* Section header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="comment" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
          // Personal introduction
        </p>
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          color: '#EEFFFF'
        }}>
          <span className="keyword">function</span> <span className="function"><HyperText text="aboutMe" /></span>() {'{'}
        </h2>
      </motion.div>

      {/* Layout: Circular image left, all content right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '60px',
        alignItems: 'start',
        marginTop: '60px'
      }} className="about-grid">
        {/* Left: Circular Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            position: 'relative',
            flexShrink: 0
          }}
        >
          {/* Circular image container */}
          <div style={{
            width: '300px',
            height: '300px',
            position: 'relative'
          }}>
            {/* Gradient border (static) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C792EA, #82AAFF, #C3E88D, #FFCB6B)',
              padding: '4px'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#000'
              }}>
                <img
                  src="/vansh.jpeg"
                  alt="Vansh Agrawal"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.95) contrast(1.05)'
                  }}
                />
              </div>
            </div>

            {/* Glowing rings */}
            <div style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #82AAFF20, transparent 70%)',
              filter: 'blur(20px)',
              zIndex: -1
            }} />
            <div style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #C792EA15, transparent 70%)',
              filter: 'blur(30px)',
              zIndex: -2
            }} />
          </div>
        </motion.div>

        {/* Right: All Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Story */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '1.3rem', marginBottom: '25px', lineHeight: '1.8' }}>
              I'm a <span style={{ color: '#C792EA', fontWeight: 600 }}>6th semester AIML Engineering student</span> who
              believes in the power of <span style={{ color: '#82AAFF' }}>intelligent code</span> to solve real-world problems.
            </p>

            <p style={{ marginBottom: '20px', color: '#EEFFFF', lineHeight: '1.8', fontSize: '1.05rem' }}>
              My journey started with curiosity about how machines learn and evolved into a passion for building
              systems that combine <span style={{ color: '#C3E88D' }}>deep learning</span>, <span style={{ color: '#89DDFF' }}>computer vision</span>,
              and elegant software architecture.
            </p>

            <p style={{ color: '#EEFFFF', lineHeight: '1.8', fontSize: '1.05rem' }}>
              Currently exploring <span style={{ color: '#FFCB6B' }}>transformers</span>, CNNs, and the art of
              building scalable web applications. I love turning complex algorithms into clean, maintainable code
              that actually works in production.
            </p>
          </div>

          {/* Metadata */}
          <div
            style={{
              padding: '35px',
              background: 'rgba(130, 170, 255, 0.05)',
              border: '1px solid rgba(130, 170, 255, 0.2)',
              borderRadius: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              lineHeight: '2'
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              <span className="variable">education</span>: <span className="string">"B.Tech CSE w/s in AIML"</span>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span className="variable">semester</span>: <span className="number">6</span> / <span className="number">8</span>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span className="variable">interests</span>: [<br />
              &nbsp;&nbsp;<span className="string">"Deep Learning"</span>,<br />
              &nbsp;&nbsp;<span className="string">"Computer Vision"</span>,<br />
              &nbsp;&nbsp;<span className="string">"Full-Stack"</span><br />
              ]
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span className="variable">location</span>: <span className="string">"Delhi, India"</span>
            </div>
            <div>
              <span className="variable">status</span>: <span className="string">"Open to opportunities"</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rotation animation + responsive */}
      <style>{`
        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 968px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            justify-items: center;
          }
          
          .about-grid > div:first-child > div {
            width: 250px !important;
            height: 250px !important;
          }
        }
        
        @media (max-width: 480px) {
          .about-grid > div:first-child > div {
            width: 200px !important;
            height: 200px !important;
          }
        }
      `}</style>
    </section>
  );
}
