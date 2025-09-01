
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SermonCard } from '@/components/shared/sermon-card';
import {
  Share2,
  Download,
  PlayCircle,
  PauseCircle,
  Search,
  ArrowRight,
  X,
  BookOpen,
  Video,
  AudioLines,
  Headphones,
  Play,
} from 'lucide-react';
import Link from 'next/link';

interface Sermon {
    id: number;
    title: string;
    speaker: string;
    date: string;
    thumbnail: string;
    duration: number;
    notes: string;
    // transcript: TranscriptItem[];
    hint?: string;
    seriesId: number;
    seriesPart: number;
  }

  interface BlogPost {
    id: number;
    title: string;
    image: string;
    readTime: string;
  }

  interface PodcastEpisode {
    id: number;
    title: string;
    coverArt: string;
    duration: string;
}

interface Book {
    id: number;
    title: string;
    coverImage: string;
    chapter?: string;
}

const blogData: BlogPost[] = [
  { id: 1, title: 'Grace Isn\'t Fair, and That\'s the Point', image: '/images/blog.jpg', readTime: '5 min read', },
  { id: 2, title: 'When You Don\'t Feel Forgiven: A Practical Guide', image: '/images/blog.jpg', readTime: '7 min read', },
  { id: 3, title: 'The Three Words that Change Everything', image: '/images/blog.jpg', readTime: '4 min read', },
  { id: 4, title: 'A Theology of Second Chances', image: '/images/blog.jpg', readTime: '6 min read', },
];

const podcastData: PodcastEpisode[] = [
    { id: 1, title: 'Evelyn Reed on the Weight of Grace', coverArt: '/images/podcast.jpg', duration: '28 min listen' },
    { id: 2, title: 'How to Parent with Grace (and Not Lose Your Mind)', coverArt: '/images/podcast.jpg', duration: '45 min listen' },
    { id: 3, title: 'Roundtable: Grace, Justice, and the Modern Church', coverArt: '/images/podcast.jpg', duration: '52 min listen' },
    { id: 4, title: 'A Story of Radical Forgiveness', coverArt: '/images/podcast.jpg', duration: '18 min listen' },
];

