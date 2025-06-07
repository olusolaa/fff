import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircleIcon, ListIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const sermonSeries = [
  {
    id: "current-series",
    title: "Current Series: Faith Over Fear",
    description: "Join us as we explore how to live a life of courage and trust in God amidst uncertain times.",
    imageUrl: "https://placehold.co/800x450.png",
    imageHint: "abstract faith",
    episodes: [
      { title: "Understanding Fear", speaker: "Pastor John Doe", date: "October 27, 2024", videoLink: "#" },
      { title: "The Power of Faith", speaker: "Pastor John Doe", date: "October 20, 2024", videoLink: "#" },
    ]
  },
  {
    id: "previous-series-1",
    title: "The Book of Romans",
    description: "A deep dive into Paul's letter to the Romans, uncovering foundational truths of the Christian faith.",
    imageUrl: "https://placehold.co/800x450.png",
    imageHint: "ancient scroll",
    episodes: [
      { title: "Romans 1: Righteousness Revealed", speaker: "Pastor Jane Smith", date: "September 15, 2024", videoLink: "#" },
      { title: "Romans 3: All Have Sinned", speaker: "Pastor Jane Smith", date: "September 8, 2024", videoLink: "#" },
    ]
  }
];

const recentSermons = [
    { id: "sermon1", title: "Living a Life of Purpose", speaker: "Pastor John Doe", date: "October 27, 2024", series: "Faith Over Fear", imageUrl:"https://placehold.co/600x338.png", imageHint:"compass direction", videoLink: "#"},
    { id: "sermon2", title: "The Heart of Worship", speaker: "Pastor Emily White", date: "October 20, 2024", series: "Guest Speaker", imageUrl:"https://placehold.co/600x338.png", imageHint:"music notes", videoLink: "#" },
    { id: "sermon3", title: "Navigating Tough Times", speaker: "Pastor Jane Smith", date: "October 13, 2024", series: "Faith Over Fear", imageUrl:"https://placehold.co/600x338.png", imageHint:"stormy sea", videoLink: "#" },
];


export default function SermonsPage() {
  return (
    <div>
      <ContentBlock
        title="Watch & Listen"
        text="Engage with teaching from The Austin Stone wherever you are. Explore our latest sermons, browse past series, and find messages that speak to your heart."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />

      {sermonSeries.map(series => (
        <AnimatedSection key={series.id} className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-4">{series.title}</h2>
            <p className="text-lg text-foreground/80 mb-8">{series.description}</p>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <Image src={series.imageUrl} alt={series.title} width={800} height={450} className="rounded-lg shadow-md" data-ai-hint={series.imageHint} />
                </div>
                <div className="space-y-4">
                    {series.episodes.map(ep => (
                        <Card key={ep.title} className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-headline text-accent">{ep.title}</CardTitle>
                                <CardDescription>Speaker: {ep.speaker} | Date: {ep.date}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button asChild variant="link" className="p-0 text-primary">
                                   <Link href={ep.videoLink}><PlayCircleIcon className="mr-2 h-5 w-5" /> Watch Now</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
      
      <AnimatedSection className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-8 text-center">Recent Messages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSermons.map((sermon) => (
              <Card key={sermon.id} className="flex flex-col overflow-hidden shadow-lg">
                <div className="relative h-48 w-full">
                  <Image src={sermon.imageUrl} alt={sermon.title} layout="fill" objectFit="cover" data-ai-hint={sermon.imageHint}/>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-primary">{sermon.title}</CardTitle>
                  <CardDescription>
                    {sermon.speaker} - {sermon.date}<br/>
                    Series: {sermon.series}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button asChild variant="link" className="text-accent hover:text-accent/80 p-0">
                    <Link href={sermon.videoLink}><PlayCircleIcon className="mr-2 h-5 w-5" /> Watch Sermon</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <div className="text-center mt-10">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <ListIcon className="mr-2 h-5 w-5" /> Browse Full Archive
                </Button>
            </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
