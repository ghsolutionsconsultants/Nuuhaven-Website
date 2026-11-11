"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HolographicCard from "@/components/ui/HolographicCard";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

const ShoppingCartIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.43 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const services: { icon: React.ReactNode; title: string; sub: string; desc: string; featured?: boolean }[] = [
  {
    icon: "◎",
    title: "Establish A Professional Digital Presence",
    sub: "Website Development",
    desc: "Custom-designed websites built to communicate credibility, drive trust, and convert visitors — positioned precisely for the clients you want.",
  },
  {
    icon: ShoppingCartIcon,
    title: "Open Your Online Store. Sell Directly.",
    sub: "E-Commerce Website",
    desc: "A fully integrated online store that lets your customers browse, add to cart, and pay — without leaving your site. Turn your products into consistent online revenue.",
    featured: true,
  },
  {
    icon: "◈",
    title: "Build Recognition & Credibility",
    sub: "Brand Development",
    desc: "Distinctive visual identities that make your business unforgettable and instantly trustworthy.",
  },
  {
    icon: "◳",
    title: "Communicate With Confidence",
    sub: "Company Profiles",
    desc: "Professional documentation that speaks with authority to clients, investors, and stakeholders.",
  },
  {
    icon: "◐",
    title: "Activate Your Market",
    sub: "Marketing Assets",
    desc: "Strategic marketing collateral that drives awareness, generates leads, and supports business development.",
  },
  {
    icon: "◑",
    title: "Accelerate Business Growth",
    sub: "Strategic Marketing",
    desc: "Commercially aligned marketing strategies that connect your business with the right opportunities.",
  },
  {
    icon: "◉",
    title: "Scale With Consistency",
    sub: "Retainer Support",
    desc: "Ongoing brand management and digital support that keeps your business sharp, current, and competitive.",
  },
  {
    icon: "◆",
    title: "Think Strategically. Move Decisively.",
    sub: "Strategic Advisory",
    desc: "One-on-one advisory sessions that translate your ambitions into a clear commercial roadmap, positioning, priorities, and the right moves at the right time.",
  },
];

