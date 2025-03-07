import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ModalProvider } from "@/contexts/modalContext"
import { ContentProvider } from "@/contexts/contentContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MainFocus - Focus with no distractions",
  description: "Track your focus, earn points, and compete with friends",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-primary text-text`}>
        <ContentProvider>
          <ModalProvider>{children}</ModalProvider>
        </ContentProvider>
      </body>
    </html>
  )
}

