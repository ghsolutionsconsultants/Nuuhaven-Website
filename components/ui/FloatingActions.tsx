"use client";

import { useState, useEffect } from "react";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const btnStyle = (color: string): React.CSSProperties => ({
    width: 46,
    height: 46,
    borderRadius: "50%",
    background: "rgba(10,10,10,0.92)",
    border: `1px solid ${color}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    transition: "transform 0.18s ease, background 0.18s ease",
    textDecoration: "none",
    flexShrink: 0,
  });

  return (
    <div style={{
      position: "fixed",
      bottom: "1.75rem",
      right: "1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.625rem",
      zIndex: 200,
      alignItems: "center",
    }}>
      {/* WhatsApp */}
      <a
        href="https://wa.me/27677179269"
        target="_blank"
        rel="noopener noreferrer"
        style={btnStyle("rgba(37,211,102,0.45)")}
        title="WhatsApp"
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.15)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(10,10,10,0.92)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#25d366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.852L.054 23.5a.5.5 0 0 0 .609.61l5.79-1.517A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.127-1.42l-.361-.214-3.742.981.997-3.648-.235-.374A9.951 9.951 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>

      {/* Email */}
      <a
        href="mailto:tshepang@nuuhaven.com"
        style={btnStyle("rgba(223,255,0,0.3)")}
        title="Email us"
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(223,255,0,0.08)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(10,10,10,0.92)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      </a>

      {/* Back to top — only shows after scrolling */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ ...btnStyle("rgba(255,255,255,0.12)"), background: "rgba(10,10,10,0.92)" }}
          title="Back to top"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(10,10,10,0.92)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}
    </div>
  );
}
