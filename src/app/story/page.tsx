
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function StoryPage() {
  return (
    <div>
      <ContentBlock
        title="Jessica's Story"
        text="A powerful story of transformation and finding family."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-foreground/80">
          <p>
            Content for Jessica's story is coming soon. This page will detail her journey of finding community, belonging, and renewed faith at Family Tent Ministry.
          </p>
          <p>
            Her experience of walking in empty and finding a family will be expanded upon, showcasing the supportive and life-changing environment our church fosters.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
