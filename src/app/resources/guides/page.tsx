
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function StudyGuidesPage() {
  return (
    <div>
      <ContentBlock
        title="Study Guides & Devotionals"
        text="Deepen your understanding of scripture with our study materials. Resources are coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-lg text-center text-foreground/80 mb-10">
            Downloadable study guides and devotionals will be available here.
          </p>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Romans Study Guide", desc: "Companion guide for our Romans sermon series.", hint:"bible study" },
              { title: "Daily Devotional: Psalms", desc: "A 30-day devotional through the Psalms.", hint:"open bible" },
              { title: "Family Worship Guide", desc: "Resources for leading family worship.", hint:"family praying" }
            ].map((guide, i) => (
              <Card key={i} className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl text-primary flex items-center">
                       <BookOpen className="mr-2 h-5 w-5 text-accent"/>
                        {guide.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-foreground/80 mb-4">{guide.desc}</CardDescription>
                    <Button asChild variant="link" className="text-accent p-0">
                        <Link href="#">Download (Coming Soon)</Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
