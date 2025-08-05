
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReaderControls } from '@/components/shared/reader-controls';
import { cn } from '@/lib/utils';
import { createQuoteImage } from '@/ai/flows/create-quote-image';
import { QuoteCard } from '@/components/shared/quote-card';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';


// Mock Data - In a real app, this would be fetched based on the bookId
const libraryBooks = [
    {
        id: 1,
        title: 'The Anchor in the Storm',
        author: 'Dr. Evelyn Reed',
        coverImage: 'https://placehold.co/400x600/1a2a1a/f5f5f0',
        content: [
            {
                chapter: "Chapter 1: The Gathering Clouds",
                text: "The sky had been a brilliant, unforgiving blue for weeks. A blue that spoke of heat, of drought, of a thirst that went deeper than the cracked earth. It was the kind of sky that made you forget clouds had ever existed. But Elara remembered. She remembered the soft, grey underbellies of rain clouds, the dramatic, bruised purple of a thunderstorm, the wispy, fleeting trails of mare's tails. She remembered, and she watched the horizon with an ache in her heart that mirrored the ache in the land.\n\nHer grandfather used to say that hope was a seed you planted in the driest of seasons. 'You don't plant it because you see the rain coming, little bird,' he'd told her, his voice a low rumble like distant thunder. 'You plant it to tell the sky you're still waiting.' He was gone now, taken by the same fever that had swept through the village three summers ago, but his words were etched into her memory, a stubborn green shoot in the barren landscape of her grief."
            },
            {
                chapter: "Chapter 2: Whispers on the Wind",
                text: "The village council had decreed another day of water rationing. The well, once the lifeblood of their community, was now a place of tension, of sharp words and sharper glances. Elara saw the fear in her neighbors' eyes, the way their shoulders slumped a little lower each day. The optimism that had once bloomed so readily in their desert oasis was wilting under the relentless sun.\n\nThat evening, as the sun bled orange and pink across the western sky, Elara took a small, clay pot and filled it with the driest dust from the riverbed. From a small, leather pouch tied at her waist, she took a single, wrinkled seed. It was nothing special to look at, small and brown and unassuming. It was the last of the seeds her grandfather had given her. She pushed it gently into the dust, a silent act of defiance against the brassy, cloudless sky. She didn't have water to offer it, but she had hope. And for now, that would have to be enough."
            }
        ]
    },
    // Add other books here...
];

type Theme = 'light' | 'sepia' | 'dark';

