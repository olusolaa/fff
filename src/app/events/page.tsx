
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { CalendarDays } from 'lucide-react';

export default function EventsPage() {
  return (
    <div>
      <ContentBlock
        title="Upcoming Events"
        text="Stay connected and join us for our upcoming events. There's something for everyone! Full event details coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-lg text-center text-foreground/80 mb-10">
            Our full events calendar and registration links will be available here shortly.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Community BBQ", date: "Next Saturday", desc: "Join us for food and fellowship.", hint:"bbq event" },
              { title: "Worship Night", date: "Upcoming Friday", desc: "An evening of worship and prayer.", hint:"worship concert" },
              { title: "Volunteer Training", date: "Two Weeks Away", desc: "Get equipped to serve.", hint:"meeting group" }
            ].map((event, i) => (
              <Card key={i} className="shadow-lg">
                <CardHeader>
                    <Image src={`https://placehold.co/600x300.png`} alt={event.title} data-ai-hint={event.hint} width={600} height={300} className="rounded mb-2"/>
                    <CardTitle className="font-headline text-xl text-primary flex items-center">
                        <CalendarDays className="mr-2 h-5 w-5 text-accent"/>
                        {event.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/80">{event.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
