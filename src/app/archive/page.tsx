
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { SermonCard } from '@/components/shared/sermon-card';
import Link from 'next/link';

// Mock Data - Replace with your actual data fetching logic
const currentSeries = {
    title: 'The Echo of Grace',
    description: 'This series explores the profound and persistent nature of God\'s grace. It\'s not a one-time event, but a continuous, resonant echo that shapes our past, present, and future.',
    graphic: 'https://placehold.co/1600x900/1a2a1a/f5f5f0',
    latestSermonId: 1,
};

const allSermons = [
  { id: 1, title: 'The Echo of Grace', speaker: 'Dr. Evelyn Reed', date: 'Oct 26, 2023', series: 'The Echo of Grace', thumbnail: 'https://placehold.co/600x400', duration: 2714, notes: '', transcript: [], seriesId: 1, seriesPart: 1 },
  { id: 2, title: 'The Unfailing Compass', speaker: 'Dr. Evelyn Reed', date: 'Nov 2, 2023', series: 'The Echo of Grace', thumbnail: 'https://placehold.co/600x400', duration: 2650, notes: '', transcript: [], seriesId: 1, seriesPart: 2 },
  { id: 3, title: 'The Lavish Banquet', speaker: 'Dr. Evelyn Reed', date: 'Nov 9, 2023', series: 'The Echo of Grace', thumbnail: 'https://placehold.co/600x400', duration: 2800, notes: '', transcript: [], seriesId: 1, seriesPart: 3 },
  { id: 10, title: 'Beyond Deserving', speaker: 'Rev. Michael Chen', date: 'May 14, 2023', series: 'Foundations', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2500, notes: '', transcript: [], seriesId: 2, seriesPart: 1 },
  { id: 11, title: 'The Currency of Heaven', speaker: 'Pastor Sarah Jones', date: 'June 1, 2023', series: 'Kingdom Economics', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2900, notes: '', transcript: [], seriesId: 3, seriesPart: 1 },
  { id: 12, title: 'Held, Not Perfect', speaker: 'Dr. Evelyn Reed', date: 'July 22, 2023', series: 'Paradox', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2600, notes: '', transcript: [], seriesId: 4, seriesPart: 1 },
  { id: 13, title: 'The Scandal of Mercy', speaker: 'Rev. Michael Chen', date: 'August 5, 2023', series: 'Foundations', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 3100, notes: '', transcript: [], seriesId: 2, seriesPart: 2 },
  { id: 14, title: 'Freely Given, Freely Give', speaker: 'Pastor Sarah Jones', date: 'September 10, 2023', series: 'Kingdom Economics', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2400, notes: '', transcript: [], seriesId: 3, seriesPart: 2 },
  { id: 15, title: 'The Strongest Weakness', speaker: 'Dr. Evelyn Reed', date: 'October 1, 2023', series: 'Paradox', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2750, notes: '', transcript: [], seriesId: 4, seriesPart: 2 },
  { id: 16, title: 'Grace in the Ruins', speaker: 'Rev. Michael Chen', date: 'October 15, 2023', series: 'Foundations', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2850, notes: '', transcript: [], seriesId: 2, seriesPart: 3 },
];

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
)


export default function SermonArchivePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        series: [],
        speaker: [],
        book: [],
        year: [],
    });

    // In a real app, filtering logic would be more robust.
    const filteredSermons = allSermons.filter(sermon => 
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // In a real app, these would be dynamically generated from your data.
    const seriesOptions = [...new Set(allSermons.map(s => s.series))];
    const speakerOptions = [...new Set(allSermons.map(s => s.speaker))];
    const yearOptions = [...new Set(allSermons.map(s => new Date(s.date).getFullYear().toString()))].sort().reverse();


    return (
        <div className="bg-background text-foreground min-h-screen">
            <main>
                {/* Section 1: Featured Current Series */}
                <section className="bg-muted/30">
                    <div className="container mx-auto px-4 py-12 md:py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1">
                                <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-primary">{currentSeries.title}</h1>
                                <p className="mt-4 text-lg text-foreground/80 max-w-xl">{currentSeries.description}</p>
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

                {/* Section 2: Search & Filter Bar */}
                <section className="container mx-auto px-4 py-8 sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Input 
                                placeholder="Search messages by topic or scripture..." 
                                className="pl-10 h-12 text-base" 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                           <FilterDropdown title="Series" options={seriesOptions} selected={filters.series} onSelectedChange={() => {}}/>
                           <FilterDropdown title="Speaker" options={speakerOptions} selected={filters.speaker} onSelectedChange={() => {}}/>
                           <FilterDropdown title="Book" options={["Genesis", "Exodus", "Psalms", "John"]} selected={filters.book} onSelectedChange={() => {}}/>
                           <FilterDropdown title="Year" options={yearOptions} selected={filters.year} onSelectedChange={() => {}}/>
                        </div>
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
                    <div className="flex justify-center items-center gap-2">
                        <Button variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                        <Button variant="ghost" disabled>{page}</Button>
                        <Button variant="outline" onClick={() => setPage(p => p + 1)}>Next</Button>
                    </div>
                </section>
            </main>
        </div>
    );
}

    