
import ContentBlock from '@/components/shared/ContentBlock';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import AnimatedSection from '@/components/shared/AnimatedSection';

const ftmProgramCategories: CardGridItem[] = [
  {
    id: 'counseling-family-support',
    title: 'Counseling & Family Support',
    description: 'Providing confidential counseling and support for individuals and families. Includes: Counseling Services, Family Life Seminars, Marriage Forum.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Supportive group session',
    imageHint: 'support group family',
    actionText: 'Learn More',
    actionLink: '/programs/counseling-family-support',
  },
  {
    id: 'youth-student-empowerment',
    title: 'Youth & Student Empowerment',
    description: 'Engaging adolescents, singles, and students. Includes: Adolescent & Singles Club (ASC), School Outreaches.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Students learning together',
    imageHint: 'youth students learning',
    actionText: 'Learn More',
    actionLink: '/programs/youth-student-empowerment',
  },
  {
    id: 'faith-growth',
    title: 'Faith & Growth',
    description: 'Deepening spiritual understanding and fostering growth. Includes: Discipleship Classes.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Person studying a book',
    imageHint: 'bible study growth',
    actionText: 'Learn More',
    actionLink: '/programs/faith-growth',
  },
   {
    id: 'community-outreach',
    title: 'Community Outreach',
    description: 'Reaching out to the wider community through various initiatives designed to share our values and make a positive impact.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Community members working together',
    imageHint: 'community service helping',
    actionText: 'Learn More',
    actionLink: '/programs/community-outreach',
  },
];

export default function ProgramsPage() {
  return (
    <div>
      <ContentBlock
        title="Our Programs"
        text="Family Tent Ministry offers a variety of programs designed to foster spiritual growth, strengthen families, and equip individuals with values for purposeful living. Explore our main program areas below."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <CardGrid items={ftmProgramCategories} />
      <AnimatedSection className="py-12 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-4">Find Your Place to Grow</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            No matter your age or stage of life, there's a program area at Family Tent Ministry designed to support your journey. We encourage you to connect and grow with us.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
