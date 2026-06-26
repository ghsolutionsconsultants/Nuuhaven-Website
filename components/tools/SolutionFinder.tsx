"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ToolContactForm from "@/components/tools/ToolContactForm";
import { useIsMobile } from "@/hooks/useIsMobile";

const SERVICE_COSTS: Record<string, string> = {
  "Brand Identity (Logo + Colours + Typography)": "R 2,000 – R 4,000",
  "Multi-Page Corporate Website": "R 5,000 – R 8,000",
  "Company Profile (8–12 pages)": "R 1,500 – R 3,000",
  "Social Media Setup (3 platforms)": "R 1,000 – R 2,500",
  "Website Redesign & Upgrade": "R 3,500 – R 7,000",
  "Brand Identity Refresh & Guidelines": "R 3,000 – R 6,000",
  "Premium Brand Identity": "R 5,000 – R 10,000",
  "Premium Company Profile (16–24 pages)": "R 3,000 – R 6,000",
  "Marketing Assets Pack": "R 1,500 – R 4,000",
  "Business Documentation Templates": "R 1,000 – R 2,500",
  "Professional Multi-Page Website": "R 5,000 – R 8,000",
  "Strategic Advisory & Commercial Roadmap": "R 2,000 – R 8,000",
  "Enterprise Website (10+ pages)": "R 10,000 – R 20,000",
  "Monthly Retainer Support": "R 1,000 – R 3,000/mo",
  "Strategic Advisory Session": "R 2,000 – R 4,000",
  "Business Positioning Assessment": "Complimentary",
  "Custom Deliverable Mix": "Scoped per project",
  "Ongoing Support": "R 1,000 – R 3,000/mo",
};

