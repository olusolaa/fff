'use client';

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animationDelay?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'blur';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className,
  threshold = 0.1,
  rootMargin = '-50px',
  animationDelay = 0,
  animationType = 'fade'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when element comes into view
        if (entry.isIntersecting && !hasAnimated) {
          // Add delay if specified
          if (animationDelay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, animationDelay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }
        }
      },
      {
        root: null,
        rootMargin,
        threshold
      }
    );

    observer.observe(section);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [threshold, rootMargin, animationDelay, hasAnimated]);

  // Animation classes based on type
  const animationClasses = {
    fade: {
      initial: 'opacity-0',
      animate: 'opacity-100 transition-opacity duration-1000 ease-out'
    },
    slide: {
      initial: 'opacity-0 translate-y-12',
      animate: 'opacity-100 translate-y-0 transition-all duration-1000 ease-out'
    },
    scale: {
      initial: 'opacity-0 scale-95',
      animate: 'opacity-100 scale-100 transition-all duration-1000 ease-out'
    },
    blur: {
      initial: 'opacity-0 blur-sm',
      animate: 'opacity-100 blur-0 transition-all duration-1000 ease-out'
    }
  };

  const currentAnimation = animationClasses[animationType];

  return (
    <section
      ref={sectionRef}
      className={cn(
        !isVisible ? currentAnimation.initial : currentAnimation.animate,
        isVisible ? 'is-visible' : '',
        className
      )}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;