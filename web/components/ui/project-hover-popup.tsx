"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

interface ProjectHoverPopupProps {
    isVisible: boolean;
    title: string;
    tech: string[];
    position?: { x: number; y: number };
}

export function ProjectHoverPopup({ isVisible, title, tech, position }: ProjectHoverPopupProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-50 pointer-events-none"
                >
                    <div className="bg-background/95 backdrop-blur-lg border border-primary/30 rounded-lg shadow-2xl p-4 min-w-[280px] max-w-[320px]">
                        {/* Arrow pointing down */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/95 border-r border-b border-primary/30 rotate-45" />
                        
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
                                        className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-md font-medium"
                                    >
                                        {t}
                                    </span>
                                ))}
                                {tech.length > 4 && (
                                    <span className="text-xs px-2 py-0.5 text-muted-foreground">
                                        +{tech.length - 4} more
                                    </span>
                                )}
                            </div>
                            
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
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
