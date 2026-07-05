import React from "react";

type Answer = "yes" | "partial" | "no";

interface Question {
  id: string;
  category: string;
  text: string;
  weight: number;
}

interface BusinessMaturityReportProps {
  answers: Record<string, Answer>;
  overall: number;
  scoreLabel: { label: string; color: string };
  questions: Question[];
  categories: string[];
  getCategoryScore: (answers: Record<string, Answer>, cat: string) => number;
}

const CATEGORY_ICONS: Record<string, string> = {
  Brand: "◈", Digital: "◎", Documentation: "◳", Marketing: "◐", Strategy: "◆",
};

const CATEGORY_WHY: Record<string, string> = {
  Brand: "Your brand is the first impression you make — and first impressions are permanent. A weak or inconsistent brand costs you trust before a word is spoken.",
  Digital: "Your digital presence is where most decisions are made about your business. A weak digital footprint means missed revenue, every day.",
  Documentation: "Professional documentation is what separates businesses that win tenders and partnerships from those that get overlooked. It signals that you operate at a certain level.",
  Marketing: "Inconsistent or absent marketing collateral limits your ability to scale. If your team can't represent the brand consistently, growth is capped.",
  Strategy: "Without clear positioning, you attract the wrong clients and lose the right ones. Strategic clarity is the foundation that makes everything else more effective.",
};

const GAP_RECOMMENDATIONS: Record<string, { fix: string; investment: string; impact: string }> = {
  "logo": {
    fix: "Invest in a professional logo and full visual identity system",
    investment: "R 2,000 – R 4,000",
    impact: "First impressions determine whether prospects trust you before reading a single word. A professional logo signals that you take your business seriously.",
  },
  "brand-guide": {
    fix: "Develop formal brand guidelines documenting your visual standards",
    investment: "Included in Premium Brand Identity (R 5,000 – R 10,000)",
    impact: "Without guidelines, every touchpoint looks slightly different — eroding the consistency that builds brand recognition and trust over time.",
  },
  "website": {
    fix: "Build or commission a professional, modern website",
    investment: "R 2,500 – R 18,000 depending on scope",
    impact: "Over 70% of B2B buyers visit a company website before making a purchasing decision. No website — or a poor one — means you're losing deals before the conversation starts.",
  },
  "mobile": {
    fix: "Optimise your website for mobile performance and speed",
    investment: "Included in any website build or upgrade",
    impact: "Over 60% of web traffic is mobile. A website that breaks on a phone is worse than having no website at all — it signals inattention to detail.",
  },
  "social": {
    fix: "Set up and consistently brand your social media profiles",
    investment: "R 1,000 – R 2,500",
    impact: "Unbranded social profiles look like placeholder accounts. They miss the opportunity to reinforce credibility every time a prospect does due diligence.",
  },
  "profile": {
    fix: "Create a professional company profile or capability statement",
    investment: "R 1,500 – R 6,000",
    impact: "Without a company profile, you cannot respond professionally to RFPs, tender opportunities, or referral introductions. You are effectively invisible to formal procurement.",
  },
  "proposals": {
    fix: "Develop professional proposal and pitch templates",
    investment: "R 1,500 – R 4,000",
    impact: "A poorly formatted proposal undermines even the strongest offering. Professional proposals that look as good as they read win significantly more business.",
  },
  "marketing": {
    fix: "Create a core set of consistent marketing materials",
    investment: "R 1,500 – R 4,000",
    impact: "Inconsistent collateral makes your business look fragmented. Professionally designed marketing materials extend your brand into every sales and networking interaction.",
  },
  "email": {
    fix: "Implement branded email signatures for all team members",
    investment: "Typically included in brand delivery",
    impact: "Every email your team sends is a brand touchpoint. Unbranded signatures are missed marketing impressions — multiplied by every email, every day.",
  },
  "positioning": {
    fix: "Define and document your brand messaging and market positioning",
    investment: "R 2,000 – R 8,000 (Strategic Advisory)",
    impact: "Unclear positioning means your message doesn't resonate with the right clients — and you attract the wrong ones. This is the single highest-leverage fix a business can make.",
  },
};

const SCORE_BAND: Record<string, string> = {
  "Strong": "Your business presents strongly in this area. Focus on maintaining consistency and refining the details.",
  "Developing": "A foundation exists but gaps are visible. Targeted improvements here will have compounding impact.",
  "Needs Work": "Significant gaps in this area are dampening your overall credibility. Prioritise these fixes.",
  "Critical Gaps": "Critical gaps are actively costing you business. These must be addressed before other investments compound.",
};

function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Strong", color: "#22c55e" };
  if (score >= 60) return { label: "Developing", color: "#f59e0b" };
  if (score >= 40) return { label: "Needs Work", color: "#f97316" };
  return { label: "Critical Gaps", color: "#ef4444" };
}

