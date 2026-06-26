"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset both native scroll and any Lenis transform residue
    window.scrollTo(0, 0);
    document.documentElement.style.transform = "none";
    document.documentElement.style.top = "0px";
    document.body.style.transform = "none";
    document.body.style.top = "0px";
  }, [pathname]);

  return null;
}
