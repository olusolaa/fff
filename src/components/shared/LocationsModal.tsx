'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MapPin, Clock, X, ArrowRight } from 'lucide-react';

interface LocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  {
    name: 'Downtown Campus',
    address: '123 Main Street, Anytown, USA',
    times: 'Sundays: 9:00 AM & 11:00 AM',
    description: 'Our main campus in the heart of the city, featuring contemporary worship and vibrant community.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern church building peaceful',
    directionsLink: 'https://maps.google.com/?q=123+Main+Street',
  },
  {
    name: 'North Campus',
    address: '456 Oak Avenue, Anytown, USA',
    times: 'Sundays: 10:00 AM',
    description: 'A welcoming suburban location perfect for families, with dedicated children\'s ministry spaces.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'suburban church exterior welcoming',
    directionsLink: 'https://maps.google.com/?q=456+Oak+Avenue',
  },
];

export default function LocationsModal({ isOpen, onClose }: LocationsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        if (!modalRef.current) return;

        const focusableElements = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          )
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      document.body.classList.add('modal-is-open');
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        firstFocusable?.focus();
      }, 500);

      window.addEventListener('keydown', handleKeydown);
    } else {
      document.body.classList.remove('modal-is-open');
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.body.classList.remove('modal-is-open');
      document.body.style.overflow = '';
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  return (
    <div
      id="locations-modal"
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6',
        'transition-all duration-500',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      {/* Enhanced Overlay with gradient */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm",
          "transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        tabIndex={-1}
      />

      {/* Modal Window with enhanced styling */}
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-5xl max-h-[90vh] overflow-y-auto",
          "bg-white dark:bg-gray-900 rounded-3xl shadow-2xl",
          "transform transition-all duration-500",
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button with enhanced styling */}
        <button
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200 group"
          aria-label="Close modal"
          onClick={onClose}
        >
          <X className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Modal Header with gradient background */}
        <div className="relative px-8 pt-12 pb-8 bg-gradient-to-b from-primary/10 to-transparent">
          <h2 id="modal-title" className="text-4xl md:text-5xl font-headline text-center text-primary">
            Our Gatherings
          </h2>
          <p className="text-center text-foreground/70 mt-3 text-lg">
            Join us for worship, community, and spiritual growth
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent mx-auto mt-6"></div>
        </div>

        {/* Modal Body with location cards */}
        <div className="px-8 pb-8">
          <div className="grid gap-8 md:grid-cols-2">
            {locations.map((location, index) => (
              <div
                key={location.name}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image container with overlay effect */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={location.imageUrl}
                    alt={`The Family Tent Ministry - ${location.name}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={location.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
                    <span className="text-sm font-semibold text-primary">{location.name}</span>
                  </div>
                </div>

                {/* Content section with enhanced styling */}
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold text-primary">
                    {location.name}
                  </h3>
                  
                  <p className="text-foreground/70 leading-relaxed">
                    {location.description}
                  </p>
                  
                  {/* Location details with icons */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3 text-foreground/80">
                      <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{location.address}</span>
                    </div>
                    
                    <div className="flex items-start gap-3 text-foreground/80">
                      <Clock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium">{location.times}</span>
                    </div>
                  </div>
                  
                  {/* CTA button with enhanced styling */}
                  <a
                    href={location.directionsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transform transition-all hover:scale-105 hover:shadow-lg group"
                  >
                    Get Directions
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Additional info section */}
          <div className="mt-12 p-8 bg-secondary/20 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-primary mb-3">
              First Time Visiting?
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              We can't wait to meet you! Stop by our Welcome Center when you arrive 
              and we'll help you find your way. We have a special gift waiting just for you.
            </p>
            <Link
              href="/new"
              className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent/80 transition-colors"
              onClick={onClose}
            >
              Plan Your Visit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}