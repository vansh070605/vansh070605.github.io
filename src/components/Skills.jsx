import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const Skills = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [1000, 1800], [0, -100]);
  const y2 = useTransform(scrollY, [1000, 1800], [0, 100]);
  const opacity = useTransform(scrollY, [1000, 1400], [0, 1]);

  const skills = [
    { name: "Python", level: 90, icon: "🐍", color: "#3776ab" },
    { name: "JavaScript", level: 85, icon: "⚡", color: "#f7df1e" },
    { name: "Java", level: 80, icon: "☕", color: "#ed8b00" },
    { name: "React", level: 88, icon: "⚛️", color: "#61dafb" },
    { name: "Flask", level: 85, icon: "🌶️", color: "#000000" },
    { name: "HTML/CSS", level: 92, icon: "🎨", color: "#e34f26" },
    { name: "Machine Learning", level: 75, icon: "🤖", color: "#ff6b6b" },
    { name: "Git", level: 80, icon: "📚", color: "#f05032" },
    { name: "MySQL", level: 78, icon: "🗄️", color: "#4479a1" },
    { name: "C/C++", level: 70, icon: "⚙️", color: "#00599c" },
    { name: "Pandas", level: 82, icon: "🐼", color: "#150458" },
    { name: "NumPy", level: 80, icon: "🔢", color: "#4dabcf" }
  ];

  return (
    <section className="skills" id="skills">
      <motion.div 
        className="skills-content"
        style={{ opacity }}
      >
        <motion.h2
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </motion.h2>
        
        <motion.p
          className="skills-description"
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Here are the technologies and tools I work with
        </motion.p>
        
        <motion.div 
          className="skills-grid"
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="skill-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="skill-icon" 
                  style={{ color: skill.color }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.icon}
                </motion.div>
                <div className="skill-info">
                  <h3>{skill.name}</h3>
                  <motion.span 
                    className="skill-percentage"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div 
                className="skill-bar-container"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="skill-bar"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 2, delay: 0.5 + 0.1 * index, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
