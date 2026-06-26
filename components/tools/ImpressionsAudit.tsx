"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ToolContactForm from "@/components/tools/ToolContactForm";

const QUESTIONS = [
  {
    id: "q_google",
    text: "When a potential client Googles your business name right now, what's the first thing they find?",
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
    options: [
      { label: "Professional, consistent everywhere", value: "consistent", score: 20 },
      { label: "Decent but not fully consistent", value: "decent", score: 12 },
      { label: "Basic or done ourselves", value: "basic", score: 6 },
      { label: "We don't really have one yet", value: "none", score: 0 },
    ],
  },
  {
    id: "q_followup",
    text: "After a meeting with a prospect, how do you typically follow up?",
    options: [
      { label: "Branded proposal with our portfolio and case studies", value: "proposal", score: 20 },
      { label: "A professional email with pricing", value: "email", score: 12 },
      { label: "A verbal quote or WhatsApp message", value: "verbal", score: 6 },
      { label: "I'm still figuring out my follow-up process", value: "none", score: 0 },
    ],
  },
  {
    id: "q_perception",
    text: "If your biggest competitor's best client checked out your online presence today, what would they likely think?",
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
    gap: "Prospects can't find or trust you online, you're losing deals before they begin.",
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
    fix: "A complete brand identity, logo, colour system, and guidelines, that commands respect.",
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
  if (score >= 85) return { text: "Outstanding", color: "var(--accent)", sub: "Your business makes an exceptional first impression. You're competing at a high level." };
  if (score >= 65) return { text: "Developing", color: "#ff9500", sub: "You have a solid foundation but visible gaps that are costing you deals right now." };
  if (score >= 40) return { text: "Needs Work", color: "#ff6b00", sub: "Prospects are forming a poor impression before they even speak to you. This is urgent." };
  return { text: "Critical Gaps", color: "#ff4444", sub: "Your business is invisible or unconvincing to potential clients. Act now, deals are being lost daily." };
}

export default function ImpressionsAudit() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  // Pre-fill first answer from URL if teaser passed it
  useEffect(() => {
    const pre = searchParams.get("q_google");
    if (pre) {
      const q = QUESTIONS[0];
      const opt = q.options.find((o) => o.value === pre);
      if (opt) {
        setAnswers({ q_google: pre });
        setScores({ q_google: opt.score });
        setStep(1);
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

  // Which gaps are weak (score < 12)?
  const weakGaps = Object.entries(scores)
    .filter(([, s]) => s < 12)
    .map(([id]) => GAPS[id])
    .filter(Boolean);

  if (done) {
    return (
      <div className="section" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        <div className="section-inner">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="accent-line">
              <span className="label-mono">Your Results</span>
            </div>

            {/* Score hero */}
            <div className="text-center" style={{ marginBottom: "4rem" }}>
              <div
                className="font-mono font-bold"
                style={{ fontSize: "clamp(4rem, 15vw, 8rem)", color: label.color, lineHeight: 1, marginBottom: "1rem" }}
              >
                {pct}
              </div>
              <div className="display-xl" style={{ marginBottom: "1rem" }}>{label.text}</div>
              <p className="text-base mx-auto" style={{ color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "36rem" }}>
                {label.sub}
              </p>
            </div>

            {/* Gaps */}
            {weakGaps.length > 0 && (
              <div style={{ marginBottom: "3rem" }}>
                <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                  What&apos;s Costing You Clients
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1rem" }}>
                  {weakGaps.map((g) => (
                    <div
                      key={g.title}
                      className="rounded-xl"
                      style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}
                    >
                      <div className="font-semibold text-sm" style={{ marginBottom: "0.5rem" }}>{g.title}</div>
                      <p className="text-xs" style={{ color: "rgba(255,100,100,0.9)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                        ✕ {g.gap}
                      </p>
                      <p className="text-xs" style={{ color: "var(--accent)", lineHeight: 1.7 }}>
                        ✓ {g.fix}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-accent" data-cursor="START">
                Fix These Gaps, Book a Call →
              </Link>
              <Link href="/tools/solution-finder" className="btn-outline" data-cursor="EXPLORE">
                Find Your Solution →
              </Link>
            </div>
          </motion.div>
        </div>
        <ToolContactForm
          toolName="First Impressions Audit"
          toolSummary={`Perception Score: ${pct}%, ${label.text}. Weak areas: ${weakGaps.map(g => g?.title).filter(Boolean).join(", ") || "None identified"}.`}
          summaryLabel={`Perception Score: ${pct}%, ${label.text}`}
        />
      </div>
    );
  }

  return (
    <div className="section" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div className="section-inner">
        <div className="accent-line">
          <span className="label-mono">First Impressions Audit</span>
        </div>

        <div style={{ maxWidth: "640px" }}>
          <h1 className="display-xl" style={{ maxWidth: "18ch", marginBottom: "1.5rem" }}>
            How Does Your Business Look To A Stranger?
          </h1>
          <p className="text-base" style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "3rem" }}>
            5 questions that reveal exactly how potential clients perceive your business on first contact, and what it&apos;s costing you.
          </p>

          {/* Progress */}
          <div className="flex gap-1.5" style={{ marginBottom: "2.5rem" }}>
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full"
                style={{
                  height: 3,
                  background: i <= step ? "var(--accent)" : "rgba(255,255,255,0.1)",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="label-mono text-xs" style={{ color: "var(--accent)", marginBottom: "1rem" }}>
                Question {step + 1} of {QUESTIONS.length}
              </div>
              <p className="text-base font-medium" style={{ lineHeight: 1.6, marginBottom: "2rem" }}>
                {current.text}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {current.options.map((opt) => {
                  const isSelected = answers[current.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value, opt.score)}
                      className="text-left rounded-xl text-sm transition-all duration-200"
                      style={{
                        padding: "1rem 1.25rem",
                        background: isSelected ? "rgba(223,255,0,0.1)" : "rgba(255,255,255,0.04)",
                        border: isSelected ? "1px solid rgba(223,255,0,0.4)" : "1px solid rgba(255,255,255,0.08)",
                        color: isSelected ? "var(--accent)" : "rgba(255,255,255,0.75)",
                        cursor: "pointer",
                      }}
                      data-cursor="SELECT"
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
