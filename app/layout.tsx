
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@/styles/globals.css';

export const metadata = {
  title: 'Floopr - Collect and manage feedback effortlessly',
  description: 'The all-in-one platform to collect, organize, and act on user feedback. Join our waitlist today!',
  keywords: 'user feedback, product feedback, feedback management, customer feedback, feature requests',
  openGraph: {
    type: 'website',
    url: 'https://floopr.io/',
    title: 'Floopr - User Feedback Management Platform',
    description: 'The all-in-one platform to collect, organize, and act on user feedback',
    images: [
      {
        url: '/og-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floopr - User Feedback Management Platform',
    description: 'The all-in-one platform to collect, organize, and act on user feedback',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
