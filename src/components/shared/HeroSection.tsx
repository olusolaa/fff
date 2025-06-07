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
    <div className="relative h-[calc(100vh-5rem)] min-h-[500px] w-full overflow-hidden">
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
        <AnimatedSection className="container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            {title}
          </h1>
          {subtitle && (
            <p className="mb-8 text-lg sm:text-xl md:text-2xl">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
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
  );
}
