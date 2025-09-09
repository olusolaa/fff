
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
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover brightness-50"
        quality={80}
        data-ai-hint={imageHint || "church community"}
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 pt-20">
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-primary-foreground">
          <AnimatedSection className="w-full">
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-headline animate-fade-in-slow">
              {title}
            </h1>
            {subtitle && (
              <p className="mb-10 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in-delay">
                {subtitle}
              </p>
            )}
            <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 animate-fade-in-buttons">
              <Button asChild size="lg" className="min-w-[220px] bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={primaryActionLink}>{primaryActionText}</Link>
              </Button>
              {secondaryActionText && secondaryActionLink && (
                <Button asChild variant="outline" size="lg" className="min-w-[220px] border-primary-foreground text-primary hover:bg-primary-foreground/10">
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
