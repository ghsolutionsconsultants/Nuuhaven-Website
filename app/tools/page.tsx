"use client";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

const tools = [
  {
    href: "/tools/assessment",
    icon: "◐",
    number: "01",
    title: "Business Presence Assessment",
    tagline: "Start here — find out where you actually stand.",
    desc: "Most businesses don't know what's holding them back. This 10-question assessment scores your brand, digital presence, documentation, and marketing infrastructure. You'll walk away with a clear presence score, a category breakdown, and a ranked list of what to fix first.",
    features: [
      { icon: "◎", text: "10 focused questions, under 3 minutes" },
      { icon: "◈", text: "Presence score from 0–100" },
      { icon: "◐", text: "Category breakdown across 5 areas" },
      { icon: "◉", text: "Priority fix list tailored to your gaps" },
    ],
    cta: "Get My Score →",
    badge: "Start here",
    badgeColor: "var(--accent)",
    when: "Use this first if you're unsure where to begin.",
  },
  {
    href: "/tools/impressions-audit",
    icon: "◉",
    number: "02",
    title: "First Impressions Audit",
    tagline: "See your business the way a stranger sees it.",
    desc: "5 targeted questions that reveal how potential clients perceive your business the moment they find you. Most deals are lost before a single conversation happens — this audit identifies exactly where your first impression breaks down and what it's costing you.",
    features: [
      { icon: "◎", text: "5 perception-focused questions" },
      { icon: "◈", text: "First impressions score" },
      { icon: "◐", text: "Gap analysis by touchpoint" },
      { icon: "◉", text: "Specific, actionable fix recommendations" },
    ],
    cta: "Audit My Impressions →",
    badge: null,
    when: "Use this if you're losing deals you should be winning.",
  },
  {
    href: "/tools/solution-finder",
    icon: "◎",
    number: "03",
    title: "Solution Finder",
    tagline: "Answer 8 questions. Get a tailored package recommendation.",
    desc: "Not every business needs the same thing. The Solution Finder maps your stage, challenges, goals, and timeline to a specific package recommendation — from a lean Foundation Package to a full Transformation. No guesswork, no generic quotes.",
    features: [
      { icon: "◎", text: "8 guided questions about your business" },
      { icon: "◈", text: "Tailored package recommendation" },
      { icon: "◐", text: "Clear breakdown of what's included" },
      { icon: "◉", text: "Direct path to cost estimate or booking" },
    ],
    cta: "Find My Solution →",
    badge: null,
    when: "Use this if you know you need help but aren't sure what to ask for.",
  },
  {
    href: "/tools/estimator",
    icon: "◈",
    number: "04",
    title: "Project Cost Estimator",
    tagline: "Build your scope. See your investment range instantly.",
    desc: "Select the deliverables you need and watch your investment range and timeline update in real time. Works like a project configurator — add, remove, and adjust until your scope feels right. All ranges are indicative and subject to final scoping, but it gives you a solid anchor before any conversation.",
    features: [
      { icon: "◎", text: "14 services across all Nuuhaven offerings" },
      { icon: "◈", text: "Live investment range in ZAR" },
      { icon: "◐", text: "Estimated delivery timeline" },
      { icon: "◉", text: "Complexity rating and scope summary" },
    ],
    cta: "Estimate My Project →",
    badge: null,
    when: "Use this when you already know what you need and want to sense-check the investment.",
  },
];

