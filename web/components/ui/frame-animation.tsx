"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, Repeat, Loader2 } from "lucide-react";

interface FrameAnimationProps {
    frames: string[];
    fps?: number;
    autoPlay?: boolean;
    loop?: boolean;
    className?: string;
    currentFrame?: number; // New prop for manual control
}

export function FrameAnimation({
    frames,
    fps = 30,
    autoPlay = true,
    loop = true,
    className,
    currentFrame,
}: FrameAnimationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isLooping, setIsLooping] = useState(loop);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const frameRef = useRef<number>(0);
    const lastFrameTimeRef = useRef<number>(0);
    const animationFrameIdRef = useRef<number | null>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const totalFrames = frames.length;
        const newImages: HTMLImageElement[] = [];

        setIsLoading(true);

        frames.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / totalFrames) * 100));

                if (loadedCount === totalFrames) {
                    setIsLoading(false);
                    // Draw first frame or currentFrame immediately
                    if (canvasRef.current && newImages[0]) {
                        const ctx = canvasRef.current.getContext("2d");
                        if (ctx) {
                            // Set canvas dimensions to match image
                            canvasRef.current.width = newImages[0].naturalWidth;
                            canvasRef.current.height = newImages[0].naturalHeight;

                            const initialFrame = currentFrame !== undefined ? currentFrame : 0;
                            if (newImages[initialFrame]) {
                                ctx.drawImage(newImages[initialFrame], 0, 0);
                            }
                        }
                    }
                }
            };
            newImages[index] = img;
        });

        imagesRef.current = newImages;

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [frames]);

    // Handle manual frame updates (e.g. from scroll)
    useEffect(() => {
        if (currentFrame === undefined || isLoading || !imagesRef.current.length) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        // Ensure frame index is within bounds
        const safeFrameIndex = Math.max(0, Math.min(currentFrame, frames.length - 1));
        const image = imagesRef.current[safeFrameIndex];

        if (canvas && ctx && image) {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
    }, [currentFrame, isLoading, frames.length]);

    // Animation loop (only if currentFrame is NOT provided)
    useEffect(() => {
        if (currentFrame !== undefined || !isPlaying || isLoading) return;

        const animate = (timestamp: number) => {
            if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;

            const interval = 1000 / fps;
            const elapsed = timestamp - lastFrameTimeRef.current;

            if (elapsed > interval) {
                // Draw current frame
                const canvas = canvasRef.current;
                const ctx = canvas?.getContext("2d");
                const currentImage = imagesRef.current[frameRef.current];

                if (canvas && ctx && currentImage) {
                    // Start new frame
                    // ctx.clearRect(0, 0, canvas.width, canvas.height); // Not strictly necessary if drawing full opacity
                    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
                }

                // Advance frame
                if (frameRef.current < frames.length - 1) {
                    frameRef.current++;
                } else {
                    if (isLooping) {
                        frameRef.current = 0;
                    } else {
                        setIsPlaying(false);
                    }
                }

                lastFrameTimeRef.current = timestamp - (elapsed % interval);
            }

            animationFrameIdRef.current = requestAnimationFrame(animate);
        };

        animationFrameIdRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [isPlaying, isLoading, fps, isLooping, frames.length, currentFrame]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleLoop = () => setIsLooping(!isLooping);

    // Hide controls if controlled externally
    const showControls = currentFrame === undefined;

    return (
        <div className={cn("relative w-full h-full", className)}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="text-xs font-mono text-primary/80">LOADING_ASSETS... {progress}%</span>
                    </div>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
            />

            {/* Controls Overlay - Visible on hover or when paused */}
            {showControls && (
                <div className={cn(
                    "absolute bottom-4 right-4 flex gap-2 transition-opacity duration-300",
                    isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                )}>
                    <button
                        onClick={togglePlay}
                        className="p-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 text-white backdrop-blur-md transition-colors"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={toggleLoop}
                        className={cn(
                            "p-2 rounded-full border border-white/10 backdrop-blur-md transition-colors",
                            isLooping ? "bg-primary/20 text-primary hover:bg-primary/30" : "bg-black/50 text-white/50 hover:bg-black/70"
                        )}
                        aria-label="Toggle Loop"
                    >
                        <Repeat className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
