import type {Metadata} from 'next';
import { Inter, Alegreya, Caveat } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppLayout from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import { LayoutProvider } from '@/contexts/layout-context;
import { PastoralAssistant } from '@/components/shared/pastoral-assistant';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const alegreya = Alegreya({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-alegreya' });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-caveat' });


// export const metadata: Metadata = {
//   title: 'Family Tent Ministry',
//   description: 'Family Tent Ministry - Taking the gospel of our Lord Jesus Christ to all people groups in Kenya and beyond.',
// };


function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", inter.variable, alegreya.variable, caveat.variable)}>
        <AppLayout>
        <LayoutProvider>
          <div className="relative">
            {children}
            <ClientOnly>
                <PastoralAssistant />
            </ClientOnly>
          </div>
        </LayoutProvider>
        </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
