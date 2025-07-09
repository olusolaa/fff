
import ContentBlock from '@/components/shared/ContentBlock';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';

const groupItems: CardGridItem[] = [
  {
    id: 'young-adults',
    title: 'Young Adults Group',
    description: 'A community for those in their 20s and 30s to connect, grow, and do life together.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'young adults coffee',
    actionText: 'Learn More & Join',
    actionLink: '#',
  },
  {
    id: 'mens-group',
    title: 'Men\'s Ministry',
    description: 'Groups for men to build authentic friendships and encourage each other in their faith.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'men talking group',
    actionText: 'Find a Group',
    actionLink: '#',
  },
  {
    id: 'womens-group',
    title: 'Women\'s Ministry',
    description: 'Connecting women of all ages and stages of life through study, prayer, and fellowship.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'women laughing group',
    actionText: 'Explore Groups',
    actionLink: '#',
  },
    {
    id: 'marriage-group',
    title: 'Marriage & Family',
    description: 'Groups designed to strengthen marriages and support families through every season.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'couple holding hands',
    actionText: 'See Group Options',
    actionLink: '#',
  },
];


export default function CommunityGroupsPage() {
  return (
    <div>
      <ContentBlock
        title="Find Your Community"
        text="We believe life is better together. Community Groups are the heart of our church—they are the primary way we connect with each other, grow in our faith, and impact our city."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <CardGrid title="Explore Our Groups" items={groupItems} gridCols="md:grid-cols-2" />
    </div>
  );
}
