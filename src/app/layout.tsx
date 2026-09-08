import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "IDA Product Strategy Workshop",
  description: "60-minute core team alignment — unlisted team workspace.",
  robots: { index: false, follow: false },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-page text-ink`}
      >
        {children}
      </body>
    </html>
  )
}
