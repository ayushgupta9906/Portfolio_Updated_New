"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
    date: string;
    title: string;
    subtitle: string;
    description?: string | string[];
    status?: string;
    isLeft?: boolean;
}

function TimelineItem({ date, title, subtitle, description, status, isLeft }: TimelineItemProps) {
    return (
        <div className={cn("flex w-full mb-8 relative", isLeft ? "md:justify-start" : "md:justify-end", "justify-start")}>

            {/* Line Dot: left-aligned on mobile, center-aligned on desktop */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 top-6 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary border-4 border-background z-10 shadow-[0_0_10px_rgba(168,85,247,0.6)]"
            />

            <motion.div
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "w-[calc(100%-2.5rem)] ml-8 sm:w-[calc(100%-3.5rem)] sm:ml-12 md:w-[calc(50%-2rem)] md:ml-0 p-5 sm:p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow relative group",
                    "after:hidden md:after:block after:absolute after:top-6 after:w-4 after:h-4 after:bg-card after:border-t after:border-l after:border-border",
                    isLeft ? "md:mr-8 md:after:-right-2 md:after:rotate-[135deg]" : "md:ml-8 md:after:-left-2 md:after:-rotate-45"
                )}
            >
                <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                    {date}
                </span>
                <h3 className="text-lg sm:text-xl font-bold mb-1 leading-snug">{title}</h3>
                <h4 className="text-sm sm:text-base font-medium text-muted-foreground mb-3">{subtitle}</h4>

                {description && (
                    <div className="text-muted-foreground/80 space-y-1.5 text-xs sm:text-sm">
                        {Array.isArray(description) ? (
                            description.map((d, i) => <p key={i}>• {d}</p>)
                        ) : (
                            <p>{description}</p>
                        )}
                    </div>
                )}

                {status && (
                    <div className="mt-3 text-[11px] font-mono text-primary/80 uppercase tracking-widest font-semibold">
                        {status}
                    </div>
                )}

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
        </div>
    );
}

export function Timeline({ items }: { items: any[] }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Line height expansion
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto py-6 sm:py-10">
            {/* Timeline Line: left-aligned on mobile, center-aligned on desktop */}
            <motion.div
                style={{ scaleY, originY: 0 }}
                className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-primary via-purple-500 to-transparent"
            />

            {items.map((item, index) => (
                <TimelineItem
                    key={index}
                    {...item}
                    isLeft={index % 2 === 0}
                />
            ))}
        </div>
    );
}
