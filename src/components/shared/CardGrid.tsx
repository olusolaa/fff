
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { cn } from "@/lib/utils";

export interface CardGridItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  imageHint?: string;
  actionText?: string;
  actionLink?: string;
}

interface CardGridProps {
  title?: string;
  items: CardGridItem[];
  className?: string;
  gridCols?: string; // e.g. "md:grid-cols-2 lg:grid-cols-3"
}
export default function CardGrid({
  title,
  items,
  className,
}: CardGridProps) {
  return (
    <AnimatedSection className={cn("py-16 md:py-24 bg-secondary/50", className)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="mb-12 text-center text-3xl font-bold font-headline text-primary md:text-4xl">
            {title}
          </h2>
        )}

        {/* Changed from grid to horizontal scroll */}
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-hide">
  {items.map((item) => (
    <div key={item.id} className="flex-shrink-0 w-80 md:w-96">
      <Card className="flex h-full flex-col overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
        {item.imageUrl && item.imageAlt && (
          <div className="relative h-48 w-full">
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              className="object-cover"
              data-ai-hint={item.imageHint || "abstract"}
            />
          </div>
        )}
        <CardHeader className="flex-grow">
          <CardTitle className="font-headline text-xl text-primary">
            {item.title}
          </CardTitle>
          <CardDescription className="text-foreground/80 pt-1">
            {item.description}
          </CardDescription>
        </CardHeader>
        {item.actionText && item.actionLink && (
          <CardFooter className="mt-auto pt-2">
            <Button
              asChild
              variant="link"
              className="text-accent hover:text-accent/80 p-0"
            >
              <Link href={item.actionLink}>{item.actionText}</Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  ))}
</div>

      </div>
    </AnimatedSection>
  );
}