export default function ToolsPage() {
  const isMobile = useIsMobile();
  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>

      {/* Hero */}
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Free Business Intelligence Tools</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "4rem", alignItems: "end" }}>
            <div>
              <h1 className="display-xl" style={{ marginBottom: "1.5rem" }}>
                Know Before<br />You Invest.
              </h1>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem", maxWidth: "34rem" }}>
                Four free diagnostic tools that reveal exactly where your business stands, what&apos;s holding you back, and what to do next. No signup. No commitment. No generic advice.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Time to complete", value: "2–5 minutes each" },
                { label: "Cost", value: "Completely free" },
                { label: "What you get", value: "Specific, actionable insights" },
                { label: "No signup required", value: "Start immediately" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{item.label}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "2.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="section-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.25rem, 4vw, 4rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Recommended order:</span>
            {["Assessment", "Impressions Audit", "Solution Finder", "Cost Estimator"].map((t, i) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.62rem", color: "rgba(255,255,255,0.2)" }}>0{i + 1}</span>
                <span style={{ fontSize: "0.82rem", color: i === 0 ? "var(--accent)" : "rgba(255,255,255,0.5)", fontWeight: i === 0 ? 600 : 400 }}>{t}</span>
                {i < 3 && <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool cards */}
      <section className="section">
        <div className="section-inner">
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {tools.map((tool, idx) => (
              <div
                key={tool.href}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr 1fr",
                  gap: isMobile ? "1.5rem" : "3rem",
                  alignItems: "start",
                  padding: isMobile ? "1.75rem" : "3rem",
                  background: "rgba(10,10,10,0.95)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 20,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle number watermark */}
                <div style={{
                  position: "absolute", right: "2rem", top: "1.5rem",
                  fontFamily: "var(--font-geist-mono)", fontSize: "5rem", fontWeight: 900,
                  color: "rgba(255,255,255,0.025)", lineHeight: 1, pointerEvents: "none", userSelect: "none",
                }}>
                  {tool.number}
                </div>

                {/* Left: icon + meta */}
                <div>
                  <div style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1.5rem", opacity: 0.9 }}>{tool.icon}</div>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>
                    Tool {tool.number}
                  </div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{tool.title}</h2>
                  <p style={{ fontSize: "0.82rem", color: "var(--accent)", fontStyle: "italic", lineHeight: 1.6, opacity: 0.85 }}>{tool.tagline}</p>

                  {tool.badge && (
                    <div style={{ display: "inline-flex", marginTop: "1rem", padding: "0.3rem 0.75rem", borderRadius: 999, fontSize: "0.65rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em", textTransform: "uppercase", background: `${tool.badgeColor}18`, border: `1px solid ${tool.badgeColor}40`, color: tool.badgeColor }}>
                      {tool.badge}
                    </div>
                  )}
                </div>

                {/* Middle: description + features */}
                <div>
                  <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.9, fontSize: "0.9rem", marginBottom: "2rem" }}>{tool.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {tool.features.map(f => (
                      <div key={f.text} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                        <span style={{ color: "var(--accent)", fontSize: "0.7rem", marginTop: "0.1rem", flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{f.text}</span>
                      </div>
                    ))}
                  </div>
                  {tool.when && (
                    <div style={{ marginTop: "1.75rem", padding: "0.875rem 1.125rem", background: "rgba(223,255,0,0.04)", border: "1px solid rgba(223,255,0,0.12)", borderRadius: 8 }}>
                      <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>When to use: </span>
                      <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>{tool.when}</span>
                    </div>
                  )}
                </div>

                {/* Right: CTA */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "0.5rem" }}>
                  <Link
                    href={tool.href}
                    className="btn-accent"
                    style={{ fontSize: "0.8rem", padding: "1rem 1.5rem", textAlign: "center", justifyContent: "center" }}
                    data-cursor="OPEN"
                  >
                    {tool.cta}
                  </Link>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
                    Free · No signup
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner" style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>Already know what you need?</div>
          <h2 className="display-xl" style={{ maxWidth: "18ch", margin: "0 auto 1.5rem" }}>
            Skip the Tools.<br />Start the Conversation.
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.85, maxWidth: "36rem", margin: "0 auto 2.5rem" }}>
            If you already know what you need, skip straight to a discovery conversation. Tell us about your business and we'll respond within 24 hours with a clear path forward.
          </p>
          <Link href="/contact" className="btn-accent" style={{ fontSize: "0.875rem" }} data-cursor="START">
            Start a Project →
          </Link>
        </div>
      </section>
    </div>
  );
}
