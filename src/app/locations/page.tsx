import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPinIcon } from 'lucide-react';
import Link from 'next/link';

const locations = [
  {
    name: "Downtown Campus",
    address: "123 Main St, Austin, TX 78701",
    serviceTimes: "Sundays at 9:00 AM & 11:00 AM",
    mapLink: "https://maps.google.com/?q=123+Main+St,Austin,TX",
    image: "https://placehold.co/600x400.png",
    imageHint: "church building"
  },
  {
    name: "North Campus",
    address: "456 Oak Ave, Austin, TX 78758",
    serviceTimes: "Sundays at 9:30 AM & 11:30 AM",
    mapLink: "https://maps.google.com/?q=456+Oak+Ave,Austin,TX",
    image: "https://placehold.co/600x400.png",
    imageHint: "modern church"
  },
  {
    name: "South Campus",
    address: "789 Pine Rd, Austin, TX 78745",
    serviceTimes: "Sundays at 10:00 AM",
    mapLink: "https://maps.google.com/?q=789+Pine+Rd,Austin,TX",
    image: "https://placehold.co/600x400.png",
    imageHint: "church entrance"
  },
];

export default function LocationsPage() {
  return (
    <div>
      <ContentBlock
        title="Our Locations"
        text="The Austin Stone gathers in multiple locations across the city. Find a campus near you and join us for worship this Sunday. We look forward to welcoming you!"
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <Card key={location.name} className="overflow-hidden shadow-lg">
                <div className="relative h-48 w-full">
                   <Link href={location.mapLink} target="_blank" rel="noopener noreferrer">
                    <img src={location.image} alt={`${location.name} building`} data-ai-hint={location.imageHint} className="w-full h-full object-cover" />
                   </Link>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary flex items-center">
                    <MapPinIcon className="h-6 w-6 mr-2 text-accent" />
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-foreground/80">{location.address}</p>
                  <p className="font-semibold text-foreground">Service Times: {location.serviceTimes}</p>
                  <Link href={location.mapLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    Get Directions
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
       <AnimatedSection className="py-12 md:py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline md:text-4xl mb-4">Can't Find a Campus Near You?</h2>
          <p className="text-lg mb-6">We are always exploring new opportunities to serve communities in Austin. You can also join our online services if you're unable to attend in person.</p>
          <Link href="/sermons" className="inline-block px-6 py-3 rounded-md bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors">
            Watch Online
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
