import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "floopr",
  description:
    "Scale your startup wit feedback: Collect, manae and anlayze feedback effortlessly.",
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
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          >
            {children}
          </ClerkProvider>
          <Toaster position="top-right" />
        </ThemeProvider>

        <Script
          src="http://localhost:3000/embeds/modal-timeout-bundle_floopr_feedback_embed.js"
          strategy="afterInteractive"
          data-api-key="d9380457-dd5a-4d69-ac71-3d3978714c09"
          data-product-id="5238a5f1-0e92-40d7-b0ce-18bb8f74c0ee"
          data-component-id="16bfa298-2790-454e-af28-973189f7229e"
          data-user-info='{"userId": "123", "username": "john"}'
          data-api-base-url="https://localhost:3000"
        />
      </body>
    </html>
  );
}
