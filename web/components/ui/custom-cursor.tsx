"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Ultra-smooth spring physics for fluid movement
    const springConfig = { damping: 24, stiffness: 350, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Only enable custom cursor on fine pointer devices (desktops/laptops with mouse)
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        if (!isFinePointer) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Check if hovering over interactive elements
            const target = e.target as HTMLElement | null;
            if (target) {
                const interactive = target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer, .group");
                setIsHovered(!!interactive);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100000] hidden md:block"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            {/* Outer Follower Ring */}
            <motion.div
                animate={{
                    width: isHovered ? 48 : 28,
                    height: isHovered ? 48 : 28,
                    scale: isClicking ? 0.85 : 1,
                    borderColor: isHovered ? "rgba(6, 182, 212, 0.85)" : "rgba(124, 58, 237, 0.7)",
                    backgroundColor: isHovered ? "rgba(6, 182, 212, 0.12)" : "rgba(124, 58, 237, 0.05)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="rounded-full border flex items-center justify-center backdrop-blur-[1px] shadow-[0_0_15px_rgba(124,58,237,0.25)]"
            >
                {/* Center Core Dot */}
                <motion.div
                    animate={{
                        scale: isHovered ? 1.5 : 1,
                        backgroundColor: isHovered ? "#22d3ee" : "#a855f7",
                    }}
                    transition={{ duration: 0.15 }}
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                />
            </motion.div>
        </motion.div>
    );
}
