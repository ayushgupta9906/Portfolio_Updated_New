"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/data";

export function ExperienceScroll() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} id="experience" className="relative h-[300vh] bg-neutral-900">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                <div className="absolute top-10 left-10 z-10">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading text-white">
                        Career <span className="text-primary">Timeline</span>
                    </h2>
                    <p className="text-muted-foreground mt-2">Scroll down to explore</p>
                </div>

                {/* Timeline connector line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0" />

                <motion.div style={{ x }} className="flex gap-12 px-24 relative">
                    {experience.map((exp, i) => (
                        <div key={i} className="relative">
                            {/* Card */}
                            <div
                                className="relative h-[400px] w-[500px] flex-shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-105 hover:border-primary/30"
                            >
                                {/* Timeline dot */}
                                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-neutral-900 z-10" />

                                <div>
                                    <span className="text-sm font-mono text-primary mb-2 block">{exp.period}</span>
                                    <h3 className="text-3xl font-bold text-white mb-1">{exp.role}</h3>
                                    <h4 className="text-xl text-gray-400 mb-6">@ {exp.company}</h4>
                                    <ul className="space-y-2">
                                        {Array.isArray(exp.description) && exp.description.map((d, idx) => (
                                            <li key={idx} className="text-gray-300 text-sm">• {d}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-6xl font-bold text-white/5 absolute bottom-4 right-4">
                                    0{i + 1}
                                </div>
                            </div>

                            {/* Connecting line to next card */}
                            {i < experience.length - 1 && (
                                <div className="absolute top-1/2 -right-12 w-12 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
