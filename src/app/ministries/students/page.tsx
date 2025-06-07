
import ContentBlock from '@/components/shared/ContentBlock';

export default function StudentsMinistriesPage() {
  return (
    <div>
      <ContentBlock
        title="Student Ministries"
        text="Engaging programs for middle school, high school, and college students. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Information on gatherings, events, and discipleship opportunities for students will be posted here.
        </p>
      </div>
    </div>
  );
}
