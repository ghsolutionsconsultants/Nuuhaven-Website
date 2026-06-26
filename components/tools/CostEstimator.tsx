"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HolographicCard from "@/components/ui/HolographicCard";
import ToolContactForm from "@/components/tools/ToolContactForm";

interface Service {
  id: string;
  label: string;
  subLabel?: string;
  baseMin: number;
  baseMax: number;
  durationWeeks: number;
  complexity: number;
}

const SERVICES: Service[] = [
  { id: "landing", label: "Landing Page Website", subLabel: "Single page, conversion-focused", baseMin: 1000, baseMax: 2000, durationWeeks: 1, complexity: 1 },
  { id: "basic", label: "Basic Customised Website", subLabel: "3–5 pages, custom design", baseMin: 2500, baseMax: 4000, durationWeeks: 2, complexity: 1 },
  { id: "multi", label: "Professional Website", subLabel: "5–8 pages, full corporate site", baseMin: 5000, baseMax: 8000, durationWeeks: 3, complexity: 2 },
  { id: "enterprise", label: "Enterprise Website", subLabel: "10+ pages, advanced functionality", baseMin: 10000, baseMax: 20000, durationWeeks: 6, complexity: 3 },
  { id: "brand-basic", label: "Brand Identity", subLabel: "Logo, colours, typography", baseMin: 2000, baseMax: 4000, durationWeeks: 1, complexity: 1 },
  { id: "brand-premium", label: "Premium Brand Identity", subLabel: "Full brand standards + guidelines", baseMin: 5000, baseMax: 10000, durationWeeks: 2, complexity: 2 },
  { id: "profile-std", label: "Company Profile", subLabel: "Standard (8–12 pages)", baseMin: 1500, baseMax: 3000, durationWeeks: 1, complexity: 1 },
  { id: "profile-prem", label: "Premium Company Profile", subLabel: "Executive (16–24 pages)", baseMin: 3000, baseMax: 6000, durationWeeks: 2, complexity: 2 },
  { id: "social", label: "Social Media Setup", subLabel: "Profile setup & optimisation (3 platforms)", baseMin: 1000, baseMax: 2500, durationWeeks: 1, complexity: 1 },
  { id: "marketing", label: "Marketing Assets Pack", subLabel: "Collateral, banners, templates", baseMin: 1500, baseMax: 4000, durationWeeks: 1, complexity: 1 },
  { id: "docs", label: "Business Documentation", subLabel: "Proposals, presentations, templates", baseMin: 1000, baseMax: 2500, durationWeeks: 1, complexity: 1 },
  { id: "retainer", label: "Monthly Retainer", subLabel: "Ongoing updates & brand management", baseMin: 1000, baseMax: 3000, durationWeeks: 4, complexity: 1 },
  { id: "advisory", label: "Strategic Advisory", subLabel: "1-on-1 strategy sessions & commercial roadmap", baseMin: 2000, baseMax: 8000, durationWeeks: 2, complexity: 2 },
];

const COMPLEXITY_LABELS = ["", "Starter", "Professional", "Premium", "Enterprise"];
const COMPLEXITY_COLORS = ["", "#a0a0a0", "var(--accent)", "#ff9500", "#ff4444"];

function formatZAR(n: number) {
  return `R ${n.toLocaleString("en-ZA")}`;
}

