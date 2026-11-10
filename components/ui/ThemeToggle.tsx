"use client";

import { useSyncExternalStore } from "react";

const KEY = "nuu-theme";

// Single source of truth: the <html data-theme> attribute (set before paint by
// the head script in app/layout.tsx). Every toggle instance subscribes to it.
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const isLight = () => document.documentElement.dataset.theme === "light";

export default function ThemeToggle({ size = 36 }: { size?: number }) {
  const light = useSyncExternalStore(subscribe, isLight, () => false);

  const toggle = () => {
    const next = !isLight();
    if (next) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try { localStorage.setItem(KEY, next ? "light" : "dark"); } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
      data-cursor=""
      style={{
        width: size, height: size, flexShrink: 0, borderRadius: "50%",
        display: "grid", placeItems: "center", cursor: "pointer",
        border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.05)",
        color: "rgba(255,255,255,0.8)", transition: "border-color .2s, color .2s",
      }}
    >
      {light ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}
