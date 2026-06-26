"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TABS = ["Overview", "Website", "Brand Kit", "Results"] as const;
type Tab = typeof TABS[number];

interface ClientData {
  id: string;
  name: string;
  industry: string;
  status: string;
  statusColor: string;
  url: string;
  logo?: string;
  accent: string;
  services: string[];
  outcomes: string[];
  colors: string[];
  tagline: string;
}

const brandColors: Record<string, string[]> = {
  nucleus: ["#000000", "#ffffff", "#1a1a2e"],
  lona: ["#0a0a0a", "#d4af37", "#ffffff"],
  hlophe: ["#000000", "#e63946", "#ffffff"],
  omn: ["#0d0d0d", "#ff9500", "#ffffff"],
};

export default function ClientWorkspace({ client }: { client: ClientData }) {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div>
          <div className="label-mono mb-1" style={{ color: client.accent }}>
            {client.industry}
          </div>
          <h2 className="font-bold text-xl">{client.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-dot" style={{ background: client.statusColor, boxShadow: `0 0 8px ${client.statusColor}` }} />
          <span className="label-mono">{client.status}</span>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 px-6 py-2 border-b"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            data-cursor="OPEN"
            className="px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            style={{
              background: tab === t ? "rgba(223,255,0,0.1)" : "transparent",
              color: tab === t ? "var(--accent)" : "var(--text-muted)",
              border: tab === t ? "1px solid rgba(223,255,0,0.3)" : "1px solid transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {tab === "Overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div
                  className="p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="label-mono mb-3">Project Objective</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {client.tagline}
                  </p>
                </div>
                <div
                  className="p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="label-mono mb-3">Services Delivered</div>
                  <div className="flex flex-col gap-2">
                    {client.services.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm">
                        <span style={{ color: "var(--accent)" }}>✓</span>
                        <span style={{ color: "var(--text-muted)" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="p-5 rounded-xl md:col-span-2"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="label-mono mb-3">Business Impact</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {client.outcomes.map((o) => (
                      <div key={o} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }}>→</span>
                        <span style={{ color: "var(--text-muted)" }}>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "Website" && (
              <div className="h-full flex flex-col gap-4">
                <div className="text-center mb-2">
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent text-xs px-5 py-2.5"
                    data-cursor="OPEN"
                  >
                    Open {client.url} ↗
                  </a>
                </div>
                <div
                  className="flex-1 rounded-xl overflow-hidden"
                  style={{ minHeight: 400, border: "1px solid var(--border-subtle)" }}
                >
                  <iframe
                    src={client.url}
                    className="w-full h-full border-0"
                    title={client.name}
                    style={{ minHeight: 400 }}
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
              </div>
            )}

            {tab === "Brand Kit" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Logo display */}
                <div
                  className="p-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)", minHeight: 180 }}
                >
                  {client.logo ? (
                    <Image src={client.logo} alt={client.name} width={160} height={80} className="object-contain" />
                  ) : (
                    <div className="text-center">
                      <div className="font-bold text-2xl tracking-widest uppercase mb-2" style={{ color: client.accent }}>
                        {client.name}
                      </div>
                      <div className="label-mono">Brand Wordmark</div>
                    </div>
                  )}
                </div>

                {/* Colour palette */}
                <div
                  className="p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="label-mono mb-4">Colour Palette</div>
                  <div className="flex gap-3">
                    {(brandColors[client.id] || ["#000000", "#ffffff"]).map((c) => (
                      <div key={c} className="flex flex-col items-center gap-2">
                        <div
                          className="w-12 h-12 rounded-lg border"
                          style={{ background: c, borderColor: "rgba(255,255,255,0.1)" }}
                        />
                        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div
                  className="p-5 rounded-xl md:col-span-2"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="label-mono mb-4">Typography</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="label-mono mb-2 text-xs">Display</div>
                      <div className="text-2xl font-bold tracking-tight">{client.name}</div>
                    </div>
                    <div>
                      <div className="label-mono mb-2 text-xs">Body</div>
                      <div className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Professional. Consistent. Credible.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "Results" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div
                  className="p-5 rounded-xl md:col-span-2"
                  style={{ background: "rgba(223,255,0,0.03)", border: "1px solid rgba(223,255,0,0.15)" }}
                >
                  <div className="label-mono mb-4" style={{ color: "var(--accent)" }}>Business Outcomes</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {client.outcomes.map((o, i) => (
                      <motion.div
                        key={o}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: "rgba(223,255,0,0.15)", border: "1px solid var(--accent)" }}>
                          <span style={{ color: "var(--accent)", fontSize: "0.6rem" }}>✓</span>
                        </div>
                        <span style={{ color: "var(--text-muted)" }}>{o}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div
                  className="p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="label-mono mb-3">Engagement Model</div>
                  <div className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {client.status === "Active Retainer"
                      ? "Long-term retainer relationship, ongoing brand management, digital support, and strategic marketing."
                      : "Project-based engagement delivering end-to-end brand and digital ecosystem."}
                  </div>
                </div>
                <div
                  className="p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="label-mono mb-3">View Live Work</div>
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent text-xs px-4 py-2.5"
                    data-cursor="OPEN"
                  >
                    Visit {client.url.replace("https://", "")} ↗
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
