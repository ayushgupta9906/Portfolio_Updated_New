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
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice(window.matchMedia("(hover: none)").matches || 'ontouchstart' in window);
    }, []);

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

    
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (projectImages.length > 1) {
            if (diff > 45) {
                setActiveImageIndex((prev) => (prev < projectImages.length - 1 ? prev + 1 : 0));
            } else if (diff < -45) {
                setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : projectImages.length - 1));
            }
        }
        setTouchStartX(null);
    };

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
        <section id="projects" className="py-16 md:py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="text-center mb-10 sm:mb-16">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">Portfolio</span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-heading mb-2 sm:mb-4 text-white">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                        Building solutions that make a difference
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {displayedProjects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            layout
                            className="relative group cursor-pointer h-full"
                            onHoverStart={() => !isTouchDevice && setHoveredIndex(idx)}
                            onHoverEnd={() => !isTouchDevice && setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 3) * 0.1 }}
                            onClick={() => setSelectedProject(project)}
                            animate={{
                                opacity: !isTouchDevice && hoveredIndex !== null && hoveredIndex !== idx ? 0.4 : 1,
                                filter: !isTouchDevice && hoveredIndex !== null && hoveredIndex !== idx ? "blur(2px)" : "blur(0px)",
                            }}
                        >
                            <motion.div
                                className={`relative bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col transition-colors duration-500 ${
                                    !isTouchDevice && hoveredIndex === idx ? "z-50 shadow-[0_0_80px_rgba(124,58,237,0.3)] border-primary" : "hover:border-primary/30"
                                }`}
                                animate={{
                                    scale: !isTouchDevice && hoveredIndex === idx ? 1.05 : 1,
                                    y: !isTouchDevice && hoveredIndex === idx ? -6 : 0
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                            >
                                {/* Project Preview Image */}
                                <div className="h-44 sm:h-56 bg-neutral-900 relative overflow-hidden">
                                    {(project as any).status && (
                                        <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl ${
                                            String((project as any).status).toLowerCase().includes("ongoing") ||
                                            String((project as any).status).toLowerCase().includes("development") ||
                                            String((project as any).status).toLowerCase().includes("beta")
                                                ? "bg-amber-400 text-black font-extrabold shadow-amber-500/30 ring-1 ring-amber-300"
                                                : "bg-emerald-500/90 text-white font-bold"
                                        }`}>
                                            {(project as any).status}
                                        </div>
                                    )}

                                    {project.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900 border-b border-border/50">
                                            <span className="text-muted-foreground/30 font-mono text-xs tracking-widest uppercase">
                                                Visual Interface
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs sm:text-sm font-semibold backdrop-blur-[2px]">
                                        <Maximize2 size={16} /> View Details & Showcase
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                                            {project.tech.slice(0, 4).map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-md bg-secondary/80 text-secondary-foreground border border-border/50"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                            {project.tech.length > 4 && (
                                                <span className="text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded-md bg-secondary/40 text-muted-foreground">
                                                    +{project.tech.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 pt-3 border-t border-border/40" onClick={(e) => e.stopPropagation()}>
                                            {project.links.demo && project.links.demo !== "#" && (
                                                <a
                                                    href={project.links.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-xs text-primary hover:underline font-semibold"
                                                >
                                                    <ExternalLink size={14} /> Live Demo
                                                </a>
                                            )}
                                            {project.links.code && project.links.code !== "#" && (
                                                <a
                                                    href={project.links.code}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold"
                                                >
                                                    <Github size={14} /> Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Show All / Show Less Toggle Button */}
                {projects.length > 6 && (
                    <div className="text-center mt-10 sm:mt-14">
                        <button
                            onClick={() => setShowAll((prev) => !prev)}
                            className="px-6 sm:px-8 py-3 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground text-xs sm:text-sm font-semibold border border-border/80 transition-all hover:scale-105 active:scale-95"
                        >
                            {showAll ? `Show Less (${displayedProjects.length} shown)` : `View All Projects (${projects.length})`}
                        </button>
                    </div>
                )}
            </div>

            {/* ========================================================================= */}
            {/* FULL-SCREEN SHOWCASE MODAL WITH MULTI-IMAGE CAROUSEL                    */}
            {/* ========================================================================= */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 28 }}
                            className="relative w-full max-w-4xl max-h-[88dvh] bg-neutral-900 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-3 right-3 sm:top-5 sm:right-5 z-40 p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-xl"
                                aria-label="Close modal"
                            >
                                <X size={18} />
                            </button>

                            {/* Image Showcase Area */}
                            <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="relative w-full h-[180px] sm:h-[300px] md:h-[460px] bg-neutral-950 flex items-center justify-center overflow-hidden flex-shrink-0 touch-pan-y select-none">
                                {currentDisplayImage ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        key={currentDisplayImage}
                                        src={currentDisplayImage}
                                        alt={`${selectedProject.title} slide ${activeImageIndex + 1}`}
                                        className="w-full h-full object-contain select-none transition-all duration-300"
                                    />
                                ) : (
                                    <div className="text-center p-8">
                                        <p className="text-muted-foreground/50 font-mono text-sm">Visual preview unavailable</p>
                                    </div>
                                )}

                                {/* Status Pill inside modal */}
                                {(selectedProject as any).status && (
                                    <div className={`absolute top-3 left-3 sm:top-5 sm:left-5 z-30 px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full shadow-2xl ${
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
                                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-xl"
                                            aria-label="Previous Image"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>

                                        {/* Right arrow */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveImageIndex((prev) => (prev < projectImages.length - 1 ? prev + 1 : 0));
                                            }}
                                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-xl"
                                            aria-label="Next Image"
                                        >
                                            <ChevronRight size={20} />
                                        </button>

                                        {/* Slide Indicators */}
                                        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-2xl">
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
                                                            ? "w-5 sm:w-6 h-1.5 sm:h-2 bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                                                            : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/80"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Project Details & Action Area */}
                            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex flex-col gap-3 sm:gap-6 flex-1">
                                <div>
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                {/* Tech Stack Chips */}
                                <div>
                                    <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2">
                                        Technologies & Architecture
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {selectedProject.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Modal Actions */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10 sticky bottom-0 bg-neutral-900/95 -mx-4 -mb-4 p-4 sm:static sm:p-0 sm:m-0 sm:bg-transparent backdrop-blur-md z-30">
                                    {selectedProject.links.demo && selectedProject.links.demo !== "#" && (
                                        <a
                                            href={selectedProject.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all"
                                        >
                                            <ExternalLink size={16} />
                                            Visit Live Website
                                        </a>
                                    )}
                                    {selectedProject.links.code && selectedProject.links.code !== "#" && (
                                        <a
                                            href={selectedProject.links.code}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                                        >
                                            <Github size={16} />
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
