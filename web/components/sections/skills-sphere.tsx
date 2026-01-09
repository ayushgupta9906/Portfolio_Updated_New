"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";

function SkillSphere({ skill, position }: { skill: typeof skills[0], position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            // Smooth rotation on its own axis
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position}>
                <mesh
                    ref={meshRef}
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                >
                    <sphereGeometry args={[2.5, 32, 32]} />
                    <meshStandardMaterial
                        color={hovered ? "#a78bfa" : "#7c3aed"}
                        emissive="#7c3aed"
                        emissiveIntensity={hovered ? 0.8 : 0.4}
                        roughness={0.2}
                        metalness={0.9}
                    />
                </mesh>

                {/* Text Label - Using Html for perfectly smooth tracking */}
                <Html
                    position={[0, 0, 0]}
                    center
                    distanceFactor={12}
                    zIndexRange={[100, 0]}
                    style={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    <div className="bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-primary/60 whitespace-nowrap shadow-2xl">
                        <span className="text-xl font-bold text-white tracking-wide">
                            {skill.name}
                        </span>
                    </div>
                </Html>
            </group>
        </Float>
    );
}

function SkillsSphereCloud() {
    const positions = useMemo(() => {
        const temp: Array<[number, number, number]> = [];
        const radius = 22; // Spread even farther apart

        // Fibonacci sphere distribution for perfectly even spacing
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
            {/* Clean Header - No extra text */}
            <div className="absolute top-20 z-10 text-center pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-bold font-heading">
                    Tech <span className="text-primary">Universe</span>
                </h2>
            </div>

            <div className="w-full h-full">
                <Canvas camera={{ position: [0, 0, 45], fov: 75 }} dpr={[1, 2]}>
                    <color attach="background" args={['#000000']} />
                    <ambientLight intensity={0.6} />
                    <pointLight position={[20, 20, 20]} intensity={1.5} />
                    <pointLight position={[-20, -20, -20]} intensity={0.8} />
                    <pointLight position={[0, 15, 0]} intensity={1} color="#7c3aed" />

                    <SkillsSphereCloud />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.8}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI * 0.75}
                    />

                    {/* Stars/Dust Effect */}
                    {[...Array(200)].map((_, i) => (
                        <mesh key={i} position={[
                            (Math.random() - 0.5) * 100,
                            (Math.random() - 0.5) * 100,
                            (Math.random() - 0.5) * 100
                        ]}>
                            <sphereGeometry args={[0.1, 8, 8]} />
                            <meshBasicMaterial color="#ffffff" transparent opacity={Math.random()} />
                        </mesh>
                    ))}
                </Canvas>
            </div>
        </section>
    );
}
