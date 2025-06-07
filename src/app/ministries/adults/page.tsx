
import ContentBlock from '@/components/shared/ContentBlock';

export default function AdultsMinistriesPage() {
  return (
    <div>
      <ContentBlock
        title="Adult Ministries"
        text="Ministries for men, women, couples, and seniors to grow in faith and community. Content is coming soon."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <p className="text-lg text-center text-foreground/80">
          Detailed information about our adult ministries, including groups, studies, and events, will be available here.
        </p>
      </div>
    </div>
  );
}
