"use client";

import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Contact() {
    return (
        <section id="contact" className="py-16 md:py-32 bg-secondary/30 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">Get in touch</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 sm:mb-6 text-white mt-1">
                            Let&apos;s Build <span className="text-primary">Something Great</span>
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                            Looking for a developer to bring your ideas to life? I&apos;m available for freelance projects, consulting, and engineering opportunities.
                            Let&apos;s discuss how we can work together.
                        </p>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="p-2.5 sm:p-3 bg-background rounded-full shadow-sm text-primary flex-shrink-0">
                                    <Mail size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xs sm:text-sm font-semibold text-foreground">Email Me</h4>
                                    <a href={`mailto:${siteConfig.email}`} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all">
                                        {siteConfig.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
                            {siteConfig.socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 sm:p-3 bg-background rounded-full shadow-sm hover:shadow-md hover:bg-primary hover:text-primary-foreground transition-all"
                                    title={social.name}
                                    aria-label={social.name}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="bg-card p-5 sm:p-8 rounded-2xl shadow-lg border border-border"
                    >
                        <form
                            action="https://api.web3forms.com/submit"
                            method="POST"
                            className="space-y-4 sm:space-y-6"
                        >
                            {/* Web3Forms Access Key */}
                            <input type="hidden" name="access_key" value="df794aee-6976-4448-817f-78ea7549b0b4" />
                            <input type="hidden" name="subject" value="New Contact Form Submission from Portfolio" />
                            <input type="hidden" name="from_name" value="Portfolio Contact Form" />

                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-xs sm:text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Your Name"
                                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base md:text-sm rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-xs sm:text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="yourname@example.com"
                                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base md:text-sm rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-xs sm:text-sm font-medium">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="Tell me about your project..."
                                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base md:text-sm rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 sm:py-4 bg-primary text-primary-foreground font-bold text-xs sm:text-sm rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg flex items-center justify-center gap-2 group"
                            >
                                Send Message
                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <p className="text-[11px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 text-center">
                            Your information is secure and will only be used to respond to your inquiry.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