const bookData: Book[] = [
    { id: 1, title: 'The Echo of Grace', coverImage: '/images/book.jpg', chapter: 'Chapter 1: The First Sound' },
    { id: 2, title: 'Hope in the Ruins', coverImage: '/images/book.jpg', },
    { id: 3, title: 'A Faith That Lasts', coverImage: '/images/book.jpg', chapter: 'Chapter 5: Everyday Mercy' },
];
  
  const relatedPulpitData: Sermon[] = [
      { id: 10, title: 'Beyond Deserving', speaker: 'Rev. Michael Chen', date: 'May 14, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2500, notes: '', seriesId: 2, seriesPart: 1, hint: 'grace abstract' },
      { id: 11, title: 'The Currency of Heaven', speaker: 'Pastor Sarah Jones', date: 'June 1, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2900, notes: '', seriesId: 3, seriesPart: 1, hint: 'heavenly light' },
      { id: 12, title: 'Held, Not Perfect', speaker: 'Dr. Evelyn Reed', date: 'July 22, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2600, notes: '', seriesId: 4, seriesPart: 1, hint: 'gentle hands' },
      { id: 13, title: 'The Scandal of Mercy', speaker: 'Rev. Michael Chen', date: 'August 5, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 3100, notes: '', seriesId: 2, seriesPart: 2, hint: 'mercy justice' },
      { id: 14, title: 'Freely Given, Freely Give', speaker: 'Pastor Sarah Jones', date: 'September 10, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2400, notes: '', seriesId: 3, seriesPart: 2, hint: 'giving hands' },
      { id: 15, title: 'The Strongest Weakness', speaker: 'Dr. Evelyn Reed', date: 'October 1, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2750, notes: '', seriesId: 4, seriesPart: 2, hint: 'strength hope' },
      { id: 16, title: 'Grace in the Ruins', speaker: 'Rev. Michael Chen', date: 'October 15, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2850, notes: '', seriesId: 2, seriesPart: 3, hint: 'ruins hope' },
    ];

const relatedContent = [
    { id: 19, type: 'Sermon', title: 'Rise Up', speaker: 'Guest Speaker', date: 'June 10, 2023' },
    { id: 2, type: 'Article', title: 'Youth Night Recap: Glow Stick Takeover', image: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
    { id: 3, type: 'Podcast', title: 'Tackling Peer Pressure', image: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
    { id: 4, type: 'Sermon', title: 'Purpose Over Popularity', speaker: 'Pastor Sarah Jones', date: 'May 20, 2023' },
    { id: 5, type: 'Article', title: 'How to Read Your Bible and Actually Like It', image: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
];

const upcomingEvents = [
    { id: 1, title: 'Wednesday Night Live', date: 'Every Wednesday @ 7PM', image: '/images/youth-hero.jpg' },
    { id: 2, title: 'All-Nighter Lock-in', date: 'Oct 25, 2024', image: '/images/youth-hero.jpg' },
    { id: 3, title: 'Summer Camp Sign-ups Open!', date: 'Nov 1, 2024', image: '/images/youth-hero.jpg' },
];


const testimonials = [
    {
        name: 'Ethan',
        quote: "This isn't just a youth group, it's a family. I finally found a place where I belong.",
        image: '/images/pastor.jpg'
    },
    {
        name: 'Maya',
        quote: "I used to be so quiet. Being here has given me the confidence to be myself and use my voice.",
        image: '/images/pastor.jpg'
    }
];

export default function YouthMinistryPage() {
    return (
        <div className="mt-20 bg-background text-foreground min-h-screen">
            {/* Section 1: The Arrival - Hero */}
            <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
                <Image
                    src="/images/youth-hero.jpg"
                    alt="Energetic youth worship service"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-75"
                    data-ai-hint="energetic youth worship"
                    priority
                />
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="font-headline text-5xl md:text-7xl font-bold drop-shadow-lg"
                    >
                        Find Your Crew. Find Your Purpose.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md"
                    >
                        A place to belong, grow, and make a difference.
                    </motion.p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16 md:py-24 space-y-24 md:space-y-32">
                {/* Section 2: The Mission */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-2">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">This Is Your Place</h2>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            We're all about creating a space where you can be yourself, ask the tough questions, and build real friendships. Life's complicated, but you don't have to figure it all out alone. We believe God has an incredible purpose for your life, and we want to help you discover it and live it out loud, right here, right now.
                        </p>
                    </div>
                    <Card className="p-6 shadow-lg">
                        <CardContent className="flex flex-col items-center text-center p-0">
                            <Avatar className="w-24 h-24 mb-4">
                                <AvatarImage src="/images/pastor.jpg" alt="Pastor Sarah Jones" />
                                <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <h3 className="font-bold text-xl text-primary">Pastor Sarah Jones</h3>
                            <p className="text-muted-foreground">Youth Ministry Leader</p>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 3: The Heartbeat (Testimonials) */}
                <section>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center mb-12">Straight From the Source</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {testimonials.map((testimonial, index) => (
                             <Card key={index} className="p-8 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
                                <CardContent className="p-0">
                                    <Image src={testimonial.image} alt={testimonial.name} width={100} height={100} className="rounded-full mx-auto mb-6" data-ai-hint="happy teenager portrait"/>
                                    <blockquote className="text-xl md:text-2xl font-headline italic text-foreground/90 leading-snug">
                                        "{testimonial.quote}"
                                    </blockquote>
                                    <p className="mt-4 font-semibold text-muted-foreground">- {testimonial.name}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Section 4: Resource Library */}
                 <section className="mt-24 py-24 bg-muted/30">
                            <div className="container mx-auto px-4">
                                <h2 className="font-headline text-4xl font-bold text-primary mb-16 text-center">
                                    Explore More on Youth
                                </h2>
                
                                {/* Shelf 1: More from the Pulpit */}
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-6">More from the Pulpit</h3>
                                    <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
                                        {relatedPulpitData.map((item) => (
                                            <div key={item.id} className="flex-shrink-0 w-80 md:w-1/3 lg:w-1/4">
                                               <Link href={`/sermon?sermonId=${item.id}`} passHref>
                                               <SermonCard sermon={item}  />
                                               </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                
                                 {/* Shelf 2: Deeper Readings */}
                                 <div className="mt-32">
                                    <h3 className="text-2xl font-bold text-foreground mb-6">Deeper Readings</h3>
                                    <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-hide">
                                        {blogData.map((post) => (
                                            <motion.div 
                                                key={post.id} 
                                                className="flex-shrink-0 w-96 lg:w-[480px]"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="relative overflow-hidden rounded-lg cursor-pointer h-full shadow-md hover:shadow-xl transition-all duration-300 group">
                                                    <div className="aspect-[8/6] relative">
                                                        <Image 
                                                            src={post.image} 
                                                            alt={post.title} 
                                                            fill
                                                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                                            data-ai-hint="reading book"
                                                        />
                                                        
                                                        {/* Hover Gradient Overlay */}
                                                        <motion.div 
                                                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        />
                                                        
                                                        {/* Title and Read Time - Hidden by default, shown on hover */}
                                                        <motion.div 
                                                            className="absolute bottom-0 left-0 p-6 text-white"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            whileHover={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.3, delay: 0.1 }}
                                                        >
                                                            <h3 className="font-bold text-xl">{post.title}</h3>
                                                            <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                                                                <BookOpen size={16}/>
                                                                <span>{post.readTime}</span>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                
                                {/* Shelf 3: Continue the Conversation */}
                                <div className="mt-32">
                                    <h3 className="text-2xl font-bold text-foreground mb-6">Continue the Conversation</h3>
                                     <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-hide">
                                        {podcastData.map((episode) => (
                                            <motion.div 
                                                key={episode.id} 
                                                className="flex-shrink-0 w-72"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 group">
                                                    <Image 
                                                        src={episode.coverArt} 
                                                        alt={episode.title} 
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                                        data-ai-hint="podcast microphone"
                                                    />
                                                    
                                                    {/* Dark Overlay on Hover */}
                                                    <motion.div 
                                                        className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    />
                                                    
                                                    {/* Play Icon - Hidden by default, shown on hover */}
                                                    <motion.div 
                                                        className="absolute inset-0 flex flex-col items-center justify-center text-white"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileHover={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.1 }}
                                                    >
                                                        <div className="bg-accent rounded-full p-4 mb-4">
                                                            <Play size={32} fill="white" className="ml-1" />
                                                        </div>
                                                        <h3 className="font-bold text-lg text-center px-4 line-clamp-2">{episode.title}</h3>
                                                        <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                                                            <Headphones size={16} />
                                                            <span>{episode.duration}</span>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                
                                 {/* Shelf 4: From Our Library */}
                                <div className="mt-32 mb-8">
                                    <h3 className="text-2xl font-bold text-foreground mb-6">From Our Library</h3>
                                    <div className="flex overflow-x-auto space-x-8 pb-4 -mx-4 px-4 scrollbar-hide">
                                        {bookData.map((book) => (
                                            <motion.div 
                                                key={book.id} 
                                                className="flex-shrink-0 w-56"
                                                whileHover={{ scale: 1.05, z: 10 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="relative cursor-pointer group">
                                                    <div className="book-3d-container relative">
                                                        <Image 
                                                            src={book.coverImage} 
                                                            alt={book.title} 
                                                            width={400} 
                                                            height={600} 
                                                            className="w-full h-auto object-contain rounded-r-sm shadow-2xl" 
                                                            data-ai-hint="book cover"
                                                        />
                                                        
                                                        {/* Dark Overlay with Book Info on Hover */}
                                                        <motion.div 
                                                            className="absolute inset-0 bg-black/80 rounded-r-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                                                            initial={{ opacity: 0 }}
                                                            whileHover={{ opacity: 1 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <h3 className="font-bold text-xl text-white mb-2">{book.title}</h3>
                                                            <p className="text-white/80 text-sm mb-3">by Dr. Evelyn Reed</p>
                                                            <p className="text-white/70 text-xs line-clamp-3">
                                                                A profound exploration of grace that echoes through every aspect of our lives, 
                                                                revealing how God's unmerited favor transforms our past, present, and future.
                                                            </p>
                                                            {book.chapter && <p className="text-accent text-sm mt-3 font-medium">{book.chapter}</p>}
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                
                            </div>
                        </section>
                
                {/* Section 5: Upcoming Events */}
                <section>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center mb-12">What's Going Down</h2>
                    <div className="flex overflow-x-auto gap-8 pb-4 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-3 md:mx-0 md:px-0">
                         {upcomingEvents.map((event) => (
                            <div key={event.id} className="w-80 flex-shrink-0 md:w-auto border rounded-lg overflow-hidden group">
                                <div className="aspect-video overflow-hidden">
                                     <Image src={event.image} alt={event.title} width={600} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="community event"/>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl text-primary">{event.title}</h3>
                                    <p className="text-muted-foreground mb-4">{event.date}</p>
                                    <Button variant="outline">Get the Deets</Button>
                                </div>
                            </div>
                         ))}
                    </div>
                </section>
            </main>

            {/* Section 6: Call to Action */}
            <section className="bg-primary py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-headline text-4xl font-bold text-primary-foreground">
                        Ready to get in the game?
                    </h2>
                    <p className="text-lg text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
                        Don't just sit on the sidelines. Your story is part of our story. Come hang out.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                           Join Us This Wednesday!
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
