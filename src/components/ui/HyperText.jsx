import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

export default function HyperText({ text, className }) {
    const [displayText, setDisplayText] = useState(text);
    const [trigger, setTrigger] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        let interval = null;
        let iteration = 0;

        if (isInView || trigger > 0) {
            interval = setInterval(() => {
                setDisplayText((prev) =>
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return alphabets[Math.floor(Math.random() * 26)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        }

        return () => clearInterval(interval);
    }, [text, isInView, trigger]);

    return (
        <motion.span
            ref={ref}
            className={className}
            onMouseEnter={() => setTrigger((prev) => prev + 1)}
            style={{ display: "inline-block", cursor: "default" }}
        >
            {displayText}
        </motion.span>
    );
}
