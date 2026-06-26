"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ToolContactForm from "@/components/tools/ToolContactForm";
import HolographicCard from "@/components/ui/HolographicCard";
import MagneticButton from "@/components/ui/MagneticButton";

interface Question {
  id: string;
  text: string;
  type: "single" | "multi";
  options: { id: string; label: string; icon: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "stage",
    text: "What best describes your business right now?",
    type: "single",
    options: [
      { id: "startup", label: "Just Starting Out", icon: "◎" },
      { id: "growing", label: "Growing, Need to Look More Professional", icon: "◈" },
      { id: "established", label: "Established, Ready for a Rebrand", icon: "◉" },
      { id: "enterprise", label: "Enterprise, Need Ongoing Support", icon: "◆" },
    ],
  },
  {
    id: "challenges",
    text: "What are your biggest business challenges? (Select all that apply)",
    type: "multi",
    options: [
      { id: "no-brand", label: "No Professional Brand Identity", icon: "◈" },
      { id: "no-website", label: "No Website or Outdated Website", icon: "◎" },
      { id: "no-profile", label: "No Company Profile or Documentation", icon: "◳" },
      { id: "no-marketing", label: "Inconsistent or No Marketing Assets", icon: "◐" },
    ],
  },
  {
    id: "clients",
    text: "Who is your target client?",
    type: "single",
    options: [
      { id: "b2b", label: "Other Businesses (B2B)", icon: "◈" },
      { id: "b2c", label: "General Public (B2C)", icon: "◎" },
      { id: "both", label: "Both", icon: "◉" },
      { id: "unsure", label: "Still Figuring It Out", icon: "◳" },
    ],
  },
  {
    id: "impression",
    text: "What impression do you want to make?",
    type: "single",
    options: [
      { id: "credible", label: "Credible & Trustworthy", icon: "◎" },
      { id: "premium", label: "Premium & Exclusive", icon: "◆" },
      { id: "approachable", label: "Approachable & Friendly", icon: "◐" },
      { id: "authoritative", label: "Authoritative & Expert", icon: "◈" },
    ],
  },
  {
    id: "finding",
    text: "Where are prospects currently finding you? (Select all that apply)",
    type: "multi",
    options: [
      { id: "wom", label: "Word of Mouth", icon: "◎" },
      { id: "social", label: "Social Media", icon: "◐" },
      { id: "website", label: "My Website", icon: "◈" },
      { id: "nowhere", label: "They're Not Finding Me", icon: "◳" },
    ],
  },
  {
    id: "have",
    text: "What do you already have? (Select all that apply)",
    type: "multi",
    options: [
      { id: "logo", label: "A Logo", icon: "◈" },
      { id: "website", label: "A Website", icon: "◎" },
      { id: "profile", label: "A Company Profile", icon: "◳" },
      { id: "nothing", label: "Starting From Scratch", icon: "◉" },
    ],
  },
  {
    id: "outcome",
    text: "What outcome matters most right now?",
    type: "single",
    options: [
      { id: "leads", label: "Generate More Leads", icon: "◎" },
      { id: "credibility", label: "Build Credibility", icon: "◈" },
      { id: "investors", label: "Attract Investors", icon: "◆" },
      { id: "brand", label: "Build a Recognisable Brand", icon: "◉" },
    ],
  },
  {
    id: "timeline",
    text: "How soon do you need this?",
    type: "single",
    options: [
      { id: "asap", label: "As Soon As Possible", icon: "◉" },
      { id: "month", label: "Within 30 Days", icon: "◈" },
      { id: "quarter", label: "Within 3 Months", icon: "◎" },
      { id: "planning", label: "Just Planning Ahead", icon: "◳" },
    ],
  },
];

interface Answers {
  [key: string]: string | string[];
}

function getRecommendation(answers: Answers) {
  const stage = answers.stage as string;
  const challenges = (answers.challenges as string[]) || [];
  const outcome = answers.outcome as string;
  const have = (answers.have as string[]) || [];

  const hasNothing = have.includes("nothing") || have.length === 0;
  const hasLogo = have.includes("logo");
  const hasWebsite = have.includes("website");

  if (stage === "startup" || hasNothing) {
    return {
      name: "Foundation Package",
      desc: "Everything you need to launch professionally, brand identity, website, and core documentation.",
      services: ["Brand Identity (Logo + Colours + Typography)", "Multi-Page Corporate Website", "Company Profile", "Social Media Setup"],
      why: "You're starting fresh and need a complete foundation that makes you look established from day one.",
      estimatorParams: "brand-basic,multi,profile-std,social",
    };
  }

  if (stage === "growing" || outcome === "credibility") {
    return {
      name: "Growth Package",
      desc: "Elevate your existing business with a professional refresh, premium brand, powerful website, and complete documentation.",
      services: [
        hasWebsite ? "Website Redesign" : "Multi-Page Website",
        hasLogo ? "Brand Identity Refresh" : "Brand Identity",
        "Premium Company Profile",
        "Marketing Assets Pack",
        "Business Documentation",
      ],
      why: "Your business has momentum but your presentation hasn't kept up. This package closes the gap between how you operate and how you look.",
      estimatorParams: "multi,brand-premium,profile-prem,marketing,docs",
    };
  }

  if (stage === "established" || stage === "enterprise") {
    return {
      name: "Transformation Package",
      desc: "A complete ecosystem rebuild, premium brand, digital presence, documentation, strategic advisory, and ongoing support.",
      services: ["Strategic Advisory & Commercial Roadmap", "Premium Brand Identity & Guidelines", "Enterprise Website", "Premium Company Profile", "Marketing Assets Pack", "Monthly Retainer Support"],
      why: "You're ready to operate at the highest level. This package combines strategic counsel with world-class execution across every touchpoint.",
      estimatorParams: "advisory,brand-premium,multi,profile-prem,marketing,retainer",
    };
  }

  return {
    name: "Custom Strategy Package",
    desc: "Based on your specific needs, we recommend starting with a strategic advisory session to map the right path forward.",
    services: ["Strategic Advisory Session", "Business Positioning Assessment", "Custom Deliverable Mix", "Ongoing Support"],
    why: "Your situation is unique. Let's start with a strategic conversation, we'll map your goals, gaps, and the exact moves to close them.",
    estimatorParams: "advisory",
  };
}

