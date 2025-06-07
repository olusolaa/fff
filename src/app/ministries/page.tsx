
import ContentBlock from '@/components/shared/ContentBlock';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import AnimatedSection from '@/components/shared/AnimatedSection';

const ftmPrograms: CardGridItem[] = [
  {
    id: 'asc',
    title: 'Adolescent & Singles Club (ASC)',
    description: 'Monthly gatherings (1st Saturday, 10 AM) guiding adolescents and singles towards purposeful living through discussions, teachings, and interactive sessions.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Young people in a discussion',
    imageHint: 'youth group discussion',
    actionText: 'Learn More',
    actionLink: '/ministries/adolescent-singles-club',
  },
  {
    id: 'fls',
    title: 'Family Life Seminars (FLS)',
    description: 'Quarterly seminars (April, July, November) addressing marriage, parenting, and relationship dynamics to strengthen family bonds.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Family attending a seminar',
    imageHint: 'family seminar conference',
    actionText: 'Learn More',
    actionLink: '/ministries/family-life-seminars',
  },
  {
    id: 'discipleship',
    title: 'Discipleship Classes',
    description: 'Weekly classes (Mondays, 5 PM) aimed at deepening understanding of Christian doctrines and fostering spiritual growth.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'People studying together',
    imageHint: 'bible study group',
    actionText: 'Learn More',
    actionLink: '/ministries/discipleship-classes',
  },
   {
    id: 'marriage-forum',
    title: 'Marriage Forum',
    description: 'Monthly forums (2nd Saturday, 10 AM) providing a platform for couples to discuss and learn about building strong, godly marriages.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Couples in discussion',
    imageHint: 'couples talking marriage',
    actionText: 'Learn More',
    actionLink: '/ministries/marriage-forum',
  },
  {
    id: 'school-outreach',
    title: 'School Outreaches',
    description: 'Collaborative programs with schools including morning assemblies and campus awareness sessions to promote moral values.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Students in an assembly',
    imageHint: 'school assembly students',
    actionText: 'Learn More',
    actionLink: '/ministries/school-outreaches',
  },
   {
    id: 'counseling',
    title: 'Counseling Services',
    description: 'Confidential counseling for individuals and couples seeking guidance on personal, relational, or spiritual matters.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Counseling session',
    imageHint: 'counseling support session',
    actionText: 'Get Support',
    actionLink: '/ministries/counseling-services',
  },
];

export default function MinistriesPage() {
  return (
    <div>
      <ContentBlock
        title="Our Programs"
        text="Family Tent Ministry offers a variety of programs designed to foster spiritual growth, strengthen families, and equip individuals with values for purposeful living. Explore how you can get involved."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <CardGrid items={ftmPrograms} />
      <AnimatedSection className="py-12 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-4">Find Your Place to Grow</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            No matter your age or stage of life, there's a program at Family Tent Ministry designed to support your journey. We encourage you to connect and grow with us.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
