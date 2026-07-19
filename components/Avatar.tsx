"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Avatar() {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-end gap-3">
      <AnimatePresence>
        {showBubble && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-bg-secondary border border-cyan-border px-4 py-3 max-w-[220px] rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          >
            <button
              onClick={() => setDismissed(true)}
              aria-label="Schließen"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-bg-primary border border-ink-600 text-ink-600 text-[10px] flex items-center justify-center hover:text-cyan-DEFAULT hover:border-cyan-border transition-colors"
            >
              ×
            </button>
            <p className="text-xs text-ink-200 leading-relaxed">
              Hallo! Schön, dass Sie mein Portfolio besuchen.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.8 }}
        className="w-11 h-11 rounded-full border border-cyan-border bg-bg-secondary flex items-center justify-center flex-shrink-0"
        style={{ boxShadow: "0 0 16px rgba(0,220,255,0.15)" }}
      >
        <span className="font-mono text-[11px] tracking-wide text-cyan-DEFAULT font-semibold">
          MA
        </span>
      </motion.div>
    </div>
  );
}
