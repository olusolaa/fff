
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NewsletterSignup } from '@/components/shared/newsletter-signup';

interface Post {
    id: number;
    title: string;
    author: string;
    image: string;
    snippet: string;
    readTime: string;
    aiHint: string;
}

const blogPosts: Post[] = [
    {
        id: 1,
        title: 'Grace Isn\'t Fair, and That\'s the Point',
        author: 'Dr. Evelyn Reed',
        image: '/images/blog.webp',
        snippet: 'We often struggle with the concept of grace because it defies our innate sense of fairness. But what if that\'s the very beauty of it? This post explores the radical, unmerited nature of grace.',
        readTime: '5 min read',
        aiHint: 'abstract grace'
    },
    {
        id: 2,
        title: 'When You Don\'t Feel Forgiven: A Practical Guide',
        author: 'Rev. Michael Chen',
        image: '/images/blog.webp',
        snippet: 'The gap between knowing you are forgiven and feeling it can be a canyon. Here are three practical steps to bridge that divide and walk in the freedom Christ offers.',
        readTime: '7 min read',
        aiHint: 'contemplative person'
    },
    {
        id: 3,
        title: 'The Three Words that Change Everything',
        author: 'Pastor Sarah Jones',
        image: '/images/blog.webp',
        snippet: 'Three simple words spoken by Jesus on the cross hold the power to reframe our entire existence. Let\'s unpack the depth and power of "It is finished."',
        readTime: '4 min read',
        aiHint: 'ancient scroll'
    },
    {
        id: 4,
        title: 'A Theology of Second Chances',
        author: 'Dr. Evelyn Reed',
        image: '/images/blog.webp',
        snippet: 'From David to Peter, scripture is filled with stories of failure and restoration. This is not an accident; it\'s a core tenet of the Gospel narrative. God is a God of the second chance.',
        readTime: '6 min read',
        aiHint: 'path forward'
    },
];


const FeaturedPost = ({ post }: { post: Post }) => (
    <Link href={`/blogs/${post.id}`} passHref>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center group cursor-pointer">
            <div className="relative aspect-video md:aspect-[4/3] rounded-xl overflow-hidden">
                <Image 
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint={post.aiHint}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-accent font-semibold mb-2">Featured Story</p>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">{post.title}</h2>
                <p className="mt-4 text-base text-foreground/80">{post.snippet}</p>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                </div>
            </div>
        </div>
    </Link>
);

const PostCard = ({ post }: { post: Post }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
    >
        <Link href={`/blogs/${post.id}`} passHref>
            <div className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                     <Image 
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={post.aiHint}
                    />
                </div>
                <h3 className="font-headline text-xl font-bold text-primary group-hover:text-accent transition-colors">{post.title}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                </div>
            </div>
        </Link>
    </motion.div>
)

export default function BlogPage() {
    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

    return (
        <div className="bg-background text-foreground min-h-screen">
            <main className="mt-20 container mx-auto px-4 py-16 md:py-24">
                <header className="text-center mb-16 md:mb-24">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">The Reading Room</h1>
                    <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">A quiet, well-lit space for reflection and growth. Settle in and explore the thoughts behind the messages.</p>
                </header>

                <section className="mb-24">
                    <FeaturedPost post={featuredPost} />
                </section>
                
                <div className="h-px w-full bg-border my-16 md:my-24"></div>

                <section>
  <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-12 text-center">
    Latest Posts
  </h2>

  <div
    className="
      flex overflow-x-auto gap-6 -mx-4 px-4 pb-6
      sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8 sm:gap-y-16 sm:mx-0 sm:px-0 sm:pb-0
      scrollbar-hide
    "
  >
    {otherPosts.map((post) => (
      <div key={post.id} className="flex-shrink-0 w-80 sm:w-auto">
        <PostCard post={post} />
      </div>
    ))}
  </div>
</section>


                <div className="h-px w-full bg-border my-16 md:my-24"></div>

                <section className="max-w-3xl mx-auto">
                    <NewsletterSignup />
                </section>
            </main>
        </div>
    );
}
