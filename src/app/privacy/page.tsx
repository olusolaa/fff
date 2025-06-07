
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function PrivacyPolicyPage() {
  return (
    <div>
      <ContentBlock
        title="Privacy Policy"
        text="Our commitment to your privacy. This page is currently under construction."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-headline text-primary mb-4">Our Commitment</h2>
          <p className="text-lg text-foreground/80 mb-4">
            The Austin Stone Community Church values your privacy. This policy will outline how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
          </p>
          <h2 className="text-2xl font-bold font-headline text-primary mt-8 mb-4">Information Collection (Placeholder)</h2>
          <p className="text-lg text-foreground/80 mb-4">
            Details on the types of information we collect (e.g., personal identification information, non-personal identification information) will be provided here.
          </p>
          <h2 className="text-2xl font-bold font-headline text-primary mt-8 mb-4">Use of Information (Placeholder)</h2>
           <p className="text-lg text-foreground/80 mb-4">
            This section will explain how we use the information collected, such as to operate and maintain our services, improve user experience, send periodic emails, etc.
          </p>
           <h2 className="text-2xl font-bold font-headline text-primary mt-8 mb-4">Contact Us</h2>
           <p className="text-lg text-foreground/80">
            If you have any questions about this Privacy Policy, please contact us at info@austinstone.org.
          </p>
          <p className="text-sm text-muted-foreground mt-8">
            Last updated: [Date to be filled]
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
