"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Globe, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectPreviewProps {
    url: string;
    title: string;
    tech: string[];
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
    currentIndex: number;
    totalProjects: number;
}

export function ProjectPreview({
    url,
    title,
    tech,
    isOpen,
    onClose,
    onNext,
    onPrevious,
    currentIndex,
    totalProjects
}: ProjectPreviewProps) {
    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowRight") {
                onNext();
            } else if (e.key === "ArrowLeft") {
                onPrevious();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, onNext, onPrevious]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full h-full max-w-7xl bg-background border border-primary/20 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Enhanced Header */}
                        <div className="h-14 bg-gradient-to-r from-background via-primary/5 to-background border-b border-border flex items-center px-6 justify-between">
                            <div className="flex gap-2 items-center">
                                <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500 transition-colors" onClick={onClose} />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>

                            {/* Project Info */}
                            <div className="flex-1 flex items-center justify-center gap-4 px-8">
                                <h3 className="font-bold text-lg hidden md:block">{title}</h3>
                                <div className="hidden lg:flex gap-2">
                                    {tech.slice(0, 3).map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground font-mono">
                                    {currentIndex + 1} / {totalProjects}
                                </span>
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                                    title="Open in new tab"
                                >
                                    <Globe className="w-4 h-4 text-muted-foreground" />
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                                    title="Close (Esc)"
                                >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>
                        </div>

                        {/* Iframe Preview */}
                        <div className="flex-1 bg-white relative">
                            <iframe
                                key={url}
                                src={url}
                                className="w-full h-full border-none"
                                title={`${title} Preview`}
                                sandbox="allow-scripts allow-same-origin allow-forms"
                            />
                        </div>

                        {/* Navigation Arrows - Simple */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPrevious();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-lg z-20 active:scale-95"
                            title="Previous"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-lg z-20 active:scale-95"
                            title="Next"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>


                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