export default function CostEstimator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedServices = SERVICES.filter((s) => selected.has(s.id));

  const { totalMin, totalMax, totalWeeks, complexityLevel } = useMemo(() => {
    if (selectedServices.length === 0)
      return { totalMin: 0, totalMax: 0, totalWeeks: 0, complexityLevel: 0 };

    const totalMin = selectedServices.reduce((s, x) => s + x.baseMin, 0);
    const totalMax = selectedServices.reduce((s, x) => s + x.baseMax, 0);
    const totalWeeks = Math.ceil(
      selectedServices.reduce((s, x) => s + x.durationWeeks * 0.6, 0)
    );
    const avgComplexity = selectedServices.reduce((s, x) => s + x.complexity, 0) / selectedServices.length;
    const complexityLevel = Math.min(4, Math.round(avgComplexity + (selectedServices.length > 4 ? 1 : 0)));
    return { totalMin, totalMax, totalWeeks, complexityLevel };
  }, [selectedServices]);

  const contactParams = selectedServices
    .map((s) => s.label)
    .join(", ");

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Project Cost Estimator</span>
          </div>
          <h1 className="display-xl mb-4" style={{ maxWidth: "18ch" }}>
            Build Your<br />Project Scope.
          </h1>
          <p className="text-base max-w-lg" style={{ color: "var(--text-muted)" }}>
            Select the services you need. Your investment range and project timeline update in real time. No exact pricing, all ranges are indicative and subject to final scoping.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service selector */}
            <div className="lg:col-span-2">
              <h2 className="font-semibold mb-5 text-sm uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Select Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((service) => {
                  const isSelected = selected.has(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggle(service.id)}
                      data-cursor="SELECT"
                      className="text-left p-4 rounded-xl transition-all duration-200"
                      style={{
                        background: isSelected ? "rgba(223,255,0,0.06)" : "var(--bg-card)",
                        border: isSelected ? "1px solid rgba(223,255,0,0.4)" : "1px solid var(--border-subtle)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-semibold text-sm mb-1">{service.label}</div>
                          {service.subLabel && (
                            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                              {service.subLabel}
                            </div>
                          )}
                        </div>
                        <div
                          className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{
                            background: isSelected ? "var(--accent)" : "rgba(255,255,255,0.05)",
                            color: isSelected ? "#000" : "var(--text-muted)",
                            border: isSelected ? "none" : "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {isSelected ? "✓" : "+"}
                        </div>
                      </div>
                      <div className="mt-2 text-xs font-mono" style={{ color: isSelected ? "var(--accent)" : "var(--text-muted)" }}>
                        {formatZAR(service.baseMin)} – {formatZAR(service.baseMax)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary panel */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <HolographicCard className="p-6">
                <div className="label-mono mb-4">Project Summary</div>

                <AnimatePresence mode="wait">
                  {selectedServices.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <div className="text-3xl mb-3" style={{ color: "var(--accent)", opacity: 0.4 }}>◎</div>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Select services to build your scope
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-5"
                    >
                      {/* Investment range */}
                      <div>
                        <div className="label-mono mb-2" style={{ color: "var(--text-muted)" }}>
                          Investment Range
                        </div>
                        <div className="font-mono font-bold text-2xl" style={{ color: "var(--accent)" }}>
                          {formatZAR(totalMin)}
                        </div>
                        <div className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
                          to {formatZAR(totalMax)}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div>
                        <div className="label-mono mb-2" style={{ color: "var(--text-muted)" }}>
                          Estimated Timeline
                        </div>
                        <div className="font-bold text-lg">
                          {totalWeeks} {totalWeeks === 1 ? "week" : "weeks"}
                        </div>
                      </div>

                      {/* Complexity */}
                      <div>
                        <div className="label-mono mb-2" style={{ color: "var(--text-muted)" }}>
                          Project Complexity
                        </div>
                        <div
                          className="font-bold text-sm uppercase tracking-wider"
                          style={{ color: COMPLEXITY_COLORS[complexityLevel] || "var(--accent)" }}
                        >
                          {COMPLEXITY_LABELS[complexityLevel] || "Custom"}
                        </div>
                      </div>

                      {/* Selected services */}
                      <div>
                        <div className="label-mono mb-2" style={{ color: "var(--text-muted)" }}>
                          Included ({selectedServices.length})
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {selectedServices.map((s) => (
                            <div key={s.id} className="flex items-center gap-2 text-xs">
                              <span style={{ color: "var(--accent)" }}>✓</span>
                              <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                        <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                          These are indicative ranges only. Final pricing is determined after a discovery session.
                        </p>
                        <Link
                          href={`/contact?scope=${encodeURIComponent(contactParams)}`}
                          className="btn-accent w-full justify-center text-xs py-3"
                          data-cursor="START"
                        >
                          Get An Exact Quote →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </HolographicCard>
            </div>
          </div>
        </div>
      </section>

      {selectedServices.length > 0 && (
        <ToolContactForm
          toolName="Project Cost Estimator"
          toolSummary={`Selected services: ${selectedServices.map(s => s.label).join(", ")}. Estimated investment: ${formatZAR(totalMin)} – ${formatZAR(totalMax)}. Timeline: ${totalWeeks} week(s).`}
          summaryLabel={`Estimated: ${formatZAR(totalMin)} – ${formatZAR(totalMax)} over ${totalWeeks} week(s)`}
        />
      )}
    </div>
  );
}
