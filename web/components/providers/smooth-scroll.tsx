"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Detect touch devices (phones, tablets)
        const checkTouch = () => {
            return (
                typeof window !== "undefined" &&
                ("ontouchstart" in window ||
                    navigator.maxTouchPoints > 0 ||
                    window.matchMedia("(pointer: coarse)").matches)
            );
        };
        setIsTouchDevice(checkTouch());
    }, []);

    // On touch devices (phones, tablets), use 100% native hardware-accelerated 120Hz scrolling!
    // Never hijack touch scrolling on mobile — native scrolling is buttery smooth and zero-overhead.
    if (!mounted || isTouchDevice) {
        return <>{children}</>;
    }

    const Lenis = ReactLenis as any;
    return (
        <Lenis
            root
            options={{
                lerp: 0.12,          // Crisp, snappy response (was 0.1 sluggish)
                duration: 0.75,       // Quick, responsive glide (was 1.5s heavy dragging)
                smoothWheel: true,
                wheelMultiplier: 1.0,
                touchMultiplier: 0,   // Explicitly disable touch hijacking
                infinite: false,
            }}
        >
            {children}
        </Lenis>
    );
}
