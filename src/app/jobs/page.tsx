
import ContentBlock from '@/components/shared/ContentBlock';

export default function JobsPage() {
  return (
    <div>
      <ContentBlock
        title="Careers at Austin Stone"
        text="Information about job opportunities and careers at The Austin Stone Community Church is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Please check back later for open positions.
        </p>
      </div>
    </div>
  );
}
