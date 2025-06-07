
import HeroSection from '@/components/shared/HeroSection';
import ContentBlock from '@/components/shared/ContentBlock';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Image from 'next/image'; // Ensured Image is imported

const ftmProgramsHighlight: CardGridItem[] = [
  {
    id: 'asc',
    title: 'Adolescent & Singles Club',
    description: 'Monthly gatherings for young people focusing on purposeful living.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Young people in discussion',
    imageHint: 'youth group FTM',
    actionText: 'Learn More',
    actionLink: '/ministries/adolescent-singles-club',
  },
  {
    id: 'fls',
    title: 'Family Life Seminars',
    description: 'Quarterly seminars addressing marriage, parenting, and relationships.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Family seminar',
    imageHint: 'family conference FTM',
    actionText: 'Learn More',
    actionLink: '/ministries/family-life-seminars',
  },
  {
    id: 'discipleship',
    title: 'Discipleship Classes',
    description: 'Weekly classes for deepening Christian understanding and spiritual growth.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'People studying Bible',
    imageHint: 'bible study FTM',
    actionText: 'Learn More',
    actionLink: '/ministries/discipleship-classes',
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
    actionLink: '/sermons', // Assuming /sermons page will be adapted or used for FTM
  },
  {
    id: 'guides',
    title: 'Study Materials',
    description: 'Find guides and materials to support your spiritual growth and learning.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Open book with notes',
    imageHint: 'study guide book',
    actionText: 'Find Resources',
    actionLink: '/resources/guides', // Placeholder link
  },
  {
    id: 'counseling',
    title: 'Counseling Support',
    description: 'Learn more about our confidential counseling services for individuals and couples.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Supportive hands',
    imageHint: 'support help guidance',
    actionText: 'Get Support',
    actionLink: '/ministries/counseling-services',
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
        primaryActionText="Learn About Our Programs"
        primaryActionLink="/ministries"
        secondaryActionText="Get Involved"
        secondaryActionLink="/contact" // Or a dedicated "Get Involved" page if created
      />

      <ContentBlock
        title="Who We Are"
        text="Family Tent Ministry is a Christian nonprofit organization dedicated to teaching values and ethics that foster meaningful and purposeful living. Our mission is to collaborate with families, religious institutions, and communities to promote values that help young people become healthy and responsible members of society."
        imageUrl="https://placehold.co/800x600.png"
        imageAlt="Diverse group of people from Family Tent Ministry"
        imageHint="diverse community FTM"
        actionText="More About Us"
        actionLink="/about"
        imagePosition="right"
      />

      <ContentBlock
        title="Our Programs & Gatherings"
        text="Family Tent Ministry offers a range of programs designed to nurture spiritual growth, strengthen families, and equip individuals for purposeful living. From youth clubs to marriage forums and discipleship classes, there's a place for everyone to connect and grow."
        imageUrl="https://placehold.co/800x600.png"
        imageAlt="People participating in a ministry program"
        imageHint="community learning FTM"
        actionText="Explore Our Programs"
        actionLink="/ministries"
        imagePosition="left"
        className="bg-secondary/30"
      />

      <CardGrid title="Featured Programs" items={ftmProgramsHighlight} className="bg-background" />
      
      <AnimatedSection className="py-12 md:py-20 text-center bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline md:text-4xl mb-4">Recent Teachings</h2>
          <p className="text-lg mb-6">Engage with recent messages from our ministry leaders and events.</p>
          <div className="aspect-video max-w-3xl mx-auto bg-muted rounded-lg overflow-hidden shadow-xl mb-6">
            {/* Placeholder for an embedded video or image link to sermons page */}
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
           {/* Placeholder for event listings - to be dynamically populated or linked from /events */}
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Family Life Seminar (FLS)", date: "Next Quarter (e.g., July)", hint: "family conference poster" },
              { title: "Adolescent & Singles Club", date: "1st Saturday Monthly", hint: "youth event poster" },
              { title: "Marriage Forum", date: "2nd Saturday Monthly", hint: "couples workshop poster" }
            ].map((event, i) => (
                <div key={i} className="border p-4 rounded-lg shadow-md bg-card">
                    <Image src={`https://placehold.co/600x300.png`} alt={event.title} data-ai-hint={event.hint} width={600} height={300} className="rounded mb-2"/>
                    <h3 className="font-headline text-xl text-accent mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{event.date}</p>
                    <p className="text-sm text-foreground/70">Details for this event will be available soon.</p>
                </div>
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
