"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { Github, ExternalLink } from "lucide-react";

export function ProjectsCarousel() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    const displayedProjects = showAll ? projects : projects.slice(0, 6);

    return (
        <section id="projects" className="py-20 md:py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Building solutions that make a difference
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProjects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            layout
                            className="relative group cursor-pointer h-full"
                            onHoverStart={() => setHoveredIndex(idx)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 3) * 0.1 }}
                            onClick={() => window.open(project.links.demo, "_blank")}
                        >
                            <motion.div
                                className={`relative bg-card border border-border rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col ${hoveredIndex === idx ? "z-10 shadow-[0_0_40px_rgba(124,58,237,0.2)] border-primary/50" : "hover:border-primary/30"
                                    }`}
                                animate={{
                                    scale: hoveredIndex === idx ? 1.02 : 1,
                                    y: hoveredIndex === idx ? -8 : 0
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {/* Project Preview Image */}
                                <div className="h-56 bg-neutral-900 relative overflow-hidden">
                                    {project.image && project.image !== "/project_placeholder.png" ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
                                            <div className="text-6xl font-bold text-white/5 uppercase tracking-tighter">
                                                {project.title.split(' ')[0]}
                                            </div>
                                        </div>
                                    )}

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="bg-white text-black px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
                                            View Project <ExternalLink size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-secondary/50 border border-border text-muted-foreground rounded-md font-mono"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-4 mt-auto">
                                        <button
                                            className="py-3 px-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(project.links.demo, "_blank");
                                            }}
                                        >
                                            <ExternalLink size={16} />
                                            View
                                        </button>
                                        {project.links.code !== "#" && (
                                            <button
                                                className="py-3 px-4 bg-secondary/80 border border-border rounded-2xl hover:bg-secondary transition-all font-bold text-sm flex items-center justify-center gap-2 backdrop-blur-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(project.links.code, "_blank");
                                                }}
                                            >
                                                <Github size={16} />
                                                Code
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Projects Button */}
                {!showAll && projects.length > 6 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAll(true)}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold shadow-lg hover:shadow-xl group"
                        >
                            View All {projects.length} Projects
                            <svg
                                className="w-5 h-5 transition-transform group-hover:translate-y-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
