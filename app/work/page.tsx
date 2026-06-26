"use client";

import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────
// Gantt: Jan 2026 (0) → Jun 2026 (5), total 6 months
const CLIENTS = [
  {
    id: "nucleus",
    name: "Nucleus Systems",
    code: "NUC-001",
    industry: "Technology",
    status: "Ongoing",
    statusColor: "#dfff00",
    phase: "Retainer",
    progress: 100,
    startDate: "Jan 2026",
    endDate: "Ongoing",
    lastUpdate: "Jun 2026",
    nextMilestone: "Content refresh, Jul 2026",
    health: "green",
    url: "https://nucleus-systems.com",
    accent: "#dfff00",
    tagline: "Full-stack digital presence for a fast-growing IT services company.",
    about: "Nucleus Systems is a technology and digital solutions provider delivering IT support, infrastructure management, and software solutions to businesses across South Africa.",
    challenge: "Nucleus needed to enter the market with a credible, professional presence to compete with established players, they had the expertise but lacked the visual identity to communicate it.",
    services: ["Visual Brand Identity","Corporate Website","Social Media Setup","Marketing Collateral","Corporate Documentation","Content Development","Ongoing Retainer"],
    outcomes: ["Professional market presence from day one","Clear communication of value proposition","Integrated brand ecosystem across all touchpoints","Project evolved into a long-term retainer"],
    colors: ["#ffffff","#1a6bff","#ff6b00"],
    colorNames: ["White","Blue","Orange"],
    ganttStart: 0,  // Jan 2026
    ganttEnd: 6,    // ongoing
    isOngoing: true,
    timeline: [
      { label: "Discovery", done: true, date: "Mar 2024" },
      { label: "Brand Identity", done: true, date: "Apr 2024" },
      { label: "Website", done: true, date: "May 2024" },
      { label: "Collateral", done: true, date: "Jun 2024" },
      { label: "Retainer", done: true, date: "Jul 2024" },
    ],
    activity: [
      { text: "Monthly content pack delivered", time: "Jun 2026", type: "delivery" },
      { text: "Retainer renewed, Q3 2026", time: "Jun 2026", type: "milestone" },
      { text: "Website performance review", time: "May 2026", type: "review" },
    ],
  },
  {
    id: "omn",
    name: "Outdoor Movie Nights",
    code: "OMN-004",
    industry: "Entertainment",
    status: "Ongoing",
    statusColor: "#dfff00",
    phase: "Live",
    progress: 100,
    startDate: "Jun 2026",
    endDate: "Ongoing",
    lastUpdate: "Jun 2026",
    nextMilestone: "Season 2 collateral",
    health: "green",
    url: "https://outdoormovienights.co.za",
    accent: "#e63946",
    tagline: "Cinematic brand and digital presence for South Africa's outdoor film experience.",
    about: "Outdoor Movie Nights brings premium cinema experiences to outdoor venues, parks, estates, and corporate events.",
    challenge: "Capturing the magic of outdoor cinema in every brand touchpoint, from website to social to event proposals.",
    services: ["Event Branding & Identity","Marketing Assets","Event Proposal Design","Website Development","Social Media Assets"],
    outcomes: ["Distinctive cinematic brand identity","Professional proposals enabling corporate bookings","Strong digital presence for event discovery","Consistent visual language across all touchpoints"],
    colors: ["#ffffff","#e63946","#d4af37"],
    colorNames: ["White","Red","Gold"],
    ganttStart: 5,  // Jun 2026
    ganttEnd: 6,
    isOngoing: true,
    timeline: [
      { label: "Discovery", done: true, date: "Jun 2026" },
      { label: "Brand Identity", done: true, date: "Jun 2026" },
      { label: "Website & Social", done: true, date: "Jun 2026" },
      { label: "Event Collateral", done: true, date: "Jun 2026" },
      { label: "Launch", done: true, date: "Jun 2026" },
    ],
    activity: [
      { text: "Season 2 collateral scoping started", time: "Jun 2026", type: "review" },
      { text: "Website launched", time: "Jun 2026", type: "milestone" },
      { text: "Brand identity approved", time: "Jun 2026", type: "milestone" },
    ],
  },
  {
    id: "hlophe",
    name: "Hlophe Outdoor Media",
    code: "HOM-003",
    industry: "Advertising",
    status: "Ongoing",
    statusColor: "#dfff00",
    phase: "Live",
    progress: 100,
    startDate: "Mar 2026",
    endDate: "Ongoing",
    lastUpdate: "Jun 2026",
    nextMilestone: "Scope expansion discussion",
    health: "green",
    url: "https://hlophemedia.co.za",
    accent: "#7c3aed",
    tagline: "Township-focused outdoor advertising brand built for corporate credibility.",
    about: "Hlophe Outdoor Media operates billboards and media spaces in township markets across South Africa, competing credibly in the broader advertising industry.",
    challenge: "A clear vision with no brand to back it. They needed to present professionally to corporate advertisers.",
    services: ["Brand Identity Development","Corporate Website","Social Media Setup","Company Profile","Marketing Materials","Branded Digital Assets"],
    outcomes: ["Early-stage concept transformed into branded organisation","Credible presence in the advertising industry","Professional communication to corporate clients","Enhanced market perception with larger advertisers"],
    colors: ["#ffffff","#7c3aed","#a855f7"],
    colorNames: ["White","Royal Purple","Purple"],
    ganttStart: 2,  // Mar 2026
    ganttEnd: 6,
    isOngoing: true,
    timeline: [
      { label: "Discovery", done: true, date: "Mar 2026" },
      { label: "Brand Identity", done: true, date: "Apr 2026" },
      { label: "Website", done: true, date: "May 2026" },
      { label: "Collateral", done: true, date: "Jun 2026" },
      { label: "Launch", done: true, date: "Jun 2026" },
    ],
    activity: [
      { text: "Final deliverables handed over", time: "Jun 2026", type: "milestone" },
      { text: "Brand guidelines delivered", time: "May 2026", type: "delivery" },
      { text: "Website development complete", time: "May 2026", type: "delivery" },
    ],
  },
  {
    id: "lona",
    name: "Lona Premium Shuttles",
    code: "LON-002",
    industry: "Transportation",
    status: "Ongoing",
    statusColor: "#dfff00",
    phase: "Live",
    progress: 100,
    startDate: "May 2026",
    endDate: "Ongoing",
    lastUpdate: "Jun 2026",
    nextMilestone: "Quarterly brand check-in",
    health: "green",
    url: "https://lonapremiumshuttles.com",
    accent: "#d4af37",
    tagline: "A premium shuttle brand built to attract corporate and high-value clients.",
    about: "Lona Premium Shuttles is focused on premium, reliable shuttle services for corporate clients, airport transfers, and events.",
    challenge: "Lona needed to differentiate through brand quality, positioning themselves as the premium choice in a competitive shuttle market.",
    services: ["Brand Strategy & Visual Identity","Corporate Website","Social Media Setup","Company Profile","Marketing Materials","Branded Digital Assets","Content Creation"],
    outcomes: ["Professional, market-ready brand presence","Entered market with credible premium identity","Consistent visual identity across all touchpoints","Strong brand foundation for long-term growth"],
    colors: ["#ffffff","#d4af37","#b8963e"],
    colorNames: ["White","Gold","Dark Gold"],
    ganttStart: 4,  // May 2026
    ganttEnd: 6,
    isOngoing: true,
    timeline: [
      { label: "Discovery", done: true, date: "May 2026" },
      { label: "Brand Identity", done: true, date: "May 2026" },
      { label: "Website", done: true, date: "Jun 2026" },
      { label: "Collateral", done: true, date: "Jun 2026" },
      { label: "Launch", done: true, date: "Jun 2026" },
    ],
    activity: [
      { text: "All deliverables signed off", time: "Jun 2026", type: "milestone" },
      { text: "Company profile finalised", time: "Jun 2026", type: "delivery" },
      { text: "Website launched", time: "Jun 2026", type: "milestone" },
    ],
  },
];

