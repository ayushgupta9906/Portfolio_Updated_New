"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

// Categorize skills
const categories = ["Frontend", "Backend", "Language", "Design", "3D"];

export function Skills() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-5xl font-bold font-heading mb-16 text-center">
                    Technical <span className="text-primary">Arsenal</span>
                </h2>

                <div className="grid gap-12">
                    {categories.map((cat) => {
                        const catSkills = skills.filter(s => s.category === cat);
                        if (catSkills.length === 0) return null;

                        return (
                            <div key={cat}>
                                <h3 className="text-xl font-semibold mb-6 text-muted-foreground border-b border-border pb-2 inline-block">
                                    {cat}
                                </h3>
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                                >
                                    {catSkills.map((skill) => (
                                        <motion.div
                                            key={skill.name}
                                            variants={item}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-lg transition-all hover:border-primary/50 group"
                                        >
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="font-bold text-lg">{skill.name}</span>
                                                <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className="h-full bg-primary rounded-full group-hover:bg-primary/80 transition-colors"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
