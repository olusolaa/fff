
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import { Users, School, Lightbulb } from 'lucide-react';

const subPrograms: CardGridItem[] = [
  {
    id: 'asc',
    title: 'Adolescent & Singles Club (ASC)',
    description: 'Monthly gatherings (1st Saturday, 10 AM) guiding adolescents and singles towards purposeful living through discussions, teachings, and interactive sessions.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'youth group discussion',
    actionText: 'About ASC',
    actionLink: '/ministries/adolescent-singles-club', // Link to old page, to be updated/removed
  },
  {
    id: 'school-outreach',
    title: 'School Outreaches',
    description: 'Collaborative programs with schools including morning assemblies and campus awareness sessions to promote moral values.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'school assembly students',
    actionText: 'About School Programs',
    actionLink: '/ministries/school-outreaches', // Link to old page, to be updated/removed
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
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-10 text-center">Empowering Young People</h2>
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <Lightbulb className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-primary mb-2">Purposeful Living</h3>
              <p className="text-foreground/80">
                Through interactive clubs and discussions, we help young individuals discover their purpose and navigate life with Christian values.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <School className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-primary mb-2">Educational Partnerships</h3>
              <p className="text-foreground/80">
                We collaborate with schools to promote moral ethics and positive character development among students.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <CardGrid title="Our Youth & Student Programs" items={subPrograms} className="bg-background" />
       <AnimatedSection className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Explore our Adolescent & Singles Club and School Outreach initiatives to see how we're empowering youth and students in our community.
        </p>
      </AnimatedSection>
    </div>
  );
}
