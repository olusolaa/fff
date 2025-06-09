
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-20">{/* Added pt-20 for fixed header */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
