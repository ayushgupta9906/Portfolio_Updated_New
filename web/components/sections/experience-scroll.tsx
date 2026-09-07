"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/data";

export function ExperienceScroll() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section id="experience" className="bg-neutral-900 relative">
            {/* ========================================================================= */}
            {/* MOBILE LAYOUT (md:hidden): Natural vertical timeline, no scroll-trapping */}
            {/* ========================================================================= */}
            <div className="block md:hidden py-16 px-4 sm:px-6">
                <div className="mb-10 text-center">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">Experience</span>
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-1">
                        Career <span className="text-primary">Timeline</span>
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 font-mono">Professional milestones & achievements</p>
                </div>

                <div className="relative max-w-lg mx-auto pl-6 sm:pl-8 border-l border-primary/30 space-y-8">
                    {experience.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative"
                        >
                            {/* Dot on the timeline */}
                            <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-primary border-4 border-neutral-900 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />

                            {/* Card Content */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-primary/40 transition-colors">
                                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                                    {exp.period ? (
                                        <span className="text-[10px] sm:text-xs font-mono text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 uppercase tracking-wider font-semibold">
                                            {exp.period}
                                        </span>
                                    ) : null}
                                    <span className="text-xs font-mono text-white/20 font-bold">0{i + 1}</span>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">{exp.role}</h3>
                                <h4 className="text-xs sm:text-sm text-primary/80 font-medium mb-3">@ {exp.company}</h4>

                                <ul className="space-y-2">
                                    {Array.isArray(exp.description) && exp.description.map((d, idx) => (
                                        <li key={idx} className="text-gray-300 text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                            <span>{d}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ========================================================================= */}
            {/* DESKTOP LAYOUT (hidden md:block): Sticky 300vh Horizontal Cinematic Scroll */}
            {/* ========================================================================= */}
            <div ref={targetRef} className="hidden md:block relative h-[300vh]">
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
                                    className="relative h-[440px] w-[520px] max-w-[90vw] flex-shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:bg-white/10 transition-all hover:scale-105 hover:border-primary/30 overflow-hidden"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-neutral-900 z-10" />

                                    <div className="flex-1 overflow-hidden">
                                        {exp.period ? (
                                            <span className="text-xs font-mono text-primary mb-2 block uppercase tracking-wider">{exp.period}</span>
                                        ) : null}
                                        <h3 className="text-2xl font-bold text-white mb-1 leading-snug">{exp.role}</h3>
                                        <h4 className="text-lg text-gray-400 mb-4 font-medium">@ {exp.company}</h4>
                                        <ul className="space-y-2.5">
                                            {Array.isArray(exp.description) && exp.description.map((d, idx) => (
                                                <li key={idx} className="text-gray-300 text-xs md:text-sm leading-relaxed flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                                    <span>{d}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="text-6xl font-bold text-white/5 absolute bottom-4 right-4 font-mono">
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
            </div>
        </section>
    );
}
