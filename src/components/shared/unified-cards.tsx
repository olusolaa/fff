'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Headphones, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
    title: string;
    image: string;
    readTime: string;
    onClick?: () => void;
    className?: string;
}

export function BlogCard({ title, image, readTime, onClick, className }: BlogCardProps) {
    return (
        <motion.div 
            className={cn("relative overflow-hidden rounded-lg cursor-pointer group", className)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
        >
            <div className="aspect-[8/6] relative">
                <Image 
                    src={image} 
                    alt={title} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Hover Gradient Overlay */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Title and Read Time - Hidden by default, shown on hover */}
                <motion.div 
                    className="absolute bottom-0 left-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    whileHover={{ y: 0 }}
                    animate={{ y: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="font-bold text-xl mb-2">{title}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                        <BookOpen size={16}/>
                        <span>{readTime}</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

interface PodcastCardProps {
    title: string;
    coverArt: string;
    duration: string;
    onClick?: () => void;
    className?: string;
}

export function PodcastCard({ title, coverArt, duration, onClick, className }: PodcastCardProps) {
    return (
        <motion.div 
            className={cn("relative aspect-square overflow-hidden rounded-lg cursor-pointer group", className)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
        >
            <Image 
                src={coverArt} 
                alt={title} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            
            {/* Dark Overlay on Hover */}
            <motion.div 
                className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            {/* Play Icon and Title - Hidden by default, shown on hover */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="bg-accent rounded-full p-4 mb-4">
                    <Play size={32} fill="white" className="ml-1" />
                </div>
                <h3 className="font-bold text-lg text-center px-4 line-clamp-2">{title}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                    <Headphones size={16} />
                    <span>{duration}</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

interface BookCardProps {
    title: string;
    author: string;
    coverImage: string;
    synopsis?: string;
    chapter?: string;
    onClick?: () => void;
    className?: string;
    layoutId?: string;
}

export function BookCard({ title, author, coverImage, synopsis, chapter, onClick, className, layoutId }: BookCardProps) {
    return (
        <motion.div 
            className={cn("relative", className)}
            whileHover={{ scale: 1.05, z: 10 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
        >
            <div className="relative cursor-pointer group">
                <motion.div
                    layoutId={layoutId}
                    className="book-3d-container relative"
                >
                    <Image 
                        src={coverImage}
                        alt={title}
                        width={400} 
                        height={600} 
                        className="w-full h-auto object-contain rounded-r-sm shadow-2xl" 
                    />
                    
                    {/* Dark Overlay with Book Info on Hover */}
                    <motion.div 
                        className="absolute inset-0 bg-black/80 rounded-r-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                    >
                        <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
                        <p className="text-white/80 text-sm mb-3">{author}</p>
                        {synopsis && (
                            <p className="text-white/70 text-xs line-clamp-3 mb-3">
                                {synopsis}
                            </p>
                        )}
                        {chapter && <p className="text-accent text-sm font-medium">{chapter}</p>}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
} 