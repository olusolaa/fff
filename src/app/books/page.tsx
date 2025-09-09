
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';


interface Book {
    id: number;
    title: string;
    author: string;
    coverImage: string;
    synopsis: string;
    aiHint: string;
    shelf: 'featured' | 'new_releases' | 'essential_reading';
}

const libraryBooks: Book[] = [
    {
        id: 1,
        title: 'The Anchor in the Storm',
        author: 'Dr. Evelyn Reed',
        coverImage: "/images/book.jfif",
        aiHint: 'book cover anchor',
        synopsis: 'A profound exploration of finding steadfastness in faith during life\'s most turbulent seasons. This book offers practical wisdom and spiritual guidance to anchor your soul in unwavering hope.',
        shelf: 'featured',
    },
    {
        id: 5,
        title: 'Echoes of Grace',
        author: 'Dr. Evelyn Reed',
        coverImage: 'https://placehold.co/400x600/1a2a1a/f5f5f0',
        aiHint: 'book cover grace',
        synopsis: 'Explore the resonant and persistent nature of God\'s grace. This book will help you see how grace is not a single event, but a continuous echo shaping your entire life.',
        shelf: 'featured',
    },
    {
        id: 4,
        title: 'Beautiful Paradox',
        author: 'Dr. Evelyn Reed',
        coverImage: 'https://placehold.co/400x600/cdb38b/1a2a1a',
        aiHint: 'book cover paradox',
        synopsis: 'The Christian journey is filled with beautiful contradictions: finding strength in weakness, life in death, and wisdom in foolishness. This book dives into these profound mysteries.',
        shelf: 'featured',
    },
    {
        id: 2,
        title: 'Foundations of Faith',
        author: 'Rev. Michael Chen',
        coverImage: 'https://placehold.co/400x600/a7d1ab/1a2a1a',
        aiHint: 'book cover foundations',
        synopsis: 'Returning to the essentials, this book unpacks the core tenets of Christian belief. A must-read for both new believers and seasoned saints looking to solidify their spiritual bedrock.',
        shelf: 'essential_reading',
    },
     {
        id: 6,
        title: 'A Faith That Lasts',
        author: 'Rev. Michael Chen',
        coverImage: 'https://placehold.co/400x600/a7d1ab/1a2a1a',
        aiHint: 'book cover faith',
        synopsis: 'In a world of constant change, how do we cultivate a faith that endures? This book provides a roadmap for building a resilient and lifelong relationship with God.',
        shelf: 'essential_reading',
    },
    {
        id: 3,
        title: 'The Generous Kingdom',
        author: 'Pastor Sarah Jones',
        coverImage: 'https://placehold.co/400x600/3a4a3a/f5f5f0',
        aiHint: 'book cover kingdom',
        synopsis: 'This book challenges our modern perceptions of wealth and possessions, inviting us into the radical, upside-down economy of God\'s Kingdom where true riches are found in giving.',
        shelf: 'new_releases',
    },
];

const BookCard = ({ book, onOpenBook }: { book: Book, onOpenBook: (book: Book) => void }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="book-card-container w-40 h-60 md:w-48 md:h-72 flex-shrink-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onOpenBook(book)}
        >
            <motion.div
                layoutId={`book-cover-${book.id}`}
                className="book-card w-full h-full relative cursor-pointer"
                whileHover={{
                    y: -10,
                    scale: 1.05,
                    rotateX: 10,
                    boxShadow: '0px 20px 30px rgba(0,0,0,0.3)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <Image
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    width={400}
                    height={600}
                    className="w-full h-full object-cover rounded-md shadow-lg"
                    data-ai-hint={book.aiHint}
                />
                 <AnimatePresence>
                    {isHovered && (
                         <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="absolute inset-0 w-full h-full p-4 flex flex-col justify-end bg-black/70 backdrop-blur-sm rounded-lg text-white"
                         >
                            <h3 className="font-headline text-xl font-bold text-white">{book.title}</h3>
                            <p className="text-sm font-bold text-white/80 mb-2">{book.author}</p>
                            <p className="text-sm text-white/90 line-clamp-4">{book.synopsis}</p>
                         </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

const BookShelf = ({ title, books, onOpenBook }: { title: string, books: Book[], onOpenBook: (book: Book) => void }) => (
    <div>
        <div className="flex items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground/80 font-headline">{title}</h2>
            <div className="flex-grow h-px bg-border ml-6"></div>
        </div>
        <div className="flex overflow-x-auto gap-8 pb-4 -mx-4 px-4 scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible lg:mx-0 lg:px-0 lg:gap-16">
           {books.map(book => (
               <div key={book.id} className="lg:flex lg:justify-center">
                   <BookCard book={book} onOpenBook={onOpenBook} />
               </div>
           ))}
        </div>
    </div>
);


export default function BooksPage() {
    const router = useRouter();
    
    const handleOpenBook = (book: Book) => {
        router.push(`/books/${book.id}`);
    };

    const featuredBooks = libraryBooks.filter(b => b.shelf === 'featured');
    const newReleases = libraryBooks.filter(b => b.shelf === 'new_releases');
    const essentialReading = libraryBooks.filter(b => b.shelf === 'essential_reading');


    return (
        <div className="bg-background text-foreground min-h-screen">
            <main className="container mx-auto px-4 py-12 md:py-20">
                <header className="text-center mb-20">
                    <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">The Library</h1>
                    <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">A quiet, well-lit space filled with curated wisdom. Each volume is a treasure—discover, open, and read.</p>
                </header>

                <div className="space-y-24">
                    <BookShelf title="Featured Works" books={featuredBooks} onOpenBook={handleOpenBook} />
                    <BookShelf title="New Releases" books={newReleases} onOpenBook={handleOpenBook} />
                    <BookShelf title="Essential Reading" books={essentialReading} onOpenBook={handleOpenBook} />
                </div>
            </main>
        </div>
    );
}
