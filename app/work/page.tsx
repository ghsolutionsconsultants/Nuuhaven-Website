"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

// ── Client data ───────────────────────────────────────────────────────────────
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
    ganttEnd: 11,   // ongoing
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
    ganttEnd: 11,
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
    ganttEnd: 11,
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
    ganttEnd: 11,
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
  {
    id: "45one",
    name: "45one",
    code: "FOR-005",
    industry: "Sports Media",
    status: "Live",
    statusColor: "#dfff00",
    phase: "Live",
    progress: 100,
    startDate: "Aug 2026",
    endDate: "Aug 2026",
    lastUpdate: "Aug 2026",
    nextMilestone: "Post-launch review",
    health: "green",
    url: "https://45one.co.za",
    accent: "#f2ff00",
    tagline: "Football, in depth: a content platform for South African and European football.",
    about: "45one is a South African football content brand: the weekly 451 podcast, long-form PSL and European league analysis, short-form video and writing.",
    challenge: "A content-heavy brand needed one home for podcast, analysis and fan engagement that feels as sharp as the football talk.",
    services: ["Brand Identity","Content Platform Website","Podcast Hub","Interactive Tactics Board","Football IQ Quiz","Fantasy League Integration"],
    outcomes: ["Single home for podcast, video and writing","Interactive tools that keep fans on site","Distinctive high-energy football brand","Weekly content cadence supported by the platform"],
    colors: ["#000000","#f2ff00","#ffffff"],
    colorNames: ["Black","Electric Yellow","White"],
    ganttStart: 7,
    ganttEnd: 8,
    isOngoing: false,
    timeline: [
      { label: "Discovery", done: true, date: "Aug 2026" },
      { label: "Brand Identity", done: true, date: "Aug 2026" },
      { label: "Website", done: true, date: "Aug 2026" },
      { label: "Content", done: true, date: "Aug 2026" },
      { label: "Launch", done: true, date: "Aug 2026" },
    ],
    activity: [
      { text: "Website launched", time: "Aug 2026", type: "milestone" },
    ],
  },
  {
    id: "drnontu",
    name: "Dr Nontu Medical Practice",
    code: "MED-006",
    industry: "Healthcare",
    status: "Live",
    statusColor: "#dfff00",
    phase: "Live",
    progress: 100,
    startDate: "Sep 2026",
    endDate: "Sep 2026",
    lastUpdate: "Sep 2026",
    nextMilestone: "Post-launch review",
    health: "green",
    url: "https://drnontu.co.za",
    accent: "#c9a24d",
    tagline: "Every patient. Expertly cared for. A GP practice brand across two locations.",
    about: "Dr Nontu Medical Practice, led by Dr Nontuthuko Ndlovu, is a general practice in Esther Park (Kempton Park) and Fourways offering consultations, house calls, virtual care and chronic care.",
    challenge: "The practice needed a warm yet credible online presence that explains services, two locations and new membership plans clearly.",
    services: ["Brand Identity","Practice Website","Service Pages","Membership Plans","Location & Contact Journeys"],
    outcomes: ["Clear service and location information for patients","Membership plans presented with transparent pricing","Warm, trustworthy practice brand","Virtual and house-call options made discoverable"],
    colors: ["#ffffff","#c9a24d","#7a5a22"],
    colorNames: ["White","Gold","Deep Bronze"],
    ganttStart: 8,
    ganttEnd: 9,
    isOngoing: false,
    timeline: [
      { label: "Discovery", done: true, date: "Sep 2026" },
      { label: "Brand Identity", done: true, date: "Sep 2026" },
      { label: "Website", done: true, date: "Sep 2026" },
      { label: "Content", done: true, date: "Sep 2026" },
      { label: "Launch", done: true, date: "Sep 2026" },
    ],
    activity: [
      { text: "Website launched", time: "Sep 2026", type: "milestone" },
    ],
  },
  {
    id: "cta",
    name: "Code Trust Assurance",
    code: "CTA-007",
    industry: "Software Assurance",
    status: "Live",
    statusColor: "#dfff00",
    phase: "Live",
    progress: 100,
    startDate: "Oct 2026",
    endDate: "Oct 2026",
    lastUpdate: "Oct 2026",
    nextMilestone: "Post-launch review",
    health: "green",
    url: "https://codetrustassurance.com",
    accent: "#3b82f6",
    tagline: "Security tools find issues. This framework proves trust.",
    about: "The Code Trust Assurance Framework by Nucleus Systems scores software across six domains and 86 controls, issues CTA-1 to CTA-4 certificates, and publishes a public Trust Registry.",
    challenge: "A technical certification standard had to read as authoritative and easy to follow for buyers, vendors and assessors alike.",
    services: ["Framework Website","Certification Levels","Public Trust Registry","Assessment Offer Pages","Technical Documentation"],
    outcomes: ["Credible home for a new software trust standard","Clear path from framework to paid assessment","Public registry that builds market confidence","Extends the Nucleus Systems brand ecosystem"],
    colors: ["#0b50c8","#54657c","#ffffff"],
    colorNames: ["Trust Blue","Slate","White"],
    ganttStart: 9,
    ganttEnd: 10,
    isOngoing: false,
    timeline: [
      { label: "Discovery", done: true, date: "Oct 2026" },
      { label: "Brand Identity", done: true, date: "Oct 2026" },
      { label: "Website", done: true, date: "Oct 2026" },
      { label: "Content", done: true, date: "Oct 2026" },
      { label: "Launch", done: true, date: "Oct 2026" },
    ],
    activity: [
      { text: "Website launched", time: "Oct 2026", type: "milestone" },
    ],
  },
  {
    id: "dtff",
    name: "Digital Trust Futures Foundation",
    code: "DTF-008",
    industry: "Non-Profit",
    status: "Live",
    statusColor: "#dfff00",
    phase: "Live",
    progress: 100,
    startDate: "Oct 2026",
    endDate: "Oct 2026",
    lastUpdate: "Oct 2026",
    nextMilestone: "Post-launch review",
    health: "green",
    url: "https://digitaltrustfuturesfoundation.org",
    accent: "#6fa3d8",
    tagline: "Digital public infrastructure is only as good as the protection around it.",
    about: "Digital Trust Futures Foundation is an independent, non-profit public-benefit organisation protecting people, their rights and institutions as digital public infrastructure scales across Africa and the Global South.",
    challenge: "A new foundation with five programme divisions needed a clear, credible voice for governments, digital public goods and civil society partners.",
    services: ["Brand Identity","Foundation Website","Programme Division Architecture","Positioning & Content","Partnership Journey"],
    outcomes: ["Clear positioning as the missing protection layer","Five programme divisions explained in one structure","Credible presence for government and civil-society partners","Partner-with-us journey built in"],
    colors: ["#0e2b4a","#1b4b7d","#a9bfd2"],
    colorNames: ["Deep Navy","Trust Blue","Mist"],
    ganttStart: 9,
    ganttEnd: 10,
    isOngoing: false,
    timeline: [
      { label: "Discovery", done: true, date: "Oct 2026" },
      { label: "Brand Identity", done: true, date: "Oct 2026" },
      { label: "Website", done: true, date: "Oct 2026" },
      { label: "Content", done: true, date: "Oct 2026" },
      { label: "Launch", done: true, date: "Oct 2026" },
    ],
    activity: [
      { text: "Website launched", time: "Oct 2026", type: "milestone" },
    ],
  },
];

