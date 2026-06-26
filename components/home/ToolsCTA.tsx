"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HolographicCard from "@/components/ui/HolographicCard";

const tools = [
  {
    href: "/tools/estimator",
    icon: "◈",
    title: "Project Cost Estimator",
    desc: "Build your project scope and get an instant investment range estimate.",
    cta: "Estimate Cost",
    accent: "var(--accent)",
  },
  {
    href: "/tools/solution-finder",
    icon: "◎",
    title: "Solution Finder",
    desc: "Answer 8 questions and receive a tailored recommended solution for your business.",
    cta: "Find Solution",
    accent: "var(--accent)",
  },
  {
    href: "/tools/assessment",
    icon: "◐",
    title: "Business Assessment",
    desc: "Score your current brand, digital presence, and marketing infrastructure.",
    cta: "Get Your Score",
    accent: "var(--accent)",
  },
];

export default function ToolsCTA() {
  return (
    <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12" style={{ marginBottom: "5rem" }}>
          <div>
            <div className="accent-line">
              <span className="label-mono">Free Business Tools</span>
            </div>
            <h2 className="display-xl" style={{ maxWidth: "16ch" }}>
              Understand Your<br />Business Before<br />You Invest.
            </h2>
          </div>
          <p className="text-base max-w-xs" style={{ color: "var(--text-muted)", lineHeight: 2 }}>
            Three powerful tools to help you understand where your business stands and what you need to grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <HolographicCard className="h-full flex flex-col group" style={{ padding: "2.5rem" }}>
                <div
                  className="text-3xl transition-transform duration-300 group-hover:scale-110"
                  style={{ color: tool.accent, marginBottom: "2rem" }}
                >
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-base" style={{ lineHeight: 1.5, marginBottom: "1.25rem" }}>{tool.title}</h3>
                <p className="text-sm flex-1" style={{ color: "var(--text-muted)", lineHeight: 2, marginBottom: "2.5rem" }}>
                  {tool.desc}
                </p>
                <Link
                  href={tool.href}
                  className="btn-accent text-xs self-start px-5 py-3"
                  data-cursor="OPEN"
                >
                  {tool.cta} →
                </Link>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
