import { motion } from "framer-motion";
import { fadeUp } from "../utils/motion";

const timeline = [
  {
    year: "2025",
    title: "AI & ML Projects",
    desc: "Worked on healthcare-focused ML systems and data-driven models."
  },
  {
    year: "2024",
    title: "Ultron 8.0 Hackathon",
    desc: "Collaborated in a national-level hackathon on rapid prototyping."
  },
  {
    year: "2024",
    title: "MATLAB Image Processing",
    desc: "Completed Image Processing Onramp with hands-on visual analysis."
  },
  {
    year: "2023",
    title: "B.Tech Engineering",
    desc: "Started undergraduate journey with a focus on software systems."
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
