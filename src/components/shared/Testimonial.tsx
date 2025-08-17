import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import { ArrowRight } from 'lucide-react';

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
    <section className="py-32 md:py-40 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      {/* Decorative elements for elegance */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
      
      {/* Floating background shapes for depth */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <AnimatedSection className="container mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-sm uppercase tracking-[0.3em] text-accent font-medium mb-4">
            Stories of Transformation
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          {/* Image Section with Enhanced Effects */}
          <div className="relative group">
            {/* Glow effect behind image */}
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>
            
            {/* Main image container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]">
              <Image
                src={imageUrl}
                alt={attribution}
                fill
                className="object-cover"
                data-ai-hint={imageHint}
              />
              
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            
            {/* Decorative frame corners */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-accent/30 rounded-tl-3xl"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-accent/30 rounded-br-3xl"></div>
          </div>
          
          {/* Content Section with Enhanced Typography */}
          <div className="space-y-10">
            <blockquote className="relative">
              {/* Large decorative quote mark */}
              <div className="absolute -top-12 -left-8 text-[120px] text-accent/10 font-serif leading-none select-none">"</div>
              
              {/* Main quote text */}
              <p className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary leading-tight relative z-10">
                <span className="block mb-4">
                  {quote.split('.')[0]}.
                </span>
                {quote.split('.')[1] && (
                  <span className="block text-2xl md:text-3xl lg:text-4xl text-primary/80">
                    {quote.split('.')[1]}.
                  </span>
                )}
              </p>
              
              {/* Decorative line under quote */}
              <div className="mt-8 w-16 h-0.5 bg-gradient-to-r from-accent to-accent/30"></div>
            </blockquote>
            
            {/* Attribution with enhanced styling */}
            <div className="space-y-2">
              <p className="text-2xl font-medium text-accent">
                {attribution}
              </p>
              <p className="text-foreground/50 text-lg">Member since 2019</p>
              
              {/* Star rating or impact metric */}
              <div className="flex items-center gap-1 pt-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-5 h-5 text-yellow-500/70" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-foreground/60">Life Transformed</span>
              </div>
            </div>
            
            {/* CTA Button with enhanced styling */}
            <div className="pt-4">
              <Button 
                asChild 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transform transition-all hover:scale-105 px-8 py-6"
              >
                <Link href={actionLink} className="flex items-center gap-3">
                  <span className="text-lg">{actionText}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              {/* Additional subtle CTA */}
              <p className="mt-6 text-foreground/60">
                <Link href="/testimonials" className="hover:text-accent transition-colors">
                  View all testimonials →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}