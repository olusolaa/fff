
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Users, ShieldCheck, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CounselingServicesPage() {
  return (
    <div>
      <ContentBlock
        title="Counseling Services"
        text="Family Tent Ministry offers confidential counseling sessions for individuals, couples, and families seeking guidance and support for personal, relational, or spiritual matters from a Christian perspective."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageAlt="Supportive counseling session"
        imageHint="counseling support session"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-6 text-center">Our Approach to Counseling</h2>
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <Users className="mr-2 h-6 w-6" /> Who We Help:
              </h3>
              <p className="text-foreground/80">
                We provide support for a range of issues including (but not limited to):
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-1 mt-2">
                <li>Personal challenges (stress, anxiety, grief, identity).</li>
                <li>Marital and pre-marital counseling.</li>
                <li>Family relationship difficulties.</li>
                <li>Parenting concerns.</li>
                <li>Spiritual guidance and discipleship.</li>
              </ul>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <ShieldCheck className="mr-2 h-6 w-6" /> Confidential & Caring Environment:
              </h3>
              <p className="text-foreground/80">
                All sessions are conducted with the utmost confidentiality and in a compassionate, non-judgmental atmosphere. Our counselors are trained to listen and provide biblically-based guidance.
              </p>
            </div>
             <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <MessageCircle className="mr-2 h-6 w-6" /> How to Access Services:
              </h3>
              <p className="text-foreground/80">
                To inquire about counseling services or to schedule an appointment, please contact us. We will discuss your needs and connect you with an appropriate counselor.
              </p>
            </div>
            <div className="text-center mt-10">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact?subject=CounselingInquiry">Request Counseling Information</Link>
              </Button>
            </div>
            <p className="text-lg text-center text-foreground/70 mt-8">
              You don't have to navigate life's challenges alone. We are here to support you on your journey towards healing and wholeness.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
