
import ContentBlock from '@/components/shared/ContentBlock';

export default function KidsMinistriesPage() {
  return (
    <div>
      <ContentBlock
        title="Kids Ministries"
        text="Fun and safe environments for children to learn about Jesus. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Details about our children's programs, curriculum, and check-in procedures will be available here.
        </p>
      </div>
    </div>
  );
}
