"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/data";

import { ProjectPreview } from "@/components/ui/project-preview";
import { Eye } from "lucide-react";

export function ProjectsCarousel() {
    const [index, setIndex] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const next = () => setIndex((prev) => (prev + 1) % projects.length);
    const prev = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

    return (
        <section id="projects" className="py-20 h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-12 z-10 mix-blend-difference text-white">
                System <span className="text-primary">Creations</span>
            </h2>

            <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center perspective-1000">
                <AnimatePresence mode="popLayout" initial={false} custom={index}>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, rotateY: 90, x: 200 }}
                        animate={{ opacity: 1, rotateY: 0, x: 0 }}
                        exit={{ opacity: 0, rotateY: -90, x: -200 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="absolute w-[80%] md:w-[60%] aspect-video bg-card border border-primary/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.2)] cursor-pointer group"
                        onClick={() => setIsPreviewOpen(true)}
                        whileHover={{ scale: 1.05, rotateX: 5 }}
                    >
                        <div className="relative w-full h-full">
                            {/* Image */}
                            <div className="absolute inset-0 bg-secondary" />
                            <Image
                                src={projects[index].image || "/project_placeholder.png"}
                                alt={projects[index].title}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                            />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="text-3xl font-bold text-white max-w-[80%]">{projects[index].title}</h3>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileHover={{ scale: 1.2 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-primary p-2 rounded-full text-black"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </motion.div>
                                </div>
                                <p className="text-gray-300 mb-4 line-clamp-2">{projects[index].description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {projects[index].tech.map(t => (
                                        <span key={t} className="px-2 py-1 text-xs border border-primary text-primary rounded bg-primary/10">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Instruction */}
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest border border-white/10">
                                Click to Preview
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 p-4 bg-black/50 backdrop-blur rounded-full border border-white/10 hover:bg-primary/20 transition-all z-20">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 p-4 bg-black/50 backdrop-blur rounded-full border border-white/10 hover:bg-primary/20 transition-all z-20">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            <ProjectPreview
                url={projects[index].links.demo || "#"}
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
            />
        </section>
    );
}