const PIPELINE = [
  { name: "Attorney Client A", industry: "Legal Services", stage: "Proposal Sent", stageColor: "#dfff00", est: "R 5,000 – R 10,000", probability: 70 },
  { name: "Attorney Client B", industry: "Legal Services", stage: "Proposal Sent", stageColor: "#dfff00", est: "R 5,000 – R 10,000", probability: 60 },
];

const FEED = [
  { text: "Monthly retainer content delivered", time: "Jun 26, 2026", type: "delivery", client: "Nucleus Systems", clientColor: "#dfff00" },
  { text: "Proposal sent, Attorney websites", time: "Jun 18, 2026", type: "proposal", client: "Pipeline", clientColor: "#ff9500" },
  { text: "OMN Season 2 scoping started", time: "Jun 10, 2026", type: "review", client: "Outdoor Movie Nights", clientColor: "#e63946" },
  { text: "HOM deliverables signed off", time: "Jun 5, 2026", type: "milestone", client: "Hlophe Outdoor Media", clientColor: "#7c3aed" },
  { text: "LPS website launched", time: "Jun 1, 2026", type: "milestone", client: "Lona Premium Shuttles", clientColor: "#d4af37" },
];

// ── Gantt: Jan 2026 → Jun 2026 = 6 months ────────────────────────────────────
const GANTT_TOTAL = 6;
const GANTT_LABELS = ["Jan '26", "Feb '26", "Mar '26", "Apr '26", "May '26", "Jun '26"];

