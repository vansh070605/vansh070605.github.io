import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import HyperText from "./ui/HyperText";

const experiences = [
    {
        id: 1,
        role: "High School (PCM)",
        company: "A.P.J School NOIDA",
        date: "2021 - 2023",
        desc: "Completed Senior Secondary Education with Physics, Chemistry, and Mathematics core curriculum. Score: 88.4%.",
        tags: ["Physics", "Math", "Calculus"],
        color: "#FFCB6B"
    },
    {
        id: 2,
        role: "B.Tech CSE (AI/ML)",
        company: "SRM IST",
        date: "2023 - 2027",
        desc: "Pursuing Bachelor's in Computer Science specializing in Artificial Intelligence and Machine Learning. Current CGPA: 7.7/10.",
        tags: ["Algorithms", "Data Structures", "AI"],
        color: "#C792EA"
    },
    {
        id: 3,
        role: "Technical Team Member",
        company: "LiftOff",
        date: "Mar 2024 - Aug 2024",
        desc: "Strengthened front-end proficiency and built diverse website clones. Implemented CRUD operations in foundational web applications.",
        tags: ["HTML5", "CSS3", "JavaScript"],
        color: "#89DDFF"
    },
    {
        id: 4,
        role: "Internship Trainee",
        company: "Training Program",
        date: "Dec 2024 - Jan 2025",
        desc: "Built full-stack applications with Flask & SQLite. Integrated RESTful API architecture and developed secure authentication modules.",
        tags: ["Flask", "SQL", "Rest API"],
        color: "#89DDFF"
    },
    {
        id: 5,
        role: "Technical Developer",
        company: "RCOTBA Industries",
        date: "Jan 2025 - Present",
        desc: "Leading technical initiatives, optimizing production code, and collaborating with cross-functional teams to deliver high-quality tech projects.",
        tags: ["React", "Node.js", "System Arch"],
        color: "#C3E88D"
    },
    {
        id: 6,
        role: "Event Coordinator",
        company: "SRMIST ACM SIGAI",
        date: "Mar 2025 - Oct 2025",
        desc: "Orchestrated AI symposiums and knowledge transfer events. Managed logistics and marketing metrics for successful campus events.",
        tags: ["Leadership", "Management", "Public Speaking"],
        color: "#F07178"
    },
    {
        id: 7,
        role: "AIML Virtual Intern",
        company: "Virtual Internship",
        date: "Apr 2025 - Jun 2025",
        desc: "Implemented machine learning models on AWS cloud infrastructure. Solved real-world production problems using computer vision.",
        tags: ["AWS", "Python", "ML"],
        color: "#82AAFF"
    }
];

export default function Experience() {
    return (
        <section id="experience" style={{
            background: 'transparent', // Transparent to show global static
            fontFamily: "'Fira Code', monospace",
            padding: '100px 0',
            position: 'relative'
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 2 }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        color: '#fff',
                        marginBottom: '10px',
                        textShadow: '0 0 20px rgba(255,255,255,0.1)'
                    }}
                >
                    <HyperText text="EXPERIENCE_STACK" />
                </motion.h2>
                <p style={{ color: '#546E7A', letterSpacing: '2px' }}>// SCROLL TO DECRYPT //</p>
            </div>

            <div style={{ padding: '0 5vw' }}>
                {experiences.map((exp, index) => {
                    return (
                        <CardContainer key={index} i={index} data={exp} total={experiences.length} />
                    )
                })}
            </div>

            {/* Spacer for bottom */}
            {/* Spacer for bottom */}
            <div style={{ height: '50px' }} />
        </section>
    );
}

function CardContainer({ i, data, total }) {
    const containerRef = useRef(null);

    // Calculate the scroll range for this specific card
    // We want the card to stick from its calculated top position until it's covered
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'start start']
    });

    // Create a stack effect using geometric progression
    // As the card moves up, it scales down slightly to simulate depth
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - i) * 0.05]);

    // Optional: Add opacity fade if user wants old cards to disappear
    // const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]); 

    return (
        <div ref={containerRef} style={{
            height: '80vh', // Each card consumes viewport height to allow scrolling
            display: 'flex',
            justifyContent: 'center',
            position: 'sticky',
            top: `calc(15vh + ${i * 20}px)`, // Stack them with a slight offset
        }}>
            <Card data={data} index={i} />
        </div>
    )
}

function Card({ data, index }) {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                width: '100%',
                maxWidth: '900px',
                height: '400px',
                background: 'rgba(12, 12, 15, 0.95)',
                border: `1px solid ${data.color}40`,
                borderRadius: '24px',
                padding: '40px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 -10px 40px rgba(0,0,0,0.5)`,
                backdropFilter: 'blur(10px)',
                transformOrigin: 'top center'
            }}
        >
            {/* Top Border Glow */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                background: `linear-gradient(90deg, transparent, ${data.color}, transparent)`,
                opacity: 0.8
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', height: '100%', gap: '40px' }}>

                {/* Left: Visuals */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRight: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ fontSize: '5rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>
                        0{data.id}
                    </div>
                    <div style={{
                        color: data.color,
                        fontSize: '1.2rem',
                        marginTop: '-20px',
                        marginLeft: '10px',
                        textShadow: `0 0 15px ${data.color}40`
                    }}>
                        {data.date}
                    </div>
                </div>

                {/* Right: Content */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '10px', lineHeight: 1.1 }}>
                        {data.role}
                    </h3>
                    <div style={{
                        color: data.color,
                        fontSize: '1.2rem',
                        marginBottom: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <span>@ {data.company}</span>
                        <div style={{ width: '30px', height: '1px', background: data.color, opacity: 0.5 }} />
                    </div>

                    <p style={{ color: '#A6ACCD', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px', maxWidth: '90%' }}>
                        {data.desc}
                    </p>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {data.tags.map((tag, i) => (
                            <span key={i} style={{
                                padding: '8px 16px',
                                background: `linear-gradient(90deg, ${data.color}10, transparent)`,
                                borderLeft: `2px solid ${data.color}`,
                                color: '#fff',
                                fontSize: '0.85rem'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Responsiveness Helper (CSS in JS style) */}
            <style>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                    div[style*="border-right"] {
                        border-right: none !important;
                        border-bottom: 1px solid rgba(255,255,255,0.05);
                        padding-bottom: 20px;
                        flex-direction: row !important;
                        align-items: center;
                        gap: 20px;
                    }
                    div[style*="font-size: 5rem"] {
                        font-size: 3rem !important;
                    }
                    h3 { font-size: 1.8rem !important; }
                    div[style*="height: 400px"] {
                        height: auto !important;
                        min-height: 400px;
                    }
                }
            `}</style>

        </motion.div>
    );
}
