"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STACK_GROUPS = [
  {
    category: "AI / LLM",
    accent: "#00dcff",
    items: [
      { name: "Groq API", note: "Llama-3.3-70B inference" },
      { name: "Gemini API", note: "Multimodal + generation" },
      { name: "Anthropic", note: "Claude API integration" },
      { name: "RAG Pipelines", note: "Retrieval-augmented gen" },
      { name: "pgvector", note: "Vector similarity search" },
      { name: "Function Calling", note: "Agent tool use" },
    ],
  },
  {
    category: "Backend",
    accent: "#0066ff",
    items: [
      { name: "Python", note: "Primary language" },
      { name: "Flask", note: "Lightweight APIs & bots" },
      { name: "Django", note: "Full-stack web apps" },
      { name: "PostgreSQL", note: "Primary database" },
      { name: "REST APIs", note: "Design & integration" },
      { name: "JWT / Auth", note: "Stateless auth flows" },
    ],
  },
  {
    category: "Automation",
    accent: "#7c3aed",
    items: [
      { name: "n8n", note: "Visual workflow automation" },
      { name: "Webhooks", note: "Event-driven triggers" },
      { name: "WhatsApp Cloud API", note: "Conversational agents" },
      { name: "Telegram Bot API", note: "Bot orchestration" },
      { name: "Cron Jobs", note: "Scheduled pipelines" },
      { name: "Google Sheets API", note: "Data sync & reporting" },
    ],
  },
  {
    category: "Infrastructure",
    accent: "#10b981",
    items: [
      { name: "Git / GitHub", note: "Version control & OSS" },
      { name: "Railway", note: "Production deployment" },
      { name: "Docker", note: "Containerisation (learning)" },
      { name: "Linux / Bash", note: "Server ops & scripting" },
      { name: "Nginx", note: "Reverse proxy" },
      { name: "AWS", note: "SAA cert in progress" },
    ],
  },
];

const LEARNING = ["Docker & Kubernetes", "System Design (advanced)", "AWS SAA", "Anthropic CCA-F", "German B1 → B2"];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stack"
      ref={ref}
      className="py-28 md:py-36 relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,220,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-12">
        <motion.p
          className="font-mono text-[10px] tracking-[0.4em] text-cyan-DEFAULT uppercase mb-3 heading-line"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Tech Stack
        </motion.p>
        <motion.h2
          className="font-sans font-bold text-ink-100 leading-tight mb-16"
          style={{ fontSize: "clamp(28px, 3.5vw, 50px)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Tools that power
          <br />
          <span className="text-ink-400">production AI systems</span>
        </motion.h2>

        {/* Stack grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {STACK_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + gi * 0.1 }}
            >
              <div
                className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4 pb-3"
                style={{
                  color: group.accent,
                  borderBottom: `1px solid ${group.accent}22`,
                }}
              >
                {group.category}
              </div>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-0.5 group">
                    <span className="text-sm text-ink-200 font-medium group-hover:text-cyan-DEFAULT transition-colors duration-200 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: group.accent + "66" }} />
                      {item.name}
                    </span>
                    <span className="text-[11px] text-ink-600 pl-3">{item.note}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Currently learning strip */}
        <motion.div
          className="border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.04)] px-7 py-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <span className="font-mono text-[9px] tracking-[0.35em] text-violet-400 uppercase flex-shrink-0">
            Currently Deep-diving
          </span>
          <div className="flex flex-wrap gap-3">
            {LEARNING.map((item) => (
              <span
                key={item}
                className="font-mono text-[10px] tracking-wide px-3 py-1 border border-[rgba(124,58,237,0.2)] text-violet-400"
                style={{ background: "rgba(124,58,237,0.06)" }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
