"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Node / Edge definitions ─────────────────────────────────── */
const NODES = [
  { id: "user",   x: 60,   y: 190, w: 88,  h: 30, label: "USER INPUT",        color: "#64748b", glow: false },
  { id: "llm",    x: 230,  y: 190, w: 108, h: 30, label: "LLM ORCHESTRATOR",  color: "#00dcff", glow: true  },
  { id: "mem",    x: 430,  y: 60,  w: 88,  h: 28, label: "MEMORY STORE",      color: "#a78bfa", glow: false },
  { id: "tools",  x: 430,  y: 120, w: 88,  h: 28, label: "TOOL REGISTRY",     color: "#34d399", glow: false },
  { id: "api",    x: 430,  y: 180, w: 88,  h: 28, label: "API GATEWAY",       color: "#f59e0b", glow: false },
  { id: "queue",  x: 430,  y: 240, w: 88,  h: 28, label: "TASK QUEUE",        color: "#f43f5e", glow: false },
  { id: "ext",    x: 430,  y: 300, w: 88,  h: 28, label: "EXTERNAL APIS",     color: "#0ea5e9", glow: false },
  { id: "out",    x: 610,  y: 190, w: 88,  h: 30, label: "RESPONSE",          color: "#64748b", glow: false },
];

const EDGES = [
  { from: "user",  to: "llm",   delay: 0 },
  { from: "llm",   to: "mem",   delay: 0.3 },
  { from: "llm",   to: "tools", delay: 0.5 },
  { from: "llm",   to: "api",   delay: 0.7 },
  { from: "llm",   to: "queue", delay: 0.9 },
  { from: "llm",   to: "ext",   delay: 1.1 },
  { from: "api",   to: "out",   delay: 1.3 },
  { from: "tools", to: "out",   delay: 1.5 },
  { from: "mem",   to: "llm",   delay: 1.8 }, // feedback loop
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function edgePath(from: string, to: string) {
  const a = getNode(from);
  const b = getNode(to);
  const ax = a.x + a.w;
  const ay = a.y + a.h / 2;
  const bx = b.x;
  const by = b.y + b.h / 2;

  // For the memory feedback arc, curve above
  if (from === "mem" && to === "llm") {
    const mx = (ax + bx) / 2;
    return `M ${ax} ${ay} C ${mx} ${ay - 60}, ${mx} ${by - 60}, ${bx} ${by}`;
  }

  const cpx = ax + (bx - ax) * 0.5;
  return `M ${ax} ${ay} C ${cpx} ${ay}, ${cpx} ${by}, ${bx} ${by}`;
}

/* ─── Animated edge with flowing dash ─────────────────────────── */
function FlowEdge({ from, to, delay, active }: { from: string; to: string; delay: number; active: boolean }) {
  const d = edgePath(from, to);
  const toNode = getNode(to);
  return (
    <g>
      {/* Static dim track */}
      <path d={d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
      {/* Animated flow */}
      {active && (
        <motion.path
          d={d}
          fill="none"
          stroke={getNode(from).color}
          strokeWidth={1}
          strokeDasharray="6 120"
          strokeDashoffset={0}
          opacity={0.6}
          initial={{ strokeDashoffset: 120, opacity: 0 }}
          animate={{ strokeDashoffset: -120, opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 1.8, delay, repeat: Infinity, repeatDelay: 1.5, ease: "linear" }}
        />
      )}
      {/* Arrowhead */}
      <motion.circle
        cx={toNode.x}
        cy={toNode.y + toNode.h / 2}
        r={2.5}
        fill={getNode(from).color}
        opacity={0}
        animate={active ? { opacity: [0, 0.8, 0] } : {}}
        transition={{ duration: 0.4, delay: delay + 1.5, repeat: Infinity, repeatDelay: 1.9 }}
      />
    </g>
  );
}

/* ─── Terminal log lines ───────────────────────────────────────── */
const LOG_LINES = [
  { t: 0,    color: "#64748b", text: "$ agent.run(user_input='Book appointment for Friday 3pm')" },
  { t: 700,  color: "#00dcff", text: "> LLM: Analyzing intent... [booking_intent=True, confidence=0.97]" },
  { t: 1400, color: "#34d399", text: "> Tool: calendar.check_availability(date='2026-04-25', time='15:00')" },
  { t: 2100, color: "#f59e0b", text: "> API: POST /whatsapp/send → {status: 'queued', id: 'wamid.xxx'}" },
  { t: 2800, color: "#a78bfa", text: "> Memory: store_context(session_id='usr_442', turns=3)" },
  { t: 3500, color: "#34d399", text: "> Tool: calendar.create_event(confirmed=True) → event_id: 'ev_7741'" },
  { t: 4200, color: "#00dcff", text: "> LLM: Generating confirmation message in Darija..." },
  { t: 4900, color: "#64748b", text: "✓ Agent completed in 2.1s — 4 tools used, 1 API call, 0 errors" },
];

function Terminal({ active }: { active: boolean }) {
  const [lines, setLines] = useState<typeof LOG_LINES>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!active || running) return;
    setLines([]);
    setRunning(true);
    LOG_LINES.forEach(({ t, ...line }) => {
      setTimeout(() => setLines((prev) => [...prev, { t, ...line }]), t);
    });
    setTimeout(() => {
      setRunning(false);
      // restart loop
      setTimeout(() => setLines([]), 3000);
    }, 5500);
  }, [active, running, lines.length === 0]);

  // Re-trigger after lines cleared
  useEffect(() => {
    if (!active || running || lines.length !== 0) return;
    const tid = setTimeout(() => setRunning(false), 100);
    return () => clearTimeout(tid);
  }, [lines, active, running]);

  return (
    <div
      className="rounded-none border border-[rgba(0,220,255,0.1)] bg-[#020408] font-mono text-xs overflow-hidden"
      style={{ minHeight: 210 }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(0,220,255,0.07)] bg-[#070c14]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] opacity-80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] opacity-80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] opacity-80" />
        <span className="ml-3 text-[10px] tracking-[0.25em] text-ink-600 uppercase">agent_runtime.log</span>
        {running && (
          <span className="ml-auto flex items-center gap-1.5 text-[9px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
            RUNNING
          </span>
        )}
      </div>
      {/* Log output */}
      <div className="p-4 space-y-1.5" style={{ minHeight: 170 }}>
        <AnimatePresence>
          {lines.map((l, i) => (
            <motion.p
              key={i}
              className="leading-relaxed"
              style={{ color: l.color, fontSize: 11 }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              {l.text}
              {i === lines.length - 1 && running && (
                <span className="animate-blink ml-1 text-cyan-DEFAULT">▋</span>
              )}
            </motion.p>
          ))}
        </AnimatePresence>
        {lines.length === 0 && (
          <p className="text-ink-600 text-[11px]">
            Waiting for input<span className="animate-blink ml-0.5">▋</span>
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Live metrics ticker ──────────────────────────────────────── */
const METRICS = [
  { label: "Avg Response", value: "1.8s", sub: "WhatsApp round-trip" },
  { label: "Tool Calls / Run", value: "3.4", sub: "Avg per agent session" },
  { label: "Uptime", value: "99.7%", sub: "BookBot — 30 days" },
  { label: "Messages Handled", value: "1.2k+", sub: "Production volume" },
];

/* ─── Main section ─────────────────────────────────────────────── */
export default function AgentArchitecture() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [diagramActive, setDiagramActive] = useState(false);

  useEffect(() => {
    if (inView) setTimeout(() => setDiagramActive(true), 600);
  }, [inView]);

  return (
    <section
      id="systems"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04060a 0%, #060d18 50%, #04060a 100%)" }}
    >
      {/* Bg grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,220,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(0,102,255,0.05) 0%, transparent 60%)" }}
      />

      <div className="max-w-screen-xl mx-auto px-8 md:px-12">
        {/* Heading */}
        <div className="mb-16 max-w-xl">
          <motion.p
            className="font-mono text-[10px] tracking-[0.4em] text-cyan-DEFAULT uppercase mb-3 heading-line"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Agent Architecture
          </motion.p>
          <motion.h2
            className="font-sans font-bold text-ink-100 leading-tight mb-4"
            style={{ fontSize: "clamp(28px,3.5vw,50px)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            How my agents
            <br />
            <span className="text-ink-400">think and act</span>
          </motion.h2>
          <motion.p
            className="text-ink-400 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Every system I build follows a reasoning loop: observe → plan → act → store.
            The diagram below reflects the live architecture powering BookBot and AINTORA OS.
          </motion.p>
        </div>

        {/* Two-column: diagram left, terminal right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

          {/* ── SVG Architecture diagram ── */}
          <motion.div
            className="border border-[rgba(0,220,255,0.08)] bg-[rgba(0,220,255,0.01)] p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Corner marks */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-border" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-border" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-border" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-border" />

            <p className="font-mono text-[9px] tracking-[0.35em] text-ink-600 uppercase mb-4">
              // Agentic flow — realtime
            </p>

            <svg
              viewBox="0 0 780 380"
              className="w-full"
              style={{ overflow: "visible" }}
              aria-label="Agent architecture flow diagram"
            >
              <defs>
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Edges */}
              {EDGES.map((e) => (
                <FlowEdge key={`${e.from}-${e.to}`} {...e} active={diagramActive} />
              ))}

              {/* Nodes */}
              {NODES.map((n, i) => (
                <motion.g
                  key={n.id}
                  filter={n.glow ? "url(#nodeGlow)" : undefined}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    rx={2}
                    fill={`${n.color}18`}
                    stroke={n.color}
                    strokeWidth={n.glow ? 1.5 : 0.8}
                  />
                  <text
                    x={n.x + n.w / 2}
                    y={n.y + n.h / 2 + 4}
                    textAnchor="middle"
                    fill={n.color}
                    fontSize={8}
                    fontFamily="monospace"
                    letterSpacing="0.05em"
                    fontWeight={n.glow ? "700" : "400"}
                  >
                    {n.label}
                  </text>

                  {/* Pulse ring on orchestrator */}
                  {n.glow && diagramActive && (
                    <motion.rect
                      x={n.x - 4}
                      y={n.y - 4}
                      width={n.w + 8}
                      height={n.h + 8}
                      rx={4}
                      fill="none"
                      stroke={n.color}
                      strokeWidth={0.5}
                      animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.04, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px` }}
                    />
                  )}
                </motion.g>
              ))}

              {/* Legend */}
              <g transform="translate(40, 340)">
                {[
                  { color: "#00dcff", label: "Core orchestrator" },
                  { color: "#34d399", label: "Tool layer" },
                  { color: "#a78bfa", label: "Memory" },
                ].map(({ color, label }, i) => (
                  <g key={label} transform={`translate(${i * 160}, 0)`}>
                    <rect width={6} height={6} rx={1} fill={color + "44"} stroke={color} strokeWidth={0.8} />
                    <text x={10} y={5.5} fill="#475569" fontSize={8} fontFamily="monospace">{label}</text>
                  </g>
                ))}
              </g>
            </svg>
          </motion.div>

          {/* ── Terminal log ── */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Terminal active={diagramActive} />

            {/* Pattern callout */}
            <div className="border border-[rgba(124,58,237,0.18)] bg-[rgba(124,58,237,0.04)] p-5">
              <p className="font-mono text-[9px] tracking-[0.35em] text-violet-400 uppercase mb-3">
                // Core loop pattern
              </p>
              <pre
                className="text-xs leading-loose overflow-x-auto"
                style={{ fontFamily: "monospace", color: "#475569" }}
              >
{`while goal_not_reached:
    observation  = perceive(context)
    plan         = llm.reason(observation)
    action       = tool_dispatcher(plan)
    result       = execute(action)
    context      = memory.update(result)
    if plan.done: break`}
              </pre>
            </div>
          </motion.div>
        </div>

        {/* ── Metrics row ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(0,220,255,0.07)]"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {METRICS.map(({ label, value, sub }) => (
            <div key={label} className="bg-bg-primary px-6 py-7">
              <span className="font-mono text-3xl md:text-4xl font-bold text-cyan-DEFAULT block leading-none mb-1"
                style={{ textShadow: "0 0 20px rgba(0,220,255,0.3)" }}>
                {value}
              </span>
              <span className="font-mono text-[10px] tracking-wide text-ink-200 block mb-1">{label}</span>
              <span className="font-mono text-[9px] text-ink-600">{sub}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Agent types list ── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: "⬡",
              title: "Conversational Booking Agents",
              body: "WhatsApp & Telegram agents that complete multi-turn booking flows, send confirmations, handle rescheduling, and sync to Google Sheets — autonomously.",
              color: "#00dcff",
            },
            {
              icon: "⬡",
              title: "API Orchestration Systems",
              body: "Backend agents that fan out to 3–6 external APIs in parallel, merge results, apply LLM reasoning, and return a single coherent response.",
              color: "#a78bfa",
            },
            {
              icon: "⬡",
              title: "Document Intelligence Pipelines",
              body: "Agents that ingest PDFs, forms, and job descriptions; extract structured data; run classification; and generate tailored outputs in target formats.",
              color: "#34d399",
            },
          ].map(({ icon, title, body, color }, i) => (
            <motion.div
              key={title}
              className="p-6 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,220,255,0.18)] transition-all duration-300 group"
              style={{ background: "rgba(255,255,255,0.01)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -4 }}
              data-hover
            >
              <span
                className="block text-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ color, filter: `drop-shadow(0 0 8px ${color}55)` }}
              >
                {icon}
              </span>
              <h4 className="font-sans font-semibold text-ink-100 text-sm mb-2">{title}</h4>
              <p className="text-ink-600 text-xs leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
