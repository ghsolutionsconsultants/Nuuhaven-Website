"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const leftLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Portfolio" },
];

const rightLinks = [
  { href: "/insights", label: "Insights" },
  { href: "/tools", label: "Free Tools" },
  { href: "/freelancer", label: "Freelancer?" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [heroLogoGone, setHeroLogoGone] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
      // Hero logo fades out by ~260px scroll, nav logo fades in after that
      setHeroLogoGone(window.scrollY > 200);
    };
    handler(); // sync on mount
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // On homepage: nav logo opacity controlled by scroll; on other pages always visible
  const logoOpacity = isHome ? (heroLogoGone ? 1 : 0) : 1;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          height: 68,
          padding: "0 40px",
          background: scrolled ? "rgba(0,0,0,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Desktop: logo left, links center, CTA right */}
        <div className="hidden md:flex items-center justify-between h-full">
          {/* Logo, left, fades in after hero logo scrolls away */}
          <Link href="/" data-cursor="HOME" className="flex items-center flex-shrink-0">
            <motion.div
              animate={{ opacity: logoOpacity }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src="/images/brand/logo-transparent.png"
                alt="Nuuhaven"
                width={130}
                height={42}
                className="object-contain"
                style={{ maxHeight: 42 }}
                priority
              />
            </motion.div>
          </Link>

          {/* Nav links, centered */}
          <div className="flex items-center gap-10">
            {[...leftLinks, ...rightLinks].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label-mono text-xs tracking-widest uppercase transition-colors duration-200 hover:text-white"
                data-cursor="OPEN"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            data-cursor="OPEN"
            className="flex-shrink-0 btn-accent"
            style={{ fontSize: "0.72rem", padding: "0.7rem 1.5rem" }}
          >
            Start a Project →
          </Link>
        </div>

        {/* Mobile: logo left, hamburger right */}
        <div className="flex md:hidden items-center justify-between h-full">
          <Link href="/" data-cursor="HOME">
            <motion.div animate={{ opacity: logoOpacity }} transition={{ duration: 0.4 }}>
              <Image
                src="/images/brand/logo-transparent.png"
                alt="Nuuhaven"
                width={100}
                height={34}
                className="object-contain"
                style={{ maxHeight: 34 }}
                priority
              />
            </motion.div>
          </Link>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setOpen((o) => !o)}
            data-cursor=""
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
              className="block w-6 h-px"
              style={{ background: "var(--text)" }}
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="block w-6 h-px"
              style={{ background: "var(--text)" }}
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
              className="block w-6 h-px"
              style={{ background: "var(--text)" }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center md:hidden"
            style={{ background: "rgba(0,0,0,0.97)" }}
          >
            {[...leftLinks, ...rightLinks].map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-3xl font-bold uppercase tracking-wider py-4 text-center"
                  style={{ color: "var(--text)" }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: [...leftLinks, ...rightLinks].length * 0.07 }}
              className="mt-8"
            >
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-accent">
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
