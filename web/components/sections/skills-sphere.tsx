"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, TrackballControls } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";

interface WordProps {
    children: string;
    position: THREE.Vector3;
}

function Word({ children, ...props }: WordProps) {
    const color = new THREE.Color();
    const fontProps = { font: "/fonts/Inter-Bold.ttf", fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, "material-toneMapped": false };
    const ref = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);

    useFrame(({ camera }) => {
        // Make text face camera
        if (ref.current) {
            ref.current.quaternion.copy(camera.quaternion);
            // Animate color
            (ref.current.material as THREE.MeshBasicMaterial).color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1);
        }
    });

    const over = (e: any) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' };
    const out = () => { setHovered(false); document.body.style.cursor = 'auto' };

    return (
        <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...props} {...fontProps}>
            {children}
        </Text>
    );
}

function Cloud({ count = 4, radius = 20 }) {
    // Create a spherical distribution of words
    const words = useMemo(() => {
        const temp = [];
        const spherical = new THREE.Spherical();
        const phiSpan = Math.PI / (count + 1);
        const thetaSpan = (Math.PI * 2) / count;

        // We'll map skills to sphere points
        for (let i = 0; i < skills.length; i++) {
            // Simple spherical fibonacci or random distribution is better usually, 
            // but for <20 skills, random is fine or simple rings
            const phi = Math.acos(-1 + (2 * i) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;

            const r = radius;
            const x = r * Math.cos(theta) * Math.sin(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(phi);
            temp.push([new THREE.Vector3(x, y, z), skills[i].name]);
        }
        return temp;
    }, [count, radius]);

    return words.map(([pos, word], index) => (
        <Word
            key={index}
            position={pos as THREE.Vector3}
            children={word as string}
        />
    ));
}

export function SkillsSphere() {
    return (
        <section id="skills" className="h-[80vh] flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">
                Tech <span className="text-white">Universe</span>
            </h2>
            <div className="w-full h-full cursor-move">
                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                    <fog attach="fog" args={['#202025', 0, 80]} />
                    <Cloud count={8} radius={20} />
                    <TrackballControls noZoom />
                </Canvas>
            </div>
        </section>
    );
}
