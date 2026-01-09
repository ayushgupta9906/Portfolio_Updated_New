"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";

function SkillSphere({ skill, position, onPositionUpdate }: {
    skill: typeof skills[0],
    position: [number, number, number],
    onPositionUpdate: (name: string, screenPos: { x: number, y: number, z: number }) => void
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const { camera, size } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
            meshRef.current.rotation.y += 0.01;

            // Update 2D position for label
            const vector = new THREE.Vector3(...position);
            vector.project(camera);

            const x = (vector.x * 0.5 + 0.5) * size.width;
            const y = (-(vector.y) * 0.5 + 0.5) * size.height;

            onPositionUpdate(skill.name, { x, y, z: vector.z });
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
                <sphereGeometry args={[2.5, 32, 32]} />
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

function SkillsSphereCloud({ onPositionUpdate }: {
    onPositionUpdate: (name: string, screenPos: { x: number, y: number, z: number }) => void
}) {
    const positions = useMemo(() => {
        const temp: Array<[number, number, number]> = [];
        const radius = 18; // Increased for more spacing


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
                    onPositionUpdate={onPositionUpdate}
                />
            ))}
        </>
    );
}

export function SkillsSphere() {
    const [labels, setLabels] = useState<Record<string, { x: number, y: number, z: number }>>({});

    const handlePositionUpdate = (name: string, pos: { x: number, y: number, z: number }) => {
        setLabels(prev => ({ ...prev, [name]: pos }));
    };

    return (
        <section id="skills" className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-neutral-900 relative overflow-hidden">
            <div className="absolute top-20 z-10 text-center pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
                    Tech <span className="text-primary">Universe</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                    Drag to explore • {skills.length} technologies
                </p>
            </div>

            <div className="w-full h-full relative">
                <Canvas camera={{ position: [0, 0, 35], fov: 75 }}>
                    <color attach="background" args={['#000000']} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    <pointLight position={[0, 10, 0]} intensity={0.5} color="#7c3aed" />

                    <SkillsSphereCloud onPositionUpdate={handlePositionUpdate} />

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

                {/* 2D Labels overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    {Object.entries(labels).map(([name, pos]) => {
                        if (pos.z > 1) return null; // Behind camera

                        return (
                            <div
                                key={name}
                                className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 border-2 border-primary/70 rounded-lg backdrop-blur-sm"
                                style={{
                                    left: `${pos.x}px`,
                                    top: `${pos.y}px`,
                                    opacity: pos.z > 0.5 ? 0.3 : 1,
                                }}
                            >
                                <span className="text-white font-bold text-base whitespace-nowrap">
                                    {name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
