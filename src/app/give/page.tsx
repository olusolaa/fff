
import ContentBlock from '@/components/shared/ContentBlock';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, HandHeart, Mail } from 'lucide-react'; // Added Mail icon

const waysToGive = [
  {
    title: "Online Giving (Future)",
    description: "We are working on setting up secure online giving. Please check back soon or use other methods.",
    icon: CheckCircle2,
    // actionText: "Give Online Now", // Placeholder, enable when ready
    // actionLink: "#" 
  },
  {
    title: "Direct Deposit / Transfer",
    description: "You can give directly through bank deposit or transfer. Please contact us for account details.",
    icon: HandHeart,
    actionText: "Request Bank Details",
    actionLink: "/contact?subject=GivingBankDetails"
  },
  {
    title: "In Person",
    description: "Give during our seminars, forums, or classes. Your support is greatly appreciated.",
    icon: HandHeart,
  },
  {
    title: "Mail a Cheque/Draft",
    description: "Make cheques/drafts payable to Family Tent Ministry and mail to: P.O Box 3992, Akure, Ondo State, Nigeria.",
    icon: Mail,
  }
];

export default function GivePage() {
  return (
    <div>
      <ContentBlock
        title="Partner With Us Through Giving"
        text="Your generosity enables Family Tent Ministry to fulfill our mission of promoting values and ethics for healthy, responsible living, especially among young people. Thank you for partnering with us to make a difference."
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
                      <Link href={way.actionLink}>{way.actionText}</Link>
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
                <p className="mb-4">At Family Tent Ministry, we believe giving is an act of worship and a response to God's generosity. It's a joyful participation in what God is doing through our programs to impact lives and communities.</p>
                <p>Your contributions support our various programs like the Adolescent & Singles Club, Family Life Seminars, Discipleship Classes, Marriage Forums, School Outreaches, Counseling Services, and operational needs. Every gift makes a significant impact.</p>
            </>
        }
        imageUrl="https://placehold.co/800x600.png"
        imageAlt="Hands offering support, symbolizing giving and growth"
        imageHint="giving charity support"
        imagePosition="left"
      />

      <AnimatedSection className="py-12 md:py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline md:text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-lg mb-6">Have questions about giving? We're here to help.</p>
          <div className="text-left max-w-2xl mx-auto space-y-4">
            <div>
                <h3 className="font-semibold text-xl">Is my giving tax-deductible?</h3>
                <p>Family Tent Ministry is a registered nonprofit organization in Nigeria. Please consult with a local tax professional regarding deductibility in your specific region.</p>
            </div>
             <div>
                <h3 className="font-semibold text-xl">How can I get a receipt for my donation?</h3>
                <p>Receipts can be provided upon request, especially for direct deposits or mailed contributions. Please contact us for assistance.</p>
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
