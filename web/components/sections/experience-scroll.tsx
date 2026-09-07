"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export function ExperienceScroll() {
    return (
        <section id="experience" className="py-16 md:py-28 bg-neutral-950/60 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-primary/80">Experience</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white mt-1">
                        Career <span className="text-primary">Timeline</span>
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-2 font-mono">
                        Professional milestones & engineering achievements
                    </p>
                </div>

                {/* Natural Vertical Timeline (Zero scroll hijacking, zero empty space) */}
                <div className="relative pl-6 sm:pl-8 md:pl-10 border-l-2 border-primary/30 space-y-8 md:space-y-10">
                    {experience.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="relative"
                        >
                            {/* Glowing Timeline Node */}
                            <div className="absolute -left-[31px] sm:-left-[39px] md:-left-[47px] top-5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary border-4 border-neutral-950 shadow-[0_0_12px_rgba(168,85,247,0.9)]" />

                            {/* Experience Card */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-7 relative overflow-hidden group hover:border-primary/40 hover:bg-white/[0.07] transition-all">
                                {/* Header Row */}
                                <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {exp.period ? (
                                            <span className="text-[10px] sm:text-xs font-mono text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/25 uppercase tracking-wider font-semibold">
                                                {exp.period}
                                            </span>
                                        ) : null}
                                        {exp.location ? (
                                            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                                                • {exp.location}
                                            </span>
                                        ) : null}
                                    </div>
                                    <span className="text-xs font-mono text-white/30 font-bold">0{i + 1}</span>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">{exp.role}</h3>
                                <h4 className="text-sm sm:text-base text-primary/90 font-medium mb-4">@ {exp.company}</h4>

                                <ul className="space-y-2.5">
                                    {Array.isArray(exp.description) && exp.description.map((d, idx) => (
                                        <li key={idx} className="text-gray-300 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
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
        </section>
    );
}
