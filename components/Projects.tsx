"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    num: "01",
    type: "AI SAAS",
    title: "BookBot — WhatsApp AI Booking Engine",
    desc:
      "Production-deployed AI booking assistant for Moroccan salons. Handles appointments, confirmations, and client management entirely via WhatsApp — zero human intervention.",
    detail:
      "Built on Flask + PostgreSQL, powered by Groq Llama-3.3-70B, deployed on Railway. Includes multi-tenant routing, business-hours logic, multilingual support, and Google Sheets sync.",
    tags: ["Flask", "PostgreSQL", "Groq Llama-3.3", "WhatsApp Cloud API", "Railway"],
    accent: "#00dcff",
    status: "LIVE",
    statusColor: "#34d399",
  },
  {
    num: "02",
    type: "PLATFORM",
    title: "AINTORA OS — Modular AI Platform",
    desc:
      "Expansion of BookBot into a full AI operating system for SMEs — InvoiceBot, LeadBot, StockBot, and ReportBot as independent agentic modules on one multi-tenant backend.",
    detail: "System design emphasis: shared auth layer, per-tenant AI configuration, pluggable modules, and a unified API gateway.",
    tags: ["System Design", "Multi-tenant", "AI Agents", "Python"],
    accent: "#a78bfa",
    status: "BUILDING",
    statusColor: "#f59e0b",
  },
  {
    num: "03",
    type: "AI TOOL",
    title: "BewerbungsAI — German Application Generator",
    desc:
      "AI-powered engine that ingests German job postings and outputs culturally-calibrated Anschreiben and Lebenslauf using Gemini, in minutes.",
    detail: "Flask backend with Gemini API. Handles formatting rules specific to German HR expectations, generates DOCX output.",
    tags: ["Flask", "Gemini API", "Python", "NLP", "DOCX"],
    accent: "#34d399",
    status: "SHIPPED",
    statusColor: "#34d399",
  },
  {
    num: "04",
    type: "AUTOMATION",
    title: "Riad Nashira — Hospitality Automation",
    desc:
      "Full n8n automation infrastructure for a Moroccan riad: guest comms, booking sync, review collection, and operations dashboards — fully headless.",
    detail: "n8n workflows with webhook triggers, HTTP nodes, Google Sheets integration, WhatsApp messaging, and scheduled tasks.",
    tags: ["n8n", "Webhooks", "WhatsApp", "Google Sheets"],
    accent: "#f59e0b",
    status: "LIVE",
    statusColor: "#34d399",
  },
  {
    num: "05",
    type: "BACKEND",
    title: "Whisper — Microblogging Platform",
    desc:
      "Full-stack microblogging system with Flask, PostgreSQL, and Flask-Login. Dark-themed UI, complete auth flows, real-time-like feed, and a clean social graph.",
    detail: "Session-based auth, Flask-WTF forms, pagination, follow/unfollow graph, responsive dark UI.",
    tags: ["Flask", "PostgreSQL", "Flask-Login", "Python"],
    accent: "#f43f5e",
    status: "SHIPPED",
    statusColor: "#34d399",
  },
  {
    num: "06",
    type: "KNOWLEDGE",
    title: "Distributed Systems Notes",
    desc:
      "Deep-dive personal repository on system design: CAP theorem, consistent hashing, message queues, database sharding, load balancers, and API gateway patterns with diagrams.",
    detail: "GitHub repository used as a living reference while preparing for backend engineering roles at global companies.",
    tags: ["System Design", "Architecture", "Distributed Systems"],
    accent: "#0ea5e9",
    status: "ONGOING",
    statusColor: "#a78bfa",
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      className="relative h-full"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
    >
      <motion.div
        className="h-full p-7 border flex flex-col gap-4 cursor-pointer"
        style={{
          borderColor: hovered ? `${project.accent}30` : "rgba(255,255,255,0.05)",
          background: hovered ? `${project.accent}07` : "rgba(255,255,255,0.015)",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "border-color 0.3s, background 0.3s, transform 0.2s ease",
        }}
        data-hover
        onClick={() => setExpanded(!expanded)}
      >
        {/* Top line accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}55, transparent)`, opacity: hovered ? 1 : 0 }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase"
              style={{ color: project.accent }}
            >
              {project.type}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: project.statusColor, boxShadow: `0 0 6px ${project.statusColor}` }}
            />
            <span className="font-mono text-[9px] tracking-widest text-ink-600">
              {project.status}
            </span>
          </div>
        </div>

        {/* Number watermark */}
        <span
          className="absolute top-5 right-6 font-mono text-5xl font-bold pointer-events-none select-none"
          style={{ color: "rgba(255,255,255,0.025)" }}
        >
          {project.num}
        </span>

        {/* Title */}
        <h3 className="font-sans font-semibold text-ink-100 leading-snug" style={{ fontSize: "clamp(15px,1.4vw,17px)" }}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-ink-400 text-sm leading-relaxed flex-1">{project.desc}</p>

        {/* Expanded detail */}
        <motion.div
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <p className="text-ink-600 text-xs leading-relaxed pb-2 border-t border-[rgba(255,255,255,0.04)] pt-3">
            {project.detail}
          </p>
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.tags.map((t) => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>

        {/* Expand hint */}
        <span className="font-mono text-[9px] tracking-widest text-ink-600 uppercase">
          {expanded ? "— less" : "+ details"}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-28 md:py-36 relative"
      style={{ background: "linear-gradient(180deg, #04060a 0%, #070c14 50%, #04060a 100%)" }}
    >
      <div className="max-w-screen-xl mx-auto px-8 md:px-12">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              className="font-mono text-[10px] tracking-[0.4em] text-cyan-DEFAULT uppercase mb-3 heading-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Deployed Systems
            </motion.p>
            <motion.h2
              className="font-sans font-bold text-ink-100 leading-tight"
              style={{ fontSize: "clamp(30px, 4vw, 54px)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Production-grade
              <br />
              <span className="text-ink-400">projects & live systems</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-ink-600 text-sm max-w-xs font-mono tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Every project is deployed. Every system handles real users, real data, real workloads.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.num} project={p} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://github.com/Mohammed18-19"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-ink-400 hover:text-cyan-DEFAULT transition-colors duration-200"
            data-hover
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="opacity-50 group-hover:opacity-100 transition-opacity">
              <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
            </svg>
            View all repositories on GitHub
            <span className="block w-5 h-px bg-ink-600 group-hover:w-10 group-hover:bg-cyan-DEFAULT transition-all duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
