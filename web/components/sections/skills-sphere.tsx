"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <sphereGeometry args={[1.8, 24, 24]} />
                <meshStandardMaterial
                    color={hovered ? "#c084fc" : "#7c3aed"}
                    emissive="#7c3aed"
                    emissiveIntensity={hovered ? 0.9 : 0.35}
                    roughness={0.25}
                    metalness={0.8}
                />
                <Html center distanceFactor={28} style={{ pointerEvents: "none" }}>
                    <div className={`px-2.5 py-1 rounded-lg backdrop-blur-md transition-all duration-300 select-none ${
                        hovered 
                            ? "bg-primary text-white scale-110 shadow-[0_0_20px_rgba(168,85,247,0.8)] border border-white/40" 
                            : "bg-black/80 text-gray-200 border border-primary/40 shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                    }`}>
                        <span className="font-mono text-xs font-bold whitespace-nowrap tracking-wider">{skill.name}</span>
                    </div>
                </Html>
            </mesh>
        </Float>
    );
}

function SkillsSphereCloud() {
    const positions = useMemo(() => {
        const temp: Array<[number, number, number]> = [];
        const radius = 15; // Slightly reduced radius to keep well away from heading

        skills.forEach((_, i) => {
            const phi = Math.acos(-1 + (2 * i) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            temp.push([x, y, z]);
        });

        return temp;
    }, []);

    return (
        <>
            {skills.map((skill, i) => (
                <SkillSphere
                    key={skill.name}
                    skill={skill}
                    position={positions[i]}
                />
            ))}
        </>
    );
}

export function SkillsSphere() {
    return (
        <section id="skills" className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-neutral-900 relative overflow-hidden">
            {/* Heading positioned with clear vertical separation */}
            <div className="absolute top-8 sm:top-12 z-20 text-center pointer-events-none px-4">
                <h2 className="text-4xl md:text-6xl font-bold font-heading mb-2">
                    Tech <span className="text-primary">Universe</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base font-mono">
                    Drag to rotate & explore the interactive ecosystem
                </p>
            </div>

            <div className="w-full h-full relative">
                {/* Camera and group adjusted down (y = -3.5) so sphere never collides with heading */}
                <Canvas camera={{ position: [0, 0, 36], fov: 65 }} dpr={[1, 1.5]}>
                    <color attach="background" args={['#000000']} />
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={1.2} />
                    <pointLight position={[-10, -10, -10]} intensity={0.6} />
                    <pointLight position={[0, 10, 0]} intensity={0.8} color="#7c3aed" />

                    <group position={[0, -3.5, 0]}>
                        <SkillsSphereCloud />
                    </group>

                    <OrbitControls
                        target={[0, -3.5, 0]}
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI * 0.75}
                    />

                    <mesh position={[0, -3.5, 0]}>
                        <sphereGeometry args={[50, 24, 24]} />
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
