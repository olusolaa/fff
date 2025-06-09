
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

export default function VideosPage() {
  return (
    <div>
      <ContentBlock
        title="Videos"
        text="Explore video content from Family Tent Ministry, including teachings, event highlights, and more. This section is currently under development."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-lg text-center text-foreground/80 mb-10">
            Our video library will feature various recordings. Check back soon! For now, you can find many of our teachings on the <Link href="/sermons" className="text-accent hover:underline">Sermons page</Link>.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Understanding Our Mission", excerpt: "A short video explaining the heart behind FTM.", hint:"presentation video" },
              { title: "Youth Conference Highlights", excerpt: "See moments from our latest youth event.", hint:"event conference" },
              { title: "Testimony: A Life Changed", excerpt: "Hear a powerful story of transformation.", hint:"interview person" }
            ].map((video, i) => (
              <Card key={i} className="shadow-lg">
                 <Image src={`https://placehold.co/600x338.png`} alt={video.title} data-ai-hint={video.hint} width={600} height={338} className="rounded-t-lg object-cover"/>
                <CardHeader>
                    <CardTitle className="font-headline text-xl text-primary flex items-center">
                       <PlayCircle className="mr-2 h-5 w-5 text-accent"/>
                        {video.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-foreground/80 mb-4">{video.excerpt}</CardDescription>
                    <Button asChild variant="link" className="text-accent p-0">
                        <Link href="#">Watch (Coming Soon)</Link>
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
