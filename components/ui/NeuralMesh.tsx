"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number; y: number; r: number;
  alpha: number; alphaSpeed: number;
  color: string; isAccent: boolean;
};

type Aurora = {
  baseY: number; height: number;
  phase: number; speed: number;
  waveAmp: number; waveFreq: number;
  colors: [string, string, string];
};

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const setSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    setSize();

    // ── Stars ──
    const STAR_COUNT = 900;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => {
      const rnd = Math.random();
      let color: string;
      let isAccent = false;
      if (rnd < 0.05) { color = "223,255,0"; isAccent = true; }      // #dfff00
      else if (rnd < 0.09) { color = "180,240,80"; isAccent = true; } // soft accent green
      else if (rnd < 0.14) { color = "220,255,120"; isAccent = true; }// light lime
      else if (rnd < 0.22) { color = "255,255,210"; }                 // warm white
      else { color = "255,255,255"; }                                  // pure white

      const baseR = isAccent
        ? Math.random() * 1.4 + 0.5
        : Math.random() * 1.1 + 0.2;

      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: baseR,
        alpha: Math.random() * 0.55 + 0.15,
        alphaSpeed: (Math.random() - 0.5) * 0.007,
        color,
        isAccent,
      };
    });

    // ── Aurora bands ──
    const auroras: Aurora[] = [
      {
        baseY: 0.08,
        height: 0.22,
        phase: 0,
        speed: 0.00045,
        waveAmp: 28,
        waveFreq: 0.0025,
        colors: ["rgba(100,220,60,0)", "rgba(150,255,50,0.055)", "rgba(223,255,0,0.04)"],
      },
      {
        baseY: 0.04,
        height: 0.14,
        phase: 1.8,
        speed: 0.0003,
        waveAmp: 18,
        waveFreq: 0.003,
        colors: ["rgba(80,200,80,0)", "rgba(120,240,80,0.04)", "rgba(180,255,60,0.03)"],
      },
      {
        baseY: 0.18,
        height: 0.1,
        phase: 3.5,
        speed: 0.0006,
        waveAmp: 14,
        waveFreq: 0.004,
        colors: ["rgba(200,255,50,0)", "rgba(223,255,0,0.025)", "rgba(160,255,80,0.02)"],
      },
      {
        baseY: 0.01,
        height: 0.08,
        phase: 5.2,
        speed: 0.00035,
        waveAmp: 10,
        waveFreq: 0.005,
        colors: ["rgba(60,180,80,0)", "rgba(100,220,60,0.03)", "rgba(223,255,0,0.025)"],
      },
    ];

    let t = 0;

    const drawAurora = (a: Aurora) => {
      const y0 = a.baseY * H;
      const h = a.height * H;
      const STEPS = 80;
      const dx = W / STEPS;

      // Top edge
      const topPoints: [number, number][] = [];
      for (let i = 0; i <= STEPS; i++) {
        const x = i * dx;
        const wave = Math.sin(x * a.waveFreq + t * a.speed * 1000 + a.phase);
        topPoints.push([x, y0 + wave * a.waveAmp]);
      }

      // Bottom edge (different phase)
      const botPoints: [number, number][] = [];
      for (let i = 0; i <= STEPS; i++) {
        const x = i * dx;
        const wave = Math.sin(x * a.waveFreq * 0.7 + t * a.speed * 800 + a.phase + 1.2);
        botPoints.push([x, y0 + h + wave * a.waveAmp * 0.6]);
      }

      ctx.beginPath();
      ctx.moveTo(topPoints[0][0], topPoints[0][1]);
      for (let i = 1; i < topPoints.length; i++) {
        const [px, py] = topPoints[i - 1];
        const [cx, cy] = topPoints[i];
        ctx.quadraticCurveTo(px, py, (px + cx) / 2, (py + cy) / 2);
      }
      for (let i = botPoints.length - 1; i >= 0; i--) {
        const [px, py] = botPoints[i];
        const next = botPoints[Math.max(0, i - 1)];
        ctx.quadraticCurveTo(px, py, (px + next[0]) / 2, (py + next[1]) / 2);
      }
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, y0, 0, y0 + h);
      grad.addColorStop(0, a.colors[0]);
      grad.addColorStop(0.4, a.colors[1]);
      grad.addColorStop(0.75, a.colors[2]);
      grad.addColorStop(1, a.colors[0]);
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 1;

      // Aurora
      for (const a of auroras) drawAurora(a);

      // Stars
      for (const s of stars) {
        s.alpha += s.alphaSpeed;
        if (s.alpha > 0.88) { s.alpha = 0.88; s.alphaSpeed *= -1; }
        if (s.alpha < 0.04) { s.alpha = 0.04; s.alphaSpeed *= -1; }

        // Glow for accent/big stars
        if (s.isAccent || s.r > 1.2) {
          const glowR = s.r * (s.isAccent ? 4.5 : 3);
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
          glow.addColorStop(0, `rgba(${s.color},${s.alpha * 0.5})`);
          glow.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${s.alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", setSize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.9 }}
    />
  );
}
