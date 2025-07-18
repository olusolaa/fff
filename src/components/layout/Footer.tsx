
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const footerSections = [
  {
    title: 'About FTM',
    links: [
      { label: 'Our Story', href: '/about/history' },
      { label: 'Our Mission & Vision', href: '/about#mission-vision' }, // Assuming mission-vision section ID on about page
      { label: 'Our Beliefs', href: '/about/beliefs' },
      { label: 'Our Team', href: '/about/leadership' },
    ],
  },
  {
    title: 'Our Programs',
    links: [
      { label: 'Counseling & Family Support', href: '/programs/counseling-family-support' },
      { label: 'Youth & Student Empowerment', href: '/programs/youth-student-empowerment' },
      { label: 'Faith & Growth', href: '/programs/faith-growth' },
      { label: 'Community Outreach', href: '/programs/community-outreach' },
    ],
  },
  {
    title: 'Connect & Resources',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Our Locations', href: '/locations' },
      { label: 'Events', href: '/events' },
      { label: 'Sermons/Teachings', href: '/sermons' },
      { label: 'Give / Partner', href: '/give' },
    ],
  },
];

const socialLinks = [
  { label: 'Facebook', href: '#', icon: Facebook }, // Replace # with actual FTM Facebook link
  { label: 'Instagram', href: '#', icon: Instagram }, // Replace # with actual FTM Instagram link
  { label: 'Twitter', href: '#', icon: Twitter }, // Replace # with actual FTM Twitter link
  { label: 'YouTube', href: '#', icon: Youtube }, // Replace # with actual FTM YouTube link
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-1 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block text-2xl font-bold font-headline text-primary">
              Family Tent Ministry
            </Link>
            <p className="text-sm">
              P.O Box 3992, Akure, <br />Ondo State, Nigeria.<br />
              Phone: +234 (0)803 386 1136
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-lg font-semibold font-headline">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8 bg-border" />
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} Family Tent Ministry. All rights reserved.</p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link 
                key={social.label} 
                href={social.href} 
                aria-label={social.label} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <social.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
         <div className="mt-4 text-center text-xs">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
      </div>
    </footer>
  );
}
