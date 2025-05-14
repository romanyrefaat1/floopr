import { Providers } from "@/src/components/providers";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Floopr - Make Customer Feedback Actionable",
  description:
    "Collect, organize, and prioritize customer feedback all in one place. Help your team build what users really want.",
  icons: [
    {
      rel: "icon",
      url: "/floopr-logo-no-bg-white-svg.svg",
      media: "(prefers-color-scheme: dark)",
    },
    {
      rel: "icon",
      url: "/floopr-logo-no-bg-svg.svg",
      media: "(prefers-color-scheme: light)",
    },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "Soz3RCl8C5vBfVKghak8-FkRHzWkmfY4iskV3VSd_hg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-floopr min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
