"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot follows instantly
  const dotX = useSpring(rawX, { stiffness: 2000, damping: 80 });
  const dotY = useSpring(rawY, { stiffness: 2000, damping: 80 });

  // Ring lags slightly for a trailing feel
  const ringX = useSpring(rawX, { stiffness: 180, damping: 28 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 28 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Track hoverable elements
    const updateHover = () => {
      const links = document.querySelectorAll<HTMLElement>(
        "a, button, [data-hover], input, textarea, select, label"
      );
      const enter = () => setHovering(true);
      const leave = () => setHovering(false);
      links.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    updateHover();

    // Re-run whenever DOM changes (for dynamically rendered elements)
    const observer = new MutationObserver(updateHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
    };
  }, [rawX, rawY, visible]);

  return (
    <div className="hidden md:block pointer-events-none" aria-hidden>
      {/* Dot */}
      <motion.div
        className="fixed z-[9997] rounded-full bg-cyan-DEFAULT"
        style={{
          width: clicking ? 5 : 6,
          height: clicking ? 5 : 6,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          boxShadow: "0 0 8px rgba(0,220,255,0.8)",
          transition: "width 0.15s, height 0.15s, opacity 0.3s",
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed z-[9996] rounded-full border"
        style={{
          width: hovering ? 44 : clicking ? 20 : 32,
          height: hovering ? 44 : clicking ? 20 : 32,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: hovering
            ? "rgba(0,220,255,0.55)"
            : "rgba(0,220,255,0.32)",
          opacity: visible ? 1 : 0,
          transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, opacity 0.3s",
          backgroundColor: hovering ? "rgba(0,220,255,0.04)" : "transparent",
        }}
      />
    </div>
  );
}
