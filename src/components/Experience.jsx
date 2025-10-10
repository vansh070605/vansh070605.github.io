import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const Experience = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [1400, 2200], [0, -100]);
  const y2 = useTransform(scrollY, [1400, 2200], [0, 100]);
  const opacity = useTransform(scrollY, [1400, 1800], [0, 1]);

  const experiences = [
    {
      company: "RCOTBA Industries",
      position: "Web Development Intern",
      duration: "January 2025 - Present",
      location: "Remote",
      description: "Building fully functional websites for clients alongside a collaborative team. Utilizing HTML, CSS, and JavaScript to deliver responsive, high-quality web solutions.",
      achievements: [
        "Developed responsive web applications",
        "Collaborated with cross-functional teams",
        "Delivered high-quality client solutions"
      ]
    },
    {
      company: "Digital Info Solutions",
      position: "Web Development Intern",
      duration: "November 2024 - December 2024",
      location: "Remote",
      description: "Developed dynamic web applications using Flask integrated with HTML, CSS, JavaScript, and MySQL. Contributed to multiple projects as part of a fast-paced development team.",
      achievements: [
        "Built Flask-based web applications",
        "Integrated MySQL databases",
        "Worked in agile development environment"
      ]
    }
  ];

  return (
    <section className="experience" id="experience">
      <motion.div 
        className="experience-content"
        style={{ opacity }}
      >
        <motion.h2
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Work Experience
        </motion.h2>
        
        <motion.div 
          className="experience-timeline"
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div className="experience-card">
                <div className="experience-header">
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <div className="experience-meta">
                    <span className="duration">{exp.duration}</span>
                    <span className="location">{exp.location}</span>
                  </div>
                </div>
                
                <p className="experience-description">{exp.description}</p>
                
                <div className="achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
