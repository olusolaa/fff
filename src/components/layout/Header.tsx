
"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Menu, Search, X, MapPin, ChevronDown, Video, Newspaper, 
  GraduationCap, BookMarked, Church, Disc3, Mic2, Library, Briefcase, Users, HeartHandshake 
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
  category?: string; // For mega menu
}

interface NavItem {
  id: string; // Unique ID for managing hover state
  label: string;
  href?: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  megaMenuItems?: NavSubItem[]; // For the new mega menu structure
  isDropdown?: boolean;
  isMegaMenu?: boolean; // Flag for mega menu
}

const navItems: NavItem[] = [
  {
    id: 'about',
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
    id: 'watch-listen-read',
    label: 'Watch | Listen | Read',
    href: '/resources',
    isMegaMenu: true, // Indicate this is a mega menu
    megaMenuItems: [
      { category: 'WATCH', label: 'Sermons', href: '/sermons', icon: Church },
      { category: 'WATCH', label: 'Videos', href: '/resources/videos', icon: Video },
      { category: 'LISTEN', label: 'Music', href: '/resources/music', icon: Disc3 },
      { category: 'LISTEN', label: 'Podcasts', href: '/resources/podcasts', icon: Mic2 },
      { category: 'READ', label: 'Articles', href: '/resources/blog', icon: Newspaper },
      { category: 'READ', label: 'Resources', href: '/resources/guides', icon: Library },
    ]
  },
  {
    id: 'visit',
    label: 'Visit',
    href: '/plan-visit', // Main link
    isDropdown: true, // Make Visit a dropdown
    subItems: [
        { label: 'Plan Your Visit', href: '/plan-visit'},
        { label: 'Locations', href: '/locations', icon: MapPin },
        // Potentially add "What to Expect", "Times & Directions" if those pages are created
    ]
  },
  {
    id: 'ministries',
    label: 'Ministries', // Renamed from Programs
    href: '/programs', // Main link to overview page
    isDropdown: true,
    subItems: [
      { label: 'Counseling & Family Support', href: '/programs/counseling-family-support', icon: HeartHandshake },
      { label: 'Youth & Student Empowerment', href: '/programs/youth-student-empowerment', icon: Users },
      { label: 'Faith & Growth', href: '/programs/faith-growth', icon: GraduationCap },
      { label: 'Community Outreach', href: '/programs/community-outreach', icon: Briefcase },
    ],
  },
  { id: 'initiatives', label: 'Initiatives', href: '#' }, // Placeholder
  { id: 'get-involved', label: 'Get Involved', href: '/give' }, // Pointing to give for now
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const handleScroll = () => {
      setIsTransparent(isHomePage && window.scrollY <= 50);
    };

    if (isHomePage) {
      handleScroll(); // Set initial state based on scroll
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsTransparent(false); // Not homepage, so header is solid
    }
  }, [hasMounted, isHomePage, pathname]);


  const handleMenuEnter = (menuId: string) => {
    if (menuTimers.current[menuId]) {
      clearTimeout(menuTimers.current[menuId]);
    }
    setActiveMenu(menuId);
  };

  const handleMenuLeave = (menuId: string) => {
    menuTimers.current[menuId] = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // Small delay to allow moving to content
  };


  const headerClasses = cn(
    "sticky top-0 z-50 w-full border-b transition-colors duration-300 ease-in-out",
    isTransparent && hasMounted
      ? "bg-transparent border-transparent"
      : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
  );

  const baseLinkClasses = "text-sm font-medium";
  const transparentLinkStyles = "text-white hover:text-white/80";
  const solidLinkStyles = "text-foreground/80 hover:text-primary";
  
  const getLinkClasses = () => {
    return cn(baseLinkClasses, isTransparent && hasMounted ? transparentLinkStyles : solidLinkStyles);
  };

  const getIconColor = () => {
    return isTransparent && hasMounted ? "text-white" : "text-foreground/70";
  };
  
  const getDropdownButtonHoverBg = () => {
     return isTransparent && hasMounted ? "hover:bg-white/10" : "hover:bg-accent/50";
  };

  const getChevronColor = () => {
    return isTransparent && hasMounted ? "text-white/70" : "text-foreground/70";
  };


  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className={cn("text-2xl font-bold font-headline", isTransparent && hasMounted ? "text-white" : "text-primary")}>
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
                    className={cn("flex items-center space-x-1 px-3 py-2 h-auto", getLinkClasses(), getDropdownButtonHoverBg())}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={cn("h-4 w-4 opacity-70", getChevronColor())} />
                  </Button>
                ) : (
                  <NavLink
                    href={item.href!}
                    icon={item.icon}
                    className={cn("px-3 py-2", getLinkClasses())}
                  >
                    {item.label}
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
                    className="mt-1 p-6 w-[600px] md:w-[700px] lg:w-[800px] bg-background shadow-xl rounded-lg" // Custom width and styling
                    onPointerEnter={() => handleMenuEnter(item.id)}
                    onPointerLeave={() => handleMenuLeave(item.id)}
                  >
                    <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                      {(['WATCH', 'LISTEN', 'READ'] as const).map(category => (
                        <div key={category} className="space-y-3">
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{category}</h3>
                          <div className="space-y-2">
                            {item.megaMenuItems!.filter(sub => sub.category === category).map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="group flex items-start space-x-3 p-2 rounded-md hover:bg-accent transition-colors"
                                onClick={() => setActiveMenu(null)}
                              >
                                {subItem.icon && <subItem.icon className="h-6 w-6 text-accent group-hover:text-primary mt-1 flex-shrink-0" />}
                                <div>
                                  <p className="text-sm font-medium text-foreground group-hover:text-primary">{subItem.label}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
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
            className={cn(getIconColor(), getDropdownButtonHoverBg())}
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
              <Button variant="ghost" size="icon" aria-label="Open menu" className={cn(getIconColor(), getDropdownButtonHoverBg())}>
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
                    const itemsToDisplay = item.isMegaMenu ? item.megaMenuItems : item.subItems;
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
                              {itemsToDisplay!.map((subItem) => (
                                <NavLink key={subItem.href} href={subItem.href} icon={subItem.icon} onClick={() => setMobileMenuOpen(false)} className="text-base py-1">
                                  {subItem.category && <span className="text-xs uppercase text-muted-foreground mr-1">{subItem.category}:</span>}
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
