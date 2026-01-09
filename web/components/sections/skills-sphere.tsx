"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export function SkillsSphere() {
    return (
        <section id="skills" className="py-20 md:py-32 bg-gradient-to-b from-background to-neutral-900 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
                        Tech <span className="text-primary">Universe</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Technologies I work with
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {skills.map((skill, idx) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.03, duration: 0.3 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group relative"
                        >
                            <div className="bg-card border border-border rounded-lg p-4 h-full flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                                <div className="text-2xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                                    {skill.level}
                                </div>
                                <h3 className="text-sm font-semibold text-center group-hover:text-primary transition-colors">
                                    {skill.name}
                                </h3>
                                <span className="text-xs text-muted-foreground">
                                    {skill.category}
                                </span>

                                {/* Progress bar */}
                                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mt-2">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary to-cyan-400"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.03 + 0.2, duration: 0.5 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating background elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-primary/20 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
