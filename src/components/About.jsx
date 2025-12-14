import { motion } from "framer-motion";
import { fadeUp } from "../utils/motion";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-grid">
        {/* Left */}
        <div className="about-left">
          <p className="section-tag">About</p>
          <h2 className="section-title">
            Engineering systems
            <br />
            with clarity & intent.
          </h2>
        </div>

        {/* Right */}
        <motion.div
          className="about-right"
          {...fadeUp}
        >
          <p className="about-text">
            I’m an engineering student focused on building reliable,
            efficient software systems across modern web technologies
            and applied machine learning.
          </p>

          <p className="about-text">
            I value clean architecture, thoughtful problem-solving,
            and systems that scale with clarity rather than complexity.
          </p>

          <div className="about-meta">
            <span>📍 Delhi, India</span>
            <span>🎓 B.Tech Engineering</span>
            <span>🚀 Open to Internships</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
