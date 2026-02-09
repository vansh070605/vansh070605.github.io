import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
    "INITIALIZING CORTEX v2.4.0...",
    "LOADING KERNEL MODULES... [OK]",
    "MOUNTING VIRTUAL FILE SYSTEM...",
    "BYPASSING SECURITY PROTOCOLS...",
    "OPTIMIZING NEURAL PATHWAYS...",
    "ESTABLISHING SECURE CONNECTION...",
    "DECRYPTING USER INTERFACE...",
    "ACCESS GRANTED."
];

// Matrix-like decoding effect for text
const DecodedText = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState("");
    const [isDecoding, setIsDecoding] = useState(false);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setIsDecoding(true);
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplayText(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) return text[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );
                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 2; // Speed of decoding
            }, 30);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, delay]);

    return <span>{displayText}</span>;
}

export default function Preloader({ onComplete }) {
    const [lines, setLines] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Add lines strictly one by one
        let lineIndex = 0;
        const lineDelay = 200; // Time between lines

        // Initial line
        setLines([bootLines[0]]);

        const textInterval = setInterval(() => {
            lineIndex++;
            if (lineIndex < bootLines.length) {
                setLines(prev => [...prev, bootLines[lineIndex]]);
            } else {
                clearInterval(textInterval);
            }
        }, lineDelay);

        // Progress Bar (slower to match text)
        const progressDuration = bootLines.length * lineDelay + 500;
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onComplete, 800); // Hold at 100% for a moment
                    return 100;
                }
                return prev + (100 / (progressDuration / 20));
            });
        }, 20);

        return () => {
            clearInterval(textInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
                position: "fixed",
                inset: 0,
                background: "#05070a",
                color: "#C3E88D",
                zIndex: 99999,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "'Fira Code', monospace",
                overflow: "hidden"
            }}
        >
            {/* Background Grid */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
          linear-gradient(rgba(195, 232, 141, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(195, 232, 141, 0.03) 1px, transparent 1px)
        `,
                backgroundSize: "40px 40px",
                pointerEvents: "none"
            }} />

            {/* Grid Overlay Vignette */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at center, transparent 0%, #05070a 90%)",
                pointerEvents: "none"
            }} />

            {/* Decorative Corners */}
            <div style={{ position: "absolute", top: 30, left: 30, fontSize: "0.8rem", color: "#546E7A" }}>
                SYSTEM_ID: VA-001<br />
                KERNEL: 5.15.0-ARCH
            </div>
            <div style={{ position: "absolute", top: 30, right: 30, textAlign: "right", fontSize: "0.8rem", color: "#546E7A" }}>
                MEMORY: 64GB OK<br />
                STATUS: SECURE
            </div>
            <div style={{ position: "absolute", bottom: 30, left: 30, fontSize: "0.8rem", color: "#546E7A" }}>
                LAT: 20.5937° N<br />
                LNG: 78.9629° E
            </div>
            <div style={{ position: "absolute", bottom: 30, right: 30, fontSize: "0.8rem", color: "#546E7A", textAlign: "right" }}>
                ENCRYPTION: AES-256<br />
                VERIFIED
            </div>

            <div style={{ width: "100%", maxWidth: "600px", position: "relative", zIndex: 10, padding: "20px" }}>

                {/* Terminal Output */}
                <div style={{
                    marginBottom: "40px",
                    height: "250px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    border: "1px solid rgba(195, 232, 141, 0.1)",
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "20px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    position: "relative"
                }}>
                    {lines.map((line, i) => (
                        <div key={i} style={{ marginBottom: "8px", fontSize: "0.95rem", color: i === lines.length - 1 ? "#EEFFFF" : "#C3E88D" }}>
                            <span style={{ marginRight: "10px", color: "#546E7A" }}>{`00${i + 1}`}</span>
                            <span style={{ marginRight: "10px", color: i === lines.length - 1 ? "#89DDFF" : "#546E7A" }}>{`>>`}</span>
                            <DecodedText text={line} delay={0} />
                        </div>
                    ))}
                </div>

                {/* Segmented Progress Bar */}
                <div style={{
                    width: "100%",
                    height: "6px",
                    background: "rgba(84, 110, 122, 0.1)",
                    display: "flex",
                    gap: "4px"
                }}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: progress >= (i + 1) * 5 ? 1 : 0.1,
                                backgroundColor: progress >= (i + 1) * 5 ? "#C3E88D" : "#546E7A"
                            }}
                            style={{
                                flex: 1,
                                height: "100%",
                                borderRadius: "1px",
                                boxShadow: progress >= (i + 1) * 5 ? "0 0 10px rgba(195, 232, 141, 0.5)" : "none"
                            }}
                        />
                    ))}
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "0.8rem",
                    color: "#89DDFF",
                    textShadow: "0 0 5px rgba(137, 221, 255, 0.5)"
                }}>
                    <span>LOADING_ASSETS...</span>
                    <span>{progress.toFixed(1)}%</span>
                </div>

            </div>
        </motion.div>
    );
}
