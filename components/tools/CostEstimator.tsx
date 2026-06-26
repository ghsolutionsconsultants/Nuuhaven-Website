"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolContactForm from "@/components/tools/ToolContactForm";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Service {
  id: string;
  category: string;
  label: string;
  subLabel?: string;
  baseMin: number;
  baseMax: number;
  durationWeeks: number;
  complexity: number;
}

const SERVICES: Service[] = [
  { id: "landing", category: "Website", label: "Landing Page", subLabel: "Single page, conversion-focused", baseMin: 1000, baseMax: 2000, durationWeeks: 1, complexity: 1 },
  { id: "basic", category: "Website", label: "Basic Website", subLabel: "3–5 pages, custom design", baseMin: 2500, baseMax: 4000, durationWeeks: 2, complexity: 1 },
  { id: "multi", category: "Website", label: "Professional Website", subLabel: "5–8 pages, full corporate site", baseMin: 5000, baseMax: 8000, durationWeeks: 3, complexity: 2 },
  { id: "enterprise", category: "Website", label: "Enterprise Website", subLabel: "10+ pages, advanced functionality", baseMin: 10000, baseMax: 20000, durationWeeks: 6, complexity: 3 },
  { id: "brand-basic", category: "Brand", label: "Brand Identity", subLabel: "Logo, colours, typography", baseMin: 2000, baseMax: 4000, durationWeeks: 1, complexity: 1 },
  { id: "brand-premium", category: "Brand", label: "Premium Brand Identity", subLabel: "Full brand standards + guidelines", baseMin: 5000, baseMax: 10000, durationWeeks: 2, complexity: 2 },
  { id: "profile-std", category: "Documentation", label: "Company Profile", subLabel: "Standard (8–12 pages)", baseMin: 1500, baseMax: 3000, durationWeeks: 1, complexity: 1 },
  { id: "profile-prem", category: "Documentation", label: "Premium Company Profile", subLabel: "Executive (16–24 pages)", baseMin: 3000, baseMax: 6000, durationWeeks: 2, complexity: 2 },
  { id: "docs", category: "Documentation", label: "Business Documentation", subLabel: "Proposals, presentations, templates", baseMin: 1000, baseMax: 2500, durationWeeks: 1, complexity: 1 },
  { id: "proposal", category: "Documentation", label: "Proposal Development", subLabel: "Professional proposals that win business", baseMin: 1500, baseMax: 4000, durationWeeks: 1, complexity: 1 },
  { id: "social", category: "Marketing", label: "Social Media Setup", subLabel: "Profile setup & optimisation (3 platforms)", baseMin: 1000, baseMax: 2500, durationWeeks: 1, complexity: 1 },
  { id: "marketing", category: "Marketing", label: "Marketing Assets Pack", subLabel: "Collateral, banners, templates", baseMin: 1500, baseMax: 4000, durationWeeks: 1, complexity: 1 },
  { id: "retainer", category: "Support", label: "Monthly Retainer", subLabel: "Ongoing updates & brand management", baseMin: 1000, baseMax: 3000, durationWeeks: 4, complexity: 1 },
  { id: "advisory", category: "Support", label: "Strategic Advisory", subLabel: "1-on-1 strategy sessions & commercial roadmap", baseMin: 2000, baseMax: 8000, durationWeeks: 2, complexity: 2 },
];

const CATEGORIES = ["Website", "Brand", "Documentation", "Marketing", "Support"];
const COMPLEXITY_LABELS = ["", "Starter", "Professional", "Premium", "Enterprise"];
const COMPLEXITY_COLORS = ["", "#a0a0a0", "#dfff00", "#ff9500", "#ff4444"];

function formatZAR(n: number) {
  return `R ${n.toLocaleString("en-ZA")}`;
}

