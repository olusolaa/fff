import ContentBlock from '@/components/shared/ContentBlock';
import CardGrid, { CardGridItem } from '@/components/shared/CardGrid';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Image from 'next/image';

const coreValues: CardGridItem[] = [
  {
    id: 'gospel',
    title: 'Gospel-Centered',
    description: 'The gospel of Jesus Christ is the foundation of everything we do and believe.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cross symbol'
  },
  {
    id: 'community',
    title: 'Authentic Community',
    description: 'We are committed to fostering genuine relationships and doing life together.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'people talking'
  },
  {
    id: 'mission',
    title: 'Missional Living',
    description: 'We equip and send out disciples to love and serve our city and the world.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'city skyline'
  },
];

export default function AboutPage() {
  return (
    <div>
      <ContentBlock
        title="About Family Tent Ministry"
        text="Family Tent Ministry exists to take the gospel of our Lord Jesus Christ to all people groups in Kenya and beyond. We are a diverse community united by the gospel, committed to growing in faith and making a positive impact."
        imageUrl="https://placehold.co/1200x800.png"
        imageAlt="Family Tent Ministry outreach event"
        imageHint="Kenya landscape"
        imagePosition="right"
        className="bg-secondary/30"
        titleClassName="text-4xl md:text-5xl"
      />

      <ContentBlock
        title="Our History"
        text="Family Tent Ministry has a rich history, beginning with a passionate group of people dedicated to seeing lives transformed by the gospel. Over the years, God has blessed us with growth, allowing us to expand our reach and ministries."
        imagePosition="left"
      />
      
      <ContentBlock
        title="Our Beliefs"
        text="We hold to the historic Christian faith as expressed in the Scriptures. Key tenets include the authority of the Bible, the Trinity, the deity and humanity of Jesus Christ, salvation by grace through faith, and the mission of the Church. For a detailed statement of faith, please visit our beliefs page."
        imageUrl="https://placehold.co/800x600.png"
        imageAlt="Open Bible"
        imageHint="open bible"
        imagePosition="right"
        actionText="View Statement of Faith"
        actionLink="/about/beliefs"
        className="bg-secondary/30"
      />

      <CardGrid title="Our Core Values" items={coreValues} className="bg-background" />

      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline text-primary md:text-4xl mb-8">Meet Our Leadership</h2>
          <p className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
            Our ministry is led by a dedicated team committed to shepherding and guiding our mission.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "John Doe", title: "Lead Pastor", img: "https://placehold.co/400x400.png", hint: "pastor portrait" },
              { name: "Jane Smith", title: "Executive Pastor", img: "https://placehold.co/400x400.png", hint: "pastor portrait"  },
              { name: "Robert Brown", title: "Worship Pastor", img: "https://placehold.co/400x400.png", hint: "pastor portrait"  },
              { name: "Emily White", title: "Missions Director", img: "https://placehold.co/400x400.png", hint: "director portrait"  },
            ].map(leader => (
              <div key={leader.name} className="flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 shadow-lg">
                  <Image src={leader.img} alt={leader.name} layout="fill" objectFit="cover" data-ai-hint={leader.hint}/>
                </div>
                <h3 className="text-xl font-semibold font-headline text-primary">{leader.name}</h3>
                <p className="text-md text-accent">{leader.title}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
