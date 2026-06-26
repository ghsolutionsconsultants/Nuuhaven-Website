"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ToolContactFormProps {
  toolName: string;
  toolSummary: string;
  summaryLabel?: string;
  inline?: boolean;
  onReset?: () => void;
}

function FormContent({ toolName, toolSummary, summaryLabel, onReset }: Omit<ToolContactFormProps, "inline">) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xpqgdzwy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ type: "tool", toolName, toolSummary, ...form }),
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
    borderRadius: 6,
    padding: "0.875rem 1rem",
    color: "var(--text)",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", padding: "3rem 2rem" }}
        >
          <div style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1.25rem" }}>◆</div>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
            Results Sent.
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: "26rem", margin: "0 auto 2.5rem" }}>
            We&apos;ve received your {toolName} results. Tshepang will personally review them and respond within 24 hours with specific recommendations.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/work" className="btn-accent" style={{ fontSize: "0.8rem" }}>See Our Work →</Link>
            {onReset && (
              <button onClick={onReset} className="btn-outline" style={{ fontSize: "0.8rem" }}>Start Over ↺</button>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div key="form">
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "0.625rem" }}>
              Get a Personal Response to Your Results
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.75 }}>
              Send your results directly to us. Tshepang will review them personally and respond within 24 hours with a specific plan.
            </p>
          </div>

          {summaryLabel && (
            <div style={{
              background: "rgba(223,255,0,0.04)",
              border: "1px solid rgba(223,255,0,0.12)",
              borderRadius: 8,
              padding: "1rem 1.25rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <span style={{ color: "var(--accent)", fontSize: "0.7rem" }}>◆</span>
              <div>
                <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.25rem" }}>Your {toolName} Results</div>
                <div style={{ color: "var(--accent)", fontSize: "0.82rem", fontWeight: 600 }}>{summaryLabel}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { id: "name", label: "Full Name *", type: "text", required: true, placeholder: "Jane Smith" },
                { id: "email", label: "Email Address *", type: "email", required: true, placeholder: "jane@business.co.za" },
                { id: "phone", label: "Phone Number", type: "tel", required: false, placeholder: "+27 82 000 0000" },
                { id: "company", label: "Business Name", type: "text", required: false, placeholder: "Your Business" },
              ].map(f => (
                <div key={f.id}>
                  <label style={{ display: "block", fontSize: "0.62rem", color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={(form as Record<string, string>)[f.id]}
                    onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.45)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              ))}
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.62rem", color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                Anything else to add? (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Context about your business, specific concerns, or questions…"
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.45)"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>

            {status === "error" && (
              <div style={{ color: "#ff6b6b", fontSize: "0.82rem", padding: "0.75rem 1rem", background: "rgba(255,107,107,0.08)", borderRadius: 6, border: "1px solid rgba(255,107,107,0.2)" }}>
                Something went wrong. Email us at tshepang@nuuhaven.com
              </div>
            )}

            {/* Conflict of Interest Notice */}
            <div style={{ background: "rgba(255,200,0,0.04)", border: "1px solid rgba(255,200,0,0.2)", borderRadius: 8, padding: "1rem 1.125rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <span style={{ color: "#ffc800", fontSize: "0.7rem", fontWeight: 900, flexShrink: 0, marginTop: "0.1rem" }}>!</span>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", lineHeight: 1.8, margin: 0 }}>
                <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Conflict of Interest Notice:</strong> Nuuhaven operates alongside a primary role at one of the Big 4 (debt &amp; capital advisory). All enquiries are assessed for conflicts before engagement. <strong style={{ color: "#ffc800", fontWeight: 600 }}>We reserve the right to decline or terminate any engagement at any stage — including after acceptance — if a conflict is identified.</strong>
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", paddingTop: "0.25rem" }}>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-accent"
                style={{ padding: "0.9rem 2.25rem", fontSize: "0.875rem", opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? "Sending…" : "Send My Results & Get a Plan →"}
              </button>
              <p style={{ color: "var(--text-muted)", fontSize: "0.7rem", lineHeight: 1.6 }}>
                Replied within 24 hours · Subject to conflict assessment
              </p>
            </div>

            {onReset && (
              <div style={{ paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "0.25rem" }}>
                <button
                  type="button"
                  onClick={onReset}
                  style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", background: "none", border: "none", cursor: "pointer" }}
                >
                  ↺ Start Over
                </button>
              </div>
            )}
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ToolContactForm({ toolName, toolSummary, summaryLabel, inline, onReset }: ToolContactFormProps) {
  if (inline) {
    return (
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "2rem", marginTop: "2rem" }}>
        <FormContent toolName={toolName} toolSummary={toolSummary} summaryLabel={summaryLabel} onReset={onReset} />
      </div>
    );
  }

  return (
    <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner" style={{ maxWidth: "52rem" }}>
        <div className="accent-line">
          <span className="label-mono">Next Steps</span>
        </div>
        <h2 className="display-xl mb-4" style={{ maxWidth: "16ch" }}>
          Ready To Take<br />Action?
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "34rem" }}>
          Your results are in. Send them directly to us, together with your contact details, and we&apos;ll come back to you within 24 hours with a clear, specific plan.
        </p>
        <FormContent toolName={toolName} toolSummary={toolSummary} summaryLabel={summaryLabel} onReset={onReset} />
      </div>
    </section>
  );
}
