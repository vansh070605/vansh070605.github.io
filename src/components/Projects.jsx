import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const Projects = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [800, 1500], [0, -150]);
  const y2 = useTransform(scrollY, [800, 1500], [0, 150]);
  const opacity = useTransform(scrollY, [800, 1200], [0, 1]);

  const projects = [
    {
      title: "Career Path Explorer (CAPE)",
      description: "A comprehensive career recommendation engine that maps student profiles to ranked career suggestions. Features explainable Random Forest ML model, interactive quiz system, and full-stack web application with React frontend and Python backend.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
      tags: ["Python", "React", "Flask", "Machine Learning", "Random Forest"],
      liveUrl: "https://github.com/vansh070605/Career-Path-Explorer",
      githubUrl: "https://github.com/vansh070605/Career-Path-Explorer"
    },
    {
      title: "Employee Dashboard",
      description: "A comprehensive web application for tracking employee work sessions with secure authentication, real-time Kanban board, and admin dashboard. Built with Firebase for backend services and modern web technologies.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      tags: ["JavaScript", "Firebase", "HTML/CSS", "Kanban Board", "Authentication"],
      liveUrl: "https://kanban-employee-dashboard.vercel.app/",
      githubUrl: "https://github.com/vansh070605/EMPLOYEE-DASHBOARD"
    },
    {
      title: "Lung Cancer Detector",
      description: "Machine learning model achieving 96% prediction accuracy using Logistic Regression, Random Forest, and SVM. Preprocessed data by handling missing values and encoding categorical variables to support early lung cancer diagnosis.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
      tags: ["Python", "Scikit-Learn", "Machine Learning", "Data Preprocessing"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Expense Manager App",
      description: "Full-stack expense tracking web application built with Flask backend and HTML, CSS, JavaScript frontend. Features authentication, transaction logging, budget management, and responsive design deployed on Vercel.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      tags: ["Flask", "HTML/CSS/JS", "MySQL", "Vercel"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Multi Gesture Detector",
      description: "Real-time hand gesture recognition system using computer vision and machine learning. Trained CNN and KNN models for accurate gesture classification with optimized detection speed for various conditions.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
      tags: ["Computer Vision", "CNN", "KNN", "OpenCV"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Smart India Hackathon Game",
      description: "Open-world climbing game developed for Smart India Hackathon 2024. Collaborated with Firewall Faction team to create an innovative gaming solution showcasing problem-solving and teamwork skills.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
      tags: ["Game Development", "Team Collaboration", "Innovation", "Problem Solving"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section className="projects" id="projects">
      <motion.div 
        className="projects-content"
        style={{ opacity }}
      >
        <motion.h2
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        
        <motion.div 
          className="project-grid"
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              
              <div className="project-content">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                  className="project-tags"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span 
                      key={tagIndex} 
                      className="project-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 * tagIndex }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="project-links"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.a 
                    href={project.liveUrl} 
                    className="project-link primary"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                  </motion.a>
                  <motion.a 
                    href={project.githubUrl} 
                    className="project-link secondary"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;