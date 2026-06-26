"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clients = [
  {
    id: "nucleus",
    name: "Nucleus Systems",
    url: "https://nucleus-systems.com",
    industry: "Technology & Digital Solutions",
    status: "Active Retainer",
    score: 98,
    services: ["Brand Identity", "Website", "Social Media", "Documentation", "Marketing"],
  },
  {
    id: "lona",
    name: "Lona Premium Shuttles",
    url: "https://lonapremiumshuttles.com",
    industry: "Transportation & Mobility",
    status: "Active",
    score: 96,
    services: ["Brand Identity", "Website", "Company Profile", "Email Signature", "Marketing"],
  },
  {
    id: "hlophe",
    name: "Hlophe Outdoor Media",
    url: "https://hlophemedia.co.za",
    industry: "Outdoor Advertising",
    status: "Active",
    score: 95,
    services: ["Brand Identity", "Website", "Company Profile", "Marketing Assets"],
  },
  {
    id: "omn",
    name: "Outdoor Movie Nights",
    url: "https://outdoormovienights.co.za",
    industry: "Entertainment & Events",
    status: "Project",
    score: 94,
    services: ["Event Branding", "Marketing Assets", "Proposal", "Website"],
  },
];

export default function ShowcaseMonitor() {
  const [active, setActive] = useState(clients[0]);
  const [loading, setLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const switchClient = (client: typeof clients[0]) => {
    if (client.id === active.id) return;
    setLoading(true);
    setIframeError(false);
    setTimeout(() => {
      setActive(client);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Client selector */}
      <div className="flex flex-wrap gap-2">
        {clients.map((c) => (
          <button
            key={c.id}
            onClick={() => switchClient(c)}
            data-cursor="OPEN"
            className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            style={{
              background: active.id === c.id ? "var(--accent)" : "rgba(255,255,255,0.05)",
              color: active.id === c.id ? "#000" : "var(--text-muted)",
              border: active.id === c.id ? "none" : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Monitor */}
        <div className="lg:col-span-2">
          {/* Aluminium frame */}
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #1a1a1a, #0d0d0d)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 60px rgba(0,0,0,0.8), 0 0 20px rgba(223,255,0,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
              padding: "12px 12px 0",
            }}
          >
            {/* Top bar */}
            <div className="flex items-center gap-2 pb-2.5 px-1">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <div
                className="flex-1 mx-3 rounded text-center flex items-center justify-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  height: 22,
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                }}
              >
                <div className="live-dot w-1.5 h-1.5" />
                {active.url}
              </div>
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="text-xs px-3 py-1 rounded transition-colors hover:text-white"
                style={{ color: "var(--accent)", fontSize: "0.65rem", border: "1px solid rgba(223,255,0,0.3)" }}
              >
                Full Site ↗
              </a>
            </div>

            {/* Screen */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "16/9", background: "#000", borderRadius: "4px 4px 0 0" }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "#000" }}
                  >
                    <motion.div
                      className="w-full h-0.5"
                      style={{ background: "var(--accent)", transformOrigin: "left" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.35 }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    {iframeError ? (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                        style={{ background: "rgba(17,17,17,0.95)" }}
                      >
                        <div className="text-2xl" style={{ color: "var(--accent)" }}>◎</div>
                        <p className="text-sm font-medium">{active.name}</p>
                        <a
                          href={active.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-accent text-xs px-4 py-2"
                          data-cursor="OPEN"
                        >
                          Open Live Site ↗
                        </a>
                      </div>
                    ) : (
                      <>
                        <iframe
                          src={active.url}
                          className="border-0 previewer-frame"
                          title={active.name}
                          onError={() => setIframeError(true)}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "166.67%",
                            maxWidth: "none",
                            height: "166.67%",
                            transform: "scale(0.6)",
                            transformOrigin: "top left",
                            pointerEvents: "none",
                          }}
                          sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                        <div className="absolute inset-0" style={{ zIndex: 1 }} />
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Status */}
            <div
              className="p-5 rounded-xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="live-dot" />
                <span className="label-mono">{active.status}</span>
              </div>
              <div className="label-mono mb-1" style={{ color: "var(--accent)" }}>
                {active.industry}
              </div>
              <h3 className="font-bold text-lg">{active.name}</h3>
            </div>

            {/* Performance */}
            <div
              className="p-5 rounded-xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="label-mono mb-3">Performance</div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono font-bold text-2xl" style={{ color: "var(--accent)" }}>
                  {active.score}/100
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {["Mobile Responsive", "SEO Optimised", "Custom Design"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--accent)" }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div
              className="p-5 rounded-xl flex-1"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="label-mono mb-3">Services Delivered</div>
              <div className="flex flex-col gap-2">
                {active.services.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-xs">
                    <span style={{ color: "var(--accent)" }}>✓</span>
                    <span style={{ color: "var(--text-muted)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
