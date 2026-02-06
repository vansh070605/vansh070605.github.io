import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024 ||
                ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0);
            setIsMobile(mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateCursorType = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.onclick ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isClickable);
        };

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mouseover', updateCursorType);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mouseover', updateCursorType);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Don't render on mobile
    if (isMobile) {
        return null;
    }

    return (
        <>
            {/* Outer ring */}
            <div
                style={{
                    position: 'fixed',
                    left: position.x,
                    top: position.y,
                    width: isPointer ? '50px' : '35px',
                    height: isPointer ? '50px' : '35px',
                    border: `2px solid ${isPointer ? '#C792EA' : '#82AAFF'}`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
                    mixBlendMode: 'difference',
                    opacity: 0.8
                }}
            />

            {/* Inner dot */}
            <div
                style={{
                    position: 'fixed',
                    left: position.x,
                    top: position.y,
                    width: isPointer ? '10px' : '6px',
                    height: isPointer ? '10px' : '6px',
                    backgroundColor: isPointer ? '#C792EA' : '#82AAFF',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
                    boxShadow: `0 0 15px ${isPointer ? '#C792EA' : '#82AAFF'}`
                }}
            />

            {/* Cursor trail effect */}
            <div
                style={{
                    position: 'fixed',
                    left: position.x,
                    top: position.y,
                    width: isPointer ? '50px' : '35px',
                    height: isPointer ? '50px' : '35px',
                    background: `radial-gradient(circle, ${isPointer ? '#C792EA' : '#82AAFF'}30, transparent 70%)`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.3s ease, height 0.3s ease',
                    opacity: isPointer ? 0.6 : 0.3
                }}
            />

            {/* Hide default cursor */}
            <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
        
        a, button, [role="button"], input[type="submit"], input[type="button"] {
          cursor: none !important;
        }
      `}</style>
        </>
    );
}
