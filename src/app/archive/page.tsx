
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  ChevronDown,
  AudioLines,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SermonCard } from '@/components/shared/sermon-card';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';

// Mock Data - Replace with your actual data fetching logic
const currentSeries = {
    title: 'The Echo of Grace',
    description: 'This series explores the profound and persistent nature of God\'s grace. It\'s not a one-time event, but a continuous, resonant echo that shapes our past, present, and future.',
    graphic: 'https://placehold.co/1600x900/1a2a1a/f5f5f0',
    latestSermonId: 1,
};

const allSermons = [
  { id: 1, title: 'The Echo of Grace', speaker: 'Dr. Evelyn Reed', date: 'Oct 26, 2023', series: 'The Echo of Grace', thumbnail: 'https://placehold.co/600x800/2C3E50/f5f5f0?text=Grace+Echoes', duration: 2714, notes: '', transcript: [], seriesId: 1, seriesPart: 1, scripture: 'Ephesians 2:8' },
  { id: 2, title: 'The Unfailing Compass', speaker: 'Dr. Evelyn Reed', date: 'Nov 2, 2023', series: 'The Echo of Grace', thumbnail: 'https://placehold.co/600x800/34495E/f5f5f0?text=Compass', duration: 2650, notes: '', transcript: [], seriesId: 1, seriesPart: 2, scripture: 'Proverbs 3:5-6' },
  { id: 3, title: 'The Lavish Banquet', speaker: 'Dr. Evelyn Reed', date: 'Nov 9, 2023', series: 'The Echo of Grace', thumbnail: null, duration: 2800, notes: '', transcript: [], seriesId: 1, seriesPart: 3, scripture: 'Luke 14:16-24' },
  { id: 10, title: 'Beyond Deserving', speaker: 'Rev. Michael Chen', date: 'May 14, 2023', series: 'Foundations', thumbnail: 'https://placehold.co/600x800/16A085/1a2a1a?text=Beyond', duration: 2500, notes: '', transcript: [], seriesId: 2, seriesPart: 1, scripture: 'Romans 5:8' },
  { id: 11, title: 'The Currency of Heaven', speaker: 'Pastor Sarah Jones', date: 'June 1, 2023', series: 'Kingdom Economics', thumbnail: null, duration: 2900, notes: '', transcript: [], seriesId: 3, seriesPart: 1, scripture: 'Matthew 6:19-21' },
  { id: 12, title: 'Held, Not Perfect', speaker: 'Dr. Evelyn Reed', date: 'July 22, 2023', series: 'Paradox', thumbnail: 'https://placehold.co/600x800/8E44AD/f5f5f0?text=Held', duration: 2600, notes: '', transcript: [], seriesId: 4, seriesPart: 1, scripture: '2 Corinthians 12:9' },
  { id: 13, title: 'The Scandal of Mercy', speaker: 'Rev. Michael Chen', date: 'August 5, 2023', series: 'Foundations', thumbnail: null, duration: 3100, notes: '', transcript: [], seriesId: 2, seriesPart: 2, scripture: 'Micah 6:8' },
  { id: 14, title: 'Freely Given, Freely Give', speaker: 'Pastor Sarah Jones', date: 'September 10, 2023', series: 'Kingdom Economics', thumbnail: 'https://placehold.co/600x800/D35400/f5f5f0?text=Give', duration: 2400, notes: '', transcript: [], seriesId: 3, seriesPart: 2, scripture: 'Acts 20:35' },
  { id: 15, title: 'The Strongest Weakness', speaker: 'Dr. Evelyn Reed', date: 'October 1, 2023', series: 'Paradox', thumbnail: null, duration: 2750, notes: '', transcript: [], seriesId: 4, seriesPart: 2, scripture: '1 Corinthians 1:27' },
  { id: 16, title: 'Grace in the Ruins', speaker: 'Rev. Michael Chen', date: 'October 15, 2023', series: 'Foundations', thumbnail: 'https://placehold.co/600x800/27AE60/1a2a1a?text=Ruins', duration: 2850, notes: '', transcript: [], seriesId: 2, seriesPart: 3, scripture: 'Isaiah 61:3' },
];

