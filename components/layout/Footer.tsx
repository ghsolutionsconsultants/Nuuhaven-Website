"use client";

import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
  { href: "/freelancer", label: "Freelancer?" },
];

const SERVICES = [
  { label: "Website Development", href: "/contact" },
  { label: "Brand Development", href: "/contact" },
  { label: "Company Profiles", href: "/contact" },
  { label: "Marketing Assets", href: "/contact" },
  { label: "Strategic Advisory", href: "/contact" },
  { label: "Retainer Support", href: "/contact" },
];

const TOOLS = [
  { href: "/tools/assessment", label: "Business Assessment" },
  { href: "/tools/solution-finder", label: "Solution Finder" },
  { href: "/tools/estimator", label: "Cost Estimator" },
  { href: "/tools/impressions-audit", label: "First Impressions Audit" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 4vw, 4rem)",
        }}
      >

        {/* ── Top strip: logo + tagline + CTA ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            paddingTop: "3.5rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            {/* Left: logo + tagline */}
            <div style={{ maxWidth: "30rem" }}>
              <Image
                src="/images/brand/logo-main-hd.jpg"
                alt="Nuuhaven"
                width={140}
                height={46}
                className="object-contain"
                style={{ maxHeight: 46, marginBottom: "1.25rem" }}
              />
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.85 }}>
                Your digital haven for business. We build complete brand ecosystems, from identity and web presence to documentation, marketing, and strategic advisory.
              </p>
            </div>

            {/* Right: contact + CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", alignItems: "flex-start" }}>
              <a
                href="mailto:tshepang@nuuhaven.com"
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                tshepang@nuuhaven.com
              </a>
              <a
                href="tel:+27677179269"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                +27 67 717 9269
              </a>
              <Link href="/contact" className="btn-accent" style={{ fontSize: "0.72rem", padding: "0.65rem 1.4rem", marginTop: "0.5rem" }}>
                Start a Project →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Navigation grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "2.5rem",
            paddingTop: "2.5rem",
            paddingBottom: "2.5rem",
          }}
        >
          {/* Navigation */}
          <div>
            <div
              style={{
                color: "rgba(255,255,255,0.28)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Navigation
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.825rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div
              style={{
                color: "rgba(255,255,255,0.28)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Services
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.825rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools */}
          <div>
            <div
              style={{
                color: "rgba(255,255,255,0.28)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Free Tools
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
              {TOOLS.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.825rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Find out where you stand */}
          <div
            style={{
              background: "rgba(223,255,0,0.04)",
              border: "1px solid rgba(223,255,0,0.12)",
              borderRadius: 10,
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Not sure where to start?
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", lineHeight: 1.75, marginBottom: "1rem" }}>
              Take the free Business Assessment and get your credibility score in under 2 minutes.
            </p>
            <Link
              href="/tools/assessment"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--accent)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Get your score →
            </Link>
          </div>
        </div>

        {/* ── Conflict of Interest Notice ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,200,0,0.15)",
            borderBottom: "1px solid rgba(255,200,0,0.15)",
            padding: "2rem 0",
            margin: "0.5rem 0",
          }}
        >
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, marginTop: "0.1rem" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,200,0,0.1)", border: "1px solid rgba(255,200,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#ffc800", fontSize: "0.75rem", fontWeight: 700 }}>!</span>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffc800", marginBottom: "0.75rem", fontWeight: 700 }}>
                Conflict of Interest Notice
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", lineHeight: 1.85, maxWidth: "72rem" }}>
                Nuuhaven is operated alongside a primary employment role at one of the Big 4 professional services firms, where the principal specialises in <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>debt and capital advisory</strong>. Every prospective client and project scope is individually assessed to determine whether it presents a conflict of interest with this primary role. <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Nuuhaven expressly reserves the right to decline, suspend, or terminate any engagement at any stage — including after a proposal has been accepted — should a conflict of interest be identified.</strong> Submitting an enquiry or receiving a proposal does not constitute a guarantee of engagement. Clients are encouraged to disclose the full nature of their business upfront to expedite this assessment.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.25)",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
            }}
          >
            © {new Date().getFullYear()} Nuuhaven (Pty) Ltd. All rights reserved.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div className="live-dot" />
            <span
              style={{
                color: "rgba(255,255,255,0.25)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
              }}
            >
              South Africa, Available Worldwide
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
