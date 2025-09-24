import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { AuthProvider } from "@/components/auth-provider"

export const metadata: Metadata = {
  title: "AapdaPrep - Digital Disaster Education Platform",
  description: "Comprehensive disaster preparedness and education platform for schools and colleges in India",
  generator: "v0.app",
}

const geistSans = Inter({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
