import React from "react";

interface Recommendation {
  name: string;
  badge: string;
  desc: string;
  services: string[];
  why: string;
  estimatorParams: string;
}

interface DigitalStrategyReportProps {
  answers: Record<string, string | string[]>;
  recommendation: Recommendation;
  serviceCosts: Record<string, string>;
}

const QUESTION_LABELS: Record<string, string> = {
  stage: "Business Stage",
  challenges: "Key Challenges",
  clients: "Target Client",
  impression: "Brand Impression Goal",
  finding: "Current Discovery Channels",
  have: "Assets Already In Place",
  outcome: "Most Important Outcome",
  timeline: "Target Timeline",
};

const ANSWER_LABELS: Record<string, Record<string, string>> = {
  stage: {
    startup: "Just Starting Out",
    growing: "Growing — Need to Look More Professional",
    established: "Established — Ready for a Rebrand",
    enterprise: "Enterprise — Need Ongoing Support",
  },
  clients: {
    b2b: "Other Businesses (B2B)",
    b2c: "General Public (B2C)",
    both: "Both B2B and B2C",
    unsure: "Still Figuring It Out",
  },
  impression: {
    credible: "Credible & Trustworthy",
    premium: "Premium & Exclusive",
    approachable: "Approachable & Friendly",
    authoritative: "Authoritative & Expert",
  },
  outcome: {
    leads: "Generate More Leads",
    credibility: "Build Credibility & Trust",
    investors: "Attract Investors or Partners",
    brand: "Build a Recognisable Brand",
  },
  timeline: {
    asap: "As Soon As Possible",
    month: "Within 30 Days",
    quarter: "Within 3 Months",
    planning: "Just Planning Ahead",
  },
  challenges: {
    "no-brand": "No Professional Brand Identity",
    "no-website": "No Website or Outdated Website",
    "no-profile": "No Company Profile or Documentation",
    "no-marketing": "Inconsistent or No Marketing Assets",
  },
  finding: {
    wom: "Word of Mouth",
    social: "Social Media",
    website: "My Website",
    nowhere: "Not Currently Being Found",
  },
  have: {
    logo: "A Logo",
    website: "A Website",
    profile: "A Company Profile",
    nothing: "Starting From Scratch",
  },
};

const PACKAGE_INSIGHTS: Record<string, { headline: string; context: string; priority: string[] }> = {
  "Foundation Package": {
    headline: "Start right — first impressions are permanent.",
    context: "At this stage, every touchpoint your business makes is either building or eroding trust. Without a professional brand, website, and company profile, opportunities slip away before a conversation even starts. The Foundation Package gives you everything you need to show up credibly from day one.",
    priority: ["Brand identity first — it informs everything else.", "Website second — your digital home base.", "Company profile third — for B2B credibility.", "Social media setup — amplify what's in place."],
  },
  "Growth Package": {
    headline: "Your business has momentum — your presentation must match it.",
    context: "You've proven your concept and you're generating business. But a misaligned brand or outdated website is quietly costing you. Potential clients are judging you before you've spoken. The Growth Package closes the credibility gap and positions you to win the clients you actually want.",
    priority: ["Website redesign first — it's where prospects go to decide.", "Brand refresh — gives everything a unified foundation.", "Company profile — upgrade your B2B collateral.", "Marketing assets — amplify the new identity."],
  },
  "Transformation Package": {
    headline: "You're ready to operate at the highest level.",
    context: "At this stage, the difference between good and exceptional is execution and consistency. Strategic advisory positions you commercially. Premium brand and enterprise website place you in a league of your own. The retainer keeps you there.",
    priority: ["Strategic advisory first — strategy before execution.", "Brand identity — the foundation of everything.", "Website — the flagship digital asset.", "Ongoing retainer — consistency sustains the edge."],
  },
  "Custom Strategy Package": {
    headline: "A bespoke roadmap, built for your specific situation.",
    context: "Your situation doesn't fit a standard template — and that means a generic package would either over-scope or miss the mark. Starting with strategic advisory ensures every subsequent decision and investment is calibrated to your actual goals.",
    priority: ["Strategic advisory session first.", "Business positioning assessment.", "Identify the highest-impact deliverables.", "Build a phased, prioritised execution plan."],
  },
};

