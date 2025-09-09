
import ContentBlock from '@/components/shared/ContentBlock';
import Image from 'next/image';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import AnimatedSection from '@/components/shared/AnimatedSection';

const resourceCategories: CardGridItem[] = [
  {
    id: 'sermons',
    title: 'Sermon Archive',
    description: 'Watch or listen to past sermons and series from Family Tent Ministry.',
    imageUrl: '/images/track.jpg',
    imageAlt: 'Person listening to a sermon on headphones',
    imageHint: 'listening sermon',
    actionText: 'Explore Sermons',
    actionLink: '/archive',
  },
  {
    id: 'blog',
    title: 'Church Blog',
    description: 'Articles on faith, life, and culture from our pastors and leaders.',
    imageUrl: '/images/blog.webp',
    imageAlt: 'Someone writing in a journal',
    imageHint: 'writing journal',
    actionText: 'Read Our Blog',
    actionLink: '/resources/blog',
  },
  {
    id: 'podcasts',
    title: 'Podcasts',
    description: 'Engaging conversations and teachings available on your favorite podcast platform.',
    imageUrl: '/images/podcast.avif',
    imageAlt: 'Podcast microphone',
    imageHint: 'podcast microphone',
    actionText: 'Listen to Podcasts',
    actionLink: '/resources/podcasts',
  },
  // {
  //   id: 'music',
  //   title: 'Family Tent Ministry Music',
  //   description: 'Listen to music from Family Tent Ministry and find worship resources.',
  //   imageUrl: 'https://placehold.co/600x400.png',
  //   imageAlt: 'Musical notes and guitar',
  //   imageHint: 'music worship',
  //   actionText: 'Discover Music',
  //   actionLink: '/resources/music',
  // },
  {
    id: 'guides',
    title: 'Study Guides & Devotionals',
    description: 'Deepen your understanding of scripture with our study materials.',
    imageUrl: '/images/bible.jfif',
    imageAlt: 'Open Bible with a pen',
    imageHint: 'bible study',
    actionText: 'Find Guides',
    actionLink: '/bible',
  },
  {
    id: 'books',
    title: 'Recommended Books',
    description: 'A curated list of books for spiritual growth and learning.',
    imageUrl: '/images/book-shelf.jpeg',
    imageAlt: 'Stack of books',
    imageHint: 'books reading',
    actionText: 'Browse Books',
    actionLink: '/resources/books',
  },
];

export default function ResourcesPage() {
  return (
    <div>
      <ContentBlock
        title="Resources for Growth"
        text="We provide a wide range of resources to help you grow in your faith, deepen your understanding of God's Word, and live out the gospel in your daily life."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl mt-20"
      />
      <CardGrid items={resourceCategories} className="bg-background"/>
      <AnimatedSection className="py-12 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-4">Grow With Us</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Whether you're looking for teaching, music, or practical guides, our resources are here to support your spiritual journey. Dive in and discover something new today.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
