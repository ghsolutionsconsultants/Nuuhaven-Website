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
  Brand: "Your brand is the first impression you make. A weak or inconsistent brand costs you trust before a word is spoken.",
  Digital: "Your digital presence is where most decisions are made about your business. A weak digital footprint means missed revenue, every day.",
  Documentation: "Professional documentation separates businesses that win tenders and partnerships from those that get overlooked.",
  Marketing: "Inconsistent or absent marketing collateral limits your ability to scale. If your team can't represent the brand consistently, growth is capped.",
  Strategy: "Without clear positioning, you attract the wrong clients and lose the right ones. Strategic clarity is the foundation that makes everything else more effective.",
};

const GAP_RECOMMENDATIONS: Record<string, { fix: string; investment: string; impact: string }> = {
  "logo": {
    fix: "Invest in a professional logo and full visual identity system",
    investment: "R 2,000 – R 4,000",
    impact: "First impressions determine whether prospects trust you before reading a single word.",
  },
  "brand-guide": {
    fix: "Develop formal brand guidelines documenting your visual standards",
    investment: "Included in Premium Brand Identity (R 5,000 – R 10,000)",
    impact: "Without guidelines, every touchpoint looks slightly different,eroding the consistency that builds recognition.",
  },
  "website": {
    fix: "Build or commission a professional, modern website",
    investment: "R 2,500 – R 18,000 depending on scope",
    impact: "Over 70% of B2B buyers visit a company website before making a purchasing decision.",
  },
  "mobile": {
    fix: "Optimise your website for mobile performance and speed",
    investment: "Included in any website build or upgrade",
    impact: "Over 60% of web traffic is mobile. A site that breaks on a phone is worse than no website at all.",
  },
  "social": {
    fix: "Set up and consistently brand your social media profiles",
    investment: "R 1,000 – R 2,500",
    impact: "Unbranded social profiles look like placeholder accounts. They miss every credibility signal.",
  },
  "profile": {
    fix: "Create a professional company profile or capability statement",
    investment: "R 1,500 – R 6,000",
    impact: "Without a company profile, you cannot respond professionally to RFPs, tender opportunities, or referral introductions.",
  },
  "proposals": {
    fix: "Develop professional proposal and pitch templates",
    investment: "R 1,500 – R 4,000",
    impact: "A poorly formatted proposal undermines even the strongest offering. Professional proposals win significantly more business.",
  },
  "marketing": {
    fix: "Create a core set of consistent marketing materials",
    investment: "R 1,500 – R 4,000",
    impact: "Inconsistent collateral makes your business look fragmented. Professionally designed materials extend your brand into every interaction.",
  },
  "email": {
    fix: "Implement branded email signatures for all team members",
    investment: "Typically included in brand delivery",
    impact: "Every email your team sends is a brand touchpoint. Unbranded signatures are missed impressions,every single day.",
  },
  "positioning": {
    fix: "Define and document your brand messaging and market positioning",
    investment: "R 2,000 – R 8,000 (Strategic Advisory)",
    impact: "Unclear positioning means your message doesn't resonate with the right clients,and you attract the wrong ones.",
  },
};

function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Strong", color: "#22c55e" };
  if (score >= 60) return { label: "Developing", color: "#f59e0b" };
  if (score >= 40) return { label: "Needs Work", color: "#f97316" };
  return { label: "Critical Gaps", color: "#ef4444" };
}

const SCORE_BAND: Record<string, string> = {
  "Strong": "Focus on maintaining consistency and refining the details.",
  "Developing": "A foundation exists but gaps are visible. Targeted improvements will compound.",
  "Needs Work": "Significant gaps are dampening your overall credibility. Prioritise these fixes.",
  "Critical Gaps": "These gaps are actively costing you business. Urgent priority.",
};

