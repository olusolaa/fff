
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Search, X, MapPin, ChevronDown, Video, Newspaper, GraduationCap, BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavLink from './NavLink';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavSubItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface NavItem {
  label: string;
  href?: string; 
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  isDropdown?: boolean;
}

const navItems: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    isDropdown: true,
    subItems: [
      { label: 'Our History', href: '/about/history' },
      { label: 'Our Beliefs', href: '/about/beliefs' },
      { label: 'Our Team', href: '/about/leadership' },
    ],
  },
  {
    label: 'Programs',
    href: '/programs',
    isDropdown: true,
    subItems: [
      { label: 'Counseling & Family Support', href: '/programs/counseling-family-support' },
      { label: 'Youth & Student Empowerment', href: '/programs/youth-student-empowerment' },
      { label: 'Faith & Growth', href: '/programs/faith-growth' },
      { label: 'Community Outreach', href: '/programs/community-outreach' },
    ],
  },
  { href: '/give', label: 'Give' },
  {
    label: 'Resources',
    href: '/resources',
    isDropdown: true,
    subItems: [
      { label: 'Sermons', href: '/sermons', icon: Video },
      { label: 'Blog', href: '/resources/blog', icon: Newspaper },
      { label: 'Study Guides', href: '/resources/guides', icon: GraduationCap },
      { label: 'Recommended Books', href: '/resources/books', icon: BookMarked },
    ],
  },
  { href: '/locations', label: 'Locations', icon: MapPin },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false); // Default to solid for SSR and initial client render

  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return; // Don't run on server or before client mount
    }

    const isHomePageCurrently = pathname === '/';

    if (isHomePageCurrently) {
      const handleScroll = () => {
        // Transparent if at top of homepage, otherwise solid
        setIsTransparent(window.scrollY <= 50);
      };
      
      // Set initial state based on scroll position after mount
      handleScroll(); 
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Not on homepage, so header should be solid
      setIsTransparent(false);
    }
  }, [hasMounted, pathname]);

  // Determine effective transparency for styling
  // On server and initial client render, hasMounted is false, so localIsTransparent is false (solid)
  // After mount, localIsTransparent depends on the isTransparent state driven by scroll/route
  const localIsTransparent = hasMounted && isTransparent;

  const headerClasses = cn(
    "sticky top-0 z-50 w-full border-b transition-colors duration-300 ease-in-out",
    localIsTransparent
      ? "bg-transparent border-transparent"
      : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
  );

  const logoColor = localIsTransparent ? "text-white" : "text-primary";
  const linkTextColor = localIsTransparent ? "text-white" : "text-foreground/80";
  const linkHoverTextColor = localIsTransparent ? "hover:text-white/80" : "hover:text-primary";
  const iconColor = localIsTransparent ? "text-white" : "text-foreground/70";
  const dropdownButtonHoverBg = localIsTransparent ? "hover:bg-white/10" : "hover:bg-accent/50"; // Adjusted hover for dropdown
  const chevronColor = localIsTransparent ? "text-white/70" : "text-foreground/70"; // Chevron color adapts


  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className={cn("text-2xl font-bold font-headline", logoColor)}>
          Family Tent Ministry
        </Link>

        <nav className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => {
            if (item.isDropdown && item.subItems) {
              return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center space-x-1 px-3 py-2 h-auto text-sm font-medium",
                        linkTextColor,
                        linkHoverTextColor,
                        dropdownButtonHoverBg 
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={cn("h-4 w-4 opacity-70", chevronColor)} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.href && (
                       <DropdownMenuItem asChild>
                        <Link href={item.href} className="w-full">All {item.label}</Link>
                      </DropdownMenuItem>
                    )}
                    {item.subItems.map((subItem) => (
                      <DropdownMenuItem key={subItem.label} asChild>
                        <Link href={subItem.href} className="flex items-center space-x-2 w-full">
                          {subItem.icon && <subItem.icon className="h-4 w-4 text-muted-foreground" />}
                          <span>{subItem.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <NavLink
                key={item.href}
                href={item.href!}
                icon={item.icon}
                className={cn("px-3 py-2", linkTextColor, linkHoverTextColor)}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className={cn(iconColor, localIsTransparent ? "hover:bg-white/10" : "hover:bg-accent/50")}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/new">I'm New</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className={cn(iconColor, localIsTransparent ? "hover:bg-white/10" : "hover:bg-accent/50")}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="mb-6 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold font-headline text-primary" onClick={() => setMobileMenuOpen(false)}>
                  Family Tent Ministry
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  if (item.isDropdown && item.subItems) {
                    return (
                      <Accordion key={item.label} type="single" collapsible className="w-full">
                        <AccordionItem value={item.label} className="border-b-0">
                          <AccordionTrigger className="text-lg font-medium text-foreground/80 hover:text-primary hover:no-underline py-3 px-0 data-[state=open]:text-primary [&[data-state=open]>svg]:text-primary">
                            <span>{item.label}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-0 pl-4">
                            <nav className="flex flex-col space-y-2 mt-1">
                              {item.href && (
                                <NavLink href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold py-1">
                                  All {item.label}
                                </NavLink>
                              )}
                              {item.subItems.map((subItem) => (
                                <NavLink key={subItem.href} href={subItem.href} icon={subItem.icon} onClick={() => setMobileMenuOpen(false)} className="text-base py-1">
                                  {subItem.label}
                                </NavLink>
                              ))}
                            </nav>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  return (
                    <NavLink key={item.href} href={item.href!} icon={item.icon} onClick={() => setMobileMenuOpen(false)} className="text-lg py-3">
                      {item.label}
                    </NavLink>
                  );
                })}
                 <Button variant="ghost" className="flex items-center justify-start space-x-2 text-lg py-3 px-0">
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </Button>
                <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg mt-4" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/new">I'm New</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
