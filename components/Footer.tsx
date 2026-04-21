"use client";

const MARQUEE_ITEMS = [
  "AI ENGINEER", "·", "PYTHON", "·", "FLASK", "·", "DJANGO", "·",
  "AI AGENTS", "·", "AUTOMATION", "·", "SYSTEM DESIGN", "·",
  "POSTGRESQL", "·", "AINTORA SYSTEMS", "·",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(0,220,255,0.05)]">
      {/* Scrolling marquee — moncy.dev-inspired bottom strip */}
      <div className="relative overflow-hidden py-4 border-b border-[rgba(0,220,255,0.04)]">
        <div className="flex gap-10 w-max animate-marquee-right" aria-hidden>
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-mono text-[9px] tracking-[0.35em] text-ink-600 uppercase whitespace-nowrap">
              {MARQUEE_ITEMS.join("   ")}
            </span>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-12 h-16 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-[9px] tracking-[0.25em] text-ink-600 uppercase">
          © {year} Mohammed Aintomar — AINTORA SYSTEMS
        </span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" style={{ boxShadow: "0 0 5px #34d399" }} />
          <span className="font-mono text-[9px] tracking-[0.25em] text-ink-600 uppercase">Systems Operational</span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.25em] text-ink-600 uppercase">
          Morocco → Germany → World
        </span>
      </div>
    </footer>
  );
}
