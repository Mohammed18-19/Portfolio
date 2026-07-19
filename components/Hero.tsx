"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const NeuralOrb = dynamic(() => import("./NeuralOrb"), { ssr: false });

const ROLES = ["Backend-Entwickler", "Software-Entwickler", "Ausbildungsplatz gesucht — 2026", "Baue AINTORA SYSTEMS auf"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,220,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* 3D orb — right portion */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{ width: "58%", background: "radial-gradient(ellipse at 55% 50%, rgba(0,220,255,0.07) 0%, transparent 65%)" }}
        />
      </div>

      {/* Canvas container */}
      <div
        className="absolute right-[-5%] top-0 bottom-0 pointer-events-none"
        style={{ width: "60%" }}
      >
        <NeuralOrb />
      </div>

      {/* Left-to-center gradient overlay so text stays legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(105deg, #04060a 38%, rgba(4,6,10,0.7) 58%, transparent 72%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-8 md:px-20 w-full pt-24 pb-20">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="block w-7 h-px bg-cyan-DEFAULT" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-DEFAULT uppercase">
              Kenitra, Marokko · Baue AINTORA SYSTEMS auf
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-sans font-bold leading-[0.95] tracking-tight mb-4"
            style={{ fontSize: "clamp(48px, 7vw, 92px)", color: "#f8fafc" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Mohammed
            <br />
            <span className="text-cyan-DEFAULT cyan-text-glow">Aintomar</span>
          </motion.h1>

          {/* Animated role cycle */}
          <motion.div
            className="flex items-center gap-3 mb-6 h-7 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className="font-mono tracking-widest text-ink-400"
                style={{ fontSize: "clamp(13px,1.6vw,18px)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-ink-400 leading-relaxed mb-10 max-w-md"
            style={{ fontSize: "clamp(14px,1.3vw,16px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Ich bin Autodidakt aus Marokko und entwickle{" "}
            <span className="text-ink-200">echte, funktionierende Produkte</span> — ein
            SaaS-Tool im Live-Betrieb, WhatsApp-Buchungsassistenten, Backend-APIs. Jetzt
            suche ich eine Ausbildung zum Fachinformatiker Anwendungsentwicklung in
            Deutschland, um aus dem, was ich mir selbst beigebracht habe,{" "}
            <span className="text-ink-200">eine solide fachliche Grundlage</span> zu machen.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <a
              href="/lebenslauf-mohammed-aintomar.pdf"
              className="group relative overflow-hidden font-mono text-[10px] tracking-[0.3em] uppercase px-7 py-4 border border-cyan-DEFAULT text-cyan-DEFAULT transition-all duration-300 hover:text-bg-primary text-center"
              data-hover
            >
              <span className="relative z-10">Lebenslauf herunterladen</span>
              <span className="absolute inset-0 bg-cyan-DEFAULT translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </a>

            <a
              href="/anschreiben-mohammed-aintomar.pdf"
              className="font-mono text-[10px] tracking-[0.3em] uppercase px-7 py-4 border border-ink-600 text-ink-400 hover:border-cyan-border hover:text-ink-200 transition-all duration-300 text-center"
              data-hover
            >
              Anschreiben
            </a>

            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="font-mono text-[10px] tracking-[0.3em] uppercase px-7 py-4 border border-ink-600 text-ink-400 hover:border-cyan-border hover:text-ink-200 transition-all duration-300"
            >
              Projekte ansehen
            </button>
          </motion.div>

          {/* Status badge */}
          <motion.div
            className="flex items-center gap-3 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow shadow-[0_0_6px_#34d399]" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-ink-600 uppercase">
              Bewerbung für Ausbildung Anwendungsentwicklung — Start 2026 · Deutsch B1 (TELC)
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
        aria-hidden
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-ink-600 uppercase">Scrollen</span>
        <span className="block w-px h-10 bg-gradient-to-b from-ink-600 to-transparent" />
      </motion.div>
    </section>
  );
}