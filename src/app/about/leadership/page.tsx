
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Image from 'next/image';

// Placeholder data - replace with actual team members when available
const leadershipTeam = [
  { name: "Ministry Coordinator (Placeholder)", title: "Oversees ministry operations and strategy", img: "https://placehold.co/400x400.png", hint: "leader portrait team" },
  { name: "Program Director (Placeholder)", title: "Manages program development and outreach", img: "https://placehold.co/400x400.png", hint: "professional staff" },
  { name: "Finance & Admin Head (Placeholder)", title: "Handles financial stewardship and administration", img: "https://placehold.co/400x400.png", hint: "office team member" },
  { name: "Lead Counselor (Placeholder)", title: "Provides guidance for counseling services", img: "https://placehold.co/400x400.png", hint: "counselor professional" },
  { name: "Youth Programs Lead (Placeholder)", title: "Coordinates youth and singles activities", img: "https://placehold.co/400x400.png", hint: "youth leader" },
  { name: "Family Seminars Facilitator (Placeholder)", title: "Organizes and leads family life seminars", img: "https://placehold.co/400x400.png", hint: "speaker facilitator" },
];


export default function LeadershipPage() {
  return (
    <div>
      <ContentBlock
        title="Our Team"
        text="Family Tent Ministry is powered by a dedicated team of individuals passionate about our mission. While detailed profiles are being prepared, we are grateful for their commitment to fostering values and holistic development."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-lg text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
            Meet some of the key individuals and roles that help drive our vision forward. More information about our team members will be available soon.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {leadershipTeam.map(leader => (
              <div key={leader.name} className="flex flex-col items-center text-center p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow bg-card">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 shadow-lg">
                  <Image src={leader.img} alt={leader.name} layout="fill" objectFit="cover" data-ai-hint={leader.hint}/>
                </div>
                <h3 className="text-xl font-semibold font-headline text-primary mb-1">{leader.name}</h3>
                <p className="text-md text-accent">{leader.title}</p>
              </div>
            ))}
          </div>
           <p className="text-lg text-center text-foreground/70 mt-12">
            We believe in collaborative leadership and the unique contribution of each team member and volunteer.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
