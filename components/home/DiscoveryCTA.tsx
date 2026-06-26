"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function DiscoveryCTA() {
  return (
    <section
      className="section relative overflow-hidden noise-overlay"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/site/pexels-nuptune-14004579.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ opacity: 0.07 }}
        />
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(223,255,0,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="section-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        >
          {/* Label */}
          <div className="accent-line justify-center" style={{ marginBottom: "2rem" }}>
            <span className="label-mono">Ready to Transform?</span>
          </div>

          {/* Heading */}
          <h2
            className="display-xl"
            style={{ maxWidth: "18ch", marginBottom: "2rem", textAlign: "center" }}
          >
            Your Business Deserves<br />To Look This Good.
          </h2>

          {/* Description */}
          <p
            className="text-base"
            style={{
              color: "var(--text-muted)",
              lineHeight: 1.85,
              maxWidth: "36rem",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            Start with a free discovery session. We&apos;ll understand your business, identify
            the gaps, and recommend exactly what you need to grow.
          </p>

          {/* Buttons, always centered, never stretch */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <Link href="/contact" className="btn-accent" data-cursor="START">
              Book Discovery Session →
            </Link>
            <Link href="/tools/solution-finder" className="btn-outline" data-cursor="EXPLORE">
              Find Your Solution First
            </Link>
          </div>

          {/* Stats strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "3rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              width: "100%",
              maxWidth: "36rem",
            }}
          >
            {[
              { label: "Discovery Call", value: "Free" },
              { label: "Response Time", value: "24h" },
              { label: "Engagement", value: "Flexible" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  className="font-mono font-bold"
                  style={{ color: "var(--accent)", fontSize: "1.6rem", lineHeight: 1, marginBottom: "0.4rem" }}
                >
                  {stat.value}
                </div>
                <div className="label-mono" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
