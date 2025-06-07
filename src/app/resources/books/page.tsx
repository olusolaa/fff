
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { BookMarked } from 'lucide-react';

export default function RecommendedBooksPage() {
  return (
    <div>
      <ContentBlock
        title="Recommended Books"
        text="A curated list of books for spiritual growth and learning. This page is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-lg text-center text-foreground/80 mb-10">
            Our recommended reading list will be available here, categorized for easy browsing.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Mere Christianity", author: "C.S. Lewis", hint:"book cover" },
              { title: "The Prodigal God", author: "Timothy Keller", hint:"book stack" },
              { title: "Knowing God", author: "J.I. Packer", hint:"bookshelf" }
            ].map((book, i) => (
              <Card key={i} className="shadow-lg">
                 <Image src={`https://placehold.co/400x300.png`} alt={book.title} data-ai-hint={book.hint} width={400} height={300} className="rounded-t-lg object-cover"/>
                <CardHeader>
                    <CardTitle className="font-headline text-xl text-primary flex items-center">
                       <BookMarked className="mr-2 h-5 w-5 text-accent"/>
                        {book.title}
                    </CardTitle>
                     <CardDescription className="text-muted-foreground">by {book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/80 text-sm">Further details and why we recommend this book will appear here.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
