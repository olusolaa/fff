
import ContentBlock from '@/components/shared/ContentBlock';

export default function WorshipArtsPage() {
  return (
    <div>
      <ContentBlock
        title="Worship & Arts"
        text="Using creative arts to glorify God and lead others in worship. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Information about joining the worship team, choir, or other arts ministries will be available here.
        </p>
      </div>
    </div>
  );
}
