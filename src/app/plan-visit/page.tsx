
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
// Note: A form component (e.g., using react-hook-form) would typically go here for a real "Plan Your Visit" form.
// This is a placeholder page.

export default function PlanVisitPage() {
  return (
    <div>
      <ContentBlock
        title="Plan Your Visit"
        text="We're excited to have you join us! Let us know you're coming, and we'll help make your first visit smooth and welcoming. This form is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6 text-center">What to Expect</h2>
          <p className="text-lg text-foreground/80 mb-4">
            When you arrive, look for our Welcome Team. They'll be happy to answer any questions, help you find your way around, and get your kids checked into their programs if needed.
          </p>
          <p className="text-lg text-foreground/80 mb-8">
            Our services include contemporary worship music and a message from the Bible. We aim for a casual and welcoming atmosphere where you can come as you are.
          </p>
          
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold font-headline text-accent mb-4">Plan Your Visit Form (Coming Soon)</h3>
            <p className="text-foreground/70">
              A form will be available here soon to let us know which service you plan to attend and if you have any specific needs or questions. In the meantime, feel free to explore our <a href="/locations" className="text-accent hover:underline">locations and service times</a>.
            </p>
            {/* Placeholder for form fields */}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
