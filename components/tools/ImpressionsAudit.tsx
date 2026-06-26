"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ToolContactForm from "@/components/tools/ToolContactForm";
import { useIsMobile } from "@/hooks/useIsMobile";

const QUESTIONS = [
  {
    id: "q_google",
    text: "When a potential client Googles your business name right now, what's the first thing they find?",
    hint: "Be honest — this is how most new clients discover you for the first time.",
    options: [
      { label: "A professional, branded website", value: "website", score: 20 },
      { label: "A social media profile", value: "social", score: 10 },
      { label: "A directory listing or review page", value: "directory", score: 5 },
      { label: "Very little or nothing", value: "nothing", score: 0 },
    ],
  },
  {
    id: "q_info",
    text: "What do you send when a prospect says: 'Tell me more about your business'?",
    hint: "Your documentation is your sales team when you're not in the room.",
    options: [
      { label: "A professional company profile or capability statement", value: "profile", score: 20 },
      { label: "A link to our website", value: "website", score: 12 },
      { label: "A summary email I write each time", value: "email", score: 6 },
      { label: "I don't have anything formal yet", value: "nothing", score: 0 },
    ],
  },
  {
    id: "q_brand",
    text: "How would you describe your logo and branding across your business?",
    hint: "Consistency matters — inconsistency signals a business that isn't fully established.",
    options: [
      { label: "Professional and consistent everywhere", value: "consistent", score: 20 },
      { label: "Decent but not fully consistent", value: "decent", score: 12 },
      { label: "Basic or done ourselves", value: "basic", score: 6 },
      { label: "We don't really have one yet", value: "none", score: 0 },
    ],
  },
  {
    id: "q_followup",
    text: "After a meeting with a prospect, how do you typically follow up?",
    hint: "Your follow-up materials are often the last impression before a buying decision.",
    options: [
      { label: "Branded proposal with portfolio and case studies", value: "proposal", score: 20 },
      { label: "A professional email with pricing", value: "email", score: 12 },
      { label: "A verbal quote or WhatsApp message", value: "verbal", score: 6 },
      { label: "Still figuring out my follow-up process", value: "none", score: 0 },
    ],
  },
  {
    id: "q_perception",
    text: "If your biggest competitor's best client checked out your online presence today, what would they likely think?",
    hint: "Perception drives purchasing. What story does your presence tell?",
    options: [
      { label: "This is a serious, established business", value: "serious", score: 20 },
      { label: "They look okay, professional enough", value: "okay", score: 12 },
      { label: "They need some work on their image", value: "needs-work", score: 6 },
      { label: "I'd probably stick with my current provider", value: "stick", score: 0 },
    ],
  },
];

const GAPS: Record<string, { title: string; gap: string; fix: string }> = {
  q_google: {
    title: "Online Discoverability",
    gap: "Prospects can't find or trust you online — you're losing deals before they begin.",
    fix: "A professionally built website that ranks, builds trust, and converts first-time visitors.",
  },
  q_info: {
    title: "Business Documentation",
    gap: "You have no professional document that speaks for your business when you're not in the room.",
    fix: "A professional company profile that closes deals on your behalf, even after hours.",
  },
  q_brand: {
    title: "Brand Consistency",
    gap: "Inconsistent or amateur branding signals to prospects that your business isn't established.",
    fix: "A complete brand identity — logo, colour system, and guidelines — that commands respect.",
  },
  q_followup: {
    title: "Sales Infrastructure",
    gap: "Without structured sales materials, you're leaving close rates to chance.",
    fix: "Branded proposal templates and pitch decks that make you the obvious choice.",
  },
  q_perception: {
    title: "Market Perception",
    gap: "Your image isn't strong enough to take business from competitors or attract premium clients.",
    fix: "A complete business ecosystem that makes you look as professional as you operate.",
  },
};

