"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "Booting AI agent runtime...",
  "Loading neural inference layer...",
  "Connecting orchestration fabric...",
  "Mounting agentic architecture...",
  "Calibrating LLM interfaces...",
  "System nominal. Welcome.",
];

const MARQUEE_TEXT = [
  "AI ENGINEER",
  "•",
  "BACKEND DEVELOPER",
  "•",
  "PYTHON",
  "•",
  "AI AGENTS",
  "•",
  "AUTOMATION",
  "•",
  "SYSTEM DESIGN",
  "•",
  "FLASK",
  "•",
  "DJANGO",
  "•",
  "POSTGRESQL",
  "•",
  "GIT",
  "•",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [bootLine, setBootLine] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const total = 3600;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / total) * 100));
      setProgress(pct);
      const lineIdx = Math.min(
        BOOT_LINES.length - 1,
        Math.floor((elapsed / total) * BOOT_LINES.length)
      );
      setBootLine(lineIdx);
      if (elapsed >= total) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 700);
        }, 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  const marqueeString = Array(4).fill(MARQUEE_TEXT.join("  ")).join("  ");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] bg-[#04060a] flex flex-col overflow-hidden scanlines"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,220,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none bg-radial-glow opacity-60" />

          {/* Logo top-left */}
          <div className="absolute top-6 left-8 md:left-12">
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-DEFAULT uppercase opacity-60">
              AINTORA SYSTEMS
            </span>
          </div>

          {/* Date top-right */}
          <div className="absolute top-6 right-8 md:right-12">
            <span className="font-mono text-xs tracking-widest text-ink-600 uppercase">
              {new Date().getFullYear()}
            </span>
          </div>

          {/* Centre content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
            {/* Progress pill — like moncy.dev */}
            <motion.div
              className="flex items-center gap-4 px-6 py-3 rounded-full border border-cyan-border bg-bg-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="font-mono text-xs tracking-[0.2em] text-ink-400 uppercase">
                LOADING
              </span>
              <div className="w-32 h-[2px] bg-ink-600 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-cyan-DEFAULT"
                  style={{ boxShadow: "0 0 8px #00dcff" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.08 }}
                />
              </div>
              <span className="font-mono text-xs tracking-widest text-cyan-DEFAULT min-w-[3ch]">
                {String(progress).padStart(3, "0")}%
              </span>
            </motion.div>

            {/* Boot log */}
            <div className="text-center h-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={bootLine}
                  className="font-mono text-xs md:text-sm text-ink-600 tracking-widest"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {"> "}{BOOT_LINES[bootLine]}
                  <span className="animate-blink ml-1 text-cyan-DEFAULT">█</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom marquee — identical approach to moncy.dev */}
          <div className="relative w-full overflow-hidden py-5 border-t border-[rgba(0,220,255,0.06)]">
            <div className="flex gap-10 w-max animate-marquee-left">
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="font-mono text-xs tracking-[0.3em] text-ink-600 uppercase whitespace-nowrap"
                >
                  {MARQUEE_TEXT.join("  ·  ")}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
