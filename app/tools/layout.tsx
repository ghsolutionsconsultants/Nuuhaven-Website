import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Business Tools | Nuuhaven",
  description: "Free diagnostic tools for South African businesses — score your brand presence, audit your first impressions, find your ideal solution, and estimate your project investment. No signup required.",
  keywords: ["free business tools", "brand assessment", "business maturity score", "project cost estimator South Africa"],
  openGraph: {
    title: "Free Business Intelligence Tools | Nuuhaven",
    description: "4 free tools to assess, diagnose, and plan your business presence. No signup. Results in minutes.",
    type: "website",
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
