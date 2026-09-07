"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AuraMesh() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const count = 16; // Optimized grid size: 256 vertices (reduced from 784/2500) for high frame rates

    const [positions, initialY] = useMemo(() => {
        const pos = new Float32Array(count * count * 3);
        const iy = new Float32Array(count * count);

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const idx = i * count + j;
                const x = (i - count / 2) * 4.0;
                const z = (j - count / 2) * 4.0;
                const y = Math.random() * 1.5;

                pos[idx * 3] = x;
                pos[idx * 3 + 1] = y;
                pos[idx * 3 + 2] = z;
                iy[idx] = y;
            }
        }
        return [pos, iy];
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (!meshRef.current) return;
        const pos = meshRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const idx = i * count + j;
                const x = pos[idx * 3];
                const z = pos[idx * 3 + 2];

                pos[idx * 3 + 1] = initialY[idx] +
                    Math.sin(x * 0.15 + time) * 1.8 +
                    Math.cos(z * 0.15 + time) * 1.8;
            }
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.rotation.y = time * 0.02;
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]}>
            <planeGeometry args={[75, 75, count - 1, count - 1]} />
            <meshStandardMaterial
                color="#7c3aed"
                wireframe
                transparent
                opacity={0.3}
                emissive="#7c3aed"
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

function Particles() {
    const count = 250; // Optimized particle count
    const mesh = useRef<THREE.Points>(null!);

    const [positions] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 100;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        return [pos];
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        mesh.current.rotation.x = state.clock.getElapsedTime() * 0.015;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.12}
                color="#06b6d4"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

function InteractiveScene() {
    const groupRef = useRef<THREE.Group>(null!);
    const targetRotation = useRef({ x: 0, y: 0 });
    const currentRotation = useRef({ x: 0, y: 0 });

    useFrame(() => {
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

        if (groupRef.current) {
            groupRef.current.rotation.x = currentRotation.current.x;
            groupRef.current.rotation.y = currentRotation.current.y;
            groupRef.current.position.x = currentRotation.current.y * 3;
            groupRef.current.position.y = -currentRotation.current.x * 3;
        }
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 0.15;
            const y = (e.clientY / window.innerHeight - 0.5) * 0.15;
            targetRotation.current.y = x;
            targetRotation.current.x = y;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <group ref={groupRef}>
            <AuraMesh />
            <Particles />
        </group>
    );
}

export function WarpBackground() {
    const [isMobile, setIsMobile] = useState(false);
    const [isInView, setIsInView] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Performance critical: Only run Warp Canvas when in upper section of the page
        const handleScroll = () => {
            setIsInView(window.scrollY < window.innerHeight * 1.5);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // On mobile devices, use ultra-lightweight CSS radial glow for instant 120fps scrolling!
    if (!mounted || isMobile) {
        return (
            <div className="fixed inset-0 z-[-1] bg-black pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(124,58,237,0.18),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(6,182,212,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_85%)] pointer-events-none" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[-1] bg-black pointer-events-none">
            <Canvas 
                frameloop={isInView ? "always" : "never"}
                camera={{ position: [0, 10, 30], fov: 60 }} 
                dpr={[1, 1.25]}
            >
                <color attach="background" args={['#020202']} />
                <fog attach="fog" args={['#020202', 20, 50]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#7c3aed" />
                <pointLight position={[-10, 10, -10]} intensity={1} color="#06b6d4" />

                <InteractiveScene />
            </Canvas>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />
        </div>
    );
}
