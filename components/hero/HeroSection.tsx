"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

const HEADLINE = ["Your Digital", "Haven For", "Business."];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollY } = useScroll();
  // Hero logo shrinks + fades as user scrolls
  const heroLogoScale = useTransform(scrollY, [0, 320], [1, 0.55]);
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

    // Eclipse sphere
    const geo = new THREE.SphereGeometry(2, 64, 64);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.2,
      metalness: 0.8,
    });
    const sphere = new THREE.Mesh(geo, mat);
    sphere.position.y = -3.5;
    scene.add(sphere);

    // Glow ring (torus)
    const torusGeo = new THREE.TorusGeometry(2.05, 0.06, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0xdfff00, transparent: true, opacity: 0.7 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.copy(sphere.position);
    scene.add(torus);

    // Glow halo (sprite-like plane)
    const glowGeo = new THREE.PlaneGeometry(10, 10);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xdfff00,
      transparent: true,
      opacity: 0.04,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.copy(sphere.position);
    scene.add(glow);

    // Ambient + point lights
    scene.add(new THREE.AmbientLight(0x111111));
    const pointLight = new THREE.PointLight(0xdfff00, 2, 20);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Particles
    const pCount = 600;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 2;
      pPositions[i * 3 + 2] = r * Math.cos(phi) - 1;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xdfff00, size: 0.02, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(pGeo, pMat));

    let animFrame: number;
    let scrollY = 0;

    const onScroll = () => { scrollY = window.scrollY; };
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
      // Rise eclipse based on scroll
      const rise = Math.min(scrollY / (window.innerHeight * 0.8), 1);
      const targetY = -3.5 + rise * 4;
      sphere.position.y += (targetY - sphere.position.y) * 0.05;
      torus.position.y = sphere.position.y;
      glow.position.y = sphere.position.y;

      // Slow rotation
      sphere.rotation.y = t * 0.05;
      torus.rotation.z = t * 0.02;

      // Pulsing glow
      glowMat.opacity = 0.03 + Math.sin(t) * 0.01;
      torusMat.opacity = 0.5 + Math.sin(t * 1.5) * 0.2;

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
      ref={sectionRef}
      className="relative flex flex-col items-start justify-end noise-overlay"
      style={{ minHeight: "100svh", background: "var(--bg-primary)" }}
    >
      {/* Three.js canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(223,255,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 section pb-20 w-full">
        <div className="section-inner" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

          {/* Hero logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            style={{ marginBottom: isMobile ? "2rem" : "2.5rem", display: "inline-block" }}
          >
            <motion.div style={{ scale: heroLogoScale, opacity: heroLogoOpacity, y: heroLogoY, transformOrigin: "top center" }}>
              <Image
                src="/images/brand/logo-transparent.png"
                alt="Nuuhaven"
                width={isMobile ? 150 : 200}
                height={isMobile ? 50 : 66}
                className="object-contain"
                priority
                style={{ maxHeight: isMobile ? 50 : 66, filter: "drop-shadow(0 0 24px rgba(223,255,0,0.2))" }}
              />
            </motion.div>
          </motion.div>

          {/* Label badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            style={{ marginBottom: "1.5rem", maxWidth: "100%", padding: "0 0.5rem" }}
          >
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.4rem",
              fontFamily: "var(--font-geist-mono)",
              fontSize: isMobile ? "0.55rem" : "0.62rem",
              letterSpacing: isMobile ? "0.1em" : "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              padding: "0.45rem 0.875rem",
              border: "1px solid rgba(223,255,0,0.2)",
              borderRadius: 999,
              background: "rgba(223,255,0,0.05)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
              {isMobile ? "Brand · Web · Strategy" : "Brand · Web · Strategy · Johannesburg"}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="display-hero" style={{ marginBottom: "1.75rem", lineHeight: 1.0 }}>
            {HEADLINE.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                data-text={line}
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 2.35 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Thin accent divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.72, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "4rem",
              height: 2,
              background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
              borderRadius: 2,
              marginBottom: "1.75rem",
            }}
          />

          {/* Subtext */}
          <motion.p
            className="text-base md:text-lg"
            style={{ color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "2.75rem", maxWidth: "42rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            We help businesses establish professional brand identities, digital
            platforms, business documentation and marketing assets that
            strengthen credibility and support long-term growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.95 }}
          >
            <MagneticButton href="/contact" variant="accent" data-cursor="START">
              Start Your Project →
            </MagneticButton>
            <MagneticButton href="/work" variant="outline" data-cursor="EXPLORE">
              Explore Our Work
            </MagneticButton>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.1 }}
            style={{
              marginTop: isMobile ? "2rem" : "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "1rem" : "0",
              flexWrap: "nowrap",
            }}
          >
            {[
              { value: "10+", label: "Ecosystems Built" },
              { value: "4+", label: "Industries Served" },
              { value: "100+", label: "Assets Delivered" },
            ].map((stat, i) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && !isMobile && <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)", margin: "0 1.5rem" }} />}
                {i > 0 && isMobile && <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 1rem" }} />}
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: isMobile ? "0.85rem" : "1rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "-0.02em" }}>{stat.value}</div>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: isMobile ? "0.5rem" : "0.58rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem" }}>{stat.label}</div>
                </div>
              </div>
            ))}
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
      </div>
    </section>
  );
}
