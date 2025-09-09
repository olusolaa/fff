
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, Search, X, ChevronDown, Video, Newspaper,
  BookMarked, Church, Disc3, Mic2, Library, Users, HeartHandshake,
  BookOpen, ShieldCheck, Users2, HandHeart, CalendarDays, Gift, LayoutDashboard, School, Info, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavLink from './NavLink';
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
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
  category?: string; // Used in Resources mega menu & Programs
  description?: string; // No longer used in Programs mega menu directly
  isFullWidthLink?: boolean; // For top links in mega menus
}

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  megaMenuItems?: NavSubItem[];
  isMegaMenu?: boolean;
}

const navItems: NavItem[] = [
  {
    id: 'about',
    label: 'About',
    href: '/about',
    isMegaMenu: true,
    megaMenuItems: [
      { label: 'Learn More About Us', href: '/about', icon: Info, isFullWidthLink: true },
      { label: 'Our Story', href: '/about/history', icon: BookOpen, category: 'ABOUT' },
      { label: 'Our Beliefs', href: '/about/beliefs', icon: ShieldCheck, category: 'ABOUT' },
      { label: 'Our Team', href: '/about/leadership', icon: Users2, category: 'ABOUT' },
    ],
  },
  {
    id: 'connect',
    label: 'Connect',
    isMegaMenu: true,
    href: '/connect/groups', // Main landing for connect
    megaMenuItems: [
        { label: 'Connect in a Group', href: '/connect/groups', icon: Users, isFullWidthLink: true },
        { label: 'Serve Our City', href: '/connect/serve', icon: HandHeart, category: 'CONNECT'},
        { label: 'Missions', href: '/connect/missions', icon: HeartHandshake, category: 'CONNECT'},
    ]
  },
  {
    id: 'programs',
    label: 'Programs',
    href: '/programs',
    isMegaMenu: true,
    megaMenuItems: [
        { label: 'All Programs Overview', href: '/programs', icon: LayoutDashboard, isFullWidthLink: true },
        { label: 'Adolescent & Singles Club', href: '/programs/youth', icon: Users, category: 'PROGRAMS'},
        // { label: 'School Outreaches', href: '/programs/school-outreaches', icon: School, category: 'PROGRAMS' },
        // { label: 'Counseling Services', href: '/programs/counseling-family-support', icon: HeartHandshake, category: 'PROGRAMS' },
        // { label: 'Family Life Seminars', href: '/programs/family-life-seminars', icon: CalendarDays, category: 'PROGRAMS' },
        { label: 'Marriage Forum', href: '/programs/marriage', icon: Users2, category: 'PROGRAMS' }, // Points to category page
        // { label: 'Discipleship Classes', href: '/programs/faith-growth', icon: BookOpen, category: 'PROGRAMS' }, // Points to category page
      ]
    },
    {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
    isMegaMenu: true,
    megaMenuItems: [
      { label: 'Explore All Resources', href: '/resources', icon: LayoutDashboard, isFullWidthLink: true },
      { category: 'LISTEN', label: 'Sermons', href: '/archive', icon: Church },
      // { category: 'WATCH', label: 'Videos', href: '/resources/videos', icon: Video },
      // { category: 'LISTEN', label: 'Music', href: '/resources/music', icon: Disc3 },
      { category: 'LISTEN', label: 'Podcasts', href: '/resources/podcasts', icon: Mic2 },
      { category: 'READ', label: 'Articles', href: '/blogs', icon: Newspaper },
      // { category: 'READ', label: 'Study Guides', href: '/resources/guides', icon: Library },
      { category: 'READ', label: 'Books', href: '/resources/books', icon: BookMarked },
      { category: 'BIBLE', label: 'Bible', href: '/bible', icon: BookOpen },
    ]
  },
  {
    id: 'events',
    label: 'Events',
    href: '/events',
    icon: CalendarDays,
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
      setIsTransparent(window.scrollY <= 50);
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
      if (menuTimers.current[timerId] && timerId !== menuId) { // Clear timers for OTHER menus
        clearTimeout(menuTimers.current[timerId]);
        delete menuTimers.current[timerId];
      }
    });
    if (menuTimers.current[menuId]) { // Clear timer for THIS menu if re-entering quickly
      clearTimeout(menuTimers.current[menuId]);
      delete menuTimers.current[menuId];
    }
    setActiveMenu(menuId);
  };

  const handleMenuLeave = (menuId: string) => {
    if (menuTimers.current[menuId]) {
      clearTimeout(menuTimers.current[menuId]);
      delete menuTimers.current[menuId];
    }
    menuTimers.current[menuId] = setTimeout(() => {
      if (activeMenu === menuId) {
        setActiveMenu(null);
      }
      delete menuTimers.current[menuId]; // Clean up the timer after execution or if cleared
    }, 200);
  };

  const currentHeaderIsTransparent = isTransparent && hasMounted && pathname === '/';
  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 w-full border-b transition-colors duration-300 ease-in-out",
    currentHeaderIsTransparent
      ? "bg-transparent border-transparent"
      : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
  );

  const getLinkStyles = (isHeaderTransparent: boolean) => ({
    logoColor: cn(isHeaderTransparent ? "text-white" : "text-primary"),
    linkTextColor: cn(isHeaderTransparent ? "text-white hover:text-white/80" : "text-foreground/80 hover:text-primary"),
    iconColor: cn(isHeaderTransparent ? "text-white/90 hover:text-white" : "text-foreground/70 hover:text-primary"),
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
            {item.isMegaMenu ? (
              <DropdownMenu open={activeMenu === item.id} onOpenChange={(isOpen) => !isOpen && setActiveMenu(null)}>
                <DropdownMenuTrigger asChild
                  onPointerEnter={() => handleMenuEnter(item.id)}
                  onPointerLeave={() => handleMenuLeave(item.id)}
                >
                  <Button
                    asChild // Ensures Button passes props to Link
                    variant="ghost"
                    className={cn(
                      "flex items-center space-x-1 px-3 py-2 h-auto",
                      linkStyles.linkTextColor,
                      linkStyles.dropdownButtonHoverBg
                    )}
                  >
                    <Link href={item.href || '#'}>
                      <span>{item.label}</span>
                      <ChevronDown className={cn("h-4 w-4 opacity-70", linkStyles.chevronColor)} />
                    </Link>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="center"
                    sideOffset={5}
                    className={cn(
                      "p-6 bg-background/95 backdrop-blur-md shadow-lg rounded-lg w-[600px] md:w-[700px] lg:w-[800px] border border-border/50 animate-in fade-in-0 slide-in-from-top-2 duration-300"
                    )}
                    onPointerEnter={() => handleMenuEnter(item.id)}
                    onPointerLeave={() => handleMenuLeave(item.id)}
                  >
                    {item.megaMenuItems?.find(sub => sub.isFullWidthLink) && (
                       item.megaMenuItems.filter(sub => sub.isFullWidthLink).map(subItem => (
                        <div key={`${subItem.label}-header`} className="mb-6 pb-4 border-b border-border/30">
                            <Link
                                href={subItem.href!}
                                className="font-semibold text-xl text-primary hover:text-accent transition-colors flex items-center space-x-3 group"
                                onClick={() => setActiveMenu(null)}
                            >
                                {subItem.icon && <subItem.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />}
                                <span>{subItem.label}</span>
                                <ArrowRight className="h-5 w-5 text-primary/50 group-hover:text-accent group-hover:translate-x-1 transition-all ml-auto" />
                            </Link>
                        </div>
                       ))
                    )}

                    {item.id === 'about' && (
                      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                        {item.megaMenuItems!.filter(sub => !sub.isFullWidthLink).map((subItem) => (
                           <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-all duration-200"
                              onClick={() => setActiveMenu(null)}
                            >
                              {subItem.icon && <subItem.icon className="h-6 w-6 text-accent group-hover:text-primary flex-shrink-0 transition-colors" />}
                              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{subItem.label}</p>
                            </Link>
                        ))}
                      </div>
                    )}
                    
                    {(item.id === 'programs' || item.id === 'connect') && (
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                            {item.megaMenuItems!.filter(sub => !sub.isFullWidthLink).map((subItem) => (
                                <Link
                                    key={subItem.label}
                                    href={subItem.href}
                                    className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-all duration-200"
                                    onClick={() => setActiveMenu(null)}
                                >
                                    {subItem.icon && <subItem.icon className="h-6 w-6 text-accent group-hover:text-primary flex-shrink-0 transition-colors" />}
                                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{subItem.label}</p>
                                </Link>
                            ))}
                        </div>
                    )}

                    {item.id === 'resources' && (
                      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                        {(['BIBLE', 'LISTEN', 'READ'] as const).map(category => (
                          <div key={category} className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">{category}</h3>
                            <div className="space-y-3">
                              {item.megaMenuItems!.filter(sub => sub.category === category && !sub.isFullWidthLink).map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-all duration-200"
                                  onClick={() => setActiveMenu(null)}
                                >
                                  {subItem.icon && <subItem.icon className="h-6 w-6 text-accent group-hover:text-primary flex-shrink-0 transition-colors" />}
                                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{subItem.label}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </DropdownMenuContent>
              </DropdownMenu>
              ) : item.href ? (
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
    <Button
      variant="ghost"
      size="icon"
      aria-label="Open menu"
      className={cn(linkStyles.iconColor, linkStyles.dropdownButtonHoverBg)}
    >
      <Menu className="h-6 w-6" />
    </Button>
  </SheetTrigger>

  <SheetContent
    side="right"
    className="w-full max-w-xs bg-background p-6 overflow-y-auto"
  >
    {/* Header */}
    <div className="mb-8 flex items-center justify-between">
      <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
      <Link
        href="/"
        className="text-xl font-bold font-headline text-primary"
        onClick={() => setMobileMenuOpen(false)}
      >
        Family Tent Ministry
      </Link>
      <SheetClose asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </SheetClose>
    </div>

    {/* Navigation */}
    <nav className="flex flex-col space-y-2">
      <Accordion type="single" collapsible className="w-full">
        {navItems.map((item) => {
          const itemsToDisplayInAccordion =
            item.megaMenuItems?.filter((mItem) => !mItem.isFullWidthLink);

          if (item.isMegaMenu && itemsToDisplayInAccordion?.length > 0) {
            return (
              <AccordionItem key={item.id} value={item.id} className="border-b-0">
                <AccordionTrigger
                  className="flex items-center gap-3 justify-start text-lg font-medium text-foreground hover:text-primary hover:no-underline py-3 px-0 data-[state=open]:text-primary [&[data-state=open]>svg]:text-primary"
                >
                  {item.icon && (
                    <item.icon className="h-6 w-6 text-muted-foreground" />
                  )}
                  <span>{item.label}</span>
                </AccordionTrigger>

                <AccordionContent className="pt-1 pb-0 pl-4">
                  <nav className="flex flex-col space-y-2 mt-1">
                    {(() => {
                      const fullWidthLink = item.megaMenuItems?.find(
                        (m) => m.isFullWidthLink
                      );
                      if (!fullWidthLink) return null;

                      const IconComponent = fullWidthLink.icon;

                      return (
                        <NavLink
                          href={fullWidthLink.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 justify-start text-base font-semibold py-2 hover:text-primary"
                        >
                          {IconComponent && (
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span>{fullWidthLink.label}</span>
                        </NavLink>
                      );
                    })()}

                    {item.id === "resources" ? (
                      (["BIBLE", "LISTEN", "READ"] as const).map((category) => (
                        <React.Fragment key={category}>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mt-2 mb-1">
                            {category}
                          </h4>
                          {item.megaMenuItems!
                            .filter(
                              (sub) =>
                                sub.category === category && !sub.isFullWidthLink
                            )
                            .map((subItem) => (
                              <NavLink
                                key={subItem.label}
                                href={subItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 justify-start text-base py-2 hover:text-primary"
                              >
                                {subItem.icon && (
                                  <subItem.icon className="h-5 w-5 text-muted-foreground" />
                                )}
                                <span>{subItem.label}</span>
                              </NavLink>
                            ))}
                        </React.Fragment>
                      ))
                    ) : (
                      itemsToDisplayInAccordion?.map((subItem) => (
                        <NavLink
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 justify-start text-base py-2 hover:text-primary"
                        >
                          {subItem.icon && (
                            <subItem.icon className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span>{subItem.label}</span>
                        </NavLink>
                      ))
                    )}
                  </nav>
                </AccordionContent>
              </AccordionItem>
            );
          }

          return (
            <NavLink
              key={item.id}
              href={item.href!}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 justify-start text-lg font-medium py-3 px-0 text-foreground hover:text-primary"
            >
              {item.icon && (
                <item.icon className="h-6 w-6 text-muted-foreground" />
              )}
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </Accordion>

      {/* Search */}
      <Button
        asChild
        variant="ghost"
        className="flex items-center gap-3 justify-start w-full text-lg font-medium py-3 px-0 text-foreground hover:text-primary"
      >
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
          }}
        >
          <Search className="h-6 w-6 text-muted-foreground" />
          <span>Search</span>
        </Link>
      </Button>

      {/* CTA Button */}
      <Button
        asChild
        variant="default"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg mt-4"
        onClick={() => setMobileMenuOpen(false)}
      >
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
