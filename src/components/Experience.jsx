import { motion } from "framer-motion";
import { fadeUp } from "../utils/motion";

const timeline = [
  {
    year: "Jan 2025 - Present",
    title: "RCOTBA Industries",
    desc: "Delivered multiple tech projects ahead of schedule with high quality."
  },
  {
    year: "Mar 2025 - Oct 2025",
    title: "SRMIST ACM SIGAI",
    desc: "Solely hosted and managed a successful AI quiz event on Unstop."
  },
  {
    year: "Apr 2025 - Jun 2025",
    title: "AIML Virtual Intern",
    desc: "Gained hands-on AI/ML experience using AWS."
  },
  {
    year: "Dec 2024 - Jan 2025",
    title: "Intenship Trainee",
    desc: "Built full-stack web applications using Flask."
  },
  {
    year: "Mar 2024 - Aug 2024",
    title: "Tech Team Member",
    desc: "Learned HTML, CSS, and JS by building website & CRUD operations."
  }
];

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <p className="section-tag">Journey</p>
      <h2 className="section-title">Experience</h2>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className={`timeline-card ${i % 2 === 0 ? "left" : "right"}`}
            {...fadeUp}
          >
            <span className="timeline-dot"></span>

            <div className="timeline-content">
              <span className="timeline-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
