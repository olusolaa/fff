
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
// Note: A form component would typically go here, but this is a placeholder.

export default function ContactPage() {
  return (
    <div>
      <ContentBlock
        title="Contact Us"
        text="We'd love to hear from you! Whether you have questions, need prayer, or want to learn more about Family Tent Ministry, feel free to reach out."
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl"
      />
      <AnimatedSection className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold font-headline text-primary mb-6">Get in Touch</h2>
              <Card className="shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-accent flex items-center">
                    <Phone className="mr-2 h-5 w-5" /> Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">(512) 555-1234</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-accent flex items-center">
                    <Mail className="mr-2 h-5 w-5" /> Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">info@familytentministry.org</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-accent flex items-center">
                    <MapPin className="mr-2 h-5 w-5" /> Mailing Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">123 Church Street<br/>Austin, TX 78701</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-headline text-primary mb-6">Send Us a Message</h2>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-accent">Contact Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    Our contact form will be available here soon. For now, please use the phone or email details provided.
                  </p>
                  {/* Placeholder for a contact form component */}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
