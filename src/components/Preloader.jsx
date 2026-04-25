import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentProgress = 0;
        const updateProgress = () => {
            // Start progressing after the initial code lines are revealed
            currentProgress += Math.random() * 12;
            if (currentProgress >= 100) {
                currentProgress = 100;
                setProgress(100);
                setTimeout(onComplete, 1200); // Hold at 100% so the user sees "System Ready"
            } else {
                setProgress(Math.floor(currentProgress));
                setTimeout(updateProgress, Math.random() * 80 + 20);
            }
        };
        // Delay the start of the progress bar until the code is fully revealed
        setTimeout(updateProgress, 1000); 
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(15px)", scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
                position: "fixed",
                inset: 0,
                background: "#000000", // Exactly matches site's pure black
                zIndex: 99999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "var(--font-mono, monospace)",
                color: "var(--white, #EEFFFF)",
                overflow: "hidden"
            }}
        >
            {/* Subtle Vercel-style Dot Grid Background */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(rgba(137, 221, 255, 0.15) 1.5px, transparent 1.5px)", // Matches site dot opacity
                backgroundSize: "32px 32px",
                backgroundPosition: "center",
                pointerEvents: "none"
            }} />
            
            {/* Glowing Ambient Orb behind the window for depth */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    width: "40vw",
                    height: "40vw",
                    background: "radial-gradient(circle, rgba(199, 146, 234, 0.15) 0%, transparent 70%)",
                    filter: "blur(40px)",
                    zIndex: 0
                }}
            />

            {/* Glassmorphic Code Editor Window */}
            <motion.div 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    background: "rgba(10, 10, 10, 0.65)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(137, 221, 255, 0.15)",
                    borderRadius: "12px",
                    width: "90%",
                    maxWidth: "550px",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(137, 221, 255, 0.03)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 1,
                    overflow: "hidden"
                }}
            >
                {/* macOS Window Controls Header */}
                <div style={{ 
                    display: "flex", 
                    alignItems: "center",
                    padding: "16px 20px",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
                }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56", boxShadow: "0 0 10px rgba(255, 95, 86, 0.5)" }} />
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E", boxShadow: "0 0 10px rgba(255, 189, 46, 0.5)" }} />
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F", boxShadow: "0 0 10px rgba(39, 201, 63, 0.5)" }} />
                    </div>
                    
                    <span style={{ margin: "0 auto", fontSize: "0.8rem", color: "#546E7A", letterSpacing: "1px", transform: "translateX(-18px)" }}>
                        portfolio.js — AIML_Workspace
                    </span>
                </div>

                {/* Code Content */}
                <div style={{ padding: "30px", fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)", lineHeight: "1.8" }}>
                    
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <span style={{ color: "#C792EA" }}>const</span>{" "}
                        <span style={{ color: "#FFCB6B" }}>portfolio</span>{" "}
                        <span style={{ color: "#89DDFF" }}>=</span> {"{"}
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.3 }}
                        style={{ paddingLeft: "24px" }}
                    >
                        <span style={{ color: "#82AAFF" }}>developer</span>:{" "}
                        <span style={{ color: "#C3E88D" }}>"Vansh Agrawal"</span>,
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.5 }}
                        style={{ paddingLeft: "24px" }}
                    >
                        <span style={{ color: "#82AAFF" }}>role</span>:{" "}
                        <span style={{ color: "#C3E88D" }}>"AIML Engineer"</span>,
                    </motion.div>
                    
                    <motion.div 
                         initial={{ opacity: 0, x: -10 }} 
                         animate={{ opacity: 1, x: 0 }} 
                         transition={{ delay: 0.7 }}
                        style={{ paddingLeft: "24px" }}
                    >
                        <span style={{ color: "#82AAFF" }}>status</span>:{" "}
                        <span style={{ color: "#C3E88D" }}>
                            {progress < 100 ? '"Compiling modules..."' : '"System Ready"'}
                        </span>,
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.9 }}
                        style={{ paddingLeft: "24px", display: "flex", alignItems: "center", gap: "10px" }}
                    >
                        <span style={{ color: "#82AAFF" }}>progress</span>:{" "}
                        <span style={{ 
                            color: progress === 100 ? "#C3E88D" : "#F78C6C",
                            textShadow: `0 0 10px ${progress === 100 ? "rgba(195, 232, 141, 0.5)" : "rgba(247, 140, 108, 0.5)"}`
                        }}>
                            {progress}
                        </span>
                        
                        {/* Blinking Cursor */}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            style={{ width: "8px", height: "18px", background: "#89DDFF", display: "inline-block", marginLeft: "4px", position: "relative", top: "2px" }}
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: 1.1 }}
                    >
                        {"};"}
                    </motion.div>
                    
                    {/* Glowing Progress Line */}
                    <div style={{
                        marginTop: "30px",
                        width: "100%",
                        height: "3px",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "2px",
                        overflow: "hidden",
                        position: "relative"
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.2 }}
                            style={{
                                height: "100%",
                                background: "linear-gradient(90deg, #C792EA, #89DDFF)",
                                boxShadow: "0 0 15px rgba(137, 221, 255, 0.8)"
                            }}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
