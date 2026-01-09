"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

function StarField() {
    const mesh = useRef<THREE.Points>(null!);
    const count = 4000;

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            // Tunnel distribution
            const r = Math.random() * 5 + 2; // Radius
            const theta = Math.random() * 2 * Math.PI;
            const z = (Math.random() - 0.5) * 100;

            positions[i * 3] = r * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(theta);
            positions[i * 3 + 2] = z; // spread along Z

            // Cyberpunk colors
            // Mix of Cyan, Magenta, Violet
            const mix = Math.random();
            if (mix > 0.6) color.setHex(0x8b5cf6); // Violet
            else if (mix > 0.3) color.setHex(0xec4899); // Pink
            else color.setHex(0x06b6d4); // Cyan

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return [positions, colors];
    }, []);

    useFrame((state, delta) => {
        // Move stars towards camera to create warp effect
        if (!mesh.current) return;

        const positions = mesh.current.geometry.attributes.position.array as Float32Array;

        // Speed factor (Boost or Normal)
        const currentSpeed = isBoosting ? 100 * delta : 10 * delta;

        for (let i = 0; i < count; i++) {
            let zIndex = i * 3 + 2;
            positions[zIndex] += currentSpeed;

            // Reset if too close
            if (positions[zIndex] > 20) {
                positions[zIndex] = -80;
            }
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.rotation.z += delta * 0.1; // Slight spin
    });

    const [isBoosting, setIsBoosting] = useState(false);

    useEffect(() => {
        const handleMouseDown = () => setIsBoosting(true);
        const handleMouseUp = () => setIsBoosting(false);

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        }
    }, []);

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export function WarpBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: false }}>
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 5, 40]} />
                <StarField />
            </Canvas>
        </div>
    );
}
