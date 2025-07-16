
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ReactNode, useState } from 'react';

interface LocationsModalProps {
  children: ReactNode; // The trigger button
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

export default function LocationsModal({ children }: LocationsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="modal-overlay fixed inset-0 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="modal-window fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-2xl md:text-3xl font-headline text-primary">
              Our Gatherings
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </Dialog.Close>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((location) => (
              <Card key={location.name} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={location.imageUrl}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={location.imageHint}
                  />
                </div>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-bold font-body text-primary mb-2">{location.name}</CardTitle>
                  <p className="text-sm text-foreground/80">{location.address}</p>
                  <p className="text-sm text-foreground/80 mt-1">{location.times}</p>
                  <Button asChild size="sm" className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href={location.directionsLink}>Get Directions</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
