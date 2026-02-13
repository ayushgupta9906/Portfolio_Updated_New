"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Direct update for zero lag
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary z-[9999] pointer-events-none mix-blend-difference hidden md:flex items-center justify-center"
            style={{
                x: mouseX,
                y: mouseY,
            }}
        >
            <div className="w-1 h-1 bg-primary rounded-full" />
        </motion.div>
    );
}