type Client = (typeof CLIENTS)[number];
const ALL = "All";
const pad = (n: number) => String(n).padStart(2, "0");
const mono: React.CSSProperties = { fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.18em" };

// ── Horizontal chip rail: labelled, arrowed, edge-faded so it reads as navigation ──
function ChipRail({ label, hint, items, active, onSelect }: {
  label: string; hint: string;
  items: { id: string; label: string; dot?: string }[];
  active: string; onSelect: (id: string) => void;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const update = () => {
    const t = track.current; if (!t) return;
    setEdges({ left: t.scrollLeft > 4, right: t.scrollLeft + t.clientWidth < t.scrollWidth - 4 });
  };
  useEffect(() => {
    update();
    const t = track.current;
    const el = t?.querySelector<HTMLElement>(`[data-id="${CSS.escape(active)}"]`);
    if (t && el) t.scrollTo({ left: el.offsetLeft - t.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
    addEventListener("resize", update);
    return () => removeEventListener("resize", update);
  }, [active, items.length]);
  const nudge = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.7, behavior: "smooth" });
  const arrow = (d: number) => (
    <button onClick={() => nudge(d)} aria-label={d > 0 ? "Scroll right" : "Scroll left"}
      style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(var(--accent-rgb),0.35)", background: "rgba(var(--accent-rgb),0.08)", color: "var(--accent)", cursor: "pointer", display: "grid", placeItems: "center", opacity: (d < 0 ? edges.left : edges.right) ? 1 : 0.3 }}>
      {d > 0 ? "→" : "←"}
    </button>
  );
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
        <span style={{ ...mono, fontSize: "0.6rem", color: "var(--accent)" }}>{label}</span>
        <span style={{ ...mono, fontSize: "0.56rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", textAlign: "right" }}>{hint}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {arrow(-1)}
        <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
          <div ref={track} onScroll={update} className="hide-scrollbar" role="tablist"
            style={{ display: "flex", gap: 8, overflowX: "auto", scrollSnapType: "x proximity", padding: "2px 0" }}>
            {items.map(it => {
              const on = it.id === active;
              return (
                <button key={it.id} data-id={it.id} role="tab" aria-selected={on} onClick={() => onSelect(it.id)}
                  style={{ flexShrink: 0, scrollSnapAlign: "center", display: "inline-flex", alignItems: "center", gap: 8, minHeight: 38, padding: "0 16px", borderRadius: 999, whiteSpace: "nowrap", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, transition: "all .2s",
                    background: on ? "var(--accent)" : "rgba(255,255,255,0.06)", color: on ? "#000" : "rgba(255,255,255,0.78)", border: `1px solid ${on ? "var(--accent)" : "rgba(255,255,255,0.12)"}` }}>
                  {it.dot && <span aria-hidden style={{ width: 7, height: 7, borderRadius: "50%", background: on ? "#000" : it.dot }} />}
                  {it.label}
                </button>
              );
            })}
          </div>
          {edges.left && <div aria-hidden style={{ position: "absolute", inset: "0 auto 0 0", width: 32, pointerEvents: "none", background: "linear-gradient(90deg,#050505,rgba(5,5,5,0))" }} />}
          {edges.right && <div aria-hidden style={{ position: "absolute", inset: "0 0 0 auto", width: 48, pointerEvents: "none", background: "linear-gradient(270deg,#050505,rgba(5,5,5,0))" }} />}
        </div>
        {arrow(1)}
      </div>
    </div>
  );
}

// ── Project card ──
function ProjectCard({ c, i, onOpen }: { c: Client; i: number; onOpen: () => void }) {
  const host = c.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <motion.article layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }}
      onClick={onOpen} role="button" tabIndex={0} onKeyDown={e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen())}
      className="work-card"
      style={{ position: "relative", cursor: "pointer", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.09)", background: `radial-gradient(120% 80% at 0% 0%, ${c.accent}26, transparent 55%), #0b0b0b`, padding: "clamp(1.25rem,3vw,1.75rem)", display: "flex", flexDirection: "column", gap: 14, minHeight: 300, ["--accent-c" as string]: c.accent }}>
      <div style={{ margin: "calc(-1 * clamp(1.25rem,3vw,1.75rem)) calc(-1 * clamp(1.25rem,3vw,1.75rem)) 4px", borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", aspectRatio: "16 / 9", background: "#111" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/work/${c.id}.jpg`} alt={`${c.name} website`} loading="lazy" className="work-shot"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ ...mono, fontSize: "0.58rem", color: c.accent }}>{c.industry}</span>
        <span style={{ ...mono, fontSize: "0.58rem", color: "rgba(255,255,255,0.3)" }}>{pad(i + 1)}</span>
      </div>
      <h3 style={{ fontFamily: "var(--font-display, inherit)", fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, color: "#fff" }}>{c.name}</h3>
      <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.55, color: "rgba(255,255,255,0.62)", maxWidth: "46ch" }}>{c.tagline}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {c.services.slice(0, 3).map(s => (
          <span key={s} style={{ fontSize: "0.68rem", padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>{s}</span>
        ))}
        {c.services.length > 3 && <span style={{ fontSize: "0.68rem", padding: "4px 10px", color: "rgba(255,255,255,0.4)" }}>+{c.services.length - 3}</span>}
      </div>
      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#fff" }}>View case study <span style={{ color: c.accent }}>→</span></span>
        <a href={c.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
          style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.66rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "50%" }}>
          {host} ↗
        </a>
      </div>
    </motion.article>
  );
}

