
import ContentBlock from '@/components/shared/ContentBlock';
import CardGrid, { CardGridItem } from '@/components/shared/CardGrid';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; 
import Link from 'next/link';

const coreValues: CardGridItem[] = [
  {
    id: 'gospel',
    title: 'Christ-Centered Values',
    description: 'Our work is rooted in Christian values and the teachings of the gospel, guiding young people to purposeful living.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Gospel symbol',
    imageHint: 'cross symbol open bible'
  },
  {
    id: 'community',
    title: 'Supportive Community',
    description: 'We foster a supportive community, collaborating with families and institutions to nurture responsible individuals.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Community',
    imageHint: 'diverse people talking'
  },
  {
    id: 'mission',
    title: 'Holistic Development',
    description: 'We are dedicated to promoting values and ethics that lead to holistic development and community transformation.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Holistic development',
    imageHint: 'growing plant city'
  },
];

export default function AboutPage() {
  return (
    <div>
      <ContentBlock
        title="About Family Tent Ministry"
        text="Family Tent Ministry is a Christian nonprofit organization dedicated to teaching values and ethics that foster meaningful and purposeful living. We aim to guide young people toward becoming healthy, responsible, and spiritually grounded members of society."
        imageUrl="https://placehold.co/1200x800.png"
        imageAlt="Family Tent Ministry gathering"
        imageHint="community group discussion"
        imagePosition="right"
        className="bg-secondary/30"
        titleClassName="text-4xl md:text-5xl"
      />

      <ContentBlock
        title="Our History"
        text="Established in April 1999, Family Tent Ministry (FTM) has been a beacon of hope, reaching out to singles, married couples, and youths through various programs and initiatives. We have consistently worked towards fostering environments where individuals can grow spiritually and morally."
        actionText="Learn More About Our History"
        actionLink="/about/history"
        className="py-16 md:py-24" // Increased padding
      />
      
      <ContentBlock
        title="Our Mission & Vision"
        text={<>
          <h3 className="text-2xl font-semibold font-headline text-accent mb-3">Our Mission</h3>
          <p className="mb-6 text-lg">Family Tent Ministry exists to collaborate with families, religious institutions, associations, organizations, and communities in promoting values and ethics that will make young people become healthy and responsible members of society.</p>
          <h3 className="text-2xl font-semibold font-headline text-accent mb-3">Our Vision</h3>
          <p className="text-lg">A society where individuals and families live out Christian values, leading to holistic development and community transformation.</p>
        </>}
        imageUrl="https://placehold.co/800x600.png"
        imageAlt="Vision of community transformation"
        imageHint="bright future community"
        imagePosition="right"
        className="bg-secondary/30 py-16 md:py-24" // Increased padding
      />

      <ContentBlock
        title="Our Beliefs"
        text="Family Tent Ministry is a Christian nonprofit organization dedicated to teaching values and ethics that foster meaningful and purposeful living. We aim to guide young people toward becoming healthy, responsible, and spiritually grounded members of society."
        actionText="Learn More About Our Beliefs"
        actionLink="/about/beliefs"
        className="py-16 md:py-24" // Increased padding
      />

      <CardGrid title="Our Core Values" items={coreValues} className="bg-background" />

      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-8">Meet Our Team</h2>
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            Information about our dedicated team, committed to guiding Family Tent Ministry's mission, is coming soon. Please check back later.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Team Member Placeholder 1", title: "Role Placeholder", img: "https://placehold.co/400x400.png", hint: "leader portrait" },
              { name: "Team Member Placeholder 2", title: "Role Placeholder", img: "https://placehold.co/400x400.png", hint: "team member"  },
              { name: "Team Member Placeholder 3", title: "Role Placeholder", img: "https://placehold.co/400x400.png", hint: "professional portrait"  },
            ].map((leader, index) => (
              <div key={`${leader.name}-${index}`} className="flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 shadow-lg">
                  <Image src={leader.img} alt={leader.name} fill className="object-cover" data-ai-hint={leader.hint}/>
                </div>
                <h3 className="text-xl font-semibold font-headline text-primary">{leader.name}</h3>
                <p className="text-md text-accent">{leader.title}</p>
              </div>
            ))}
          </div>
           <Button asChild size="lg" className="mt-12 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/about/leadership">More About Our Team</Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
}
