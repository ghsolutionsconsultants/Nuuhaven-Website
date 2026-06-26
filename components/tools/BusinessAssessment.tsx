"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ToolContactForm from "@/components/tools/ToolContactForm";
import { useIsMobile } from "@/hooks/useIsMobile";

const QUESTIONS = [
  { id: "logo", category: "Brand", text: "Does your business have a professional logo and visual identity?", weight: 2 },
  { id: "brand-guide", category: "Brand", text: "Do you have brand guidelines ensuring consistent use of your logo, colours, and fonts?", weight: 1 },
  { id: "website", category: "Digital", text: "Does your business have a professional, modern website?", weight: 2 },
  { id: "mobile", category: "Digital", text: "Is your website optimised for mobile and fast-loading?", weight: 1 },
  { id: "social", category: "Digital", text: "Are your social media profiles professionally set up and consistently branded?", weight: 1 },
  { id: "profile", category: "Documentation", text: "Do you have a professional company profile or capability statement?", weight: 2 },
  { id: "proposals", category: "Documentation", text: "Do you have professional proposal templates and sales documents?", weight: 1 },
  { id: "marketing", category: "Marketing", text: "Do you have consistent marketing materials (brochures, banners, social graphics)?", weight: 1 },
  { id: "email", category: "Marketing", text: "Do your team members have branded email signatures?", weight: 1 },
  { id: "positioning", category: "Strategy", text: "Is your brand messaging clear and consistent across all touchpoints?", weight: 2 },
];

type Answer = "yes" | "partial" | "no";
const SCORE_MAP: Record<Answer, number> = { yes: 1, partial: 0.5, no: 0 };
const ANSWER_LABELS: Record<Answer, string> = { yes: "Yes", partial: "Partially", no: "Not Yet" };
const ANSWER_COLORS: Record<Answer, string> = { yes: "#dfff00", partial: "#ff9500", no: "#666" };
const ANSWER_DESCS: Record<Answer, string> = {
  yes: "This is fully in place",
  partial: "Something exists but needs work",
  no: "This gap needs to be addressed",
};

const CATEGORY_ICONS: Record<string, string> = {
  Brand: "◈", Digital: "◎", Documentation: "◳", Marketing: "◐", Strategy: "◆",
};

function getCategoryScore(answers: Record<string, Answer>, category: string) {
  const qs = QUESTIONS.filter((q) => q.category === category);
  if (qs.length === 0) return 0;
  const total = qs.reduce((s, q) => s + (answers[q.id] ? SCORE_MAP[answers[q.id]] * q.weight : 0), 0);
  const max = qs.reduce((s, q) => s + q.weight, 0);
  return Math.round((total / max) * 100);
}

function getOverallScore(answers: Record<string, Answer>) {
  const total = QUESTIONS.reduce((s, q) => s + (answers[q.id] ? SCORE_MAP[answers[q.id]] * q.weight : 0), 0);
  const max = QUESTIONS.reduce((s, q) => s + q.weight, 0);
  return Math.round((total / max) * 100);
}

function getScoreLabel(score: number) {
  if (score >= 80) return { label: "Strong", color: "#dfff00" };
  if (score >= 60) return { label: "Developing", color: "#ff9500" };
  if (score >= 40) return { label: "Needs Work", color: "#ff6b00" };
  return { label: "Critical Gaps", color: "#ff4444" };
}

const CATEGORIES = ["Brand", "Digital", "Documentation", "Marketing", "Strategy"];

