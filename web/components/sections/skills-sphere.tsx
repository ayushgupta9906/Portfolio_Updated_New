"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";

function SkillSphere({ skill, position }: { skill: typeof skills[0], position: [number, number, number] }) {
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
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <sphereGeometry args={[1.8, 24, 24]} />
                <meshStandardMaterial
                    color={hovered ? "#a78bfa" : "#7c3aed"}
                    emissive="#7c3aed"
                    emissiveIntensity={hovered ? 0.6 : 0.3}
                    roughness={0.3}
                    metalness={0.8}
                />

                {/* Text Label */}
                <Html
                    position={[0, 0, 0]}
                    center
                    distanceFactor={4}
                    style={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    <div className="bg-black/95 backdrop-blur-md px-6 py-4 rounded-2xl border-3 border-primary/80 whitespace-nowrap shadow-2xl">
                        <span className="text-2xl font-extrabold text-white tracking-wide">
                            {skill.name}
                        </span>
                    </div>
                </Html>
            </mesh>
        </Float>
    );
}

function SkillsSphereCloud() {
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
                <SkillSphere key={skill.name} skill={skill} position={positions[i]} />
            ))}
        </>
    );
}

export function SkillsSphere() {
    return (
        <section id="skills" className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-neutral-900 relative overflow-hidden">
            <div className="absolute top-20 z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
                    Tech <span className="text-primary">Universe</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                    Drag to explore • Hover to highlight • {skills.length} technologies
                </p>
            </div>

            <div className="w-full h-full">
                <Canvas camera={{ position: [0, 0, 32], fov: 75 }}>
                    <color attach="background" args={['#000000']} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    <pointLight position={[0, 10, 0]} intensity={0.5} color="#7c3aed" />

                    <SkillsSphereCloud />

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

            {/* Category Legend */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-wrap gap-2 max-w-5xl justify-center px-4 z-10">
                {Array.from(new Set(skills.map(s => s.category))).map((category) => (
                    <span
                        key={category}
                        className="text-xs px-3 py-1 bg-background/80 backdrop-blur border border-primary/30 text-primary rounded-full font-medium"
                    >
                        {category}
                    </span>
                ))}
            </div>
        </section>
    );
}
