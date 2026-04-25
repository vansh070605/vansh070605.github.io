import { motion } from "framer-motion";
import HyperText from "./ui/HyperText";

export default function About() {
  return (
    <section className="about" id="about">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="comment" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>

        </p>
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          color: '#EEFFFF'
        }}>
          <span className="keyword">function</span> <span className="function"><HyperText text="aboutMe" /></span>() {'{'}
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '60px',
        alignItems: 'start',
        marginTop: '60px',
        maxWidth: '1350px', // Increased from 1100px to utilize more screen width
        margin: '60px auto 0',
        padding: '0 20px'
      }} className="about-grid">
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
          <div style={{
            width: '300px',
            height: '300px',
            position: 'relative'
          }}>
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

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div style={{ marginBottom: '40px', color: '#B0BEC5', textAlign: 'justify' }}>
            <p style={{ fontSize: '1.15rem', marginBottom: '24px', lineHeight: '2' }}>
              I'm <span style={{ color: '#89DDFF', fontWeight: 600 }}>Vansh Agrawal</span>, a <span style={{ color: '#C792EA', fontWeight: 600 }}>6th-semester AIML Engineering student</span> who believes in the power of <span style={{ color: '#82AAFF', fontWeight: 600 }}>intelligent code</span> to solve real-world problems.
            </p>

            <p style={{ fontSize: '1.15rem', marginBottom: '24px', lineHeight: '2' }}>
              My journey started with curiosity about how machines learn and evolved into a passion for building systems that integrate <span style={{ color: '#C3E88D', fontWeight: 600 }}>deep learning</span>, <span style={{ color: '#89DDFF', fontWeight: 600 }}>computer vision</span>, and <span style={{ color: '#FFCB6B', fontWeight: 600 }}>scalable architecture</span>.
            </p>

            <p style={{ fontSize: '1.15rem', lineHeight: '2' }}>
              Currently exploring <span style={{ color: '#F07178', fontWeight: 600 }}>transformers</span>, CNNs, and the art of building robust web applications. I love turning complex algorithms into clean, maintainable code that actually works in production.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(10, 10, 10, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              overflow: 'hidden'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 20px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }} />
            </div>

            <div style={{
              padding: '30px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '1.05rem',
              lineHeight: '2.2',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px'
            }}>
              <div>
                <div>
                  <span style={{ color: '#82AAFF' }}>education:</span> <span style={{ color: '#C3E88D' }}>"B.Tech CSE w/s in AIML"</span>
                </div>
                <div>
                  <span style={{ color: '#82AAFF' }}>semester:</span> <span style={{ color: '#F78C6C' }}>"6 / 8"</span>
                </div>
                <div>
                  <span style={{ color: '#82AAFF' }}>location:</span> <span style={{ color: '#C3E88D' }}>"Chennai, India"</span>
                </div>
                <div>
                  <span style={{ color: '#82AAFF' }}>status:</span> <span style={{ color: '#C3E88D' }}>"Open to opportunities"</span>
                </div>
              </div>

              <div>
                <div>
                  <span style={{ color: '#82AAFF' }}>interests:</span> <span style={{ color: '#EEFFFF' }}>[</span>
                  <div style={{ paddingLeft: '24px' }}>
                    <span style={{ color: '#C3E88D' }}>"Deep Learning"</span>,<br />
                    <span style={{ color: '#C3E88D' }}>"Computer Vision"</span>,<br />
                    <span style={{ color: '#C3E88D' }}>"Transformers"</span>,<br />
                    <span style={{ color: '#C3E88D' }}>"Full-Stack"</span>
                  </div>
                  <span style={{ color: '#EEFFFF' }}>]</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes rotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
