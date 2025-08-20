
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenSquare, Share2 } from 'lucide-react';
import { BibleCompanion } from '@/components/shared/bible-companion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLayoutContext } from '@/contexts/layout-context';

const scripture = {
    book: "Psalm",
    chapter: 23,
    verses: [
        { verse: 1, text: "The Lord is my shepherd; I shall not want." },
        { verse: 2, text: "He makes me lie down in green pastures. He leads me beside still waters." },
        { verse: 3, text: "He restores my soul. He leads me in paths of righteousness for his name's sake." },
        { verse: 4, text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
        { verse: 5, text: "You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows." },
        { verse: 6, text: "Surely goodness and mercy shall follow me all the days of my life, and I will dwell in the house of the Lord forever." }
    ]
};

export default function BiblePage() {
    const { isCompanionOpen, setCompanionOpen } = useLayoutContext();
    const [selection, setSelection] = useState<{text: string, rect: DOMRect | null}>({ text: '', rect: null });
    const [selectedVerseForCompanion, setSelectedVerseForCompanion] = useState('');

    useEffect(() => {
        const handleMouseUp = () => {
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
                setSelection({ text, rect: range?.getBoundingClientRect() ?? null });
            } else {
                // Do not clear selection if clicking inside the companion panel
                if (!parentElement?.closest('.bible-companion-panel')) {
                    setSelection({ text: '', rect: null });
                }
            }
        };

        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const handleDiscussClick = () => {
        setSelectedVerseForCompanion(selection.text);
        setCompanionOpen(true);
        setSelection({ text: '', rect: null });
    }

    return (
        <div className={cn(
            "mt-20 flex min-h-screen bg-[#fdfbf3] text-[#3a301c]",
        )}>
             <main 
                className={cn(
                    "flex-grow transition-all duration-500 ease-in-out py-24 px-4 md:px-8",
                    isCompanionOpen ? 'md:mr-[24rem]' : 'mr-0' // 24rem is the width of the companion
                )}
            >
                <div className={cn("max-w-4xl transition-all duration-500 ease-in-out", isCompanionOpen ? 'mx-auto' : 'mx-auto')}>
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold font-headline">{scripture.book}</h1>
                        <p className="text-3xl md:text-4xl mt-2 font-headline">{scripture.chapter}</p>
                    </div>

                    <article className="prose-xl max-w-none text-inherit leading-loose font-headline">
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
                        top: selection.rect.top + window.scrollY - selection.rect.height - 10,
                        left: selection.rect.left + window.scrollX + selection.rect.width / 2 - 44,
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
