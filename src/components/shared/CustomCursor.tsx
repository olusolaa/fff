'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    const linkElements = document.querySelectorAll('a, button');
    linkElements.forEach((el) => {
      el.addEventListener('mouseenter', () => setIsHoveringLink(true));
      el.addEventListener('mouseleave', () => setIsHoveringLink(false));
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      linkElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => setIsHoveringLink(true));
        el.removeEventListener('mouseleave', () => setIsHoveringLink(false));
      });
    };
  }, []);

  return (
    <motion.div
      className={cn(
        'fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]',
        'border-2 border-primary',
        'transition-transform duration-200 ease-out',
        isHidden && 'opacity-0',
        isHoveringLink ? 'scale-150 bg-primary/20' : 'scale-100'
      )}
      style={{
        x: position.x - 16,
        y: position.y - 16,
      }}
      animate={{
        scale: isHoveringLink ? 1.5 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  );
};
