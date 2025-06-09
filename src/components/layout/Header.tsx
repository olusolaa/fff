
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, Search, X, MapPin, ChevronDown, Video, Newspaper,
  GraduationCap, BookMarked, Church, Disc3, Mic2, Library, Users, HeartHandshake,
  BookOpen, ShieldCheck, Users2, HandHeart, CalendarDays, CheckCircle2, Gift, LayoutDashboard, School, Info
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
  category?: string; // Used in Resources for WATCH/LISTEN/READ or in About/Ministries item blocks
  description?: string; // Used for Ministries mega menu item descriptions (if any)
  isFullWidthLink?: boolean; // For the top link in mega menus
  subPrograms?: Array<{ label: string; href: string; icon?: LucideIcon; description?: string; }>; // For Ministries sub-programs
}

interface NavItem {
  id: string;
  label: string;
  href?: string; // Main link for the tab itself
  icon?: LucideIcon; // Icon for direct links like Events, Give
  subItems?: NavSubItem[]; // For simple dropdowns
  megaMenuItems?: NavSubItem[]; // For mega menus
  isDropdown?: boolean; // Simple click/hover dropdown
  isMegaMenu?: boolean; // Wide, custom layout hover dropdown
}

const navItems: NavItem[] = [
  {
    id: 'about',
    label: 'About',
    href: '/about',
    isMegaMenu: true,
    megaMenuItems: [
      {
        label: 'Learn More About Us',
        href: '/about',
        icon: Info, // Changed from LayoutDashboard for context
        isFullWidthLink: true
      },
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
      {
        label: 'All Ministries Overview',
        href: '/ministries',
        icon: LayoutDashboard,
        isFullWidthLink: true
      },
      { label: 'Adolescent & Singles Club', href: '/ministries/adolescent-singles-club', icon: Users },
      { label: 'School Outreaches', href: '/ministries/school-outreaches', icon: School },
      { label: 'Counseling Services', href: '/programs/counseling-family-support', icon: HeartHandshake },
      { label: 'Family Life Seminars', href: '/ministries/family-life-seminars', icon: CalendarDays },
      { label: 'Marriage Forum', href: '/programs/counseling-family-support', icon: Users2 }, // Points to main counseling page
      { label: 'Discipleship Classes', href: '/programs/faith-growth', icon: BookOpen },
      // "Community Outreach" was removed as per user request
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
  // "Visit" item removed as per user request
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
    return () => {
      Object.values(menuTimers.current).forEach(clearTimeout);
    };
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
      setIsTransparent(window.scrollY <= 50); // Initial check
      window.addEventListener('scroll', handleScroll, { passive: true });
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
    Object.keys(menuTimers.current).forEach(timerId => {
      if (menuTimers.current[timerId]) { // Check if timer exists before clearing
        clearTimeout(menuTimers.current[timerId]);
        delete menuTimers.current[timerId];
      }
    });
    setActiveMenu(menuId);
  };

  const handleMenuLeave = (menuId: string) => {
    menuTimers.current[menuId] = setTimeout(() => {
      if (activeMenu === menuId) {
        setActiveMenu(null);
      }
      delete menuTimers.current[menuId];
    }, 200);
  };
  

  const currentHeaderIsTransparent = isTransparent && hasMounted && pathname === '/';

  const headerClasses = cn(
    "sticky top-0 z-50 w-full border-b transition-colors duration-300 ease-in-out",
    currentHeaderIsTransparent
      ? "bg-transparent border-transparent"
      : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
  );

  const getLinkStyles = (isHeaderTransparent: boolean) => ({
    logoColor: cn(isHeaderTransparent ? "text-white" : "text-primary"),
    linkTextColor: cn(isHeaderTransparent ? "text-white hover:text-white/80" : "text-foreground/80 hover:text-primary"),
    iconColor: cn(isHeaderTransparent ? "text-white" : "text-foreground/70"),
    dropdownButtonHoverBg: cn(isHeaderTransparent ? "hover:bg-white/10" : "hover:bg-accent/50"),
    chevronColor: cn(isHeaderTransparent ? "text-white/70" : "text-foreground/70"),
  });

  const linkStyles = getLinkStyles(currentHeaderIsTransparent);


  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className={cn("text-2xl font-bold font-headline", linkStyles.logoColor)}>
          Family Tent Ministry
        </Link>

        <nav className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => (
            <React.Fragment key={item.id}>
            {item.isDropdown || item.isMegaMenu ? (
              <DropdownMenu open={activeMenu === item.id} onOpenChange={(isOpen) => !isOpen && setActiveMenu(null)}>
                <DropdownMenuTrigger asChild
                  onPointerEnter={() => handleMenuEnter(item.id)}
                  onPointerLeave={() => handleMenuLeave(item.id)}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center space-x-1 px-3 py-2 h-auto",
                      linkStyles.linkTextColor,
                      linkStyles.dropdownButtonHoverBg
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={cn("h-4 w-4 opacity-70", linkStyles.chevronColor)} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="center" // Default to center, can be overridden
                    className={cn(
                      "mt-1 p-6 bg-background shadow-xl rounded-lg",
                       // Consistent width for all mega menus
                      (item.isMegaMenu) ? "w-[600px] md:w-[700px] lg:w-[800px]" : "w-auto", // Standard width for simple dropdowns
                      item.id === 'visit' ? "min-w-[220px]" : "" // Specific min-width for Visit if it was simple
                    )}
                    onPointerEnter={() => handleMenuEnter(item.id)}
                    onPointerLeave={() => handleMenuLeave(item.id)}
                  >
                    {/* Mega Menu Header Link */}
                    {item.isMegaMenu && item.megaMenuItems?.find(sub => sub.isFullWidthLink && (sub.category === 'MEGA_HEADER' || !sub.category)) && (
                       item.megaMenuItems.filter(sub => sub.isFullWidthLink && (sub.category === 'MEGA_HEADER' || !sub.category)).map(subItem => (
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

                    {/* Specific Mega Menu Grids */}
                    {(item.id === 'about' || item.id === 'ministries') && (
                      <div className={cn(
                        "grid gap-x-6 gap-y-4",
                        item.id === 'about' ? "grid-cols-3" : "grid-cols-2" // 3 cols for About, 2 for Ministries
                      )}>
                        {item.megaMenuItems!.filter(sub => !sub.isFullWidthLink).map((subItem) => (
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
                     {/* Simple Dropdown Items (e.g. for a restored Visit if needed) */}
                    {item.isDropdown && item.subItems && (
                      <div className="py-1"> {/* Added padding for simple dropdown content area */}
                        {item.href && ( // Optional: if the main dropdown trigger is also a link
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
                      </div>
                    )}
                  </DropdownMenuContent>
              </DropdownMenu>
              ) : item.href ? ( // Direct links like Events, Give
                <Button
                  key={item.id}
                  asChild
                  variant="ghost"
                  className={cn(
                    "flex items-center space-x-1 px-3 py-2 h-auto",
                    linkStyles.linkTextColor,
                    linkStyles.dropdownButtonHoverBg
                  )}
                  onClick={() => setActiveMenu(null)} 
                >
                  <Link href={item.href}>
                    {item.icon && <item.icon className={cn("h-5 w-5", linkStyles.iconColor)} />}
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ) : null }
            </React.Fragment>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className={cn(linkStyles.iconColor, linkStyles.dropdownButtonHoverBg, "hover:text-primary")}
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
              <Button variant="ghost" size="icon" aria-label="Open menu" className={cn(linkStyles.iconColor, linkStyles.dropdownButtonHoverBg)}>
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
                  // Determine items to display in accordion (mega or simple dropdown)
                  const itemsToDisplayInAccordion = item.isMegaMenu 
                    ? item.megaMenuItems?.filter(mItem => !mItem.isFullWidthLink) 
                    : item.subItems;

                  if (item.isDropdown || item.isMegaMenu) {
                    return (
                      <Accordion key={item.id} type="single" collapsible className="w-full">
                        <AccordionItem value={item.id} className="border-b-0">
                          <AccordionTrigger
                            className="text-lg font-medium text-foreground/80 hover:text-primary hover:no-underline py-3 px-0 data-[state=open]:text-primary [&[data-state=open]>svg]:text-primary"
                          >
                            <span>{item.label}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-0 pl-4">
                            <nav className="flex flex-col space-y-2 mt-1">
                               {/* Top-level link for mega menu */}
                              {item.isMegaMenu && item.megaMenuItems?.find(m => m.isFullWidthLink) && (
                                <NavLink href={item.megaMenuItems.find(m => m.isFullWidthLink)!.href} icon={item.megaMenuItems.find(m => m.isFullWidthLink)!.icon} onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold py-1 hover:text-primary">
                                  {item.megaMenuItems.find(m => m.isFullWidthLink)!.label}
                                </NavLink>
                              )}
                               {/* Link for simple dropdown's main href, if it exists */}
                              {item.isDropdown && item.href && (
                                <NavLink href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold py-1 hover:text-primary">
                                  All {item.label}
                                </NavLink>
                              )}
                              {/* Sub-items for both mega and simple dropdowns */}
                              {itemsToDisplayInAccordion?.map(subItem => (
                                 <NavLink key={subItem.href} href={subItem.href} icon={subItem.icon} onClick={() => setMobileMenuOpen(false)} className="text-base py-1 hover:text-primary">
                                  {item.id === 'resources' && subItem.category && !subItem.isFullWidthLink && <span className="text-xs uppercase text-muted-foreground mr-1">{subItem.category}:</span>}
                                  {subItem.label}
                                </NavLink>
                              ))}
                            </nav>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  // Direct links in mobile menu
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
