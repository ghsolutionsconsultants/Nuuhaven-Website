"use client";

import { motion } from "framer-motion";
import HolographicCard from "@/components/ui/HolographicCard";
import Link from "next/link";

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
              <HolographicCard className="h-full group" style={{ padding: "2.5rem" }}>
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
      </div>
    </section>
  );
}
