"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const nodes = [
  {
    id: "website",
    label: "Website",
    angle: 0,
    icon: "◎",
    tagline: "Your 24/7 sales person",
    desc: "A professionally designed website that communicates your value proposition, builds trust on first visit, and converts browsers into enquiries, working for your business around the clock.",
    whyItMatters: "83% of clients research a business online before making contact. Your website is your first impression for most prospects.",
    deliverables: ["Custom design", "Mobile-optimised", "Fast loading", "SEO-ready", "Contact forms", "CMS integration"],
    bestFor: "Any business that needs to be found and trusted online",
    timeline: "2–4 weeks",
    price: "From R2,500",
  },
  {
    id: "brand",
    label: "Brand",
    angle: 51,
    icon: "◈",
    tagline: "Recognition you can own",
    desc: "Distinctive logo, colour palette, and typography that make your business instantly recognisable and instil confidence before you say a word. A brand that works as hard as you do.",
    whyItMatters: "Businesses with consistent branding earn 23% more revenue. Your brand is your most valuable silent salesperson.",
    deliverables: ["Logo design", "Colour system", "Typography", "Brand guidelines", "Icon set", "Brand stationery"],
    bestFor: "New businesses or businesses ready to professionalise their image",
    timeline: "1–2 weeks",
    price: "From R2,000",
  },
  {
    id: "profile",
    label: "Company Profile",
    angle: 103,
    icon: "◳",
    tagline: "Your business in print",
    desc: "A professionally crafted company profile that communicates your story, services, and credentials to clients, investors, and partners, with the authority of a business that takes itself seriously.",
    whyItMatters: "When a prospect asks 'tell me more about your business', your answer should be a polished document, not an email scrambled together.",
    deliverables: ["8–24 page document", "Custom design", "Print & digital ready", "Services breakdown", "Team section", "Portfolio pages"],
    bestFor: "B2B businesses, tenders, corporate clients, and investor conversations",
    timeline: "5–10 days",
    price: "From R1,500",
  },
  {
    id: "social",
    label: "Social Media",
    angle: 154,
    icon: "◐",
    tagline: "Presence on every platform",
    desc: "Professionally set up and branded social profiles across LinkedIn, Facebook, Instagram, and more, so every touchpoint your clients reach tells the same credible story.",
    whyItMatters: "Potential clients check social media before calling. Inconsistent or empty profiles kill deals before they start.",
    deliverables: ["Profile setup", "Cover images", "Bio copywriting", "Branded templates", "Content calendar", "Platform strategy"],
    bestFor: "Businesses entering the market or cleaning up their digital footprint",
    timeline: "3–7 days",
    price: "From R1,000",
  },
  {
    id: "marketing",
    label: "Marketing",
    angle: 206,
    icon: "◑",
    tagline: "Assets that generate leads",
    desc: "Flyers, banners, brochures, and digital collateral that actively drive awareness, generate leads, and support your sales process at every stage of the funnel.",
    whyItMatters: "Professional marketing materials signal that your business is established, invested, and serious, which translates directly into trust.",
    deliverables: ["Flyers & brochures", "Social graphics", "Email headers", "Event banners", "Digital ads", "Print-ready files"],
    bestFor: "Businesses running campaigns, attending events, or scaling their outreach",
    timeline: "3–7 days per batch",
    price: "From R1,500",
  },
  {
    id: "sales",
    label: "Sales Material",
    angle: 257,
    icon: "◆",
    tagline: "Win more proposals",
    desc: "Professional proposal templates, pitch decks, and presentations that give you an unfair advantage in every business development conversation, closing deals before the competition can react.",
    whyItMatters: "A well-designed proposal can increase close rates by up to 40%. Most businesses lose deals on presentation, not product.",
    deliverables: ["Proposal templates", "Pitch decks", "Quote documents", "Capability statements", "Case study layouts", "Presentation kits"],
    bestFor: "B2B businesses, consultants, agencies, and service providers",
    timeline: "5–10 days",
    price: "From R1,000",
  },
  {
    id: "strategy",
    label: "Strategy",
    angle: 309,
    icon: "◉",
    tagline: "Commercial clarity",
    desc: "One-on-one advisory sessions that map your business positioning, identify growth levers, and translate ambition into a clear commercial roadmap, so every investment you make is intentional.",
    whyItMatters: "Most businesses spend money on the wrong things because they lack strategic clarity. Strategy first means every rand works harder.",
    deliverables: ["Positioning workshop", "Growth roadmap", "Competitor analysis", "Brand strategy", "Communication framework", "Quarterly priorities"],
    bestFor: "Founders and leaders who want to move faster with less waste",
    timeline: "1–3 sessions",
    price: "From R2,000",
  },
];

