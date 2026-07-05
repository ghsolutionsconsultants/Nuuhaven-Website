"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function ReportModal({ isOpen, onClose, title, children }: ReportModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="report-modal-backdrop"
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.95)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 1rem 4rem",
        }}
      >
        {/* Sticky toolbar */}
        <div
          className="report-no-print"
          style={{
            width: "100%", maxWidth: 800,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "1rem 0",
            position: "sticky", top: 0, zIndex: 2,
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.2rem" }}>
              Nuuhaven · Generated Report
            </div>
            <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
              {title}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => window.print()}
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.625rem 1.25rem",
                background: "#dfff00", color: "#000",
                border: "none", borderRadius: 8, cursor: "pointer",
                fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem",
                letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              ↓ Save as PDF
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "0.625rem 0.875rem",
                background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, cursor: "pointer",
                fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem",
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
            width: "100%", maxWidth: 800,
            background: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
          }}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
