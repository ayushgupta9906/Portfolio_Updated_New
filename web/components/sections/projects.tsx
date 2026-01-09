"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters = ["All", "Web", "App", "AI/ML", "Design"];

export function Projects() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProjects = projects.filter(project => {
        if (activeFilter === "All") return true;
        // Simple heuristic for demo: check if tech stack or description contains the filter keyword
        // In real app, projects should have a 'category' field.
        // Adapting to existing data structure:
        const searchString = (project.title + project.description + project.tech.join(" ")).toLowerCase();

        if (activeFilter === "Web") return searchString.includes("react") || searchString.includes("web") || searchString.includes("next");
        if (activeFilter === "App") return searchString.includes("app") || searchString.includes("mobile");
        if (activeFilter === "AI/ML") return searchString.includes("python") || searchString.includes("pandas") || searchString.includes("ai");
        if (activeFilter === "Design") return searchString.includes("figma") || searchString.includes("ui/ux");

        return true;
    });

    return (
        <section id="projects" className="py-20 md:py-32 bg-background relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
                        Featured <span className="text-primary">Projects</span>
                    </h2>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all relative",
                                    activeFilter === filter
                                        ? "text-primary-foreground"
                                        : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                {activeFilter === filter && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-primary rounded-full -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.title}
                                {...project}
                                image="/project_placeholder.png" // Using placeholder for all as requested
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
