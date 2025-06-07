
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import { BookOpen, Users } from 'lucide-react';

const subPrograms: CardGridItem[] = [
  {
    id: 'discipleship',
    title: 'Discipleship Classes',
    description: 'Weekly classes (Mondays, 5 PM) aimed at deepening understanding of Christian doctrines and fostering spiritual growth.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'bible study group',
    actionText: 'About Discipleship',
    actionLink: '/ministries/discipleship-classes', // Link to old page, to be updated/removed
  }
];

export default function FaithGrowthPage() {
  return (
    <div>
      <ContentBlock
        title="Faith & Growth"
        text="Family Tent Ministry provides opportunities for believers to deepen their understanding of Christian doctrines, cultivate spiritual disciplines, and grow into mature followers of Christ. Our programs are designed to equip you for a life rooted in faith."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageHint="growing plant light"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-10 text-center">Cultivating Spiritual Maturity</h2>
          <div className="grid md:grid-cols-1 gap-8 text-center">
            <div className="bg-card p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <BookOpen className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-primary mb-2">In-Depth Learning</h3>
              <p className="text-foreground/80">
                Our Discipleship Classes offer systematic study and discussion to build a solid foundation in Christian truths and encourage practical application of biblical principles.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <CardGrid title="Grow Your Faith With Us" items={subPrograms} className="bg-background" />
       <AnimatedSection className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Join our Discipleship Classes to take your faith to a deeper level and connect with fellow learners on the journey of spiritual maturity.
        </p>
      </AnimatedSection>
    </div>
  );
}
