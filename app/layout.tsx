import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/layout/LenisProvider";
import QuantumCursor from "@/components/ui/QuantumCursor";
import NeuralMesh from "@/components/ui/NeuralMesh";
import LoadingScreen from "@/components/ui/LoadingScreen";
import FloatingActions from "@/components/ui/FloatingActions";
import ScrollToTop from "@/components/layout/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuuhaven | Building Businesses That Look As Professional As They Operate",
  description:
    "Nuuhaven is a strategic partner helping businesses establish professional brand identities, digital platforms, business documentation and marketing assets that strengthen credibility and support long-term growth.",
  keywords: ["brand development", "website design", "business documentation", "marketing assets", "South Africa"],
  openGraph: {
    title: "Nuuhaven | Your Digital Haven For Business",
    description: "Strategic brand, digital presence & business transformation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        <NeuralMesh />
        <QuantumCursor />
        <LenisProvider>
          <ScrollToTop />
          <Nav />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </LenisProvider>
        <FloatingActions />
      </body>
    </html>
  );
}
