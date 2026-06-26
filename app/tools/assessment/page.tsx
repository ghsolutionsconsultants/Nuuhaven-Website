import { Suspense } from "react";
import BusinessAssessment from "@/components/tools/BusinessAssessment";

export default function AssessmentPage() {
  return (
    <Suspense>
      <BusinessAssessment />
    </Suspense>
  );
}
