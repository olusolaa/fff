
import ContentBlock from '@/components/shared/ContentBlock';

export default function CareSupportPage() {
  return (
    <div>
      <ContentBlock
        title="Care & Support"
        text="Providing care, counseling, and support for those in need. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Information on support groups, counseling services, and benevolence ministries will be detailed here.
        </p>
      </div>
    </div>
  );
}