export default function CostEstimator() {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showForm, setShowForm] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedServices = SERVICES.filter((s) => selected.has(s.id));
  const visibleServices = activeCategory === "All" ? SERVICES : SERVICES.filter(s => s.category === activeCategory);

  const { totalMin, totalMax, totalWeeks, complexityLevel } = useMemo(() => {
    if (selectedServices.length === 0)
      return { totalMin: 0, totalMax: 0, totalWeeks: 0, complexityLevel: 0 };
    const totalMin = selectedServices.reduce((s, x) => s + x.baseMin, 0);
    const totalMax = selectedServices.reduce((s, x) => s + x.baseMax, 0);
    const totalWeeks = Math.ceil(selectedServices.reduce((s, x) => s + x.durationWeeks * 0.6, 0));
    const avgComplexity = selectedServices.reduce((s, x) => s + x.complexity, 0) / selectedServices.length;
    const complexityLevel = Math.min(4, Math.round(avgComplexity + (selectedServices.length > 4 ? 1 : 0)));
    return { totalMin, totalMax, totalWeeks, complexityLevel };
  }, [selectedServices]);

  const contactParams = selectedServices.map((s) => s.label).join(", ");

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>

      {/* Hero */}
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Project Cost Estimator</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "4rem", alignItems: "end" }}>
            <div>
              <h1 className="display-xl" style={{ marginBottom: "1.5rem" }}>
                Build Your<br />Project Scope.
              </h1>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.9, fontSize: "0.9375rem", maxWidth: "34rem" }}>
                Select the services you need and your investment range updates in real time. Think of it like a project configurator — add, remove, and adjust until the scope feels right.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { label: "All ranges are indicative", desc: "Final pricing confirmed after a discovery session" },
                { label: "No commitment required", desc: "Explore freely before reaching out" },
                { label: "Fixed-price projects", desc: "We agree on scope and price upfront, no hourly billing" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", padding: "1rem 1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.1rem" }}>◎</span>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.2rem" }}>{item.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 380px", gap: "3rem", alignItems: "start" }}>

            {/* Service selector */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ fontWeight: 700, fontSize: "1rem" }}>Select Services</h2>
                {selected.size > 0 && (
                  <button
                    onClick={() => setSelected(new Set())}
                    style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category filter tabs */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
                {["All", ...CATEGORIES].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "0.45rem 1rem", borderRadius: 999, fontSize: "0.72rem",
                      fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em", textTransform: "uppercase",
                      background: activeCategory === cat ? "var(--accent)" : "rgba(255,255,255,0.04)",
                      border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.08)",
                      color: activeCategory === cat ? "#000" : "rgba(255,255,255,0.45)",
                      cursor: "pointer", transition: "all 0.2s", fontWeight: activeCategory === cat ? 700 : 400,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0.75rem" }}>
                <AnimatePresence>
                  {visibleServices.map((service) => {
                    const isSelected = selected.has(service.id);
                    return (
                      <motion.button
                        key={service.id}
                        layout
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        onClick={() => toggle(service.id)}
                        data-cursor="SELECT"
                        style={{
                          textAlign: "left", padding: "1.25rem 1.375rem", borderRadius: 12,
                          background: isSelected ? "rgba(223,255,0,0.06)" : "rgba(255,255,255,0.025)",
                          border: isSelected ? "1px solid rgba(223,255,0,0.45)" : "1px solid rgba(255,255,255,0.07)",
                          cursor: "pointer", transition: "border-color 0.2s, background 0.2s",
                          boxShadow: isSelected ? "0 0 20px rgba(223,255,0,0.06)" : "none",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: isSelected ? "var(--accent)" : "rgba(255,255,255,0.25)", marginBottom: "0.3rem" }}>{service.category}</div>
                            <div style={{ fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.3, color: "var(--text)" }}>{service.label}</div>
                            {service.subLabel && (
                              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", lineHeight: 1.4 }}>{service.subLabel}</div>
                            )}
                          </div>
                          <div style={{
                            width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "0.7rem", fontWeight: 700,
                            background: isSelected ? "var(--accent)" : "rgba(255,255,255,0.05)",
                            color: isSelected ? "#000" : "rgba(255,255,255,0.3)",
                            border: isSelected ? "none" : "1px solid rgba(255,255,255,0.1)",
                            transition: "all 0.2s",
                          }}>
                            {isSelected ? "✓" : "+"}
                          </div>
                        </div>
                        <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", fontWeight: 700, color: isSelected ? "var(--accent)" : "rgba(255,255,255,0.35)" }}>
                          {formatZAR(service.baseMin)} – {formatZAR(service.baseMax)}
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Guide note */}
              <div style={{ marginTop: "2rem", padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
                <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.75rem" }}>How to use this tool</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    "Select every service you think you might need — you can always narrow it down later.",
                    "Use the category filters to browse by type (Website, Brand, etc.).",
                    "The summary panel on the right updates live with your total range and timeline.",
                    "When you're happy with the scope, click 'Get An Exact Quote' to kick off a real conversation.",
                  ].map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: "var(--accent)", flexShrink: 0, marginTop: "0.1rem" }}>0{i + 1}</span>
                      <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary panel */}
            <div style={{ position: isMobile ? "static" : "sticky", top: 88 }}>
              <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(223,255,0,0.03)" }}>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)" }}>Project Summary</div>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <AnimatePresence mode="wait">
                    {selectedServices.length === 0 ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ textAlign: "center", padding: "2.5rem 1rem" }}
                      >
                        <div style={{ fontSize: "2.5rem", color: "var(--accent)", opacity: 0.25, marginBottom: "1rem" }}>◈</div>
                        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>
                          Select services on the left to see your investment range and timeline.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="summary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                      >
                        {/* Investment */}
                        <div style={{ padding: "1.25rem", background: "rgba(223,255,0,0.05)", border: "1px solid rgba(223,255,0,0.15)", borderRadius: 12 }}>
                          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>Investment Range</div>
                          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.75rem", fontWeight: 900, color: "var(--accent)", lineHeight: 1, marginBottom: "0.3rem" }}>{formatZAR(totalMin)}</div>
                          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>to {formatZAR(totalMax)}</div>
                        </div>

                        {/* Timeline + Complexity */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                          <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10 }}>
                            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>Timeline</div>
                            <div style={{ fontWeight: 800, fontSize: "1.4rem", fontFamily: "var(--font-geist-mono)", color: "#fff", lineHeight: 1 }}>{totalWeeks}</div>
                            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: "0.2rem" }}>week{totalWeeks !== 1 ? "s" : ""}</div>
                          </div>
                          <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10 }}>
                            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>Complexity</div>
                            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: COMPLEXITY_COLORS[complexityLevel] || "var(--accent)", lineHeight: 1.2 }}>{COMPLEXITY_LABELS[complexityLevel] || "Custom"}</div>
                          </div>
                        </div>

                        {/* Selected list */}
                        <div>
                          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.875rem" }}>
                            Included ({selectedServices.length})
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {selectedServices.map((s) => (
                              <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: 0 }}>
                                  <span style={{ color: "var(--accent)", fontSize: "0.65rem", flexShrink: 0 }}>✓</span>
                                  <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
                                </div>
                                <button
                                  onClick={() => toggle(s.id)}
                                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: "0.7rem", flexShrink: 0, padding: "0.1rem 0.2rem" }}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.25rem" }}>
                          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                            Indicative ranges only. Final pricing confirmed after a discovery session.
                          </p>
                          <button
                            onClick={() => setShowForm(true)}
                            className="btn-accent"
                            style={{ display: "block", width: "100%", textAlign: "center", fontSize: "0.8rem", padding: "0.875rem 1rem" }}
                            data-cursor="START"
                          >
                            Get An Exact Quote →
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedServices.length > 0 && showForm && (
        <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }} id="estimator-form">
          <div className="section-inner" style={{ maxWidth: "52rem" }}>
            <div className="accent-line">
              <span className="label-mono">Get Your Exact Quote</span>
            </div>
            <h2 className="display-xl" style={{ maxWidth: "16ch", marginBottom: "1rem" }}>
              Let&apos;s Confirm<br />Your Scope.
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "0.5rem" }}>
              Your selected scope: <span style={{ color: "rgba(255,255,255,0.7)" }}>{selectedServices.map(s => s.label).join(", ")}</span>
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Estimated range: <span style={{ color: "var(--accent)", fontWeight: 700 }}>{formatZAR(totalMin)} – {formatZAR(totalMax)}</span> over <span style={{ color: "var(--accent)", fontWeight: 700 }}>{totalWeeks} week{totalWeeks !== 1 ? "s" : ""}</span>
            </p>
            <ToolContactForm
              toolName="Project Cost Estimator"
              toolSummary={`Selected services: ${selectedServices.map(s => s.label).join(", ")}. Estimated investment: ${formatZAR(totalMin)} – ${formatZAR(totalMax)}. Timeline: ${totalWeeks} week(s).`}
              summaryLabel={`Estimated: ${formatZAR(totalMin)} – ${formatZAR(totalMax)} · ${totalWeeks} week${totalWeeks !== 1 ? "s" : ""}`}
              onReset={() => { setSelected(new Set()); setShowForm(false); }}
            />
          </div>
        </section>
      )}
    </div>
  );
}
