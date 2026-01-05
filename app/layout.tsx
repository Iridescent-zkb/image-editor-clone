import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"


export const metadata: Metadata = {
  title: "BananaEdit - AI-Powered Image Editor",
  description: "Transform images with AI. Fast, powerful, and easy to use image editing with natural language.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* Use Tailwind's font-sans (configured in globals.css) to avoid network fetch for Google Fonts */}
      <body className={"font-sans antialiased"}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
