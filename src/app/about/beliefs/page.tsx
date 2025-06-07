
import ContentBlock from '@/components/shared/ContentBlock';

export default function BeliefsPage() {
  return (
    <div>
      <ContentBlock
        title="Our Beliefs"
        text="Content for the Our Beliefs page is coming soon. Please check back later."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          In the meantime, you can explore other sections of our website.
        </p>
      </div>
    </div>
  );
}