interface Question {
  id: string;
  text: string;
  hint?: string;
  type: "single" | "multi";
  options: { id: string; label: string; desc?: string; icon: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "stage",
    text: "What best describes your business right now?",
    hint: "Be honest — this shapes every recommendation that follows.",
    type: "single",
    options: [
      { id: "startup", label: "Just Starting Out", desc: "New business, building from scratch", icon: "◎" },
      { id: "growing", label: "Growing, Need to Look More Professional", desc: "Revenue coming in but presentation hasn't kept up", icon: "◈" },
      { id: "established", label: "Established, Ready for a Rebrand", desc: "Successful business, time for a premium refresh", icon: "◉" },
      { id: "enterprise", label: "Enterprise, Need Ongoing Support", desc: "Larger operation requiring retainer-level support", icon: "◆" },
    ],
  },
  {
    id: "challenges",
    text: "What are your biggest business challenges?",
    hint: "Select all that apply — most businesses have more than one gap.",
    type: "multi",
    options: [
      { id: "no-brand", label: "No Professional Brand Identity", desc: "No logo, or one that doesn't reflect the business quality", icon: "◈" },
      { id: "no-website", label: "No Website or Outdated Website", desc: "Missing online presence or one that doesn't convert", icon: "◎" },
      { id: "no-profile", label: "No Company Profile or Documentation", desc: "Can't send a professional capability statement", icon: "◳" },
      { id: "no-marketing", label: "Inconsistent or No Marketing Assets", desc: "No collateral, social graphics, or unified look", icon: "◐" },
    ],
  },
  {
    id: "clients",
    text: "Who is your target client?",
    hint: "This affects the formality and positioning of everything we recommend.",
    type: "single",
    options: [
      { id: "b2b", label: "Other Businesses (B2B)", desc: "Corporates, SMEs, procurement teams", icon: "◈" },
      { id: "b2c", label: "General Public (B2C)", desc: "End consumers, retail customers", icon: "◎" },
      { id: "both", label: "Both B2B and B2C", desc: "Mixed audience requiring versatile positioning", icon: "◉" },
      { id: "unsure", label: "Still Figuring It Out", desc: "Early stage, audience not yet defined", icon: "◳" },
    ],
  },
  {
    id: "impression",
    text: "What impression do you want to make?",
    hint: "Your brand's personality. There's no wrong answer — it depends on your market.",
    type: "single",
    options: [
      { id: "credible", label: "Credible & Trustworthy", desc: "Safe, reliable, professional choice", icon: "◎" },
      { id: "premium", label: "Premium & Exclusive", desc: "High-end, luxury, worth a premium price", icon: "◆" },
      { id: "approachable", label: "Approachable & Friendly", desc: "Warm, accessible, easy to work with", icon: "◐" },
      { id: "authoritative", label: "Authoritative & Expert", desc: "Industry leader, go-to specialist", icon: "◈" },
    ],
  },
  {
    id: "finding",
    text: "Where are prospects currently finding you?",
    hint: "This tells us where your biggest discovery gaps are.",
    type: "multi",
    options: [
      { id: "wom", label: "Word of Mouth", desc: "Referrals and personal recommendations", icon: "◎" },
      { id: "social", label: "Social Media", desc: "Instagram, LinkedIn, Facebook, TikTok", icon: "◐" },
      { id: "website", label: "My Website", desc: "Organic search or direct visits", icon: "◈" },
      { id: "nowhere", label: "They're Not Finding Me", desc: "No clear discovery channel yet", icon: "◳" },
    ],
  },
  {
    id: "have",
    text: "What do you already have?",
    hint: "We build on what exists — no need to redo what's already working.",
    type: "multi",
    options: [
      { id: "logo", label: "A Logo", desc: "Even if it needs a refresh", icon: "◈" },
      { id: "website", label: "A Website", desc: "Even if it's outdated", icon: "◎" },
      { id: "profile", label: "A Company Profile", desc: "Even if it's basic", icon: "◳" },
      { id: "nothing", label: "Starting From Scratch", desc: "Blank canvas, no assets yet", icon: "◉" },
    ],
  },
  {
    id: "outcome",
    text: "What outcome matters most right now?",
    hint: "If you could only achieve one thing in the next 90 days, what would it be?",
    type: "single",
    options: [
      { id: "leads", label: "Generate More Leads", desc: "More enquiries and inbound interest", icon: "◎" },
      { id: "credibility", label: "Build Credibility", desc: "Be taken seriously by the right people", icon: "◈" },
      { id: "investors", label: "Attract Investors or Partners", desc: "Pitch-ready, fundable, partnership-worthy", icon: "◆" },
      { id: "brand", label: "Build a Recognisable Brand", desc: "Be remembered and referred to", icon: "◉" },
    ],
  },
  {
    id: "timeline",
    text: "How soon do you need this?",
    hint: "We work to your timeline. Knowing this helps us prioritise what to tackle first.",
    type: "single",
    options: [
      { id: "asap", label: "As Soon As Possible", desc: "Urgent — this is holding the business back", icon: "◉" },
      { id: "month", label: "Within 30 Days", desc: "Upcoming pitch, event, or launch", icon: "◈" },
      { id: "quarter", label: "Within 3 Months", desc: "Building towards a specific milestone", icon: "◎" },
      { id: "planning", label: "Just Planning Ahead", desc: "No rush, doing research", icon: "◳" },
    ],
  },
];

interface Answers {
  [key: string]: string | string[];
}

