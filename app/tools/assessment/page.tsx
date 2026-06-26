import type { Metadata } from "next";
import { Suspense } from "react";
import BusinessAssessment from "@/components/tools/BusinessAssessment";

export const metadata: Metadata = {
  title: "Business Presence Assessment | Nuuhaven",
  description: "Score your business across 5 areas — brand, digital, documentation, marketing, and strategy. 10 questions, instant results, and a ranked list of exactly what to fix first.",
  keywords: ["business brand assessment", "digital presence score", "business maturity check South Africa", "brand audit tool"],
  openGraph: {
    title: "Business Presence Assessment | Nuuhaven",
    description: "10 questions. Instant score. Find out exactly what's holding your business back.",
    type: "website",
  },
};

export default function AssessmentPage() {
  return (
    <Suspense>
      <BusinessAssessment />
    </Suspense>
  );
}
