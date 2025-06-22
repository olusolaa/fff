
import ContentBlock from '@/components/shared/ContentBlock';

export default function ServePage() {
  return (
    <div>
      <ContentBlock
        title="Serve Our City"
        text="Discover opportunities to serve within our church and in the community. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Information on various serving teams and projects will be listed here.
        </p>
      </div>
    </div>
  );
}
