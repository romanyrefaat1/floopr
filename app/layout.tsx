import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react"
import {ClerkProvider} from '@clerk/nextjs'
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "floopr",
  description: "Scale your startup wit feedback: Collect, manae and anlayze feedback effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>{children}</ClerkProvider>
        <Toaster position="top-right" />
        {/* <Analytics /> */}
      </ThemeProvider>
      <script 
  src="../packages/floopr-feedback/modal-timeout/dist/FlooprFeedbackModalTimeout.js" 
  data-api-key="your-key"
  data-product-id="your-product"
  data-component-id="your-component"
></script>
      </body>
    </html>
  );
}
