"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getLenis } from "@/components/layout/LenisProvider";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function ReportModal({ isOpen, onClose, title, children }: ReportModalProps) {
  // Mount guard — createPortal requires document to exist (client only)
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Pause Lenis smooth scroll so wheel events reach the modal's own scroll container
  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => { getLenis()?.start(); };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    /*
      Rendered directly into <body> via portal — bypasses any Framer Motion
      transform on ancestor elements that would break position:fixed anchoring.
    */
    <div
      className="report-modal-backdrop"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99999,
        background: "rgba(0,0,0,0.97)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Toolbar — never scrolls, always visible ───────────── */}
      <div
        className="report-no-print"
        style={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          padding: "0.75rem clamp(0.75rem, 3vw, 1.5rem)",
          background: "#000",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          minHeight: 60,
        }}
      >
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <div style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "0.15rem",
          }}>
            Nuuhaven · Report
          </div>
          <div style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.75)",
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              height: 44,
              padding: "0 1.25rem",
              background: "#dfff00",
              color: "#000",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 700,
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ↓ Save as PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close report"
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── Scrollable report document ─────────────────────────── */}
      <div
        style={{
          flex: 1,
          /*
            minHeight:0 is required — flex children default to min-height:auto
            which causes them to expand to content height instead of scrolling.
          */
          minHeight: 0,
          overflowY: "scroll",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          padding: "1.5rem clamp(0.5rem, 2vw, 1rem) 5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          id="nuuhaven-report"
          style={{
            width: "100%",
            maxWidth: 800,
            background: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
