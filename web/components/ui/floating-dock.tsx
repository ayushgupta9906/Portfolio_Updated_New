"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Home, User, Code, Briefcase, Mail, Layers } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const items = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Layers },
    { name: "Projects", href: "#projects", icon: Code },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
];

function DockIcon({ mouseX, item }: { mouseX: any; item: any }) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Magnetic>
            <motion.div
                ref={ref}
                style={{ width }}
                className="aspect-square w-10 rounded-full bg-background/50 backdrop-blur-md border border-white/10 flex items-center justify-center relative group hover:bg-primary/20 transition-colors"
            >
                <Link href={item.href} className="w-full h-full flex items-center justify-center">
                    <item.icon className="w-1/2 h-1/2 text-foreground/80 group-hover:text-primary transition-colors" />
                </Link>

                {/* Tooltip */}
                <span className="absolute -top-10 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.name}
                </span>
            </motion.div>
        </Magnetic>
    );
}

export function FloatingDock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl"
            >
                {items.map((item) => (
                    <DockIcon key={item.name} mouseX={mouseX} item={item} />
                ))}
            </motion.div>
        </div>
    );
}
