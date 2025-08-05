
"use client";

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const AudioVisualizer = ({ progress, isPlaying }: { progress?: number, isPlaying: boolean }) => {
    const controls = useAnimation();
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        setData(Array.from({ length: 150 }, () => Math.random() * 0.8 + 0.2));
    }, []);

    useEffect(() => {
        if (isPlaying) {
            controls.start("playing");
        } else {
            controls.stop();
            controls.set("paused");
        }
    }, [isPlaying, controls]);

    if (!data.length) {
        return <div className="w-full h-full flex items-center justify-center p-8 bg-primary/10" />;
    }

    return (
        <div className="w-full h-full flex items-center justify-center p-8 bg-primary/10">
            <div className="w-full h-full flex items-center justify-center gap-px">
                {data.map((amplitude, index) => {
                    const barProgress = index / data.length;
                    const hasBeenPlayed = (progress || 0) >= barProgress;
                    
                    return (
                        <motion.div
                            key={index}
                            className={cn(
                                "w-full rounded-full transition-colors duration-300",
                                hasBeenPlayed ? "bg-accent" : "bg-primary/30"
                            )}
                            style={{ 
                                height: `${amplitude * 100}%`,
                            }}
                            variants={{
                                playing: {
                                    scaleY: [1, 1.15, 0.85, 1],
                                    opacity: [0.6, 0.8, 0.7, 0.6],
                                    transition: {
                                        duration: 1 + Math.random(),
                                        repeat: Infinity,
                                        repeatType: 'mirror',
                                        ease: 'easeInOut',
                                        delay: index * 0.01,
                                    },
                                },
                                paused: {
                                    scaleY: 1,
                                    opacity: 0.6,
                                },
                            }}
                            animate={controls}
                        />
                    );
                })}
            </div>
        </div>
    );
};
