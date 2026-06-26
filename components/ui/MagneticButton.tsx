"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "accent" | "outline";
  "data-cursor"?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "accent",
  "data-cursor": dataCursor,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const baseClass = variant === "accent" ? "btn-accent" : "btn-outline";
  const Tag = href ? "a" : "button";

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      <motion.div animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Tag
          href={href}
          onClick={onClick}
          className={`${baseClass} ${className}`}
          data-cursor={dataCursor}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}
