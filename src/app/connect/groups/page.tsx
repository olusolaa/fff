
import ContentBlock from '@/components/shared/ContentBlock';

export default function CommunityGroupsPage() {
  return (
    <div>
      <ContentBlock
        title="Community Groups"
        text="Find information about our community groups and how to join one. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Details about different groups, meeting times, and locations will be available here.
        </p>
      </div>
    </div>
  );
}
