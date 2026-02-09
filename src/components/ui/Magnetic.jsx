import { motion, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function Magnetic({ children, strength = 30 }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * 0.5, y: middleY * 0.5 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    // Smooth spring animation
    const springX = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

    return (
        <motion.div
            style={{ x: springX, y: springY }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