function getLabel(score: number) {
  if (score >= 85) return { text: "Outstanding", color: "var(--accent)", sub: "Your business makes an exceptional first impression. You're competing at the highest level." };
  if (score >= 65) return { text: "Developing", color: "#ff9500", sub: "Solid foundation, but visible gaps are costing you deals right now." };
  if (score >= 40) return { text: "Needs Work", color: "#ff6b00", sub: "Prospects are forming a poor impression before they even speak to you. This is urgent." };
  return { text: "Critical Gaps", color: "#ff4444", sub: "Your business is invisible or unconvincing to potential clients. Deals are being lost daily." };
}

const STATS = [
  { value: "7 sec", label: "Time to form a first impression" },
  { value: "75%", label: "Decisions based on visual credibility" },
  { value: "3×", label: "More likely to win with strong presence" },
];

export default function ImpressionsAudit() {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const pre = searchParams.get("q_google");
    if (pre) {
      const q = QUESTIONS[0];
      const opt = q.options.find((o) => o.value === pre);
      if (opt) {
        setAnswers({ q_google: pre });
        setScores({ q_google: opt.score });
        setStep(1);
        setStarted(true);
      }
    }
  }, [searchParams]);

  const current = QUESTIONS[step];

  const handleAnswer = (value: string, score: number) => {
    const newAnswers = { ...answers, [current.id]: value };
    const newScores = { ...scores, [current.id]: score };
    setAnswers(newAnswers);
    setScores(newScores);
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 250);
    } else {
      setTimeout(() => setDone(true), 300);
    }
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = QUESTIONS.length * 20;
  const pct = Math.round((totalScore / maxScore) * 100);
  const label = getLabel(pct);
  const weakGaps = Object.entries(scores).filter(([, s]) => s < 12).map(([id]) => GAPS[id]).filter(Boolean);
  const progress = done ? 100 : (step / QUESTIONS.length) * 100;

  const handleReset = () => { setStep(0); setAnswers({}); setScores({}); setDone(false); setStarted(false); };

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>

      {/* Hero */}
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">First Impressions Audit</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "4rem", alignItems: "end" }}>
            <div>
              <h1 className="display-xl" style={{ marginBottom: "1.5rem" }}>
                How Does Your<br />Business Look To<br />A Stranger?
              </h1>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.9, fontSize: "0.9375rem", marginBottom: "2rem" }}>
                5 targeted questions that reveal exactly how potential clients perceive your business — and what it&apos;s costing you in lost deals.
              </p>
              {!started && !done && (
                <button
                  onClick={() => setStarted(true)}
                  className="btn-accent"
                  style={{ fontSize: "0.875rem" }}
                  data-cursor="START"
                >
                  Start the Audit →
                </button>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {STATS.map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1.75rem", fontWeight: 900, color: "var(--accent)", lineHeight: 1, flexShrink: 0 }}>{s.value}</div>
                  <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Question / Results area */}
      <section className="section">
        <div className="section-inner" style={{ maxWidth: 780, margin: "0 auto" }}>

          {/* Progress bar */}
          {(started || done) && (
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                  {done ? "Audit Complete" : `Question ${step + 1} of ${QUESTIONS.length}`}
                </span>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: "var(--accent)" }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", background: "var(--accent)", borderRadius: 999 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!started && !done ? (
              /* Intro teaser */
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "3rem 2.5rem", textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", color: "var(--accent)", marginBottom: "1.5rem", opacity: 0.7 }}>◉</div>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "-0.01em" }}>5 Questions. Under 2 Minutes.</h2>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.85, maxWidth: "32rem", margin: "0 auto 2rem", fontSize: "0.9rem" }}>
                    Most deals are lost before a single conversation happens. This audit pinpoints exactly where your first impression breaks down — and what to fix first.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "2.5rem" }}>
                    {[
                      { icon: "◎", label: "Online presence" },
                      { icon: "◳", label: "Documentation" },
                      { icon: "◈", label: "Brand identity" },
                      { icon: "◐", label: "Sales materials" },
                      { icon: "◉", label: "Market perception" },
                      { icon: "◆", label: "Instant score" },
                    ].map(item => (
                      <div key={item.label} style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, textAlign: "center" }}>
                        <div style={{ color: "var(--accent)", fontSize: "0.9rem", marginBottom: "0.35rem" }}>{item.icon}</div>
                        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)" }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStarted(true)} className="btn-accent" style={{ fontSize: "0.875rem", padding: "0.9rem 2.5rem" }} data-cursor="START">
                    Start the Audit →
                  </button>
                </div>
              </motion.div>
            ) : !done ? (
              /* Question */
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>
                  <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>
                      Question {step + 1} of {QUESTIONS.length}
                    </span>
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      {QUESTIONS.map((_, i) => (
                        <div key={i} style={{ width: i === step ? 16 : 6, height: 6, borderRadius: 3, background: i === step ? "var(--accent)" : i < step ? "rgba(223,255,0,0.35)" : "rgba(255,255,255,0.1)", transition: "all 0.3s" }} />
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: "2.5rem 2rem" }}>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: "-0.01em", marginBottom: "0.625rem" }}>{current.text}</h2>
                    {current.hint && (
                      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "2rem" }}>{current.hint}</p>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {current.options.map((opt) => {
                        const isSelected = answers[current.id] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleAnswer(opt.value, opt.score)}
                            data-cursor="SELECT"
                            style={{
                              textAlign: "left", padding: "1.125rem 1.375rem", borderRadius: 12, cursor: "pointer",
                              background: isSelected ? "rgba(223,255,0,0.08)" : "rgba(255,255,255,0.025)",
                              border: isSelected ? "1px solid rgba(223,255,0,0.45)" : "1px solid rgba(255,255,255,0.07)",
                              color: isSelected ? "#fff" : "rgba(255,255,255,0.7)",
                              transition: "all 0.2s",
                              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                            }}
                            onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
                            onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.025)"; }}
                          >
                            <span style={{ fontSize: "0.875rem", lineHeight: 1.4 }}>{opt.label}</span>
                            {isSelected && <span style={{ color: "var(--accent)", fontSize: "0.75rem" }}>✓</span>}
                          </button>
                        );
                      })}
                    </div>

                    {step > 0 && (
                      <button
                        onClick={() => setStep(s => s - 1)}
                        style={{ marginTop: "1.5rem", fontFamily: "var(--font-geist-mono)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer" }}
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Results */
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                {/* Score hero */}
                <div style={{ background: "rgba(10,10,10,0.98)", border: `1px solid ${label.color}22`, borderRadius: 20, padding: "3rem 2rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }}>
                    Your First Impressions Score
                  </div>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(5rem,14vw,8rem)", fontWeight: 900, color: label.color, lineHeight: 1, marginBottom: "0.25rem" }}
                  >
                    {pct}
                  </motion.div>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", marginBottom: "1.25rem" }}>out of 100</div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 800, color: label.color, marginBottom: "1rem", letterSpacing: "-0.02em" }}>{label.text}</div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: "34rem", margin: "0 auto" }}>{label.sub}</p>
                </div>

                {/* Gaps */}
                {weakGaps.length > 0 && (
                  <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,100,100,0.1)", borderRadius: 20, padding: "2rem" }}>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#ff6b6b", marginBottom: "1.5rem" }}>What&apos;s Costing You Clients</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                      {weakGaps.map(g => (
                        <div key={g.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "1.25rem 1.5rem" }}>
                          <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem" }}>{g.title}</div>
                          <p style={{ fontSize: "0.78rem", color: "rgba(255,100,100,0.85)", lineHeight: 1.7, marginBottom: "0.625rem" }}>✕ {g.gap}</p>
                          <p style={{ fontSize: "0.78rem", color: "var(--accent)", lineHeight: 1.7 }}>✓ {g.fix}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline contact form */}
                <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2rem" }}>
                  <ToolContactForm
                    inline
                    toolName="First Impressions Audit"
                    toolSummary={`Perception Score: ${pct}%, ${label.text}. Weak areas: ${weakGaps.map(g => g?.title).filter(Boolean).join(", ") || "None identified"}.`}
                    summaryLabel={`Perception Score: ${pct}% · ${label.text}`}
                    onReset={handleReset}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
