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
  Website: "Professionally designed online presence that builds instant credibility.",
  Brand: "A visual identity system that makes your business consistently recognisable.",
  Documentation: "Business-grade documentation that positions you credibly in proposals and pitches.",
  Marketing: "Collateral and assets that activate your market presence and support sales.",
  Support: "Ongoing strategic and operational support to keep your business competitive.",
};

function formatZAR(n: number) {
  return `R ${n.toLocaleString("en-ZA")}`;
}

function formatDate() {
  return new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

const ref = `PSR-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export default function ProjectScopeReport({ services, totalMin, totalMax, totalWeeks, complexityLevel }: ProjectScopeReportProps) {
  const categories = [...new Set(services.map(s => s.category))];
  const complexityLabel = COMPLEXITY_LABELS[complexityLevel] || "Custom";

  // Shared style objects
  const mono: React.CSSProperties = { fontFamily: "'Courier New', Courier, monospace" };
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };
  // Responsive horizontal padding using clamp
  const hPad = "clamp(1rem, 5vw, 2.5rem)";

  return (
    <div style={{ ...sans, background: "#fff", color: "#111" }}>

      {/* ── Dark header ─────────────────────────────── */}
      <div style={{
        background: "#111",
        padding: `1.75rem ${hPad}`,
        display: "flex", flexWrap: "wrap",
        justifyContent: "space-between", alignItems: "flex-start",
        gap: "1rem",
      }}>
        <div>
          <div style={{ color: "#dfff00", fontWeight: 900, fontSize: "1.3rem", letterSpacing: "-0.02em", marginBottom: "0.2rem" }}>NUUHAVEN</div>
          <div style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            Digital Business Solutions
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.25rem" }}>Project Scope Report</div>
          <div style={{ ...mono, fontSize: "0.7rem", color: "#dfff00", fontWeight: 700 }}>{ref}</div>
          <div style={{ ...mono, fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", marginTop: "0.15rem" }}>{formatDate()}</div>
        </div>
      </div>

      {/* ── Title strip ─────────────────────────────── */}
      <div style={{
        background: "#f5f5f5", borderBottom: "1px solid #e8e8e8",
        padding: `1.25rem ${hPad}`,
        display: "flex", flexWrap: "wrap",
        justifyContent: "space-between", alignItems: "center",
        gap: "0.75rem",
      }}>
        <div>
          <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", marginBottom: "0.25rem" }}>Document Type</div>
          <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>Project Scope & Investment Report</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginBottom: "0.25rem" }}>Services Selected</div>
          <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>{services.length}</div>
        </div>
      </div>

      {/* ── Executive summary (3 stat cards → wrap on mobile) ── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>Executive Summary</div>
        {/* flex-wrap so 3-col collapses to 1-col on narrow screens */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {[
            { label: "Total Investment Range", value: formatZAR(totalMin), sub: `to ${formatZAR(totalMax)}` },
            { label: "Estimated Timeline", value: `${totalWeeks}`, sub: `week${totalWeeks !== 1 ? "s" : ""} total` },
            { label: "Project Complexity", value: complexityLabel, sub: COMPLEXITY_DESC[complexityLabel]?.substring(0, 38) + "…" },
          ].map(item => (
            <div key={item.label} className="rc" style={{
              flex: "1 1 180px",
              padding: "1.125rem", background: "#f9f9f9",
              borderRadius: 8, border: "1px solid #e8e8e8",
            }}>
              <div style={{ ...mono, fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>{item.label}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, lineHeight: 1.1 }}>{item.value}</div>
              <div style={{ fontSize: "0.72rem", color: "#666", marginTop: "0.2rem", lineHeight: 1.4 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Complexity callout ─────────────────────── */}
      <div style={{ padding: `1.25rem ${hPad}`, borderBottom: "1px solid #e8e8e8", background: "#fffde7" }}>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#dfff00", border: "2px solid #cce000", flexShrink: 0, marginTop: "0.25rem" }} />
          <div style={{ fontSize: "0.8rem", color: "#444", lineHeight: 1.7 }}>
            <strong style={{ color: "#111" }}>{complexityLabel} Project:</strong>{" "}
            {COMPLEXITY_DESC[complexityLabel] || "A bespoke project requiring tailored scoping."}
          </div>
        </div>
      </div>

      {/* ── Services breakdown ─────────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.25rem" }}>Scope of Work: Service Breakdown</div>

        {categories.map((cat, ci) => {
          const catServices = services.filter(s => s.category === cat);
          return (
            <div key={cat} style={{ marginBottom: ci < categories.length - 1 ? "1.5rem" : 0 }}>
              {/* Category label row */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem", paddingBottom: "0.4rem", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ width: 3, height: 12, background: "#dfff00", borderRadius: 2, flexShrink: 0 }} />
                <div style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#333", fontWeight: 700 }}>{cat}</div>
                <div style={{ ...mono, fontSize: "0.52rem", color: "#bbb", marginLeft: "auto", textAlign: "right", maxWidth: "60%" }}>
                  {CATEGORY_WHAT_DELIVERS[cat]}
                </div>
              </div>

              {catServices.map((s, i) => (
                <div
                  key={s.id}
                  className="rc"
                  style={{
                    display: "flex", flexWrap: "wrap",
                    alignItems: "flex-start", justifyContent: "space-between",
                    gap: "0.5rem",
                    padding: "0.75rem 0.875rem",
                    background: i % 2 === 0 ? "#fafafa" : "#fff",
                    borderRadius: 6, marginBottom: 4,
                  }}
                >
                  <div style={{ flex: "1 1 160px", minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.82rem", marginBottom: "0.1rem" }}>{s.label}</div>
                    {s.subLabel && <div style={{ fontSize: "0.7rem", color: "#888" }}>{s.subLabel}</div>}
                  </div>
                  <div style={{ display: "flex", gap: "1rem", flexShrink: 0, alignItems: "center", flexWrap: "nowrap" }}>
                    <div style={{ ...mono, fontSize: "0.68rem", color: "#555", fontWeight: 600 }}>{formatZAR(s.baseMin)} – {formatZAR(s.baseMax)}</div>
                    <div style={{ ...mono, fontSize: "0.62rem", color: "#aaa" }}>{s.durationWeeks}w</div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* ── Investment total ─────────────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8", background: "#111" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.25rem" }}>
          <div>
            <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.4rem" }}>Total Indicative Investment</div>
            <div style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)", fontWeight: 900, color: "#dfff00", lineHeight: 1 }}>{formatZAR(totalMin)}</div>
            <div style={{ ...mono, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>to {formatZAR(totalMax)}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>Estimated Duration</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{totalWeeks} week{totalWeeks !== 1 ? "s" : ""}</div>
          </div>
        </div>
      </div>

      {/* ── How we work (3-col → wraps on mobile) ── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.125rem" }}>How We Work</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
          {[
            { step: "01", title: "Discovery Session", body: "We confirm your scope, goals, and timeline in a structured session before any work begins." },
            { step: "02", title: "Fixed-Price Proposal", body: "You receive a formal proposal with exact pricing and deliverables,no surprise invoices, ever." },
            { step: "03", title: "Delivery & Handover", body: "Work is delivered in agreed phases with revision rounds built in. You own every asset." },
          ].map(({ step, title, body }) => (
            <div key={step} className="rc" style={{
              flex: "1 1 180px",
              padding: "1rem", background: "#f9f9f9",
              borderRadius: 8, border: "1px solid #ececec",
            }}>
              <div style={{ ...mono, fontSize: "0.6rem", color: "#dfff00", fontWeight: 700, background: "#111", display: "inline-block", padding: "0.12rem 0.4rem", borderRadius: 4, marginBottom: "0.6rem" }}>{step}</div>
              <div style={{ fontWeight: 700, fontSize: "0.8rem", marginBottom: "0.35rem" }}>{title}</div>
              <div style={{ fontSize: "0.72rem", color: "#666", lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Important notes ─────────────────────────── */}
      <div style={{ padding: `1.5rem ${hPad}`, borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "0.875rem" }}>Important Notes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {[
            "All price ranges are indicative. Final pricing is confirmed in writing after a discovery session.",
            "Nuuhaven operates on fixed-price agreements,scope and cost are agreed upfront, not billed hourly.",
            "Timelines are estimates. Final timeline confirmed at kickoff.",
            "Nuuhaven reserves the right to decline or pause any engagement if a conflict of interest is identified.",
            "This report is valid as a reference for 30 days from the date of generation.",
          ].map((note, i) => (
            <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
              <div style={{ ...mono, fontSize: "0.58rem", color: "#dfff00", background: "#111", padding: "0.1rem 0.3rem", borderRadius: 3, flexShrink: 0, marginTop: "0.1rem" }}>{i + 1}</div>
              <div style={{ fontSize: "0.73rem", color: "#555", lineHeight: 1.65 }}>{note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Advisory ────────────────────────────────── */}
      {(() => {
        const hasWebsite = categories.includes("Website");
        const hasBrand = categories.includes("Brand");
        const hasDocumentation = categories.includes("Documentation");
        const hasMarketing = categories.includes("Marketing");
        const isMulti = categories.length >= 3;

        let para1 = "";
        let para2 = "";

        if (hasWebsite && hasBrand) {
          para1 = "Your website and brand identity are in scope together,that's the right combination. But sequencing is critical: always finalise your brand identity before website design begins. Your colours, typography, and logo must be locked in first,a website built without a defined visual system will need redesigning once the brand is finalised. That's avoidable rework and unnecessary cost.";
        } else if (hasWebsite) {
          para1 = "Your website is the single most-visited touchpoint in any client's journey with your business. Most prospects will visit your site before accepting a call, before reading a proposal, and before making any decision. A professionally designed website doesn't just create a good first impression,it answers the question every prospective client is quietly asking: 'Can I trust this business?'";
        } else if (hasBrand) {
          para1 = "Brand identity is the foundation that every other asset is built on. A professional logo, a defined colour palette, and a clear visual system mean that every touchpoint your business makes,website, documents, social profiles, email signatures,reinforces the same impression. Without it, every asset you produce works in isolation. With it, they compound.";
        } else if (hasDocumentation) {
          para1 = "Professional documentation is frequently the deciding factor in B2B sales,not the meeting, not the pitch, but the document that gets forwarded. Most businesses only commission a company profile when they're chasing a specific tender or partnership, which is too late. Having it in place now means you're ready to respond to opportunities the moment they appear.";
        } else {
          para1 = "Every service in this scope has been selected for a reason,and the most important thing about executing a project like this is treating it as an investment in your business infrastructure, not a one-off spend. The assets you build here will represent your business for years, open doors, and generate returns that compound over time.";
        }

        if (isMulti) {
          para2 = "When multiple deliverables are in scope together, the investment compounds. A brand that works, a website that converts, and documentation that closes deals are more powerful as a system than they are individually,each makes the others more effective. The businesses that invest holistically in their presence are the ones that consistently win business others lose to less-qualified competitors who simply look more established.";
        } else if (hasMarketing) {
          para2 = "Marketing assets only perform at their full potential when the brand and digital foundation is in place. If you're investing in collateral and campaigns without a defined visual identity, you risk amplifying an inconsistent impression. Once your brand is locked in, every marketing asset you produce will reinforce the same credibility signal,and the effect compounds with each touchpoint.";
        } else if (complexityLevel >= 3) {
          para2 = `At ${complexityLabel} level, the quality of execution is what separates a good project from one that genuinely moves your business forward. This means strategic input at the brief stage, structured revision rounds, and senior attention to every deliverable. Budget the time for this,rushing a project at this scope almost always means a second, more expensive pass within 12 months.`;
        } else {
          para2 = "A focused scope like this is often more strategic than a large one. Knowing exactly what to build,and not adding scope prematurely,means your investment goes further, delivery is faster, and the result is coherent. Once this foundation is in place, you'll have a clear picture of what to build next and exactly how it fits into what you've already established.";
        }

        return (
          <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8", background: "#f7f9ff" }}>
            <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>A Note From Our Team</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <p style={{ fontSize: "0.8rem", color: "#333", lineHeight: 1.85, margin: 0 }}>{para1}</p>
              <p style={{ fontSize: "0.8rem", color: "#333", lineHeight: 1.85, margin: 0 }}>{para2}</p>
            </div>
          </div>
        );
      })()}

      {/* ── Next steps ──────────────────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.125rem" }}>Recommended Next Steps</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {[
            { action: "Send this report to Nuuhaven", detail: "Email it to tshepang@nuuhaven.com along with your contact details to start a conversation." },
            { action: "Book a discovery session", detail: "A 30–45 minute session to confirm scope, answer questions, and agree on next steps." },
            { action: "Receive your formal proposal", detail: "A written proposal with exact pricing and a clear scope of work,within 24–48 hours of your session." },
          ].map(({ action, detail }, i) => (
            <div key={i} className="rc" style={{ display: "flex", gap: "0.75rem", padding: "0.875rem 1rem", background: "#f9f9f9", borderRadius: 8, border: "1px solid #ececec" }}>
              <div style={{
                ...mono, fontSize: "0.6rem", fontWeight: 700,
                color: "#fff", background: "#111",
                width: 24, height: 24, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.8rem", marginBottom: "0.15rem" }}>{action}</div>
                <div style={{ fontSize: "0.71rem", color: "#666", lineHeight: 1.55 }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────── */}
      <div style={{
        background: "#111", padding: `1.25rem ${hPad}`,
        display: "flex", flexWrap: "wrap",
        justifyContent: "space-between", alignItems: "center",
        gap: "0.75rem",
      }}>
        <div>
          <div style={{ color: "#dfff00", fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.2rem" }}>NUUHAVEN</div>
          <div style={{ ...mono, fontSize: "0.55rem", color: "rgba(255,255,255,0.3)" }}>Your Digital Haven for Business</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...mono, fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.15rem" }}>tshepang@nuuhaven.com</div>
          <div style={{ ...mono, fontSize: "0.6rem", color: "rgba(255,255,255,0.35)" }}>+27 67 717 9269 · nuuhaven.com</div>
        </div>
      </div>
    </div>
  );
}
