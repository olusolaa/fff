
import HeroSection from '@/components/shared/HeroSection';
import ContentBlock from '@/components/shared/ContentBlock';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Testimonial from '@/components/shared/Testimonial';

export default function HomePage() {
  return (
    <div>
      {/* Section 1: The Overture (The Hero) */}
      <HeroSection
        title="A Place to Belong."
        subtitle="Connecting our community to God, each other, and their purpose."
        imageUrl="https://i.postimg.cc/QdMCtd7t/20250622-2011-image.png"
        imageAlt="A serene landscape with a person looking towards the horizon at sunrise"
        primaryActionText="Find Your Community"
        primaryActionLink="/connect/groups"
        secondaryActionText="Watch a Recent Message"
        secondaryActionLink="/sermons"
        imageHint="serene landscape sunrise"
      />

      {/* Section 2: The Invitation (Welcome & Gatherings) */}
      <AnimatedSection className="py-20 md:py-28 text-center bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6">
            Welcome Home.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Image 
              src="https://placehold.co/100x100.png" 
              alt="Lead Pastor"
              data-ai-hint="pastor portrait"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
                <p className="text-lg text-foreground/80">A warm welcome from our community.</p>
                <p className="font-semibold text-accent">- Pastor Placeholder</p>
            </div>
          </div>
          <div className="bg-secondary/30 rounded-lg p-8">
            <p className="font-bold text-3xl md:text-4xl font-headline text-primary">
              Sundays at 9:00 AM & 11:00 AM
            </p>
          </div>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/locations">View Our Locations & Times</Link>
          </Button>
        </div>
      </AnimatedSection>
      
      {/* Section 3: The Heartbeat (Latest Message) */}
      <AnimatedSection className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl group cursor-pointer">
              <Link href="/sermons">
                <Image 
                  src="https://placehold.co/1280x720.png" 
                  alt="Latest Sermon Thumbnail" 
                  data-ai-hint="sermon graphic art"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>
                </div>
              </Link>
            </div>
            <div className="text-left">
              <h3 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">Finding Joy in the Journey</h3>
              <p className="text-lg text-accent mb-4">Pastor Jane Smith</p>
              <p className="text-foreground/80 mb-8">
                Discover how embracing challenges and finding gratitude can transform your perspective and deepen your faith, no matter the season.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/sermons">Explore All Messages</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 4: The Pathways (Discover Your Place) */}
      <AnimatedSection className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary text-center mb-12">
            Discover Your Place
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Connect in a Group", href: "/connect/groups", image: "https://placehold.co/800x1000.png", hint: "people laughing group" },
              { title: "Make a Difference", href: "/connect/serve", image: "https://placehold.co/800x1000.png", hint: "volunteers serving community" },
              { title: "Upcoming Events", href: "/events", image: "https://placehold.co/800x1000.png", hint: "church event vibrant" }
            ].map(item => (
              <Link href={item.href} key={item.title} className="group block overflow-hidden rounded-lg shadow-lg relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  data-ai-hint={item.hint}
                  width={800}
                  height={1000}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white font-headline">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section 5: The Proof (A Story of Life Change) */}
      <Testimonial
        quote="I walked in empty and, for the first time in my life, I found a family."
        attribution="Jessica's Story"
        imageUrl="https://placehold.co/800x1000.png"
        imageHint="woman portrait hope"
        actionLink="/story"
        actionText="Read Her Story"
      />
      
      {/* Section 6: The Final Handshake (The Onboarding Path) */}
      <AnimatedSection className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            New Here?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            We'd love to help you get connected. Let us guide you on the next steps in your journey with us.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/new">Start Your Journey</Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
}
