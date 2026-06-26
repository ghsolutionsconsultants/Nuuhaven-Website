"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowOnHover?: boolean;
}

export default function HolographicCard({ children, className = "", style, glowOnHover = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y });
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setHovered(true)}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        boxShadow: hovered && glowOnHover
          ? "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(223,255,0,0.08)"
          : "0 10px 30px rgba(0,0,0,0.5)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`holo-card scan-lines ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </motion.div>
  );
}
