import type { Metadata } from "next";
import SolutionFinder from "@/components/tools/SolutionFinder";

export const metadata: Metadata = {
  title: "Solution Finder | Find Your Perfect Package | Nuuhaven",
  description: "Answer 8 questions about your business and get a tailored package recommendation — Foundation, Growth, or Transformation. Discover exactly what your business needs next.",
  keywords: ["brand package South Africa", "business solution finder", "digital package recommendation", "what does my business need"],
  openGraph: {
    title: "Solution Finder | Nuuhaven",
    description: "8 questions. A personalised recommendation. Find out exactly what your business needs.",
    type: "website",
  },
};

export default function SolutionFinderPage() {
  return <SolutionFinder />;
}
