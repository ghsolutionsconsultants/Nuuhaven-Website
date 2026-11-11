"use client";

import { useEffect } from "react";

// Light theme: lime/yellow-green text is unreadable on white, so any such text
// sitting on a light background gets a charcoal backing (see globals.css).
// Small chip-like elements with their own background get a full fill; anything
// else gets a highlight that hugs the glyphs, so the backing never covers
// neighbouring lines or non-lime content.
const CAP_HEIGHT = 0.72; // Geist / Geist Mono cap height in em
const isLimeish =(r: number, g: number, b: number) => g > 200 && r > 140 && b < 130;

function rgb(color: string) {
  const m = color.match(/[\d.]+/g);
  return m ? m.map(Number) : null;
}

function limeColor(el: Element) {
  const c = rgb(getComputedStyle(el).color);
  return !!c && isLimeish(c[0], c[1], c[2]);
}

function backgroundLuma(el: Element | null): number {
  while (el) {
    const c = rgb(getComputedStyle(el).backgroundColor);
    if (c && (c.length < 4 || c[3] > 0.5)) return (c[0] + c[1] + c[2]) / 3;
    el = el.parentElement;
  }
  return 255;
}

// A charcoal backing behind non-lime descendant text would make it black on black.
function allTextLime(el: HTMLElement) {
  for (const child of Array.from(el.querySelectorAll("*"))) {
    const hasText = Array.from(child.childNodes).some((n) => n.nodeType === 3 && n.textContent?.trim());
    if (hasText && !limeColor(child)) return false;
  }
  return true;
}

export default function LimeChips() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const scan = () => {
      frame = 0;
      const light = root.dataset.theme === "light";
      if (!light) {
        document.querySelectorAll<HTMLElement>(".lime-band, .lime-fill").forEach((el) => {
          el.classList.remove("lime-band", "lime-fill", "lime-pad");
          el.style.removeProperty("--lime-pad");
        });
        return;
      }
      document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
        if (el.classList.contains("lime-band") || el.classList.contains("lime-fill") || el.classList.contains("lime-chip")) return;
        if (el.closest("[data-hero-text].on-eclipse, svg")) return;
        if (!Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent?.trim())) return;
        if (!limeColor(el)) return;
        if (backgroundLuma(el.parentElement) < 90) return;
        if (!allTextLime(el)) return;
        const style = getComputedStyle(el);
        const own = rgb(style.backgroundColor);
        const hasOwnBg = !!own && (own.length < 4 || own[3] > 0);
        const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.3;
        const small = el.getBoundingClientRect().height <= lineHeight * 2.2 + 24;
        if (!(hasOwnBg && small)) {
          // Equal padding above the caps and below the baseline, limited by the
          // leading so tightly-set headings don't reach into the next line.
          const fontSize = parseFloat(style.fontSize);
          const leading = (parseFloat(style.lineHeight) || fontSize * 1.2) - fontSize * CAP_HEIGHT;
          const pad = Math.min(0.24 * fontSize, Math.max(0.08 * fontSize, leading / 2));
          el.style.setProperty("--lime-pad", `${pad.toFixed(1)}px`);
          el.classList.add("lime-band");
        }
        // Flex/grid boxes already centre their content; plain boxes get cap-trimmed padding.
        else if (/flex|grid/.test(style.display)) el.classList.add("lime-fill");
        else el.classList.add("lime-fill", "lime-pad");
      });
    };
    const queue = () => { if (!frame) frame = window.setTimeout(scan, 60); };

    queue();
    const content = new MutationObserver(queue);
    content.observe(document.body, { subtree: true, childList: true });
    const theme = new MutationObserver(queue);
    theme.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => { content.disconnect(); theme.disconnect(); window.clearTimeout(frame); };
  }, []);

  return null;
}
