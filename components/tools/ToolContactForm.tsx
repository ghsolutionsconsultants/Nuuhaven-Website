"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ToolContactFormProps {
  toolName: string;
  toolSummary: string;
  /** Pre-fill hint shown above the form */
  summaryLabel?: string;
}

export default function ToolContactForm({ toolName, toolSummary, summaryLabel }: ToolContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "tool", toolName, toolSummary, ...form }),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 6,
    padding: "0.875rem 1rem",
    color: "var(--text)",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  return (
    <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner" style={{ maxWidth: "48rem" }}>
        <div className="accent-line">
          <span className="label-mono">Next Steps</span>
        </div>
        <h2 className="display-xl mb-4" style={{ maxWidth: "16ch" }}>
          Ready To Take<br />Action?
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "34rem" }}>
          Your results are in. Send them directly to us, together with your contact details, and we'll come back to you within 24 hours with a clear, specific plan to close your gaps.
        </p>

        {summaryLabel && (
          <div style={{
            background: "rgba(223,255,0,0.04)",
            border: "1px solid rgba(223,255,0,0.15)",
            borderRadius: 8,
            padding: "1.25rem 1.5rem",
            marginBottom: "2.5rem",
          }}>
            <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>Your {toolName} Results</div>
            <div style={{ color: "var(--accent)", fontSize: "0.9rem", lineHeight: 1.7 }}>{summaryLabel}</div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: "center", padding: "3.5rem 2rem" }}
            >
              <div style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1.25rem" }}>◆</div>
              <h3 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                Results Sent.
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: "26rem", margin: "0 auto 2.5rem" }}>
                We've received your {toolName} results. Tshepang will personally review them and get back to you within 24 hours with specific recommendations tailored to your situation.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/tools" className="btn-outline" style={{ fontSize: "0.8rem" }}>Explore More Tools</Link>
                <Link href="/work" className="btn-accent" style={{ fontSize: "0.8rem" }}>See Our Work →</Link>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                {[
                  { id: "name", label: "Full Name *", type: "text", required: true, placeholder: "Jane Smith" },
                  { id: "email", label: "Email Address *", type: "email", required: true, placeholder: "jane@business.co.za" },
                  { id: "phone", label: "Phone Number", type: "tel", required: false, placeholder: "+27 82 000 0000" },
                  { id: "company", label: "Business Name", type: "text", required: false, placeholder: "Your Business" },
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

              <div>
                <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.45rem" }}>
                  Anything Else You'd Like To Add? (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Context about your business, specific concerns, or questions you'd like us to address…"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.5)"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>

              {status === "error" && (
                <div style={{ color: "#ff6b6b", fontSize: "0.85rem", padding: "0.75rem 1rem", background: "rgba(255,107,107,0.08)", borderRadius: 6, border: "1px solid rgba(255,107,107,0.2)" }}>
                  Something went wrong. Please email us at tshepang@nuuhaven.com
                </div>
              )}

              <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-accent"
                  style={{ padding: "0.9rem 2rem", fontSize: "0.875rem", opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "sending" ? "Sending…" : "Send My Results →"}
                </button>
                <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", lineHeight: 1.6, maxWidth: "20rem" }}>
                  We'll respond within 24 hours. Your details are kept private and never shared.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
