
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Users, School, CalendarDays, Clock } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const impactStories = [
  {
    id: 'story1',
    name: "A Transformed Student",
    story: "The Adolescent & Singles Club helped me find my voice and build confidence. The teachings and community have been a guiding light in my life.",
    imageUrl: "https://placehold.co/300x300.png",
    imageHint: "young person smiling",
  }
];

export default function YouthStudentEmpowermentPage() {
  return (
    <div>
      <ContentBlock
        title="Youth & Student Empowerment"
        text="Family Tent Ministry is passionate about investing in the next generation. Our programs aim to guide adolescents, singles, and students towards purposeful living, equipping them with values and skills for a healthy and responsible future."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageHint="students graduation learning"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-10 text-center">Our Youth & Student Programs</h2>
          
          <div className="mb-12 bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-headline text-2xl text-accent mb-4 flex items-center">
              <Users className="mr-3 h-7 w-7" /> Adolescent & Singles Club (ASC)
            </h3>
            <p className="text-foreground/80 mb-2">
              A vibrant monthly gathering focused on guiding adolescents and singles towards purposeful living through engaging discussions, practical teachings, and interactive sessions.
            </p>
            <div className="flex items-center text-foreground/80 mb-1"><CalendarDays className="mr-2 h-5 w-5 text-primary" /> Every first Saturday of the month.</div>
            <div className="flex items-center text-foreground/80 mb-4"><Clock className="mr-2 h-5 w-5 text-primary" /> Time: 10:00 AM.</div>
            <p className="text-foreground/80">
              What to Expect: Interactive teachings, group discussions, activities for personal/spiritual development, and a welcoming environment.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-headline text-2xl text-accent mb-4 flex items-center">
              <School className="mr-3 h-7 w-7" /> School Outreaches
            </h3>
            <p className="text-foreground/80 mb-2">
              Family Tent Ministry actively collaborates with schools to promote moral values and positive character development among students through engaging and relevant programs.
            </p>
            <p className="text-foreground/80 mb-4">
              Activities Include: Conducting inspiring morning assemblies, campus awareness programs, reorientation sessions, and mentorship opportunities.
            </p>
            <p className="text-foreground/80">
              Target Audience: Students across various age groups in primary, secondary, and tertiary institutions.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-12 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl text-center mb-10">
            Impact Stories
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {impactStories.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-lg">
                <CardHeader className="items-center pt-6">
                  <Image
                    src={testimonial.imageUrl}
                    alt={`Photo of ${testimonial.name}`}
                    width={120}
                    height={120}
                    className="rounded-full mb-4"
                    data-ai-hint={testimonial.imageHint}
                  />
                  <CardTitle className="font-headline text-xl text-accent text-center">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 italic text-center">"{testimonial.story}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
