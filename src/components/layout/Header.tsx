
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, Search, X, MapPin, ChevronDown, Video, Newspaper,
  GraduationCap, BookMarked, Church, Disc3, Mic2, Library, Users, HeartHandshake,
  BookOpen, ShieldCheck, Users2, HandHeart, CalendarDays, CheckCircle2, Gift, LayoutDashboard, School, Briefcase
} from 'lucide-react';
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
  category?: string; 
  description?: string; 
  isFullWidthLink?: boolean; 
  subPrograms?: Array<{ label: string; href: string; icon?: LucideIcon; description?: string; }>;
}

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[]; 
  megaMenuItems?: NavSubItem[]; 
  isDropdown?: boolean;
  isMegaMenu?: boolean;
}

const navItems: NavItem[] = [
  {
    id: 'about',
    label: 'About',
    href: '/about',
    isDropdown: true,
    subItems: [
      { label: 'Our Story', href: '/about/history', icon: BookOpen },
      { label: 'Our Beliefs', href: '/about/beliefs', icon: ShieldCheck },
      { label: 'Our Team', href: '/about/leadership', icon: Users2 },
    ],
  },
  {
    id: 'ministries',
    label: 'Ministries',
    href: '/ministries', 
    isMegaMenu: true,
    megaMenuItems: [
      { label: 'Adolescent & Singles Club', href: '/ministries/adolescent-singles-club', icon: Users, category: 'CLUB' },
      { label: 'School Outreaches', href: '/ministries/school-outreaches', icon: School, category: 'OUTREACH' },
      { label: 'Counseling Services', href: '/programs/counseling-family-support', icon: HeartHandshake, category: 'SUPPORT' },
      { label: 'Family Life Seminars', href: '/ministries/family-life-seminars', icon: CalendarDays, category: 'SEMINAR' },
      { label: 'Marriage Forum', href: '/programs/counseling-family-support', icon: Users2, category: 'FORUM' },
      { label: 'Discipleship Classes', href: '/programs/faith-growth', icon: BookOpen, category: 'GROWTH' },
      { label: 'Community Outreach', href: '/programs/community-outreach', icon: HandHeart, category: 'SERVICE' },
    ]
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
    isMegaMenu: true,
    megaMenuItems: [
      { category: 'MEGA_HEADER', label: 'Explore All Resources', href: '/resources', isFullWidthLink: true, icon: LayoutDashboard },
      { category: 'WATCH', label: 'Sermons', href: '/sermons', icon: Church },
      { category: 'WATCH', label: 'Videos', href: '/resources/videos', icon: Video },
      { category: 'LISTEN', label: 'Music', href: '/resources/music', icon: Disc3 },
      { category: 'LISTEN', label: 'Podcasts', href: '/resources/podcasts', icon: Mic2 },
      { category: 'READ', label: 'Articles', href: '/resources/blog', icon: Newspaper },
      { category: 'READ', label: 'Study Guides', href: '/resources/guides', icon: Library },
      { category: 'READ', label: 'Books', href: '/resources/books', icon: BookMarked },
    ]
  },
  {
    id: 'events',
    label: 'Events',
    href: '/events',
    icon: CalendarDays,
  },
  {
    id: 'visit',
    label: 'Visit',
    href: '/plan-visit',
    isDropdown: true,
    subItems: [
        { label: 'Plan Your Visit', href: '/plan-visit', icon: CheckCircle2},
        { label: 'Locations', href: '/locations', icon: MapPin },
    ]
  },
  {
    id: 'give',
    label: 'Give',
    href: '/give',
    icon: Gift,
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const isHomePageCurrently = pathname === '/';

    const handleScroll = () => {
      if (isHomePageCurrently) {
        setIsTransparent(window.scrollY <= 50);
      }
    };

    if (isHomePageCurrently) {
      setIsTransparent(window.scrollY <= 50); // Set initial state
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsTransparent(false); // Not on homepage, header is solid
    }

    return () => {
      if (isHomePageCurrently) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMounted, pathname]);


  const handleMenuEnter = (menuId: string) => {
    if (menuTimers.current[menuId]) {
      clearTimeout(menuTimers.current[menuId]);
    }
    setActiveMenu(menuId);
  };

  const handleMenuLeave = (menuId: string) => {
    menuTimers.current[menuId] = setTimeout(() => {
      setActiveMenu(null);
    }, 200); 
  };
  
  const currentIsTransparent = isTransparent && hasMounted && pathname === '/';

  const headerClasses = cn(
    "sticky top-0 z-50 w-full border-b transition-colors duration-300 ease-in-out",
    currentIsTransparent
      ? "bg-transparent border-transparent"
      : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
  );

  const logoColor = cn(currentIsTransparent ? "text-white" : "text-primary");
  const linkTextColorBase = "text-foreground/80 hover:text-primary";
  const linkTextColorTransparent = "text-white hover:text-white/80";
  const iconColorBase = "text-foreground/70";
  const iconColorTransparent = "text-white";
  const dropdownButtonHoverBgBase = "hover:bg-accent/50";
  const dropdownButtonHoverBgTransparent = "hover:bg-white/10";
  const chevronColorBase = "text-foreground/70";
  const chevronColorTransparent = "text-white/70";


  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className={cn("text-2xl font-bold font-headline", logoColor)}>
          Family Tent Ministry
        </Link>

        <nav className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => (
            <DropdownMenu key={item.id} open={activeMenu === item.id} onOpenChange={(isOpen) => !isOpen && setActiveMenu(null)}>
              <DropdownMenuTrigger asChild
                onPointerEnter={() => (item.isDropdown || item.isMegaMenu) && handleMenuEnter(item.id)}
                onPointerLeave={() => (item.isDropdown || item.isMegaMenu) && handleMenuLeave(item.id)}
              >
                {item.isDropdown || item.isMegaMenu ? (
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center space-x-1 px-3 py-2 h-auto",
                      currentIsTransparent ? linkTextColorTransparent : linkTextColorBase,
                      currentIsTransparent ? dropdownButtonHoverBgTransparent : dropdownButtonHoverBgBase
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={cn("h-4 w-4 opacity-70", currentIsTransparent ? chevronColorTransparent : chevronColorBase)} />
                  </Button>
                ) : (
                  <NavLink
                    href={item.href!}
                    className={cn("px-3 py-2", currentIsTransparent ? linkTextColorTransparent : linkTextColorBase)}
                  >
                     {item.icon && <item.icon className={cn("h-5 w-5 mr-1", currentIsTransparent ? iconColorTransparent : iconColorBase, currentIsTransparent ? linkTextColorTransparent : linkTextColorBase)} />}
                    <span>{item.label}</span>
                  </NavLink>
                )}
              </DropdownMenuTrigger>
              {(item.isDropdown && item.subItems) && (
                <DropdownMenuContent
                  align="start"
                  className="mt-1" 
                  onPointerEnter={() => handleMenuEnter(item.id)}
                  onPointerLeave={() => handleMenuLeave(item.id)}
                >
                  {item.href && ( 
                     <DropdownMenuItem asChild>
                      <Link href={item.href} className="w-full font-semibold text-primary hover:bg-accent/10" onClick={() => setActiveMenu(null)}>All {item.label}</Link>
                    </DropdownMenuItem>
                  )}
                  {item.subItems.map((subItem) => (
                    <DropdownMenuItem key={subItem.label} asChild>
                      <Link href={subItem.href} className="flex items-center space-x-2 w-full" onClick={() => setActiveMenu(null)}>
                        {subItem.icon && <subItem.icon className="h-4 w-4 text-muted-foreground" />}
                        <span>{subItem.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
              {(item.isMegaMenu && item.megaMenuItems) && (
                 <DropdownMenuContent
                    align="center"
                    className={cn(
                      "mt-1 p-6 bg-background shadow-xl rounded-lg",
                       item.id === 'resources' ? "w-[600px] md:w-[700px] lg:w-[800px]" : "w-[700px] md:w-[800px] lg:w-[900px]" // Adjusted width for Ministries
                    )}
                    onPointerEnter={() => handleMenuEnter(item.id)}
                    onPointerLeave={() => handleMenuLeave(item.id)}
                  >
                    {item.megaMenuItems!.find(sub => sub.isFullWidthLink && sub.category === 'MEGA_HEADER') && (
                       item.megaMenuItems!.filter(sub => sub.isFullWidthLink && sub.category === 'MEGA_HEADER').map(subItem => (
                        <div key={`${subItem.label}-header`} className="mb-4 pb-3 border-b border-border">
                            <Link
                                href={subItem.href!}
                                className="font-semibold text-lg text-primary hover:underline flex items-center space-x-2"
                                onClick={() => setActiveMenu(null)}
                            >
                                {subItem.icon && <subItem.icon className="h-5 w-5 text-primary" />}
                                <span>{subItem.label}</span>
                            </Link>
                        </div>
                       ))
                    )}
                    
                    {/* Ministries Mega Menu Specific Layout */}
                    {item.id === 'ministries' && (
                      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
                        {item.megaMenuItems!.filter(sub => !sub.isFullWidthLink).map((subItem) => (
                           <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="group flex flex-col items-center text-center p-3 rounded-md hover:bg-accent/10 transition-colors"
                              onClick={() => setActiveMenu(null)}
                            >
                              {subItem.icon && <subItem.icon className="h-10 w-10 text-accent group-hover:text-primary mb-2" />}
                              {subItem.category && <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">{subItem.category}</p>}
                              <p className="text-sm font-medium text-foreground group-hover:text-primary">{subItem.label}</p>
                            </Link>
                        ))}
                      </div>
                    )}


                    {item.id === 'resources' && (
                      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                        {(['WATCH', 'LISTEN', 'READ'] as const).map(category => (
                          <div key={category} className="space-y-3">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{category}</h3>
                            <div className="space-y-2">
                              {item.megaMenuItems!.filter(sub => sub.category === category && !sub.isFullWidthLink).map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-accent/10 transition-colors"
                                  onClick={() => setActiveMenu(null)}
                                >
                                  {subItem.icon && <subItem.icon className="h-6 w-6 text-accent group-hover:text-primary flex-shrink-0" />}
                                  <p className="text-sm font-medium text-foreground group-hover:text-primary">{subItem.label}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </DropdownMenuContent>
              )}
            </DropdownMenu>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className={cn(currentIsTransparent ? iconColorTransparent : iconColorBase, currentIsTransparent ? dropdownButtonHoverBgTransparent : dropdownButtonHoverBgBase, "hover:text-primary")}
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
              <Button variant="ghost" size="icon" aria-label="Open menu" className={cn(currentIsTransparent ? iconColorTransparent : iconColorBase, currentIsTransparent ? dropdownButtonHoverBgTransparent : dropdownButtonHoverBgBase)}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6 overflow-y-auto">
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
                  if (item.isDropdown || item.isMegaMenu) {
                    const itemsToDisplay = item.isMegaMenu ? item.megaMenuItems?.filter(mItem => !mItem.isFullWidthLink) : item.subItems;
                    return (
                      <Accordion key={item.id} type="single" collapsible className="w-full">
                        <AccordionItem value={item.id} className="border-b-0">
                          <AccordionTrigger 
                            className="text-lg font-medium text-foreground/80 hover:text-primary hover:no-underline py-3 px-0 data-[state=open]:text-primary [&[data-state=open]>svg]:text-primary"
                            onClick={(e) => {
                              // If it's a mega menu with a direct link, navigate instead of just toggling
                              if (item.isMegaMenu && item.href && item.id !== 'resources' && item.id !== 'ministries') { // prevent navigation for main mega menu triggers
                                e.preventDefault();
                                // router.push(item.href); // Would need to import useRouter
                                setMobileMenuOpen(false); 
                                window.location.href = item.href; // simple navigation
                              }
                            }}
                          >
                            <span>{item.label}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-0 pl-4">
                            <nav className="flex flex-col space-y-2 mt-1">
                              {item.href && ( // For main link of the section
                                <NavLink href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold py-1 hover:text-primary">
                                  All {item.label}
                                </NavLink>
                              )}
                              {itemsToDisplay?.map(subItem => (
                                 <NavLink key={subItem.href} href={subItem.href} icon={subItem.icon} onClick={() => setMobileMenuOpen(false)} className="text-base py-1 hover:text-primary">
                                  {item.id === 'resources' && subItem.category && !subItem.isFullWidthLink && <span className="text-xs uppercase text-muted-foreground mr-1">{subItem.category}:</span>}
                                  {item.id === 'ministries' && subItem.category && <span className="text-xs uppercase text-muted-foreground mr-1">{subItem.category} - </span>}
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
                    <NavLink key={item.id} href={item.href!} icon={item.icon} onClick={() => setMobileMenuOpen(false)} className="text-lg py-3 flex items-center hover:text-primary">
                       {item.icon && <item.icon className="h-5 w-5 mr-3 text-muted-foreground" />}
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
                 <Button variant="ghost" className="flex items-center justify-start space-x-2 text-lg py-3 px-0 text-foreground/80 hover:text-primary">
                    <Search className="h-5 w-5 mr-3 text-muted-foreground" />
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
