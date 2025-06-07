
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { CalendarDays, Clock, Users } from 'lucide-react';

export default function AdolescentSinglesClubPage() {
  return (
    <div>
      <ContentBlock
        title="Adolescent & Singles Club (ASC)"
        text="A vibrant monthly gathering focused on guiding adolescents and singles towards purposeful living through engaging discussions, practical teachings, and interactive sessions."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageAlt="Group of young people in discussion"
        imageHint="youth group discussion"
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
                Adolescents and single young adults seeking direction, community, and spiritual growth.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-headline text-xl text-accent mb-2 flex items-center">
                <CalendarDays className="mr-2 h-6 w-6" /> When?
              </h3>
              <p className="text-foreground/80">
                Every first Saturday of the month.
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
              <h3 className="font-headline text-xl text-accent mb-2">What to Expect:</h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>Interactive teachings on relevant life topics.</li>
                <li>Group discussions and peer support.</li>
                <li>Activities designed to foster personal and spiritual development.</li>
                <li>A welcoming environment to ask questions and explore faith.</li>
              </ul>
            </div>
            <p className="text-lg text-center text-foreground/70">
              Join us at ASC to connect with peers, learn valuable life skills, and grow in your journey of faith!
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
