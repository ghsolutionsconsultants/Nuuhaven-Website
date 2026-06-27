import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Nuuhaven | Your Digital Haven For Business",
  description: "Nuuhaven helps South African businesses establish professional brand identities, websites, company profiles, and marketing assets. 10+ clients, 98% satisfaction. Based in Johannesburg.",
  keywords: [
    "brand development South Africa",
    "website design Johannesburg",
    "company profile design",
    "digital agency South Africa",
    "business branding Johannesburg",
    "marketing assets",
    "business documentation",
    "brand identity South Africa",
    "digital presence",
    "Nuuhaven",
  ],
  authors: [{ name: "Nuuhaven" }],
  creator: "Nuuhaven",
  metadataBase: new URL("https://nuuhaven.com"),
  alternates: { canonical: "https://nuuhaven.com" },
  openGraph: {
    title: "Nuuhaven | Your Digital Haven For Business",
    description: "10+ South African businesses transformed. Professional brand identities, websites, and digital assets that build real credibility.",
    type: "website",
    url: "https://nuuhaven.com",
    siteName: "Nuuhaven",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuuhaven | Your Digital Haven For Business",
    description: "Professional brand identities, websites, and digital assets for South African businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NXCMVN41T3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NXCMVN41T3');
          `}
        </Script>
      </head>
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
