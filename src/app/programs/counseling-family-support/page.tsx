
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Users, HeartHandshake, ShieldCheck, CalendarDays, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const impactStories = [
  {
    id: 'story1',
    name: "A Grateful Couple",
    story: "The marriage forum and counseling sessions provided us with invaluable tools to strengthen our communication and navigate challenges together. We are closer than ever.",
    imageUrl: "https://placehold.co/300x300.png",
    imageHint: "happy couple portrait",
  }
];

const programs = [
  {
    id: 'counseling',
    title: 'Counseling Services',
    icon: HeartHandshake,
    description: 'Confidential counseling sessions available for individuals, couples, and families seeking guidance on personal, relational, or spiritual matters from a Christian perspective.',
    details: [
      'Personal challenges (stress, anxiety, grief, identity).',
      'Marital and pre-marital counseling.',
      'Family relationship difficulties.',
      'Parenting concerns.',
      'Spiritual guidance and discipleship.',
    ],
    note: 'All sessions are conducted with the utmost confidentiality and in a compassionate, non-judgmental atmosphere.',
    actionText: 'Request Counseling Information',
    actionLink: '/contact?subject=CounselingInquiry',
  },
  {
    id: 'fls',
    title: 'Family Life Seminars (FLS)',
    icon: Users,
    description: 'Quarterly seminars designed to equip individuals and families with practical wisdom and biblical principles for navigating various aspects of family life.',
    schedule: 'Held quarterly in April, July, and November.',
    focusAreas: 'Marriage enrichment, effective parenting, relationship dynamics, financial management, spiritual leadership in the home.',
    actionText: 'Check Upcoming Seminars',
    actionLink: '/events',
    actionVariant: 'outline' as 'outline' | 'default' | 'destructive' | 'secondary' | 'ghost' | 'link' | null | undefined,
  },
  {
    id: 'marriage-forum',
    title: 'Marriage Forum',
    icon: HeartHandshake,
    description: 'A monthly forum providing a supportive platform for couples to discuss, learn, and grow together in building strong, healthy, and godly marriages.',
    schedule: [
      { icon: CalendarDays, text: 'Every second Saturday of the month.' },
      { icon: Clock, text: 'Time: 10:00 AM.' },
    ],
    topics: 'Communication, conflict resolution, intimacy, finance, parenting, spiritual unity.',
    actionText: 'View Forum Schedule',
    actionLink: '/events',
    actionVariant: 'outline' as 'outline' | 'default' | 'destructive' | 'secondary' | 'ghost' | 'link' | null | undefined,
  },
];

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
          
          <div className="space-y-8">
            {programs.map((program) => (
              <Card key={program.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-accent flex items-center">
                    <program.icon className="mr-3 h-7 w-7" /> {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">{program.description}</p>
                  {program.details && Array.isArray(program.details) && (
                    <ul className="list-disc list-inside text-foreground/80 space-y-1">
                      {program.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  )}
                  {typeof program.schedule === 'string' && (
                     <div className="flex items-center text-foreground/80"><CalendarDays className="mr-2 h-5 w-5 text-primary" /> {program.schedule}</div>
                  )}
                  {Array.isArray(program.schedule) && program.schedule.map((item, index) => (
                     <div key={index} className="flex items-center text-foreground/80"><item.icon className="mr-2 h-5 w-5 text-primary" /> {item.text}</div>
                  ))}
                  {program.focusAreas && <p className="text-foreground/80">Focus Areas: {program.focusAreas}</p>}
                  {program.topics && <p className="text-foreground/80">Topics Include: {program.topics}</p>}
                  {program.note && <p className="text-foreground/80">{program.note}</p>}
                  
                  {program.actionText && program.actionLink && (
                    <Button asChild className={program.actionVariant === 'outline' ? '' : 'bg-accent hover:bg-accent/90 text-accent-foreground'} variant={program.actionVariant || 'default'}>
                      <Link href={program.actionLink}>{program.actionText}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
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
