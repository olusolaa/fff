
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

import { useSearchParams } from 'next/navigation';


// Mock Data - Replace with your actual data fetching logic
const currentSeries = {
    title: 'The Echo of Grace',
    description: 'This series explores the profound and persistent nature of God\'s grace. It\'s not a one-time event, but a continuous, resonant echo that shapes our past, present, and future.',
    graphic: 'https://placehold.co/1600x900/1a2a1a/f5f5f0',
    latestSermonId: 1,
};

const allSermons = [

  { id: 1, title: 'The Echo of Grace', speaker: 'Dr. Evelyn Reed', date: 'Oct 26, 2023', series: 'The Echo of Grace', thumbnail: 'https://placehold.co/600x400', duration: 2714, notes: '', transcript: [], seriesId: 1, seriesPart: 1, category: 'Discipleship Class' },
  { id: 2, title: 'The Unfailing Compass', speaker: 'Dr. Evelyn Reed', date: 'Nov 2, 2023', series: 'The Echo of Grace', thumbnail: 'https://placehold.co/600x400', duration: 2650, notes: '', transcript: [], seriesId: 1, seriesPart: 2, category: 'Discipleship Class' },
  { id: 3, title: 'The Lavish Banquet', speaker: 'Dr. Evelyn Reed', date: 'Nov 9, 2023', series: 'The Echo of Grace', thumbnail: 'https://placehold.co/600x400', duration: 2800, notes: '', transcript: [], seriesId: 1, seriesPart: 3, category: 'Discipleship Class' },
  { id: 10, title: 'Beyond Deserving', speaker: 'Rev. Michael Chen', date: 'May 14, 2023', series: 'Foundations', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2500, notes: '', transcript: [], seriesId: 2, seriesPart: 1, category: 'Discipleship Class' },
  { id: 11, title: 'Navigating Singleness with Purpose', speaker: 'Pastor Sarah Jones', date: 'June 1, 2023', series: 'Kingdom Economics', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2900, notes: '', transcript: [], seriesId: 3, seriesPart: 1, category: 'Singles Club' },
  { id: 12, title: 'Two Become One', speaker: 'Dr. Evelyn Reed', date: 'July 22, 2023', series: 'Paradox', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2600, notes: '', transcript: [], seriesId: 4, seriesPart: 1, category: 'Marriage Forum' },
  { id: 13, title: 'The Scandal of Mercy', speaker: 'Rev. Michael Chen', date: 'August 5, 2023', series: 'Foundations', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 3100, notes: '', transcript: [], seriesId: 2, seriesPart: 2, category: 'Others' },
  { id: 14, title: 'God\'s Design for the Family', speaker: 'Pastor Sarah Jones', date: 'September 10, 2023', series: 'Kingdom Economics', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2400, notes: '', transcript: [], seriesId: 3, seriesPart: 2, category: 'Family Life' },
  { id: 15, title: 'The Strongest Weakness', speaker: 'Dr. Evelyn Reed', date: 'October 1, 2023', series: 'Paradox', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2750, notes: '', transcript: [], seriesId: 4, seriesPart: 2, category: 'Others' },
  { id: 16, title: 'Grace in the Ruins', speaker: 'Rev. Michael Chen', date: 'October 15, 2023', series: 'Foundations', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2850, notes: '', transcript: [], seriesId: 2, seriesPart: 3, category: 'Others' },
  { id: 17, title: 'The Godly Man', speaker: 'Rev. Michael Chen', date: 'October 22, 2023', series: 'Foundations', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2850, notes: '', transcript: [], seriesId: 2, seriesPart: 4, category: 'Family Life' },
  { id: 18, title: 'The Virtuous Woman', speaker: 'Dr. Evelyn Reed', date: 'October 29, 2023', series: 'Paradox', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2750, notes: '', transcript: [], seriesId: 4, seriesPart: 3, category: 'Family Life' },
  { id: 19, title: 'Rise Up', speaker: 'Guest Speaker', date: 'June 10, 2023', series: 'Youth Rally', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 3200, notes: '', transcript: [], seriesId: 5, seriesPart: 1, category: 'Youth' },
];

const sermonCategories = ["Discipleship Class", "Singles Club", "Marriage Forum", "Family Life", "Youth", "Others"];

const FilterDropdown = ({ title, options, selected, onSelectedChange }: any) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
                {title} <ChevronDown className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {options.map((option: string) => (
                <DropdownMenuCheckboxItem
                    key={option}
                    checked={selected.includes(option)}
                    onCheckedChange={() => onSelectedChange(option)}
                >
                    {option}
                </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);

const SermonShelf = ({ title, sermons }: { title: string, sermons: any[] }) => {
    if (sermons.length === 0) return null;

    return (
        <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-foreground/80 font-headline mb-4">{title}</h2>
            <div className="flex overflow-x-auto gap-8 pb-4 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:mx-0 md:px-0">
                {sermons.map(sermon => (
                    <div key={sermon.id} className="w-80 flex-shrink-0 md:w-auto">
                        <Link href={`/?sermonId=${sermon.id}`} passHref>
                            <SermonCard sermon={sermon} className="h-full" />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

function SermonArchivePageContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category');
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        series: [],
        speaker: [],
        book: [],
        year: [],
    });

    const getFilteredSermons = (category: string) => {
        return allSermons.filter(sermon => 
            sermon.category === category &&
            (sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }
    
    const allFilteredSermons = allSermons.filter(sermon =>
        (sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()))

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
                
                {/* Sermon Categories */}
                 <div className="py-8">
                    {initialCategory ? (
                         <SermonShelf 
                            title={initialCategory}
                            sermons={getFilteredSermons(initialCategory)}
                         />
                    ) : (
                        sermonCategories.map(category => (
                            <SermonShelf 
                                key={category}
                                title={category}
                                sermons={getFilteredSermons(category)}
                            />
                        ))
                    )}
                 </div>


            </main>
        </div>
    );
}


export default function SermonArchivePage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <SermonArchivePageContent />
        </React.Suspense>
    )
}

    