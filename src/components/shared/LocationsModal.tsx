
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  {
    name: 'Downtown Campus',
    address: '123 Main Street, Anytown, USA',
    times: 'Sundays: <strong>9:00 AM</strong> & <strong>11:00 AM</strong>',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern church building',
    directionsLink: 'https://maps.google.com/?q=123+Main+Street',
  },
  {
    name: 'North Campus',
    address: '456 Oak Avenue, Anytown, USA',
    times: 'Sundays: <strong>10:00 AM</strong>',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'suburban church exterior',
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
      }
    };

    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      document.body.classList.add('modal-is-open');
      window.addEventListener('keydown', handleKeydown);
      
      // Focus trapping logic
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }

    } else {
      document.body.classList.remove('modal-is-open');
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.body.classList.remove('modal-is-open');
    };
  }, [isOpen, onClose]);

  return (
    <div
      id="locations-modal"
      className={cn('locations-modal-container', { 'is-open': isOpen })}
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <div className="modal-overlay" tabIndex={-1}></div>

      <div
        ref={modalRef}
        className="modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-button"
          aria-label="Close modal"
          onClick={onClose}
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>

        <h2 id="modal-title" className="modal-title">Our Gatherings</h2>

        <div className="modal-body">
          {locations.map((location) => (
            <div key={location.name} className="location-card">
              <div className="card-image-container">
                <Image
                  src={location.imageUrl}
                  alt={`The Family Tent Ministry - ${location.name}`}
                  fill
                  className="object-cover"
                  data-ai-hint={location.imageHint}
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{location.name}</h3>
                <p className="card-address">{location.address}</p>
                <p
                  className="card-times"
                  dangerouslySetInnerHTML={{ __html: location.times }}
                ></p>
                <a
                  href={location.directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-button"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
