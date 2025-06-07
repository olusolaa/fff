
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function TermsOfServicePage() {
  return (
    <div>
      <ContentBlock
        title="Terms of Service"
        text="Please read these terms carefully. This page is currently under construction."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-headline text-primary mb-4">Agreement to Terms (Placeholder)</h2>
          <p className="text-lg text-foreground/80 mb-4">
            By accessing or using our website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
          </p>
          <h2 className="text-2xl font-bold font-headline text-primary mt-8 mb-4">Use of Website (Placeholder)</h2>
          <p className="text-lg text-foreground/80 mb-4">
            This section will detail acceptable and prohibited uses of our website and content.
          </p>
          <h2 className="text-2xl font-bold font-headline text-primary mt-8 mb-4">Intellectual Property (Placeholder)</h2>
           <p className="text-lg text-foreground/80 mb-4">
            The Service and its original content, features, and functionality are and will remain the exclusive property of The Austin Stone Community Church and its licensors.
          </p>
           <h2 className="text-2xl font-bold font-headline text-primary mt-8 mb-4">Changes to Terms</h2>
           <p className="text-lg text-foreground/80 mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
          </p>
           <h2 className="text-2xl font-bold font-headline text-primary mt-8 mb-4">Contact Us</h2>
           <p className="text-lg text-foreground/80">
            If you have any questions about these Terms, please contact us at info@austinstone.org.
          </p>
           <p className="text-sm text-muted-foreground mt-8">
            Last updated: [Date to be filled]
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
