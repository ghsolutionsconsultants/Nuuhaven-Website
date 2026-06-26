"use client";

import { motion } from "framer-motion";
import HolographicCard from "@/components/ui/HolographicCard";

const testimonials = [
  {
    quote: "Nuuhaven transformed how we present ourselves to the market. The brand identity and website they developed gave us the professional credibility we needed to win larger contracts.",
    name: "Client, Nucleus Systems",
    industry: "Technology & Digital Solutions",
    initials: "NS",
  },
  {
    quote: "From day one, Tshepang understood our vision. The company profile and marketing materials opened doors we didn't think possible at our stage of growth.",
    name: "Client, Lona Premium Shuttles",
    industry: "Transportation & Mobility",
    initials: "LP",
  },
  {
    quote: "Working with Nuuhaven was a game-changer. Our billboard and advertising business finally looks as serious as we are. The digital presence speaks for itself.",
    name: "Client, Hlophe Outdoor Media",
    industry: "Outdoor Advertising",
    initials: "HM",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="section-inner">
        <div className="accent-line">
          <span className="label-mono">Client Voices</span>
        </div>
        <h2 className="display-xl" style={{ maxWidth: "18ch", marginBottom: "5rem" }}>
          Results That<br />Speak For<br />Themselves.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <HolographicCard className="h-full flex flex-col" style={{ padding: "2.5rem" }}>
                {/* Stars */}
                <div className="flex gap-1.5 mb-7">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: "var(--accent)", fontSize: "0.85rem" }}>★</span>
                  ))}
                </div>

                <blockquote
                  className="text-sm flex-1 mb-9 italic"
                  style={{ color: "var(--text-muted)", lineHeight: 2 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: "rgba(223,255,0,0.12)", color: "var(--accent)", border: "1px solid rgba(223,255,0,0.2)" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="label-mono text-xs mt-1">{t.industry}</div>
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