// ── Site preview: screenshot in a browser frame, links to the live site ──
function LivePreview({ c }: { c: Client }) {
  const host = c.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <a href={c.url} target="_blank" rel="noopener noreferrer" className="site-preview" aria-label={`Open ${c.name} live website`}
      style={{ display: "block", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line-2)", background: "var(--surface-1)", textDecoration: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "var(--surface-2)", borderBottom: "1px solid var(--line-2)" }}>
        <div style={{ display: "flex", gap: 6 }}>{["#ff5f57", "#ffbd2e", "#28ca41"].map(x => <span key={x} style={{ width: 10, height: 10, borderRadius: "50%", background: x }} />)}</div>
        <span style={{ flex: 1, minWidth: 0, fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--text-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{host}</span>
        <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--accent-ink)", whiteSpace: "nowrap" }}>Visit site ↗</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/work/${c.id}.jpg`} alt={`${c.name} website homepage`} loading="lazy"
        style={{ display: "block", width: "100%", aspectRatio: "16 / 10", objectFit: "cover", objectPosition: "top" }} />
    </a>
  );
}

// ── Case study ──
function CaseStudy({ c, list, onOpen, onClose, isMobile }: { c: Client; list: Client[]; onOpen: (id: string) => void; onClose: () => void; isMobile: boolean }) {
  const i = list.findIndex(x => x.id === c.id);
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  const section: React.CSSProperties = { borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "#0b0b0b", padding: "clamp(1.25rem,3vw,1.75rem)" };
  const h4: React.CSSProperties = { ...mono, fontSize: "0.6rem", color: c.accent, margin: "0 0 12px" };
  return (
    <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <header style={{ padding: "clamp(1.5rem,4vw,3rem) 0 clamp(1.25rem,3vw,2rem)", display: "grid", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "0.85rem", padding: "8px 0" }}>← All work</button>
          <span style={{ ...mono, fontSize: "0.6rem", color: "rgba(255,255,255,0.4)" }}>{pad(i + 1)} / {pad(list.length)}</span>
        </div>
        <span style={{ ...mono, fontSize: "0.62rem", color: c.accent }}>{c.industry}</span>
        <h1 style={{ margin: 0, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 0.98, fontSize: "clamp(2.2rem,7vw,4.5rem)", color: "#fff", textWrap: "balance" as React.CSSProperties["textWrap"] }}>{c.name}</h1>
        <p style={{ margin: 0, fontSize: "clamp(1rem,2.4vw,1.2rem)", color: "rgba(255,255,255,0.65)", maxWidth: "52ch", lineHeight: 1.5 }}>{c.tagline}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 6 }}>
          <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn-accent" style={{ fontSize: "0.8rem", padding: "0.75rem 1.4rem" }}>Visit live site ↗</a>
          <Link href="/contact" style={{ fontSize: "0.8rem", padding: "0.75rem 1.4rem", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", color: "#fff", textDecoration: "none" }}>Start a similar project</Link>
        </div>
      </header>

      <LivePreview c={c} />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr", gap: 16, marginTop: 16 }}>
        <div style={{ display: "grid", gap: 16 }}>
          <section style={section}><h4 style={h4}>The client</h4><p style={{ margin: 0, color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>{c.about}</p></section>
          <section style={section}><h4 style={h4}>The challenge</h4><p style={{ margin: 0, color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>{c.challenge}</p></section>
          <section style={section}>
            <h4 style={h4}>Outcomes</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
              {c.outcomes.map(o => (
                <li key={o} style={{ display: "flex", gap: 10, color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  <span aria-hidden style={{ color: c.accent, flexShrink: 0 }}>✓</span>{o}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <section style={section}>
            <h4 style={h4}>What we delivered</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
              {c.services.map(s => (
                <li key={s} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.88rem", color: "rgba(255,255,255,0.8)" }}>
                  <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: c.accent }} />{s}
                </li>
              ))}
            </ul>
          </section>
          <section style={section}>
            <h4 style={h4}>Brand palette</h4>
            <div style={{ display: "flex", gap: 10 }}>
              {c.colors.map((col, k) => (
                <div key={col} style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ height: 48, borderRadius: 10, background: col, border: "1px solid rgba(255,255,255,0.12)" }} />
                  <div style={{ fontSize: "0.68rem", marginTop: 6, color: "rgba(255,255,255,0.7)" }}>{c.colorNames[k]}</div>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)" }}>{col}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <nav aria-label="More projects" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "28px 0 8px" }}>
        {[{ c: prev, l: "← Previous" }, { c: next, l: "Next →" }].map(({ c: x, l }, k) => (
          <button key={l} onClick={() => onOpen(x.id)}
            style={{ textAlign: k ? "right" : "left", cursor: "pointer", borderRadius: 16, border: "1px solid rgba(255,255,255,0.09)", background: `radial-gradient(100% 100% at ${k ? "100%" : "0%"} 0%, ${x.accent}22, transparent 60%), #0b0b0b`, padding: "clamp(1rem,3vw,1.5rem)", color: "#fff", minWidth: 0 }}>
            <div style={{ ...mono, fontSize: "0.56rem", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>{l}</div>
            <div style={{ fontWeight: 700, fontSize: "clamp(0.95rem,2.6vw,1.3rem)", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis" }}>{x.name}</div>
          </button>
        ))}
      </nav>
    </motion.div>
  );
}

// ── Page ──
export default function WorkPage() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState(ALL);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      setOpenId(CLIENTS.some(c => c.id === h) ? h : null);
    };
    sync();
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, []);

  const industries = useMemo(() => [ALL, ...Array.from(new Set(CLIENTS.map(c => c.industry)))], []);
  const list = useMemo(() => (filter === ALL ? CLIENTS : CLIENTS.filter(c => c.industry === filter)), [filter]);
  const open = (id: string) => { if (location.hash !== `#${id}`) location.hash = id; window.scrollTo({ top: 0, behavior: "smooth" }); };
  const close = () => { history.pushState(null, "", location.pathname); setOpenId(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const current = CLIENTS.find(c => c.id === openId);
  const caseList = current && list.some(c => c.id === current.id) ? list : CLIENTS;

  const wrap: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: 68, color: "#fff", overflowX: "clip", ["--surface-1" as string]: "#0b0b0b", ["--surface-2" as string]: "rgba(255,255,255,0.04)", ["--line-2" as string]: "rgba(255,255,255,0.09)", ["--text-2" as string]: "rgba(255,255,255,0.55)", ["--accent-ink" as string]: "var(--accent)" }}>
      <style>{`.work-card{transition:transform .25s ease,border-color .25s ease}.work-card:hover,.work-card:focus-visible{transform:translateY(-4px);border-color:var(--accent-c)!important;outline:none}.work-shot{transition:transform .5s ease}.work-card:hover .work-shot{transform:scale(1.04)}`}</style>

      {!current && (
        <section style={{ ...wrap, padding: `clamp(2.5rem,7vw,5rem) clamp(1rem,4vw,2.5rem) clamp(1.5rem,4vw,2.5rem)` }}>
          <div style={{ ...mono, fontSize: "0.62rem", color: "var(--accent)", marginBottom: 14 }}>Portfolio</div>
          <h1 style={{ margin: 0, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, fontSize: "clamp(2.2rem,7vw,4.8rem)", maxWidth: "16ch", textWrap: "balance" as React.CSSProperties["textWrap"] }}>
            Brands and websites we&apos;ve <span style={{ color: "var(--accent)" }}>built</span>.
          </h1>
          <p style={{ margin: "18px 0 0", color: "rgba(255,255,255,0.62)", fontSize: "clamp(1rem,2.4vw,1.15rem)", lineHeight: 1.6, maxWidth: "54ch" }}>
            Every project here is live. Pick an industry, open a case study, or visit the site itself.
          </p>
          <div style={{ display: "flex", gap: "clamp(1.25rem,5vw,3rem)", marginTop: 28, flexWrap: "wrap" }}>
            {[
              { v: CLIENTS.length, l: "Live projects" },
              { v: industries.length - 1, l: "Industries" },
              { v: CLIENTS.filter(c => c.isOngoing).length, l: "On retainer" },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontWeight: 700, fontSize: "clamp(1.8rem,5vw,2.6rem)", lineHeight: 1, color: "#fff" }}>{s.v}</div>
                <div style={{ ...mono, fontSize: "0.56rem", color: "rgba(255,255,255,0.45)", marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky navigation bar */}
      <div style={{ position: "sticky", top: 68, zIndex: 20, background: "rgba(5,5,5,0.95)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(var(--accent-rgb),0.18)" }}>
        <div style={{ ...wrap, padding: `10px clamp(1rem,4vw,2.5rem) 12px` }}>
          {current ? (
            <ChipRail label="Browse projects" hint={isMobile ? "swipe or tap →" : "click to switch project"}
              items={[{ id: "__all", label: "All work" }, ...caseList.map(c => ({ id: c.id, label: c.name, dot: c.accent }))]}
              active={current.id} onSelect={id => (id === "__all" ? close() : open(id))} />
          ) : (
            <ChipRail label="Filter by industry" hint={`${list.length} project${list.length === 1 ? "" : "s"}${isMobile ? " · swipe →" : ""}`}
              items={industries.map(x => ({ id: x, label: x }))} active={filter} onSelect={setFilter} />
          )}
        </div>
      </div>

      <main style={{ ...wrap, paddingBottom: "clamp(4rem,10vw,7rem)" }}>
        <AnimatePresence mode="wait">
          {current ? (
            <CaseStudy key={current.id} c={current} list={caseList} onOpen={open} onClose={close} isMobile={isMobile} />
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, paddingTop: "clamp(1.25rem,3vw,2rem)" }}>
              <AnimatePresence mode="popLayout">
                {list.map((c, i) => <ProjectCard key={c.id} c={c} i={i} onOpen={() => open(c.id)} />)}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {!current && (
          <section style={{ marginTop: 40, borderRadius: 18, border: "1px solid rgba(var(--accent-rgb),0.2)", background: "radial-gradient(80% 120% at 100% 0%, rgba(var(--accent-rgb),0.1), transparent 60%), #0b0b0b", padding: "clamp(1.5rem,4vw,2.5rem)", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "clamp(1.3rem,3.5vw,1.8rem)", letterSpacing: "-0.02em" }}>Your business could be next.</div>
              <div style={{ color: "rgba(255,255,255,0.6)", marginTop: 6 }}>Brand, website and everything in between, built to look as good as you operate.</div>
            </div>
            <Link href="/contact" className="btn-accent" style={{ fontSize: "0.85rem", padding: "0.85rem 1.6rem" }}>Start your project →</Link>
          </section>
        )}
      </main>
    </div>
  );
}
