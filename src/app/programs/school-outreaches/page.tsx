
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { School, Users, Presentation } from 'lucide-react';

export default function SchoolOutreachesPage() {
  return (
    <div>
      <ContentBlock
        title="School Outreaches"
        text="Family Tent Ministry actively collaborates with schools to promote moral values and positive character development among students through engaging and relevant programs."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageAlt="Students participating in a school program"
        imageHint="school assembly students"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-6 text-center">Program Overview</h2>
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <School className="mr-2 h-6 w-6" /> Our Approach:
              </h3>
              <p className="text-foreground/80">
                We partner with educational institutions to deliver impactful sessions that complement their existing curriculum, focusing on ethical behavior, responsible decision-making, and spiritual awareness from a Christian perspective.
              </p>
            </div>
             <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <Presentation className="mr-2 h-6 w-6" /> Activities Include:
              </h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>Conducting inspiring morning assemblies.</li>
                <li>Campus awareness programs on social and moral issues.</li>
                <li>Reorientation sessions focusing on values and life skills.</li>
                <li>Mentorship opportunities where appropriate.</li>
              </ul>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <Users className="mr-2 h-6 w-6" /> Target Audience:
              </h3>
              <p className="text-foreground/80">
                Students across various age groups in primary, secondary, and tertiary institutions.
              </p>
            </div>
            <p className="text-lg text-center text-foreground/70">
              If you are a school administrator or teacher interested in collaborating with Family Tent Ministry for an outreach program, please contact us.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
