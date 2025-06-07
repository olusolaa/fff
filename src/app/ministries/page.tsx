import ContentBlock from '@/components/shared/ContentBlock';
import CardGrid, { type CardGridItem } from '@/components/shared/CardGrid';
import AnimatedSection from '@/components/shared/AnimatedSection';

const ministryCategories: CardGridItem[] = [
  {
    id: 'adults',
    title: 'Adult Ministries',
    description: 'Ministries for men, women, couples, and seniors to grow in faith and community.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Adults in a discussion group',
    imageHint: 'adults discussion',
    actionText: 'Learn More',
    actionLink: '/ministries/adults',
  },
  {
    id: 'students',
    title: 'Student Ministries',
    description: 'Engaging programs for middle school, high school, and college students.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Students laughing together',
    imageHint: 'students laughing',
    actionText: 'Learn More',
    actionLink: '/ministries/students',
  },
  {
    id: 'kids',
    title: 'Kids Ministries',
    description: 'Fun and safe environments for children to learn about Jesus.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Children playing',
    imageHint: 'children playing',
    actionText: 'Learn More',
    actionLink: '/ministries/kids',
  },
   {
    id: 'care',
    title: 'Care & Support',
    description: 'Providing care, counseling, and support for those in need.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Hands offering support',
    imageHint: 'support help',
    actionText: 'Get Support',
    actionLink: '/ministries/care',
  },
  {
    id: 'outreach',
    title: 'Outreach & Missions',
    description: 'Serving our local community and sharing the gospel globally.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Volunteers working in community',
    imageHint: 'community outreach',
    actionText: 'Get Involved',
    actionLink: '/ministries/outreach',
  },
   {
    id: 'worship',
    title: 'Worship & Arts',
    description: 'Using creative arts to glorify God and lead others in worship.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Worship band playing',
    imageHint: 'worship band',
    actionText: 'Join the Team',
    actionLink: '/ministries/worship',
  },
];

export default function MinistriesPage() {
  return (
    <div>
      <ContentBlock
        title="Our Ministries"
        text="At The Austin Stone, we offer a variety of ministries designed to help you grow in your relationship with God and connect with others. Explore the different ways you can get involved and find your place in our community."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <CardGrid items={ministryCategories} />
      <AnimatedSection className="py-12 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-4">Find Your Place</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            No matter your age, background, or stage of life, there's a ministry for you at The Austin Stone. We encourage you to explore, connect, and grow with us.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
