"use client";

import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { aboutContent } from "@/lib/data";

export function About() {
    return (
        <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-8">
                            <span className="text-primary">/</span> {aboutContent.title}
                        </h2>

                        <div className="space-y-4 text-lg text-muted-foreground/90">
                            {aboutContent.description.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="pt-6">
                            <a
                                href={aboutContent.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
                            >
                                View Resume
                            </a>
                        </div>
                    </motion.div>

                    {/* Image Card */}
                    <div className="flex justify-center md:justify-end perspective-1000">
                        <TiltCard
                            src="/profile_avatar.png" // Using the generated image path (need to handle actual file)
                            alt="Ayush Gupta"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
