"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";
import { motion } from "framer-motion";

function SkillSphere({ skill, position, onHover }: { skill: typeof skills[0], position: [number, number, number], onHover: (name: string | null) => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerEnter={() => {
                    setHovered(true);
                    onHover(skill.name);
                }}
                onPointerLeave={() => {
                    setHovered(false);
                    onHover(null);
                }}
            >
                <sphereGeometry args={[1.8, 24, 24]} />
                <meshStandardMaterial
                    color={hovered ? "#a78bfa" : "#7c3aed"}
                    emissive="#7c3aed"
                    emissiveIntensity={hovered ? 0.8 : 0.3}
                    roughness={0.3}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

function SkillsSphereCloud({ onHover }: { onHover: (name: string | null) => void }) {
    const positions = useMemo(() => {
        const temp: Array<[number, number, number]> = [];
        const radius = 8;

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
                <SkillSphere key={skill.name} skill={skill} position={positions[i]} onHover={onHover} />
            ))}
        </>
    );
}

export function SkillsSphere() {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <section id="skills" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-neutral-900 relative overflow-hidden py-20">
            <div className="absolute top-20 z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
                    Tech <span className="text-primary">Universe</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-2">
                    Drag to explore • Hover to highlight • {skills.length} technologies
                </p>
                {hoveredSkill && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 px-6 py-3 bg-primary/90 text-primary-foreground rounded-full inline-block font-bold text-xl shadow-xl"
                    >
                        {hoveredSkill}
                    </motion.div>
                )}
            </div>

            <div className="w-full h-[600px]">
                <Canvas camera={{ position: [0, 0, 32], fov: 75 }}>
                    <color attach="background" args={['#000000']} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    <pointLight position={[0, 10, 0]} intensity={0.5} color="#7c3aed" />

                    <SkillsSphereCloud onHover={setHoveredSkill} />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI * 0.75}
                    />

                    <mesh>
                        <sphereGeometry args={[50, 32, 32]} />
                        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
                    </mesh>
                </Canvas>
            </div>

            {/* All Skills Grid - Visible and Clear */}
            <div className="mt-12 max-w-6xl px-4">
                <h3 className="text-2xl font-bold text-center mb-6">All Technologies</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-3 bg-card border-2 border-border rounded-lg text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                        >
                            <div className="text-lg font-bold">{skill.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{skill.category}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