export default function BusinessAssessment() {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const pre = searchParams.get("q_logo") as Answer | null;
    if (pre && ["yes", "partial", "no"].includes(pre)) {
      setAnswers({ logo: pre });
      setStep(1);
    }
  }, [searchParams]);

  const q = QUESTIONS[step];

  const handleAnswer = (answer: Answer) => {
    const newAnswers = { ...answers, [q.id]: answer };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) setTimeout(() => setStep((s) => s + 1), 260);
    else setTimeout(() => setComplete(true), 260);
  };

  const overall = complete ? getOverallScore(answers) : 0;
  const scoreLabel = getScoreLabel(overall);
  const progress = complete ? 100 : (step / QUESTIONS.length) * 100;
  const currentCategory = q?.category;
  const categoryQuestions = QUESTIONS.filter(q2 => q2.category === currentCategory);
  const categoryStep = categoryQuestions.findIndex(q2 => q2.id === q?.id) + 1;

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>

      {/* Hero */}
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Business Presence Assessment</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "4rem", alignItems: "end" }}>
            <div>
              <h1 className="display-xl" style={{ marginBottom: "1.5rem" }}>
                Score Your<br />Business<br />Presence.
              </h1>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.9, fontSize: "0.9375rem" }}>
                {QUESTIONS.length} questions across 5 areas. Instant score. A ranked list of exactly what to fix first.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {CATEGORIES.map(cat => (
                <div key={cat} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1.125rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "var(--accent)", fontSize: "0.85rem", width: 16, textAlign: "center" }}>{CATEGORY_ICONS[cat]}</span>
                  <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner" style={{ maxWidth: 820, margin: "0 auto" }}>

          {/* Progress bar */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                {complete ? "Assessment Complete" : `Question ${step + 1} of ${QUESTIONS.length}`}
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
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>
                  {/* Category header */}
                  <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.9rem" }}>{CATEGORY_ICONS[currentCategory]}</span>
                      <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>{currentCategory}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
                      {categoryStep} of {categoryQuestions.length} in this section
                    </span>
                  </div>

                  <div style={{ padding: "2.5rem 2rem" }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.45, letterSpacing: "-0.01em", marginBottom: "2.25rem", maxWidth: "44ch" }}>{q.text}</h2>

                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "0.875rem", marginBottom: "2rem" }}>
                      {(["yes", "partial", "no"] as Answer[]).map((ans) => (
                        <button
                          key={ans}
                          onClick={() => handleAnswer(ans)}
                          data-cursor="SELECT"
                          style={{
                            padding: "1.5rem 1rem", borderRadius: 12, textAlign: "center", cursor: "pointer",
                            background: `${ANSWER_COLORS[ans]}0a`,
                            border: `1px solid ${ANSWER_COLORS[ans]}35`,
                            color: ANSWER_COLORS[ans],
                            transition: "all 0.2s",
                            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${ANSWER_COLORS[ans]}18`; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${ANSWER_COLORS[ans]}0a`; (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
                        >
                          <span style={{ fontWeight: 700, fontSize: "1rem" }}>{ANSWER_LABELS[ans]}</span>
                          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", fontWeight: 400, lineHeight: 1.4 }}>{ANSWER_DESCS[ans]}</span>
                        </button>
                      ))}
                    </div>

                    {step > 0 && (
                      <button
                        onClick={() => setStep((s) => s - 1)}
                        style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer" }}
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                </div>

                {/* Step dots */}
                <div style={{ display: "flex", justifyContent: "center", gap: "0.375rem", marginTop: "1.5rem" }}>
                  {QUESTIONS.map((_, i) => (
                    <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? "var(--accent)" : i < step ? "rgba(223,255,0,0.3)" : "rgba(255,255,255,0.1)", transition: "all 0.3s" }} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                {/* Score hero */}
                <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "3rem 2rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }}>
                    Your Business Presence Score
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.15 }}
                    style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(4rem,12vw,7rem)", fontWeight: 900, color: scoreLabel.color, lineHeight: 1, marginBottom: "0.5rem" }}
                  >
                    {overall}
                  </motion.div>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>out of 100</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: scoreLabel.color, marginBottom: "1rem" }}>{scoreLabel.label}</div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: "34rem", margin: "0 auto" }}>
                    {overall >= 80
                      ? "Your business presents strongly. Focus on maintaining consistency and scaling what works."
                      : overall >= 60
                      ? "You have a foundation but clear gaps are costing you deals. Prioritise the areas below."
                      : overall >= 40
                      ? "Significant gaps are damaging your credibility with potential clients. These need urgent attention."
                      : "Critical gaps are causing your business to be overlooked or dismissed before conversations even start."}
                  </p>
                </div>

                {/* Category breakdown */}
                <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2rem" }}>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.75rem" }}>Category Breakdown</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {CATEGORIES.map((cat) => {
                      const score = getCategoryScore(answers, cat);
                      const catLabel = getScoreLabel(score);
                      return (
                        <div key={cat}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.625rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                              <span style={{ color: catLabel.color, fontSize: "0.8rem" }}>{CATEGORY_ICONS[cat]}</span>
                              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{cat}</span>
                            </div>
                            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", fontWeight: 700, color: catLabel.color }}>{score}%</span>
                          </div>
                          <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 999, overflow: "hidden" }}>
                            <motion.div
                              style={{ height: "100%", background: catLabel.color, borderRadius: 999 }}
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Priority gaps */}
                {QUESTIONS.filter((q) => answers[q.id] !== "yes").length > 0 && (
                  <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,100,100,0.12)", borderRadius: 20, padding: "2rem" }}>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#ff6b6b", marginBottom: "1.5rem" }}>Priority Gaps</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                      {QUESTIONS.filter((q) => answers[q.id] !== "yes").slice(0, 5).map((q) => (
                        <div key={q.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
                          <span style={{ color: answers[q.id] === "partial" ? "#ff9500" : "#ff4444", flexShrink: 0, marginTop: "0.1rem", fontSize: "0.8rem" }}>
                            {answers[q.id] === "partial" ? "◑" : "○"}
                          </span>
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{q.text}</span>
                            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", color: answers[q.id] === "partial" ? "#ff9500" : "#ff4444", marginTop: "0.25rem", letterSpacing: "0.06em" }}>
                              {answers[q.id] === "partial" ? "PARTIALLY IN PLACE" : "NOT YET IN PLACE"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline contact form */}
                <div style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2rem" }}>
                  <ToolContactForm
                    inline
                    toolName="Business Assessment"
                    toolSummary={`Overall Score: ${overall}/100 (${scoreLabel.label}). Brand: ${getCategoryScore(answers, "Brand")}%, Digital: ${getCategoryScore(answers, "Digital")}%, Documentation: ${getCategoryScore(answers, "Documentation")}%, Marketing: ${getCategoryScore(answers, "Marketing")}%, Strategy: ${getCategoryScore(answers, "Strategy")}%.`}
                    summaryLabel={`Score: ${overall}/100 · ${scoreLabel.label}`}
                    onReset={() => { setStep(0); setAnswers({}); setComplete(false); }}
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
