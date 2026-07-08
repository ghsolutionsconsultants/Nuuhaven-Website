"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const HEADLINE = ["Your Digital", "Haven For", "Business."];

// Each headline line: horizontal offset on desktop + unique float params
const LINE_CFG = [
  { xOffset: -28, floatAmp: 10, floatDur: 7.5, floatDelay: 0.2 },
  { xOffset: 0,   floatAmp: 14, floatDur: 9.2, floatDelay: 0.0 },
  { xOffset: 22,  floatAmp: 9,  floatDur: 8.1, floatDelay: 1.1 },
];

// Decorative star-chart labels scattered around viewport (desktop only)
const STARS = [
  { t: "RA·12h 30m", x: "7%",  y: "14%", op: 0.1,  dur: 6.5, amp: 6,  delay: 3.2 },
  { t: "NGC·2047",   x: "82%", y: "19%", op: 0.09, dur: 7.2, amp: 8,  delay: 3.5 },
  { t: "◆",          x: "19%", y: "29%", op: 0.2,  dur: 5.5, amp: 10, delay: 3.0, accent: true },
  { t: "M·87",       x: "5%",  y: "51%", op: 0.15, dur: 8.0, amp: 7,  delay: 3.3, accent: true },
  { t: "·",          x: "76%", y: "37%", op: 0.28, dur: 4.2, amp: 12, delay: 2.8 },
  { t: "EST·2023",   x: "79%", y: "79%", op: 0.08, dur: 9.0, amp: 5,  delay: 3.7 },
  { t: "◆",          x: "88%", y: "54%", op: 0.08, dur: 6.8, amp: 9,  delay: 3.6 },
  { t: "JHB·ZA",    x: "71%", y: "11%", op: 0.08, dur: 7.8, amp: 5,  delay: 3.4 },
  { t: "·",          x: "13%", y: "67%", op: 0.22, dur: 5.1, amp: 9,  delay: 2.9 },
  { t: "◆",          x: "38%", y: "87%", op: 0.11, dur: 8.2, amp: 7,  delay: 3.8, accent: true },
  { t: "Dec+12°·30", x: "88%", y: "38%", op: 0.07, dur: 7.0, amp: 6,  delay: 3.9 },
  { t: "·",          x: "44%", y: "10%", op: 0.18, dur: 4.8, amp: 10, delay: 3.1 },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  const { scrollY } = useScroll();
  const heroLogoOpacity = useTransform(scrollY, [0, 260], [1, 0]);
  const heroLogoY = useTransform(scrollY, [0, 320], [0, -40]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    // ── Galactic core: eclipse sphere ──
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(2, 64, 64),
      new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.2, metalness: 0.8 })
    );
    sphere.position.y = -3.5;
    scene.add(sphere);

    // Orbital glow ring
    const torusMat = new THREE.MeshBasicMaterial({ color: 0xdfff00, transparent: true, opacity: 0.7 });
    const torus = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.06, 16, 100), torusMat);
    torus.position.copy(sphere.position);
    scene.add(torus);

    // Glow halo plane
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xdfff00, transparent: true, opacity: 0.04, depthWrite: false });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), glowMat);
    glow.position.copy(sphere.position);
    scene.add(glow);

    scene.add(new THREE.AmbientLight(0x111111));
    const pointLight = new THREE.PointLight(0xdfff00, 2, 20);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // ── Galaxy spiral particles ──
    const ARMS = 2;
    const PER_ARM = 520;
    const SCATTERED = 280;
    const total = ARMS * PER_ARM + SCATTERED;
    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);

    let idx = 0;
    for (let arm = 0; arm < ARMS; arm++) {
      const armAngle = (arm / ARMS) * Math.PI * 2;
      for (let j = 0; j < PER_ARM; j++) {
        const t = j / PER_ARM;
        const angle = armAngle + t * Math.PI * 3.8;
        const radius = 0.25 + t * 5.8;
        const scatter = 0.12 + t * 0.55;
        pos[idx * 3 + 0] = Math.cos(angle) * radius + (Math.random() - 0.5) * scatter * 2;
        pos[idx * 3 + 1] = (Math.random() - 0.5) * 0.22 - 2;
        pos[idx * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * scatter * 2;
        // Accent yellow near core fading to cool white at edges
        const core = Math.max(0, 1 - t * 1.5);
        col[idx * 3 + 0] = 1.0;
        col[idx * 3 + 1] = 0.75 + core * 0.25;
        col[idx * 3 + 2] = core * 0.05 + (1 - core) * 0.85;
        idx++;
      }
    }
    // Scattered background stars
    for (let j = 0; j < SCATTERED; j++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 5;
      pos[idx * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[idx * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 2;
      pos[idx * 3 + 2] = r * Math.cos(phi) - 1;
      col[idx * 3 + 0] = 0.8 + Math.random() * 0.2;
      col[idx * 3 + 1] = 0.85 + Math.random() * 0.15;
      col[idx * 3 + 2] = 0.9 + Math.random() * 0.1;
      idx++;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.022, transparent: true, opacity: 0.75, vertexColors: true });
    const galaxy = new THREE.Points(pGeo, pMat);
    galaxy.rotation.x = Math.PI * 0.12;
    scene.add(galaxy);

    let animFrame: number;
    let scrollYVal = 0;
    const onScroll = () => { scrollYVal = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      animFrame = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;

      // Eclipse rises from galactic core on scroll
      const rise = Math.min(scrollYVal / (window.innerHeight * 0.8), 1);
      const targetY = -3.5 + rise * 4;
      sphere.position.y += (targetY - sphere.position.y) * 0.05;
      torus.position.y = sphere.position.y;
      glow.position.y = sphere.position.y;

      sphere.rotation.y = t * 0.05;
      torus.rotation.z = t * 0.02;
      glowMat.opacity = 0.03 + Math.sin(t) * 0.01;
      torusMat.opacity = 0.5 + Math.sin(t * 1.5) * 0.2;

      // Galaxy slowly rotates
      galaxy.rotation.y = t * 0.035;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section
      className="relative noise-overlay"
      style={{ minHeight: "100svh", background: "var(--bg-primary)", overflow: "hidden" }}
    >
      {/* Three.js galaxy canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} />

      {/* Deep space vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1,
        background: "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.65) 100%)" }} />
      {/* Galactic core glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1,
        background: "radial-gradient(ellipse 80% 50% at 50% 105%, rgba(223,255,0,0.07) 0%, transparent 65%)" }} />

      {/* ── Decorative star-chart labels (desktop only) ── */}
      {!isMobile && STARS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: s.x, top: s.y, zIndex: 2,
            fontFamily: "var(--font-geist-mono)",
            fontSize: s.t.length <= 2 ? "0.7rem" : "0.46rem",
            color: s.accent ? "var(--accent)" : "rgba(255,255,255,0.9)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: s.op, y: [0, -s.amp, s.amp * 0.35, 0] }}
          transition={{
            opacity: { delay: s.delay, duration: 1.2 },
            y: { delay: s.delay, duration: s.dur, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {s.t}
        </motion.span>
      ))}

      {/* ── Main content ── */}
      <div
        className="relative flex flex-col items-center justify-center text-center"
        style={{
          zIndex: 10,
          minHeight: "100svh",
          padding: `5rem clamp(1.25rem, 4vw, 4rem)`,
        }}
      >
        {/* Logo — scroll-fades, also floats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          style={{ marginBottom: isMobile ? "2rem" : "2.5rem" }}
        >
          <motion.div style={{ opacity: heroLogoOpacity, y: heroLogoY }}>
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 7, delay: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/brand/logo-transparent.png"
                alt="Nuuhaven"
                width={isMobile ? 150 : 200}
                height={isMobile ? 50 : 66}
                className="object-contain"
                priority
                style={{ maxHeight: isMobile ? 50 : 66, filter: "drop-shadow(0 0 28px rgba(223,255,0,0.25))" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Badge pill — floats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.25 }}
          style={{ marginBottom: "1.75rem" }}
        >
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, delay: 3.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-geist-mono)",
              fontSize: isMobile ? "0.55rem" : "0.62rem",
              letterSpacing: isMobile ? "0.1em" : "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
              padding: "0.45rem 0.875rem",
              border: "1px solid rgba(223,255,0,0.2)",
              borderRadius: 999,
              background: "rgba(223,255,0,0.05)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
            Brand · Systems · Strategy
          </motion.span>
        </motion.div>

        {/* Headline — each line floats at its own orbital rhythm */}
        <h1 className="display-hero" style={{ marginBottom: "1.75rem" }}>
          {HEADLINE.map((line, i) => {
            const cfg = LINE_CFG[i];
            const amp = isMobile ? cfg.floatAmp * 0.5 : cfg.floatAmp;
            return (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 48, x: 0 }}
                animate={{ opacity: 1, y: 0, x: isMobile ? 0 : cfg.xOffset }}
                transition={{ duration: 0.85, delay: 2.35 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "block" }}
              >
                <motion.span
                  className="block"
                  data-text={line}
                  animate={{ y: [0, -amp, amp * 0.3, 0] }}
                  transition={{ duration: cfg.floatDur, delay: 3.5 + cfg.floatDelay, repeat: Infinity, ease: "easeInOut" }}
                >
                  {line}
                </motion.span>
              </motion.div>
            );
          })}
        </h1>

        {/* Accent divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.72 }}
          style={{ width: "4rem", height: 2, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", borderRadius: 2, marginBottom: "1.75rem" }}
        />

        {/* Subtext — gentle drift */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          <motion.p
            className="text-base md:text-lg"
            style={{ color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "2.75rem", maxWidth: "42rem" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 10, delay: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            We help businesses establish professional brand identities, digital
            platforms, business documentation and marketing assets that
            strengthen credibility and support long-term growth.
          </motion.p>
        </motion.div>

        {/* CTAs — subtle float */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.95 }}
        >
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6.5, delay: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <MagneticButton href="/contact" variant="accent" data-cursor="START">
              Start Your Project →
            </MagneticButton>
            <MagneticButton href="/work" variant="outline" data-cursor="EXPLORE">
              Explore Our Work
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="flex items-center gap-3"
          style={{ marginTop: "3rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.4 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
          />
          <span className="label-mono">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}