function formatDate() {
  return new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

const ref = `BAR-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export default function BusinessMaturityReport({ answers, overall, scoreLabel, questions, categories, getCategoryScore }: BusinessMaturityReportProps) {
  const mono: React.CSSProperties = { fontFamily: "'Courier New', Courier, monospace" };
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };
  const hPad = "clamp(1rem, 5vw, 2.5rem)";

  const gapQuestions = questions.filter(q => answers[q.id] !== "yes");
  const partialQuestions = questions.filter(q => answers[q.id] === "partial");
  const missingQuestions = questions.filter(q => answers[q.id] === "no");
  const sortedCategories = [...categories].sort((a, b) => getCategoryScore(answers, a) - getCategoryScore(answers, b));

  const overallInterpretation = overall >= 80
    ? "Your business presents strongly across the board. Focus on maintaining consistency, refining your edge, and scaling what works."
    : overall >= 60
    ? "You have a solid foundation but identifiable gaps are quietly costing you business. The right targeted investments now will close these gaps and accelerate growth significantly."
    : overall >= 40
    ? "Significant credibility gaps exist across your business presence. These aren't just cosmetic,they're actively affecting your ability to win business and compete at the level your business deserves."
    : "Critical gaps across your business presence mean you're being overlooked, dismissed, or undervalued before conversations even begin. This is an urgent priority.";

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
          <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.25rem" }}>Business Maturity Assessment</div>
          <div style={{ ...mono, fontSize: "0.7rem", color: "#dfff00", fontWeight: 700 }}>{ref}</div>
          <div style={{ ...mono, fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", marginTop: "0.15rem" }}>{formatDate()}</div>
        </div>
      </div>

      {/* ── Title strip ─────────────────────────────── */}
      <div style={{ background: "#f5f5f5", padding: `1.125rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888", marginBottom: "0.25rem" }}>Document Type</div>
        <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>Business Presence & Credibility Assessment Report</div>
        <div style={{ fontSize: "0.76rem", color: "#666", marginTop: "0.2rem" }}>{questions.length} questions assessed across {categories.length} business dimensions.</div>
      </div>

      {/* ── Score hero ───────────────────────────────── */}
      <div style={{
        padding: `1.75rem ${hPad}`, borderBottom: "1px solid #222",
        background: "#111",
        display: "flex", flexWrap: "wrap",
        gap: "1.75rem", alignItems: "center",
      }}>
        {/* Big number */}
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{ ...mono, fontSize: "0.52rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>Overall Score</div>
          <div style={{ fontSize: "clamp(3.5rem, 10vw, 5rem)", fontWeight: 900, color: scoreLabel.color, lineHeight: 1, ...mono }}>
            {overall}
          </div>
          <div style={{ ...mono, fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", marginTop: "0.15rem" }}>out of 100</div>
        </div>

        {/* Interpretation */}
        <div style={{ flex: "1 1 200px", minWidth: 0 }}>
          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginBottom: "0.625rem" }}>{scoreLabel.label}</div>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{overallInterpretation}</div>
          <div style={{ marginTop: "0.875rem", display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
            <div style={{ ...mono, fontSize: "0.58rem", color: "#22c55e", background: "rgba(34,197,94,0.12)", padding: "0.18rem 0.5rem", borderRadius: 4 }}>
              ✓ {questions.filter(q => answers[q.id] === "yes").length} in place
            </div>
            <div style={{ ...mono, fontSize: "0.58rem", color: "#f59e0b", background: "rgba(245,158,11,0.12)", padding: "0.18rem 0.5rem", borderRadius: 4 }}>
              ◑ {partialQuestions.length} partial
            </div>
            <div style={{ ...mono, fontSize: "0.58rem", color: "#ef4444", background: "rgba(239,68,68,0.12)", padding: "0.18rem 0.5rem", borderRadius: 4 }}>
              ○ {missingQuestions.length} gaps
            </div>
          </div>
        </div>
      </div>

      {/* ── What This Means For Your Business ──────── */}
      {(() => {
        const worstCat = sortedCategories[0];
        const worstScore = getCategoryScore(answers, worstCat);

        const scorePara =
          overall >= 80
            ? "A score this high reflects real, deliberate investment in how your business presents itself. The risk at this level isn't visible gaps,it's invisible drift. Over time, assets age, markets shift, and what once looked sharp can start to look dated without anyone noticing. The priority now is maintenance, refinement, and staying one step ahead of your competition rather than catching up to them."
            : overall >= 60
            ? "You've built a legitimate foundation,and that's not a given. Many businesses of comparable size and stage have far less in place. What your score reveals is that you're operating at a credible level, but there are seams showing. Specific gaps are creating friction in your sales process, your referral chain, or your ability to respond to formal opportunities. Closing those gaps won't feel transformational in the moment,but the effect on your business usually is."
            : overall >= 40
            ? "Your score reflects a business with real substance that is being under-represented. The work you do is legitimate,but the way your business appears to the outside world is not yet communicating that value accurately. This gap between reality and presentation is precisely where business is lost. Clients who would benefit from working with you are choosing someone else,not because that competitor is better, but because they look more established."
            : "These gaps are not minor. They are the reason conversations don't convert, referrals don't materialise, and opportunities disappear without explanation. Businesses at this score level often attribute lost business to price, timing, or competition,when the real cause is presentation. You cannot compete effectively with a weak digital and brand infrastructure. This needs to be the priority, before sales, before marketing, before anything else.";

        const catAdvice: Record<string, string> = {
          Brand: "Your brand is the first filter every prospect runs you through. Before reading your proposal, before taking your call, before visiting your website,they've already formed a view based on your visual identity. If that view is 'this looks small' or 'this doesn't look professional', the conversation becomes significantly harder from the very first word. Fixing your brand changes the starting point of every interaction.",
          Digital: "Your digital presence is where most business decisions about you are made, before you know anyone is looking. Over 70% of B2B buyers research a vendor online before making contact. If your website is weak, outdated, or absent, you're losing business from people you never even knew were considering you. This is the highest-leverage fix available to you right now.",
          Documentation: "Professional documentation is the difference between being considered and being dismissed in formal opportunities. Tenders, partnerships, and corporate supply chain applications all require documentation that speaks with authority. Without it, even excellent businesses get filtered out early,not because their offering is insufficient, but because their paperwork is.",
          Marketing: "Marketing consistency is what turns good work into a recognisable presence. Inconsistent collateral, mismatched social profiles, and a brand that looks different across channels signal a business that hasn't invested in its own story,and clients read that signal. Once your marketing materials are cohesive and professional, every touchpoint your business makes becomes a credibility asset.",
          Strategy: "Strategic clarity is the multiplier that makes everything else more effective. Without clear positioning, your marketing message doesn't resonate, your website speaks to the wrong audience, and your team represents the brand inconsistently. Strategy isn't a luxury or a nice-to-have,it's the foundation that determines whether every other investment returns what it should.",
        };

        const para2 = catAdvice[worstCat] || "The gaps identified in this report are fixable,and the return on fixing them is disproportionate. Businesses that close credibility gaps at your stage consistently report faster sales cycles, stronger referral rates, and a dramatically improved ability to compete for formal opportunities.";

        return (
          <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #222", background: "#181818" }}>
            <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>What This Means For Your Business</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, margin: 0 }}>{scorePara}</p>
              {worstScore < 80 && (
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, margin: 0, paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#dfff00", fontWeight: 700 }}>Your lowest area is {worstCat} ({worstScore}%). </span>
                  {para2}
                </p>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── Category breakdown ──────────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.125rem" }}>Category Breakdown</div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {categories.map(cat => {
            const score = getCategoryScore(answers, cat);
            const catLabel = getScoreLabel(score);
            const catQs = questions.filter(q => q.category === cat);
            return (
              <div key={cat} className="rc" style={{ padding: "1rem 1.125rem", background: "#fafafa", borderRadius: 8, border: "1px solid #ececec" }}>
                {/* Category header row */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.625rem" }}>
                  <div style={{ flex: "1 1 160px", minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.82rem" }}>{CATEGORY_ICONS[cat]}</span>
                      <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>{cat}</span>
                      <span style={{ ...mono, fontSize: "0.55rem", color: catLabel.color, background: `${catLabel.color}18`, padding: "0.1rem 0.38rem", borderRadius: 3, fontWeight: 700 }}>{catLabel.label}</span>
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#666", lineHeight: 1.5 }}>{SCORE_BAND[catLabel.label]}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ ...mono, fontSize: "1.35rem", fontWeight: 800, color: catLabel.color, lineHeight: 1 }}>{score}%</div>
                    <div style={{ ...mono, fontSize: "0.52rem", color: "#aaa", marginTop: "0.15rem" }}>{catQs.filter(q => answers[q.id] === "yes").length}/{catQs.length} done</div>
                  </div>
                </div>

                {/* Score bar */}
                <div style={{ height: 5, background: "#e5e5e5", borderRadius: 999, overflow: "hidden", marginBottom: "0.75rem" }}>
                  <div style={{ height: "100%", width: `${score}%`, background: catLabel.color, borderRadius: 999 }} />
                </div>

                {/* Per-question answers */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {catQs.map(q => {
                    const ans = answers[q.id];
                    const dotColor = ans === "yes" ? "#22c55e" : ans === "partial" ? "#f59e0b" : "#ef4444";
                    const dotLabel = ans === "yes" ? "Yes" : ans === "partial" ? "Partially" : "Not Yet";
                    return (
                      <div key={q.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem" }}>
                        <div style={{ fontSize: "0.7rem", color: "#555", lineHeight: 1.5, flex: 1, minWidth: 0 }}>{q.text}</div>
                        <div style={{ ...mono, fontSize: "0.56rem", fontWeight: 600, color: dotColor, whiteSpace: "nowrap", flexShrink: 0 }}>
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

      {/* ── Gap analysis ────────────────────────────── */}
      {gapQuestions.length > 0 && (
        <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
          <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Priority Gap Analysis</div>
          <div style={{ fontSize: "0.74rem", color: "#666", marginBottom: "1.125rem", lineHeight: 1.6 }}>
            Gaps ranked by business impact,address these in order for the fastest credibility improvement.
          </div>

          {[...missingQuestions, ...partialQuestions].map((q, i) => {
            const rec = GAP_RECOMMENDATIONS[q.id];
            const isPartial = answers[q.id] === "partial";
            const borderColor = isPartial ? "#f59e0b" : "#ef4444";
            return (
              <div
                key={q.id}
                className="rc"
                style={{
                  marginBottom: "0.7rem",
                  padding: "1rem 1.125rem",
                  background: isPartial ? "#fffbeb" : "#fff5f5",
                  border: `1px solid ${borderColor}28`,
                  borderLeft: `3px solid ${borderColor}`,
                  borderRadius: 8,
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <div style={{
                    ...mono, fontSize: "0.56rem", fontWeight: 700, color: "#fff",
                    background: "#111", width: 20, height: 20, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ ...mono, fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#777" }}>{q.category}</div>
                  <div style={{ ...mono, fontSize: "0.52rem", color: isPartial ? "#f59e0b" : "#ef4444", fontWeight: 700 }}>
                    {isPartial ? "PARTIALLY IN PLACE" : "NOT YET IN PLACE"}
                  </div>
                </div>

                <div style={{ fontWeight: 600, fontSize: "0.78rem", color: "#111", marginBottom: "0.4rem" }}>{q.text}</div>

                {rec && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <div style={{ fontSize: "0.71rem", color: "#444", lineHeight: 1.6 }}>
                      <span style={{ fontWeight: 600 }}>Fix: </span>{rec.fix}
                    </div>
                    <div style={{ fontSize: "0.69rem", color: "#666", lineHeight: 1.6 }}>
                      <span style={{ fontWeight: 600 }}>Why it matters: </span>{rec.impact}
                    </div>
                    <div style={{ ...mono, fontSize: "0.6rem", color: "#555", marginTop: "0.1rem" }}>
                      Investment: {rec.investment}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Priority categories ──────────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.125rem" }}>Where to Focus First</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {sortedCategories.slice(0, 3).map((cat, i) => {
            const score = getCategoryScore(answers, cat);
            const catLabel = getScoreLabel(score);
            return (
              <div key={cat} className="rc" style={{ display: "flex", gap: "0.75rem", padding: "0.875rem 1rem", background: "#fff", borderRadius: 8, border: "1px solid #ececec", alignItems: "flex-start" }}>
                <div style={{
                  ...mono, fontSize: "0.58rem", fontWeight: 700, color: "#dfff00",
                  background: "#111", width: 22, height: 22, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.8rem" }}>{cat}</span>
                    <span style={{ ...mono, fontSize: "0.52rem", color: catLabel.color, fontWeight: 700 }}>{score}% · {catLabel.label}</span>
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#555", lineHeight: 1.6 }}>{CATEGORY_WHY[cat]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Next steps ──────────────────────────────── */}
      <div style={{ padding: `1.75rem ${hPad}`, borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1.125rem" }}>Recommended Next Steps</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.575rem" }}>
          {[
            { action: "Send this report to Nuuhaven", detail: "Email tshepang@nuuhaven.com,our team will review your scores and respond with a prioritised plan within 24 hours." },
            { action: "Use the Solution Finder", detail: "Visit nuuhaven.com/tools/solution-finder to get a personalised package recommendation based on your situation." },
            { action: "Book a discovery session", detail: "A focused 30–45 minute conversation to map the right sequence of investments to close your gaps and unlock growth." },
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
