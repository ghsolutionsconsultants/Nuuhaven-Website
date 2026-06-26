"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HolographicCard from "@/components/ui/HolographicCard";
import EcosystemVisualizer from "@/components/widgets/EcosystemVisualizer";
import MagneticButton from "@/components/ui/MagneticButton";

const TIMELINE = [
  {
    period: "2019 – 2022",
    tag: "Education",
    title: "BCom Investment Management",
    institution: "University of Pretoria",
    icon: "◈",
    highlight: false,
    desc: "Studied a Bachelor of Commerce in Investment Management at the University of Pretoria, one of South Africa's leading research universities. Built a rigorous academic foundation across financial markets theory, portfolio management, quantitative analysis, corporate finance, economics, and investment valuation. The degree developed the analytical mindset and commercial instinct that underpins everything at Nuuhaven.",
  },
  {
    period: "2023",
    tag: "Teaching & Postgraduate",
    title: "Honours & Academic Tutor",
    institution: "University of Pretoria",
    icon: "◎",
    highlight: false,
    desc: "Completed a BCom Honours in Investment Management, a postgraduate qualification focused on advanced investment theory, financial modelling, and research. Simultaneously tutored undergraduate Investment Management students (IVM 200 & 300), translating complex financial concepts into clear, actionable frameworks. Teaching sharpened the ability to communicate strategy simply, a skill central to how Nuuhaven advises clients today.",
  },
  {
    period: "Jan 2024 – Jan 2026",
    tag: "Big 4 · Corporate Finance",
    title: "Junior Consultant",
    institution: "One of the Big 4",
    icon: "◐",
    highlight: false,
    desc: "Joined one of the world's leading accounting and advisory firms as a Junior Consultant within the financial advisory business unit. Worked across Corporate Finance, Transactional Services, Turnaround & Restructuring, and Valuations & Modeling. Engaged on complex client mandates involving business valuations, financial due diligence, transaction structuring, and distressed advisory, gaining frontline exposure to how South Africa's most sophisticated organisations make high-stakes financial decisions.",
  },
  {
    period: "Jan 2026 – Present",
    tag: "Big 4 · Capital Markets",
    title: "Debt & Capital Markets Advisor",
    institution: "One of the Big 4",
    icon: "◉",
    highlight: false,
    desc: "Promoted to Consultant within the Strategy, Risk & Transactions practice, specialising in Debt & Capital Advisory. Supports clients on debt structuring, refinancing, capital raising, and capital structure optimisation. Day-to-day work involves building and reviewing detailed financial models, cash flow, funding, and debt service, supporting credit analysis, engaging with lenders and capital markets participants, and executing debt and capital markets transactions across instruments and sectors. The role demands precision, commercial clarity, and the ability to communicate complex financials to diverse stakeholders.",
  },
  {
    period: "Parallel Path",
    tag: "Creative & Brand",
    title: "Brand Development & Digital Strategy",
    institution: "Self-directed",
    icon: "◑",
    highlight: false,
    desc: "Running parallel to a demanding corporate career, developed deep expertise in brand identity, visual strategy, and digital execution. Recognising that businesses with strong commercial fundamentals were often let down by poor presentation, a gap left by traditional consultancies, began building the creative and technical skills needed to bridge that divide. The ability to think like a strategist and execute like a designer became the foundation of Nuuhaven's unique positioning.",
  },
  {
    period: "2023 / 2024",
    tag: "The Beginning",
    title: "Founded Nuuhaven",
    institution: "Johannesburg, South Africa",
    icon: "◆",
    highlight: true,
    desc: "Founded Nuuhaven as the culmination of every academic, professional, and creative experience, a strategic partner built specifically for businesses that operate with ambition but don't yet have the presentation to match. Combining Big 4 financial advisory thinking, investment management rigour, brand development expertise, and digital execution capability, Nuuhaven fills a gap that neither traditional consultancies nor creative agencies fully address. The mission: help businesses look as professional as they operate.",
  },
];

const ADVISORY = [
  { icon: "◈", title: "Business Positioning", desc: "Clarify how your business is perceived, and close the gap between where you are and where you want to be in the market." },
  { icon: "◎", title: "Growth Strategy", desc: "Map the next stage of growth with a clear commercial framework, markets, moves, and milestones that actually get executed." },
  { icon: "◆", title: "Brand & Market Entry", desc: "Define your brand architecture and go-to-market strategy before you invest in execution. Get it right from the start." },
  { icon: "◉", title: "Executive Counsel", desc: "A thinking partner for founders and leaders navigating high-stakes decisions, bringing Big 4 advisory rigour to your table." },
];

