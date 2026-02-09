import { motion } from "framer-motion";
import { useState } from "react";
import HyperText from "./ui/HyperText";

const skillsByCategory = {
  "AI/ML": [
    { name: "Python", level: 95 },
    { name: "TensorFlow", level: 88 },
    { name: "PyTorch", level: 85 },
    { name: "Scikit-learn", level: 90 },
    { name: "NumPy", level: 92 },
    { name: "Pandas", level: 90 }
  ],
  "Web Dev": [
    { name: "React", level: 92 },
    { name: "JavaScript", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Flask", level: 88 },
    { name: "HTML/CSS", level: 95 }
  ],
  "Tools": [
    { name: "Git", level: 90 },
    { name: "Linux", level: 85 },
    { name: "Docker", level: 82 },
    { name: "MySQL", level: 88 }
  ]
};

const categoryColors = {
  "AI/ML": "#C792EA",
  "Web Dev": "#82AAFF",
  "Tools": "#C3E88D"
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get skills to display based on selected category
  const getDisplaySkills = () => {
    if (selectedCategory === "All") {
      return Object.entries(skillsByCategory).flatMap(([cat, skills]) =>
        skills.slice(0, 5).map(s => ({ ...s, category: cat }))
      );
    }
    return skillsByCategory[selectedCategory].map(s => ({ ...s, category: selectedCategory }));
  };

  const displaySkills = getDisplaySkills();
  const numSkills = displaySkills.length;

  // Calculate polygon points for radar chart
  const calculatePoints = (levels) => {
    const centerX = 200;
    const centerY = 200;
    const maxRadius = 150;

    return levels.map((level, i) => {
      const angle = (Math.PI * 2 * i) / numSkills - Math.PI / 2;
      const radius = (level / 100) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Calculate label positions
  const getLabelPosition = (index) => {
    const centerX = 200;
    const centerY = 200;
    const labelRadius = 170;
    const angle = (Math.PI * 2 * index) / numSkills - Math.PI / 2;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    return { x, y, angle };
  };

  return (
    <section className="skills" id="skills" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 20px' }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <p className="comment" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
          // Technical skills and proficiency
        </p>
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          color: '#EEFFFF'
        }}>
          <span className="keyword">const</span> <span className="function"><HyperText text="skillRadar" /></span> = <span className="operator">{'{'}</span>
        </h2>
      </motion.div>

      {/* Category Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}
        className="skills-filters"
      >
        {["All", "AI/ML", "Web Dev", "Tools"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              padding: '10px 24px',
              background: selectedCategory === category
                ? (category === "All" ? 'rgba(130, 170, 255, 0.2)' : `${categoryColors[category]}20`)
                : 'transparent',
              border: selectedCategory === category
                ? (category === "All" ? '1px solid #82AAFF' : `1px solid ${categoryColors[category]}`)
                : '1px solid rgba(130, 170, 255, 0.3)',
              borderRadius: '8px',
              color: selectedCategory === category
                ? (category === "All" ? '#82AAFF' : categoryColors[category])
                : '#EEFFFF',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: selectedCategory === category ? 600 : 400
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.background = 'rgba(130, 170, 255, 0.05)';
                e.currentTarget.style.borderColor = '#82AAFF';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(130, 170, 255, 0.3)';
              }
            }}
          >
            {category === "All" ? "📊 All Skills" : `${category}`}
          </button>
        ))}
      </motion.div>

      {/* Radar Chart Container */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '100%',
          margin: '0 auto',
          width: '100%',
          padding: '0 20px'
        }}
        className="skills-radar"
      >
        {/* SVG Radar Chart */}
        <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'block' }}>
          {/* Grid circles */}
          {[20, 40, 60, 80, 100].map((percent) => (
            <circle
              key={percent}
              cx="200"
              cy="200"
              r={(percent / 100) * 150}
              fill="none"
              stroke="rgba(130, 170, 255, 0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Grid lines from center */}
          {displaySkills.map((_, i) => {
            const angle = (Math.PI * 2 * i) / numSkills - Math.PI / 2;
            const x = 200 + 150 * Math.cos(angle);
            const y = 200 + 150 * Math.sin(angle);
            return (
              <line
                key={i}
                x1="200"
                y1="200"
                x2={x}
                y2={y}
                stroke="rgba(130, 170, 255, 0.15)"
                strokeWidth="1"
              />
            );
          })}

          {/* Skill polygon - animated */}
          <motion.polygon
            points={calculatePoints(displaySkills.map(s => s.level))}
            fill={selectedCategory === "All" ? "rgba(130, 170, 255, 0.15)" : `${categoryColors[selectedCategory]}20`}
            stroke={selectedCategory === "All" ? "#82AAFF" : categoryColors[selectedCategory]}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Skill points */}
          {displaySkills.map((skill, i) => {
            const angle = (Math.PI * 2 * i) / numSkills - Math.PI / 2;
            const radius = (skill.level / 100) * 150;
            const x = 200 + radius * Math.cos(angle);
            const y = 200 + radius * Math.sin(angle);
            const color = selectedCategory === "All" ? categoryColors[skill.category] : categoryColors[selectedCategory];

            return (
              <motion.g key={i}>
                {/* Glow effect */}
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill={`${color}30`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
                {/* Point */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill={color}
                  stroke="#000"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.5 }}
                  style={{ cursor: 'pointer' }}
                />
              </motion.g>
            );
          })}

          {/* Skill labels */}
          {displaySkills.map((skill, i) => {
            const pos = getLabelPosition(i);
            const color = selectedCategory === "All" ? categoryColors[skill.category] : categoryColors[selectedCategory];

            return (
              <motion.text
                key={i}
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                fill={color}
                fontSize="12"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
              >
                {skill.name}
              </motion.text>
            );
          })}

          {/* Center percentage labels */}
          <text x="200" y="55" textAnchor="middle" fill="#707A8A" fontSize="9" fontFamily="var(--font-mono)">100%</text>
          <text x="200" y="85" textAnchor="middle" fill="#707A8A" fontSize="9" fontFamily="var(--font-mono)">80%</text>
          <text x="200" y="115" textAnchor="middle" fill="#707A8A" fontSize="9" fontFamily="var(--font-mono)">60%</text>
          <text x="200" y="145" textAnchor="middle" fill="#707A8A" fontSize="9" fontFamily="var(--font-mono)">40%</text>
          <text x="200" y="175" textAnchor="middle" fill="#707A8A" fontSize="9" fontFamily="var(--font-mono)">20%</text>
        </svg>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            marginTop: '40px',
            flexWrap: 'wrap'
          }}
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <div
              key={category}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#EEFFFF',
                opacity: selectedCategory === "All" || selectedCategory === category ? 1 : 0.4,
                transition: 'opacity 0.3s ease'
              }}
            >
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 8px ${color}60`
              }} />
              {category}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Closing brace */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: true }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: '#82AAFF',
          marginTop: '60px',
          textAlign: 'center'
        }}
      >
        <span className="operator">{'}'}</span>
      </motion.p>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 968px) {
          .skills-filters button {
            font-size: 0.8rem !important;
            padding: 8px 16px !important;
          }
          
          .skills-radar {
            padding: 0 10px !important;
          }
          
          .skills-radar svg {
            max-width: 100% !important;
          }
        }
        
        @media (max-width: 480px) {
          .skills-filters {
            gap: 10px !important;
          }
          
          .skills-filters button {
            font-size: 0.75rem !important;
            padding: 6px 12px !important;
            flex: 1 1 calc(50% - 5px);
            min-width: 120px;
          }
          
          .skills-radar {
            padding: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
