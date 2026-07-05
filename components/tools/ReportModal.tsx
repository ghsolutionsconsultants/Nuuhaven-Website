"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function ReportModal({ isOpen, onClose, title, children }: ReportModalProps) {
  // No body overflow manipulation — setting overflow:hidden on body breaks iOS touch events
  // including taps on buttons inside fixed overlays. The modal is position:fixed inset:0
  // so it visually covers the page without needing to lock body scroll.

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="report-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="report-modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.97)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
            padding: "0 clamp(0.5rem, 2vw, 1rem) 4rem",
          }}
          data-lenis-prevent
        >
          {/* Sticky toolbar */}
          <div
            className="report-no-print"
            style={{
              width: "100%",
              maxWidth: 800,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.625rem",
              padding: "0.875rem 0",
              position: "sticky",
              top: 0,
              zIndex: 2,
              background: "rgba(0,0,0,0.92)",
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
                marginBottom: "0.2rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                Nuuhaven · Generated Report
              </div>
              <div style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.75)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {title}
              </div>
            </div>

            {/* Buttons — 44px min tap targets for mobile */}
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
                  color: "rgba(255,255,255,0.7)",
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
              >
                ✕
              </button>
            </div>
          </div>

          {/* Report document */}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
