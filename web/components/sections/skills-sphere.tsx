"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, LayoutGrid, CheckCircle2 } from "lucide-react";

interface SkillItem {
    name: string;
    level: number;
    category: string;
}

function SkillSphere({ skill, position, isMobile }: { skill: SkillItem; position: [number, number, number]; isMobile: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.25}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <sphereGeometry args={[isMobile ? 1.2 : 1.6, 16, 16]} />
                <meshStandardMaterial
                    color={hovered ? "#c084fc" : "#7c3aed"}
                    emissive="#7c3aed"
                    emissiveIntensity={hovered ? 0.9 : 0.35}
                    roughness={0.25}
                    metalness={0.8}
                />
                <Html center distanceFactor={isMobile ? 22 : 28} style={{ pointerEvents: "none" }}>
                    <div className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg backdrop-blur-md transition-all duration-300 select-none ${
                        hovered 
                            ? "bg-primary text-white scale-110 shadow-[0_0_20px_rgba(168,85,247,0.8)] border border-white/40" 
                            : "bg-black/90 text-gray-200 border border-primary/40 shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                    }`}>
                        <span className="font-mono text-[9px] sm:text-xs font-bold whitespace-nowrap tracking-wider">{skill.name}</span>
                    </div>
                </Html>
            </mesh>
        </Float>
    );
}

function SkillsSphereCloud({ radius = 15, isMobile = false }: { radius?: number; isMobile?: boolean }) {
    const displaySkills = useMemo(() => {
        if (!isMobile) return skills;
        return skills.slice(0, 18);
    }, [isMobile]);

    const positions = useMemo(() => {
        const temp: Array<[number, number, number]> = [];
        const count = displaySkills.length;

        displaySkills.forEach((_, i) => {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            temp.push([x, y, z]);
        });

        return temp;
    }, [displaySkills, radius]);

    return (
        <>
            {displaySkills.map((skill, i) => (
                <SkillSphere
                    key={skill.name}
                    skill={skill}
                    position={positions[i]}
                    isMobile={isMobile}
                />
            ))}
        </>
    );
}

function ResponsiveController({ isMobile }: { isMobile: boolean }) {
    const { camera } = useThree();
    useEffect(() => {
        camera.position.set(0, 0, isMobile ? 31 : 36);
        camera.updateProjectionMatrix();
    }, [isMobile, camera]);
    return null;
}

