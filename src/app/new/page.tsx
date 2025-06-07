import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, MapPin, CalendarDays, MessageCircleQuestion } from 'lucide-react';

const nextSteps = [
  {
    icon: Users,
    title: "Join Us Sunday",
    description: "Experience our worship service. We have multiple locations and service times.",
    actionText: "Find a Location",
    actionLink: "/locations"
  },
  {
    icon: MapPin,
    title: "Connect in a Group",
    description: "Community Groups are the best way to get to know people and grow in your faith.",
    actionText: "Explore Groups",
    actionLink: "/connect/groups"
  },
  {
    icon: CalendarDays,
    title: "Attend a Welcome Event",
    description: "Meet our pastors and learn more about The Austin Stone at our next newcomer event.",
    actionText: "See Upcoming Events",
    actionLink: "/events"
  },
  {
    icon: MessageCircleQuestion,
    title: "Ask Questions",
    description: "Have questions about faith, our church, or how to get involved? We'd love to talk.",
    actionText: "Contact Us",
    actionLink: "/contact"
  }
];

export default function NewHerePage() {
  return (
    <div>
      <ContentBlock
        title="Welcome! We're Glad You're Here."
        text="Whether you're new to Austin, new to church, or just exploring faith, we're excited to connect with you. The Austin Stone is a community where people from all walks of life can encounter Jesus and experience authentic relationships."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />

      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl text-center mb-10">What to Expect</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold font-headline text-accent">A Welcoming Atmosphere</h3>
              <p className="text-lg text-foreground/80">
                Come as you are. You'll find a friendly environment where everyone is welcome. Our services typically last about 75 minutes and include contemporary worship music and relevant teaching from the Bible.
              </p>
              <h3 className="text-2xl font-semibold font-headline text-accent mt-6">Something for Everyone</h3>
              <p className="text-lg text-foreground/80">
                We have engaging programs for kids and students, as well as various ministries and groups for adults. Our goal is to help you and your family connect with God and others.
              </p>
            </div>
            <div>
              <img src="https://placehold.co/800x600.png" alt="Friendly church greeters" data-ai-hint="church welcome" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-12 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-10">Your Next Steps</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nextSteps.map(step => (
              <Card key={step.title} className="text-center shadow-lg">
                <CardHeader>
                  <step.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <CardTitle className="font-headline text-xl text-primary">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80 mb-4">{step.description}</CardDescription>
                  <Button asChild variant="link" className="text-accent hover:text-accent/80">
                    <Link href={step.actionLink}>{step.actionText}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      <ContentBlock
        title="Plan Your Visit"
        text="We'd love to help make your first visit as smooth as possible. Let us know you're coming, and we can answer any questions you have, help you find parking, and show you around."
        imageUrl="https://placehold.co/800x500.png"
        imageAlt="Map with a pin on a church location"
        imageHint="map location"
        actionText="Plan Your Visit Form"
        actionLink="/plan-visit" 
        imagePosition="left"
        className="bg-primary text-primary-foreground"
        titleClassName="text-primary-foreground"
        textClassName="text-primary-foreground/90"
      />
    </div>
  );
}
