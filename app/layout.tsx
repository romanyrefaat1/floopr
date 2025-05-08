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
        {/* <FloatingFeedbackButton
          isModal={false}
          backgroundColor="#ffffff"
          padding="lg"
          borderRadius="lg"
          isSecondSectionColorLikeFeatureType={false}
          componentId={`not_yet_implemented`}
          productId={`31a4fd3d-615a-409c-97ee-bda48bbbb8e2`}
        /> */}
        <script
          src="http://localhost:3000/embeds/float-button-bundle_floopr_feedback_embed.js"
          data-api-key="733ecbf8-583d-4641-8389-1eb99818543e"
          data-product-id="007d6bf1-37b1-4119-b786-e3c47a574aa7"
          data-component-id="ab3cfe6a-98b1-4742-8e85-b1a3ab763039"
          data-user-info='{"userId": "user_123", "userName": "Alice", "userImage": "https://example.com/avatar.jpg"}'
          defer
        ></script>
      </body>
    </html>
  );
}
