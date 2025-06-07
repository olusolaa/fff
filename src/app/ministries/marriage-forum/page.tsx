
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { CalendarDays, Clock, HeartHandshake } from 'lucide-react';

export default function MarriageForumPage() {
  return (
    <div>
      <ContentBlock
        title="Marriage Forum"
        text="A monthly forum providing a supportive platform for couples to discuss, learn, and grow together in building strong, healthy, and godly marriages."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageAlt="Couples engaging in a discussion"
        imageHint="couples talking marriage"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-6 text-center">Program Details</h2>
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <HeartHandshake className="mr-2 h-6 w-6" /> Who is it for?
              </h3>
              <p className="text-foreground/80">
                Married couples and those seriously considering marriage, seeking to strengthen their relationship based on Christian principles.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <CalendarDays className="mr-2 h-6 w-6" /> When?
              </h3>
              <p className="text-foreground/80">
                Every second Saturday of the month.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <Clock className="mr-2 h-6 w-6" /> Time?
              </h3>
              <p className="text-foreground/80">
                10:00 AM
              </p>
            </div>
             <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2">Topics Often Include:</h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>Effective communication and conflict resolution.</li>
                <li>Nurturing intimacy and romance.</li>
                <li>Financial management as a couple.</li>
                <li>Parenting and family dynamics.</li>
                <li>Spiritual unity in marriage.</li>
              </ul>
            </div>
            <p className="text-lg text-center text-foreground/70">
              Invest in your marriage by joining our Marriage Forum. It's a great opportunity for fellowship, learning, and mutual encouragement.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