function getAnswerLabel(questionId: string, answer: string | string[]): string {
  if (Array.isArray(answer)) {
    const map = ANSWER_LABELS[questionId];
    if (!map) return answer.join(", ");
    const labels = answer.map(id => map[id] || id);
    return labels.length === 0 ? "None selected" : labels.join(", ");
  }
  return ANSWER_LABELS[questionId]?.[answer] || answer;
}

function parseRangeNums(rangeStr: string): [number, number] {
  const nums = (rangeStr.match(/[\d]+/g) || []).map(Number).filter(n => n > 100);
  return [nums[0] || 0, nums[nums.length - 1] || 0];
}

function formatZAR(n: number) {
  return n > 0 ? `R ${n.toLocaleString("en-ZA")}` : "—";
}

function formatDate() {
  return new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

const ref = `DSR-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export default function DigitalStrategyReport({ answers, recommendation, serviceCosts }: DigitalStrategyReportProps) {
  const mono: React.CSSProperties = { fontFamily: "'Courier New', Courier, monospace" };
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };
  const hPad = "clamp(1rem, 5vw, 2.5rem)";

  const insights = PACKAGE_INSIGHTS[recommendation.name] || PACKAGE_INSIGHTS["Custom Strategy Package"];

  const prices = recommendation.services.map(s => serviceCosts[s] || "");
  const totalMin = prices.reduce((sum, p) => sum + (p.includes("/") ? 0 : parseRangeNums(p)[0]), 0);
  const totalMax = prices.reduce((sum, p) => sum + (p.includes("/") ? 0 : parseRangeNums(p)[1]), 0);

  const profileQuestions = ["stage", "challenges", "clients", "impression", "finding", "have", "outcome", "timeline"];

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
          <div style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Digital Business Solutions</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.25rem" }}>Digital Strategy Report</div>
          <div style={{ ...mono, fontSize: "0.7rem", color: "#dfff00", fontWeight: 700 }}>{ref}</div>
          <div style={{ ...mono, fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", marginTop: "0.15rem" }}>{formatDate()}</div>
        </div>
      </div>

      {/* ── Title strip ─────────────────────────────── */}
      <div style={{ background: "#f5f5f5", padding: `1.125rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", marginBottom: "0.25rem" }}>Document Type</div>
        <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>Personalised Digital Strategy & Package Recommendation</div>
        <div style={{ fontSize: "0.78rem", color: "#666", marginTop: "0.2rem" }}>Based on your {Object.keys(answers).length}-question business profiling session.</div>
      </div>

      {/* ── Business profile ─────────────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.125rem" }}>Your Business Profile</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {profileQuestions.filter(qId => answers[qId] !== undefined).map((qId, i) => (
            <div
              key={qId}
              style={{
                padding: "0.75rem 0.875rem",
                background: i % 2 === 0 ? "#fafafa" : "#fff",
                borderRadius: 6,
                /* Stack label above value — no fixed label column */
              }}
            >
              <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", marginBottom: "0.25rem" }}>
                {QUESTION_LABELS[qId] || qId}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#222", fontWeight: 500, lineHeight: 1.5 }}>
                {getAnswerLabel(qId, answers[qId])}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recommendation ───────────────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8", background: "#fffde7" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.125rem" }}>Recommended Solution</div>

        {/* Package card */}
        <div style={{ background: "#111", borderRadius: 10, padding: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div style={{ color: "#dfff00", fontWeight: 900, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>{recommendation.name}</div>
            <div style={{ ...mono, fontSize: "0.55rem", color: "#111", background: "#dfff00", padding: "0.2rem 0.55rem", borderRadius: 4, fontWeight: 700, whiteSpace: "nowrap" }}>
              {recommendation.badge}
            </div>
          </div>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>{recommendation.desc}</div>
        </div>

        {/* Analysis card */}
        <div style={{ padding: "1.125rem", background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8 }}>
          <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", marginBottom: "0.625rem" }}>Our Analysis</div>
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111", marginBottom: "0.4rem" }}>{insights.headline}</div>
          <div style={{ fontSize: "0.76rem", color: "#444", lineHeight: 1.75 }}>{insights.context}</div>
        </div>
      </div>

      {/* ── Services & investment ─────────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.125rem" }}>Services Included & Investment Range</div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", marginBottom: "1.125rem" }}>
          {recommendation.services.map((service, i) => {
            const price = serviceCosts[service];
            return (
              <div
                key={service}
                style={{
                  display: "flex", flexWrap: "wrap",
                  justifyContent: "space-between", alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.7rem 0.875rem",
                  background: i % 2 === 0 ? "#fafafa" : "#fff",
                  borderRadius: 6, border: "1px solid #f0f0f0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: "1 1 160px", minWidth: 0 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#dfff00", flexShrink: 0 }} />
                  <div style={{ fontSize: "0.78rem", fontWeight: 500 }}>{service}</div>
                </div>
                <div style={{ ...mono, fontSize: "0.68rem", color: "#555", fontWeight: 600, flexShrink: 0, whiteSpace: "nowrap" }}>
                  {price || "Scoped per project"}
                </div>
              </div>
            );
          })}
        </div>

        {(totalMin > 0 && totalMax > 0) && (
          <div style={{
            background: "#111", borderRadius: 8, padding: "1.125rem 1.25rem",
            display: "flex", flexWrap: "wrap",
            justifyContent: "space-between", alignItems: "center", gap: "0.75rem",
          }}>
            <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Combined Indicative Investment</div>
            <div>
              <span style={{ ...mono, fontSize: "1.05rem", fontWeight: 800, color: "#dfff00" }}>{formatZAR(totalMin)}</span>
              <span style={{ ...mono, fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}> – {formatZAR(totalMax)}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── What This Means For You ─────────────────── */}
      {(() => {
        const stage = answers.stage as string;
        const outcome = answers.outcome as string;
        const clients = answers.clients as string;

        const stagePara: Record<string, string> = {
          startup: "Starting a business is about building confidence — yours and your prospective clients'. You are currently in the window where first impressions are permanently set. Potential clients, partners, and referrals will visit your website, see your brand, and form a view of your business before you've exchanged a word. Getting this right from the beginning saves you the cost of a rebrand and a site redesign down the line — both of which are significantly more expensive than doing it properly from the start.",
          growing: "You've validated your business — people are paying for what you do. But as you grow, something predictable happens: the gap between how good your business actually is and how it presents itself becomes increasingly visible. Clients who should be saying yes are hesitating, and you're often not sure why. The answer is almost always presentation. The right package closes that credibility gap and positions you to win the clients your business actually deserves.",
          established: "At this stage, the risk isn't looking unprofessional — it's looking stale. Markets move, competitors invest, and positioning erodes quietly. A brand refresh and digital upgrade aren't about fixing something broken; they're about asserting relevance. Businesses that invest in staying sharp don't just maintain their market position — they extend it, because their competitors have stopped investing.",
          enterprise: "At an enterprise level, your brand and digital infrastructure need to perform consistently at scale — across contexts, across channels, and across the people who represent your business. The risk here is drift: different people representing the brand differently, outdated assets still in circulation, and a digital presence that no longer reflects the business you've become. Ongoing retainer support keeps everything current, aligned, and sharp.",
        };

        const outcomePara: Record<string, string> = {
          leads: "The most common mistake when trying to generate more leads is starting with marketing before fixing the foundation. Marketing amplifies your presence — but if your presence isn't ready, you amplify the wrong impression. Fix the brand, website, and profile first. Then activate marketing. This sequence is what separates businesses that grow from those that spend without return.",
          credibility: "Credibility is not built in a single interaction. It accumulates across every touchpoint: your website, your social profiles, your email signature, your company profile, and how you appear when someone Googles you. A single strong deliverable helps; a cohesive system is what genuinely changes how you're perceived. This package builds that system.",
          investors: "Investors and partners assess your business on documentation and digital presence before meeting you. A company profile that isn't investor-ready, or a website that doesn't reflect a growth-stage business, signals that the opportunity isn't mature — regardless of the underlying strength of your business. Your materials need to meet your ambition. That's what this recommendation addresses.",
          brand: "Brand recognition is earned through repetition and consistency — it's not a logo, it's how consistently that logo, those colours, and that tone of voice appear across every channel, every interaction, every touchpoint. A brand system makes that consistency scalable. Without it, you're starting from zero with every new client, every new hire, and every new platform you enter.",
        };

        const clientsNote = (clients === "b2b" || clients === "both")
          ? "Given your B2B focus, company documentation carries particular weight. B2B buyers do extensive due diligence — your website and company profile are often circulated internally before any decision is made. These materials need to speak to a professional audience with precision."
          : "";

        const para1 = stagePara[stage] || "Every business has a stage where the right investment in its presence unlocks disproportionate returns. Based on your profile, this is that stage. The services recommended here are not optional extras — they're the infrastructure that determines how seriously your market takes you.";
        const para2 = outcomePara[outcome] || "The right sequence of investment — brand, digital presence, documentation, and then activation — is what turns a good business into one that consistently wins business. This recommendation is built around that sequence, calibrated to your specific situation.";

        return (
          <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8", background: "#f7f9ff" }}>
            <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>What This Means For You</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <p style={{ fontSize: "0.8rem", color: "#333", lineHeight: 1.85, margin: 0 }}>{para1}</p>
              <p style={{ fontSize: "0.8rem", color: "#333", lineHeight: 1.85, margin: 0 }}>{para2}</p>
              {clientsNote && (
                <p style={{ fontSize: "0.78rem", color: "#555", lineHeight: 1.8, margin: 0, paddingTop: "0.25rem", borderTop: "1px solid #e8e8e8" }}>{clientsNote}</p>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── Implementation priority ──────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.125rem" }}>Recommended Implementation Order</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {insights.priority.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.75rem 0.875rem", background: "#fff", borderRadius: 6, border: "1px solid #ececec" }}>
              <div style={{
                ...mono, fontSize: "0.58rem", fontWeight: 700, color: "#dfff00",
                background: "#111", width: 22, height: 22, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div style={{ fontSize: "0.76rem", color: "#333", lineHeight: 1.6 }}>{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Next steps ──────────────────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.125rem" }}>Your Next Steps</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.575rem" }}>
          {[
            { action: "Send this report to Nuuhaven", detail: "Email it to tshepang@nuuhaven.com — our team will follow up within 24 hours with a personalised response." },
            { action: "Book a discovery session", detail: "A focused 30–45 minute call to confirm scope, answer your questions, and align on priorities." },
            { action: "Receive your formal proposal", detail: "A written proposal with exact pricing and a clear delivery plan — within 24–48 hours of your session." },
          ].map(({ action, detail }, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.875rem 1rem", background: "#f9f9f9", borderRadius: 8, border: "1px solid #ececec" }}>
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

      {/* ── Pricing note ────────────────────────────── */}
      <div style={{ padding: `1.125rem ${hPad}`, borderBottom: "1px solid #e8e8e8", background: "#fffde7" }}>
        <div style={{ fontSize: "0.7rem", color: "#555", lineHeight: 1.7 }}>
          <strong style={{ color: "#111" }}>Pricing Note:</strong> All investment figures shown are indicative ranges only. Final pricing is confirmed in a formal proposal after a discovery session. Nuuhaven operates exclusively on fixed-price agreements. All engagements are subject to a conflict-of-interest assessment prior to commencement.
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
