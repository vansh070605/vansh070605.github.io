import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const navbarBlur = useTransform(scrollY, [0, 100], [20, 30]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      style={{
        background: `rgba(10, 10, 10, ${navbarOpacity})`,
        backdropFilter: `blur(${navbarBlur}px)`
      }}
    >
      <motion.a 
        href="#hero" 
        className="logo"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        Vansh<span>Agrawal</span>
      </motion.a>
      
      <ul>
        <li>
          <motion.a 
            href="#about"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            About
          </motion.a>
        </li>
        <li>
          <motion.a 
            href="#skills"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            Skills
          </motion.a>
        </li>
        <li>
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            Projects
          </motion.a>
        </li>
        <li>
          <motion.a 
            href="#experience"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            Experience
          </motion.a>
        </li>
        <li>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            Contact
          </motion.a>
        </li>
      </ul>
      
      <button className="menu-toggle">
        ☰
      </button>
    </motion.nav>
  );
};

export default Navbar;
    