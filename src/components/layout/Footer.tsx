import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const footerSections = [
  {
    title: 'Quick Links',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Beliefs', href: '/about/beliefs' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Jobs', href: '/jobs' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Ministries', href: '/ministries' },
      { label: 'Community Groups', href: '/connect/groups' },
      { label: 'Serve', href: '/connect/serve' },
      { label: 'Missions', href: '/connect/missions' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Sermons', href: '/sermons' },
      { label: 'Blog', href: '/resources/blog' },
      { label: 'Podcasts', href: '/resources/podcasts' },
      { label: 'Music', href: '/resources/music' },
      { label: 'Give Online', href: '/give' },
    ],
  },
];

const socialLinks = [
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com/austinstone' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/austinstone' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com/austinstone' },
  { label: 'YouTube', icon: Youtube, href: 'https://youtube.com/austinstone' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-1 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block text-2xl font-bold font-headline text-primary">
              Austin Stone
            </Link>
            <p className="text-sm">
              123 Church Street<br />
              Austin, TX 78701<br />
              (512) 555-1234
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
          <p className="text-sm">&copy; {new Date().getFullYear()} Austin Stone Community Church. All rights reserved.</p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
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
