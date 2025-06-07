
import HeroSection from '@/components/shared/HeroSection';
import ContentBlock from '@/components/shared/ContentBlock';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


const ftmProgramsHighlight: CardGridItem[] = [
  {
    id: 'counseling-family',
    title: 'Counseling & Family Support',
    description: 'Support for individuals, couples, and families. Includes counseling, family life seminars, and marriage forums.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Supportive hands',
    imageHint: 'family support counseling',
    actionText: 'Learn More',
    actionLink: '/programs/counseling-family-support',
  },
  {
    id: 'youth-student',
    title: 'Youth & Student Empowerment',
    description: 'Guiding young people and students through clubs (ASC) and school outreaches.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Youth group',
    imageHint: 'youth students learning',
    actionText: 'Learn More',
    actionLink: '/programs/youth-student-empowerment',
  },
  {
    id: 'faith-growth',
    title: 'Faith & Growth',
    description: 'Deepening spiritual understanding through discipleship classes.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Open book',
    imageHint: 'bible study growth',
    actionText: 'Learn More',
    actionLink: '/programs/faith-growth',
  },
];

const resourceItems: CardGridItem[] = [
   {
    id: 'sermons',
    title: 'Sermons & Teachings',
    description: 'Access messages and teachings from Family Tent Ministry events and programs.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Sermon graphic',
    imageHint: 'sermon message teaching',
    actionText: 'Watch & Listen',
    actionLink: '/sermons', 
  },
  {
    id: 'guides',
    title: 'Study Materials',
    description: 'Find guides and materials to support your spiritual growth and learning.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Open book with notes',
    imageHint: 'study guide book',
    actionText: 'Find Resources',
    actionLink: '/resources/guides', 
  },
  {
    id: 'counseling-support-shortcut', 
    title: 'Counseling Support',
    description: 'Learn more about our confidential counseling services.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Supportive hands',
    imageHint: 'support help guidance',
    actionText: 'Get Support',
    actionLink: '/programs/counseling-family-support',
  },
];


export default function HomePage() {
  return (
    <div>
      <HeroSection
        title="Welcome to Family Tent Ministry"
        subtitle="Guiding young people toward becoming healthy, responsible, and spiritually grounded members of society."
        imageUrl="https://placehold.co/1920x1080.png"
        imageAlt="Family Tent Ministry gathering or community event"
        imageHint="community gathering diverse"
        primaryActionText="Our Programs"
        primaryActionLink="/programs"
        secondaryActionText="Partner With Us"
        secondaryActionLink="/give"
      />

      <ContentBlock
        title="Who We Are"
        text={<>
          <p className="mb-4">Family Tent Ministry is a Christian nonprofit organization dedicated to teaching values and ethics that foster meaningful and purposeful living. We aim to guide young people toward becoming healthy, responsible, and spiritually grounded members of society.</p>
          <p>Our mission is to collaborate with families, religious institutions, associations, organizations, and communities in promoting values and ethics that will make young people become healthy and responsible members of society.</p>
        </>}
        imageUrl="https://placehold.co/800x600.png"
        imageAlt="Diverse group of people from Family Tent Ministry"
        imageHint="diverse community FTM"
        actionText="More About Us"
        actionLink="/about"
        imagePosition="right"
      />

      <ContentBlock
        title="Our Programs & Gatherings"
        text="Family Tent Ministry offers a range of programs designed to nurture spiritual growth, strengthen families, and equip individuals for purposeful living. From youth empowerment to faith development and family support, there's a place for everyone to connect and grow."
        imageUrl="https://placehold.co/800x600.png"
        imageAlt="People participating in a ministry program"
        imageHint="community learning FTM"
        actionText="Explore Our Programs"
        actionLink="/programs"
        imagePosition="left"
        className="bg-secondary/30"
      />

      <CardGrid title="Featured Program Areas" items={ftmProgramsHighlight} className="bg-background" />
      
      <AnimatedSection className="py-12 md:py-20 text-center bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline md:text-4xl mb-4">Recent Teachings</h2>
          <p className="text-lg mb-6">Engage with recent messages from our ministry leaders and events. (Content Coming Soon)</p>
          <div className="aspect-video max-w-3xl mx-auto bg-muted rounded-lg overflow-hidden shadow-xl mb-6">
            <Image src="https://placehold.co/1280x720.png" alt="Latest sermon video placeholder" data-ai-hint="sermon teaching video" width={1280} height={720} className="w-full h-full object-cover"/>
          </div>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
            <Link href="/sermons">Explore All Teachings</Link>
          </Button>
        </div>
      </AnimatedSection>

      <CardGrid title="Explore Resources" items={resourceItems} />
      
      <AnimatedSection className="py-12 md:py-20 text-center">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-8">Upcoming Events & Seminars</h2>
           <p className="text-lg text-foreground/80 mb-6">Stay connected and join us for our upcoming events, seminars, and club meetings.</p>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Family Life Seminar (FLS)", date: "Quarterly (Apr, Jul, Nov)", hint: "family conference poster" },
              { title: "Adolescent & Singles Club", date: "1st Saturday Monthly", hint: "youth event poster" },
              { title: "Discipleship Classes", date: "Mondays 5 PM", hint: "study group poster" }
            ].map((event, i) => (
                <Card key={`event-${i}`} className="flex flex-col overflow-hidden shadow-lg transition-shadow hover:shadow-xl bg-card">
                    <div className="relative h-40 w-full">
                         <Image src={`https://placehold.co/600x300.png`} alt={event.title} layout="fill" objectFit="cover" data-ai-hint={event.hint} className="rounded-t-lg"/>
                    </div>
                    <CardHeader className="pb-2 pt-4">
                        <CardTitle className="font-headline text-xl text-accent mb-1">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm font-semibold text-primary mb-2">{event.date}</p>
                        <p className="text-sm text-foreground/70">Details for this event will be available on our events page.</p>
                    </CardContent>
                </Card>
            ))}
           </div>
           <Button asChild size="lg" className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
}
