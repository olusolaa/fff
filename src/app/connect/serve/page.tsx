
import ContentBlock from '@/components/shared/ContentBlock';
import CardGrid, { CardGridItem } from '@/components/shared/CardGrid';

const serveOpportunities: CardGridItem[] = [
  {
    id: 'guest-services',
    title: 'Guest Services',
    description: 'Be the first to welcome guests and create a friendly, inviting atmosphere on Sundays.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'friendly welcome team',
    actionText: 'Join the Team',
    actionLink: '#',
  },
  {
    id: 'kids-ministry',
    title: 'Kids Ministry',
    description: 'Invest in the next generation by serving in our kids\' environments on Sunday mornings.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'children learning joy',
    actionText: 'Serve with Kids',
    actionLink: '#',
  },
  {
    id: 'production-team',
    title: 'Production Team',
    description: 'Help create an engaging worship experience through audio, video, and lighting.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'sound board production',
    actionText: 'Learn About Production',
    actionLink: '#',
  },
  {
    id: 'community-outreach',
    title: 'Community Outreach',
    description: 'Join one of our local partners to serve and make a tangible difference in our city.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'community service project',
    actionText: 'Find an Opportunity',
    actionLink: '#',
  },
];

export default function ServePage() {
  return (
    <div>
      <ContentBlock
        title="Make a Difference"
        text="One of the best ways to get involved, meet people, and grow in your faith is to serve. We have many opportunities to use your gifts to build up the church and bless our community."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <CardGrid title="Serving Opportunities" items={serveOpportunities} gridCols="md:grid-cols-2" />
    </div>
  );
}
