"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HolographicCard from "@/components/ui/HolographicCard";
import { useIsMobile } from "@/hooks/useIsMobile";

const projects = [
  {
    id: "nucleus",
    name: "Nucleus Systems",
    industry: "Technology & Digital Solutions",
    status: "Active Retainer",
    statusColor: "#dfff00",
    services: ["Brand Identity", "Website", "Social Media", "Documentation", "Marketing Assets"],
    url: "https://nucleus-systems.com",
    accent: "#f4801e",
    outcome: "Full digital ecosystem from ground up, brand, web, social, documentation.",
  },
  {
    id: "omn",
    name: "Outdoor Movie Nights",
    industry: "Entertainment & Events",
    status: "Active Retainer",
    statusColor: "#ff9500",
    services: ["Event Branding", "Marketing Assets", "Proposal", "Website"],
    url: "https://outdoormovienights.co.za",
    accent: "#ff2d43",
    outcome: "Cinematic brand identity and digital presence for outdoor entertainment.",
  },
  {
    id: "hlophe",
    name: "Hlophe Outdoor Media",
    industry: "Outdoor Advertising",
    status: "Active Retainer",
    statusColor: "#dfff00",
    services: ["Brand Identity", "Website", "Company Profile", "Marketing Assets"],
    url: "https://hlophemedia.co.za",
    accent: "#a78bfa",
    outcome: "From concept to credible, market-ready outdoor advertising brand.",
  },
  {
    id: "lona",
    name: "Lona Premium Shuttles",
    industry: "Transportation & Mobility",
    status: "Active Retainer",
    statusColor: "#dfff00",
    services: ["Brand Identity", "Website", "Company Profile", "Email Signature", "Marketing"],
    url: "https://lonapremiumshuttles.com",
    accent: "#c9a84c",
    outcome: "Premium brand presence enabling market entry and client acquisition.",
  },
  {
    id: "45one",
    name: "45one",
    industry: "Sports Media",
    status: "Active Retainer",
    statusColor: "#dfff00",
    services: ["Brand Identity", "Website", "Content Platform", "Interactive Tools"],
    url: "https://45one.co.za",
    accent: "#f2ff00",
    outcome: "In-depth football content platform with podcast, tactics board and quiz.",
  },
  {
    id: "drnontu",
    name: "Dr Nontu Medical Practice",
    industry: "Healthcare",
    status: "Active Retainer",
    statusColor: "#dfff00",
    services: ["Brand Identity", "Website", "Membership Plans", "Booking Journey"],
    url: "https://drnontu.co.za",
    accent: "#ddb46a",
    outcome: "Warm, credible GP practice presence across two locations with membership plans.",
  },
  {
    id: "cta",
    name: "Code Trust Assurance",
    industry: "Software Assurance",
    status: "Active Retainer",
    statusColor: "#dfff00",
    services: ["Framework Website", "Trust Registry", "Documentation", "Brand System"],
    url: "https://codetrustassurance.com",
    accent: "#5b8def",
    outcome: "Authoritative home for a software trust standard, certification and public registry.",
  },
  {
    id: "dtff",
    name: "Digital Trust Futures Foundation",
    industry: "Non-Profit / Digital Rights",
    status: "Active Retainer",
    statusColor: "#dfff00",
    services: ["Brand Identity", "Website", "Programme Architecture", "Content"],
    url: "https://digitaltrustfuturesfoundation.org",
    accent: "#e0763a",
    outcome: "Public-interest foundation protecting people as digital public infrastructure scales.",
  },
];

