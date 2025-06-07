
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';


export default function PodcastsPage() {
  return (
    <div>
      <ContentBlock
        title="Austin Stone Podcasts"
        text="Listen to discussions on faith, culture, and life. Our podcast library is coming soon!"
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-lg text-center text-foreground/80 mb-10">
            Explore our podcast series below. Full episodes and subscription links coming soon.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Faith & Culture", desc: "Navigating modern life through a biblical lens.", hint: "microphone podcast" },
              { title: "Leadership Lessons", desc: "Insights for leaders in ministry and beyond.", hint: "discussion group" },
              { title: "Parenting with Purpose", desc: "Encouragement for Christian parents.", hint: "family happy" }
            ].map((podcast, i) => (
              <Card key={i} className="shadow-lg">
                <Image src={`https://placehold.co/600x300.png`} alt={podcast.title} data-ai-hint={podcast.hint} width={600} height={300} className="rounded-t-lg"/>
                <CardHeader>
                    <CardTitle className="font-headline text-xl text-primary flex items-center">
                        <Mic className="mr-2 h-5 w-5 text-accent"/>
                        {podcast.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-foreground/80 mb-4">{podcast.desc}</CardDescription>
                    <Button asChild variant="link" className="text-accent p-0">
                        <Link href="#">Listen Now (Coming Soon)</Link>
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
