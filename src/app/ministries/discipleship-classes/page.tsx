
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { CalendarDays, Clock, BookHeart } from 'lucide-react';

export default function DiscipleshipClassesPage() {
  return (
    <div>
      <ContentBlock
        title="Discipleship Classes"
        text="Weekly classes designed to deepen participants' understanding of Christian doctrines and foster robust spiritual growth through systematic study and discussion."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageAlt="People in a study group with Bibles"
        imageHint="bible study group"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-6 text-center">Program Details</h2>
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <BookHeart className="mr-2 h-6 w-6" /> Purpose:
              </h3>
              <p className="text-foreground/80">
                To equip believers with a solid understanding of foundational Christian truths, encourage spiritual disciplines, and help them grow into mature followers of Christ.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <CalendarDays className="mr-2 h-6 w-6" /> When?
              </h3>
              <p className="text-foreground/80">
                Every Monday.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <Clock className="mr-2 h-6 w-6" /> Time?
              </h3>
              <p className="text-foreground/80">
                5:00 PM
              </p>
            </div>
             <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2">Curriculum May Include:</h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>Systematic theology and doctrinal studies.</li>
                <li>Practical application of biblical principles.</li>
                <li>Understanding spiritual gifts and service.</li>
                <li>Developing a consistent devotional life.</li>
              </ul>
            </div>
            <p className="text-lg text-center text-foreground/70">
              Join our Discipleship Classes to take your faith to a deeper level and connect with fellow learners on the journey of spiritual maturity.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
