import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className }) => {
  return (
    <div // Changed from section to div to be more generic, can be wrapped by section in pages
      className={cn('fade-in-load', className)}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
