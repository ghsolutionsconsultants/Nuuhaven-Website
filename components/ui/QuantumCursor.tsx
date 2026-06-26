"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "click";

export default function QuantumCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(dotX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(dotY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setState("hover");
        setLabel((interactive as HTMLElement).dataset.cursor || "");
      } else {
        setState("default");
        setLabel("");
      }
    };

    const handleDown = () => setState("click");
    const handleUp = () => setState((s) => (s === "click" ? "hover" : "default"));
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [dotX, dotY]);

  const isHover = state === "hover";
  const isClick = state === "click";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: isHover ? 48 : isClick ? 12 : 28,
            height: isHover ? 48 : isClick ? 12 : 28,
            opacity: isHover ? 0.9 : 0.4,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border border-accent flex items-center justify-center"
          style={{ borderColor: "var(--accent)" }}
        >
          {isHover && label && (
            <span
              className="text-[9px] font-mono font-bold uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: isHover ? 4 : isClick ? 3 : 5,
            height: isHover ? 4 : isClick ? 3 : 5,
            opacity: isHover ? 0.6 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
          style={{ background: "var(--accent)" }}
        />
      </motion.div>
    </div>
  );
}