function getRecommendation(answers: Answers) {
  const stage = answers.stage as string;
  const have = (answers.have as string[]) || [];
  const outcome = answers.outcome as string;
  const hasWebsite = have.includes("website");
  const hasLogo = have.includes("logo");

  if (stage === "startup" || have.includes("nothing") || have.length === 0) {
    return {
      name: "Foundation Package",
      badge: "Most popular for new businesses",
      desc: "Everything you need to launch professionally — brand identity, website, and core documentation that makes you look established from day one.",
      services: ["Brand Identity (Logo + Colours + Typography)", "Multi-Page Corporate Website", "Company Profile (8–12 pages)", "Social Media Setup (3 platforms)"],
      why: "You're starting fresh and every touchpoint matters. The Foundation Package sets a professional baseline that gets you taken seriously — immediately.",
      estimatorParams: "brand-basic,multi,profile-std,social",
    };
  }
  if (stage === "growing" || outcome === "credibility") {
    return {
      name: "Growth Package",
      badge: "Best for businesses gaining momentum",
      desc: "Elevate your existing business with a premium brand refresh, a powerful website, and complete documentation that matches how well you actually operate.",
      services: [
        hasWebsite ? "Website Redesign & Upgrade" : "Professional Multi-Page Website",
        hasLogo ? "Brand Identity Refresh & Guidelines" : "Premium Brand Identity",
        "Premium Company Profile (16–24 pages)",
        "Marketing Assets Pack",
        "Business Documentation Templates",
      ],
      why: "Your business has momentum but your presentation hasn't kept pace. This package closes the gap between how you operate and how you look.",
      estimatorParams: "multi,brand-premium,profile-prem,marketing,docs",
    };
  }
  if (stage === "established" || stage === "enterprise") {
    return {
      name: "Transformation Package",
      badge: "For businesses ready to operate at the top",
      desc: "A complete ecosystem rebuild — premium brand, enterprise digital presence, strategic advisory, and ongoing retainer support to maintain the standard.",
      services: ["Strategic Advisory & Commercial Roadmap", "Premium Brand Identity & Full Guidelines", "Enterprise Website (10+ pages)", "Premium Company Profile", "Marketing Assets Pack", "Monthly Retainer Support"],
      why: "You're ready to compete at the highest level. This package combines strategic counsel with world-class execution across every touchpoint — and keeps it there.",
      estimatorParams: "advisory,brand-premium,enterprise,profile-prem,marketing,retainer",
    };
  }
  return {
    name: "Custom Strategy Package",
    badge: "Tailored to your unique situation",
    desc: "Your situation doesn't fit a standard template — and that's fine. We recommend starting with a strategic advisory session to map the right path forward.",
    services: ["Strategic Advisory Session", "Business Positioning Assessment", "Custom Deliverable Mix", "Ongoing Support"],
    why: "Some businesses need a bespoke approach. Let's start with a strategic conversation — we'll map your goals, gaps, and the exact sequence of moves to close them.",
    estimatorParams: "advisory",
  };
}

