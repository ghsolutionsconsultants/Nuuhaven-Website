"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getLenis } from "@/components/layout/LenisProvider";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const TOOLBAR_H = 64;

export default function ReportModal({ isOpen, onClose, title, children }: ReportModalProps) {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Pause Lenis when modal is open
  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) { lenis?.stop(); } else { lenis?.start(); }
    return () => { getLenis()?.start(); };
  }, [isOpen]);

  // Trap wheel + touch events so Lenis never sees them from inside this container.
  // Lenis calls e.preventDefault() at document level even when stopped, which
  // blocks native overflow-scroll on child elements.
  useEffect(() => {
    if (!isOpen || !scrollRef.current) return;
    const el = scrollRef.current;
    const trap = (e: Event) => e.stopPropagation();
    el.addEventListener("wheel", trap, { passive: true });
    el.addEventListener("touchstart", trap, { passive: true });
    el.addEventListener("touchmove", trap, { passive: true });
    return () => {
      el.removeEventListener("wheel", trap);
      el.removeEventListener("touchstart", trap);
      el.removeEventListener("touchmove", trap);
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="report-modal-backdrop"
      style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(0,0,0,0.97)" }}
    >
      {/* Toolbar — absolute, fixed height, always visible */}
      <div
        className="report-no-print"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: TOOLBAR_H,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0 clamp(0.75rem, 3vw, 1.5rem)",
          background: "#000",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 2,
        }}
      >
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-geist-mono, monospace)", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.15rem" }}>
            Nuuhaven · Report
          </div>
          <div style={{ fontFamily: "var(--font-geist-mono, monospace)", fontSize: "0.7rem", color: "rgba(255,255,255,0.75)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => window.print()}
            style={{ height: 40, padding: "0 1.25rem", background: "#dfff00", color: "#000", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "var(--font-geist-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.35rem", WebkitTapHighlightColor: "transparent" }}
          >
            ↓ Save as PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close report"
            style={{ width: 40, height: 40, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", WebkitTapHighlightColor: "transparent" }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Scroll area — explicit bounds, wheel+touch trapped to prevent Lenis interference */}
      <div
        ref={scrollRef}
        className="report-scroll-area"
        style={{
          position: "absolute",
          top: TOOLBAR_H,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          padding: "1.5rem clamp(0.5rem, 2vw, 1rem) 5rem",
        }}
      >
        <div
          id="nuuhaven-report"
          style={{ width: "100%", maxWidth: 800, margin: "0 auto", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