const STATS = [
  { value: "BCom", label: "Honours, UP" },
  { value: "Big 4", label: "Advisory Background" },
  { value: "4+", label: "Ecosystems Built" },
  { value: "JHB", label: "Based In" },
];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>

      {/* ── Hero ── */}
      <section className="noise-overlay" style={{ background: "var(--bg-secondary)", padding: "5rem 0 4.5rem" }}>
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "5rem", alignItems: "center" }}>

            {/* Copy */}
            <div style={{ maxWidth: "38rem" }}>
              <div className="accent-line" style={{ marginBottom: "2rem" }}>
                <span className="label-mono">The Story Behind Nuuhaven</span>
              </div>
              <h1 className="display-xl" style={{ marginBottom: "1.75rem", maxWidth: "15ch" }}>
                Strategy Meets<br />Creative<br />Execution.
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.9, marginBottom: "1.25rem" }}>
                Nuuhaven was born from a simple observation: most businesses operate professionally but don&apos;t look it. The ambition is there, the presentation isn&apos;t.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.9, marginBottom: "1.25rem" }}>
                Founded by <strong style={{ color: "var(--text)" }}>Tshepang Ramatsoma</strong>, a Debt &amp; Capital Markets Advisor at one of the Big 4, with a BCom Honours in Investment Management from the University of Pretoria, Nuuhaven bridges the gap between commercial rigour and creative execution.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.9, marginBottom: "2.5rem" }}>
                The result is a strategic partner unlike any other: one that thinks like a CFO and executes like a creative director.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <MagneticButton href="/contact" variant="accent">Work With Us</MagneticButton>
                <MagneticButton href="/work" variant="outline">See Our Work</MagneticButton>
              </div>
            </div>

            {/* Founder card */}
            <div style={{ flexShrink: 0 }}>
              <HolographicCard style={{ padding: 0, overflow: "hidden", width: 290 }}>
                <div style={{ position: "relative", width: 290, height: 340, background: "#0a0a0a" }}>
                  <Image
                    src="/images/founder.jpg"
                    alt="Tshepang Ramatsoma, Founder & MD, Nuuhaven"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
                </div>
                <div style={{ padding: "1.375rem 1.375rem 1.625rem" }}>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.57rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.35rem" }}>Founder & Managing Director</div>
                  <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.35rem" }}>Tshepang Ramatsoma</div>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>Debt & Capital Markets · Big 4 · Nuuhaven</div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.8, marginBottom: "1.125rem" }}>
                    Strategist. Brand architect. Digital builder. BCom Honours, University of Pretoria. Advisor to founders navigating growth and market positioning.
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a
                      href="https://www.linkedin.com/in/tshepang-ramatsoma-8b0518260/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-geist-mono)", fontSize: "0.63rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", textDecoration: "none", padding: "0.45rem 0.875rem", border: "1px solid rgba(223,255,0,0.25)", borderRadius: 6, transition: "background 0.2s" }}
                    >
                      LinkedIn ↗
                    </a>
                    <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-geist-mono)", fontSize: "0.63rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", textDecoration: "none", padding: "0.45rem 0.875rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, transition: "all 0.2s" }}>
                      Contact
                    </Link>
                  </div>
                </div>
              </HolographicCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: "var(--bg-primary)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "2.75rem 0" }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{ textAlign: "center", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", padding: "0 2rem" }}>
                <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "2rem", fontWeight: 800, color: "var(--accent)", marginBottom: "0.5rem", lineHeight: 1 }}>{s.value}</div>
                <div className="label-mono" style={{ color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)" }}>
        <div className="section-inner">
          <div className="accent-line" style={{ marginBottom: "1.25rem" }}>
            <span className="label-mono">The Journey</span>
          </div>
          <h2 className="display-xl" style={{ maxWidth: "16ch", marginBottom: "3.5rem" }}>
            The Background<br />That Built<br />Nuuhaven.
          </h2>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 11, top: 11, bottom: 11, width: 1, background: "linear-gradient(to bottom, var(--accent), rgba(223,255,0,0.04))" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {TIMELINE.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  style={{ paddingLeft: "2.625rem", position: "relative" }}
                >
                  {/* Node */}
                  <div style={{
                    position: "absolute", left: 0, top: "1.375rem",
                    width: 22, height: 22, borderRadius: "50%",
                    background: step.highlight ? "var(--accent)" : "var(--bg-card)",
                    border: `1px solid ${step.highlight ? "var(--accent)" : "rgba(255,255,255,0.15)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.55rem",
                    color: step.highlight ? "#000" : "rgba(255,255,255,0.45)",
                    zIndex: 1, flexShrink: 0,
                  }}>
                    {step.icon}
                  </div>

                  <HolographicCard
                    style={{
                      padding: "1.25rem 1.5rem",
                      cursor: "pointer",
                      border: step.highlight ? "1px solid rgba(223,255,0,0.28)" : undefined,
                      background: step.highlight ? "rgba(223,255,0,0.025)" : undefined,
                    }}
                  >
                    <button
                      onClick={() => setActiveStep(activeStep === i ? null : i)}
                      style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                        <div>
                          {/* Tag + period */}
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: step.highlight ? "var(--accent)" : "rgba(255,255,255,0.28)" }}>{step.period}</span>
                            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-block" }} />
                            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: step.highlight ? "rgba(223,255,0,0.7)" : "rgba(255,255,255,0.22)" }}>{step.tag}</span>
                          </div>
                          {/* Title */}
                          <div style={{ fontWeight: 700, fontSize: "0.975rem", color: step.highlight ? "var(--accent)" : "var(--text)", marginBottom: "0.2rem" }}>{step.title}</div>
                          {/* Institution */}
                          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.62rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)" }}>{step.institution}</div>
                        </div>
                        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", flexShrink: 0, paddingTop: "0.15rem" }}>
                          {activeStep === i ? "▲" : "▼"}
                        </span>
                      </div>

                      <AnimatePresence>
                        {activeStep === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: "hidden" }}
                          >
                            <p style={{ marginTop: "1rem", fontSize: "0.875rem", lineHeight: 1.9, color: "var(--text-muted)", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                              {step.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </HolographicCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Strategic Advisory ── */}
      <section className="noise-overlay" style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line" style={{ marginBottom: "1.25rem" }}>
            <span className="label-mono">Strategic Advisory</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4.5rem", alignItems: "start" }}>

            <div>
              <h2 className="display-xl" style={{ maxWidth: "15ch", marginBottom: "1.75rem" }}>
                The Strategist<br />Behind The<br />Brand.
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.9, marginBottom: "1.25rem" }}>
                Beyond building brands and websites, Tshepang works directly with founders and leadership teams as a strategic advisor, bringing the same rigour applied to Big 4 client mandates to the businesses Nuuhaven serves.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.9, marginBottom: "1.25rem" }}>
                With a background spanning debt advisory, capital structure analysis, financial modelling, and transaction services, strategic advisory sessions at Nuuhaven go beyond brand. They address positioning, commercial clarity, and the decisions that shape long-term trajectory.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.9, marginBottom: "2.5rem" }}>
                Whether you&apos;re preparing to raise, refinance, enter a new market, or simply need a sharper commercial narrative, this is what sets Nuuhaven apart from any ordinary agency.
              </p>
              <MagneticButton href="/contact" variant="accent">Book A Strategy Session →</MagneticButton>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {ADVISORY.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <HolographicCard style={{ padding: "1.375rem", height: "100%" }}>
                    <div style={{ fontSize: "1.35rem", color: "var(--accent)", marginBottom: "0.875rem" }}>{item.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.625rem" }}>{item.title}</div>
                    <p style={{ fontSize: "0.8rem", lineHeight: 1.8, color: "var(--text-muted)" }}>{item.desc}</p>
                  </HolographicCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ecosystem ── */}
      <EcosystemVisualizer />

      {/* ── CTA ── */}
      <section className="noise-overlay" style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
        <div className="section-inner" style={{ textAlign: "center" }}>
          <div className="accent-line" style={{ marginBottom: "1.25rem", justifyContent: "center" }}>
            <span className="label-mono">Ready?</span>
          </div>
          <h2 className="display-xl" style={{ maxWidth: "18ch", margin: "0 auto 1.25rem" }}>
            Let&apos;s Build Your<br />Ecosystem.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.85, maxWidth: "32rem", margin: "0 auto 2.5rem" }}>
            Every business deserves to look as professional as it operates. Let&apos;s close that gap, together.
          </p>
          <MagneticButton href="/contact" variant="accent">Start Your Transformation →</MagneticButton>
        </div>
      </section>

    </div>
  );
}
