
import React from 'react';
import Link from 'next/link';

export default function PodcastsPage() {
  return (
    <>
      {/* Fixed Vertical Button Group */}
      <div className="fixed left-6 md:left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6 z-30">
        <Link href="/give" className="block group">
          <div className="inline-flex items-center justify-center h-24 w-10 rounded-full bg-muted hover:bg-secondary transition-colors cursor-pointer shadow">
            <span className="[writing-mode:vertical-rl] transform rotate-180 text-xs uppercase font-semibold tracking-wider text-muted-foreground group-hover:text-secondary-foreground">
              GIVE
            </span>
          </div>
        </Link>
        <div className="h-10 w-px bg-border"></div>
        <Link href="#subscribe" className="block group"> {/* Placeholder link for Subscribe */}
          <div className="inline-flex items-center justify-center h-32 w-10 rounded-full bg-foreground hover:bg-foreground/90 transition-colors cursor-pointer shadow">
            <span className="[writing-mode:vertical-rl] transform rotate-180 text-xs uppercase font-semibold tracking-wider text-background">
              SUBSCRIBE
            </span>
          </div>
        </Link>
      </div>

      {/* Main Content Section */}
      <section className="relative flex items-center min-h-[calc(100vh-5rem)] bg-background px-4 py-16 md:py-24 pl-32 md:pl-40"> {/* Added left padding */}
        {/* Text Content Block */}
        <div className="text-left"> {/* Text aligned to the left */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground leading-tight mb-10">
            Family Tent
            <br />
            Ministry
            <br />
            Podcasts
          </h1>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Sharing Faith, Inspiring Lives
          </p>
        </div>
      </section>
    </>
  );
}
