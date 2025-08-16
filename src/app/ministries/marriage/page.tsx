
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SermonCard } from '@/components/shared/sermon-card';

const relatedContent = [
    { id: 12, type: 'Sermon', title: 'Two Become One', speaker: 'Dr. Evelyn Reed', date: 'July 22, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
    { id: 2, type: 'Article', title: '5 Communication Habits for a Healthier Relationship', image: 'https://placehold.co/600x400' },
    { id: 3, type: 'Podcast', title: 'Navigating Conflict with Grace', image: 'https://placehold.co/600x400' },
    { id: 15, type: 'Sermon', title: 'The Strongest Weakness', speaker: 'Dr. Evelyn Reed', date: 'October 1, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a' },
    { id: 5, type: 'Article', title: 'The Art of Forgiveness in Marriage', image: 'https://placehold.co/600x400' },
];

const upcomingEvents = [
    { id: 1, title: 'Marriage Enrichment Weekend', date: 'Nov 8-10, 2024', image: 'https://placehold.co/600x400' },
    { id: 2, title: 'Date Night Challenge Kick-off', date: 'Dec 5, 2024', image: 'https://placehold.co/600x400' },
    { id: 3, title: 'Parenting & Partnership Workshop', date: 'Jan 18, 2025', image: 'https://placehold.co/600x400' },
];

const testimonials = [
    {
        name: 'David & Sarah',
        quote: "This group became the family we didn't even know we needed.",
        story: "When we first joined, we were struggling to connect amidst the chaos of parenting young children. The Marriage Hub gave us practical tools, but more importantly, it gave us a community that understood. We found friends who prayed with us, laughed with us, and reminded us that we weren't alone. It's transformed not just our marriage, but our entire family life.",
        image: 'https://placehold.co/200x200'
    },
    {
        name: 'Marcus & Chloe',
        quote: "We learned how to fight for our marriage, not just in it.",
        story: "Conflict used to be something we avoided at all costs, which meant a lot of issues went unresolved. The workshops here taught us how to communicate with honesty and grace. It wasn't easy, but learning to navigate disagreements constructively has made our bond stronger than ever. We're more in love now than we were on our wedding day.",
        image: 'https://placehold.co/200x200'
    }
];

export default function MarriageMinistryPage() {
    return (
        <div className="bg-background text-foreground min-h-screen">
            {/* Section 1: The Arrival - Hero */}
            <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
                <Image
                    src="https://placehold.co/1600x900/1a2a1a/f5f5f0"
                    alt="Warm, authentic shot of diverse couples laughing together"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-50"
                    data-ai-hint="happy diverse couples"
                    priority
                />
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="font-headline text-5xl md:text-7xl font-bold drop-shadow-lg"
                    >
                        Building a Love That Lasts
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md"
                    >
                        Guidance and community for every stage of your journey together.
                    </motion.p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16 md:py-24 space-y-24 md:space-y-32">
                {/* Section 2: The Mission */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-2">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">Our Commitment to You</h2>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            We believe that marriage, as a covenant designed by God, is one of the most powerful reflections of His love for us. Our mission is to equip couples with the tools, support, and community needed to build strong, resilient, and joy-filled marriages that last a lifetime and honor God. We are here to walk with you through every season—the sunny days and the stormy ones—reminding you of the grace and hope available in Christ.
                        </p>
                    </div>
                    <Card className="p-6 shadow-lg">
                        <CardContent className="flex flex-col items-center text-center p-0">
                            <Avatar className="w-24 h-24 mb-4">
                                <AvatarImage src="https://placehold.co/200x200" alt="Dr. Evelyn and James Reed" />
                                <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                            <h3 className="font-bold text-xl text-primary">Dr. Evelyn & James Reed</h3>
                            <p className="text-muted-foreground">Marriage Ministry Leaders</p>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 3: The Heartbeat (Testimonials) */}
                <section>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center mb-12">Stories From Our Community</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {testimonials.map((testimonial, index) => (
                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <Card className="p-8 text-center flex flex-col items-center cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
                                        <CardContent className="p-0">
                                            <Image src={testimonial.image} alt={testimonial.name} width={100} height={100} className="rounded-full mx-auto mb-6" data-ai-hint="happy person portrait"/>
                                            <blockquote className="text-xl md:text-2xl font-headline italic text-foreground/90 leading-snug">
                                                "{testimonial.quote}"
                                            </blockquote>
                                            <p className="mt-4 font-semibold text-muted-foreground">- {testimonial.name}</p>
                                        </CardContent>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="font-headline text-3xl text-primary mb-4">{testimonial.name}'s Story</DialogTitle>
                                        <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                                            {testimonial.story}
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </section>

                {/* Section 4: Resource Library */}
                <section>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center mb-12">Wisdom for Your Walk</h2>
                    <Carousel opts={{ align: "start" }} className="w-full">
                        <CarouselContent className="-ml-4">
                            {relatedContent.map((item: any) => (
                                <CarouselItem key={item.id} className="pl-4 basis-4/5 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
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
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>
                </section>
                
                {/* Section 5: Upcoming Events */}
                <section>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center mb-12">What's Happening</h2>
                    <div className="flex overflow-x-auto gap-8 pb-4 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-3 md:mx-0 md:px-0">
                         {upcomingEvents.map((event) => (
                            <div key={event.id} className="w-80 flex-shrink-0 md:w-auto border rounded-lg overflow-hidden group">
                                <div className="aspect-video overflow-hidden">
                                     <Image src={event.image} alt={event.title} width={600} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="community event"/>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl text-primary">{event.title}</h3>
                                    <p className="text-muted-foreground mb-4">{event.date}</p>
                                    <Button variant="outline">Learn More & RSVP</Button>
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
                        Ready to take the next step in your journey together?
                    </h2>
                    <p className="text-lg text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
                        Whether you're looking for guidance, community, or simply a space to reconnect, we're here for you.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                            Schedule a Confidential Session
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
