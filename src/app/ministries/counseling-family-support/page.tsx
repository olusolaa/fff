
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Users, HeartHandshake, ShieldCheck, CalendarDays, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-10 text-center">Our Support Programs</h2>
          
          {/* Counseling Services Section */}
          <div className="mb-12 bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-headline text-2xl text-accent mb-4 flex items-center">
              <HeartHandshake className="mr-3 h-7 w-7" /> Counseling Services
            </h3>
            <p className="text-foreground/80 mb-4">
              Confidential counseling sessions available for individuals, couples, and families seeking guidance on personal, relational, or spiritual matters from a Christian perspective.
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-1 mb-4">
              <li>Personal challenges (stress, anxiety, grief, identity).</li>
              <li>Marital and pre-marital counseling.</li>
              <li>Family relationship difficulties.</li>
              <li>Parenting concerns.</li>
              <li>Spiritual guidance and discipleship.</li>
            </ul>
            <p className="text-foreground/80 mb-4">
              All sessions are conducted with the utmost confidentiality and in a compassionate, non-judgmental atmosphere.
            </p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact?subject=CounselingInquiry">Request Counseling Information</Link>
            </Button>
          </div>

          {/* Family Life Seminars Section */}
          <div className="mb-12 bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-headline text-2xl text-accent mb-4 flex items-center">
              <Users className="mr-3 h-7 w-7" /> Family Life Seminars (FLS)
            </h3>
            <p className="text-foreground/80 mb-2">
              Quarterly seminars designed to equip individuals and families with practical wisdom and biblical principles for navigating various aspects of family life.
            </p>
            <div className="flex items-center text-foreground/80 mb-1"><CalendarDays className="mr-2 h-5 w-5 text-primary" /> Held quarterly in April, July, and November.</div>
            <p className="text-foreground/80 mb-4">
              Focus Areas: Marriage enrichment, effective parenting, relationship dynamics, financial management, spiritual leadership in the home.
            </p>
            <Button asChild variant="outline">
              <Link href="/events">Check Upcoming Seminars</Link>
            </Button>
          </div>

          {/* Marriage Forum Section */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-headline text-2xl text-accent mb-4 flex items-center">
              <HeartHandshake className="mr-3 h-7 w-7" /> Marriage Forum
            </h3>
            <p className="text-foreground/80 mb-2">
              A monthly forum providing a supportive platform for couples to discuss, learn, and grow together in building strong, healthy, and godly marriages.
            </p>
            <div className="flex items-center text-foreground/80 mb-1"><CalendarDays className="mr-2 h-5 w-5 text-primary" /> Every second Saturday of the month.</div>
            <div className="flex items-center text-foreground/80 mb-4"><Clock className="mr-2 h-5 w-5 text-primary" /> Time: 10:00 AM.</div>
            <p className="text-foreground/80 mb-4">
              Topics Include: Communication, conflict resolution, intimacy, finance, parenting, spiritual unity.
            </p>
             <Button asChild variant="outline">
              <Link href="/events">View Forum Schedule</Link>
            </Button>
          </div>

        </div>
      </AnimatedSection>
    </div>
  );
}
