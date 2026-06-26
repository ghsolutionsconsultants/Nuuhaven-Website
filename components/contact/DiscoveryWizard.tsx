"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HolographicCard from "@/components/ui/HolographicCard";

type Stage = "startup" | "growing" | "established" | "enterprise";
type Challenge = "brand" | "website" | "documentation" | "marketing" | "growth" | "automation";
type Goal = "leads" | "credibility" | "investors" | "brand" | "sales";
type Timeline = "immediate" | "30days" | "90days" | "6months";

interface FormData {
  stage: Stage | null;
  challenges: Challenge[];
  goals: Goal[];
  timeline: Timeline | null;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const STAGES = [
  { id: "startup", label: "Startup", desc: "Building from the ground up" },
  { id: "growing", label: "Growing Business", desc: "Need a more professional presence" },
  { id: "established", label: "Established Business", desc: "Ready for a strategic upgrade" },
  { id: "enterprise", label: "Enterprise", desc: "Ongoing strategic partnership" },
] as const;

const CHALLENGES = [
  { id: "brand", label: "No Professional Brand Identity" },
  { id: "website", label: "No Website or Outdated Website" },
  { id: "documentation", label: "No Company Profile or Proposals" },
  { id: "marketing", label: "Inconsistent Marketing Materials" },
  { id: "growth", label: "Not Attracting Enough Clients" },
  { id: "automation", label: "Need to Automate Business Processes" },
] as const;

const GOALS = [
  { id: "leads", label: "Generate More Leads" },
  { id: "credibility", label: "Build Credibility" },
  { id: "investors", label: "Attract Investors" },
  { id: "brand", label: "Build Brand Recognition" },
  { id: "sales", label: "Increase Sales" },
] as const;

const TIMELINES = [
  { id: "immediate", label: "As Soon As Possible" },
  { id: "30days", label: "Within 30 Days" },
  { id: "90days", label: "Within 90 Days" },
  { id: "6months", label: "Within 6 Months" },
] as const;

function getRecommendation(data: FormData) {
  const services: string[] = [];
  if (data.challenges.includes("brand")) services.push("Brand Identity Development");
  if (data.challenges.includes("website")) services.push("Website Design & Development");
  if (data.challenges.includes("documentation")) services.push("Company Profile & Documentation");
  if (data.challenges.includes("marketing")) services.push("Marketing Assets Pack");
  if (data.stage === "enterprise") services.push("Monthly Retainer Support");
  return services.length > 0 ? services : ["Discovery & Strategy Session"];
}

export default function DiscoveryWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<FormData>({
    stage: null,
    challenges: [],
    goals: [],
    timeline: null,
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const recommendation = getRecommendation(data);
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recommendation }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email tshepang@nuuhaven.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center section"
        style={{ background: "var(--bg-primary)", paddingTop: 64 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="text-5xl mb-6" style={{ color: "var(--accent)" }}>◉</div>
          <h1 className="display-md mb-4">Discovery Session Booked.</h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            Thank you, {data.name}. Tshepang will be in touch within 24 hours to confirm your session. We&apos;re looking forward to understanding your business.
          </p>
          <div className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <div>📧 Confirmation sent to {data.email}</div>
            <div>⏱ Response within 24 hours</div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner max-w-3xl mx-auto">
          <div className="accent-line">
            <span className="label-mono">Discovery Session</span>
          </div>
          <h1 className="display-xl mb-4" style={{ maxWidth: "18ch" }}>
            Let&apos;s Understand<br />Your Business.
          </h1>
          <p className="text-base max-w-lg" style={{ color: "var(--text-muted)" }}>
            Answer {totalSteps} quick questions and we&apos;ll prepare for your discovery session with a clear picture of your needs.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="label-mono">Step {Math.min(step + 1, totalSteps)} of {totalSteps}</span>
              <span className="label-mono" style={{ color: "var(--accent)" }}>{Math.round(progress)}%</span>
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
            {/* Step 0, Business Stage */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <HolographicCard className="p-8">
                  <h2 className="display-md mb-8">What stage is your business at?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STAGES.map((s) => (
                      <button key={s.id} onClick={() => { setData((d) => ({ ...d, stage: s.id })); setStep(1); }} data-cursor="SELECT"
                        className="p-5 rounded-xl text-left transition-all duration-200 hover:border-accent"
                        style={{ background: data.stage === s.id ? "rgba(223,255,0,0.08)" : "rgba(255,255,255,0.03)", border: data.stage === s.id ? "1px solid rgba(223,255,0,0.4)" : "1px solid var(--border-subtle)" }}>
                        <div className="font-bold mb-1">{s.label}</div>
                        <div className="text-sm" style={{ color: "var(--text-muted)" }}>{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </HolographicCard>
              </motion.div>
            )}

            {/* Step 1, Challenges */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <HolographicCard className="p-8">
                  <h2 className="display-md mb-3">What challenges are you facing?</h2>
                  <p className="label-mono mb-6">Select all that apply</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {CHALLENGES.map((c) => {
                      const sel = data.challenges.includes(c.id);
                      return (
                        <button key={c.id} onClick={() => setData((d) => ({ ...d, challenges: sel ? d.challenges.filter((x) => x !== c.id) : [...d.challenges, c.id] }))} data-cursor="SELECT"
                          className="p-4 rounded-xl text-left text-sm transition-all duration-200 flex items-center gap-3"
                          style={{ background: sel ? "rgba(223,255,0,0.06)" : "rgba(255,255,255,0.03)", border: sel ? "1px solid rgba(223,255,0,0.4)" : "1px solid var(--border-subtle)" }}>
                          <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold"
                            style={{ background: sel ? "var(--accent)" : "rgba(255,255,255,0.05)", color: sel ? "#000" : "var(--text-muted)" }}>
                            {sel ? "✓" : "+"}
                          </div>
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(0)} className="btn-outline flex-1 justify-center text-xs py-3" data-cursor="BACK">← Back</button>
                    <button onClick={() => setStep(2)} className="btn-accent flex-1 justify-center text-xs py-3" data-cursor="NEXT">Next →</button>
                  </div>
                </HolographicCard>
              </motion.div>
            )}

            {/* Step 2, Goals */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <HolographicCard className="p-8">
                  <h2 className="display-md mb-3">What are your primary goals?</h2>
                  <p className="label-mono mb-6">Select your top priorities</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {GOALS.map((g) => {
                      const sel = data.goals.includes(g.id);
                      return (
                        <button key={g.id} onClick={() => setData((d) => ({ ...d, goals: sel ? d.goals.filter((x) => x !== g.id) : [...d.goals, g.id] }))} data-cursor="SELECT"
                          className="p-4 rounded-xl text-left text-sm transition-all duration-200 flex items-center gap-3"
                          style={{ background: sel ? "rgba(223,255,0,0.06)" : "rgba(255,255,255,0.03)", border: sel ? "1px solid rgba(223,255,0,0.4)" : "1px solid var(--border-subtle)" }}>
                          <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold"
                            style={{ background: sel ? "var(--accent)" : "rgba(255,255,255,0.05)", color: sel ? "#000" : "var(--text-muted)" }}>
                            {sel ? "✓" : "+"}
                          </div>
                          {g.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-outline flex-1 justify-center text-xs py-3" data-cursor="BACK">← Back</button>
                    <button onClick={() => setStep(3)} className="btn-accent flex-1 justify-center text-xs py-3" data-cursor="NEXT">Next →</button>
                  </div>
                </HolographicCard>
              </motion.div>
            )}

            {/* Step 3, Timeline */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <HolographicCard className="p-8">
                  <h2 className="display-md mb-8">What&apos;s your timeline?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {TIMELINES.map((t) => (
                      <button key={t.id} onClick={() => { setData((d) => ({ ...d, timeline: t.id })); setStep(4); }} data-cursor="SELECT"
                        className="p-5 rounded-xl text-left transition-all duration-200 font-medium"
                        style={{ background: data.timeline === t.id ? "rgba(223,255,0,0.08)" : "rgba(255,255,255,0.03)", border: data.timeline === t.id ? "1px solid rgba(223,255,0,0.4)" : "1px solid var(--border-subtle)" }}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(2)} className="btn-outline w-full justify-center text-xs py-3" data-cursor="BACK">← Back</button>
                </HolographicCard>
              </motion.div>
            )}

            {/* Step 4, Recommendation + Contact */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="space-y-5">
                  {/* Recommendation */}
                  <HolographicCard className="p-6">
                    <div className="label-mono mb-2" style={{ color: "var(--accent)" }}>Based on your answers</div>
                    <h3 className="font-bold text-lg mb-4">Recommended Services</h3>
                    <div className="flex flex-col gap-2">
                      {recommendation.map((s) => (
                        <div key={s} className="flex items-center gap-3 text-sm">
                          <span style={{ color: "var(--accent)" }}>✓</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </HolographicCard>

                  {/* Contact form */}
                  <HolographicCard className="p-6">
                    <h3 className="font-bold text-lg mb-5">Your Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="label-mono mb-2 block">Full Name *</label>
                        <input
                          type="text"
                          value={data.name}
                          onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-lg text-sm"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "var(--text)", outline: "none" }}
                        />
                      </div>
                      <div>
                        <label className="label-mono mb-2 block">Email Address *</label>
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-lg text-sm"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "var(--text)", outline: "none" }}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="label-mono mb-2 block">Phone Number</label>
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                        placeholder="+27 ..."
                        className="w-full px-4 py-3 rounded-lg text-sm"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "var(--text)", outline: "none" }}
                      />
                    </div>
                    <div className="mb-6">
                      <label className="label-mono mb-2 block">Tell Us About Your Business</label>
                      <textarea
                        value={data.message}
                        onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                        placeholder="Brief description of your business and what you're hoping to achieve..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg text-sm resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "var(--text)", outline: "none" }}
                      />
                    </div>

                    {error && (
                      <p className="text-sm mb-4" style={{ color: "#ff4444" }}>{error}</p>
                    )}

                    <div className="flex gap-3">
                      <button onClick={() => setStep(3)} className="btn-outline px-6 text-xs py-3" data-cursor="BACK">← Back</button>
                      <button
                        onClick={handleSubmit}
                        disabled={!data.name || !data.email || submitting}
                        className="btn-accent flex-1 justify-center text-xs py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        data-cursor="SEND"
                      >
                        {submitting ? "Sending..." : "Book Discovery Session →"}
                      </button>
                    </div>
                  </HolographicCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
