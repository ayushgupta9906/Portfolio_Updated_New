"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

interface ProjectHoverPopupProps {
    isVisible: boolean;
    title: string;
    tech: string[];
    position?: { x: number; y: number };
}

export function ProjectHoverPopup({ isVisible, title, tech }: ProjectHoverPopupProps) {
    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-[60] pointer-events-none"
                    style={{ minWidth: '280px', maxWidth: '320px' }}
                >
                    <div className="bg-background/98 backdrop-blur-xl border-2 border-primary/40 rounded-xl shadow-2xl p-4">
                        {/* Arrow pointing down */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/98 border-r-2 border-b-2 border-primary/40 rotate-45" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Eye className="w-4 h-4 text-primary" />
                                </div>
                                <h4 className="font-bold text-sm text-foreground">{title}</h4>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {tech.slice(0, 4).map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-md font-medium"
                                    >
                                        {t}
                                    </span>
                                ))}
                                {tech.length > 4 && (
                                    <span className="text-xs px-2 py-1 text-muted-foreground">
                                        +{tech.length - 4} more
                                    </span>
                                )}
                            </div>

                            <div className="text-xs text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                Click to view full preview
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
