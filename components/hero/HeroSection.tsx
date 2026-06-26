"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";

const HEADLINE = ["Your Digital", "Haven For", "Business."];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(223,255,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 section pb-24 w-full">
        <div className="section-inner">
          {/* Hero logo, flows into nav on scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            style={{
              marginBottom: "2.8rem",
              display: "inline-block",
              originX: 0,
              originY: 0,
            }}
          >
            <motion.div
              style={{
                scale: heroLogoScale,
                opacity: heroLogoOpacity,
                y: heroLogoY,
                transformOrigin: "top left",
              }}
            >
              <Image
                src="/images/brand/logo-transparent.png"
                alt="Nuuhaven"
                width={200}
                height={66}
                className="object-contain"
                priority
                style={{
                  maxHeight: 66,
                  filter: "drop-shadow(0 0 20px rgba(223,255,0,0.15))",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Headline */}
          <h1 className="display-hero" style={{ maxWidth: "14ch", marginBottom: "2.5rem" }}>
            {HEADLINE.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                data-text={line}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            className="text-base md:text-lg max-w-xl"
            style={{ color: "var(--text-muted)", lineHeight: 2, marginBottom: "3rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.75 }}
          >
            We help businesses establish professional brand identities, digital
            platforms, business documentation and marketing assets that
            strengthen credibility and support long-term growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.9 }}
          >
            <MagneticButton href="/contact" variant="accent" data-cursor="START">
              Begin Your Transformation
              <span>→</span>
            </MagneticButton>
            <MagneticButton href="/work" variant="outline" data-cursor="EXPLORE">
              Explore Our Work
            </MagneticButton>
          </motion.div>

          {/* Dictionary definition */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.1 }}
            style={{
              marginTop: "3rem",
              padding: "1.25rem 1.5rem",
              borderLeft: "2px solid rgba(223,255,0,0.35)",
              background: "rgba(223,255,0,0.03)",
              borderRadius: "0 8px 8px 0",
              maxWidth: "34rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.625rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
              <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.01em" }}>nuuhaven</span>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>/njuːˈheɪvən/</span>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>noun</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: 1.75, marginBottom: "0.625rem" }}>
              A new place of safety, clarity, and professional refuge, a foundation built to protect and elevate a business&apos;s identity in the world.
            </p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: "0.5rem" }}>
              &ldquo;We finally found our <span style={{ color: "var(--accent)", fontStyle: "normal" }}>Nuuhaven</span>, the brand, website, and presence that matched how we actually operate.&rdquo;
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {["refuge", "foundation", "haven", "launchpad", "home"].map(s => (
                <span key={s} style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>{s}</span>
              )).reduce((acc: React.ReactNode[], el, i, arr) => {
                acc.push(el);
                if (i < arr.length - 1) acc.push(<span key={`dot-${i}`} style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.6rem" }}>·</span>);
                return acc;
              }, [])}
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="flex items-center gap-3"
            style={{ marginTop: "3rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
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
