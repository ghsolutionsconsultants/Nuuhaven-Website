import Link from "next/link";
import HolographicCard from "@/components/ui/HolographicCard";

const tools = [
  {
    href: "/tools/assessment",
    icon: "◐",
    title: "Business Presence Assessment",
    desc: "Score your current brand, digital presence, documentation, and marketing infrastructure. Discover exactly where your gaps are and what to fix first.",
    features: ["10-question assessment", "Presence score (0–100)", "Category breakdown", "Priority recommendations"],
    cta: "Get My Score",
    badge: "Start here",
  },
  {
    href: "/tools/solution-finder",
    icon: "◎",
    title: "Solution Finder",
    desc: "Answer 8 questions about your business and receive a tailored recommendation for exactly what you need, from Foundation Package to full Transformation.",
    features: ["8-question journey", "Tailored recommendation", "Package breakdown", "Next steps"],
    cta: "Find My Solution",
    badge: null,
  },
  {
    href: "/tools/estimator",
    icon: "◈",
    title: "Project Cost Estimator",
    desc: "Select your deliverables and get an instant investment range estimate. Build your project scope interactively and see complexity ratings in real time.",
    features: ["Live range calculator", "Timeline estimate", "Complexity rating", "Scope summary"],
    cta: "Estimate My Project",
    badge: null,
  },
  {
    href: "/tools/impressions-audit",
    icon: "◉",
    title: "First Impressions Audit",
    desc: "5 questions that reveal exactly how potential clients perceive your business the moment they find you, and precisely what it's costing you in lost deals.",
    features: ["5 targeted questions", "Perception score", "Gap analysis", "Specific fix recommendations"],
    cta: "See How You Look",
    badge: "New",
  },
];

export default function ToolsPage() {
  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Free Business Intelligence Tools</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8" style={{ marginBottom: "1rem" }}>
            <h1 className="display-xl" style={{ maxWidth: "16ch" }}>
              Know Before<br />You Invest.
            </h1>
            <p className="text-base" style={{ color: "var(--text-muted)", lineHeight: 1.85, maxWidth: "30rem" }}>
              Four free tools that diagnose your business, identify what&apos;s missing, and point you toward exactly what you need to grow. No signup. No commitment.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.5rem" }}>
            {tools.map((tool) => (
              <HolographicCard key={tool.href} className="flex flex-col h-full group" style={{ padding: "2.5rem" }}>
                <div className="flex items-start justify-between gap-3" style={{ marginBottom: "1.75rem" }}>
                  <div
                    className="text-4xl transition-transform duration-300 group-hover:scale-110"
                    style={{ color: "var(--accent)" }}
                  >
                    {tool.icon}
                  </div>
                  {tool.badge && (
                    <span
                      className="label-mono text-xs px-2 py-1 rounded-full"
                      style={{ background: "rgba(223,255,0,0.1)", border: "1px solid rgba(223,255,0,0.3)", color: "var(--accent)" }}
                    >
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h2 className="font-bold text-xl" style={{ marginBottom: "1rem" }}>{tool.title}</h2>
                <p className="text-sm flex-1" style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.75rem" }}>
                  {tool.desc}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
                  {tool.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span style={{ color: "var(--accent)" }}>✓</span>
                      <span style={{ color: "var(--text-muted)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tool.href}
                  className="btn-accent text-xs self-start px-5 py-3"
                  data-cursor="OPEN"
                >
                  {tool.cta} →
                </Link>
              </HolographicCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
