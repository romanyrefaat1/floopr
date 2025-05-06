import { Providers } from "@/src/components/providers";
import "./globals.css";
import FloatingFeedbackButton from "@/components/floopr-integration/float-button-circle/floating-feedback-button";
import { Inter } from "next/font/google";

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
      <body className={`${inter.className} bg-gradient-floopr min-h-screen`}>
        <Providers>{children}</Providers>
        <FloatingFeedbackButton
          isModal={false}
          backgroundColor="#ffffff"
          padding="lg"
          borderRadius="lg"
          isSecondSectionColorLikeFeatureType={false}
          componentId={`not_yet_implemented`}
          productId={`212faf6c-f3ff-4369-939f-e6715604804e`}
        />
      </body>
    </html>
  );
}
