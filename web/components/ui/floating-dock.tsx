"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Home, User, Code, Briefcase, Mail, Layers } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const items = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Layers },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: Code },
    { name: "Contact", href: "#contact", icon: Mail },
];

function DockIcon({ mouseX, item }: { mouseX: any; item: any }) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 72, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 14 });

    const handleClick = (e: React.MouseEvent) => {
        if (item.href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(item.href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } else if (item.href === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Magnetic>
            <motion.div
                ref={ref}
                style={{ width }}
                className="aspect-square w-10 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-white/15 flex items-center justify-center relative group hover:bg-primary/20 hover:border-primary/50 transition-colors shadow-lg"
            >
                <a
                    href={item.href}
                    onClick={handleClick}
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                    aria-label={item.name}
                >
                    <item.icon className="w-1/2 h-1/2 text-foreground/80 group-hover:text-primary transition-colors" />
                </a>

                {/* Tooltip */}
                <span className="absolute -top-9 bg-neutral-900/90 border border-white/10 text-white text-[11px] font-mono px-2.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                    {item.name}
                </span>
            </motion.div>
        </Magnetic>
    );
}

export function FloatingDock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90]">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-3 p-3 rounded-2xl bg-neutral-950/70 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            >
                {items.map((item) => (
                    <DockIcon key={item.name} mouseX={mouseX} item={item} />
                ))}
            </motion.div>
        </div>
    );
}
