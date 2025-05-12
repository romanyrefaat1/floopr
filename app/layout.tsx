import { Providers } from "@/src/components/providers";
import "./globals.css";
import FloatingFeedbackButton from "@/components/floopr-integration/float-button-circle/floating-feedback-button";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Floopr - Make User Feedback Actionable",
  description:
    "Collect, organize, and prioritize user feedback all in one place. Help your team build what users really want.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="Soz3RCl8C5vBfVKghak8-FkRHzWkmfY4iskV3VSd_hg"
        />
      </Head>
      <body className={`${inter.className} bg-gradient-floopr min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
