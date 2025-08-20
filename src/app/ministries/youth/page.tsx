
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SermonCard } from '@/components/shared/sermon-card';


const relatedContent = [
    { id: 19, type: 'Sermon', title: 'Rise Up', speaker: 'Guest Speaker', date: 'June 10, 2023' },
    { id: 2, type: 'Article', title: 'Youth Night Recap: Glow Stick Takeover', image: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
    { id: 3, type: 'Podcast', title: 'Tackling Peer Pressure', image: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
    { id: 4, type: 'Sermon', title: 'Purpose Over Popularity', speaker: 'Pastor Sarah Jones', date: 'May 20, 2023' },
    { id: 5, type: 'Article', title: 'How to Read Your Bible and Actually Like It', image: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
];

const upcomingEvents = [
    { id: 1, title: 'Wednesday Night Live', date: 'Every Wednesday @ 7PM', image: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
    { id: 2, title: 'All-Nighter Lock-in', date: 'Oct 25, 2024', image: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
    { id: 3, title: 'Summer Camp Sign-ups Open!', date: 'Nov 1, 2024', image: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
];

const testimonials = [
    {
        name: 'Ethan',
        quote: "This isn't just a youth group, it's a family. I finally found a place where I belong.",
        image: 'https://placehold.co/200x200'
    },
    {
        name: 'Maya',
        quote: "I used to be so quiet. Being here has given me the confidence to be myself and use my voice.",
        image: 'https://placehold.co/200x200'
    }
];

export default function YouthMinistryPage() {
    return (
        <div className="mt-20 bg-background text-foreground min-h-screen">
            {/* Section 1: The Arrival - Hero */}
            <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
                <Image
                    src="https://placehold.co/1600x900/a7d1ab/1a2a1a"
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
                                <AvatarImage src="https://placehold.co/200x200" alt="Pastor Sarah Jones" />
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
                <section>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center mb-12">Stuff to Check Out</h2>
                    <div className="flex overflow-x-auto gap-8 pb-4 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:mx-0 md:px-0">
                        {relatedContent.map((item: any) => (
                             <div key={item.id} className="w-80 flex-shrink-0 md:w-auto">
                                {item.type === 'Sermon' ? (
                                    <SermonCard sermon={item} className="h-full" />
                                ) : (
                                    <Card className="overflow-hidden group h-full">
                                        <CardContent className="p-0">
                                            <div className="aspect-video relative">
                                                <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint="abstract spiritual art"/>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm font-semibold text-accent">{item.type}</p>
                                                <h3 className="font-bold text-lg mt-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        ))}
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
