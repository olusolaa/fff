
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt: string;
  primaryActionText: string;
  primaryActionLink: string;
  secondaryActionText?: string;
  secondaryActionLink?: string;
  imageHint?: string;
}

export default function HeroSection({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  primaryActionText,
  primaryActionLink,
  secondaryActionText,
  secondaryActionLink,
  imageHint
}: HeroSectionProps) {
  return (
    // Added mt-[-5rem] to pull the hero background up behind the fixed header
    <div className="relative h-screen w-full overflow-hidden mt-[-5rem]"> 
      <Image
        src={imageUrl}
        alt={imageAlt}
        layout="fill"
        objectFit="cover"
        quality={80}
        className="brightness-50"
        data-ai-hint={imageHint || "church community"}
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        {/* Container for hero text content, padded correctly for header */}
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 pt-20 text-center text-primary-foreground">
          <AnimatedSection className="w-full">
            <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              {title}
            </h1>
            {subtitle && (
              <p className="mb-10 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" className="min-w-[180px] bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={primaryActionLink}>{primaryActionText}</Link>
              </Button>
              {secondaryActionText && secondaryActionLink && (
                <Button asChild variant="outline" size="lg" className="min-w-[180px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href={secondaryActionLink}>{secondaryActionText}</Link>
                </Button>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
