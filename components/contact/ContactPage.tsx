"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

const SERVICES = [
  { icon: "◎", label: "Website Development" },
  { icon: "◈", label: "Brand Development" },
  { icon: "◳", label: "Company Profile" },
  { icon: "◐", label: "Marketing Assets" },
  { icon: "◑", label: "Strategic Marketing" },
  { icon: "◉", label: "Retainer Support" },
  { icon: "◆", label: "Strategic Advisory" },
  { icon: "◳", label: "Proposal Development" },
  { icon: "◌", label: "Full Ecosystem Package" },
];

const BUDGETS = [
  "Under R 5,000",
  "R 5,000 – R 15,000",
  "R 15,000 – R 30,000",
  "R 30,000 – R 60,000",
  "R 60,000+",
  "Let's discuss",
];

const TIMELINES = [
  "ASAP, urgent",
  "Within 2 weeks",
  "Within a month",
  "1–3 months",
  "Flexible",
];

export default function ContactPage() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    service: "", budget: "", timeline: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xpqgdzwy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ type: "contact", ...form }),
      });
      const json = await res.json();
      if (json.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "1rem 1.125rem",
    color: "var(--text)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
    lineHeight: 1.5,
  };

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>

      {/* ── Hero ── */}
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "5rem", alignItems: "start" }}>
            <div>
              <div className="accent-line">
                <span className="label-mono">Start A Conversation</span>
              </div>
              <h1 className="display-xl" style={{ marginBottom: "1.75rem", maxWidth: "14ch" }}>
                Let&apos;s Build<br />Something<br />
                <span style={{ color: "var(--accent)" }}>That Lasts.</span>
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.9, marginBottom: "1.25rem", maxWidth: "34rem" }}>
                Tell us about your business and what you need. We respond to every enquiry within 24 hours and approach every conversation as a strategic partner, not a vendor.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.9, maxWidth: "34rem", marginBottom: "2.5rem" }}>
                Not sure what you need?{" "}
                <Link href="/tools" style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid rgba(223,255,0,0.3)" }}>
                  Start with our free diagnostic tools
                </Link>
                {" "}and come back with the insights.
              </p>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Email", value: "tshepang@nuuhaven.com", href: "mailto:tshepang@nuuhaven.com" },
                  { label: "Phone", value: "+27 67 717 9269", href: "tel:+27677179269" },
                  { label: "Location", value: "South Africa · Available Worldwide", href: null },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: "1.5rem", alignItems: "center", padding: "0.875rem 1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ width: "4.5rem", fontSize: "0.62rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} style={{ color: "var(--accent)", fontSize: "0.9rem", textDecoration: "none", fontWeight: 500 }}>{item.value}</a>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Promise cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { icon: "◎", title: "24-Hour Response", desc: "Every enquiry gets a personal response within one business day. No automated holding patterns." },
                { icon: "◈", title: "No Sales Pressure", desc: "We'll tell you exactly what you need and what it costs. Clearly. No runaround." },
                { icon: "◐", title: "Strategic First", desc: "Before we quote, we understand. Every engagement starts with your business goals." },
                { icon: "◉", title: "Fixed-Price Projects", desc: "No hour-counting. We agree on scope, timeline, and price upfront — then we deliver." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{ padding: "1.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div style={{ color: "var(--accent)", fontSize: "1.4rem", marginBottom: "1rem" }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.625rem", lineHeight: 1.2 }}>{item.title}</div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.75 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="section">
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "360px 1fr", gap: isMobile ? "3rem" : "5rem", alignItems: "flex-start" }}>

            {/* Left: process */}
            <div style={{ position: isMobile ? "static" : "sticky", top: 100 }}>
              <div className="accent-line">
                <span className="label-mono">What happens next</span>
              </div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                From Enquiry<br />to Proposal<br /><span style={{ color: "var(--accent)" }}>in 4 Steps.</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.85, marginBottom: "2.5rem" }}>
                The more context you give us, the better positioned we&apos;ll be to provide a meaningful response — not a generic quote.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { step: "01", title: "Submit your enquiry", desc: "Fill in the form with as much detail as you can. More context means a more relevant response." },
                  { step: "02", title: "Personal review", desc: "Within 24 hours, Tshepang personally reviews your enquiry — no templates, no assistants." },
                  { step: "03", title: "Discovery conversation", desc: "A focused 30-minute call to understand your goals and define the exact scope needed." },
                  { step: "04", title: "Clear proposal", desc: "Fixed pricing, defined timeline, and a clear deliverable list. No surprises." },
                ].map((item, i, arr) => (
                  <div key={item.step} style={{ display: "flex", gap: "1.25rem", position: "relative" }}>
                    {/* Vertical connector line */}
                    {i < arr.length - 1 && (
                      <div style={{ position: "absolute", left: "1rem", top: "2.5rem", bottom: "-1rem", width: 1, background: "rgba(255,255,255,0.07)" }} />
                    )}
                    <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(223,255,0,0.08)", border: "1px solid rgba(223,255,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.6rem", fontFamily: "var(--font-geist-mono)", color: "var(--accent)", fontWeight: 700, zIndex: 1 }}>
                      {item.step}
                    </div>
                    <div style={{ paddingBottom: i < arr.length - 1 ? "2rem" : 0 }}>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.375rem", marginTop: "0.3rem" }}>{item.title}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.7 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div>
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: "center", padding: "5rem 2rem", background: "rgba(10,10,10,0.98)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div style={{ fontSize: "3rem", color: "var(--accent)", marginBottom: "1.5rem" }}>◆</div>
                    <h3 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "1rem" }}>Enquiry Received.</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.85, maxWidth: "28rem", margin: "0 auto 2.5rem" }}>
                      Thank you for reaching out. Tshepang will personally review your enquiry and respond within 24 hours.
                    </p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                      <Link href="/tools" className="btn-outline" style={{ fontSize: "0.8rem" }}>Explore Our Tools</Link>
                      <Link href="/work" className="btn-accent" style={{ fontSize: "0.8rem" }}>See Our Work →</Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "2rem", background: "rgba(10,10,10,0.98)", padding: "2.5rem", borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Personal details */}
                    <div>
                      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        Your Details
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                        {[
                          { id: "name", label: "Full Name *", type: "text", required: true, placeholder: "John Smith" },
                          { id: "email", label: "Email Address *", type: "email", required: true, placeholder: "john@company.co.za" },
                          { id: "phone", label: "Phone Number", type: "tel", required: false, placeholder: "+27 82 000 0000" },
                          { id: "company", label: "Business Name", type: "text", required: false, placeholder: "Your Business (Pty) Ltd" },
                        ].map(f => (
                          <div key={f.id}>
                            <label style={{ display: "block", fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                              {f.label}
                            </label>
                            <input
                              type={f.type}
                              required={f.required}
                              placeholder={f.placeholder}
                              value={(form as Record<string, string>)[f.id]}
                              onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                              style={inputStyle}
                              onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.5)"}
                              onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        Service Required
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "0.625rem" }}>
                        {SERVICES.map(s => {
                          const sel = form.service === s.label;
                          return (
                            <button
                              key={s.label}
                              type="button"
                              onClick={() => setForm(p => ({ ...p, service: s.label }))}
                              style={{
                                padding: "0.875rem 1rem", textAlign: "left", borderRadius: 8, fontSize: "0.82rem",
                                background: sel ? "rgba(223,255,0,0.07)" : "rgba(255,255,255,0.025)",
                                border: sel ? "1px solid rgba(223,255,0,0.4)" : "1px solid rgba(255,255,255,0.07)",
                                color: sel ? "var(--accent)" : "rgba(255,255,255,0.55)",
                                cursor: "pointer", transition: "all 0.2s",
                                display: "flex", alignItems: "center", gap: "0.625rem",
                                fontWeight: sel ? 600 : 400,
                              }}
                            >
                              <span style={{ opacity: sel ? 1 : 0.5 }}>{s.icon}</span>
                              {s.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem" }}>
                      <div>
                        <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          Budget Range
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          {BUDGETS.map(b => {
                            const sel = form.budget === b;
                            return (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setForm(p => ({ ...p, budget: b }))}
                                style={{
                                  padding: "0.75rem 1rem", textAlign: "left", borderRadius: 7, fontSize: "0.82rem",
                                  background: sel ? "rgba(223,255,0,0.07)" : "transparent",
                                  border: sel ? "1px solid rgba(223,255,0,0.35)" : "1px solid rgba(255,255,255,0.07)",
                                  color: sel ? "var(--accent)" : "rgba(255,255,255,0.5)",
                                  cursor: "pointer", transition: "all 0.2s", fontWeight: sel ? 600 : 400,
                                  display: "flex", alignItems: "center", gap: "0.5rem",
                                }}
                              >
                                {sel && <span style={{ fontSize: "0.6rem" }}>◆</span>}
                                {b}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          Timeline
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          {TIMELINES.map(t => {
                            const sel = form.timeline === t;
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setForm(p => ({ ...p, timeline: t }))}
                                style={{
                                  padding: "0.75rem 1rem", textAlign: "left", borderRadius: 7, fontSize: "0.82rem",
                                  background: sel ? "rgba(223,255,0,0.07)" : "transparent",
                                  border: sel ? "1px solid rgba(223,255,0,0.35)" : "1px solid rgba(255,255,255,0.07)",
                                  color: sel ? "var(--accent)" : "rgba(255,255,255,0.5)",
                                  cursor: "pointer", transition: "all 0.2s", fontWeight: sel ? 600 : 400,
                                  display: "flex", alignItems: "center", gap: "0.5rem",
                                }}
                              >
                                {sel && <span style={{ fontSize: "0.6rem" }}>◆</span>}
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        Your Message
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: "0.875rem" }}>
                        Tell us about your business, the challenge you&apos;re trying to solve, and what a successful outcome looks like. The more specific you are, the more useful our response will be.
                      </p>
                      <textarea
                        rows={5}
                        required
                        placeholder="e.g. We're a 3-year-old logistics company that's been growing through referrals. We've landed a corporate tender opportunity but our brand doesn't reflect our actual capabilities. We need a professional company profile and website within the next 4 weeks..."
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.75 }}
                        onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.5)"}
                        onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                      />
                    </div>

                    {/* Conflict of Interest Notice */}
                    <div style={{
                      background: "rgba(255,200,0,0.04)",
                      border: "1px solid rgba(255,200,0,0.25)",
                      borderRadius: 10,
                      padding: "1.375rem 1.5rem",
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                    }}>
                      <div style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: "rgba(255,200,0,0.12)", border: "1px solid rgba(255,200,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "0.1rem" }}>
                        <span style={{ color: "#ffc800", fontSize: "0.72rem", fontWeight: 900, lineHeight: 1 }}>!</span>
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffc800", marginBottom: "0.625rem", fontWeight: 700 }}>
                          Conflict of Interest Notice — Please Read Before Submitting
                        </div>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.85, margin: 0 }}>
                          Nuuhaven is operated alongside a primary employment role at <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>one of the Big 4 professional services firms</strong>, where the principal specialises in <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>debt and capital advisory</strong>. Each enquiry and project scope is individually assessed for potential conflicts with this primary role before any engagement commences.{" "}
                          <strong style={{ color: "#ffc800", fontWeight: 600 }}>
                            Nuuhaven expressly reserves the right to decline, suspend, or terminate any engagement at any stage — including after a proposal has been accepted and work has commenced — should a conflict of interest be identified.
                          </strong>{" "}
                          Submission of this form does not constitute a guarantee of engagement. To expedite the assessment, please describe your business and industry in full detail in the message field above.
                        </p>
                      </div>
                    </div>

                    {status === "error" && (
                      <div style={{ color: "#ff6b6b", fontSize: "0.85rem", padding: "0.875rem 1.125rem", background: "rgba(255,107,107,0.07)", borderRadius: 8, border: "1px solid rgba(255,107,107,0.2)" }}>
                        Something went wrong. Please email us directly at tshepang@nuuhaven.com
                      </div>
                    )}

                    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-accent"
                        style={{ padding: "1rem 2.5rem", fontSize: "0.875rem", opacity: status === "sending" ? 0.7 : 1 }}
                      >
                        {status === "sending" ? "Sending…" : "Send Enquiry →"}
                      </button>
                      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.72rem", lineHeight: 1.6 }}>
                        We respond within 24 hours · Subject to conflict of interest assessment.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
