
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import { cn } from '@/lib/utils';

interface ContentBlockProps {
  title: string;
  text: string | React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  imageHint?: string;
  actionText?: string;
  actionLink?: string;
  imagePosition?: 'left' | 'right';
  className?: string;
  titleClassName?: string;
  textClassName?: string;
}

export default function ContentBlock({
  title,
  text,
  imageUrl,
  imageAlt,
  imageHint,
  actionText,
  actionLink,
  imagePosition = 'right',
  className,
  titleClassName,
  textClassName,
}: ContentBlockProps) {
  const hasImage = imageUrl && imageAlt;

  return (
    <AnimatedSection className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "grid items-center gap-8 md:gap-12",
          hasImage ? "md:grid-cols-2" : "md:grid-cols-1"
        )}>
          <div className={cn(
            "space-y-6 text-center md:text-left", // Increased default space-y
            hasImage && imagePosition === 'right' ? 'md:order-1' : 'md:order-2'
          )}>
            <h2 className={cn("text-3xl font-bold font-headline text-primary md:text-4xl", titleClassName)}>
              {title}
            </h2>
            <div className={cn("text-lg text-foreground/80", textClassName, actionText && actionLink ? "mb-2" : "")}> 
              {typeof text === 'string' ? <p>{text}</p> : text}
            </div>
            {actionText && actionLink && (
              <div className="pt-2"> {/* Added pt-2 for button spacing */}
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href={actionLink}>{actionText}</Link>
                </Button>
              </div>
            )}
          </div>
          {hasImage && (
            <div className={cn(
              "relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg",
              imagePosition === 'right' ? 'md:order-2' : 'md:order-1'
            )}>
              <Image
                src={imageUrl}
                alt={imageAlt}
                layout="fill"
                objectFit="cover"
                data-ai-hint={imageHint || "community gathering"}
              />
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
