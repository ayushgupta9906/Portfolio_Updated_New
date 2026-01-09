"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";
import { FloatingInitials } from "@/components/3d/floating-initials";
import { Particles } from "@/components/3d/particles";
import { siteConfig, heroRoles } from "@/lib/data";

export function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />

                    <Suspense fallback={null}>
                        <Particles />
                        <FloatingInitials />
                        <Environment preset="city" />
                    </Suspense>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    // Limit rotation to keep initials somewhat facing forward or allow full
                    />
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="z-10 text-center px-4 md:px-6 pointer-events-none select-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                        Welcome to my portfolio
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold font-heading mb-6 tracking-tight">
                        Hi, I'm <span className="text-gradient">{siteConfig.name}</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-3xl font-medium text-muted-foreground mb-8 h-[40px]"
                >
                    <Typewriter text={heroRoles} speed={70} waitTime={2500} />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="max-w-2xl mx-auto text-lg text-muted-foreground/80 mb-10 text-pretty"
                >
                    Engineering solutions for the web and beyond.
                    Transforming ideas into interactive digital experiences.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 z-10 animate-bounce"
            >
                <ChevronDown className="w-8 h-8 text-muted-foreground/50" />
            </motion.div>

            {/* Gradient Overlay for smooth transition to next section */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-0 pointer-events-none" />
        </section>
    );
}
