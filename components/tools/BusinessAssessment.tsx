"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import HolographicCard from "@/components/ui/HolographicCard";
import ToolContactForm from "@/components/tools/ToolContactForm";

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
const ANSWER_COLORS: Record<Answer, string> = { yes: "var(--accent)", partial: "#ff9500", no: "#a0a0a0" };

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
  if (score >= 80) return { label: "Strong", color: "var(--accent)" };
  if (score >= 60) return { label: "Developing", color: "#ff9500" };
  if (score >= 40) return { label: "Needs Work", color: "#ff6b00" };
  return { label: "Critical Gaps", color: "#ff4444" };
}

const CATEGORIES = ["Brand", "Digital", "Documentation", "Marketing", "Strategy"];

export default function BusinessAssessment() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [complete, setComplete] = useState(false);

  // Pre-fill first answer if coming from home teaser
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
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 250);
    } else {
      setTimeout(() => setComplete(true), 250);
    }
  };

  const overall = complete ? getOverallScore(answers) : 0;
  const scoreLabel = getScoreLabel(overall);
  const progress = complete ? 100 : (step / QUESTIONS.length) * 100;

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Business Presence Assessment</span>
          </div>
          <h1 className="display-xl mb-4" style={{ maxWidth: "18ch" }}>
            Score Your<br />Business<br />Presence.
          </h1>
          <p className="text-base max-w-lg" style={{ color: "var(--text-muted)" }}>
            {QUESTIONS.length} rapid questions. Instant score. Clear recommendations on what to fix first.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="label-mono">
                {complete ? "Assessment Complete" : `${step + 1} / ${QUESTIONS.length}`}
              </span>
              <span className="label-mono" style={{ color: "var(--accent)" }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-0.5 w-full rounded-full" style={{ background: "var(--bg-card)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--accent)" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!complete ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <HolographicCard className="p-8">
                  <div className="label-mono mb-4" style={{ color: "var(--accent)" }}>
                    {q.category}
                  </div>
                  <h2 className="display-md mb-8">{q.text}</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {(["yes", "partial", "no"] as Answer[]).map((ans) => (
                      <button
                        key={ans}
                        onClick={() => handleAnswer(ans)}
                        data-cursor="SELECT"
                        className="p-4 rounded-xl text-center font-semibold text-sm transition-all duration-200 hover:scale-105"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: `1px solid ${ANSWER_COLORS[ans]}40`,
                          color: ANSWER_COLORS[ans],
                        }}
                      >
                        {ANSWER_LABELS[ans]}
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="mt-5 w-full text-center label-mono transition-colors hover:text-white"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ← Back
                    </button>
                  )}
                </HolographicCard>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-5"
              >
                {/* Overall score */}
                <HolographicCard className="p-8 text-center">
                  <div className="label-mono mb-4">Your Business Presence Score</div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="font-mono font-bold mb-3"
                    style={{ fontSize: "5rem", color: scoreLabel.color, lineHeight: 1 }}
                  >
                    {overall}
                  </motion.div>
                  <div className="font-bold text-xl mb-2" style={{ color: scoreLabel.color }}>
                    {scoreLabel.label}
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    out of 100
                  </p>
                </HolographicCard>

                {/* Category breakdown */}
                <HolographicCard className="p-6">
                  <div className="label-mono mb-5">Category Breakdown</div>
                  <div className="space-y-4">
                    {CATEGORIES.map((cat) => {
                      const score = getCategoryScore(answers, cat);
                      const catLabel = getScoreLabel(score);
                      return (
                        <div key={cat}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{cat}</span>
                            <span className="font-mono text-sm font-bold" style={{ color: catLabel.color }}>
                              {score}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full" style={{ background: "var(--bg-card)" }}>
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: catLabel.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </HolographicCard>

                {/* Gap analysis */}
                <HolographicCard className="p-6">
                  <div className="label-mono mb-4" style={{ color: "#ff4444" }}>Priority Gaps</div>
                  <div className="space-y-2">
                    {QUESTIONS.filter((q) => answers[q.id] !== "yes").slice(0, 5).map((q) => (
                      <div key={q.id} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 mt-0.5" style={{ color: answers[q.id] === "partial" ? "#ff9500" : "#ff4444" }}>
                          {answers[q.id] === "partial" ? "◑" : "○"}
                        </span>
                        <span style={{ color: "var(--text-muted)" }}>{q.text}</span>
                      </div>
                    ))}
                  </div>
                </HolographicCard>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/tools/solution-finder" className="btn-accent flex-1 justify-center text-xs py-3" data-cursor="OPEN">
                    Find Your Solution →
                  </Link>
                  <Link href="/contact" className="btn-outline flex-1 justify-center text-xs py-3" data-cursor="OPEN">
                    Talk to Nuuhaven
                  </Link>
                </div>

                <button
                  onClick={() => { setStep(0); setAnswers({}); setComplete(false); }}
                  className="w-full text-center label-mono transition-colors hover:text-white"
                  style={{ color: "var(--text-muted)" }}
                >
                  ↺ Retake Assessment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {complete && (
        <ToolContactForm
          toolName="Business Assessment"
          toolSummary={`Overall Score: ${overall}/100 (${scoreLabel.label}). Categories, Brand: ${getCategoryScore(answers, "Brand")}%, Digital: ${getCategoryScore(answers, "Digital")}%, Documentation: ${getCategoryScore(answers, "Documentation")}%, Marketing: ${getCategoryScore(answers, "Marketing")}%, Strategy: ${getCategoryScore(answers, "Strategy")}%.`}
          summaryLabel={`Score: ${overall}/100, ${scoreLabel.label}`}
        />
      )}
    </div>
  );
}