function ServiceAccordion() {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <div style={{ borderTop: "1px solid rgba(var(--ink-rgb),0.08)" }}>
      {services.map((s, i) => {
        const on = open === i;
        return (
          <div key={s.title} style={{ borderBottom: "1px solid rgba(var(--ink-rgb),0.08)", background: on ? "rgba(var(--accent-rgb),0.035)" : "transparent", transition: "background .25s" }}>
            <button onClick={() => setOpen(on ? null : i)} aria-expanded={on}
              style={{ width: "100%", display: "grid", gridTemplateColumns: "34px 1fr 20px", alignItems: "center", gap: 12, padding: "1rem 0.25rem", textAlign: "left", background: "none", border: "none", color: "var(--text)", cursor: "pointer" }}>
              <span style={{ color: "var(--accent)", fontSize: "1.35rem", display: "grid", placeItems: "center", lineHeight: 1 }}>
                {typeof s.icon === "string" ? s.icon : <span style={{ display: "inline-flex", transform: "scale(0.7)" }}>{s.icon}</span>}
              </span>
              <span style={{ minWidth: 0 }}>
                <span className="label-mono" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: "0.56rem", marginBottom: 4 }}>
                  <span>{s.sub}</span>
                  {s.featured && <span style={{ fontSize: "0.46rem", fontWeight: 700, color: "#000", background: "var(--accent)", padding: "0.12rem 0.4rem", borderRadius: 3, flexShrink: 0 }}>Most in-demand</span>}
                </span>
                <span style={{ display: "block", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.35 }}>{s.title}</span>
              </span>
              <span aria-hidden style={{ color: "rgba(var(--ink-rgb),0.5)", fontSize: "1.1rem", transition: "transform .25s", transform: on ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7, padding: "0 0.25rem 1.1rem 46px", margin: 0 }}>{s.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function ServicesSection() {
  const isMobile = useIsMobile();
  return (
    <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner">
        <div className="accent-line">
          <span className="label-mono">What We Deliver</span>
        </div>

        <div
          className="flex flex-col md:flex-row md:items-end justify-between"
          style={{ gap: isMobile ? "1.25rem" : "3rem", marginBottom: isMobile ? "2rem" : "4rem" }}
        >
          <h2 className="display-xl" style={{ maxWidth: "16ch" }}>
            Outcomes That<br />Move Businesses<br />Forward.
          </h2>
          <p className="text-base" style={{ color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "28rem" }}>
            Every service is designed around commercial outcomes, not deliverables. We build what your business needs to grow.
          </p>
        </div>

        {isMobile ? <ServiceAccordion /> : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "1.5rem" }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={
                (i === services.length - 1 && services.length % 3 === 1) ? "lg:col-span-3" :
                (i === services.length - 1 && services.length % 3 === 2) ? "lg:col-span-2" : ""
              }
            >
              <HolographicCard
                className="h-full group"
                style={{
                  padding: isMobile ? "1.25rem" : "2.5rem",
                  ...(s.featured ? { border: "1px solid rgba(var(--accent-rgb),0.35)", boxShadow: "0 0 40px rgba(var(--accent-rgb),0.07), inset 0 0 40px rgba(var(--accent-rgb),0.02)" } : {}),
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
                  <div
                    className="text-3xl transition-all duration-300 group-hover:scale-110"
                    style={{ color: "var(--accent)" }}
                  >
                    {s.icon}
                  </div>
                  {s.featured && (
                    <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: "#000", background: "var(--accent)", padding: "0.2rem 0.55rem", borderRadius: 4 }}>
                      Most In-Demand
                    </div>
                  )}
                </div>
                <div className="label-mono" style={{ color: "var(--accent)", marginBottom: "1rem" }}>
                  {s.sub}
                </div>
                <h3 className="font-semibold text-base" style={{ lineHeight: 1.5, marginBottom: "1.25rem" }}>{s.title}</h3>
                <p className="text-sm" style={{ color: "var(--text-muted)", lineHeight: 2 }}>
                  {s.desc}
                </p>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
        )}

        {/* Conflict of Interest Notice */}
        <div style={{
          marginTop: isMobile ? "2rem" : "3.5rem",
          padding: isMobile ? "1.1rem 1.1rem" : "1.375rem 1.75rem",
          background: "rgba(var(--warn-rgb),0.03)",
          border: "1px solid rgba(var(--warn-rgb),0.18)",
          borderRadius: 12,
          display: "flex",
          gap: "1.125rem",
          alignItems: "flex-start",
        }}>
          <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "rgba(var(--warn-rgb),0.1)", border: "1px solid rgba(var(--warn-rgb),0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "0.1rem" }}>
            <span style={{ color: "var(--warn)", fontSize: "0.72rem", fontWeight: 900 }}>!</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--warn)", marginBottom: "0.5rem", fontWeight: 700 }}>
              Conflict of Interest Notice
            </div>
            <p style={{ color: "rgba(var(--ink-rgb),0.4)", fontSize: "0.78rem", lineHeight: 1.85, margin: 0 }}>
              Nuuhaven&apos;s Founder &amp; Managing Director maintains a primary employment role at one of the Big 4 professional services firms. Each prospective client and project is assessed for potential conflicts with this primary role before any engagement commences.{" "}
              <strong style={{ color: "var(--warn)", fontWeight: 600 }}>Nuuhaven expressly reserves the right to decline, suspend, or terminate any engagement at any stage — including after acceptance — should a conflict of interest be identified.</strong>
            </p>
          </div>
        </div>

        <div className="flex justify-center" style={{ marginTop: "3rem" }}>
          <Link href="/tools/solution-finder" className="btn-outline" data-cursor="EXPLORE">
            Find Your Solution →
          </Link>
        </div>
      </div>
    </section>
  );
}
