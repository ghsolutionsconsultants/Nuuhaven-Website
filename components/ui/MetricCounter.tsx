"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  label: string;
  suffix?: string;
}

const CHARS = "0123456789";

export default function MetricCounter({ value, label, suffix = "" }: Props) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const target = value.replace(/[^0-9]/g, "");
    const num = parseInt(target, 10);
    if (isNaN(num)) { setDisplay(value); return; }

    let frame = 0;
    const total = 50;
    const scramble = () => {
      frame++;
      if (frame < total * 0.7) {
        const rand = Math.floor(Math.random() * (num * 1.5));
        setDisplay(String(rand));
      } else if (frame <= total) {
        const progress = (frame - total * 0.7) / (total * 0.3);
        const current = Math.round(num * progress);
        setDisplay(String(current));
      } else {
        setDisplay(value);
        return;
      }
      setTimeout(scramble, 30);
    };
    setTimeout(scramble, 200);
  }, [started, value]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div
        className="font-mono font-bold"
        style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          color: "var(--accent)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {display}{suffix}
      </div>
      <div className="label-mono">{label}</div>
    </div>
  );
}
