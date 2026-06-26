"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TOOLS = [
  {
    id: "assessment",
    href: "/tools/assessment",
    icon: "◐",
    number: "01",
    label: "Business Assessment",
    tagline: "Start here, know where you stand",
    explain:
      "Answer 10 rapid-fire questions about your brand, website, documentation, and marketing. You'll receive an instant score out of 100 with a category breakdown showing exactly where your gaps are, so you invest in the right things first.",
    whenToUse: "Use this if you're unsure what your business actually needs.",
    paramKey: "q_logo",
    hook: "Does your business have a professional logo and visual identity?",
    options: [
      { label: "Yes, professional", value: "yes" },
      { label: "Partially / DIY", value: "partial" },
      { label: "Not yet", value: "no" },
    ],
    accent: "var(--accent)",
  },
  {
    id: "solution-finder",
    href: "/tools/solution-finder",
    icon: "◎",
    number: "02",
    label: "Solution Finder",
    tagline: "Get a tailored recommendation",
    explain:
      "Tell us where your business is, what challenges you face, and what outcome matters most. In 8 questions, we match you to a specific package, Foundation, Growth, or Transformation, with a clear list of exactly what you need.",
    whenToUse: "Use this if you know something is missing but don't know what to fix first.",
    paramKey: "stage",
    hook: "What best describes where your business is right now?",
    options: [
      { label: "Just starting out", value: "startup" },
      { label: "Growing, need structure", value: "growing" },
      { label: "Established, need upgrade", value: "established" },
    ],
    accent: "var(--accent)",
  },
  {
    id: "estimator",
    href: "/tools/estimator",
    icon: "◈",
    number: "03",
    label: "Project Cost Estimator",
    tagline: "Know the investment before you commit",
    explain:
      "Select exactly what you need, website, brand kit, company profile, marketing assets, or a full package, and get an instant investment range with a timeline estimate. Think of it as a Bloomberg terminal for your business budget.",
    whenToUse: "Use this if you already know what you need and want to understand the cost.",
    paramKey: "services",
    hook: "What does your business need right now?",
    options: [
      { label: "A website", value: "website" },
      { label: "Brand identity", value: "brand" },
      { label: "Company profile", value: "profile" },
    ],
    accent: "var(--accent)",
  },
  {
    id: "impressions",
    href: "/tools/impressions-audit",
    icon: "◉",
    number: "04",
    label: "First Impressions Audit",
    tagline: "See yourself through a client's eyes",
    explain:
      "5 targeted questions that reveal how potential clients perceive your business the moment they discover you, Google search, social media, meetings, follow-ups. You'll get a perception score with specific gaps and the exact fixes that will win you more business.",
    whenToUse: "Use this if you're losing deals or not hearing back after pitches.",
    paramKey: "q_google",
    hook: "When a client Googles your business, what do they find?",
    options: [
      { label: "A professional website", value: "website" },
      { label: "Social profile only", value: "social" },
      { label: "Very little / nothing", value: "nothing" },
    ],
    accent: "var(--accent)",
  },
];