export default function SermonArchivePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [searchFocused, setSearchFocused] = useState(false);

    // In a real app, this would use AI-powered vector search
    const filteredSermons = allSermons.filter(sermon => 
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.series.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="bg-background text-foreground min-h-screen">
            <main>
                {/* Section 1: Featured Current Series */}
                <section className="bg-muted/30">
                    <div className="container mx-auto px-4 py-12 md:py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1">
                                <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-left">{currentSeries.title}</h1>
                                <p className="mt-4 text-lg text-foreground/80 max-w-xl text-left">{currentSeries.description}</p>
                                <Button asChild size="lg" className="mt-6">
                                    <Link href={`/?sermonId=${currentSeries.latestSermonId}`}>Watch the Latest Message</Link>
                                </Button>
                            </div>
                            <div className="order-1 md:order-2">
                                <Image 
                                    src={currentSeries.graphic}
                                    alt={`${currentSeries.title} series graphic`}
                                    width={1600}
                                    height={900}
                                    className="rounded-xl shadow-lg"
                                    data-ai-hint="spiritual abstract art"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: AI-Powered Search Command Bar */}
                <section className="container mx-auto px-4 py-16">
                    <div className="max-w-3xl mx-auto">
                        <motion.div 
                            className="relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {/* Command Bar Container */}
                            <div className={cn(
                                "relative group transition-all duration-300",
                                searchFocused && "scale-[1.02]"
                            )}>
                                <Input 
                                    placeholder="Search for a message, topic, scripture, or ask a question..." 
                                    className={cn(
                                        "h-16 pl-14 pr-6 text-lg rounded-xl",
                                        "bg-white/80 backdrop-blur-sm",
                                        "border-2 border-gray-200/50",
                                        "placeholder:text-muted-foreground/60",
                                        "transition-all duration-300",
                                        "focus:bg-white focus:border-primary/30 focus:shadow-xl",
                                        searchFocused && "shadow-2xl border-primary/40"
                                    )}
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                                />
                                <Search className={cn(
                                    "absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 transition-all duration-300",
                                    searchFocused ? "text-primary" : "text-muted-foreground/60"
                                )} />
                                
                                {/* AI Badge */}
                                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                    <span className="text-xs font-medium text-muted-foreground/60 bg-primary/5 px-2 py-1 rounded-md">
                                        AI-Powered
                                    </span>
                                </div>
                            </div>
                            
                            {/* Search Results Dropdown */}
                            <AnimatePresence>
                                {searchFocused && searchTerm && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
                                    >
                                        <div className="p-2">
                                            <div className="px-3 py-2 text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
                                                Suggested Results
                                            </div>
                                            {filteredSermons.slice(0, 5).map(sermon => (
                                                <Link 
                                                    key={sermon.id}
                                                    href={`/sermon?sermonId=${sermon.id}`}
                                                    className="block px-3 py-3 hover:bg-primary/5 rounded-lg transition-colors duration-200"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-12 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded flex items-center justify-center flex-shrink-0">
                                                            <AudioLines className="h-5 w-5 text-primary/50" />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <h4 className="font-medium text-foreground">{sermon.title}</h4>
                                                            <p className="text-sm text-muted-foreground mt-0.5">
                                                                {sermon.speaker} • {sermon.series}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground/60 mt-1">{sermon.date}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                            {searchTerm && filteredSermons.length === 0 && (
                                                <div className="px-3 py-8 text-center text-muted-foreground/60">
                                                    <p className="text-sm">No messages found for "{searchTerm}"</p>
                                                    <p className="text-xs mt-2">Try different keywords or browse all messages below</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            {/* Search Context Overlay */}
                            <AnimatePresence>
                                {searchFocused && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="fixed inset-0 bg-black/20 -z-10"
                                        onClick={() => setSearchFocused(false)}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                        
                        {/* Quick Filter Pills */}
                        <motion.div 
                            className="flex flex-wrap gap-2 justify-center mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {['Grace', 'Hope', 'Faith', 'Love', 'Purpose', 'Peace'].map(topic => (
                                <button
                                    key={topic}
                                    onClick={() => setSearchTerm(topic)}
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-white/50 hover:bg-white rounded-full transition-all duration-200 hover:shadow-md"
                                >
                                    {topic}
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Section 3: Recent Messages */}
                <section className="container mx-auto px-4 py-12">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredSermons.map(sermon => (
                           <Link key={sermon.id} href={`/sermon?sermonId=${sermon.id}`} passHref>
                                <SermonCard sermon={sermon} className="h-full" />
                           </Link>
                        ))}
                    </div>
                </section>

                {/* Section 4: Pagination */}
                <section className="container mx-auto px-4 pb-12">
                    <div className="flex justify-center items-center gap-1">
                        <Button 
                            variant="ghost" 
                            size="icon"
                            disabled={page === 1} 
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            <ChevronDown className="h-4 w-4 rotate-90" />
                        </Button>
                        
                        {[...Array(5)].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                                <Button
                                    key={pageNum}
                                    variant={page === pageNum ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setPage(pageNum)}
                                    className={cn(
                                        "min-w-[40px]",
                                        page === pageNum && "pointer-events-none"
                                    )}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                        
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setPage(p => p + 1)}
                        >
                            <ChevronDown className="h-4 w-4 -rotate-90" />
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}

    