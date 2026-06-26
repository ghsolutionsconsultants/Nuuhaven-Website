import type { Metadata } from "next";
import CostEstimator from "@/components/tools/CostEstimator";

export const metadata: Metadata = {
  title: "Project Cost Estimator | Nuuhaven",
  description: "Build your project scope and get an instant investment range. Select from websites, brand identity, company profiles, marketing assets and more. No commitment required.",
  keywords: ["website cost South Africa", "brand design price", "project cost estimator", "digital agency pricing Johannesburg"],
  openGraph: {
    title: "Project Cost Estimator | Nuuhaven",
    description: "Configure your project scope and see your investment range update in real time. Free, no commitment.",
    type: "website",
  },
};

export default function EstimatorPage() {
  return <CostEstimator />;
}
