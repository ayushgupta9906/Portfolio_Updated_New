"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["SYSTEM", "CORE", "AUDI", "VISUAL", "INITIALIZED"];

export function Preloader() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        if (index == words.length - 1) {
            setTimeout(() => setIsLoading(false), 1000); // Exit after last word
            return;
        }

        const timeout = setTimeout(() => {
            setIndex(index + 1);
        }, 200); // Speed of words

        return () => clearTimeout(timeout);
    }, [index]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    }

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    variants={{
                        initial: { top: 0 },
                        exit: { top: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }
                    }}
                    initial="initial"
                    exit="exit"
                    className="fixed h-screen w-screen flex items-center justify-center bg-black z-[99999] overflow-hidden"
                >
                    {dimension.width > 0 &&
                        <>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex text-white text-4xl md:text-6xl font-heading items-center absolute z-10"
                            >
                                <span className="block w-3 h-3 bg-primary rounded-full mr-3" />
                                {words[index]}
                            </motion.p>
                            <svg className="absolute top-0 w-full h-[calc(100%+300px)] fill-black pointer-events-none">
                                <motion.path
                                    variants={curve as any}
                                    initial="initial"
                                    exit="exit"
                                />
                            </svg>
                        </>
                    }
                </motion.div>
            )}
        </AnimatePresence>
    );
}
