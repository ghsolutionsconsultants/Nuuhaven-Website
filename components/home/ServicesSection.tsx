"use client";

import { motion } from "framer-motion";
import HolographicCard from "@/components/ui/HolographicCard";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

const services = [
  {
    icon: "◎",
    title: "Establish A Professional Digital Presence",
    sub: "Website Development",
    desc: "Custom-designed websites that communicate credibility, drive trust, and position your business for growth.",
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
          style={{ gap: "3rem", marginBottom: "4rem" }}
        >
          <h2 className="display-xl" style={{ maxWidth: "16ch" }}>
            Outcomes That<br />Move Businesses<br />Forward.
          </h2>
          <p className="text-base" style={{ color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "28rem" }}>
            Every service is designed around commercial outcomes, not deliverables. We build what your business needs to grow.
          </p>
        </div>

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
              className={i === services.length - 1 && services.length % 3 === 1 ? "lg:col-span-3" : ""}
            >
              <HolographicCard className="h-full group" style={{ padding: isMobile ? "1.25rem" : "2.5rem" }}>
                <div
                  className="text-3xl transition-all duration-300 group-hover:scale-110"
                  style={{ color: "var(--accent)", marginBottom: "2rem" }}
                >
                  {s.icon}
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

        <div className="flex justify-center" style={{ marginTop: "3rem" }}>
          <Link href="/tools/solution-finder" className="btn-outline" data-cursor="EXPLORE">
            Find Your Solution →
          </Link>
        </div>

        {/* Conflict of Interest Notice */}
        <div style={{
          marginTop: "3.5rem",
          padding: "1.375rem 1.75rem",
          background: "rgba(255,200,0,0.03)",
          border: "1px solid rgba(255,200,0,0.18)",
          borderRadius: 12,
          display: "flex",
          gap: "1.125rem",
          alignItems: "flex-start",
        }}>
          <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "rgba(255,200,0,0.1)", border: "1px solid rgba(255,200,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "0.1rem" }}>
            <span style={{ color: "#ffc800", fontSize: "0.72rem", fontWeight: 900 }}>!</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffc800", marginBottom: "0.5rem", fontWeight: 700 }}>
              Conflict of Interest Notice
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", lineHeight: 1.85, margin: 0 }}>
              Nuuhaven is operated alongside a primary employment role at one of the Big 4 professional services firms, where the principal specialises in <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>debt and capital advisory</strong>. Each prospective client and project is assessed for potential conflicts with this primary role before any engagement commences.{" "}
              <strong style={{ color: "#ffc800", fontWeight: 600 }}>Nuuhaven expressly reserves the right to decline, suspend, or terminate any engagement at any stage — including after acceptance — should a conflict of interest be identified.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
