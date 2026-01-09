"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AuraMesh() {
    const meshRef = useRef<THREE.Mesh>(null!);

    // Create a larger plane for the mesh
    const [positions, initialY] = useMemo(() => {
        const count = 50; // Grid size
        const pos = new Float32Array(count * count * 3);
        const iy = new Float32Array(count * count);

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const idx = (i * count + j);
                const x = (i - count / 2) * 1.5;
                const z = (j - count / 2) * 1.5;
                const y = Math.random() * 2;

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
        const pos = meshRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                const idx = (i * 50 + j);
                const x = pos[idx * 3];
                const z = pos[idx * 3 + 2];

                // Fluid wave motion
                pos[idx * 3 + 1] = initialY[idx] +
                    Math.sin(x * 0.2 + time) * 2 +
                    Math.cos(z * 0.2 + time) * 2;
            }
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.rotation.y = time * 0.05;
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]}>
            <planeGeometry args={[75, 75, 49, 49]} />
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
    const count = 1000;
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
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        mesh.current.rotation.x = state.clock.getElapsedTime() * 0.03;
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
                size={0.1}
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
    const isDragging = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    useFrame(() => {
        // Smooth interpolation (lerp)
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

        if (groupRef.current) {
            groupRef.current.rotation.x = currentRotation.current.x;
            groupRef.current.rotation.y = currentRotation.current.y;

            // Add subtle parallax based on rotation
            groupRef.current.position.x = currentRotation.current.y * 5;
            groupRef.current.position.y = -currentRotation.current.x * 5;
        }
    });

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            // Only drag if left clicking on non-interactive elements
            const target = e.target as HTMLElement;
            if (target.closest('button, a, input, [role="button"]')) return;

            isDragging.current = true;
            lastMousePos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) {
                // Subtle mouse follow when not dragging
                const x = (e.clientX / window.innerWidth - 0.5) * 0.2;
                const y = (e.clientY / window.innerHeight - 0.5) * 0.2;
                targetRotation.current.y = x;
                targetRotation.current.x = y;
                return;
            }

            const deltaX = e.clientX - lastMousePos.current.x;
            const deltaY = e.clientY - lastMousePos.current.y;

            targetRotation.current.y += deltaX * 0.002;
            targetRotation.current.x += deltaY * 0.002;

            lastMousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <group ref={groupRef}>
            <AuraMesh />
            <Particles />
        </group>
    );
}

export function WarpBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 10, 30], fov: 60 }} dpr={[1, 2]}>
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
