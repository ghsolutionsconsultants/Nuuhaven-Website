import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Nuuhaven Portfolio & Command Centre",
  description: "Explore the client ecosystems we've built — websites, brand identities, company profiles, and digital platforms for businesses across South Africa. 10+ clients, 98% satisfaction.",
  keywords: ["Nuuhaven portfolio", "brand design South Africa", "website design Johannesburg", "digital agency work"],
  openGraph: {
    title: "Our Work | Nuuhaven Portfolio",
    description: "10+ client ecosystems built — websites, brands, documentation and digital platforms.",
    type: "website",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
