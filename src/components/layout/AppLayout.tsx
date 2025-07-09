
'use client';

import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={cn("flex-grow", !isHomePage && "pt-20")}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
