"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function Particles({ count = 2000 }) {
    const mesh = useRef<THREE.Points>(null!);
    const { viewport, pointer } = useThree();
    // Note: mouse is deprecated in newer R3F, using pointer or standard interaction

    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20; // Spread x
            const y = (Math.random() - 0.5) * 20; // Spread y
            const z = (Math.random() - 0.5) * 10; // Spread z
            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.rotation.y = time * 0.05;
            mesh.current.rotation.x = time * 0.02;

            // Simulating mouse interaction if needed
            // const x = (state.pointer.x * viewport.width) / 2
            // const y = (state.pointer.y * viewport.height) / 2
            // mesh.current.rotation.x = -y * 0.1
            // mesh.current.rotation.y = x * 0.1
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#8b5cf6" // Violet to match primary
                sizeAttenuation={true}
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
