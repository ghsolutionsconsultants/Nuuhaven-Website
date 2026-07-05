import React from "react";

interface Service {
  id: string;
  category: string;
  label: string;
  subLabel?: string;
  baseMin: number;
  baseMax: number;
  durationWeeks: number;
  complexity: number;
}

interface ProjectScopeReportProps {
  services: Service[];
  totalMin: number;
  totalMax: number;
  totalWeeks: number;
  complexityLevel: number;
}

const COMPLEXITY_LABELS = ["", "Starter", "Professional", "Premium", "Enterprise"];
const COMPLEXITY_DESC: Record<string, string> = {
  Starter: "A focused, efficient project. Ideal for businesses establishing their digital foundation.",
  Professional: "A multi-deliverable project with 2–3 revision rounds per deliverable. Balanced scope and quality.",
  Premium: "A high-touch project with strategic input, refined execution, and multiple revision rounds.",
  Enterprise: "A comprehensive engagement requiring close collaboration, phased delivery, and senior oversight.",
};

const CATEGORY_WHAT_DELIVERS: Record<string, string> = {
  Website: "A professionally designed online presence that builds instant credibility and converts visitors into enquiries.",
  Brand: "A visual identity system that makes your business instantly recognisable and consistently professional.",
  Documentation: "Business-grade documentation that positions you credibly in proposals, pitches, and client meetings.",
  Marketing: "Collateral and assets that activate your market presence and support your sales conversations.",
  Support: "Ongoing strategic and operational support to keep your business sharp, current, and competitive.",
};

function formatZAR(n: number) {
  return `R ${n.toLocaleString("en-ZA")}`;
}