export default function ToolsTeaser() {
  const router = useRouter();
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleSelect = (toolId: string, value: string) => {
    setSelected((prev) => ({ ...prev, [toolId]: value }));
  };

  const handleContinue = (tool: typeof TOOLS[number]) => {
    const answer = selected[tool.id];
    const url = answer ? `${tool.href}?${tool.paramKey}=${encodeURIComponent(answer)}` : tool.href;
    router.push(url);
  };

  return (
    <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner">
        {/* Header */}
        <div className="accent-line">
          <span className="label-mono">Free Business Tools</span>
        </div>
        <div
          className="flex flex-col md:flex-row md:items-end justify-between"
          style={{ gap: "2rem", marginBottom: "3rem" }}
        >
          <h2 className="display-xl" style={{ maxWidth: "16ch" }}>
            Understand Your Business<br />Before You Invest.
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)", lineHeight: 1.85, maxWidth: "26rem" }}>
            Four free diagnostic tools, no signup, no commitment. Pick the one that matches where you are right now, answer a few questions, and walk away with clarity.
          </p>
        </div>

        {/* Tool cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {TOOLS.map((tool, i) => {
            const picked = selected[tool.id];
            const isOpen = expanded === tool.id;

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "rgba(17,17,17,0.85)",
                  border: isOpen ? "1px solid rgba(223,255,0,0.3)" : "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                  transition: "border-color 0.25s",
                }}
              >
                {/* Card header, always visible, click to expand */}
                <button
                  className="w-full text-left"
                  style={{ padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}
                  onClick={() => setExpanded(isOpen ? null : tool.id)}
                  data-cursor="EXPLORE"
                >
                  <span className="label-mono" style={{ color: "rgba(223,255,0,0.4)", fontSize: "0.65rem", flexShrink: 0 }}>
                    {tool.number}
                  </span>
                  <span style={{ color: "var(--accent)", fontSize: "1.25rem", flexShrink: 0 }}>
                    {tool.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm" style={{ marginBottom: "0.2rem" }}>{tool.label}</div>
                    <div className="label-mono text-xs" style={{ color: "var(--text-muted)" }}>{tool.tagline}</div>
                  </div>
                  {picked && (
                    <span
                      className="label-mono text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: "rgba(223,255,0,0.1)", border: "1px solid rgba(223,255,0,0.3)", color: "var(--accent)" }}
                    >
                      Answer saved
                    </span>
                  )}
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.75rem",
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.25s",
                      display: "inline-block",
                    }}
                  >
                    ▾
                  </span>
                </button>

                {/* Expanded body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 2rem 2rem 2rem",
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ paddingTop: "1.5rem" }}>
                          {/* Left: explanation */}
                          <div>
                            <div className="label-mono text-xs" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                              What This Tool Does
                            </div>
                            <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "1rem" }}>
                              {tool.explain}
                            </p>
                            <div
                              className="rounded-lg text-xs"
                              style={{
                                background: "rgba(223,255,0,0.04)",
                                border: "1px solid rgba(223,255,0,0.1)",
                                padding: "0.75rem 1rem",
                                color: "var(--accent)",
                                lineHeight: 1.7,
                              }}
                            >
                              <span style={{ opacity: 0.6 }}>When to use: </span>
                              {tool.whenToUse}
                            </div>
                          </div>

                          {/* Right: hook question + CTA */}
                          <div>
                            <div className="label-mono text-xs" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                              Quick Start
                            </div>
                            <p className="text-sm font-medium" style={{ lineHeight: 1.6, marginBottom: "1rem" }}>
                              {tool.hook}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                              {tool.options.map((opt) => {
                                const isSel = picked === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    onClick={(e) => { e.stopPropagation(); handleSelect(tool.id, opt.value); }}
                                    className="text-left rounded-lg text-xs font-medium transition-all duration-200"
                                    style={{
                                      padding: "0.6rem 0.875rem",
                                      background: isSel ? "rgba(223,255,0,0.1)" : "rgba(255,255,255,0.04)",
                                      border: isSel ? "1px solid rgba(223,255,0,0.4)" : "1px solid rgba(255,255,255,0.08)",
                                      color: isSel ? "var(--accent)" : "rgba(255,255,255,0.65)",
                                      cursor: "pointer",
                                    }}
                                    data-cursor="SELECT"
                                  >
                                    {isSel ? "✓ " : ""}{opt.label}
                                  </button>
                                );
                              })}
                            </div>
                            <button
                              onClick={() => handleContinue(tool)}
                              className="btn-accent text-xs w-full"
                              style={{ padding: "0.8rem 1.25rem" }}
                              data-cursor="OPEN"
                            >
                              {picked ? `Continue with your answer →` : `Open ${tool.label} →`}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom link */}
        <div className="flex justify-center" style={{ marginTop: "2rem" }}>
          <Link
            href="/tools"
            className="label-mono text-xs hover:text-white transition-colors"
            style={{ color: "var(--text-muted)" }}
            data-cursor="OPEN"
          >
            View all tools → /tools
          </Link>
        </div>
      </div>
    </section>
  );
}