function formatDate() {
  return new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

function generateRef() {
  const ts = Date.now().toString(36).toUpperCase().slice(-6);
  return `BAR-${ts}`;
}

const ref = generateRef();

export default function BusinessMaturityReport({ answers, overall, scoreLabel, questions, categories, getCategoryScore }: BusinessMaturityReportProps) {
  const rStyle: React.CSSProperties = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };
  const monoStyle: React.CSSProperties = { fontFamily: "'Courier New', Courier, monospace" };

  const gapQuestions = questions.filter(q => answers[q.id] !== "yes");
  const partialQuestions = questions.filter(q => answers[q.id] === "partial");
  const missingQuestions = questions.filter(q => answers[q.id] === "no");

  const sortedCategories = [...categories].sort((a, b) => getCategoryScore(answers, a) - getCategoryScore(answers, b));

  const overallInterpretation = overall >= 80
    ? "Your business presents strongly across the board. Focus on maintaining consistency, refining your edge, and scaling what works. The primary opportunity at this level is strategic — positioning yourself to compound your competitive advantage."
    : overall >= 60
    ? "You have a solid foundation but identifiable gaps are quietly costing you business. Prospects doing due diligence will find inconsistencies that undermine your credibility. The right targeted investments now will close these gaps and accelerate growth significantly."
    : overall >= 40
    ? "Significant credibility gaps exist across your business presence. These aren't just cosmetic — they're actively affecting your ability to win business, attract the right clients, and compete at the level your business deserves. Addressing these is the highest-leverage move you can make."
    : "Critical gaps across your business presence mean you're being overlooked, dismissed, or undervalued before conversations even begin. Every day these gaps remain is lost opportunity. This is an urgent priority — not a long-term project.";

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
          <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>Business Maturity Assessment</div>
          <div style={{ ...monoStyle, fontSize: "0.7rem", color: "#dfff00", fontWeight: 700 }}>{ref}</div>
          <div style={{ ...monoStyle, fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", marginTop: "0.2rem" }}>{formatDate()}</div>
        </div>
      </div>

      {/* Title strip */}
      <div style={{ background: "#f5f5f5", padding: "1.25rem 2.5rem", borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", marginBottom: "0.3rem" }}>Document Type</div>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111" }}>Business Presence & Credibility Assessment Report</div>
        <div style={{ fontSize: "0.78rem", color: "#666", marginTop: "0.25rem" }}>{questions.length} questions assessed across {categories.length} business dimensions.</div>
      </div>

      {/* Score hero */}
      <div style={{ padding: "2rem 2.5rem", borderBottom: "1px solid #e8e8e8", background: "#111", display: "flex", gap: "2.5rem", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ ...monoStyle, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.75rem" }}>
            Overall Score
          </div>
          <div style={{ fontSize: "5rem", fontWeight: 900, color: scoreLabel.color === "#dfff00" ? "#dfff00" : scoreLabel.color, lineHeight: 1, fontFamily: "'Courier New', Courier, monospace" }}>
            {overall}
          </div>
          <div style={{ ...monoStyle, fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", marginTop: "0.2rem" }}>out of 100</div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", marginBottom: "0.75rem" }}>{scoreLabel.label}</div>
          <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>{overallInterpretation}</div>
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ ...monoStyle, fontSize: "0.6rem", color: "#22c55e", background: "rgba(34,197,94,0.1)", padding: "0.2rem 0.5rem", borderRadius: 4 }}>
              ✓ {questions.filter(q => answers[q.id] === "yes").length} in place
            </div>
            <div style={{ ...monoStyle, fontSize: "0.6rem", color: "#f59e0b", background: "rgba(245,158,11,0.1)", padding: "0.2rem 0.5rem", borderRadius: 4 }}>
              ◑ {partialQuestions.length} partial
            </div>
            <div style={{ ...monoStyle, fontSize: "0.6rem", color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "0.2rem 0.5rem", borderRadius: 4 }}>
              ○ {missingQuestions.length} gaps
            </div>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div style={{ padding: "1.75rem 2.5rem", borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.25rem" }}>Category Breakdown</div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {categories.map(cat => {
            const score = getCategoryScore(answers, cat);
            const catLabel = getScoreLabel(score);
            const catQs = questions.filter(q => q.category === cat);
            return (
              <div key={cat} style={{ padding: "1.125rem 1.25rem", background: "#fafafa", borderRadius: 8, border: "1px solid #ececec" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", gap: "1rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                      <span style={{ fontSize: "0.85rem" }}>{CATEGORY_ICONS[cat]}</span>
                      <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>{cat}</span>
                      <span style={{ ...monoStyle, fontSize: "0.58rem", color: catLabel.color, background: `${catLabel.color}18`, padding: "0.1rem 0.4rem", borderRadius: 3, fontWeight: 700 }}>{catLabel.label}</span>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#666", lineHeight: 1.5, maxWidth: "36rem" }}>{SCORE_BAND[catLabel.label]}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ ...monoStyle, fontSize: "1.5rem", fontWeight: 800, color: catLabel.color, lineHeight: 1 }}>{score}%</div>
                    <div style={{ ...monoStyle, fontSize: "0.55rem", color: "#999", marginTop: "0.2rem" }}>{catQs.filter(q => answers[q.id] === "yes").length}/{catQs.length} complete</div>
                  </div>
                </div>
                {/* Score bar */}
                <div style={{ height: 5, background: "#e5e5e5", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${score}%`, background: catLabel.color, borderRadius: 999 }} />
                </div>
                {/* Individual Q breakdown */}
                <div style={{ marginTop: "0.875rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {catQs.map(q => {
                    const ans = answers[q.id];
                    const dotColor = ans === "yes" ? "#22c55e" : ans === "partial" ? "#f59e0b" : "#ef4444";
                    const dotLabel = ans === "yes" ? "Yes" : ans === "partial" ? "Partially" : "Not Yet";
                    return (
                      <div key={q.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                        <div style={{ fontSize: "0.72rem", color: "#555", lineHeight: 1.5, flex: 1 }}>{q.text}</div>
                        <div style={{ ...monoStyle, fontSize: "0.58rem", fontWeight: 600, color: dotColor, whiteSpace: "nowrap", flexShrink: 0 }}>
                          {dotLabel}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gap analysis */}
      {gapQuestions.length > 0 && (
        <div style={{ padding: "1.75rem 2.5rem", borderBottom: "1px solid #e8e8e8" }}>
          <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Priority Gap Analysis</div>
          <div style={{ fontSize: "0.78rem", color: "#666", marginBottom: "1.25rem", lineHeight: 1.6 }}>
            Gaps ranked by business impact — address these in order for the fastest credibility improvement.
          </div>

          {/* Sort: missing first, then partial; within each group sort by category priority */}
          {[...missingQuestions, ...partialQuestions].map((q, i) => {
            const rec = GAP_RECOMMENDATIONS[q.id];
            const isPartial = answers[q.id] === "partial";
            const borderColor = isPartial ? "#f59e0b" : "#ef4444";
            return (
              <div
                key={q.id}
                style={{
                  marginBottom: "0.75rem",
                  padding: "1.125rem 1.25rem",
                  background: isPartial ? "#fffbeb" : "#fff5f5",
                  border: `1px solid ${borderColor}28`,
                  borderLeft: `3px solid ${borderColor}`,
                  borderRadius: 8,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ ...monoStyle, fontSize: "0.58rem", fontWeight: 700, color: "#fff", background: "#111", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div style={{ ...monoStyle, fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: q.category === "Brand" ? "#8b5cf6" : q.category === "Digital" ? "#3b82f6" : q.category === "Documentation" ? "#f59e0b" : q.category === "Marketing" ? "#ec4899" : "#10b981" }}>
                      {q.category}
                    </div>
                    <div style={{ ...monoStyle, fontSize: "0.55rem", color: isPartial ? "#f59e0b" : "#ef4444", fontWeight: 700 }}>
                      {isPartial ? "PARTIALLY IN PLACE" : "NOT YET IN PLACE"}
                    </div>
                  </div>
                </div>

                <div style={{ fontWeight: 600, fontSize: "0.8rem", color: "#111", marginBottom: "0.5rem" }}>{q.text}</div>

                {rec && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <div style={{ fontSize: "0.73rem", color: "#444", lineHeight: 1.6 }}>
                      <span style={{ fontWeight: 600 }}>Recommended fix: </span>{rec.fix}
                    </div>
                    <div style={{ fontSize: "0.71rem", color: "#666", lineHeight: 1.6 }}>
                      <span style={{ fontWeight: 600 }}>Why it matters: </span>{rec.impact}
                    </div>
                    <div style={{ ...monoStyle, fontSize: "0.62rem", color: "#555", marginTop: "0.15rem" }}>
                      Indicative investment: {rec.investment}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Priority categories */}
      <div style={{ padding: "1.75rem 2.5rem", borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}>
        <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.25rem" }}>Where to Focus First</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {sortedCategories.slice(0, 3).map((cat, i) => {
            const score = getCategoryScore(answers, cat);
            const catLabel = getScoreLabel(score);
            return (
              <div key={cat} style={{ display: "flex", gap: "0.75rem", padding: "1rem 1.25rem", background: "#fff", borderRadius: 8, border: "1px solid #ececec", alignItems: "flex-start" }}>
                <div style={{ ...monoStyle, fontSize: "0.6rem", fontWeight: 700, color: "#dfff00", background: "#111", width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.82rem" }}>{cat}</span>
                    <span style={{ ...monoStyle, fontSize: "0.55rem", color: catLabel.color, fontWeight: 700 }}>{score}% · {catLabel.label}</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#555", lineHeight: 1.6 }}>{CATEGORY_WHY[cat]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next steps */}
      <div style={{ padding: "1.75rem 2.5rem", borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...monoStyle, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.25rem" }}>Recommended Next Steps</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {[
            { action: "Send this report to Nuuhaven", detail: "Email it to tshepang@nuuhaven.com — our team will review your scores and respond with a specific, prioritised plan within 24 hours." },
            { action: "Use the Solution Finder", detail: "Visit nuuhaven.com/tools/solution-finder to get a personalised package recommendation based on your specific situation." },
            { action: "Book a discovery session", detail: "A focused 30–45 minute conversation to map the right sequence of investments to close your gaps and unlock growth." },
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
