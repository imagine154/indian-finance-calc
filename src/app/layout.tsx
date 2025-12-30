import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { InstallPrompt } from "@/components/layout/InstallPrompt";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rupeetools.in'),
  alternates: {
    canonical: '/',
  },
  title: 'RupeeTools - Indian Finance Calculators (Tax, SIP, Salary)',
  description: 'Free, accurate financial tools for Indians. Calculate Income Tax (FY 2025-26), Home Loan Pre-payment, SIP Returns, and Retirement Corpus.',
  icons: {
    icon: '/favicon-brand.svg',
    shortcut: '/favicon-brand.svg',
    apple: '/favicon-brand.svg',
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RupeeTools",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <ChatWidget />
        <InstallPrompt />
        <Analytics />
      </body>
    </html>
  );
}