export default function SolutionFinder() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [complete, setComplete] = useState(false);

  const question = QUESTIONS[step];

  const handleSingle = (optionId: string) => {
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) setTimeout(() => setStep((s) => s + 1), 280);
    else setTimeout(() => setComplete(true), 280);
  };

  const handleMultiToggle = (optionId: string) => {
    const current = (answers[question.id] as string[]) || [];
    const updated = current.includes(optionId) ? current.filter((x) => x !== optionId) : [...current, optionId];
    setAnswers({ ...answers, [question.id]: updated });
  };

  const handleMultiNext = () => {
    if (step < QUESTIONS.length - 1) setStep((s) => s + 1);
    else setComplete(true);
  };

  const recommendation = complete ? getRecommendation(answers) : null;
  const progress = complete ? 100 : (step / QUESTIONS.length) * 100;

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>

      {/* Hero */}
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Solution Finder</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "4rem", alignItems: "end" }}>
            <div>
              <h1 className="display-xl" style={{ marginBottom: "1.5rem" }}>
                Find Your<br />Perfect Solution.
              </h1>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.9, fontSize: "0.9375rem" }}>
                Answer {QUESTIONS.length} questions about your business and we&apos;ll map a specific package recommendation to your exact situation — in under 2 minutes.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { label: "8 targeted questions", desc: "Each one refines your recommendation" },
                { label: "3 possible outcomes", desc: "Foundation, Growth, or Transformation" },
                { label: "No wrong answers", desc: "Honest answers lead to the best result" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", padding: "1rem 1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>◎</span>
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
        <div className="section-inner" style={{ maxWidth: 780, margin: "0 auto" }}>

          {/* Progress */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                {complete ? "Complete" : `Question ${step + 1} of ${QUESTIONS.length}`}
              </span>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: "var(--accent)" }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
              <motion.div
                style={{ height: "100%", background: "var(--accent)", borderRadius: 999 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!complete ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2.5rem", marginBottom: "1rem" }}>
                  <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.01em", marginBottom: "0.625rem" }}>{question.text}</h2>
                    {question.hint && (
                      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, fontStyle: "italic" }}>{question.hint}</p>
                    )}
                    {question.type === "multi" && (
                      <div style={{ display: "inline-flex", marginTop: "0.75rem", padding: "0.3rem 0.75rem", background: "rgba(255,149,0,0.1)", border: "1px solid rgba(255,149,0,0.25)", borderRadius: 999 }}>
                        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ff9500" }}>Select all that apply</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0.75rem", marginBottom: "1.75rem" }}>
                    {question.options.map((opt) => {
                      const isSelected = question.type === "single"
                        ? answers[question.id] === opt.id
                        : ((answers[question.id] as string[]) || []).includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => question.type === "single" ? handleSingle(opt.id) : handleMultiToggle(opt.id)}
                          data-cursor="SELECT"
                          style={{
                            textAlign: "left", padding: "1.25rem 1.375rem", borderRadius: 12, cursor: "pointer",
                            background: isSelected ? "rgba(223,255,0,0.07)" : "rgba(255,255,255,0.025)",
                            border: isSelected ? "1px solid rgba(223,255,0,0.45)" : "1px solid rgba(255,255,255,0.07)",
                            transition: "all 0.2s",
                            boxShadow: isSelected ? "0 0 20px rgba(223,255,0,0.07)" : "none",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                            <span style={{ fontSize: "1.1rem", color: isSelected ? "var(--accent)" : "rgba(255,255,255,0.3)", flexShrink: 0, marginTop: "0.1rem", transition: "color 0.2s" }}>
                              {opt.icon}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: "0.875rem", color: isSelected ? "#fff" : "rgba(255,255,255,0.75)", marginBottom: "0.3rem", transition: "color 0.2s" }}>
                                {opt.label}
                              </div>
                              {opt.desc && (
                                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{opt.desc}</div>
                              )}
                            </div>
                            {isSelected && (
                              <div style={{ width: 18, height: 18, borderRadius: 4, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <span style={{ fontSize: "0.6rem", fontWeight: 900, color: "#000" }}>✓</span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {question.type === "multi" && (
                      <button
                        onClick={handleMultiNext}
                        className="btn-accent"
                        style={{ fontSize: "0.82rem", padding: "0.875rem 2rem" }}
                        data-cursor="NEXT"
                      >
                        {step < QUESTIONS.length - 1 ? "Next Question →" : "Get My Recommendation →"}
                      </button>
                    )}
                    {step > 0 && (
                      <button
                        onClick={() => setStep((s) => s - 1)}
                        style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
                        data-cursor="BACK"
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                </div>

                {/* Step indicator dots */}
                <div style={{ display: "flex", justifyContent: "center", gap: "0.375rem" }}>
                  {QUESTIONS.map((_, i) => (
                    <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? "var(--accent)" : i < step ? "rgba(223,255,0,0.3)" : "rgba(255,255,255,0.1)", transition: "all 0.3s" }} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>
                  {/* Result header */}
                  <div style={{ padding: "2rem 2.5rem", background: "rgba(223,255,0,0.04)", borderBottom: "1px solid rgba(223,255,0,0.1)" }}>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>Your Recommended Solution</div>
                    <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>{recommendation?.name}</h2>
                    {recommendation?.badge && (
                      <div style={{ display: "inline-flex", padding: "0.3rem 0.875rem", background: "rgba(223,255,0,0.1)", border: "1px solid rgba(223,255,0,0.25)", borderRadius: 999 }}>
                        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>{recommendation.badge}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "2.5rem" }}>
                    <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, marginBottom: "2rem" }}>{recommendation?.desc}</p>

                    <div style={{ marginBottom: "2rem" }}>
                      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>What&apos;s Included</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {recommendation?.services.map((s) => {
                          const cost = SERVICE_COSTS[s];
                          return (
                            <div key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                                <span style={{ color: "var(--accent)", fontSize: "0.65rem", flexShrink: 0 }}>✓</span>
                                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{s}</span>
                              </div>
                              {cost && (
                                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--accent)", fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap" }}>{cost}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", marginTop: "0.75rem", fontStyle: "italic" }}>
                        Indicative ranges only. Final pricing confirmed after discovery session. No total shown — each deliverable is scoped individually.
                      </p>
                    </div>

                    <div style={{ padding: "1.25rem 1.5rem", background: "rgba(223,255,0,0.04)", border: "1px solid rgba(223,255,0,0.15)", borderRadius: 12, marginBottom: "0" }}>
                      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.625rem" }}>Why This Fits You</div>
                      <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>{recommendation?.why}</p>
                    </div>

                    <ToolContactForm
                      inline
                      toolName="Solution Finder"
                      toolSummary={`Recommended: ${recommendation?.name}. Services: ${recommendation?.services.join(", ")}. Reason: ${recommendation?.why}`}
                      summaryLabel={`Recommended Package: ${recommendation?.name}`}
                      onReset={() => { setStep(0); setAnswers({}); setComplete(false); }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
