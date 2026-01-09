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

                {/* 3 Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayedProjects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            className="relative group"
                            onHoverStart={() => setHoveredIndex(idx)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 3) * 0.1 }}
                        >
                            <motion.div
                                className={`relative bg-card border-2 border-border rounded-2xl overflow-hidden transition-all duration-300 h-full ${hoveredIndex === idx ? "z-10 shadow-2xl shadow-primary/20" : ""
                                    }`}
                                animate={{
                                    scale: hoveredIndex === idx ? 1.05 : 1,
                                    y: hoveredIndex === idx ? -10 : 0
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Project Preview Image/Gradient */}
                                <div className="h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent relative overflow-hidden">
                                    {project.image && project.image !== "/project_placeholder.png" ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-6xl font-bold text-white/10">
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>
                                        </div>
                                    )}
                                    {/* Hover overlay with preview hint */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="text-center">
                                            <ExternalLink className="w-12 h-12 text-white mb-2 mx-auto" />
                                            <p className="text-white font-semibold">Click to view live</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-6 flex flex-col h-full">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                        {project.tech.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="text-xs px-2 py-1 text-muted-foreground">
                                                +{project.tech.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold text-center flex items-center justify-center gap-2"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ExternalLink size={16} />
                                            Live Demo
                                        </a>
                                        {project.links.code !== "#" && (
                                            <a
                                                href={project.links.code}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="py-2 px-4 bg-secondary border border-border rounded-lg hover:bg-secondary/80 transition-all font-semibold flex items-center justify-center gap-2"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github size={16} />
                                                Code
                                            </a>
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
