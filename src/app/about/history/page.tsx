
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function HistoryPage() {
  return (
    <div>
      <ContentBlock
        title="Our History"
        text="Detailed information about the history of Family Tent Ministry. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl mt-20"
      />
      <AnimatedSection className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-foreground/80">
          <p>
            Established in April 1999, Family Tent Ministry (FTM) has been a beacon of hope, reaching out to singles, married couples, and youths through various programs and initiatives. We have consistently worked towards fostering environments where individuals can grow spiritually and morally.
          </p>
          <p>
            More details about our journey, milestones, and the impact we've made over the years will be shared here.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
