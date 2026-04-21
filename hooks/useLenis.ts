"use client";

import { useEffect, useRef } from "react";

/**
 * Initialises Lenis smooth scroll after the page has loaded.
 * Import and call this once in your root layout or page.
 *
 * Usage:
 *   useLenis(); // inside a Client Component
 */
export function useLenis() {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    // Dynamically import so it never touches the server bundle
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
      });

      lenisRef.current = lenis;

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    });
  }, []);

  return lenisRef;
}
