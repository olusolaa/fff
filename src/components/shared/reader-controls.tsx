
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Minus, Plus, Type, SunMoon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'sepia' | 'dark';

interface ReaderControlsProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    fontSize: number;
    setFontSize: (size: number | ((s: number) => number)) => void;
}

export function ReaderControls({ theme, setTheme, fontSize, setFontSize }: ReaderControlsProps) {
    
    const handleThemeChange = () => {
        const themes: Theme[] = ['light', 'sepia', 'dark'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };
    
    const ThemeIcon = () => {
        switch (theme) {
            case 'light': return <Sun size={20} />;
            case 'sepia': return <SunMoon size={20} />;
            case 'dark': return <Moon size={20} />;
            default: return <Sun size={20} />;
        }
    }

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/20 to-transparent p-4 flex items-center justify-end gap-4 z-10"
        >
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/30">
                 <Button variant="ghost" size="icon" className="text-white rounded-full h-8 w-8 hover:bg-black/20" onClick={() => setFontSize(s => Math.max(s - 1, 14))}>
                     <Minus size={16} />
                 </Button>
                 <span className="w-12 text-center text-sm text-white font-semibold">{fontSize}px</span>
                 <Button variant="ghost" size="icon" className="text-white rounded-full h-8 w-8 hover:bg-black/20" onClick={() => setFontSize(s => Math.min(s + 1, 32))}>
                    <Plus size={16} />
                 </Button>
             </div>

            <Button 
                variant="ghost" 
                size="icon" 
                className="text-white rounded-full bg-black/30 h-10 w-10 hover:bg-black/20"
                onClick={handleThemeChange}
            >
                <ThemeIcon />
            </Button>
        </motion.div>
    );
}
