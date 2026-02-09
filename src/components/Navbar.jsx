import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const links = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'transparent',
        // backdropFilter: 'blur(8px)',
        // borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {/* Logo: [ vansh. ] */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            color: '#EEFFFF',
            fontWeight: 600
          }}
        >
          [ vansh. ]
        </motion.div>

        {/* Right Status Bar (Desktop) */}
        <motion.div
          className="nav-status-bar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: '#A6ACCD'
          }}
        >
          <span>India</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>{time}</span>
          <span style={{ opacity: 0.5 }}>|</span>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ color: '#89DDFF' }}
            style={{
              color: '#EEFFFF',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            Résumé
          </motion.a>
        </motion.div>

        {/* Mobile Menu Button (Only visible on small screens due to CSS) */}
        <motion.button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', // Hidden by default, shown via CSS query
            background: 'transparent',
            border: 'none',
            color: '#EEFFFF',
            fontSize: '1rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)'
          }}
        >
          [ Menu ]
        </motion.button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '30px'
            }}
            onClick={() => setMenuOpen(false)}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{
                  fontSize: '2rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#82AAFF',
                  textDecoration: 'none'
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-mono)',
                color: '#C3E88D',
                marginTop: '20px',
                border: '1px solid #C3E88D',
                padding: '10px 20px',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              Download Résumé
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-status-bar {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          nav {
            padding: 15px 20px !important;
          }
        }
      `}</style>
    </>
  );
}
