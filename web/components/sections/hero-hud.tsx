"use client";

import { motion } from "framer-motion";
import { siteConfig, heroRoles } from "@/lib/data";
import { Typewriter } from "@/components/ui/typewriter";

export function HeroHUD() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">
            {/* HUD Overlay Lines */}
            <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
            <div className="absolute inset-x-0 bottom-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
            <div className="absolute inset-y-0 left-20 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent opacity-30 hidden md:block" />
            <div className="absolute inset-y-0 right-20 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent opacity-30 hidden md:block" />

            {/* Main Content */}
            <div className="text-center space-y-8 relative z-20 mix-blend-difference">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="relative inline-block"
                >
                    <h1 className="text-6xl md:text-9xl font-bold font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-none">
                        {siteConfig.name.toUpperCase()}
                    </h1>
                    <div className="absolute -inset-1 blur-2xl bg-primary/20 -z-10" />
                </motion.div>

                <div className="h-8 overflow-hidden">
                    <div className="text-xl md:text-2xl font-mono text-primary tracking-widest uppercase">
                        <Typewriter text={heroRoles} speed={40} className="glitch-text" />
                    </div>
                </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-primary opacity-60" />
            <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-primary opacity-60" />
            <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-primary opacity-60" />
            <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-primary opacity-60" />
        </section>
    );
}
