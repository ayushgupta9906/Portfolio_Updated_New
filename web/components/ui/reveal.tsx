"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Reveal({ children, width = "fit-content" }: { children: React.ReactNode; width?: "fit-content" | "100%" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-75px" });

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75, filter: "blur(10px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {children}

                {/* Glitch Overlay Effect on Reveal */}
                <motion.div
                    className="absolute inset-0 bg-primary/20 z-20 pointer-events-none"
                    variants={{
                        hidden: { left: 0 },
                        visible: { left: "100%" }
                    }}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ duration: 0.5, ease: "circIn" }}
                />
            </motion.div>
        </div>
    );
}
