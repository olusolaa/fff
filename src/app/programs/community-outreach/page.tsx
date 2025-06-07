
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { HandHeart, Users } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const impactStories = [
  {
    id: 'story1',
    name: "A Community Partner",
    story: "Family Tent Ministry's outreach programs bring so much hope and practical help to our neighborhood. Their dedication is truly making a difference.",
    imageUrl: "https://placehold.co/300x300.png",
    imageHint: "community group happy",
  }
];

export default function CommunityOutreachPage() {
  return (
    <div>
      <ContentBlock
        title="Community Outreach"
        text="Family Tent Ministry is dedicated to making a positive impact beyond our immediate fellowship by engaging with and serving the wider community. We believe in demonstrating God's love through practical action and sharing our values."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
        imageUrl="https://placehold.co/1000x600.png"
        imageHint="community diverse hands"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-10 text-center">Serving Our Neighbors</h2>
          <div className="grid md:grid-cols-2 gap-8 text-center">
             <div className="bg-card p-6 rounded-lg shadow-md">
              <HandHeart className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-primary mb-2">Practical Support</h3>
              <p className="text-foreground/80">
                Identifying and responding to the needs within our community through various service initiatives and partnerships.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-headline text-xl text-primary mb-2">Building Connections</h3>
              <p className="text-foreground/80">
                Fostering relationships and collaborations with local organizations and individuals to collectively enhance community well-being.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
       <AnimatedSection className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          More information about our specific community outreach programs and how you can get involved will be available here soon. We are committed to actively engaging with and serving our wider community.
        </p>
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
