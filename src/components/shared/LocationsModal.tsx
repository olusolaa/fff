
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  {
    name: 'Downtown Campus',
    address: '123 Main Street, Anytown, USA',
    times: 'Sundays at 9:00 AM & 11:00 AM',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern church building',
    directionsLink: '#',
  },
  {
    name: 'North Campus',
    address: '456 Oak Avenue, Anytown, USA',
    times: 'Sundays at 10:00 AM',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'suburban church exterior',
    directionsLink: '#',
  },
];

export default function LocationsModal({ isOpen, onClose }: LocationsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  if (!isOpen && typeof window === 'undefined') {
    return null;
  }
  
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div
        ref={modalRef}
        className="modal-window p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 id="modal-title" className="text-2xl md:text-3xl font-headline text-primary">
            Our Gatherings
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((location) => (
            <Card key={location.name} className="location-card overflow-hidden group">
              <div className="card-image relative h-48">
                <Image
                  src={location.imageUrl}
                  alt={location.name}
                  fill
                  className="object-cover"
                  data-ai-hint={location.imageHint}
                />
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-bold font-sans text-primary mb-2">{location.name}</CardTitle>
                <p className="text-sm text-foreground/80">{location.address}</p>
                <p className="text-sm text-foreground/80 mt-1">{location.times}</p>
                <Button asChild size="sm" className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href={location.directionsLink}>Get Directions</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
