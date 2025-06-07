import HeroSection from '@/components/shared/HeroSection';
import ContentBlock from '@/components/shared/ContentBlock';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Image from 'next/image';

const getInvolvedItems: CardGridItem[] = [
  {
    id: 'ministries',
    title: 'Ministries',
    description: 'Explore various ministries to grow in your faith and serve others.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'People in a ministry group',
    imageHint: 'ministry group',
    actionText: 'Find Your Ministry',
    actionLink: '/ministries',
  },
  {
    id: 'groups',
    title: 'Community Groups',
    description: 'Connect with others in small groups for fellowship and spiritual growth.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Community group discussion',
    imageHint: 'community discussion',
    actionText: 'Join a Group',
    actionLink: '/connect/groups',
  },
  {
    id: 'serve',
    title: 'Serve Our City',
    description: 'Make a difference by serving in various capacities within our church and city.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Volunteers serving',
    imageHint: 'volunteers serving',
    actionText: 'Start Serving',
    actionLink: '/connect/serve',
  },
];

const resourceItems: CardGridItem[] = [
   {
    id: 'sermons',
    title: 'Latest Sermon Series',
    description: 'Catch up on our recent sermon series and explore our sermon archive.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Sermon graphic',
    imageHint: 'sermon message',
    actionText: 'Watch Sermons',
    actionLink: '/sermons',
  },
  {
    id: 'blog',
    title: 'Church Blog',
    description: 'Read articles and insights from our pastors and leaders.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Person reading a blog',
    imageHint: 'reading blog',
    actionText: 'Read Blog',
    actionLink: '/resources/blog',
  },
  {
    id: 'podcast',
    title: 'Podcasts',
    description: 'Listen to discussions on faith, culture, and life.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Podcast recording setup',
    imageHint: 'podcast recording',
    actionText: 'Listen Now',
    actionLink: '/resources/podcasts',
  },
];


export default function HomePage() {
  return (
    <div>
      <HeroSection
        title="Welcome to Family Tent Ministry"
        subtitle="Taking the gospel of our Lord Jesus Christ to all people groups in Kenya and beyond."
        imageUrl="https://placehold.co/1920x1080.png"
        imageAlt="Family Tent Ministry congregation or event"
        imageHint="church congregation"
        primaryActionText="I'm New Here"
        primaryActionLink="/new"
        secondaryActionText="Watch a Sermon"
        secondaryActionLink="/sermons"
      />

      <ContentBlock
        title="Who We Are"
        text="Family Tent Ministry is a ministry of people who are being transformed by the gospel of Jesus Christ. We desire to see communities renewed by the gospel and are committed to making disciples who make disciples."
        imageUrl="https://placehold.co/800x600.png"
        imageAlt="Diverse group of people smiling"
        imageHint="diverse community"
        actionText="Learn More About Us"
        actionLink="/about"
        imagePosition="right"
      />

      <ContentBlock
        title="Join Us This Sunday"
        text="We gather every Sunday across multiple locations in Austin. Find a campus near you and experience worship, teaching, and community with us."
        imageUrl="https://placehold.co/800x600.png"
        imageAlt="Church service in progress"
        imageHint="church service"
        actionText="Find a Location"
        actionLink="/locations"
        imagePosition="left"
        className="bg-secondary/30"
      />

      <CardGrid title="Get Involved" items={getInvolvedItems} className="bg-background" />
      
      <AnimatedSection className="py-12 md:py-20 text-center bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline md:text-4xl mb-4">Latest Sermon</h2>
          <p className="text-lg mb-6">Watch our most recent message.</p>
          <div className="aspect-video max-w-3xl mx-auto bg-muted rounded-lg overflow-hidden shadow-xl mb-6">
            <Image src="https://placehold.co/1280x720.png" alt="Latest sermon video placeholder" data-ai-hint="sermon video" width={1280} height={720} className="w-full h-full object-cover"/>
          </div>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
            <Link href="/sermons">Explore All Sermons</Link>
          </Button>
        </div>
      </AnimatedSection>

      <CardGrid title="Explore Resources" items={resourceItems} />
      
      <AnimatedSection className="py-12 md:py-20 text-center">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-8">Upcoming Events</h2>
           <p className="text-lg text-foreground/80 mb-6">Stay connected and join us for our upcoming events. There's something for everyone!</p>
           {/* Placeholder for event listings */}
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
                <div key={i} className="border p-4 rounded-lg shadow-md bg-card">
                    <Image src={`https://placehold.co/600x300.png`} alt={`Event ${i}`} data-ai-hint="event poster" width={600} height={300} className="rounded mb-2"/>
                    <h3 className="font-headline text-xl text-accent mb-1">Event Title {i}</h3>
                    <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                    <p className="text-sm text-foreground/70">Short event description. Lorem ipsum dolor sit amet.</p>
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