// ── Helpers ───────────────────────────────────────────────────────────────────
function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const update = () => setT(new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>{t}</span>;
}

function ProgressRing({ pct, color, size = 60, stroke = 3 }: { pct: number; color: string; size?: number; stroke?: number }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const cx = size / 2, cy = size / 2;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <motion.circle
        cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (circ * pct / 100) }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  );
}

function DonutChart({ data }: { data: { name: string; count: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  let offset = 0;
  const cx = 70, cy = 70, r = 52, stroke = 18;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={140} height={140} style={{ transform: "rotate(-90deg)" }}>
      {data.map((d, i) => {
        const pct = d.count / total;
        const dash = circ * pct - 2;
        const gap = circ - dash;
        const slice = (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none" stroke={d.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-(offset * circ) + circ * 0.005}
            initial={{ opacity: 0, strokeDasharray: `0 ${circ}` }}
            animate={{ opacity: 1, strokeDasharray: `${dash} ${gap}` }}
            transition={{ duration: 1.0, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        );
        offset += pct;
        return slice;
      })}
    </svg>
  );
}

function SitePortal({ url, accent, name }: { url: string; accent: string; name: string }) {
  const [state, setState] = useState<"loading"|"loaded"|"blocked">("loading");
  const [live, setLive] = useState(false);
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${accent}25`, background: "#050505" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.5rem 0.875rem", background: "rgba(12,12,12,0.99)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          {["#ff5f57","#ffbd2e","#28ca41"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 5, padding: "0.25rem 0.625rem", fontFamily: "var(--font-geist-mono)", fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{url.replace("https://","")}</div>
        <button onClick={() => setLive(l => !l)} style={{ padding: "0.2rem 0.5rem", borderRadius: 4, fontSize: "0.6rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${live ? accent : "rgba(255,255,255,0.1)"}`, background: live ? `${accent}18` : "transparent", color: live ? accent : "rgba(255,255,255,0.35)", cursor: "pointer", transition: "all 0.2s" }}>{live ? "◉ Live" : "○ Preview"}</button>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.6rem", fontFamily: "var(--font-geist-mono)", color: "rgba(255,255,255,0.35)", textDecoration: "none", padding: "0.2rem 0.5rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4 }}>↗</a>
      </div>
      <div style={{ height: 420, position: "relative", background: "#080808", overflow: "hidden" }}>
        {state === "loading" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem", zIndex: 2 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${accent}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em" }}>LOADING</div>
          </div>
        )}
        {state === "blocked" ? (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", textAlign: "center", padding: "2rem" }}>
            <div style={{ color: accent, fontSize: "2rem" }}>◎</div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.7, maxWidth: "20rem" }}>Security headers prevent embedding. Open the site directly.</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn-accent" style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}>Visit Live Site ↗</a>
          </div>
        ) : (
          <iframe
            key={url}
            src={url}
            title={name}
            className="previewer-frame"
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: live ? "100%" : "142.86%",
              maxWidth: "none",
              height: live ? "100%" : "142.86%",
              border: "none",
              transform: live ? "none" : "scale(0.7)",
              transformOrigin: "top left",
              pointerEvents: live ? "auto" : "none",
              opacity: state === "loading" ? 0 : 1,
              transition: "opacity 0.4s",
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
            onLoad={() => setState("loaded")}
            onError={() => setState("blocked")}
            loading="lazy"
          />
        )}
        {!live && state === "loaded" && (
          <div
            onClick={() => setLive(true)}
            style={{ position: "absolute", inset: 0, cursor: "pointer", zIndex: 1, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: "0.875rem", pointerEvents: "auto", touchAction: "pan-y" }}
          >
            <div style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", border: `1px solid ${accent}35`, borderRadius: 6, padding: "0.4rem 0.75rem", fontSize: "0.65rem", fontFamily: "var(--font-geist-mono)", color: accent, textTransform: "uppercase", letterSpacing: "0.1em", pointerEvents: "none" }}>Click to interact ↑</div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Dashboard Overview ────────────────────────────────────────────────────────
function Dashboard({ onOpen }: { onOpen: (id: string) => void }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: "0 0 4rem" }}>

      {/* Top bar */}
      <div style={{ padding: "1rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(5,5,5,0.95)", backdropFilter: "blur(12px)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Nuuhaven · Command Centre</div>
          <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>Portfolio Overview</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>LIVE</span>
          </div>
          <LiveClock />
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ padding: isMobile ? "1rem" : "1.5rem 2rem", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: "0.75rem" }}>
        {[
          {
            label: "Active Projects",
            value: "4",
            sub: "All currently ongoing",
            icon: "◈",
            color: "#dfff00",
            bg: "rgba(223,255,0,0.05)",
            border: "rgba(223,255,0,0.15)",
          },
          {
            label: "Industries Served",
            value: "4",
            sub: "Tech · Transport · Ad · Entertainment",
            icon: "◎",
            color: "#a78bfa",
            bg: "rgba(167,139,250,0.05)",
            border: "rgba(167,139,250,0.15)",
          },
          {
            label: "Pipeline",
            value: "2",
            sub: "Legal services prospects",
            icon: "→",
            color: "#ff9500",
            bg: "rgba(255,149,0,0.05)",
            border: "rgba(255,149,0,0.15)",
          },
        ].map((k, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: k.bg, border: `1px solid ${k.border}`, borderRadius: 14, padding: "1.25rem 1.375rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{k.label}</span>
              <span style={{ fontSize: "1rem", color: k.color, opacity: 0.8 }}>{k.icon}</span>
            </div>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, color: k.color, lineHeight: 1, letterSpacing: "-0.03em", fontFamily: "var(--font-geist-mono)" }}>{k.value}</div>
            <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{k.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Gantt Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        style={{ margin: isMobile ? "0 1rem 1.5rem" : "0 2rem 1.5rem", background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}
      >
        <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.15rem" }}>Project Timeline</div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>Jan 2026 → Jun 2026 · All active ecosystems</div>
          </div>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", color: "var(--accent)", letterSpacing: "0.1em" }}>4 PROJECTS</div>
        </div>

        <div style={{ padding: "1.25rem 1.5rem" }}>
          {/* Month axis */}
          <div style={{ display: "flex", marginBottom: "0.75rem", marginLeft: 160, position: "relative" }}>
            {GANTT_LABELS.map((l, i) => (
              <div key={i} style={{ flex: 1, fontFamily: "var(--font-geist-mono)", fontSize: "0.5rem", color: l ? "rgba(255,255,255,0.2)" : "transparent", textAlign: "center", letterSpacing: "0.04em" }}>{l}</div>
            ))}
          </div>
          {/* Grid lines */}
          <div style={{ position: "relative", marginLeft: 160 }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", pointerEvents: "none" }}>
              {GANTT_LABELS.map((_, i) => (
                <div key={i} style={{ flex: 1, borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.04)" }} />
              ))}
            </div>
            {/* Today marker */}
            <div style={{ position: "absolute", left: `${(GANTT_TOTAL / GANTT_TOTAL) * 100}%`, top: 0, bottom: 0, width: 1, background: "rgba(223,255,0,0.4)", zIndex: 10 }}>
              <div style={{ position: "absolute", top: -18, left: -16, fontFamily: "var(--font-geist-mono)", fontSize: "0.5rem", color: "var(--accent)", whiteSpace: "nowrap", letterSpacing: "0.06em" }}>NOW</div>
            </div>
          </div>

          {/* Project rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {CLIENTS.map((c, i) => {
              const startPct = (c.ganttStart / GANTT_TOTAL) * 100;
              const widthPct = ((c.ganttEnd - c.ganttStart) / GANTT_TOTAL) * 100;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                  style={{ display: "flex", alignItems: "center", gap: "0", height: 38 }}
                >
                  {/* Label */}
                  <div style={{ width: 160, flexShrink: 0, paddingRight: "1rem" }}>
                    <button
                      onClick={() => onOpen(c.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", textAlign: "right", width: "100%", padding: 0 }}
                    >
                      <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: "0.1rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.55rem", color: c.accent, opacity: 0.7 }}>{c.code}</div>
                    </button>
                  </div>
                  {/* Bar track */}
                  <div style={{ flex: 1, position: "relative", height: "100%" }}>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
                      <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.04)" }} />
                    </div>
                    <div style={{ position: "absolute", left: `${startPct}%`, width: `${widthPct}%`, top: "50%", transform: "translateY(-50%)" }}>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.9, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          height: 24,
                          background: `linear-gradient(90deg, ${c.accent}CC, ${c.accent}66)`,
                          borderRadius: c.isOngoing ? "6px 0 0 6px" : 6,
                          transformOrigin: "left",
                          display: "flex", alignItems: "center", paddingLeft: "0.4rem", paddingRight: "0.4rem", gap: "0.3rem",
                          boxShadow: `0 0 12px ${c.accent}30`,
                          position: "relative",
                        }}
                      >
                        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.52rem", color: "#000", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", letterSpacing: "0.04em" }}>
                          {c.startDate}
                        </span>
                        {c.isOngoing && (
                          <div style={{ position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.accent, boxShadow: `0 0 8px ${c.accent}`, animation: "pulse 1.5s infinite" }} />
                          </div>
                        )}
                      </motion.div>
                    </div>
                    {/* Phase dots */}
                    {c.timeline.map((p, j) => {
                      const phasePct = startPct + (j / (c.timeline.length - 1)) * widthPct * (c.isOngoing ? 0.18 : 1);
                      return (
                        <div key={j} style={{ position: "absolute", left: `${phasePct}%`, top: "50%", transform: "translate(-50%, -50%)", zIndex: 5 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.accent, border: "1px solid #000", boxShadow: `0 0 4px ${c.accent}` }} />
                        </div>
                      );
                    })}
                  </div>
                  {/* End label */}
                  <div style={{ width: 56, flexShrink: 0, paddingLeft: "0.5rem" }}>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.52rem", color: c.accent, opacity: 0.7 }}>{c.isOngoing ? "Ongoing" : c.endDate}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Project Cards Grid */}
      <div style={{ margin: isMobile ? "0 1rem 1.5rem" : "0 2rem 1.5rem" }}>
        <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Client Workspaces</div>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>Click any card to open workspace</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1rem" }}>
          {CLIENTS.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onOpen(c.id)}
              style={{ textAlign: "left", cursor: "pointer", background: "none", border: "none", padding: 0 }}
            >
              <div
                style={{ background: "rgba(10,10,10,0.95)", border: `1px solid rgba(255,255,255,0.07)`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s, transform 0.2s", position: "relative" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${c.accent}45`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                {/* Accent header band */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${c.accent}, ${c.accent}44)` }} />

                <div style={{ padding: "1.25rem" }}>
                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.statusColor, boxShadow: `0 0 6px ${c.statusColor}`, flexShrink: 0 }} />
                        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.56rem", color: c.statusColor, letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.status}</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.15rem", letterSpacing: "-0.01em" }}>{c.name}</div>
                      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.57rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{c.code} · {c.industry}</div>
                    </div>
                    {/* Progress ring */}
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <ProgressRing pct={c.progress} color={c.accent} size={56} stroke={3} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", fontWeight: 800, color: c.accent, lineHeight: 1 }}>{c.progress}</span>
                        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.44rem", color: "rgba(255,255,255,0.3)" }}>%</span>
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: "1rem" }}>{c.tagline}</p>

                  {/* Services tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "1rem" }}>
                    {c.services.slice(0, 4).map((s, j) => (
                      <span key={j} style={{ fontSize: "0.62rem", padding: "0.2rem 0.5rem", borderRadius: 999, background: `${c.accent}0f`, border: `1px solid ${c.accent}20`, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-geist-mono)" }}>{s}</span>
                    ))}
                    {c.services.length > 4 && (
                      <span style={{ fontSize: "0.62rem", padding: "0.2rem 0.5rem", borderRadius: 999, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-geist-mono)" }}>+{c.services.length - 4}</span>
                    )}
                  </div>

                  {/* Footer row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                      {c.colors.map((col) => (
                        <div key={col} style={{ width: 14, height: 14, borderRadius: 3, background: col, border: "1px solid rgba(255,255,255,0.1)" }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)" }}>{c.startDate}</span>
                      <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.15)" }}>→</span>
                      <span style={{ fontSize: "0.68rem", color: c.isOngoing ? c.accent : "rgba(255,255,255,0.35)" }}>{c.isOngoing ? "Ongoing" : c.endDate}</span>
                    </div>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: c.accent, opacity: 0.8, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      Open <span style={{ fontSize: "0.7rem" }}>↗</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom 2-col: Pipeline | Activity */}
      <div style={{ margin: isMobile ? "0 1rem" : "0 2rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>

        {/* Sales Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.5 }}
          style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "1.25rem" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Sales Pipeline</div>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.56rem", color: "#ff9500", background: "rgba(255,149,0,0.1)", border: "1px solid rgba(255,149,0,0.2)", borderRadius: 999, padding: "0.15rem 0.5rem" }}>2 ACTIVE</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {PIPELINE.map((p, i) => (
              <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,0.025)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.625rem" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.82rem", marginBottom: "0.15rem" }}>{p.name}</div>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.57rem", color: "rgba(255,255,255,0.3)" }}>{p.industry}</div>
                  </div>
                  <div style={{ fontSize: "0.58rem", padding: "0.15rem 0.5rem", borderRadius: 999, background: `${p.stageColor}12`, border: `1px solid ${p.stageColor}28`, color: p.stageColor, fontFamily: "var(--font-geist-mono)", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{p.stage}</div>
                </div>
                <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.78rem", fontWeight: 700, color: p.stageColor, marginBottom: "0.5rem" }}>{p.est}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${p.probability}%` }} transition={{ duration: 1.2, delay: 0.9, ease: [0.22,1,0.36,1] }} style={{ height: "100%", background: `linear-gradient(90deg, ${p.stageColor}88, ${p.stageColor})`, borderRadius: 999 }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: p.stageColor, flexShrink: 0 }}>{p.probability}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.86, duration: 0.5 }}
          style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "1.25rem", display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Recent Activity</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.54rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>LIVE</span>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.1rem" }}>
            {FEED.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.06 }}
                style={{ padding: "0.625rem 0.75rem", borderRadius: 8, background: "rgba(255,255,255,0.02)", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.clientColor, flexShrink: 0, marginTop: "0.25rem", boxShadow: `0 0 5px ${f.clientColor}60` }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5, marginBottom: "0.15rem" }}>{f.text}</div>
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.54rem", color: "rgba(255,255,255,0.2)" }}>{f.time}</span>
                    <span style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.1)" }}>·</span>
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.54rem", color: f.clientColor, opacity: 0.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.client}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Link href="/contact" className="btn-accent" style={{ display: "block", textAlign: "center", fontSize: "0.72rem", padding: "0.7rem 1rem", marginTop: "1rem" }}>Start a Project →</Link>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
      `}</style>
    </div>
  );
}

// ── Client Workspace ──────────────────────────────────────────────────────────
function ClientWorkspace({ client, onBack }: { client: typeof CLIENTS[0]; onBack: () => void }) {
  const isMobile = useIsMobile();
  return (
    <div>
      {/* Header */}
      <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(5,5,5,0.95)", backdropFilter: "blur(12px)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", position: "sticky", top: 68, zIndex: 20 }}>
        <div>
          <button onClick={onBack} style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span>←</span> Portfolio
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: client.statusColor, boxShadow: `0 0 6px ${client.statusColor}` }} />
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{client.code} · {client.status}</span>
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, marginBottom: "0.2rem", letterSpacing: "-0.02em" }}>{client.name}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", margin: 0 }}>{client.tagline}</p>
        </div>
        <div style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
          <a href={client.url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.7rem", padding: "0.55rem 1rem" }}>Open Site ↗</a>
          <Link href="/contact" className="btn-accent" style={{ fontSize: "0.7rem", padding: "0.55rem 1rem" }}>Similar Project →</Link>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: isMobile ? "1rem" : "2rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 300px", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Project stats row */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "0.75rem" }}>
            {[
              { label: "Phase", value: client.phase, color: client.accent },
              { label: "Started", value: client.startDate, color: "rgba(255,255,255,0.7)" },
              { label: "Completed", value: client.isOngoing ? "Ongoing" : client.endDate, color: client.isOngoing ? client.accent : "rgba(255,255,255,0.7)" },
              { label: "Deliverables", value: `${client.services.length}`, color: client.accent },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(10,10,10,0.9)", border: `1px solid rgba(255,255,255,0.06)`, borderRadius: 10, padding: "0.875rem 1rem" }}>
                <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.35rem" }}>{s.label}</div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>Project Timeline</div>
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.56rem", color: "rgba(255,255,255,0.25)" }}>{client.startDate} → {client.isOngoing ? "Ongoing" : client.endDate}</div>
            </div>
            <div style={{ display: "flex", position: "relative" }}>
              {client.timeline.map((p, i) => (
                <div key={i} style={{ flex: 1, position: "relative" }}>
                  {i < client.timeline.length - 1 && (
                    <div style={{ position: "absolute", top: 14, left: "50%", right: "-50%", height: 2, background: p.done ? client.accent : "rgba(255,255,255,0.06)", zIndex: 0, transition: "background 0.3s" }} />
                  )}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.12, type: "spring", stiffness: 200 }}
                      style={{ width: 28, height: 28, borderRadius: "50%", background: p.done ? `${client.accent}20` : "rgba(255,255,255,0.04)", border: `2px solid ${p.done ? client.accent : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, boxShadow: p.done ? `0 0 12px ${client.accent}30` : "none" }}>
                      {p.done && <div style={{ width: 8, height: 8, borderRadius: "50%", background: client.accent }} />}
                    </motion.div>
                    <div style={{ fontSize: "0.62rem", textAlign: "center", color: p.done ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.2)", lineHeight: 1.4, fontFamily: "var(--font-geist-mono)" }}>{p.label}</div>
                    <div style={{ fontSize: "0.54rem", color: p.done ? client.accent : "rgba(255,255,255,0.15)", fontFamily: "var(--font-geist-mono)", opacity: 0.8 }}>{p.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live portal */}
          <div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: client.accent, marginBottom: "0.75rem" }}>Live Website Portal</div>
            <SitePortal url={client.url} accent={client.accent} name={client.name} />
          </div>

          {/* About + Challenge */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { label: "About", body: client.about },
              { label: "Challenge", body: client.challenge },
            ].map((card) => (
              <div key={card.label} style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.125rem" }}>
                <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: client.accent, marginBottom: "0.625rem" }}>{card.label}</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.85, margin: 0 }}>{card.body}</p>
              </div>
            ))}
          </div>

          {/* Outcomes */}
          <div style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.25rem" }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: client.accent, marginBottom: "1rem" }}>Outcomes Delivered</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {client.outcomes.map((o, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.07 }} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: `${client.accent}12`, border: `1px solid ${client.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.15rem" }}>
                    <span style={{ color: client.accent, fontSize: "0.55rem" }}>✓</span>
                  </div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.76rem", lineHeight: 1.7 }}>{o}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Services */}
          <div style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.125rem" }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.75rem" }}>Services Delivered</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {client.services.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0", borderBottom: i < client.services.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: client.accent, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>{s}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Brand colours */}
          <div style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.125rem" }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.75rem" }}>Brand Palette</div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {client.colors.map((col, i) => (
                <div key={col} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <div style={{ width: "100%", aspectRatio: "1", borderRadius: 8, background: col, border: "1px solid rgba(255,255,255,0.08)" }} />
                  <div style={{ fontSize: "0.56rem", fontFamily: "var(--font-geist-mono)", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>{client.colorNames[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.125rem", flex: 1 }}>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.75rem" }}>Activity Log</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
              {client.activity.map((a, i) => (
                <div key={i} style={{ padding: "0.5rem 0.625rem", borderRadius: 7, background: "rgba(255,255,255,0.02)", display: "flex", gap: "0.4rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: client.accent, flexShrink: 0, marginTop: "0.25rem" }} />
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, marginBottom: "0.1rem" }}>{a.text}</div>
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.54rem", color: "rgba(255,255,255,0.2)" }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [active, setActive] = useState("overview");
  const client = CLIENTS.find(c => c.id === active);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: 68 }}>
      {/* Mobile pills */}
      <div className="lg:hidden hide-scrollbar" style={{ display: "flex", gap: "0.4rem", overflowX: "auto", padding: "0.625rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(5,5,5,0.95)", position: "sticky", top: 68, zIndex: 10 }}>
        {[{ id: "overview", label: "Dashboard" }, ...CLIENTS.map(c => ({ id: c.id, label: c.name }))].map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            style={{ flexShrink: 0, padding: "0.375rem 0.75rem", borderRadius: 999, fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", background: active === item.id ? "var(--accent)" : "rgba(255,255,255,0.05)", color: active === item.id ? "#000" : "rgba(255,255,255,0.45)", border: "none", transition: "all 0.2s" }}>
            {item.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
          {active === "overview" ? (
            <Dashboard onOpen={setActive} />
          ) : client ? (
            <ClientWorkspace client={client} onBack={() => setActive("overview")} />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
