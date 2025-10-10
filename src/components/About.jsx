import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const About = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [300, 800], [0, 1]);

  const stats = [
    { number: "2+", label: "Years Experience" },
    { number: "4+", label: "Projects Completed" },
    { number: "2", label: "Internships" },
    { number: "96%", label: "ML Accuracy" }
  ];

  return (
    <section className="about" id="about">
      <motion.div 
        className="about-content"
        style={{ y: y1, opacity }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        
        <motion.p 
          className="about-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          I'm a passionate Computer Science student specializing in AI & ML at S.R.M Institute of Science & Technology. 
          With hands-on experience in web development and machine learning, I've built projects achieving 96% accuracy 
          in medical diagnosis and developed full-stack applications. Currently working as a Web Development Intern 
          at RCOTBA Industries, I'm dedicated to creating innovative solutions that bridge technology and real-world problems.
        </motion.p>

        <motion.div 
          className="stats-grid"
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
