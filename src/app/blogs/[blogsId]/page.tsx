
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { NewsletterSignup } from '@/components/shared/newsletter-signup';

// Mock Data - In a real app, this would be fetched
const blogPosts = [
    {
        id: 1,
        title: 'Grace Isn\'t Fair, and That\'s the Point',
        author: 'Dr. Evelyn Reed',
        authorImage: 'https://placehold.co/100x100',
        authorBio: 'Dr. Evelyn Reed is the lead pastor at Sanctuary, with a passion for unpacking complex theology in a way that connects with everyday life.',
        image: 'https://placehold.co/1600x900/cdb38b/f5f5f0',
        readTime: '5 min read',
        aiHint: 'abstract grace',
        content: `
            <p>We often struggle with the concept of grace because it defies our innate sense of fairness. We think in terms of transactions, of cause and effect, of getting what we deserve. But what if that's the very beauty of it? What if grace is meant to short-circuit our merit-based thinking and introduce us to a completely different economy?</p>
            <blockquote className="text-2xl font-style: italic text-center font-headline py-8">"Grace is not opposed to effort, it is opposed to earning."</blockquote>
            <p>Dallas Willard's quote cuts to the heart of the matter. The Christian life requires effort—discipline, prayer, service—but none of these things earn us God's favor. They are, instead, our response to the favor we have already freely received. They are how we train ourselves to live in the reality of the grace that is already ours.</p>
            <h3>The Scandal of Unmerited Favor</h3>
            <p>Consider the parable of the workers in the vineyard in Matthew 20. Those who worked all day in the scorching sun received the same wage as those who worked for a single hour. It’s a story that grates against our modern sensibilities. It isn’t fair! And the owner’s response is telling:</p>
            <blockquote className="border-l-4 border-primary pl-4 my-4">"Don’t I have the right to do what I want with my own money? Or are you envious because I am generous?" - Matthew 20:15</blockquote>
            <p>This is the scandal of grace. It is not a wage to be earned, but a gift to be received. It doesn’t just ignore the rules of fairness; it establishes a new and better rule: the rule of divine generosity. To live in grace is to accept that we are the eleventh-hour workers, forever surprised by the generosity of the vineyard owner.</p>
        `
    },
    // ... add other posts here
];

const relatedPosts = [
    { id: 2, title: 'When You Don\'t Feel Forgiven', image: 'https://placehold.co/600x400', aiHint: 'contemplative person' },
    { id: 3, title: 'The Three Words that Change Everything', image: 'https://placehold.co/600x400', aiHint: 'ancient scroll' },
    { id: 4, title: 'A Theology of Second Chances', image: 'https://placehold.co/600x400', aiHint: 'path forward' },
];

export default function BlogPostPage() {
    const params = useParams();
    const { blogsId } = params;

    const post = blogPosts.find(p => p.id === parseInt(blogsId as string));

    if (!post) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Post not found.</p>
            </div>
        );
    }
    
    // For now, progress is decorative. In a real app, you'd tie this to scroll position.
    const progress = 50; 

    return (
        <div className="bg-background text-foreground min-h-screen">
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-accent z-50"
                style={{ scaleX: progress / 100, transformOrigin: 'left' }}
            />
            
            <main>
                {/* Hero Section */}
                <header className="relative h-[60vh] w-full">
                    <Image 
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        data-ai-hint={post.aiHint}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="font-headline text-4xl md:text-6xl font-bold">{post.title}</h1>
                            <div className="mt-4 flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={post.authorImage} alt={post.author} />
                                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{post.author}</p>
                                    <p className="text-sm opacity-80">{post.readTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <article className="max-w-4xl mx-auto px-4 py-16 md:py-24">
                     <div 
                        className="prose lg:prose-xl max-w-none text-inherit prose-headings:font-headline prose-blockquote:border-accent prose-blockquote:text-inherit" 
                        dangerouslySetInnerHTML={{ __html: post.content }}
                     />
                </article>

                {/* Author Bio & Related Posts */}
                <footer className="bg-muted/50 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto px-4">
                        {/* Author Bio */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-border pb-12">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={post.authorImage} alt={post.author} />
                                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Written By</p>
                                <h4 className="text-2xl font-bold font-headline text-primary">{post.author}</h4>
                                <p className="mt-2 text-foreground/80">{post.authorBio}</p>
                            </div>
                        </div>

                        {/* Related Posts */}
                        <div className="mt-12">
                            <h3 className="text-2xl font-bold font-headline text-center mb-8">Continue Reading</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPosts.map(related => (
                                    <Card key={related.id} className="overflow-hidden group">
                                        <div className="relative aspect-video">
                                            <Image 
                                                src={related.image} 
                                                alt={related.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                data-ai-hint={related.aiHint}
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{related.title}</h4>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        
                        {/* Newsletter Signup */}
                        <div className="mt-24">
                            <NewsletterSignup />
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
