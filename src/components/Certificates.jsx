import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const Certificates = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [1800, 2600], [0, -100]);
  const y2 = useTransform(scrollY, [1800, 2600], [0, 100]);
  const opacity = useTransform(scrollY, [1800, 2200], [0, 1]);

  const certificates = [
    {
      title: "Smart India Hackathon",
      issuer: "Internal Edition 2024",
      date: "September 2024",
      description: "Achieved Smart India Hackathon 2024 (Internal Edition) recognition for innovation. Collaborated with Firewall Faction team to develop an open-world climbing game, strengthening skills in problem-solving, innovation, and teamwork.",
      skills: ["Problem Solving", "Innovation", "Teamwork", "Game Development"]
    },
    {
      title: "Introduction to Programming",
      issuer: "BITS Pilani via Coursera",
      date: "October 2024",
      description: "Certified in 'Introduction to Programming' by BITS Pilani via Coursera. Built skills in C programming, memory management, and file handling. Practiced solving problems using conditionals, loops, and pointers.",
      skills: ["C Programming", "Memory Management", "File Handling", "Problem Solving"]
    },
    {
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: "Stanford University",
      date: "February 2025",
      description: "Developed machine learning models using Python, NumPy, and scikit-learn. Built and trained supervised models for prediction and classification, implementing linear regression and logistic regression algorithms.",
      skills: ["Machine Learning", "Python", "NumPy", "Scikit-learn", "Linear Regression", "Logistic Regression"]
    }
  ];

  return (
    <section className="certificates" id="certificates">
      <motion.div 
        className="certificates-content"
        style={{ opacity }}
      >
        <motion.h2
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Certificates & Achievements
        </motion.h2>
        
        <motion.div 
          className="certificates-grid"
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="certificate-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="certificate-header">
                <h3>{cert.title}</h3>
                <h4>{cert.issuer}</h4>
                <span className="certificate-date">{cert.date}</span>
              </div>
              
              <p className="certificate-description">{cert.description}</p>
              
              <div className="certificate-skills">
                {cert.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="certificate-skill">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Certificates;
