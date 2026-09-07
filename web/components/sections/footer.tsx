"use client";

import { motion } from "framer-motion";
import { Github, Heart, Code, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-background to-neutral-950 border-t border-border pt-12 pb-28 sm:pb-32">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                {/* Top Section - Animated Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {[
                        { icon: Code, label: "Projects Built", value: "20+" },
                        { icon: Sparkles, label: "Technologies", value: "40+" },
                        { icon: Heart, label: "Coffee Consumed", value: "∞" },
                        { icon: Github, label: "Open Source", value: "15+" }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="text-center group"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-2">
                                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            </div>
                            <div className="text-xl sm:text-2xl font-bold text-foreground font-heading">{stat.value}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                {/* Middle Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-foreground font-heading">Ayush Gupta</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Software Engineer crafting scalable enterprise applications, modern web experiences, and AI-driven solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-foreground font-heading">Quick Links</h3>
                        <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                            {["About", "Skills", "Experience", "Projects", "Education", "Contact"].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-muted-foreground hover:text-primary transition-colors font-mono"
                                    >
                                        /{link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-foreground font-heading">Connect</h3>
                        <div className="flex flex-wrap gap-2.5 sm:gap-3">
                            {siteConfig.socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-background border border-border rounded-lg hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
                                    title={social.name}
                                    aria-label={social.name}
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="text-center pt-6 sm:pt-8 border-t border-border/60">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        © {currentYear} Ayush Gupta. Built with{" "}
                        <span className="text-primary font-semibold">Next.js</span>,{" "}
                        <span className="text-primary font-semibold">TypeScript</span>, and{" "}
                        <Heart className="inline-block w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground/70 mt-1.5 font-mono">
                        Designed & Developed for performance and exceptional digital experiences.
                    </p>
                </div>
            </div>
        </footer>
    );
}
