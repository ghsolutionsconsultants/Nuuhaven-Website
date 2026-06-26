import { Suspense } from "react";
import ImpressionsAudit from "@/components/tools/ImpressionsAudit";

export const metadata = {
  title: "First Impressions Audit | Nuuhaven",
  description: "See how potential clients perceive your business on first contact, and exactly what it's costing you.",
};

export default function ImpressionsAuditPage() {
  return (
    <Suspense>
      <ImpressionsAudit />
    </Suspense>
  );
}
