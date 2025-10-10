import { motion } from "framer-motion";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="mailto:vansh070605@gmail.com">Email</a>
          <a href="https://linkedin.com/in/vanshagrawal" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/vanshagrawal" target="_blank" rel="noopener noreferrer">GitHub</a>
        </motion.div>
        
        <motion.p 
          className="footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Vansh Agrawal. All Rights Reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
