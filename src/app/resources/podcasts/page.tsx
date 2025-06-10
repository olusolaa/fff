
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; 

export default function PodcastsPage() {
  const verticalNavItems = [
    { label: 'Watch', href: '/sermons' },
    { label: 'Listen', href: '/resources/music' },
    { label: 'Read', href: '/resources/blog' },
    { label: 'Podcasts', href: '/resources/podcasts', active: true },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <div className="flex flex-col items-start">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-primary leading-tight mb-10">
              Family Tent
              <br />
              Ministry
              <br />
              Podcasts
            </h1>

            <div className="flex items-center space-x-4 mb-8">
              <Link href="/give" className="block group">
                <div className="inline-flex items-center justify-center h-24 w-10 rounded-full bg-muted hover:bg-secondary transition-colors cursor-pointer shadow">
                  <span className="[writing-mode:vertical-rl] transform rotate-180 text-xs uppercase font-semibold tracking-wider text-muted-foreground group-hover:text-secondary-foreground">
                    Give
                  </span>
                </div>
              </Link>
              <div className="h-10 w-px bg-border"></div>
              <Link href="#subscribe" className="block group"> {/* Placeholder link */}
                <div className="inline-flex items-center justify-center h-32 w-10 rounded-full bg-primary hover:bg-primary/90 transition-colors cursor-pointer shadow">
                  <span className="[writing-mode:vertical-rl] transform rotate-180 text-xs uppercase font-semibold tracking-wider text-primary-foreground">
                    Subscribe
                  </span>
                </div>
              </Link>
            </div>

            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Sharing Faith, Inspiring Lives
            </p>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg shadow-xl overflow-hidden">
              <Image
                src="https://placehold.co/900x675.png"
                alt="Family Tent Ministry podcast recording session"
                width={900}
                height={675}
                className="w-full h-full object-cover"
                data-ai-hint="podcast studio recording"
              />
            </div>
            {/* Vertical Navigation */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full pl-6 hidden lg:flex flex-col items-center">
              {verticalNavItems.map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 && <div className="h-6 w-px bg-border my-1"></div>}
                  <Link
                    href={item.href}
                    className={`[writing-mode:vertical-rl] transform rotate-180 text-xs uppercase tracking-wider py-2 transition-colors ${
                      item.active
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Placeholder for actual podcast listings - coming soon */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold font-headline text-primary mb-4">Podcast Episodes</h2>
        <p className="text-muted-foreground mb-8">
          Our latest podcast episodes and series will appear here. Check back soon!
        </p>
        {/* Example of how cards might look, similar to other resource pages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Understanding Our Mission", desc: "An introduction to FTM's core values.", hint: "microphone podcast" },
              { title: "Navigating Youth Challenges", desc: "Insights for young people today.", hint: "discussion group" },
              { title: "Building Stronger Families", desc: "Principles for family life.", hint: "family happy" }
            ].map((podcast, i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="relative aspect-video mb-4 rounded overflow-hidden">
                    <Image src={`https://placehold.co/600x338.png`} alt={podcast.title} layout="fill" objectFit="cover" data-ai-hint={podcast.hint} />
                </div>
                <h3 className="text-xl font-semibold font-headline text-primary mb-2">{podcast.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{podcast.desc}</p>
                <Button variant="link" className="text-accent p-0" asChild>
                    <Link href="#">Listen Now (Coming Soon)</Link>
                </Button>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
