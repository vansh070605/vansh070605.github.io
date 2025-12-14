import { motion } from "framer-motion";
import { useState } from "react";

const primarySkills = [
  { name: "HTML", info: "Semantic, accessible markup" },
  { name: "CSS", info: "Modern layouts & animations" },
  { name: "JavaScript", info: "Core language for the web" },
  { name: "React", info: "Component-driven UI" },
  { name: "Python", info: "Backend & ML workflows" },
  { name: "Machine Learning", info: "Data-driven models" },
];

const tools = ["Git", "Linux", "MySQL", "Flask"];

export default function Skills() {
  const [active, setActive] = useState(null);
  const [selected, setSelected] = useState(null);

  const renderOrbit = (items) =>
    items.map((item, i) => {
      const angle = (360 / items.length) * i;
      const label = typeof item === "string" ? item : item.name;

      return (
        <div
          key={label}
          className="orbit-item"
          style={{
            transform: `rotate(${angle}deg) translate(var(--orbit-radius))`,
          }}
        >
          <span
            className={`orbit-line ${active === label ? "active" : ""}`}
            style={{ width: "var(--line-length)" }}
          />

          <motion.div
            className={`orbit-node ${active === label ? "active" : ""}`}
            style={{ transform: `rotate(${-angle}deg)` }}
            onHoverStart={() => setActive(label)}
            onHoverEnd={() => setActive(null)}
            onClick={() => setSelected(item)}
            whileHover={{ scale: 1.25 }}
          >
            {label}
          </motion.div>
        </div>
      );
    });

  return (
    <section className="skills" id="skills">
      <p className="section-tag">Stack</p>
      <h2 className="section-title">Skill Neural System</h2>

      <div className="orbit-wrapper">
        {/* Core */}
        <motion.div
          className={`orbit-core ${active ? "active" : ""}`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          CORE
        </motion.div>

        {/* Primary */}
        <motion.div
          className="orbit-ring primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          {renderOrbit(primarySkills)}
        </motion.div>

        {/* Secondary */}
        <motion.div
          className="orbit-ring secondary"
          animate={{ rotate: -360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
        >
          {renderOrbit(tools)}
        </motion.div>
      </div>

      {/* Info panel */}
      {selected?.info && (
        <motion.div
          className="skill-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <strong>{selected.name}</strong>
          <p>{selected.info}</p>
        </motion.div>
      )}
    </section>
  );
}
