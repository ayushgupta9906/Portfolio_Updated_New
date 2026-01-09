"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, Center } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

export function FloatingInitials() {
    const meshRef = useRef<THREE.Group>(null);
    const { theme } = useTheme();

    // Dynamic color based on theme (simplified logic, R3F doesn't auto-update with context easily, so we pass props or memoize)
    // For now, using a standard metallic look that works in both

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Center>
                <group ref={meshRef}>
                    <Text
                        font="/fonts/Inter-Bold.ttf" // We'll need to handle fonts, falling back to default for now if this fails load.
                        // Actually, Drei's Text uses a default font if none provided, or a specific URL. 
                        // We can use a google font URL directly or rely on default.
                        fontSize={3}
                        letterSpacing={-0.05}
                        color={theme === "dark" ? "#ffffff" : "#333333"}
                    >
                        AG
                        <meshStandardMaterial metalness={0.8} roughness={0.2} />
                    </Text>
                </group>
            </Center>
        </Float>
    );
}
