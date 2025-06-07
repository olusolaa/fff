
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, BookOpen, MessageCircleQuestion, Handshake, Info } from 'lucide-react';

const nextSteps = [
  {
    icon: Info,
    title: "About Family Tent Ministry",
    description: "Learn about our mission, vision, and what we believe.",
    actionText: "Discover FTM",
    actionLink: "/about"
  },
  {
    icon: BookOpen,
    title: "Explore Our Programs",
    description: "Discover our range of programs for adolescents, singles, couples, and families.",
    actionText: "See Programs",
    actionLink: "/programs"
  },
  {
    icon: Users,
    title: "Attend an Event",
    description: "Join us for our monthly clubs, quarterly seminars, or weekly classes.",
    actionText: "View Events",
    actionLink: "/events"
  },
  {
    icon: MessageCircleQuestion,
    title: "Questions or Need Support?",
    description: "Have questions or looking for counseling? We'd love to talk.",
    actionText: "Contact Us",
    actionLink: "/contact"
  }
];

export default function NewHerePage() {
  return (
    <div>
      <ContentBlock
        title="Welcome to Family Tent Ministry!"
        text="We're delighted you're here. Family Tent Ministry is a Christian nonprofit organization dedicated to teaching values and ethics that foster meaningful and purposeful living, especially for young people and families."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />

      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl text-center mb-10">Getting Started with FTM</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold font-headline text-accent">A Welcoming Community</h3>
              <p className="text-lg text-foreground/80">
                You'll find a supportive environment where individuals and families can learn, grow, and connect. Our programs are designed to be engaging, practical, and rooted in Christian principles.
              </p>
              <h3 className="text-2xl font-semibold font-headline text-accent mt-6">Programs for Holistic Growth</h3>
              <p className="text-lg text-foreground/80">
                We offer diverse programs focused on Youth & Student Empowerment, Counseling & Family Support, Faith & Growth, and Community Outreach. Each is tailored to meet specific needs and foster development.
              </p>
            </div>
            <div>
              <img src="https://placehold.co/800x600.png" alt="Welcoming community at Family Tent Ministry" data-ai-hint="community FTM welcome" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-12 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-10">Your Next Steps with Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nextSteps.map(step => (
              <Card key={step.title} className="text-center shadow-lg flex flex-col">
                <CardHeader className="pb-2">
                  <step.icon className="h-12 w-12 text-accent mx-auto mb-3" />
                  <CardTitle className="font-headline text-xl text-primary">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardDescription className="text-foreground/80 mb-4">{step.description}</CardDescription>
                  <Button asChild variant="link" className="text-accent hover:text-accent/80 mt-auto">
                    <Link href={step.actionLink}>{step.actionText}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      <ContentBlock
        title="Connect With Us"
        text="We invite you to learn more about specific programs or reach out with any questions. We're here to help you find your place and grow with Family Tent Ministry."
        imageUrl="https://placehold.co/800x500.png"
        imageAlt="People connecting at an FTM event"
        imageHint="community connection event"
        actionText="Contact Family Tent Ministry"
        actionLink="/contact" 
        imagePosition="left"
        className="bg-primary text-primary-foreground"
        titleClassName="text-primary-foreground"
        textClassName="text-primary-foreground/90"
      />
    </div>
  );
}
