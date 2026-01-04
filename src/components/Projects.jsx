import { motion } from "framer-motion";

const projects = [
  {
    title: "Career Path Explorer",
    description:
      "A compact, explainable career recommendation engine that maps student profiles (skills, education, interests) to ranked career suggestions.",
    tech: ["Data Analysis", "Scikit-learn", "Machine Learning"],
    link: "https://github.com/vansh070605/Career-Path-Explorer.git",
  },
  {
    title: "Voxera",
    description:
      "Voxera is a real-time WebRTC app for peer-to-peer voice, video, and screen sharing.",
    tech: ["Socket.io", "WebRTC", "NodeJS"],
    link: "https://voxera-rtc.netlify.app/",
  },
  {
    title: "Lung Cancer Predictor",
    description:
      "Lung Cancer Predictor is a modern web application for predicting lung cancer risk based on user symptoms and medical history.",
    tech: ["Flask", "ML", "Database"],
    link: "https://lung-cancer-predictor-idq6.onrender.com/",
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects-header">
        <p className="section-tag">Selected Work</p>
        <h2 className="section-title">Projects</h2>
      </div>

      <div className="projects-grid interactive">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            className="project-card interactive"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
          >
            <span className="project-index">0{index + 1}</span>

            <h3 className="project-title">
              {project.title}
              <span className="title-underline" />
            </h3>

            <p className="project-description">
              {project.description}
            </p>

            <div className="project-tech">
              {project.tech.map((t, i) => (
                <motion.span
                  key={i}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
