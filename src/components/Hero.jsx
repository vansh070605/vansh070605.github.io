import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Advanced parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 500], [0, 300]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
  
  // Mouse parallax with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      
      {/* Enhanced animated background elements */}
      <motion.div
        className="floating-element"
        style={{
          x: useTransform(springX, [-30, 30], [-15, 15]),
          y: useTransform(springY, [-30, 30], [-15, 15]),
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="floating-element-2"
        style={{
          x: useTransform(springX, [-30, 30], [15, -15]),
          y: useTransform(springY, [-30, 30], [15, -15]),
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Additional rotating elements */}
      <motion.div
        className="rotating-element"
        style={{
          x: useTransform(springX, [-30, 30], [10, -10]),
          y: useTransform(springY, [-30, 30], [-10, 10]),
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <motion.h1 
            style={{ y: y1, opacity, scale }} 
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            Hi, I'm <motion.span 
              className="highlight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: "backOut" }}
            >Vansh Agrawal</motion.span>
          </motion.h1>
          
          <motion.p 
            style={{ y: y2 }} 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Digital Designer & Developer
            </motion.span>
          </motion.p>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              I craft beautiful, interactive web experiences that blend creativity with cutting-edge technology. 
              Specializing in modern UI/UX design and seamless digital solutions.
            </motion.span>
          </motion.p>
          
          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
          >
            <motion.a 
              href="#projects" 
              className="btn-primary"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(102, 126, 234, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a 
              href="#contact" 
              className="btn-secondary"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.3 }}
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(255, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        style={{ y: y3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        Scroll to explore
      </motion.div>
    </section>
  );
};

export default Hero;