export default function BookReaderPage() {
    const router = useRouter();
    const params = useParams();
    const { bookId } = params;
    
    const [theme, setTheme] = useState<Theme>('light');
    const [fontSize, setFontSize] = useState(18);
    const [progress, setProgress] = useState(0);
    const [isControlsVisible, setControlsVisible] = useState(false);
    const [selection, setSelection] = useState<{text: string, rect: DOMRect | null}>({ text: '', rect: null });
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const contentRef = useRef<HTMLDivElement>(null);

    const book = libraryBooks.find(b => b.id === parseInt(bookId as string));

    useEffect(() => {
        const contentEl = contentRef.current;
        if (!contentEl) return;

        const handleScroll = () => {
            const scrollableHeight = contentEl.scrollHeight - contentEl.clientHeight;
            const newProgress = (contentEl.scrollTop / scrollableHeight) * 100;
            setProgress(newProgress);
        };
        
        const handleMouseUp = (event: MouseEvent) => {
             // Clicks inside the Share modal should not affect the text selection.
            const target = event.target as Element;
            if (target.closest('[role="alertdialog"]')) {
                return;
            }

            const currentSelection = window.getSelection();
            const text = currentSelection?.toString().trim() ?? '';
            if (text) {
                const range = currentSelection?.getRangeAt(0);
                setSelection({ text, rect: range?.getBoundingClientRect() ?? null });
            } else {
                setSelection({ text: '', rect: null });
            }
        };

        contentEl.addEventListener('scroll', handleScroll);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            if (contentEl) {
                contentEl.removeEventListener('scroll', handleScroll);
            }
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [book]);
    
    const handleShareClick = async () => {
        if (!selection.text || !book) return;

        setIsModalOpen(true);
        setIsGenerating(true);
        setGeneratedImage(null);
        setSelection({ text: '', rect: null });

        try {
            const result = await createQuoteImage({ quote: selection.text, title: book.title });
            setGeneratedImage(result.imageUrl);
        } catch (error) {
            console.error("Failed to generate quote image", error);
            // In a real app, show a toast notification
        } finally {
            setIsGenerating(false);
        }
    };
    
    const downloadImage = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `quote-${book?.title.replace(/\s+/g, '-').toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    if (!book) {
        return (
            <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
                <p>Book not found.</p>
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="absolute top-4 right-4">
                    <X size={24} />
                </Button>
            </div>
        );
    }
    
    const themeClasses = {
        light: 'bg-reader-bg-light text-reader-text-light',
        sepia: 'bg-reader-bg-sepia text-reader-text-sepia',
        dark: 'bg-reader-bg-dark text-reader-text-dark',
    };

    return (
        <>
            <motion.div
                className="fixed inset-0 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                onMouseMove={(e) => {
                    if (e.clientY < 100) {
                        setControlsVisible(true);
                    }
                }}
                onMouseLeave={() => setControlsVisible(false)}
            >
                <div 
                    className={cn(
                        "absolute inset-0 transition-colors duration-500",
                        theme === 'light' ? 'bg-background/80' : 'bg-black/80',
                        "backdrop-blur-sm"
                    )}
                />
                
                <motion.div
                    className="w-full h-full max-w-7xl mx-auto flex items-center justify-center p-4 md:p-8"
                >
                    <div className="relative flex w-full h-full gap-8">
                        {/* Book Cover */}
                        <motion.div 
                            layoutId={`book-cover-${book.id}`}
                            className="w-1/3 max-w-sm hidden md:block"
                            transition={{ type: 'spring', stiffness: 200, damping: 30, duration: 0.6 }}
                        >
                            <Image
                                src={book.coverImage}
                                alt={`${book.title} cover`}
                                width={400}
                                height={600}
                                className="w-full h-auto object-contain rounded-md shadow-2xl"
                                priority
                            />
                        </motion.div>

                        {/* Reader Content */}
                        <motion.div 
                            className={cn(
                                "w-full md:w-2/3 h-full flex flex-col relative transition-colors duration-500",
                                 themeClasses[theme]
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}
                        >
                            <AnimatePresence>
                               {isControlsVisible && (
                                   <ReaderControls 
                                       theme={theme}
                                       setTheme={setTheme}
                                       fontSize={fontSize}
                                       setFontSize={setFontSize}
                                   />
                               )}
                            </AnimatePresence>
                            
                            {selection.rect && (
                                <motion.div
                                    className="absolute z-20"
                                    style={{
                                        top: selection.rect.top - selection.rect.height - 10,
                                        left: selection.rect.left + selection.rect.width / 2 - 20,
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <Button size="icon" className="rounded-full shadow-lg" onClick={handleShareClick}>
                                        <Share2 size={18} />
                                    </Button>
                                </motion.div>
                            )}


                            <div 
                                ref={contentRef} 
                                className="prose max-w-none text-inherit overflow-y-auto h-full px-8 md:px-16 pt-24 pb-16 leading-relaxed scrollbar-hide 
                                           md:columns-2 md:gap-16"
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                {book.content.map((section, index) => (
                                    <div key={index} className="break-inside-avoid-column">
                                        <h1 className='font-headline !text-inherit !opacity-80'>{section.chapter}</h1>
                                        <p>{section.text}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10">
                                <motion.div 
                                    className="h-full bg-accent"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </motion.div>
                    </div>

                </motion.div>
                
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="absolute top-6 right-6 text-foreground/70 hover:text-foreground z-20 rounded-full bg-background/50 hover:bg-background/80"
                >
                    <X size={24} />
                </Button>
            </motion.div>
            
            <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Create a Shareable Image</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex items-center justify-center min-h-[300px] bg-muted/50 rounded-lg">
                        {isGenerating && <Loader2 className="animate-spin text-primary" size={48} />}
                        {generatedImage && <QuoteCard imageUrl={generatedImage} onDownload={downloadImage} />}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
