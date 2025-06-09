
"use client";

import Link from 'next/link';
import { useState } from 'react';
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

interface NavSubItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface NavItem {
  label: string;
  href?: string; // Main link for the category or direct link
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold font-headline text-primary">
          Family Tent Ministry
        </Link>

        <nav className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => {
            if (item.isDropdown && item.subItems) {
              return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 px-3 py-2 h-auto text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:bg-accent">
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
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
              <NavLink key={item.href} href={item.href!} icon={item.icon} className="px-3 py-2">
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/new">I'm New</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
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
                            {/* The trigger itself is not a link to prevent issues with accordion */}
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
