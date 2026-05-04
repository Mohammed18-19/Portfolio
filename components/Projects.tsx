"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const PRODUCTS = [
  {
    num: "01",
    product: "AINTORA OS",
    type: "WHATSAPP AI PLATFORM",
    title: "AI Booking Engine for SMEs",
    desc:
      "Autonomous WhatsApp agent that handles appointments, confirmations, cancel/reschedule flows, and client management for salons and clinics — zero human intervention on the booking loop.",
    detail:
      "Production-grade Turborepo monorepo: NestJS backend with webhook signature validation, message deduplication, and Zod env validation. Next.js 15 App Router frontend. Prisma + PostgreSQL multi-tenant data layer. JWT per-tenant auth. Multilingual: Arabic, Darija, French, English.",
    tags: ["NestJS", "Next.js 15", "Turborepo", "Prisma", "Groq Llama-3.3", "WhatsApp Cloud API"],
    accent: "#00dcff",
    status: "BUILDING",
    statusColor: "#f59e0b",
  },
  {
    num: "02",
    product: "AINTORA Career Intelligence",
    type: "AI CAREER TOOL",
    title: "Ausbildung Opportunity Hunter",
    desc:
      "Intelligent job-hunting app that scans German platforms for IT Ausbildung listings, filters by relevance, and surfaces the best opportunities — built to solve a real problem I face personally.",
    detail:
      "React + Vite frontend deployed on Vercel. Aggregates live listings across German job platforms, ranks by fit for Fachinformatiker tracks (FIAE, SI, DPA), and provides direct application links. Solves the real friction of finding Ausbildung as a non-EU applicant.",
    tags: ["React", "Vite", "Vercel", "German Job Market", "IT Ausbildung"],
    accent: "#f472b6",
    status: "LIVE",
    statusColor: "#34d399",
  },
];

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
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
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
    >
      <motion.div
        className="h-full p-7 border flex flex-col gap-4 cursor-pointer"
        style={{
          borderColor: hovered ? `${product.accent}40` : "rgba(255,255,255,0.05)",
          background: hovered ? `${product.accent}08` : "rgba(255,255,255,0.015)",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "border-color 0.3s, background 0.3s, transform 0.2s ease",
        }}
        data-hover
        onClick={() => setExpanded(!expanded)}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${product.accent}66, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Product name badge + status */}
        <div className="flex items-start justify-between">
          <span
            className="font-mono text-[9px] tracking-[0.35em] uppercase px-2 py-1 border"
            style={{
              color: product.accent,
              borderColor: `${product.accent}30`,
              background: `${product.accent}0d`,
            }}
          >
            {product.product}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: product.statusColor, boxShadow: `0 0 6px ${product.statusColor}` }}
            />
            <span className="font-mono text-[9px] tracking-widest text-ink-600">
              {product.status}
            </span>
          </div>
        </div>

        {/* Type label */}
        <span
          className="font-mono text-[9px] tracking-[0.3em] uppercase"
          style={{ color: `${product.accent}88` }}
        >
          {product.type}
        </span>

        {/* Number watermark */}
        <span
          className="absolute top-5 right-6 font-mono text-5xl font-bold pointer-events-none select-none"
          style={{ color: "rgba(255,255,255,0.025)" }}
        >
          {product.num}
        </span>

        {/* Title */}
        <h3
          className="font-sans font-semibold text-ink-100 leading-snug"
          style={{ fontSize: "clamp(15px,1.4vw,17px)" }}
        >
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-ink-400 text-sm leading-relaxed flex-1">{product.desc}</p>

        {/* Expanded detail */}
        <motion.div
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <p className="text-ink-600 text-xs leading-relaxed pb-2 border-t border-[rgba(255,255,255,0.04)] pt-3">
            {product.detail}
          </p>
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {product.tags.map((t) => (
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      className="py-28 md:py-36 relative"
      style={{ background: "linear-gradient(180deg, #04060a 0%, #070c14 50%, #04060a 100%)" }}
    >
      <div className="max-w-screen-xl mx-auto px-8 md:px-12">

        {/* Section heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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

        {/* ── AINTORA SYSTEMS parent brand banner ── */}
        <motion.div
          ref={ref}
          className="mb-8 p-5 border border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-5"
          style={{ background: "rgba(255,255,255,0.012)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Brand identity */}
          <div className="flex items-center gap-4">
            <div
              className="w-9 h-9 flex-shrink-0 flex items-center justify-center border"
              style={{
                background: "linear-gradient(135deg, #0a0f1e 0%, #111827 100%)",
                borderColor: "rgba(236,72,153,0.35)",
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            >
              <span className="font-mono font-bold text-[11px]" style={{ color: "#ec4899" }}>A</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-sans font-bold text-ink-100 tracking-wide text-sm">AINTORA</span>
                <span className="font-sans font-bold tracking-widest text-sm" style={{ color: "#ec4899" }}>SYSTEMS</span>
              </div>
              <p className="font-mono text-[9px] tracking-[0.25em] text-ink-600 uppercase mt-0.5">
                Your smartest employee never clocks out
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="text-center">
              <span className="font-mono text-xl font-bold text-cyan-DEFAULT block leading-none">2</span>
              <span className="font-mono text-[9px] tracking-wide text-ink-600 mt-1 block">Products</span>
            </div>
            <div className="w-px h-8 bg-[rgba(255,255,255,0.06)]" />
            <div className="text-center">
              <span className="font-mono text-xl font-bold text-emerald-400 block leading-none">1</span>
              <span className="font-mono text-[9px] tracking-wide text-ink-600 mt-1 block">Live</span>
            </div>
            <div className="w-px h-8 bg-[rgba(255,255,255,0.06)]" />
            <div className="text-center">
              <span className="font-mono text-xl font-bold block leading-none" style={{ color: "#f59e0b" }}>1</span>
              <span className="font-mono text-[9px] tracking-wide text-ink-600 mt-1 block">Building</span>
            </div>
            <div className="w-px h-8 bg-[rgba(255,255,255,0.06)]" />
            <div className="text-center">
              <span className="font-mono text-xl font-bold text-ink-400 block leading-none">∞</span>
              <span className="font-mono text-[9px] tracking-wide text-ink-600 mt-1 block">Pipeline</span>
            </div>
          </div>
        </motion.div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.num} product={p} index={i} />
          ))}
        </div>

        {/* Growth note */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-ink-600 uppercase">
            <span className="block w-4 h-px bg-[rgba(255,255,255,0.08)]" />
            More products in pipeline — AINTORA SYSTEMS is growing
            <span className="block w-4 h-px bg-[rgba(255,255,255,0.08)]" />
          </div>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-6 flex justify-center"
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