
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { BookOpen, CalendarDays, Clock, BookHeart } from 'lucide-react';

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
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-10 text-center">Grow Your Faith With Us</h2>
          
          {/* Discipleship Classes Section */}
          <div className="bg-card p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h3 className="font-headline text-2xl text-accent mb-4 flex items-center">
              <BookHeart className="mr-3 h-7 w-7" /> Discipleship Classes
            </h3>
            <p className="text-foreground/80 mb-2">
              Weekly classes designed to deepen participants' understanding of Christian doctrines and foster robust spiritual growth through systematic study and discussion.
            </p>
            <div className="flex items-center text-foreground/80 mb-1"><CalendarDays className="mr-2 h-5 w-5 text-primary" /> Every Monday.</div>
            <div className="flex items-center text-foreground/80 mb-4"><Clock className="mr-2 h-5 w-5 text-primary" /> Time: 5:00 PM.</div>
            <p className="text-foreground/80">
              Curriculum May Include: Systematic theology, practical application of biblical principles, understanding spiritual gifts, developing a devotional life.
            </p>
          </div>
        </div>
      </AnimatedSection>
       <AnimatedSection className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Join our Discipleship Classes to take your faith to a deeper level and connect with fellow learners on the journey of spiritual maturity.
        </p>
      </AnimatedSection>
    </div>
  );
}
