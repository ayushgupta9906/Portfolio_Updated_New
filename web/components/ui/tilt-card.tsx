"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MouseEvent } from "react";

export function TiltCard({ src, alt }: { src: string; alt: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    function onMouseMove(event: MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative w-full max-w-sm aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-1 cursor-pointer"
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute inset-4 rounded-lg overflow-hidden shadow-2xl border border-white/10"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Decorative Elements */}
            <motion.div
                style={{ transform: "translateZ(80px)" }}
                className="absolute bottom-10 left-10 right-10 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
            >
                <div className="h-2 w-1/3 bg-primary rounded-full mb-2" />
                <div className="h-2 w-2/3 bg-white/50 rounded-full" />
            </motion.div>
        </motion.div>
    );
}