export default function SolutionFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [complete, setComplete] = useState(false);

  const question = QUESTIONS[step];

  const handleSingle = (optionId: string) => {
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 300);
    } else {
      setTimeout(() => setComplete(true), 300);
    }
  };

  const handleMultiToggle = (optionId: string) => {
    const current = (answers[question.id] as string[]) || [];
    const updated = current.includes(optionId)
      ? current.filter((x) => x !== optionId)
      : [...current, optionId];
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
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Solution Finder</span>
          </div>
          <h1 className="display-xl mb-4" style={{ maxWidth: "18ch" }}>
            Find Your<br />Perfect Solution.
          </h1>
          <p className="text-base max-w-lg" style={{ color: "var(--text-muted)" }}>
            Answer {QUESTIONS.length} questions about your business and receive a tailored recommendation in under 2 minutes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="label-mono">
                {complete ? "Complete" : `Question ${step + 1} of ${QUESTIONS.length}`}
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
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <HolographicCard className="p-8">
                  <h2 className="display-md mb-6">{question.text}</h2>
                  {question.type === "multi" && (
                    <p className="label-mono mb-5" style={{ color: "var(--text-muted)" }}>
                      Select all that apply
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {question.options.map((opt) => {
                      const selected = question.type === "single"
                        ? answers[question.id] === opt.id
                        : ((answers[question.id] as string[]) || []).includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() =>
                            question.type === "single"
                              ? handleSingle(opt.id)
                              : handleMultiToggle(opt.id)
                          }
                          data-cursor="SELECT"
                          className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
                          style={{
                            background: selected ? "rgba(223,255,0,0.08)" : "rgba(255,255,255,0.03)",
                            border: selected ? "1px solid rgba(223,255,0,0.4)" : "1px solid var(--border-subtle)",
                          }}
                        >
                          <span style={{ color: selected ? "var(--accent)" : "var(--text-muted)", fontSize: "1.2rem" }}>
                            {opt.icon}
                          </span>
                          <span className="font-medium text-sm">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {question.type === "multi" && (
                    <button
                      onClick={handleMultiNext}
                      className="btn-accent w-full justify-center text-xs py-3"
                      data-cursor="NEXT"
                    >
                      {step < QUESTIONS.length - 1 ? "Next Question →" : "Get My Recommendation →"}
                    </button>
                  )}
                  {step > 0 && (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="mt-3 w-full text-center label-mono transition-colors hover:text-white"
                      style={{ color: "var(--text-muted)" }}
                      data-cursor="BACK"
                    >
                      ← Back
                    </button>
                  )}
                </HolographicCard>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HolographicCard className="p-8">
                  <div className="label-mono mb-3" style={{ color: "var(--accent)" }}>
                    Your Recommended Solution
                  </div>
                  <h2 className="font-bold text-2xl mb-2">{recommendation?.name}</h2>
                  <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                    {recommendation?.desc}
                  </p>

                  <div className="mb-6">
                    <div className="label-mono mb-3">What&apos;s Included</div>
                    <div className="flex flex-col gap-2">
                      {recommendation?.services.map((s) => (
                        <div key={s} className="flex items-center gap-3 text-sm">
                          <span style={{ color: "var(--accent)" }}>✓</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-lg mb-6"
                    style={{ background: "rgba(223,255,0,0.05)", border: "1px solid rgba(223,255,0,0.2)" }}
                  >
                    <div className="label-mono mb-2" style={{ color: "var(--accent)" }}>Why This Fits You</div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {recommendation?.why}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <MagneticButton href="/contact" variant="accent" data-cursor="START">
                      Book Discovery Call →
                    </MagneticButton>
                    <Link
                      href={`/tools/estimator${recommendation?.estimatorParams ? `?preset=${encodeURIComponent(recommendation.estimatorParams)}` : ""}`}
                      className="btn-outline text-center"
                      data-cursor="OPEN"
                    >
                      Estimate Cost
                    </Link>
                  </div>

                  <button
                    onClick={() => { setStep(0); setAnswers({}); setComplete(false); }}
                    className="mt-4 w-full text-center label-mono transition-colors hover:text-white"
                    style={{ color: "var(--text-muted)" }}
                    data-cursor="RESTART"
                  >
                    ↺ Start Over
                  </button>
                </HolographicCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {complete && recommendation && (
        <ToolContactForm
          toolName="Solution Finder"
          toolSummary={`Recommended: ${recommendation.name}. Services: ${recommendation.services.join(", ")}. Reason: ${recommendation.why}`}
          summaryLabel={`Recommended Package: ${recommendation.name}`}
        />
      )}
    </div>
  );
}
