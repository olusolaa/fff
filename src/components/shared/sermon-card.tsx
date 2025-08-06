
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// This is a placeholder for a real sermon type.
// You should replace this with the actual Sermon type from your application.
interface Sermon {
    id: number;
    title: string;
    speaker: string;
    date?: string;
    series?: string;
    thumbnail?: string;
    hint?: string;
    duration?: number;
    scripture?: string; // Key scripture reference
}

interface SermonCardProps {
    sermon: Sermon;
    onSermonClick?: (sermon: Sermon) => void;
    className?: string;
}

// Bold, sophisticated color palette that complements the brand
const boldColorThemes = [
  {
    name: 'Forest',
    background: 'bg-[#2D4A3E]', // Deep forest green
    accent: 'bg-[#8F9D6D]/20', // Soft olive accent
    textColor: 'text-white',
    scriptureColor: 'text-white/80',
  },
  {
    name: 'Midnight',
    background: 'bg-[#2C3E50]', // Deep midnight blue
    accent: 'bg-white/10',
    textColor: 'text-white',
    scriptureColor: 'text-white/80',
  },
  {
    name: 'Wine',
    background: 'bg-[#722F37]', // Deep wine
    accent: 'bg-white/10',
    textColor: 'text-white',
    scriptureColor: 'text-white/80',
  },
  {
    name: 'Sage',
    background: 'bg-[#87A96B]', // Muted sage
    accent: 'bg-white/20',
    textColor: 'text-white',
    scriptureColor: 'text-white/90',
  },
  {
    name: 'Stone',
    background: 'bg-[#696969]', // Deep gray
    accent: 'bg-white/10',
    textColor: 'text-white',
    scriptureColor: 'text-white/80',
  },
  {
    name: 'Terracotta',
    background: 'bg-[#C65D00]', // Rich terracotta
    accent: 'bg-white/15',
    textColor: 'text-white',
    scriptureColor: 'text-white/90',
  },
];

// Sample scripture references (in production, these would come from sermon data)
const scriptureReferences = [
    'Ephesians 2:8',
    'John 3:16',
    'Romans 8:28',
    'Philippians 4:13',
    'Psalm 23:1',
    'Proverbs 3:5-6',
    '1 Corinthians 13:4',
    'Isaiah 40:31',
];

export function SermonCard({ sermon, onSermonClick, className }: SermonCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [waveformData, setWaveformData] = useState<number[]>([]);
    const hasThumbnail = sermon.thumbnail && !sermon.thumbnail.includes('placehold');
    
    // Get consistent color theme and scripture for this sermon
    const theme = boldColorThemes[sermon.id % boldColorThemes.length];
    const scripture = sermon.scripture || scriptureReferences[sermon.id % scriptureReferences.length];
    
    useEffect(() => {
        // Generate unique waveform data based on sermon ID for consistency
        const seed = sermon.id;
        const data = Array.from({ length: 40 }, (_, i) => {
            // Use sermon ID and index to create deterministic but varied heights
            const base = Math.sin(seed + i * 0.5) * 0.3 + 0.5;
            const variation = Math.cos(seed * 2 + i) * 0.2;
            return Math.max(0.2, Math.min(0.9, base + variation));
        });
        setWaveformData(data);
    }, [sermon.id]);
    
    const handleCardClick = () => {
        if (onSermonClick) {
            onSermonClick(sermon);
        }
    };

    return (
        <motion.div
            className={cn("relative overflow-hidden rounded-lg cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow duration-300", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
            whileHover={{ scale: 1.02, y: -8 }}
            transition={{ duration: 0.3 }}
        >
            {/* Aspect ratio container - 3:4 for poster-like proportions */}
            <div className="aspect-[3/4] relative">
                {hasThumbnail ? (
                    // Card with thumbnail image
                    <Image 
                        src={sermon.thumbnail}
                        alt={sermon.title}
                        fill
                        className={cn(
                            "object-cover transition-transform duration-700",
                            isHovered && "scale-110"
                        )}
                        data-ai-hint={sermon.hint || "sermon church spiritual"}
                    />
                ) : (
                    // Bold solid color poster with typography
                    <div className={cn(
                        "absolute inset-0 transition-all duration-700",
                        theme.background,
                        isHovered && "scale-110"
                    )}>
                        {/* Top accent shape */}
                        <div className={cn("absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-24 translate-x-24", theme.accent)} />
                        
                        {/* Large sermon title as visual element */}
                        <div className="absolute inset-0 flex flex-col justify-center px-8">
                            <h3 className={cn("text-3xl font-bold leading-tight mb-4", theme.textColor)}>
                                {sermon.title}
                            </h3>
                            <div className={cn("w-16 h-1 bg-white/30 mb-4")} />
                            <p className={cn("text-sm font-medium", theme.scriptureColor)}>
                                {sermon.series}
                            </p>
                        </div>
                        
                        {/* Scripture reference at bottom */}
                        <div className="absolute bottom-6 left-8">
                            <p className={cn("text-xs font-bold tracking-[0.2em] uppercase", theme.scriptureColor)}>
                                {scripture}
                            </p>
                        </div>
                        
                        {/* Bottom accent shape */}
                        <div className={cn("absolute bottom-0 left-0 w-32 h-32 rounded-full translate-y-16 -translate-x-16", theme.accent)} />
                    </div>
                )}
                
                {/* Dark Overlay on Hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-black/70"
                        />
                    )}
                </AnimatePresence>
                
                {/* Animated Waveform on Hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="flex items-center gap-[3px] h-20">
                                {waveformData.map((height, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1.5 bg-accent rounded-full opacity-90"
                                        initial={{ height: 4 }}
                                        animate={{ 
                                            height: isHovered ? height * 80 : 4,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: i * 0.015,
                                            ease: "easeOut"
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Title and Speaker Info on Hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="absolute bottom-0 left-0 right-0 p-6"
                        >
                            <h3 className="text-white font-bold text-lg mb-1">{sermon.title}</h3>
                            <p className="text-white/90 text-sm">{sermon.speaker}</p>
                            {sermon.date && <p className="text-white/70 text-xs mt-1">{sermon.date}</p>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
