"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HolographicCard from "@/components/ui/HolographicCard";

const SERVICES = [
  { icon: "◎", label: "Website Development" },
  { icon: "◈", label: "Brand Development" },
  { icon: "◳", label: "Company Profile" },
  { icon: "◐", label: "Marketing Assets" },
  { icon: "◑", label: "Strategic Marketing" },
  { icon: "◉", label: "Retainer Support" },
  { icon: "◆", label: "Strategic Advisory" },
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
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    service: "", budget: "", timeline: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...form }),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 6,
    padding: "0.875rem 1rem",
    color: "var(--text)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>

      {/* ── Hero ── */}
      <section className="section relative overflow-hidden noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <div className="accent-line">
                <span className="label-mono">Start A Conversation</span>
              </div>
              <h1 className="display-xl mb-6" style={{ maxWidth: "14ch" }}>
                Let's Build<br />Something<br />
                <span style={{ color: "var(--accent)" }}>That Lasts.</span>
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.85, maxWidth: "34rem", marginBottom: "1.5rem" }}>
                Tell us about your business and what you need. We respond to every enquiry within 24 hours and approach every conversation as a strategic partner, not a vendor.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.85, maxWidth: "34rem", marginBottom: "2.5rem" }}>
                Not sure what you need? Start with one of our{" "}
                <Link href="/tools" style={{ color: "var(--accent)", textDecoration: "none" }}>free diagnostic tools</Link>
                {" "}and come back with the insights.
              </p>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { label: "Email", value: "tshepang@nuuhaven.com", href: "mailto:tshepang@nuuhaven.com" },
                  { label: "Phone", value: "+27 67 717 9269", href: "tel:+27677179269" },
                  { label: "Location", value: "South Africa, Available Worldwide", href: null },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                    <div style={{ width: "5rem", fontSize: "0.7rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} style={{ color: "var(--accent)", fontSize: "0.9rem", textDecoration: "none" }}>{item.value}</a>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Response promise */}
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 self-center">
              {[
                { icon: "◎", title: "24-Hour Response", desc: "Every enquiry gets a personal response within one business day, no automated holding patterns." },
                { icon: "◈", title: "No Sales Pressure", desc: "We'll tell you exactly what you need and what it costs, clearly, without the runaround." },
                { icon: "◐", title: "Strategic First", desc: "Before we quote, we understand. Every engagement starts with understanding your business goals." },
                { icon: "◉", title: "Fixed-Price Projects", desc: "No hour-counting. We agree on scope, timeline, and price upfront, then we deliver." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <HolographicCard style={{ padding: "1.75rem", height: "100%" }}>
                    <div style={{ color: "var(--accent)", fontSize: "1.25rem", marginBottom: "0.875rem" }}>{item.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>{item.title}</div>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.825rem", lineHeight: 1.75 }}>{item.desc}</p>
                  </HolographicCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "flex-start" }}>

            {/* Left context */}
            <div>
              <div className="accent-line">
                <span className="label-mono">The Enquiry</span>
              </div>
              <h2 className="display-xl mb-6" style={{ maxWidth: "12ch" }}>
                Tell Us<br />About Your<br />Business.
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.85, marginBottom: "2rem" }}>
                The more context you give us, the better positioned we'll be to provide a meaningful response, not a generic quote.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {[
                  { step: "01", title: "Submit your enquiry", desc: "Fill in the form with as much detail as you can." },
                  { step: "02", title: "We review & respond", desc: "Within 24 hours, you'll hear from Tshepang personally." },
                  { step: "03", title: "Discovery conversation", desc: "A focused call to understand your goals and define the project scope." },
                  { step: "04", title: "Proposal & timeline", desc: "A clear proposal with fixed pricing, no hourly surprises." },
                ].map(item => (
                  <div key={item.step} style={{ display: "flex", gap: "1.25rem" }}>
                    <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(223,255,0,0.08)", border: "1px solid rgba(223,255,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.65rem", fontFamily: "var(--font-geist-mono)", color: "var(--accent)", fontWeight: 700 }}>
                      {item.step}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.25rem" }}>{item.title}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.7 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: "center", padding: "4rem 2rem" }}
                  >
                    <div style={{ fontSize: "3rem", color: "var(--accent)", marginBottom: "1.5rem" }}>◆</div>
                    <h3 className="display-xl mb-4" style={{ maxWidth: "16ch", margin: "0 auto 1rem" }}>Enquiry Received.</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: "26rem", margin: "0 auto 2.5rem" }}>
                      Thank you for reaching out. Tshepang will personally review your enquiry and get back to you within 24 hours.
                    </p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                      <Link href="/tools" className="btn-outline" style={{ fontSize: "0.8rem" }}>Explore Our Tools</Link>
                      <Link href="/work" className="btn-accent" style={{ fontSize: "0.8rem" }}>See Our Work →</Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {/* Personal */}
                    <div>
                      <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Your Details</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                        {[
                          { id: "name", label: "Full Name *", type: "text", required: true, placeholder: "John Smith" },
                          { id: "email", label: "Email Address *", type: "email", required: true, placeholder: "john@company.co.za" },
                          { id: "phone", label: "Phone Number", type: "tel", required: false, placeholder: "+27 82 000 0000" },
                          { id: "company", label: "Business Name", type: "text", required: false, placeholder: "Your Business (Pty) Ltd" },
                        ].map(f => (
                          <div key={f.id}>
                            <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.45rem" }}>
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
                      <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Service Required</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.6rem" }}>
                        {SERVICES.map(s => {
                          const sel = form.service === s.label;
                          return (
                            <button
                              key={s.label}
                              type="button"
                              onClick={() => setForm(p => ({ ...p, service: s.label }))}
                              style={{
                                padding: "0.7rem 0.875rem", textAlign: "left", borderRadius: 7, fontSize: "0.8rem",
                                background: sel ? "rgba(223,255,0,0.08)" : "rgba(255,255,255,0.03)",
                                border: sel ? "1px solid rgba(223,255,0,0.4)" : "1px solid rgba(255,255,255,0.08)",
                                color: sel ? "var(--accent)" : "rgba(255,255,255,0.6)",
                                cursor: "pointer", transition: "all 0.2s",
                                display: "flex", alignItems: "center", gap: "0.5rem",
                              }}
                            >
                              <span>{s.icon}</span> {s.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                      <div>
                        <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Budget Range</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          {BUDGETS.map(b => {
                            const sel = form.budget === b;
                            return (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setForm(p => ({ ...p, budget: b }))}
                                style={{
                                  padding: "0.55rem 0.875rem", textAlign: "left", borderRadius: 6, fontSize: "0.8rem",
                                  background: sel ? "rgba(223,255,0,0.08)" : "transparent",
                                  border: sel ? "1px solid rgba(223,255,0,0.35)" : "1px solid rgba(255,255,255,0.07)",
                                  color: sel ? "var(--accent)" : "rgba(255,255,255,0.55)",
                                  cursor: "pointer", transition: "all 0.2s",
                                }}
                              >
                                {sel ? "◆ " : ""}{b}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Timeline</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          {TIMELINES.map(t => {
                            const sel = form.timeline === t;
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setForm(p => ({ ...p, timeline: t }))}
                                style={{
                                  padding: "0.55rem 0.875rem", textAlign: "left", borderRadius: 6, fontSize: "0.8rem",
                                  background: sel ? "rgba(223,255,0,0.08)" : "transparent",
                                  border: sel ? "1px solid rgba(223,255,0,0.35)" : "1px solid rgba(255,255,255,0.07)",
                                  color: sel ? "var(--accent)" : "rgba(255,255,255,0.55)",
                                  cursor: "pointer", transition: "all 0.2s",
                                }}
                              >
                                {sel ? "◆ " : ""}{t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>Your Message</div>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your business, the challenge you're trying to solve, and what a successful outcome looks like for you. The more specific, the better."
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                        onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.5)"}
                        onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                      />
                    </div>

                    {status === "error" && (
                      <div style={{ color: "#ff6b6b", fontSize: "0.85rem", padding: "0.75rem 1rem", background: "rgba(255,107,107,0.08)", borderRadius: 6, border: "1px solid rgba(255,107,107,0.2)" }}>
                        Something went wrong. Please email us directly at tshepang@nuuhaven.com
                      </div>
                    )}

                    <div>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-accent"
                        style={{ padding: "1rem 2.5rem", fontSize: "0.875rem", opacity: status === "sending" ? 0.7 : 1 }}
                      >
                        {status === "sending" ? "Sending…" : "Send Enquiry →"}
                      </button>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "1rem", lineHeight: 1.7 }}>
                        By submitting you agree we may contact you regarding your enquiry. We respect your privacy and never share your details.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Alternatives ── */}
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Not Ready Yet?</span>
          </div>
          <h2 className="display-xl mb-10" style={{ maxWidth: "18ch" }}>
            Start With<br />A Free Tool.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {[
              { href: "/tools/assessment", icon: "◐", title: "Business Assessment", desc: "Get a credibility score in under 2 minutes." },
              { href: "/tools/solution-finder", icon: "◎", title: "Solution Finder", desc: "Discover exactly what your business needs." },
              { href: "/tools/estimator", icon: "◈", title: "Cost Estimator", desc: "Understand the investment before you commit." },
              { href: "/tools/impressions-audit", icon: "◉", title: "First Impressions Audit", desc: "See yourself through a client's eyes." },
            ].map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                style={{ textDecoration: "none", display: "block" }}
              >
                <HolographicCard style={{ padding: "1.75rem", height: "100%", transition: "transform 0.2s" }}>
                  <div style={{ color: "var(--accent)", fontSize: "1.25rem", marginBottom: "1rem" }}>{tool.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem", color: "var(--text)" }}>{tool.title}</div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.825rem", lineHeight: 1.7 }}>{tool.desc}</p>
                  <div style={{ marginTop: "1rem", color: "var(--accent)", fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em" }}>
                    Start free →
                  </div>
                </HolographicCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
