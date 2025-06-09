"use client";

import React, { useState, useEffect, useRef } from 'react'; // Added React import
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, Search, X, MapPin, ChevronDown, Video, Newspaper,
  GraduationCap, BookMarked, Church, Disc3, Mic2, Library, Users, HeartHandshake,
  BookOpen, ShieldCheck, Users2, HandHeart, CalendarDays, CheckCircle2, Gift, LayoutDashboard
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
      { label: 'All Ministries Overview', href: '/ministries', icon: LayoutDashboard, isFullWidthLink: true },
      {
        label: 'Youth & Student Empowerment',
        href: '/programs/youth-student-empowerment',
        icon: Users,
        subPrograms: [
          { label: 'Adolescent & Singles Club (ASC)', href: '/ministries/adolescent-singles-club' },
          { label: 'School Outreaches', href: '/ministries/school-outreaches' },
        ]
      },
      {
        label: 'Counseling & Family Support',
        href: '/programs/counseling-family-support',
        icon: HeartHandshake,
        subPrograms: [
          { label: 'Counseling Services', href: '/programs/counseling-family-support' },
          { label: 'Family Life Seminars (FLS)', href: '/ministries/family-life-seminars' },
          { label: 'Marriage Forum', href: '/programs/counseling-family-support' },
        ]
      },
      { label: 'Faith & Growth', href: '/programs/faith-growth', icon: GraduationCap },
      { label: 'Community Outreach', href: '/programs/community-outreach', icon: HandHeart },
    ],
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
      setIsTransparent(isHomePageCurrently && window.scrollY <= 50);
    };

    if (isHomePageCurrently) {
      handleScroll(); // Set initial state based on scroll
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsTransparent(false);
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
    }, 200); // 200ms delay before closing
  };

  const currentIsTransparent = isTransparent && hasMounted && pathname === '/';

  const headerClasses = cn(
    "sticky top-0 z-50 w-full border-b transition-colors duration-300 ease-in-out",
    currentIsTransparent
      ? "bg-transparent border-transparent"
      : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
  );

  const logoColor = cn(currentIsTransparent ? "text-white" : "text-primary");
  const linkTextColor = cn(currentIsTransparent ? "text-white hover:text-white/80" : "text-foreground/80 hover:text-primary");
  const iconColor = cn(currentIsTransparent ? "text-white" : "text-foreground/70");
  const dropdownButtonHoverBg = cn(currentIsTransparent ? "hover:bg-white/10" : "hover:bg-accent/50");
  const chevronColor = cn(currentIsTransparent ? "text-white/70" : "text-foreground/70");


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
                    className={cn("flex items-center space-x-1 px-3 py-2 h-auto", linkTextColor, dropdownButtonHoverBg)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={cn("h-4 w-4 opacity-70", chevronColor)} />
                  </Button>
                ) : (
                  <NavLink
                    href={item.href!}
                    className={cn("px-3 py-2", linkTextColor)}
                  >
                     {item.icon && <item.icon className={cn("h-5 w-5", iconColor, linkTextColor)} />}
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
                      <Link href={item.href} className="w-full font-semibold">All {item.label}</Link>
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
              )}
              {(item.isMegaMenu && item.megaMenuItems) && (
                 <DropdownMenuContent
                    align="center"
                    className={cn(
                      "mt-1 p-6 bg-background shadow-xl rounded-lg",
                       item.id === 'resources' ? "w-[600px] md:w-[700px] lg:w-[800px]" : "w-[550px] md:w-[600px]"
                    )}
                    onPointerEnter={() => handleMenuEnter(item.id)}
                    onPointerLeave={() => handleMenuLeave(item.id)}
                  >
                    {item.megaMenuItems!.find(sub => sub.isFullWidthLink) && (
                       item.megaMenuItems!.filter(sub => sub.isFullWidthLink).map(subItem => (
                        <div key={`${subItem.label}-header`} className="mb-4 pb-3 border-b border-border">
                            <Link
                                href={subItem.href}
                                className="font-semibold text-lg text-primary hover:underline flex items-center space-x-2"
                                onClick={() => setActiveMenu(null)}
                            >
                                {subItem.icon && <subItem.icon className="h-5 w-5 text-primary" />}
                                <span>{subItem.label}</span>
                            </Link>
                        </div>
                       ))
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

                    {item.id === 'ministries' && (
                       <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
                        {item.megaMenuItems!.filter(sub => !sub.isFullWidthLink).map((mainMinistryItem) => (
                          <div key={mainMinistryItem.label}>
                            <Link
                              href={mainMinistryItem.href}
                              className="group flex items-center space-x-2 p-2 rounded-md hover:bg-accent/10 transition-colors mb-1"
                              onClick={() => setActiveMenu(null)}
                            >
                              {mainMinistryItem.icon && <mainMinistryItem.icon className="h-5 w-5 text-accent group-hover:text-primary flex-shrink-0" />}
                              <p className="text-sm font-semibold text-foreground group-hover:text-primary">{mainMinistryItem.label}</p>
                            </Link>
                            {mainMinistryItem.subPrograms && mainMinistryItem.subPrograms.length > 0 && (
                              <div className="pl-4 space-y-1">
                                {mainMinistryItem.subPrograms.map(subProgram => (
                                  <Link
                                    key={subProgram.label}
                                    href={subProgram.href}
                                    className="group flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-accent/5 transition-colors"
                                    onClick={() => setActiveMenu(null)}
                                  >
                                    <p className="text-xs text-foreground/80 group-hover:text-primary">{subProgram.label}</p>
                                  </Link>
                                ))}
                              </div>
                            )}
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
            className={cn(iconColor, dropdownButtonHoverBg, "hover:text-primary")}
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
              <Button variant="ghost" size="icon" aria-label="Open menu" className={cn(iconColor, dropdownButtonHoverBg)}>
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
                  if ((item.isDropdown || item.isMegaMenu) && (item.subItems || item.megaMenuItems)) {
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
                              {item.isMegaMenu && item.megaMenuItems?.map(megaItem => (
                                <React.Fragment key={megaItem.label}>
                                  {!megaItem.isFullWidthLink && megaItem.category !== 'MEGA_HEADER' && (
                                    <NavLink href={megaItem.href} icon={megaItem.icon} onClick={() => setMobileMenuOpen(false)} className="text-base py-1">
                                      {megaItem.category && <span className="text-xs uppercase text-muted-foreground mr-1">{megaItem.category}:</span>}
                                      {megaItem.label}
                                    </NavLink>
                                  )}
                                  {megaItem.subPrograms && megaItem.subPrograms.map(subProg => (
                                    <NavLink key={subProg.label} href={subProg.href} onClick={() => setMobileMenuOpen(false)} className="text-sm py-1 pl-6">
                                      {subProg.label}
                                    </NavLink>
                                  ))}
                                </React.Fragment>
                              ))}
                              {item.isDropdown && item.subItems?.map(subItem => (
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
                    <NavLink key={item.href} href={item.href!} icon={item.icon} onClick={() => setMobileMenuOpen(false)} className="text-lg py-3 flex items-center">
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
