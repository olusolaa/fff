
'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BibleNavProps {
    books: string[];
    selectedBook: string;
    onBookChange: (book: string) => void;
    chapters: number[];
    selectedChapter: number;
    onChapterChange: (chapter: string) => void;
}

export function BibleNav({
    books,
    selectedBook,
    onBookChange,
    chapters,
    selectedChapter,
    onChapterChange,
}: BibleNavProps) {
    return (
        <div className="flex flex-row justify-center items-center gap-2 p-2 rounded-lg bg-background/50 backdrop-blur-sm max-w-md mx-auto">
            <Select value={selectedBook} onValueChange={onBookChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Book" />
                </SelectTrigger>
                <SelectContent>
                    {books.map(book => (
                        <SelectItem key={book} value={book}>{book}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={selectedChapter.toString()} onValueChange={onChapterChange}>
                <SelectTrigger className="w-full sm:w-[100px]">
                    <SelectValue placeholder="Chapter" />
                </SelectTrigger>
                <SelectContent>
                     {chapters.map(chapter => (
                        <SelectItem key={chapter} value={chapter.toString()}>{chapter}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full sm:w-[100px]">
                    <SelectValue placeholder="Verse" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
