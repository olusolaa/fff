
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPinIcon } from 'lucide-react';
import Link from 'next/link';

const locations = [
  {
    name: "Temporary Site: Life Centre",
    address: "Opposite Akure South L.G. Secretariat, Behind Tisco Industries, Akure, Ondo State, Nigeria.",
    details: "Main venue for many of our current gatherings and seminars.",
    mapLink: "https://maps.google.com/?q=Life+Centre,opposite+Akure+South+L.G.+Secretariat,Akure,Ondo+State,Nigeria",
    image: "https://placehold.co/600x400.png",
    imageHint: "community center building"
  },
  {
    name: "Permanent Site: Life Camp",
    address: "1st bridge Ilere, off Ijare road, Akure, Ondo State, Nigeria.",
    details: "Our future home, currently under development for expanded ministry activities.",
    mapLink: "https://maps.google.com/?q=Life+Camp,1st+bridge+Ilere,off+Ijare+road,Akure,Ondo+State,Nigeria",
    image: "https://placehold.co/600x400.png",
    imageHint: "land development site"
  },
];

export default function LocationsPage() {
  return (
    <div>
      <ContentBlock
        title="Our Locations"
        text="Family Tent Ministry operates from key locations in Akure, Ondo State, Nigeria, as we work to serve our community."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <Card key={location.name} className="overflow-hidden shadow-lg flex flex-col">
                <div className="relative h-56 w-full">
                   <Link href={location.mapLink} target="_blank" rel="noopener noreferrer">
                    <img src={location.image} alt={`${location.name}`} data-ai-hint={location.imageHint} className="w-full h-full object-cover" />
                   </Link>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary flex items-center">
                    <MapPinIcon className="h-6 w-6 mr-2 text-accent flex-shrink-0" />
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 flex-grow">
                  <p className="text-foreground/80">{location.address}</p>
                  {location.details && <p className="text-sm text-foreground/70">{location.details}</p>}
                  <Link href={location.mapLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm inline-flex items-center">
                    View on Map <MapPinIcon className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>
       <AnimatedSection className="py-12 md:py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline md:text-4xl mb-4">Joining Our Programs</h2>
          <p className="text-lg mb-6">Most of our programs are held at our Temporary Site (Life Centre). Please check specific program details or contact us for more information.</p>
          <Link href="/contact" className="inline-block px-6 py-3 rounded-md bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors">
            Contact Us
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
