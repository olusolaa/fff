
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { CalendarDays, Users, BookOpen } from 'lucide-react';

export default function FamilyLifeSeminarsPage() {
  return (
    <div>
      <ContentBlock
        title="Family Life Seminars (FLS)"
        text="Quarterly seminars designed to equip individuals and families with practical wisdom and biblical principles for navigating various aspects of family life."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageAlt="Diverse group of people at a seminar"
        imageHint="family seminar conference"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-6 text-center">Program Details</h2>
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <Users className="mr-2 h-6 w-6" /> Who is it for?
              </h3>
              <p className="text-foreground/80">
                Singles, engaged couples, married couples, parents, and anyone interested in building stronger family relationships.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <CalendarDays className="mr-2 h-6 w-6" /> When?
              </h3>
              <p className="text-foreground/80">
                Held quarterly in April, July, and November. Specific dates will be announced on our events page.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <BookOpen className="mr-2 h-6 w-6" /> Focus Areas:
              </h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>Marriage enrichment and communication.</li>
                <li>Effective parenting strategies.</li>
                <li>Navigating relationship dynamics.</li>
                <li>Financial management in the family.</li>
                <li>Spiritual leadership in the home.</li>
              </ul>
            </div>
            <p className="text-lg text-center text-foreground/70">
              Our Family Life Seminars aim to provide valuable insights and tools to help you and your family thrive. Check our events page for upcoming seminar details!
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
