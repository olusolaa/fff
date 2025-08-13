
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AudioVisualizer } from '@/components/ui/audio-visualizer';

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
}

interface SermonCardProps {
    sermon: Sermon;
    onSermonClick?: (sermon: Sermon) => void;
    className?: string;
}

export function SermonCard({ sermon, onSermonClick, className }: SermonCardProps) {
    
    const handleCardClick = () => {
        if (onSermonClick) {
            onSermonClick(sermon);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={cn("h-full", className)}
        >
            <Card 
                className="overflow-hidden group cursor-pointer h-full flex flex-col" 
                onClick={handleCardClick}
            >
                <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden bg-primary/10">
                        <AudioVisualizer 
                            isPlaying={false}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-md text-primary group-hover:text-accent transition-colors leading-tight">{sermon.title}</CardTitle>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <div>
                        <p className="text-sm font-medium text-foreground/80">{sermon.speaker}</p>
                        <p className="text-xs text-muted-foreground">{sermon.date}</p>
                        {sermon.series && <p className="text-xs text-muted-foreground mt-1 italic">{sermon.series}</p>}
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
