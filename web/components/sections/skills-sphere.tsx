"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";

function SkillSphere({ skill, position }: {
    skill: typeof skills[0],
    position: [number, number, number]
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <sphereGeometry args={[1.6, 16, 16]} />
                <meshStandardMaterial
                    color={hovered ? "#c084fc" : "#7c3aed"}
                    emissive="#7c3aed"
                    emissiveIntensity={hovered ? 0.9 : 0.35}
                    roughness={0.25}
                    metalness={0.8}
                />
                <Html center distanceFactor={28} style={{ pointerEvents: "none" }}>
                    <div className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg backdrop-blur-sm transition-all duration-300 select-none ${
                        hovered 
                            ? "bg-primary text-white scale-110 shadow-[0_0_20px_rgba(168,85,247,0.8)] border border-white/40" 
                            : "bg-black/80 text-gray-200 border border-primary/40 shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                    }`}>
                        <span className="font-mono text-[10px] sm:text-xs font-bold whitespace-nowrap tracking-wider">{skill.name}</span>
                    </div>
                </Html>
            </mesh>
        </Float>
    );
}

function SkillsSphereCloud({ radius = 15, isMobile = false }: { radius?: number; isMobile?: boolean }) {
    // On mobile, render a curated set of prominent skills to eliminate DOM layout thrashing & guarantee 60-120fps
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
                />
            ))}
        </>
    );
}

function ResponsiveController({ isMobile }: { isMobile: boolean }) {
    const { camera } = useThree();
    useEffect(() => {
        camera.position.set(0, 0, isMobile ? 46 : 36);
        camera.updateProjectionMatrix();
    }, [isMobile, camera]);
    return null;
}

export function SkillsSphere() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Performance critical: Only run RAF loop when section is visible on screen!
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

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-neutral-900 relative overflow-hidden"
        >
            {/* Heading positioned with clear vertical separation */}
            <div className="absolute top-6 sm:top-12 z-20 text-center pointer-events-none px-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">Expertise</span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-heading mb-1.5 sm:mb-2 text-white">
                    Tech <span className="text-primary">Universe</span>
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base font-mono">
                    {isMobile ? "Autonomous 3D Skill Galaxy" : "Drag to rotate & explore the interactive ecosystem"}
                </p>
            </div>

            <div
                className="w-full h-full relative"
                style={{ touchAction: "pan-y" }}
            >
                <Canvas
                    frameloop={isInView ? "always" : "never"}
                    camera={{ position: [0, 0, 38], fov: 65 }}
                    dpr={isMobile ? [1, 1] : [1, 1.5]}
                    style={{ touchAction: "pan-y" }}
                >
                    <color attach="background" args={['#000000']} />
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={1.2} />
                    <pointLight position={[-10, -10, -10]} intensity={0.6} />
                    <pointLight position={[0, 10, 0]} intensity={0.8} color="#7c3aed" />

                    <ResponsiveController isMobile={isMobile} />

                    <group position={[0, isMobile ? -2 : -3.5, 0]}>
                        <SkillsSphereCloud radius={isMobile ? 12 : 15} isMobile={isMobile} />
                    </group>

                    <OrbitControls
                        target={[0, isMobile ? -2 : -3.5, 0]}
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.8}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI * 0.75}
                        touches={{
                            ONE: THREE.TOUCH.NONE,
                            TWO: THREE.TOUCH.DOLLY_ROTATE
                        }}
                    />

                    <mesh position={[0, isMobile ? -2 : -3.5, 0]}>
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
        </section>
    );
}
