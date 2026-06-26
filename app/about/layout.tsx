import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nuuhaven | Strategic Brand & Digital Partner",
  description: "Meet Tshepang Ramatsoma, founder of Nuuhaven. Big 4 advisory background meets creative execution — strategy-led branding, digital presence, and business transformation based in Johannesburg.",
  keywords: ["Nuuhaven founder", "Tshepang Ramatsoma", "brand strategy South Africa", "digital transformation Johannesburg"],
  openGraph: {
    title: "About Nuuhaven | Strategic Brand & Digital Partner",
    description: "Big 4 advisory background meets creative execution. Meet the founder behind Nuuhaven.",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
