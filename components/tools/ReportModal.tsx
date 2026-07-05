"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function ReportModal({ isOpen, onClose, title, children }: ReportModalProps) {
  // No body overflow manipulation — setting overflow:hidden on body breaks iOS touch events.
  // The toolbar is a flex sibling to the scroll area (not sticky inside it), which avoids
  // the known bug where position:sticky fails inside overflow:auto flex containers.

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="report-modal"
          className="report-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.97)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ── Toolbar ── always visible, never scrolls ── */}
          <div
            className="report-no-print"
            style={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.625rem",
              padding: "0.75rem clamp(0.75rem, 3vw, 1.5rem)",
              background: "rgba(0,0,0,0.96)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Title */}
            <div style={{ flex: "1 1 auto", minWidth: 0 }}>
              <div style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.52rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "0.15rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                Nuuhaven · Generated Report
              </div>
              <div style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.68rem",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {title}
              </div>
            </div>

            {/* Buttons — 44px minimum tap target */}
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0 clamp(0.75rem, 2vw, 1.25rem)",
                  height: 44,
                  background: "#dfff00",
                  color: "#000",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "clamp(0.58rem, 1.5vw, 0.65rem)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                ↓ Save as PDF
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  width: 44,
                  height: 44,
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "1rem",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  WebkitTapHighlightColor: "transparent",
                }}
                aria-label="Close report"
              >
                ✕
              </button>
            </div>
          </div>

          {/* ── Scrollable report area ── */}
          <div
            data-lenis-prevent
            style={{
              flex: 1,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              padding: "1.25rem clamp(0.5rem, 2vw, 1rem) 4rem",
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
