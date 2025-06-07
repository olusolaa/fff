
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import { Users, HeartHandshake, ShieldCheck } from 'lucide-react';

const subPrograms: CardGridItem[] = [
  {
    id: 'counseling',
    title: 'Counseling Services',
    description: 'Confidential, biblically-based counseling for individuals, couples, and families facing personal, relational, or spiritual challenges.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'counseling session support',
    actionText: 'Learn About Counseling',
    actionLink: '/ministries/counseling-services', // Link to old page, to be updated/removed
  },
  {
    id: 'family-life',
    title: 'Family Life Programs',
    description: 'Seminars and forums designed to equip individuals and families with practical wisdom for marriage, parenting, and relationship dynamics.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'family seminar conference',
    actionText: 'Explore Family Programs',
    actionLink: '/ministries/family-life-seminars', // Link to old page, to be updated/removed
  },
   {
    id: 'marriage-forum',
    title: 'Marriage Forum',
    description: 'Monthly forums (2nd Saturday, 10 AM) providing a platform for couples to discuss and learn about building strong, godly marriages.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Couples in discussion',
    imageHint: 'couples talking marriage',
    actionText: 'Join the Forum',
    actionLink: '/ministries/marriage-forum', // Link to old page, to be updated/removed
  }
];

export default function CounselingFamilySupportPage() {
  return (
    <div>
      <ContentBlock
        title="Counseling & Family Support"
        text="Family Tent Ministry is committed to strengthening individuals and families through compassionate counseling services and enriching family life programs. We provide support and guidance rooted in Christian principles to help navigate life's challenges and foster healthy relationships."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageHint="supportive hands family"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-10 text-center">Key Areas of Support</h2>
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <HeartHandshake className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-primary mb-2">Individual & Couples Counseling</h3>
              <p className="text-foreground/80">
                Offering a safe space for individuals and couples to explore challenges, find healing, and grow in their relationships and personal well-being.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-primary mb-2">Family Life Enrichment</h3>
              <p className="text-foreground/80">
                Providing seminars, forums, and resources focused on marriage enrichment, effective parenting, and building strong family bonds.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <CardGrid title="Our Support Programs" items={subPrograms} className="bg-background" />
      <AnimatedSection className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Detailed information about our Counseling Services, Family Life Seminars, and Marriage Forum can be found by exploring the cards above. These programs are designed to provide practical tools and spiritual guidance.
        </p>
      </AnimatedSection>
    </div>
  );
}