function WorkCard({ p }: { p: (typeof projects)[number] }) {
  const host = p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <HolographicCard className="overflow-hidden group h-full">
      <div className="flex flex-col h-full">
        <Link href={`/work#${p.id}`} data-cursor="OPEN" aria-label={`${p.name} case study`}
          className="block relative overflow-hidden" style={{ aspectRatio: "16 / 10", background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/work/${p.id}.jpg`} alt={`${p.name} website homepage`} loading="lazy"
            className="transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        </Link>
        <div className="flex flex-col flex-1" style={{ padding: "1.25rem 1.25rem 1.4rem", gap: "0.7rem" }}>
          <div className="label-mono" style={{ color: p.accent, fontSize: "0.6rem" }}>{p.industry}</div>
          <h3 className="font-bold" style={{ fontSize: "1.15rem", lineHeight: 1.2 }}>{p.name}</h3>
          <p className="text-sm" style={{ color: "var(--text-muted)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.outcome}</p>
          <div className="flex items-center justify-between gap-3" style={{ marginTop: "auto", paddingTop: "0.8rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <Link href={`/work#${p.id}`} className="text-sm font-semibold" data-cursor="OPEN" style={{ color: "var(--text)" }}>
              Case study <span style={{ color: "var(--accent)" }}>→</span>
            </Link>
            <a href={p.url} target="_blank" rel="noopener noreferrer" data-cursor="OPEN"
              style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "55%" }}>
              {host} ↗
            </a>
          </div>
        </div>
      </div>
    </HolographicCard>
  );
}

export default function SelectedWork() {
  const isMobile = useIsMobile();
  const rail = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const onScroll = () => {
    const r = rail.current; if (!r) return;
    const card = r.firstElementChild as HTMLElement | null;
    if (!card) return;
    setIdx(Math.min(projects.length - 1, Math.round(r.scrollLeft / (card.offsetWidth + 14))));
  };
  const go = (d: number) => {
    const r = rail.current; const card = r?.firstElementChild as HTMLElement | null;
    if (!r || !card) return;
    const next = Math.max(0, Math.min(projects.length - 1, idx + d));
    r.scrollTo({ left: next * (card.offsetWidth + 14), behavior: "smooth" });
  };
  const arrow = (d: number, disabled: boolean) => (
    <button onClick={() => go(d)} disabled={disabled} aria-label={d > 0 ? "Next project" : "Previous project"}
      style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(var(--accent-rgb),0.35)", background: "rgba(var(--accent-rgb),0.08)", color: "var(--accent)", opacity: disabled ? 0.3 : 1, display: "grid", placeItems: "center", cursor: disabled ? "default" : "pointer" }}>
      {d > 0 ? "→" : "←"}
    </button>
  );

  return (
    <section className="section noise-overlay" style={{ background: "var(--bg-primary)", overflowX: "clip" }}>
      <div className="section-inner">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8" style={{ marginBottom: isMobile ? "2.25rem" : "3.5rem" }}>
          <div>
            <div className="accent-line">
              <span className="label-mono">Selected Work · {projects.length} live projects</span>
            </div>
            <h2 className="display-xl" style={{ maxWidth: "16ch" }}>
              Client<br />Ecosystems<br />We&apos;ve Built.
            </h2>
          </div>
          <Link href="/work" className="btn-outline self-start md:self-end" data-cursor="EXPLORE">
            View all work →
          </Link>
        </div>

        {isMobile ? (
          <>
            <div className="flex items-center justify-between" style={{ marginBottom: "0.9rem" }}>
              <span className="label-mono" style={{ fontSize: "0.6rem", color: "var(--accent)" }}>
                {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · swipe →
              </span>
              <div className="flex gap-2">{arrow(-1, idx === 0)}{arrow(1, idx === projects.length - 1)}</div>
            </div>
            <div ref={rail} onScroll={onScroll} className="hide-scrollbar"
              style={{ display: "flex", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory", margin: "0 -1.25rem", padding: "0 1.25rem 0.5rem", scrollPaddingLeft: "1.25rem" }}>
              {projects.map(p => (
                <div key={p.id} style={{ flex: "0 0 84%", scrollSnapAlign: "start" }}>
                  <WorkCard p={p} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {projects.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}>
                <WorkCard p={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
