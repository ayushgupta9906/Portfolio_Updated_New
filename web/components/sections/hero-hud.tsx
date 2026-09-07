"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig, heroRoles } from "@/lib/data";
import { Typewriter } from "@/components/ui/typewriter";
import { FrameAnimation } from "@/components/ui/frame-animation";
import { useRef, useState, useEffect } from "react";

interface HeroHUDProps {
    frames: string[];
}

export function HeroHUD({ frames }: HeroHUDProps) {
    const containerRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Accelerated frame playback on desktop: plays full animation briskly across initial scroll travel
    const frameIndex = useTransform(scrollYProgress, [0, 0.55], [0, frames.length - 1], { clamp: true });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.95]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[85dvh] md:h-[160vh] w-full"
        >
            <div className="relative md:sticky md:top-0 min-h-[85dvh] md:h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-10 md:py-0">
                {/* Background Animation */}
                <div className="absolute inset-0 z-0 opacity-30 md:opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)]">
                    <FrameAnimation
                        frames={frames}
                        currentFrame={isMobile ? undefined : frameIndex}
                        autoPlay={isMobile}
                        loop={isMobile}
                        fps={isMobile ? 18 : 30}
                    />
                </div>

                {/* HUD Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50 opacity-15 md:opacity-20" />

                {/* Content Group with smooth fade on scroll on desktop */}
                <motion.div 
                    style={isMobile ? undefined : { opacity: heroOpacity, scale: heroScale }}
                    className="flex flex-col items-center gap-4 sm:gap-6 relative z-20 pointer-events-auto max-w-full"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative text-center max-w-full"
                    >
                        <span className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.4em] uppercase text-primary/70 font-mono whitespace-nowrap">
                            System Initialization // Active
                        </span>

                        <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-heading tracking-tight leading-none text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] select-none">
                            {siteConfig.name.split(' ').map((word, i) => (
                                <span key={word} className={i === 1 ? "text-primary inline-block" : "inline-block"}>
                                    {word.toUpperCase()}{i === 0 ? "\u00A0" : ""}
                                </span>
                            ))}
                        </h1>

                        {/* Floating HUD Elements */}
                        <div className="absolute -inset-x-4 sm:-inset-x-10 md:-inset-x-20 -inset-y-4 sm:-inset-y-10 border border-white/5 bg-white/5 backdrop-blur-sm rounded-3xl sm:rounded-full -z-10 animate-pulse-glow pointer-events-none" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex flex-col items-center gap-3 sm:gap-4 max-w-full"
                    >
                        <div className="h-6 overflow-hidden flex items-center justify-center">
                            <div className="text-xs sm:text-base md:text-xl font-mono text-cyan-400 tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase text-center">
                                <Typewriter text={heroRoles} speed={40} className="glitch-text" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-2 sm:mt-4 text-center">
                            <div className="w-4 sm:w-8 h-px bg-muted-foreground/30" />
                            <span>Creative Developer & Engineer</span>
                            <div className="w-4 sm:w-8 h-px bg-muted-foreground/30" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Corner Brackets with Data Strings - Hidden on mobile, visible on lg */}
                <div className="absolute top-12 left-12 p-2 hidden lg:block pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
                </div>

                <div className="absolute top-12 right-12 p-2 hidden lg:block text-right pointer-events-none">
                    <div className="text-[10px] font-mono text-primary/40 flex flex-col gap-1">
                        <span>{`SESSION_EXP: 04:32:00`}</span>
                        <span>{`AUTH_LVL: LVL_7`}</span>
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40" />
                </div>

                <div className="absolute bottom-20 sm:bottom-12 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none flex flex-col items-center gap-2">
                    <span className="text-[9px] sm:text-[10px] font-mono text-primary/60 tracking-widest uppercase">Scroll</span>
                    <div className="w-px h-6 sm:h-10 bg-gradient-to-b from-primary/80 to-transparent" />
                </div>
            </div>
        </section>
    );
}