function formatDate() {
  return new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

function generateRef() {
  const ts = Date.now().toString(36).toUpperCase().slice(-6);
  return `PSR-${ts}`;
}

const ref = generateRef();

export default function ProjectScopeReport({ services, totalMin, totalMax, totalWeeks, complexityLevel }: ProjectScopeReportProps) {
  const categories = [...new Set(services.map(s => s.category))];
  const complexityLabel = COMPLEXITY_LABELS[complexityLevel] || "Custom";

  const rStyle: React.CSSProperties = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };
  const monoStyle: React.CSSProperties = { fontFamily: "'Courier New', Courier, monospace" };

  return (
    <div style={{ ...rStyle, background: "#fff", color: "#111" }}>

      {/* Header */}
      <div style={{ background: "#111", padding: "2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ color: "#dfff00", fontWeight: 900, fontSize: "1.375rem", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>NUUHAVEN</div>
          <div style={{ ...monoStyle, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
            Digital Business Solutions
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>Project Scope Report</div>
          <div style={{ ...monoStyle, fontSize: "0.7rem", color: "#dfff00", fontWeight: 700 }}>{ref}</div>
          <div style={{ ...monoStyle, fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", marginTop: "0.2rem" }}>{formatDate()}</div>
        </div>
      </div>

      {/* Report title strip */}
      <div style={{ background: "#f5f5f5", padding: "1.25rem 2.5rem", borderBottom: "1px solid #e8e8e8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", marginBottom: "0.3rem" }}>Document Type</div>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111" }}>Project Scope & Investment Report</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginBottom: "0.3rem" }}>Services Selected</div>
          <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111" }}>{services.length}</div>
        </div>
      </div>

      {/* Executive summary */}
      <div style={{ padding: "1.75rem 2.5rem", borderBottom: "1px solid #e8e8e8", background: "#fff" }}>
        <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>Executive Summary</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
          <div style={{ padding: "1.25rem", background: "#f9f9f9", borderRadius: 8, border: "1px solid #e8e8e8" }}>
            <div style={{ ...monoStyle, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Total Investment Range</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111", lineHeight: 1.1 }}>{formatZAR(totalMin)}</div>
            <div style={{ fontSize: "0.78rem", color: "#666", marginTop: "0.2rem" }}>to {formatZAR(totalMax)}</div>
          </div>
          <div style={{ padding: "1.25rem", background: "#f9f9f9", borderRadius: 8, border: "1px solid #e8e8e8" }}>
            <div style={{ ...monoStyle, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Estimated Timeline</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111", lineHeight: 1.1 }}>{totalWeeks}</div>
            <div style={{ fontSize: "0.78rem", color: "#666", marginTop: "0.2rem" }}>week{totalWeeks !== 1 ? "s" : ""} total</div>
          </div>
          <div style={{ padding: "1.25rem", background: "#f9f9f9", borderRadius: 8, border: "1px solid #e8e8e8" }}>
            <div style={{ ...monoStyle, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Project Complexity</div>
            <div style={{ fontSize: "1rem", fontWeight: 800, color: "#111", lineHeight: 1.2 }}>{complexityLabel}</div>
            <div style={{ fontSize: "0.7rem", color: "#888", marginTop: "0.25rem", lineHeight: 1.4 }}>{COMPLEXITY_DESC[complexityLabel]?.substring(0, 40)}…</div>
          </div>
        </div>
      </div>

      {/* Complexity interpretation */}
      <div style={{ padding: "1.5rem 2.5rem", borderBottom: "1px solid #e8e8e8", background: "#fffde7" }}>
        <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#dfff00", border: "2px solid #cce000", flexShrink: 0, marginTop: "0.3rem" }} />
          <div>
            <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "#111" }}>{complexityLabel} Project — </span>
            <span style={{ fontSize: "0.82rem", color: "#444", lineHeight: 1.7 }}>{COMPLEXITY_DESC[complexityLabel] || "A bespoke project requiring tailored scoping."}</span>
          </div>
        </div>
      </div>

      {/* Services breakdown */}
      <div style={{ padding: "1.75rem 2.5rem", borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.25rem" }}>Scope of Work — Service Breakdown</div>

        {categories.map((cat, ci) => {
          const catServices = services.filter(s => s.category === cat);
          return (
            <div key={cat} style={{ marginBottom: ci < categories.length - 1 ? "1.5rem" : 0 }}>
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ width: 3, height: 14, background: "#dfff00", borderRadius: 2 }} />
                <div style={{ ...monoStyle, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#333", fontWeight: 700 }}>{cat}</div>
                <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
                <div style={{ ...monoStyle, fontSize: "0.58rem", color: "#999" }}>{CATEGORY_WHAT_DELIVERS[cat]?.substring(0, 50)}…</div>
              </div>

              {catServices.map((s, i) => (
                <div
                  key={s.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "0.875rem 1rem",
                    background: i % 2 === 0 ? "#fafafa" : "#fff",
                    borderRadius: 6,
                    marginBottom: 4,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#111", marginBottom: "0.15rem" }}>{s.label}</div>
                    {s.subLabel && <div style={{ fontSize: "0.72rem", color: "#888" }}>{s.subLabel}</div>}
                  </div>
                  <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ ...monoStyle, fontSize: "0.7rem", color: "#555", fontWeight: 600 }}>{formatZAR(s.baseMin)} – {formatZAR(s.baseMax)}</div>
                  </div>
                  <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ ...monoStyle, fontSize: "0.65rem", color: "#999" }}>{s.durationWeeks}w</div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Investment total */}
      <div style={{ padding: "1.75rem 2.5rem", borderBottom: "1px solid #e8e8e8", background: "#111" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem" }}>Total Indicative Investment</div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#dfff00", lineHeight: 1 }}>{formatZAR(totalMin)}</div>
            <div style={{ ...monoStyle, fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginTop: "0.3rem" }}>to {formatZAR(totalMax)}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.4rem" }}>Estimated Duration</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{totalWeeks} week{totalWeeks !== 1 ? "s" : ""}</div>
          </div>
        </div>
      </div>

      {/* How Nuuhaven works */}
      <div style={{ padding: "1.75rem 2.5rem", borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.25rem" }}>How We Work</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          {[
            { step: "01", title: "Discovery Session", body: "We confirm your scope, goals, and timeline in a structured session before any work begins." },
            { step: "02", title: "Fixed-Price Proposal", body: "You receive a formal proposal with exact pricing and deliverables — no surprise invoices, ever." },
            { step: "03", title: "Delivery & Handover", body: "Work is delivered in agreed phases with revision rounds built in. You own every asset." },
          ].map(({ step, title, body }) => (
            <div key={step} style={{ padding: "1.125rem", background: "#f9f9f9", borderRadius: 8, border: "1px solid #ececec" }}>
              <div style={{ ...monoStyle, fontSize: "0.62rem", color: "#dfff00", fontWeight: 700, background: "#111", display: "inline-block", padding: "0.15rem 0.45rem", borderRadius: 4, marginBottom: "0.625rem" }}>{step}</div>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.4rem" }}>{title}</div>
              <div style={{ fontSize: "0.75rem", color: "#666", lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Important notes */}
      <div style={{ padding: "1.5rem 2.5rem", borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}>
        <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>Important Notes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            "All price ranges are indicative. Final pricing is confirmed in writing after a discovery session.",
            "Nuuhaven operates on fixed-price agreements — scope and cost are agreed upfront, not billed hourly.",
            "Timelines are estimates based on standard project flow. Final timeline is confirmed at kickoff.",
            "Nuuhaven reserves the right to decline or pause any engagement if a conflict of interest is identified.",
            "This report is valid as a reference for 30 days from the date of generation.",
          ].map((note, i) => (
            <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
              <div style={{ ...monoStyle, fontSize: "0.6rem", color: "#dfff00", background: "#111", padding: "0.1rem 0.35rem", borderRadius: 3, flexShrink: 0, marginTop: "0.1rem" }}>{i + 1}</div>
              <div style={{ fontSize: "0.75rem", color: "#555", lineHeight: 1.65 }}>{note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div style={{ padding: "1.75rem 2.5rem", borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.25rem" }}>Recommended Next Steps</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {[
            { action: "Send this report to Nuuhaven", detail: "Email it to tshepang@nuuhaven.com along with your contact details to start a conversation." },
            { action: "Book a discovery session", detail: "A 30–45 minute session to confirm scope, answer questions, and agree on next steps." },
            { action: "Receive your formal proposal", detail: "A written proposal with exact pricing and a clear scope of work — within 24–48 hours of your session." },
          ].map(({ action, detail }, i) => (
            <div key={i} style={{ display: "flex", gap: "0.875rem", padding: "1rem 1.25rem", background: "#f9f9f9", borderRadius: 8, border: "1px solid #ececec" }}>
              <div style={{ ...monoStyle, fontSize: "0.65rem", fontWeight: 700, color: "#fff", background: "#111", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.2rem" }}>{action}</div>
                <div style={{ fontSize: "0.73rem", color: "#666", lineHeight: 1.55 }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#111", padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ color: "#dfff00", fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.25rem" }}>NUUHAVEN</div>
          <div style={{ ...monoStyle, fontSize: "0.58rem", color: "rgba(255,255,255,0.3)" }}>Your Digital Haven for Business</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...monoStyle, fontSize: "0.62rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.15rem" }}>tshepang@nuuhaven.com</div>
          <div style={{ ...monoStyle, fontSize: "0.62rem", color: "rgba(255,255,255,0.4)" }}>+27 67 717 9269 · nuuhaven.com</div>
        </div>
      </div>
    </div>
  );
}
