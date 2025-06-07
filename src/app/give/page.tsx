import ContentBlock from '@/components/shared/ContentBlock';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const waysToGive = [
  {
    title: "Online Giving",
    description: "The easiest and most secure way to give. Set up recurring gifts or make a one-time donation.",
    icon: CheckCircle2,
    actionText: "Give Online Now",
    actionLink: "https://giving.austinstone.org/online" // Placeholder link
  },
  {
    title: "Text to Give",
    description: "Simply text 'AUSTINSTONEGIVE' to 77977 to give via text message.",
    icon: CheckCircle2,
  },
  {
    title: "In Person",
    description: "Give during our Sunday services using the offering envelopes or giving kiosks.",
    icon: CheckCircle2,
  },
  {
    title: "Mail a Check",
    description: "Make checks payable to The Austin Stone Community Church and mail to: 123 Church St, Austin, TX 78701.",
    icon: CheckCircle2,
  }
];

export default function GivePage() {
  return (
    <div>
      <ContentBlock
        title="Partner With Us Through Giving"
        text="Your generosity enables us to fulfill our mission of loving God, loving people, and loving our city. Thank you for partnering with us to make a difference for the gospel."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />

      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl text-center mb-10">Ways to Give</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {waysToGive.map((way, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <way.icon className="h-8 w-8 text-accent mr-3" />
                    <CardTitle className="font-headline text-2xl text-primary">{way.title}</CardTitle>
                  </div>
                  <CardDescription className="text-foreground/80 text-base">{way.description}</CardDescription>
                </CardHeader>
                {way.actionText && way.actionLink && (
                  <CardContent>
                    <Button asChild className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href={way.actionLink} target="_blank" rel="noopener noreferrer">{way.actionText}</Link>
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <ContentBlock
        title="Why We Give"
        text={
            <>
                <p className="mb-4">At The Austin Stone, we believe that giving is an act of worship and a response to God's generosity towards us. It's not about obligation, but about joyful participation in what God is doing in and through our church.</p>
                <p>Your contributions support our local ministries, community outreach, global missions, and the operational needs of our church. Every gift, no matter the size, makes a significant impact.</p>
            </>
        }
        imageUrl="https://placehold.co/800x600.png"
        imageAlt="Hands holding a plant, symbolizing growth and giving"
        imageHint="giving growth"
        imagePosition="left"
      />

      <AnimatedSection className="py-12 md:py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline md:text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-lg mb-6">Have questions about giving? We're here to help.</p>
          {/* Placeholder for FAQ section */}
          <div className="text-left max-w-2xl mx-auto space-y-4">
            <div>
                <h3 className="font-semibold text-xl">Is my giving tax-deductible?</h3>
                <p>Yes, The Austin Stone Community Church is a registered non-profit organization. All contributions are tax-deductible to the extent allowed by law.</p>
            </div>
             <div>
                <h3 className="font-semibold text-xl">How can I see my giving history?</h3>
                <p>You can access your giving statements and history through our online giving portal.</p>
            </div>
          </div>
           <Button asChild variant="outline" size="lg" className="mt-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
            <Link href="/contact?subject=GivingQuestion">Contact Us About Giving</Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
}
