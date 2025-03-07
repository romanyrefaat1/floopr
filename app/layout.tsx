import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react"
import {ClerkProvider} from '@clerk/nextjs'

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeaBoard",
  description: "Join the waitlist for DeaBoard - the modern idea management platform that helps you capture, organize, and develop your creative thoughts. Sign up now for early access to our intuitive workspace designed for thinkers and creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>{children}</ClerkProvider>
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
