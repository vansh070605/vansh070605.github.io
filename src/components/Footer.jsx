import { motion } from "framer-motion";
import Magnetic from "./ui/Magnetic";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/vansh070605",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vansh-agrawal-446757250",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: "Instagram",
      url: "https://instagram.com/_vansh__07_",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/Vansh_0706",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      )
    }
  ];

  return (
    <footer style={{
      padding: '60px 20px 30px',
      background: 'rgba(5, 7, 10, 0.8)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(130, 170, 255, 0.1)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top Row: Socials & Call to Action */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px',
          marginBottom: '40px'
        }}>

          <div style={{ display: 'flex', gap: '20px' }}>
            {socialLinks.map((link) => (
              <Magnetic key={link.name}>
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: '#89DDFF' }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    color: '#A6ACCD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              </Magnetic>
            ))}
          </div>

          <div
            onClick={scrollToTop}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#82AAFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem'
            }}
          >
            <span>SCROLL_TO_TOP</span>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(130, 170, 255, 0.1)', marginBottom: '30px' }} />

        {/* Bottom Row: Copyright & Status */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          fontSize: '0.8rem',
          color: '#546E7A',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            © {currentYear} Vansh Agrawal. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', background: '#C3E88D', borderRadius: '50%', boxShadow: '0 0 5px #C3E88D' }}></span>
              SYSTEM: ONLINE
            </span>
            <span>LOC: INDIA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
