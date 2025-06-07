
import ContentBlock from '@/components/shared/ContentBlock';

export default function OutreachMissionsPage() {
  return (
    <div>
      <ContentBlock
        title="Outreach & Missions"
        text="Serving our local community and sharing the gospel globally. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Learn about our local outreach initiatives and global mission partnerships here.
        </p>
      </div>
    </div>
  );
}
