import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [cursorVariant, setCursorVariant] = useState("default");
    const [isMobile, setIsMobile] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [cursorHeight, setCursorHeight] = useState(24);

    // Mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring for movement
    const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024 ||
                ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0);
            setIsMobile(mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;

            // Interactive elements
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.project-card') ||
                target.closest('.hero-cta') ||
                window.getComputedStyle(target).cursor === 'pointer';

            // Text elements
            const computedStyle = window.getComputedStyle(target);
            const isText =
                target.tagName === 'P' ||
                target.tagName === 'SPAN' ||
                target.tagName === 'H1' ||
                target.tagName === 'H2' ||
                target.tagName === 'H3' ||
                target.tagName === 'H4' ||
                target.tagName === 'H5' ||
                target.tagName === 'H6' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.closest('code') ||
                target.closest('pre') ||
                computedStyle.cursor === 'text';

            if (isClickable) {
                setCursorVariant("hover");
            } else if (isText) {
                setCursorVariant("text");
                const fontSize = parseFloat(computedStyle.fontSize);
                const newHeight = Math.min(Math.max(fontSize * 1.2, 16), 80);
                setCursorHeight(newHeight);
            } else {
                setCursorVariant("default");
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    if (isMobile) return null;

    return (
        <motion.div
            style={{
                translateX: cursorX,
                translateY: cursorY,
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 9999
            }}
        >
            {/* Default State: Sleek Arrow (Restored) */}
            <motion.div
                animate={{
                    scale: cursorVariant === "default" ? 1 : 0,
                    opacity: cursorVariant === "default" ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Shadow for visibility */}
                    <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="rgba(0,0,0,0.3)" transform="translate(1,1)" />
                    {/* Main Arrow */}
                    <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#89DDFF" stroke="#C792EA" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            </motion.div>

            {/* Hover State: Expanding Circle + Arrow */}
            <motion.div
                animate={{
                    width: cursorVariant === "hover" ? 48 : 0,
                    height: cursorVariant === "hover" ? 48 : 0,
                    x: -24,
                    y: -24,
                    opacity: cursorVariant === "hover" ? 1 : 0,
                    backgroundColor: "rgba(137, 221, 255, 0.1)",
                    border: "1px solid #89DDFF",
                }}
                transition={{ duration: 0.3, type: "spring" }}
                style={{
                    borderRadius: "50%",
                    position: "absolute",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none'
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="7" y1="17" x2="17" y2="7" stroke="#89DDFF" strokeWidth="2" strokeLinecap="round" />
                    <polyline points="7 7 17 7 17 17" stroke="#89DDFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>

            {/* Text State: Cyber I-Beam */}
            <motion.div
                animate={{
                    scale: cursorVariant === "text" ? 1 : 0.5,
                    opacity: cursorVariant === "text" ? 1 : 0,
                    height: cursorVariant === "text" ? cursorHeight : 10
                }}
                transition={{ duration: 0.2 }}
                style={{
                    position: "absolute",
                    top: -cursorHeight / 2,
                    left: -2,
                    width: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <svg width="4" height={cursorHeight} viewBox={`0 0 4 ${cursorHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height={cursorHeight} rx="2" fill="#C792EA" />
                    <rect y={cursorHeight * 0.1} width="4" height={cursorHeight * 0.8} rx="2" fill="#89DDFF" fillOpacity="0.5" />
                </svg>
            </motion.div>

            {/* Global cursor hide */}
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
            `}</style>
        </motion.div>
    );
}
