"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { Github, ExternalLink, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectsCarousel() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Reset active image index whenever a new project is selected
    useEffect(() => {
        setActiveImageIndex(0);
    }, [selectedProject]);

    // Keyboard controls: Escape to close, Left/Right arrows to cycle images
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedProject(null);
            }
            if (selectedProject) {
                const images: string[] = (selectedProject as any)?.images?.length
                    ? (selectedProject as any).images
                    : selectedProject.image ? [selectedProject.image] : [];
                if (images.length > 1) {
                    if (e.key === "ArrowLeft") {
                        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                    } else if (e.key === "ArrowRight") {
                        setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                    }
                }
            }
        };

        if (selectedProject) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedProject]);

    const displayedProjects = showAll ? projects : projects.slice(0, 6);

    const projectImages: string[] = selectedProject
        ? (selectedProject as any).images?.length
            ? (selectedProject as any).images
            : selectedProject.image && selectedProject.image !== "/project_placeholder.png"
                ? [selectedProject.image]
                : []
        : [];

    const currentDisplayImage = projectImages[activeImageIndex] || selectedProject?.image;

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
                            onClick={() => setSelectedProject(project)}
                            animate={{
                                opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.4 : 1,
                                filter: hoveredIndex !== null && hoveredIndex !== idx ? "blur(2px)" : "blur(0px)",
                            }}
                        >
                            <motion.div
                                className={`relative bg-card border border-border rounded-3xl overflow-hidden h-full flex flex-col transition-colors duration-500 ${
                                    hoveredIndex === idx ? "z-50 shadow-[0_0_80px_rgba(124,58,237,0.3)] border-primary" : "hover:border-primary/30"
                                }`}
                                animate={{
                                    scale: hoveredIndex === idx ? 1.08 : 1,
                                    y: hoveredIndex === idx ? -10 : 0
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                            >
                                {/* Project Preview Image */}
                                <div className="h-56 bg-neutral-900 relative overflow-hidden">
                                    {(project as any).status && (
                                        <div className={`absolute top-4 right-4 z-20 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl ${
                                            String((project as any).status).toLowerCase().includes("ongoing") ||
                                            String((project as any).status).toLowerCase().includes("development") ||
                                            String((project as any).status).toLowerCase().includes("beta")
                                                ? "bg-amber-400 text-black font-extrabold shadow-amber-500/30 ring-1 ring-amber-300"
                                                : "bg-emerald-500/90 text-white font-bold"
                                        }`}>
                                            {(project as any).status}
                                        </div>
                                    )}
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
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="bg-white/95 text-black px-5 py-2.5 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2 shadow-2xl">
                                            <Maximize2 size={16} /> Quick Preview
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
                                            className="py-3 px-4 rounded-2xl transition-all font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (project.links.demo && project.links.demo !== "#") {
                                                    window.open(project.links.demo, "_blank");
                                                }
                                            }}
                                        >
                                            <ExternalLink size={16} />
                                            View
                                        </button>
                                        {project.links.code && project.links.code !== "#" ? (
                                            <button
                                                className="py-3 px-4 border border-border rounded-2xl transition-all font-bold text-sm flex items-center justify-center gap-2 backdrop-blur-sm bg-secondary/80 hover:bg-secondary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(project.links.code, "_blank");
                                                }}
                                            >
                                                <Github size={16} />
                                                Code
                                            </button>
                                        ) : null}
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

            {/* In-Page Big Screen Modal Lightbox */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.93, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.93, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-5xl max-h-[92vh] bg-neutral-950/95 border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_90px_rgba(0,0,0,0.9),0_0_50px_rgba(124,58,237,0.25)] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="p-2.5 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-110 shadow-lg backdrop-blur-md flex items-center gap-1.5 text-xs font-mono"
                                    title="Close (Esc)"
                                >
                                    <X size={18} />
                                    <span className="hidden sm:inline pr-1">ESC</span>
                                </button>
                            </div>

                            {/* Big Screen Image Showcase */}
                            <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] bg-neutral-900 flex items-center justify-center overflow-hidden border-b border-white/10 group select-none">
                                {currentDisplayImage && currentDisplayImage !== "/project_placeholder.png" ? (
                                    <>
                                        <div 
                                            key={`bg-${activeImageIndex}`}
                                            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30 scale-125 pointer-events-none transition-all duration-700"
                                            style={{ backgroundImage: `url(${currentDisplayImage})` }}
                                        />
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={`img-wrap-${activeImageIndex}`}
                                                drag={projectImages.length > 1 ? "x" : false}
                                                dragConstraints={{ left: 0, right: 0 }}
                                                dragElastic={0.2}
                                                onDragEnd={(_, { offset, velocity }) => {
                                                    if (projectImages.length <= 1) return;
                                                    if (offset.x < -40 || velocity.x < -200) {
                                                        setActiveImageIndex((prev) => (prev < projectImages.length - 1 ? prev + 1 : 0));
                                                    } else if (offset.x > 40 || velocity.x > 200) {
                                                        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : projectImages.length - 1));
                                                    }
                                                }}
                                                className={`relative z-10 w-full h-full flex items-center justify-center ${
                                                    projectImages.length > 1 ? "cursor-grab active:cursor-grabbing" : ""
                                                }`}
                                            >
                                                <motion.img
                                                    src={currentDisplayImage}
                                                    alt={`${selectedProject.title} screenshot ${activeImageIndex + 1}`}
                                                    initial={{ opacity: 0, scale: 0.97 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.97 }}
                                                    transition={{ duration: 0.25 }}
                                                    draggable={false}
                                                    className="w-full h-full object-contain max-h-full drop-shadow-2xl select-none pointer-events-none"
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <div className="text-8xl font-black text-white/5 uppercase tracking-tighter">
                                        {selectedProject.title.split(' ')[0]}
                                    </div>
                                )}

                                {/* Status Badge */}
                                {(selectedProject as any).status && (
                                    <div className={`absolute top-4 left-4 z-20 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest rounded-full shadow-2xl backdrop-blur-md ${
                                        String((selectedProject as any).status).toLowerCase().includes("ongoing") ||
                                        String((selectedProject as any).status).toLowerCase().includes("development") ||
                                        String((selectedProject as any).status).toLowerCase().includes("beta")
                                            ? "bg-amber-400 text-black font-extrabold shadow-amber-500/40 ring-2 ring-amber-300"
                                            : "bg-emerald-500/90 text-white font-bold"
                                    }`}>
                                        {(selectedProject as any).status}
                                    </div>
                                )}

                                {/* Multi-Image Navigation Controls */}
                                {projectImages.length > 1 && (
                                    <>
                                        {/* Left arrow */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : projectImages.length - 1));
                                            }}
                                            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-xl"
                                            aria-label="Previous Image"
                                        >
                                            <ChevronLeft size={22} />
                                        </button>

                                        {/* Right arrow */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveImageIndex((prev) => (prev < projectImages.length - 1 ? prev + 1 : 0));
                                            }}
                                            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-xl"
                                            aria-label="Next Image"
                                        >
                                            <ChevronRight size={22} />
                                        </button>

                                        {/* Minimal Slide Indicators at Bottom - NO wording (only sliding dots) */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-2xl">
                                            {projectImages.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveImageIndex(i);
                                                    }}
                                                    aria-label={`Slide ${i + 1}`}
                                                    className={`transition-all duration-300 rounded-full ${
                                                        activeImageIndex === i
                                                            ? "w-6 h-2 bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                                                            : "w-2 h-2 bg-white/40 hover:bg-white/80"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Project Details & Action Area */}
                            <div className="p-6 md:p-8 overflow-y-auto flex flex-col gap-6 max-h-[45vh]">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                {/* Tech Stack Chips */}
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2.5">
                                        Technologies & Architecture
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Modal Actions */}
                                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                                    {selectedProject.links.demo && selectedProject.links.demo !== "#" && (
                                        <a
                                            href={selectedProject.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all"
                                        >
                                            <ExternalLink size={18} />
                                            Visit Live Website
                                        </a>
                                    )}
                                    {selectedProject.links.code && selectedProject.links.code !== "#" && (
                                        <a
                                            href={selectedProject.links.code}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all"
                                        >
                                            <Github size={18} />
                                            View Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
