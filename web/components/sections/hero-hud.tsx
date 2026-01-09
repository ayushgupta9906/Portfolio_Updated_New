"use client";

import { motion } from "framer-motion";
import { siteConfig, heroRoles } from "@/lib/data";
import { Typewriter } from "@/components/ui/typewriter";

export function HeroHUD() {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10">
            {/* HUD Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50 opacity-20" />

            {/* Content Group */}
            <div className="flex flex-col items-center gap-6 relative z-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-primary/60 font-mono">
                        System Initialization // Active
                    </span>

                    <h1 className="text-7xl md:text-9xl font-bold font-heading tracking-tight leading-none text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {siteConfig.name.split(' ').map((word, i) => (
                            <span key={word} className={i === 1 ? "text-primary" : ""}>
                                {word.toUpperCase()}{i === 0 ? " " : ""}
                            </span>
                        ))}
                    </h1>

                    {/* Floating HUD Elements */}
                    <div className="absolute -inset-x-20 -inset-y-10 border border-white/5 bg-white/5 backdrop-blur-[2px] rounded-full -z-10 animate-pulse-glow" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="h-6 overflow-hidden">
                        <div className="text-lg md:text-xl font-mono text-cyan-400 tracking-[0.3em] uppercase">
                            <Typewriter text={heroRoles} speed={40} className="glitch-text" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.2em] mt-4">
                        <div className="w-8 h-px bg-muted-foreground/30" />
                        <span>Creative Developer & Engineer</span>
                        <div className="w-8 h-px bg-muted-foreground/30" />
                    </div>
                </motion.div>
            </div>

            {/* Corner Brackets with Data Strings */}
            <div className="fixed top-12 left-12 p-2 hidden lg:block">
                <div className="text-[10px] font-mono text-primary/40 flex flex-col gap-1">
                    <span>{`LOCATION: 28.6139° N, 77.2090° E`}</span>
                    <span>{`STATUS: ONLINE`}</span>
                </div>
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
            </div>

            <div className="fixed top-12 right-12 p-2 hidden lg:block text-right">
                <div className="text-[10px] font-mono text-primary/40 flex flex-col gap-1">
                    <span>{`SESSION_EXP: 04:32:00`}</span>
                    <span>{`AUTH_LVL: LVL_7`}</span>
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40" />
            </div>

            <div className="fixed bottom-32 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-px h-12 bg-gradient-to-b from-primary/80 to-transparent" />
            </div>
        </section>
    );
}
