"use client";

import { motion } from "framer-motion";

const items = [
  { value: "10+", label: "Websites Built" },
  { value: "10+", label: "Clients Served" },
  { value: "10+", label: "Brands Developed" },
  { value: "4+", label: "Industries Served" },
  { value: "100+", label: "Assets Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "2023", label: "Est." },
];

const ticker = [...items, ...items];

export default function LiveMetricsTicker() {
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        background: "rgba(223,255,0,0.04)",
        borderTop: "1px solid rgba(223,255,0,0.12)",
        borderBottom: "1px solid rgba(223,255,0,0.12)",
      }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        {ticker.map((item, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            <span
              className="font-mono font-bold text-sm"
              style={{ color: "var(--accent)" }}
            >
              {item.value}
            </span>
            <span className="label-mono">{item.label}</span>
            <span className="label-mono opacity-30 mx-2">·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
