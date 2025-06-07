
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Music2 } from 'lucide-react';

export default function MusicPage() {
  return (
    <div>
      <ContentBlock
        title="Austin Stone Worship"
        text="Listen to music from Austin Stone Worship and find worship resources. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-lg text-center text-foreground/80 mb-10">
            Discover our latest albums and singles. Links to streaming platforms coming soon.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Hope Awakens (Album)", year: "2023", hint: "album cover" },
              { title: "Ever Faithful (Single)", year: "2024", hint: "music notes" },
              { title: "Psalms of Ascent (EP)", year: "2022", hint: "worship concert" }
            ].map((music, i) => (
              <Card key={i} className="shadow-lg">
                 <Image src={`https://placehold.co/600x400.png`} alt={music.title} data-ai-hint={music.hint} width={600} height={400} className="rounded-t-lg"/>
                <CardHeader>
                    <CardTitle className="font-headline text-xl text-primary flex items-center">
                       <Music2 className="mr-2 h-5 w-5 text-accent"/>
                        {music.title}
                    </CardTitle>
                     <CardDescription className="text-muted-foreground">{music.year}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="link" className="text-accent p-0">
                        <Link href="#">Listen (Coming Soon)</Link>
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
