
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenSquare, Share2 } from 'lucide-react';
import { BibleCompanion } from '@/components/shared/bible-companion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLayoutContext } from '@/contexts/layout-context';
import { BibleNav } from '@/components/shared/bible-nav';

const bibleData: Record<string, Record<number, string[]>> = {
    "Genesis": {
        1: [
            "In the beginning, God created the heavens and the earth.",
            "The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.",
            "And God said, “Let there be light,” and there was light.",
            "And God saw that the light was good. And God separated the light from the darkness.",
            "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day."
        ],
        2: [
            "Thus the heavens and the earth were finished, and all the host of them.",
            "And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done.",
            "So God blessed the seventh day and made it holy, because on it God rested from all his work that he had done in creation."
        ]
    },
    "Psalm": {
        23: [
            "The Lord is my shepherd; I shall not want.",
            "He makes me lie down in green pastures. He leads me beside still waters.",
            "He restores my soul. He leads me in paths of righteousness for his name's sake.",
            "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
            "You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows.",
            "Surely goodness and mercy shall follow me all the days of my life, and I will dwell in the house of the Lord forever."
        ],
        1: [
            "Blessed is the man who walks not in the counsel of the wicked, nor stands in the way of sinners, nor sits in the seat of scoffers;",
            "but his delight is in the law of the Lord, and on his law he meditates day and night.",
            "He is like a tree planted by streams of water that yields its fruit in its season, and its leaf does not wither. In all that he does, he prospers.",
            "The wicked are not so, but are like chaff that the wind drives away.",
            "Therefore the wicked will not stand in the judgment, nor sinners in the congregation of the righteous;",
            "for the Lord knows the way of the righteous, but the way of the wicked will perish."
        ]
    }
};


export default function BiblePage() {
    const { isCompanionOpen, setCompanionOpen } = useLayoutContext();
    const [selection, setSelection] = useState<{text: string, rect: DOMRect | null}>({ text: '', rect: null });
    const [selectedVerseForCompanion, setSelectedVerseForCompanion] = useState('');
    
    const [selectedBook, setSelectedBook] = useState('Psalm');
    const [selectedChapter, setSelectedChapter] = useState(23);

    const scripture = {
        book: selectedBook,
        chapter: selectedChapter,
        verses: (bibleData[selectedBook]?.[selectedChapter] || []).map((text, i) => ({ verse: i + 1, text }))
    };

    useEffect(() => {
        const handleSelection = () => {
            const currentSelection = window.getSelection();
            if (!currentSelection || !currentSelection.anchorNode) {
                setSelection({ text: '', rect: null });
                return;
            }

            const text = currentSelection.toString().trim() ?? '';
            
            const anchorNode = currentSelection.anchorNode;
            const parentElement = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode as HTMLElement : anchorNode.parentElement;
            if (parentElement?.closest('.bible-companion-panel')) {
                return;
            }

            if (text) {
                const range = currentSelection.getRangeAt(0);
                const endRange = document.createRange();
                endRange.setStart(range.endContainer, range.endOffset);
                endRange.setEnd(range.endContainer, range.endOffset);
                setSelection({ text, rect: endRange?.getBoundingClientRect() ?? null });
            } else {
                if (!parentElement?.closest('.bible-companion-panel')) {
                    setSelection({ text: '', rect: null });
                }
            }
        };

        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('touchend', handleSelection);
        
        return () => {
            document.removeEventListener('mouseup', handleSelection);
            document.removeEventListener('touchend', handleSelection);
        };
    }, []);
    
    const handleBookChange = (book: string) => {
        setSelectedBook(book);
        setSelectedChapter(1); // Reset to chapter 1 when book changes
    }

    const handleChapterChange = (chapter: string) => {
        setSelectedChapter(parseInt(chapter));
    }

    const handleDiscussClick = () => {
        setSelectedVerseForCompanion(selection.text);
        setCompanionOpen(true);
        setSelection({ text: '', rect: null });
    }

    return (
        <div className={cn(
            "flex min-h-screen bg-[#fdfbf3] text-[#3a301c]",
        )}>
             <main 
                className={cn(
                    "flex-grow transition-all duration-500 ease-in-out py-16 md:py-24 px-4 md:px-8",
                     isCompanionOpen ? 'md:mr-[24rem]' : 'mr-0'
                )}
            >
                <div className={cn("max-w-4xl transition-all duration-500 ease-in-out", isCompanionOpen ? 'mx-auto' : 'mx-auto')}>
                    <div className="mb-12 mt-10">
                         <BibleNav 
                            books={Object.keys(bibleData)}
                            selectedBook={selectedBook}
                            onBookChange={handleBookChange}
                            chapters={Object.keys(bibleData[selectedBook] || {}).map(Number)}
                            selectedChapter={selectedChapter}
                            onChapterChange={handleChapterChange}
                         />
                    </div>
                    
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold font-headline">{scripture.book}</h1>
                        <p className="text-2xl md:text-4xl mt-2 font-headline">{scripture.chapter}</p>
                    </div>

                    <article className="prose-lg md:prose-xl max-w-none text-inherit leading-loose font-headline">
                        {scripture.verses.map(v => (
                            <p key={v.verse}>
                                <sup className="text-sm opacity-60 mr-2 font-sans">{v.verse}</sup>
                                {v.text}
                            </p>
                        ))}
                    </article>
                </div>
            </main>
            
            {selection.rect && (
                <motion.div
                    className="absolute z-20 flex gap-2"
                    style={{
                        top: selection.rect.top + window.scrollY - 50,
                        left: selection.rect.left + window.scrollX + (selection.rect.width / 2) - 44,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Button size="icon" className="rounded-full shadow-lg bg-accent hover:bg-accent/90">
                        <Share2 size={18} />
                    </Button>
                    <Button size="icon" className="rounded-full shadow-lg" onClick={handleDiscussClick}>
                        <PenSquare size={18} />
                    </Button>
                </motion.div>
            )}

            <BibleCompanion 
                selectedVerse={selectedVerseForCompanion}
            />
        </div>
    );
}
