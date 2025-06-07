
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import { HandHeart, Users } from 'lucide-react';

// Placeholder for sub-programs/initiatives once defined
const subPrograms: CardGridItem[] = [
  // Example:
  // {
  //   id: 'local-projects',
  //   title: 'Local Service Projects',
  //   description: 'Engaging in hands-on projects to serve the needs of our local community.',
  //   imageUrl: 'https://placehold.co/600x400.png',
  //   imageHint: 'volunteers working community',
  //   actionText: 'Get Involved',
  //   actionLink: '#', 
  // },
];

export default function CommunityOutreachPage() {
  return (
    <div>
      <ContentBlock
        title="Community Outreach"
        text="Family Tent Ministry is dedicated to making a positive impact beyond our immediate fellowship by engaging with and serving the wider community. We believe in demonstrating God's love through practical action and sharing our values."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageHint="community diverse hands"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-10 text-center">Serving Our Neighbors</h2>
          <div className="grid md:grid-cols-2 gap-8 text-center">
             <div className="bg-card p-6 rounded-lg shadow-md">
              <HandHeart className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-primary mb-2">Practical Support</h3>
              <p className="text-foreground/80">
                Identifying and responding to the needs within our community through various service initiatives and partnerships.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-primary mb-2">Building Connections</h3>
              <p className="text-foreground/80">
                Fostering relationships and collaborations with local organizations and individuals to collectively enhance community well-being.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {subPrograms.length > 0 && (
        <CardGrid title="Our Outreach Initiatives" items={subPrograms} className="bg-background" />
      )}
       <AnimatedSection className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          More information about our specific community outreach programs and how you can get involved will be available here soon.
        </p>
      </AnimatedSection>
    </div>
  );
}
