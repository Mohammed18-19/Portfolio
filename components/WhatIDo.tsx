"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    id: "01",
    title: "AI Agent Systems",
    headline: "Autonomous agents that reason, act, and deliver.",
    body:
      "I architect multi-step AI agents with tool use, memory, and goal decomposition. From WhatsApp booking bots to API orchestrators — these systems run independently on real workloads.",
    tags: ["LLM Orchestration", "Tool Use", "Memory", "Goal Decomposition"],
    accent: "#00dcff",
  },
  {
    id: "02",
    title: "Backend Engineering",
    headline: "APIs and systems that power intelligent products.",
    body:
      "Production-grade REST APIs and server-side systems built with Python, Flask, and Django. Multi-tenant architecture, PostgreSQL, authentication, background tasks, and clean system design.",
    tags: ["Python", "Flask", "Django", "PostgreSQL", "REST APIs"],
    accent: "#0066ff",
  },
  {
    id: "03",
    title: "Automation Pipelines",
    headline: "Workflows that replace repetitive human labour.",
    body:
      "End-to-end automation using n8n, webhooks, and custom Python scripts. API chains, scheduled jobs, notification systems, and data pipelines — designed to run without supervision.",
    tags: ["n8n", "Webhooks", "Scheduling", "API Chains"],
    accent: "#7c3aed",
  },
  {
    id: "04",
    title: "System Design",
    headline: "Scalable architecture for growing products.",
    body:
      "Deep interest in distributed systems, queue-based architectures, database design, and API gateway patterns. I think in systems — designing for reliability, extensibility, and scale.",
    tags: ["Distributed Systems", "Queues", "Caching", "Scalability"],
    accent: "#10b981",
  },
];

export default function WhatIDo() {
  const [openId, setOpenId] = useState<string | null>("01");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(0,102,255,0.04) 0%, transparent 65%)" }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — heading & about blurb */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] tracking-[0.4em] text-cyan-DEFAULT uppercase mb-4 heading-line">
              What I Do
            </p>
            <h2
              className="font-sans font-bold leading-tight text-ink-100 mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              Engineering
              <br />
              <span className="text-ink-400">intelligent</span> systems
            </h2>
            <p className="text-ink-400 leading-relaxed mb-10" style={{ maxWidth: 420 }}>
              My work sits at the intersection of backend engineering and AI — building
              the infrastructure that makes language models useful in production. Not just
              wrappers; real agentic systems with reasoning loops, persistent memory, and
              tool execution.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-px bg-[rgba(0,220,255,0.07)]">
              {[
                { n: "3+", l: "Live AI agents" },
                { n: "5+", l: "Automation systems" },
                { n: "2+", l: "SaaS products" },
              ].map(({ n, l }) => (
                <div key={l} className="bg-bg-primary px-5 py-6">
                  <span className="font-mono text-3xl font-bold text-cyan-DEFAULT block leading-none">
                    {n}
                  </span>
                  <span className="font-mono text-[10px] tracking-wide text-ink-600 mt-2 block">
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — expandable service cards (moncy.dev accordion style) */}
          <div className="flex flex-col gap-3">
            {SERVICES.map((s, i) => {
              const isOpen = openId === s.id;
              return (
                <motion.div
                  key={s.id}
                  className="corner-mark border border-[rgba(255,255,255,0.06)] cursor-pointer overflow-hidden"
                  style={{
                    borderLeftColor: isOpen ? s.accent : "transparent",
                    borderLeftWidth: isOpen ? 2 : 1,
                    background: isOpen ? `${s.accent}08` : "transparent",
                    transition: "background 0.3s, border-color 0.3s",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  onClick={() => setOpenId(isOpen ? null : s.id)}
                  role="button"
                  aria-expanded={isOpen}
                  data-hover
                >
                  <div className="flex items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-ink-600">
                        {s.id}
                      </span>
                      <h3 className="font-sans font-semibold text-sm md:text-base text-ink-100">
                        {s.title}
                      </h3>
                    </div>
                    <span
                      className="font-mono text-xs text-ink-600 transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </div>

                  <motion.div
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-sm text-ink-400 leading-relaxed mb-5">{s.body}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span key={t} className="tag-pill">{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
