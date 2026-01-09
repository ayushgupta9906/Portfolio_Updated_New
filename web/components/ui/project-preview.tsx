"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Globe, X } from "lucide-react";

interface ProjectPreviewProps {
    url: string;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectPreview({ url, isOpen, onClose }: ProjectPreviewProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full h-full max-w-6xl bg-background border border-border rounded-xl overflow-hidden shadow-2xl relative flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                        layoutId={`project-${url}`}
                    >
                        {/* Browser Header */}
                        <div className="h-10 bg-muted/50 border-b border-border flex items-center px-4 justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500" onClick={onClose} />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 text-center text-xs text-muted-foreground font-mono truncate px-4">
                                {url}
                            </div>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/10 rounded">
                                <Globe className="w-4 h-4 text-muted-foreground" />
                            </a>
                        </div>

                        {/* Iframe Preview */}
                        <div className="flex-1 bg-white relative">
                            <iframe
                                src={url}
                                className="w-full h-full border-none"
                                title="Project Preview"
                                sandbox="allow-scripts allow-same-origin"
                            />
                            {/* Loading Overlay (optional, relying on connection) */}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
