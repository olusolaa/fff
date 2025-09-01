
'use client';

import { useState } from 'react';
import HeroSection from '@/components/shared/HeroSection';
import Testimonial from '@/components/shared/Testimonial';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import LocationsModal from '@/components/shared/LocationsModal';

const pathwayItems = [
  {
    title: 'Connect in a Group',
    image: '/images/connect.jpg',
    imageHint: 'people laughing community',
    link: '/connect/groups',
  },
  {
    title: 'Make a Difference',
    image: '/images/difference.jpg',
    imageHint: 'volunteers serving joy',
    link: '/connect/serve',
  },
  {
    title: 'Upcoming Events',
    image: '/images/welcome.jpg',
    imageHint: 'church event vibrant',
    link: '/events',
  },
];

export default function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <HeroSection
        title="A Place to Belong."
        subtitle="Connecting our community to God, each other, and their purpose."
        imageUrl="/images/hero.jpg"
        imageAlt="A diverse group of people in a community setting, representing belonging"
        imageHint="community belonging diverse"
        primaryActionText="Find Your Community"
        primaryActionLink="/connect/groups"
        secondaryActionText="Watch a Recent Message"
        secondaryActionLink="/sermons"
      />

      {/* Section 2: The Invitation (Welcome & Gatherings) */}
      <AnimatedSection className="invitation-section">
        <div className="invitation-content-wrapper">
          <Image
            src="/images/pastor.jpg"
            alt="Lead Pastor"
            width={120}
            height={120}
            className="pastor-photo"
            data-ai-hint="pastor portrait"
          />
          <h2 className="welcome-headline">Welcome Home.</h2>
          <p className="welcome-paragraph">
            We believe church is more than a building—it's a family. And we're so glad you've stopped by our digital home. We'd love for you to join us.
          </p>
          
          <div className="pastor-signature-placeholder mb-10">
             <p className="text-lg text-foreground/80 font-serif italic">- Pastor John Doe</p>
          </div>
          
          <div className="divider-line"></div>
          
          <button className="locations-button" onClick={() => setModalOpen(true)}>
            View Our Gatherings
          </button>
        </div>
      </AnimatedSection>
      <LocationsModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />


      {/* Section 3: The Heartbeat (Latest Message) */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video group">
              <Image 
                src="/images/track.jpg" 
                alt="Latest sermon series graphic" 
                fill
                className="rounded-lg shadow-lg object-cover" 
                data-ai-hint="sermon art"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                <Play className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-headline text-primary mb-3">Faith Over Fear</h2>
              <p className="text-lg text-muted-foreground mb-4">Pastor John Doe</p>
              <p className="text-foreground/80 mb-6">
                Join us as we explore how to live a life of courage and trust in God amidst uncertain times. Discover the power of faith to overcome any obstacle.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href="/sermons">Explore All Messages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Pathways (Discover Your Place) */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-headline text-primary text-center mb-12">
            Discover Your Place
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pathwayItems.map((item) => (
              <Link href={item.link} key={item.title}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                    <CardHeader className="p-0">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          data-ai-hint={item.imageHint}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-2xl font-headline text-primary">{item.title}</CardTitle>
                    </CardContent>
                  </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: The Proof (A Story of Life Change) */}
      <Testimonial
        quote="I walked in empty and, for the first time in my life, I found a family."
        attribution="Jessica's Story"
        imageUrl="/images/testimony.jpg"
        imageHint="woman smiling portrait"
        actionText="Read Her Story"
        actionLink="/story"
      />
      
      {/* Section 6: The Final Handshake (The Onboarding Path) */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-headline mb-4">
            New Here? We'd love to help you get connected.
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Let us know you're coming and we'll roll out the red carpet for you. We have a special gift waiting for you at our Welcome Center.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/new">Start Your Journey</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
