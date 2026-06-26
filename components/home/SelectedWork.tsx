"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    accent: "#dfff00",
    outcome: "Full digital ecosystem from ground up, brand, web, social, documentation.",
  },
  {
    id: "omn",
    name: "Outdoor Movie Nights",
    industry: "Entertainment & Events",
    status: "Project",
    statusColor: "#ff9500",
    services: ["Event Branding", "Marketing Assets", "Proposal", "Website"],
    url: "https://outdoormovienights.co.za",
    accent: "#ff9500",
    outcome: "Cinematic brand identity and digital presence for outdoor entertainment.",
  },
  {
    id: "hlophe",
    name: "Hlophe Outdoor Media",
    industry: "Outdoor Advertising",
    status: "Active",
    statusColor: "#dfff00",
    services: ["Brand Identity", "Website", "Company Profile", "Marketing Assets"],
    url: "https://hlophemedia.co.za",
    accent: "#e63946",
    outcome: "From concept to credible, market-ready outdoor advertising brand.",
  },
  {
    id: "lona",
    name: "Lona Premium Shuttles",
    industry: "Transportation & Mobility",
    status: "Active",
    statusColor: "#dfff00",
    services: ["Brand Identity", "Website", "Company Profile", "Email Signature", "Marketing"],
    url: "https://lonapremiumshuttles.com",
    accent: "#d4af37",
    outcome: "Premium brand presence enabling market entry and client acquisition.",
  },
];

function SitePreviewer({ url, name, accent }: { url: string; name: string; accent: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28ca41" }} />
        </div>
        <div
          className="flex-1 flex items-center gap-1.5 px-2 py-0.5 rounded text-xs"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-muted)", fontFamily: "monospace" }}
        >
          <div className="live-dot" style={{ background: accent, boxShadow: `0 0 4px ${accent}`, width: 5, height: 5 }} />
          {url.replace("https://", "")}
        </div>
      </div>

      {/* iframe or fallback */}
      <div className="relative overflow-hidden" style={{ height: 320 }}>
        {!failed ? (
          <iframe
            src={url}
            title={name}
            className="w-full h-full border-0"
            style={{ transform: "scale(0.6)", transformOrigin: "top left", width: "166.67%", height: "166.67%", pointerEvents: "none" }}
            sandbox="allow-scripts allow-same-origin"
            onError={() => setFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="text-2xl" style={{ color: accent }}>◎</div>
            <p className="text-xs text-center px-4" style={{ color: "var(--text-muted)" }}>
              Site blocks embedding, open directly to view
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono text-xs px-3 py-1.5 rounded-full transition-colors hover:text-white"
              style={{ border: `1px solid ${accent}40`, color: accent }}
            >
              Open Live Site ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const [active, setActive] = useState<string | null>(null);
  const isMobile = useIsMobile();

  return (
    <section className="section noise-overlay" style={{ background: "var(--bg-primary)" }}>
      <div className="section-inner">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10" style={{ marginBottom: "5rem" }}>
          <div>
            <div className="accent-line">
              <span className="label-mono">Selected Work</span>
            </div>
            <h2 className="display-xl" style={{ maxWidth: "16ch" }}>
              Client<br />Ecosystems<br />We&apos;ve Built.
            </h2>
          </div>
          <Link href="/work" className="btn-outline self-start md:self-end" data-cursor="EXPLORE">
            Enter Command Centre →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <HolographicCard className="overflow-hidden group">
                {/* Live site preview */}
                <SitePreviewer url={p.url} name={p.name} accent={p.accent} />

                {/* Info */}
                <div style={{ padding: isMobile ? "1.25rem" : "2.5rem" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: "1.5rem" }}>
                    <div className="label-mono" style={{ color: p.accent }}>{p.industry}</div>
                    <div className="flex items-center gap-2">
                      <div className="live-dot" style={{ background: p.statusColor, boxShadow: `0 0 6px ${p.statusColor}` }} />
                      <span className="label-mono text-xs">{p.status}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-xl" style={{ marginBottom: "1rem" }}>{p.name}</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)", lineHeight: 2, marginBottom: "2rem" }}>{p.outcome}</p>

                  <div className="flex flex-wrap gap-2" style={{ marginBottom: "2.5rem" }}>
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link href="/work" className="btn-accent text-xs px-4 py-2.5" data-cursor="OPEN">
                      View Workspace
                    </Link>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-xs px-4 py-2.5"
                      data-cursor="OPEN"
                    >
                      Live Site ↗
                    </a>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
