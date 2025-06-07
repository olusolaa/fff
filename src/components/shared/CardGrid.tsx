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

export default function CardGrid({ title, items, className, gridCols = "md:grid-cols-2 lg:grid-cols-3" }: CardGridProps) {
  return (
    <AnimatedSection className={cn("py-12 md:py-20 bg-secondary/50", className)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="mb-10 text-center text-3xl font-bold font-headline text-primary md:text-4xl">
            {title}
          </h2>
        )}
        <div className={`grid grid-cols-1 gap-6 ${gridCols}`}>
          {items.map((item) => (
            <Card key={item.id} className="flex flex-col overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
              {item.imageUrl && item.imageAlt && (
                <div className="relative h-48 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={item.imageHint || "abstract"}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">{item.title}</CardTitle>
                <CardDescription className="text-foreground/80">{item.description}</CardDescription>
              </CardHeader>
              {item.actionText && item.actionLink && (
                <CardFooter className="mt-auto">
                  <Button asChild variant="link" className="text-accent hover:text-accent/80 p-0">
                    <Link href={item.actionLink}>{item.actionText}</Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
