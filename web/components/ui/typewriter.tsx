"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface TypewriterProps {
    text: string[];
    speed?: number;
    waitTime?: number;
    className?: string;
}

export function Typewriter({ text, speed = 50, waitTime = 2000, className }: TypewriterProps) {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const currentText = text[index];

        if (isDeleting) {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(currentText.substring(0, displayText.length - 1));
                }, speed / 2);
            } else {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % text.length);
            }
        } else {
            if (displayText.length < currentText.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentText.substring(0, displayText.length + 1));
                }, speed);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, waitTime);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, index, text, speed, waitTime]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-top"
            />
        </span>
    );
}