/* SVG coordinate space: 480×480 viewBox with 40px padding all around,
   so node labels never clip at edges. Center at 240,240, orbit radius 160. */
const VB = 480;
const CX = 240;
const CY = 240;
const R  = 160;
const CENTER_R = 48;
const NODE_R   = 36;

export default function EcosystemVisualizer() {
  const [active, setActive] = useState<string | null>(null);
  const activeNode = nodes.find((n) => n.id === active);

  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="section-inner">
        <div className="accent-line">
          <span className="label-mono">How We Build</span>
        </div>

        {/* ── Two-column: text | diagram ── */}
        <div
          className="flex flex-col xl:flex-row items-center"
          style={{ gap: "3rem", marginBottom: "2.5rem" }}
        >
          {/* Left: heading + description */}
          <div className="xl:w-2/5 w-full">
            <h2 className="display-xl" style={{ maxWidth: "16ch", marginBottom: "1.75rem" }}>
              Businesses Are<br />Systems,<br />Not Websites.
            </h2>
            <p className="text-base" style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              Nuuhaven doesn&apos;t build websites. We build complete business ecosystems, every node connected, every touchpoint aligned, every asset working together.
            </p>
            <p className="text-sm" style={{ color: "rgba(160,160,160,0.65)", lineHeight: 1.8 }}>
              Tap any node to explore what we deliver for that part of your business.
            </p>
          </div>

          {/* Right: pure-SVG diagram, everything in one coordinate space so nothing misaligns */}
          <div className="xl:w-3/5 w-full flex justify-center">
            <svg
              viewBox={`0 0 ${VB} ${VB}`}
              style={{ width: "100%", maxWidth: 460, display: "block" }}
              aria-label="Business ecosystem diagram"
            >
              {/* Orbit rings */}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(223,255,0,0.06)" strokeWidth={1} />
              <circle cx={CX} cy={CY} r={R * 0.5} fill="none" stroke="rgba(223,255,0,0.03)" strokeWidth={1} strokeDasharray="3 6" />

              {/* Lines from center to each node bubble edge (not center) so line ends at bubble perimeter */}
              {nodes.map((node) => {
                const rad = (node.angle * Math.PI) / 180;
                // Start at center bubble edge
                const x1 = CX + CENTER_R * Math.cos(rad);
                const y1 = CY + CENTER_R * Math.sin(rad);
                // End at outer node bubble edge (approaching from center)
                const x2 = CX + (R - NODE_R) * Math.cos(rad);
                const y2 = CY + (R - NODE_R) * Math.sin(rad);
                const isActive = active === node.id;
                return (
                  <line
                    key={`line-${node.id}`}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={isActive ? "var(--accent)" : "rgba(223,255,0,0.2)"}
                    strokeWidth={isActive ? 1.5 : 0.8}
                  />
                );
              })}

              {/* Outer node bubbles */}
              {nodes.map((node) => {
                const rad = (node.angle * Math.PI) / 180;
                const x = CX + R * Math.cos(rad);
                const y = CY + R * Math.sin(rad);
                const isActive = active === node.id;
                // Split multi-word labels
                const words = node.label.split(" ");
                const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
                const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");
                return (
                  <g
                    key={`node-${node.id}`}
                    onClick={() => setActive(isActive ? null : node.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Glow ring when active */}
                    {isActive && (
                      <circle cx={x} cy={y} r={NODE_R + 10}
                        fill="rgba(223,255,0,0.05)"
                        stroke="rgba(223,255,0,0.25)"
                        strokeWidth={1}
                      />
                    )}
                    {/* Main bubble */}
                    <circle
                      cx={x} cy={y} r={NODE_R}
                      fill={isActive ? "rgba(223,255,0,0.13)" : "rgba(14,14,14,0.96)"}
                      stroke={isActive ? "var(--accent)" : "rgba(255,255,255,0.14)"}
                      strokeWidth={isActive ? 1.5 : 1}
                    />
                    {/* Icon, centred inside bubble */}
                    <text
                      x={x} y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={15}
                      fill={isActive ? "var(--accent)" : "rgba(255,255,255,0.5)"}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {node.icon}
                    </text>
                    {/* Label sits OUTSIDE the bubble, below it, never overlaps */}
                    <text
                      x={x}
                      y={y + NODE_R + 6}
                      textAnchor="middle"
                      fontSize={7.5}
                      fontWeight="700"
                      fill={isActive ? "var(--accent)" : "rgba(160,160,160,0.85)"}
                      letterSpacing="0.06em"
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      <tspan x={x} dy={0}>{line1.toUpperCase()}</tspan>
                      {line2 && <tspan x={x} dy={10}>{line2.toUpperCase()}</tspan>}
                    </text>
                  </g>
                );
              })}

              {/* Center bubble, on top of everything */}
              <circle
                cx={CX} cy={CY} r={CENTER_R}
                fill={active ? "rgba(223,255,0,0.11)" : "rgba(8,8,8,0.99)"}
                stroke={active ? "var(--accent)" : "rgba(255,255,255,0.2)"}
                strokeWidth={active ? 1.5 : 1}
              />
              {active && (
                <circle cx={CX} cy={CY} r={CENTER_R + 10}
                  fill="none" stroke="rgba(223,255,0,0.07)" strokeWidth={1}
                />
              )}
              <text x={CX} y={CY - 8} textAnchor="middle" fontSize={8.5} fontWeight="800"
                letterSpacing="0.18em" fill="var(--accent)"
                style={{ pointerEvents: "none", userSelect: "none" }}>
                YOUR
              </text>
              <text x={CX} y={CY + 8} textAnchor="middle" fontSize={8.5} fontWeight="800"
                letterSpacing="0.18em" fill="var(--accent)"
                style={{ pointerEvents: "none", userSelect: "none" }}>
                BUSINESS
              </text>
            </svg>
          </div>
        </div>

        {/* ── Detail panel, below the diagram, full width ── */}
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(223,255,0,0.2)",
                padding: "2rem 2.5rem",
                marginBottom: "2.5rem",
              }}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-4">
                  <div style={{ color: "var(--accent)", fontSize: "2rem" }}>{activeNode.icon}</div>
                  <div>
                    <div className="font-bold" style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}>{activeNode.label}</div>
                    <div className="label-mono text-xs" style={{ color: "var(--accent)" }}>{activeNode.tagline}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="label-mono text-xs" style={{ color: "var(--text-muted)", marginBottom: "0.25rem" }}>Starting from</div>
                    <div className="font-mono font-bold" style={{ color: "var(--accent)", fontSize: "1rem" }}>{activeNode.price}</div>
                  </div>
                  <div className="text-center">
                    <div className="label-mono text-xs" style={{ color: "var(--text-muted)", marginBottom: "0.25rem" }}>Timeline</div>
                    <div className="font-mono font-bold" style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>{activeNode.timeline}</div>
                  </div>
                </div>
              </div>

              {/* Body, 3 columns on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Description + why it matters */}
                <div className="md:col-span-1">
                  <div className="label-mono text-xs" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>What We Do</div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                    {activeNode.desc}
                  </p>
                  <div className="rounded-lg" style={{ background: "rgba(223,255,0,0.04)", border: "1px solid rgba(223,255,0,0.1)", padding: "0.875rem 1rem" }}>
                    <div className="label-mono text-xs" style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Why It Matters</div>
                    <p className="text-xs" style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>{activeNode.whyItMatters}</p>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <div className="label-mono text-xs" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>What&apos;s Included</div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {activeNode.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                        <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best for + CTA */}
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <div className="label-mono text-xs" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>Best For</div>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>{activeNode.bestFor}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <Link
                      href="/tools/estimator"
                      className="btn-accent text-xs text-center"
                      style={{ padding: "0.75rem 1.25rem" }}
                      data-cursor="OPEN"
                    >
                      Estimate This →
                    </Link>
                    <Link
                      href="/contact"
                      className="label-mono text-xs text-center hover:text-white transition-colors"
                      style={{ color: "var(--text-muted)" }}
                      data-cursor="OPEN"
                    >
                      Talk to us about {activeNode.label}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "1.25rem 2rem",
                marginBottom: "2.5rem",
                textAlign: "center",
              }}
            >
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Tap any node in the diagram above to explore what Nuuhaven delivers for that part of your business.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA buttons, always at bottom center ── */}
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/tools/estimator" className="btn-accent text-xs px-5 py-2.5" data-cursor="OPEN">
            Estimate Your Ecosystem →
          </Link>
          <Link href="/contact" className="btn-outline text-xs px-5 py-2.5" data-cursor="OPEN">
            Book a Strategy Session
          </Link>
        </div>
      </div>
    </section>
  );
}
