import { Providers } from "@/src/components/providers";
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });
// const font = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Floopr - Embed Feedback Widgets | AI‑Powered Analysis & Changelog",
  description:
    "Transform your product feedback into actionable insights with Floopr. Embed lightweight widgets, group responses with AI, track every change with per‑page changelogs, and iterate faster—no code bloat.",
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
      <body className={`${font.className} bg-gradient-floopr min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
