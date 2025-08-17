// components/shared/VideoHero.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface VideoHeroProps {
  videoUrl: string;
  posterImage: string;
  className?: string;
}

export const VideoHero: React.FC<VideoHeroProps> = ({ videoUrl, posterImage, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9; // Slightly slow for cinematic feel
    }
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Fallback Image (shows while video loads) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <Image
          src={posterImage}
          alt="Community"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        poster={posterImage}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
      </video>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50" />
      
      {/* Film Grain Effect */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise" seed="1" />
            <feColorMatrix in="noise" type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>
    </div>
  );
};

// components/shared/LoadingScreen.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
        >
          <div className="text-center">
            {/* Logo or Church Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Church Name */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-headline text-primary mb-2"
            >
              The Family Tent Ministry
            </motion.h1>

            {/* Loading Bar */}
            <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden mx-auto mt-8">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground mt-4"
            >
              Preparing your experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// components/shared/SmoothScroll.tsx
'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

// components/shared/CustomCursor.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </>
  );
};

// components/shared/ParallaxSection.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  offset = 50,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// components/shared/MagneticButton.tsx
'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  strength = 0.5,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const middleX = left + width / 2;
    const middleY = top + height / 2;

    const x = (clientX - middleX) * strength;
    const y = (clientY - middleY) * strength;

    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

// hooks/useInView.ts
import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useInView = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseInViewOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || (triggerOnce && hasTriggered)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting;
        setInView(isInView);
        if (isInView && triggerOnce) {
          setHasTriggered(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref, inView };
};