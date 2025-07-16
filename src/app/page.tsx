
import HeroSection from '@/components/shared/HeroSection';

export default function HomePage() {
  return (
    <HeroSection
      title="A Place to Belong."
      subtitle="Connecting our community to God, each other, and their purpose."
      imageUrl="https://i.postimg.cc/QdMCtd7t/20250622-2011-image.png"
      imageAlt="A diverse group of people in a community setting, representing belonging"
      imageHint="community belonging diverse"
      primaryActionText="Find Your Community"
      primaryActionLink="/connect/groups"
      secondaryActionText="Watch a Recent Message"
      secondaryActionLink="/sermons"
    />
  );
}
