
'use client';

import { Download } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface QuoteCardProps {
    imageUrl: string;
    onDownload: () => void;
}

export function QuoteCard({ imageUrl, onDownload }: QuoteCardProps) {
    return (
        <div className="relative group aspect-[9/16] w-full max-w-sm mx-auto">
            <Image
                src={imageUrl}
                alt="Generated quote"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button onClick={onDownload} size="lg">
                    <Download className="mr-2" />
                    Download Image
                </Button>
            </div>
        </div>
    );
}
