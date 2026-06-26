"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Particle burst for logo reveal
function ParticleBurst({ active }: { active: boolean }) {
  const PARTICLES = 28;
  return (
    <AnimatePresence>
      {active &&
        Array.from({ length: PARTICLES }).map((_, i) => {
          const angle = (i / PARTICLES) * Math.PI * 2;
          const dist = 80 + Math.random() * 140;
          const x = Math.cos(angle) * dist;
          const y = Math.sin(angle) * dist;
          const size = Math.random() * 3 + 1;
          const delay = Math.random() * 0.25;
          return (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x, y, opacity: 0, scale: 0 }}
              transition={{ duration: 1.0 + Math.random() * 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: size,
                height: size,
                borderRadius: "50%",
                background: i % 4 === 0 ? "#dfff00" : i % 3 === 0 ? "rgba(180,255,80,0.9)" : "rgba(255,255,255,0.7)",
              }}
            />
          );
        })}
    </AnimatePresence>
  );
}

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"cover" | "playing" | "done">("cover");
  const [slide, setSlide] = useState(0);
  const [burstActive, setBurstActive] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const already = sessionStorage.getItem("nuu-loaded");
    if (already) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("nuu-loaded", "1");
    setPhase("playing");

    // Pre-slide (0) → Slide 1 (1) → Slide 2 (2) → Logo reveal (3)
    // Timings: 2200, 3200, 3200, 2500
    const durations = [2200, 3200, 3200, 2500];
    let current = 0;

    const advance = () => {
      current++;
      if (current < 4) {
        // Flash between slides
        setFlashActive(true);
        setTimeout(() => setFlashActive(false), 160);

        setSlide(current);
        if (current === 3) {
          // Trigger particle burst for logo reveal
          setTimeout(() => setBurstActive(true), 600);
          setTimeout(() => setBurstActive(false), 1800);
        }
        setTimeout(advance, durations[current]);
      } else {
        setTimeout(() => setPhase("done"), 800);
      }
    };

    setTimeout(advance, durations[0]);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const show = phase !== "done";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cinematic"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 overflow-hidden"
          style={{ background: "#000000", zIndex: 9999 }}
        >
          {/* Flash overlay between slides */}
          <AnimatePresence>
            {flashActive && (
              <motion.div
                key="flash"
                initial={{ opacity: 0.35 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: "#dfff00", zIndex: 10 }}
              />
            )}
          </AnimatePresence>

          {/* Scan line, always running */}
          {phase === "playing" && (
            <>
              <motion.div
                className="absolute inset-x-0 h-px pointer-events-none"
                style={{ background: "rgba(223,255,0,0.12)", zIndex: 5 }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-x-0 h-px pointer-events-none"
                style={{ background: "rgba(223,255,0,0.06)", zIndex: 5 }}
                animate={{ top: ["100%", "0%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />
            </>
          )}

          {/* Ambient glow at bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(223,255,0,0.055) 0%, transparent 65%)",
            }}
          />

          <AnimatePresence mode="wait">

            {/* ── PRE-SLIDE 0: tension builder ── */}
            {phase === "playing" && slide === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Single growing accent line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: "min(55vw, 440px)",
                    height: 1,
                    background: "linear-gradient(to right, transparent, #dfff00, transparent)",
                    transformOrigin: "center",
                    marginBottom: "2.2rem",
                  }}
                />
                {/* Stacked thin label lines */}
                {["JOHANNESBURG · SOUTH AFRICA", "EST. 2023", "DIGITAL ASSETS"].map((txt, i) => (
                  <motion.div
                    key={txt}
                    initial={{ opacity: 0, letterSpacing: "0.05em" }}
                    animate={{ opacity: i === 1 ? 0.55 : 0.22, letterSpacing: "0.4em" }}
                    transition={{ duration: 1.0, delay: 0.5 + i * 0.25 }}
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.52rem",
                      textTransform: "uppercase",
                      color: i === 1 ? "var(--accent)" : "rgba(255,255,255,0.6)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {txt}
                  </motion.div>
                ))}
                {/* Pulsing dot */}
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    marginTop: "2.5rem",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#dfff00",
                    boxShadow: "0 0 18px rgba(223,255,0,0.8)",
                  }}
                />
              </motion.div>
            )}

            {/* ── SLIDE 1: Forget everything ── */}
            {phase === "playing" && slide === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
              >
                {/* Big number corner */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.07 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute"
                  style={{
                    right: "6vw", top: "14%",
                    fontFamily: "monospace",
                    fontSize: "clamp(7rem, 18vw, 16rem)",
                    fontWeight: 900,
                    color: "#dfff00",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  01
                </motion.div>

                <div style={{ position: "relative" }}>
                  {[
                    { text: "Forget", delay: 0.05 },
                    { text: "everything", delay: 0.22 },
                    { text: "you know about", delay: 0.40 },
                    { text: "Digital Assets.", delay: 0.58 },
                  ].map(({ text, delay }, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, y: 72, rotateX: -12 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
                      className="block font-black uppercase"
                      style={{
                        fontSize: "clamp(2.8rem, 7.5vw, 7rem)",
                        lineHeight: 0.96,
                        letterSpacing: "-0.035em",
                        color: i === 3 ? "var(--accent)" : "#ffffff",
                        textShadow: i === 3 ? "0 0 80px rgba(223,255,0,0.4)" : "none",
                      }}
                    >
                      {text}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    marginTop: "2.5rem",
                    width: 80,
                    height: 1,
                    background: "var(--accent)",
                    transformOrigin: "left",
                    opacity: 0.5,
                  }}
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.7 }}
                  style={{
                    marginTop: "1.2rem",
                    fontFamily: "monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  This is what Nuuhaven changes.
                </motion.p>
              </motion.div>
            )}

            {/* ── SLIDE 2: Your business is not a logo ── */}
            {phase === "playing" && slide === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
              >
                {/* Big number corner */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.07 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute"
                  style={{
                    left: "6vw", bottom: "12%",
                    fontFamily: "monospace",
                    fontSize: "clamp(7rem, 18vw, 16rem)",
                    fontWeight: 900,
                    color: "#dfff00",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  02
                </motion.div>

                {/* Left accent bar */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    left: "max(10vw, 2rem)",
                    top: "28%", bottom: "28%",
                    width: 2,
                    background: "linear-gradient(to bottom, transparent, #dfff00, transparent)",
                    transformOrigin: "top",
                  }}
                />

                <div>
                  {[
                    { text: "Your business", delay: 0.05, accent: false },
                    { text: "is not a logo.", delay: 0.22, accent: false },
                    { text: "It's a system.", delay: 0.42, accent: true },
                  ].map(({ text, delay, accent }, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
                      className="block font-black uppercase"
                      style={{
                        fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
                        lineHeight: 1.0,
                        letterSpacing: "-0.03em",
                        color: accent ? "var(--accent)" : "#ffffff",
                        textShadow: accent ? "0 0 100px rgba(223,255,0,0.35)" : "none",
                      }}
                    >
                      {text}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.7 }}
                  className="flex items-center gap-6"
                  style={{ marginTop: "2.2rem" }}
                >
                  {["Brand", "Presence", "Systems", "Strategy"].map((w, i) => (
                    <span key={w} className="flex items-center gap-6">
                      {i > 0 && (
                        <span style={{ color: "var(--accent)", fontSize: "0.5rem" }}>◆</span>
                      )}
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.55rem",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.25)",
                        }}
                      >
                        {w}
                      </span>
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* ── SLIDE 3: Logo reveal ── */}
            {phase === "playing" && slide === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Outer halo ring, expands from nothing */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    border: "1px solid rgba(223,255,0,0.08)",
                    boxShadow: "0 0 200px rgba(223,255,0,0.12), inset 0 0 120px rgba(223,255,0,0.04)",
                  }}
                />
                {/* Inner glow orb */}
                <motion.div
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    width: 280,
                    height: 280,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(223,255,0,0.1) 0%, transparent 70%)",
                    filter: "blur(24px)",
                  }}
                />

                {/* Particle burst origin point */}
                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ParticleBurst active={burstActive} />

                  {/* Logo */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    <Image
                      src="/images/brand/logo-transparent.png"
                      alt="Nuuhaven"
                      width={230}
                      height={76}
                      className="object-contain"
                      priority
                      style={{
                        filter: "drop-shadow(0 0 30px rgba(223,255,0,0.3))",
                      }}
                    />
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0, letterSpacing: "0.02em" }}
                  animate={{ opacity: 1, letterSpacing: "0.42em" }}
                  transition={{ duration: 1.2, delay: 0.75, ease: "easeOut" }}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.62rem",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    textAlign: "center",
                    marginTop: "0.5rem",
                  }}
                >
                  Your Digital Haven For Business
                </motion.p>

                {/* Loading bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  style={{ marginTop: "3rem", width: 180, height: 1, background: "rgba(255,255,255,0.08)", borderRadius: 1 }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(to right, rgba(223,255,0,0.4), #dfff00)",
                      transformOrigin: "left",
                      borderRadius: 1,
                    }}
                  />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  style={{
                    marginTop: "0.75rem",
                    fontFamily: "monospace",
                    fontSize: "0.5rem",
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Initialising experience...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
