import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const experiences = [
    {
        cmd: "./role --id=1",
        time: "2025-NOW",
        status: "SUCCESS",
        role: "Technical Developer",
        company: "RCOTBA Industries",
        logs: [
            "Delivered multiple tech projects ahead of schedule",
            "Optimized high-quality production code",
            "Collaborated with cross-functional teams"
        ],
        tech: ["React", "Node.js", "FullStack"]
    },
    {
        cmd: "./role --id=2",
        time: "2025-MAR",
        status: "EXECUTED",
        role: "Event Coordinator",
        company: "SRMIST ACM SIGAI",
        logs: [
            "Hosted successful AI quiz event on Unstop",
            "Managed logistics and marketing metrics"
        ],
        tech: ["Management", "PublicSpeaking"]
    },
    {
        cmd: "./role --id=3",
        time: "2025-APR",
        status: "DEPLOYED",
        role: "AIML Virtual Intern",
        company: "Virtual Internship",
        logs: [
            "Implemented ML models on AWS cloud",
            "Solved real-world production problems"
        ],
        tech: ["AWS", "Python", "ML"]
    },
    {
        cmd: "./role --id=4",
        time: "2024-DEC",
        status: "BUILT",
        role: "Internship Trainee",
        company: "Training Program",
        logs: [
            "Built full-stack apps with Flask & SQLite",
            "Integrated RESTful API architecture"
        ],
        tech: ["Python", "Flask", "SQL"]
    },
    {
        cmd: "./education --undergrad",
        time: "2023-2027",
        status: "Loading...",
        role: "B.Tech CSE - AI/ML",
        company: "SRM IST",
        logs: [
            "Specializing in AI/ML",
            "CGPA: 7.7/10"
        ],
        tech: ["Education", "Engineering"]
    },
    {
        cmd: "./education --highschool",
        time: "2021-2023",
        status: "COMPLETED",
        role: "Class XII - CBSE",
        company: "A.P.J School NOIDA",
        logs: [
            "stream: PCM (Physics, Chem, Math)",
            "score: 88.4%"
        ],
        tech: ["Education", "Science"]
    }
];

export default function Experience() {
    return (
        <section
            id="experience"
            style={{
                padding: '100px 5vw',
                minHeight: '100vh',
                background: '#0a0c10',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Fira Code', monospace",
            }}
        >
            <div style={{
                width: '100%',
                maxWidth: '1000px',
                background: '#0C0C0C',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid #333',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Terminal Header */}
                <div style={{
                    background: '#2D2D2D',
                    padding: '10px 15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderBottom: '1px solid #333'
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }}></div>
                    </div>
                    <div style={{ marginLeft: '15px', color: '#9DA5B4', fontSize: '0.8rem' }}>
                        vansh@portfolio: ~/experience
                    </div>
                </div>

                {/* Terminal Body */}
                <div style={{
                    padding: '20px',
                    color: '#A9B7C6',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    height: '70vh',
                    overflowY: 'auto'
                }} className="terminal-body">

                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ color: '#98C379' }}>vansh@portfolio</span>:<span style={{ color: '#61AFEF' }}>~</span>$ ./show-experience --verbose
                    </div>

                    {experiences.map((exp, index) => (
                        <TerminalEntry key={index} data={exp} delay={index * 1.5} />
                    ))}

                    {/* Prompt at the bottom */}
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#98C379' }}>vansh@portfolio</span>:<span style={{ color: '#61AFEF' }}>~</span>$
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            style={{
                                display: 'inline-block',
                                width: '10px',
                                height: '18px',
                                background: '#A9B7C6',
                                marginLeft: '8px'
                            }}
                        />
                    </div>

                </div>
            </div>

            <style>{`
        .terminal-body::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-body::-webkit-scrollbar-track {
          background: #0C0C0C;
        }
        .terminal-body::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
      `}</style>
        </section>
    );
}

const TerminalEntry = ({ data, delay }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Simple intersection observer alternative using framer-motion's viewport
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ marginBottom: '25px', paddingLeft: '10px', borderLeft: '2px solid #333' }}
        >
            {/* Command Line */}
            <div style={{ marginBottom: '5px' }}>
                <span style={{ color: '#5C6370' }}>&gt;</span> <span style={{ color: '#E5C07B' }}>{data.cmd}</span>
            </div>

            {/* Output Block */}
            <div style={{ paddingLeft: '15px' }}>
                {/* Role Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'baseline', marginBottom: '5px' }}>
                    <span style={{ color: '#56B6C2' }}>[{data.time}]</span>
                    <span style={{ color: '#98C379', fontWeight: 'bold' }}>{data.status}</span>
                    <span style={{ color: '#E06C75' }}>"{data.company}"</span>
                </div>

                <div style={{ color: '#61AFEF', marginBottom: '5px' }}>
                    Role: {data.role}
                </div>

                {/* Logs */}
                {data.logs.map((log, i) => (
                    <div key={i} style={{ color: '#ABB2BF', display: 'flex' }}>
                        <span style={{ color: '#5C6370', marginRight: '8px' }}>+</span>
                        {log}
                    </div>
                ))}

                {/* Tech Stack */}
                <div style={{ marginTop: '5px', color: '#C678DD' }}>
                    <span>Dependencies: </span>
                    <span>[{data.tech.join(', ')}]</span>
                </div>
            </div>
        </motion.div>
    );
};
