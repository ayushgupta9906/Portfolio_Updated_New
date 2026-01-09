"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sprite } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";

// Create a canvas texture with text
function createTextTexture(text: string) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 512;
    canvas.height = 256;

    // Background
    context.fillStyle = 'rgba(0, 0, 0, 0.9)';
    context.roundRect(10, 10, canvas.width - 20, canvas.height - 20, 20);
    context.fill();

    // Border
    context.strokeStyle = '#7c3aed';
    context.lineWidth = 8;
    context.roundRect(10, 10, canvas.width - 20, canvas.height - 20, 20);
    context.stroke();

    // Text
    context.fillStyle = 'white';
    context.font = 'bold 60px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

function SkillSphere({ skill, position }: { skill: typeof skills[0], position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const spriteRef = useRef<THREE.Sprite>(null);
    const [hovered, setHovered] = useState(false);

    const texture = useMemo(() => createTextTexture(skill.name), [skill.name]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
            meshRef.current.rotation.y += delta * 0.5;
        }
        // Make sprite always face camera
        if (spriteRef.current && state.camera) {
            spriteRef.current.quaternion.copy(state.camera.quaternion);
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
                    <sphereGeometry args={[1.8, 24, 24]} />
                    <meshStandardMaterial
                        color={hovered ? "#a78bfa" : "#7c3aed"}
                        emissive="#7c3aed"
                        emissiveIntensity={hovered ? 0.8 : 0.3}
                        roughness={0.3}
                        metalness={0.8}
                    />
                </mesh>

                {/* Text sprite that always faces camera */}
                <sprite ref={spriteRef} scale={[8, 4, 1]}>
                    <spriteMaterial map={texture} transparent opacity={0.95} />
                </sprite>
            </group>
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
                    Drag to explore • {skills.length} technologies
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
        </section>
    );
}
