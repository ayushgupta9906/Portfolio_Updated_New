"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Heart, Code, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-background to-neutral-900 border-t border-border py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                {/* Top Section - Cool Animated Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
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
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-2">
                                <stat.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                {/* Middle Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold mb-3 text-foreground">Ayush Gupta</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Software Engineer crafting elegant solutions through clean code and innovative design.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-3 text-foreground">Quick Links</h3>
                        <ul className="space-y-2">
                            {["About", "Experience", "Projects", "Education", "Contact"].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-bold mb-3 text-foreground">Connect</h3>
                        <div className="flex gap-3">
                            {siteConfig.socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-background border border-border rounded-lg hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
                                    title={social.name}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="text-center pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} Ayush Gupta. Built with{" "}
                        <span className="text-primary">Next.js</span>,{" "}
                        <span className="text-primary">TypeScript</span>, and{" "}
                        <Heart className="inline-block w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                        Designed & Developed with passion for creating exceptional digital experiences.
                    </p>
                </div>
            </div>
        </footer>
    );
}
