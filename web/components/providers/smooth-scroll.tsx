"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // Detect touch devices (phones, tablets) where native momentum scrolling is superior and hardware-accelerated
        const checkTouch = () => {
            return (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches
            );
        };
        setIsTouch(checkTouch());
    }, []);

    // On touch/mobile devices, bypass virtual smooth-scroll to unlock native 60/120fps hardware momentum scrolling!
    if (isTouch) {
        return <>{children}</>;
    }

    const Lenis = ReactLenis as any;
    return (
        <Lenis root options={{ lerp: 0.12, duration: 1.2, smoothWheel: true, syncTouch: false }}>
            {children}
        </Lenis>
    );
}
