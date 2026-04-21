"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-28 md:py-40 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04060a 0%, #070c14 100%)" }}
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(0,220,255,0.05) 0%, transparent 60%)" }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,220,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="font-mono text-[10px] tracking-[0.4em] text-cyan-DEFAULT uppercase mb-5 inline-flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            <span className="w-5 h-px bg-cyan-DEFAULT" />
            Get in Touch
            <span className="w-5 h-px bg-cyan-DEFAULT" />
          </motion.p>

          <motion.h2
            className="font-sans font-bold text-ink-100 leading-tight mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 70px)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Let's build something
            <br />
            <span className="text-cyan-DEFAULT cyan-text-glow">agentic</span> together
          </motion.h2>

          <motion.p
            className="text-ink-400 leading-relaxed mb-12 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            Open to AI engineering roles, Ausbildung programs in Germany, freelance
            automation projects, and founding-team opportunities at ambitious startups.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
          >
            <a
              href="mailto:contact@aintomar.dev"
              className="group relative overflow-hidden font-mono text-[10px] tracking-[0.35em] uppercase px-10 py-5 border border-cyan-DEFAULT text-cyan-DEFAULT hover:text-bg-primary transition-colors duration-300 w-full sm:w-auto text-center"
              data-hover
            >
              <span className="relative z-10">contact@aintomar.dev</span>
              <span className="absolute inset-0 bg-cyan-DEFAULT -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </a>

            <a
              href="https://github.com/Mohammed18-19"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.35em] uppercase px-10 py-5 border border-ink-600 text-ink-400 hover:border-cyan-border hover:text-ink-200 transition-all duration-300 w-full sm:w-auto text-center"
              data-hover
            >
              GitHub Profile
            </a>
          </motion.div>

          {/* Info row */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[rgba(0,220,255,0.06)]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: "Location", value: "Kénitra, Morocco" },
              { label: "Target Market", value: "Morocco · Germany · Remote" },
              { label: "Response Time", value: "< 24 hours" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-bg-primary py-6 px-5">
                <span className="font-mono text-[9px] tracking-[0.3em] text-ink-600 uppercase block mb-1">
                  {label}
                </span>
                <span className="font-mono text-xs text-ink-200">{value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