export function SkillsSphere() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [mobileView, setMobileView] = useState<"3d" | "grid">("3d");
    const [activeCategory, setActiveCategory] = useState<string>("All");

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { rootMargin: "150px" }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            window.removeEventListener("resize", checkMobile);
            observer.disconnect();
        };
    }, []);

    const categories = useMemo(() => {
        return ["All", "Languages", "Frontend", "Backend", "DevOps", "Database"];
    }, []);

    const filteredSkills = useMemo(() => {
        if (activeCategory === "All") return skills;
        return skills.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));
    }, [activeCategory]);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="min-h-screen py-16 md:py-0 md:h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-neutral-950 to-neutral-900 relative overflow-hidden"
        >
            {/* Heading positioned with clear vertical separation */}
            <div className="relative md:absolute top-0 md:top-10 z-20 text-center pointer-events-auto px-4 mb-4 md:mb-0">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">Expertise</span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-heading mb-1 sm:mb-2 text-white">
                    Tech <span className="text-primary">Universe</span>
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base font-mono">
                    {isMobile ? "Interactive 3D galaxy & categorized skill ecosystem" : "Drag to rotate & explore the interactive ecosystem"}
                </p>

                {/* Mobile View Switcher */}
                {isMobile && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="p-1 rounded-xl bg-neutral-900/90 border border-white/15 backdrop-blur-md flex items-center gap-1 shadow-lg">
                            <button
                                onClick={() => setMobileView("3d")}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                                    mobileView === "3d"
                                        ? "bg-primary text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                                        : "text-muted-foreground hover:text-white"
                                }`}
                            >
                                <Globe size={13} />
                                3D Galaxy
                            </button>
                            <button
                                onClick={() => setMobileView("grid")}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                                    mobileView === "grid"
                                        ? "bg-primary text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                                        : "text-muted-foreground hover:text-white"
                                }`}
                            >
                                <LayoutGrid size={13} />
                                Grid View
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Area */}
            {isMobile && mobileView === "grid" ? (
                /* Mobile-optimized Categorized Skills Matrix */
                <div className="w-full max-w-lg px-4 py-4 z-10">
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                                    activeCategory === cat
                                        ? "bg-primary text-white border border-primary font-bold shadow-md shadow-primary/30"
                                        : "bg-white/5 text-muted-foreground border border-white/10 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 gap-2.5 max-h-[52vh] overflow-y-auto pr-1 pb-10">
                        {filteredSkills.map((skill, idx) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: idx * 0.02 }}
                                className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/10 flex flex-col justify-between backdrop-blur-sm"
                            >
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-bold text-white font-mono truncate">{skill.name}</span>
                                    <CheckCircle2 size={12} className="text-primary flex-shrink-0" />
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                                <span className="text-[10px] text-muted-foreground font-mono mt-1 text-right">{skill.level}%</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                /* 3D Sphere View (Desktop always, Mobile when in 3D mode) */
                <div
                    className="w-full h-[65vh] md:h-full relative flex-1 md:flex-initial flex items-center justify-center"
                    style={{ touchAction: "pan-y" }}
                >
                    <Canvas
                        frameloop={isInView ? "always" : "never"}
                        camera={{ position: [0, 0, isMobile ? 31 : 38], fov: 65 }}
                        dpr={isMobile ? [1, 1] : [1, 1.5]}
                        style={{ touchAction: "pan-y" }}
                    >
                        <color attach="background" args={['#000000']} />
                        <ambientLight intensity={0.7} />
                        <pointLight position={[10, 10, 10]} intensity={1.3} />
                        <pointLight position={[-10, -10, -10]} intensity={0.6} />
                        <pointLight position={[0, 10, 0]} intensity={0.9} color="#7c3aed" />

                        <ResponsiveController isMobile={isMobile} />

                        {/* Centered group for both mobile and desktop */}
                        <group position={[0, isMobile ? 0 : -1.5, 0]}>
                            <SkillsSphereCloud radius={isMobile ? 10.5 : 15} isMobile={isMobile} />
                        </group>

                        <OrbitControls
                            target={[0, isMobile ? 0 : -1.5, 0]}
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={1.0}
                            minPolarAngle={Math.PI / 4}
                            maxPolarAngle={Math.PI * 0.75}
                            touches={{
                                ONE: THREE.TOUCH.ROTATE,
                                TWO: THREE.TOUCH.DOLLY_ROTATE
                            }}
                        />

                        <mesh position={[0, isMobile ? 0 : -1.5, 0]}>
                            <sphereGeometry args={[50, 16, 16]} />
                            <meshBasicMaterial color="#000000" side={THREE.BackSide} />
                        </mesh>
                    </Canvas>

                    {/* HUD Elements for Tech Universe */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-8 md:left-20 -translate-y-1/2 flex flex-col gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500 hidden md:flex">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-primary font-mono tracking-widest uppercase opacity-70">Sector Origin</span>
                                <span className="text-white font-mono text-sm tracking-tighter">28.6139° N, 77.2090° E</span>
                            </div>
                            <div className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-primary font-mono tracking-widest uppercase opacity-70">Uplink Status</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                    <span className="text-white font-mono text-sm tracking-tighter">ONLINE</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-1/2 right-8 md:right-20 -translate-y-1/2 flex flex-col gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500 text-right hidden md:flex">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-primary font-mono tracking-widest uppercase opacity-70">Neural Mesh</span>
                                <span className="text-white font-mono text-sm tracking-tighter">VERIFIED</span>
                            </div>
                            <div className="w-12 h-px bg-gradient-to-l from-primary to-transparent ml-auto" />
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-primary font-mono tracking-widest uppercase opacity-70">Tech Cycle</span>
                                <span className="text-white font-mono text-sm tracking-tighter">ACTIVE_01</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
