
import ContentBlock from '@/components/shared/ContentBlock';

export default function MissionsPage() {
  return (
    <div>
      <ContentBlock
        title="Missions"
        text="Learn about our local and global missions efforts. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl mt-20"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Details about mission partners, trips, and how to get involved will be available here.
        </p>
      </div>
    </div>
  );
}
