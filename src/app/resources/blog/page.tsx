
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  return (
    <div>
      <ContentBlock
        title="Church Blog"
        text="Read articles and insights from our pastors and leaders. Our blog is coming soon!"
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-lg text-center text-foreground/80 mb-10">
            Our latest blog posts will appear here. Check back soon for inspiring content.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Understanding Grace", excerpt: "A short devotional on the meaning of grace...", hint:"open book" },
              { title: "Community Matters", excerpt: "Why biblical community is essential for growth...", hint:"people talking" },
              { title: "Living on Mission", excerpt: "Practical ways to share your faith daily...", hint:"city street" }
            ].map((post, i) => (
              <Card key={i} className="shadow-lg">
                 <Image src={`https://placehold.co/600x300.png`} alt={post.title} data-ai-hint={post.hint} width={600} height={300} className="rounded-t-lg"/>
                <CardHeader>
                    <CardTitle className="font-headline text-xl text-primary">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-foreground/80 mb-4">{post.excerpt}</CardDescription>
                    <Button asChild variant="link" className="text-accent p-0">
                        <Link href="#">Read More (Coming Soon)</Link>
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
