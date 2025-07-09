
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  quote: string;
  attribution: string;
  imageUrl: string;
  imageHint: string;
  actionText: string;
  actionLink: string;
}

export default function Testimonial({
  quote,
  attribution,
  imageUrl,
  imageHint,
  actionText,
  actionLink,
}: TestimonialProps) {
  return (
    <AnimatedSection className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-2xl">
            <Image
              src={imageUrl}
              alt={attribution}
              fill
              className="object-cover"
              data-ai-hint={imageHint}
            />
          </div>
          <div className="text-left">
            <blockquote className="text-4xl md:text-5xl font-medium italic text-primary leading-tight mb-6">
              “{quote}”
            </blockquote>
            <p className="text-xl font-semibold text-accent mb-8">{attribution}</p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href={actionLink}>{actionText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
