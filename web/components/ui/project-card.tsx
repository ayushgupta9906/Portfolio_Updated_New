"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    tech: string[];
    links: {
        demo?: string;
        code?: string;
    };
    image?: string;
}

export function ProjectCard({ title, description, tech, links, image }: ProjectCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl dark:shadow-primary/5"
        >
            {/* Image Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image || "/project_placeholder.png"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tech.map((t) => (
                        <span
                            key={t}
                            className="text-xs px-2 py-1 bg-secondary rounded-md text-secondary-foreground font-medium"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Links Overlay */}
                <div className="absolute inset-0 bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {links.demo && (
                        <a
                            href={links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform shadow-lg"
                            title="View Demo"
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                    {links.code && (
                        <a
                            href={links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-secondary text-secondary-foreground rounded-full hover:scale-110 transition-transform shadow-lg"
                            title="View Code"
                        >
                            <Github size={20} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
