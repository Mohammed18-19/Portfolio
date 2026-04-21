"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NotFound() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(t);
          window.location.href = "/";
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <motion.p
          className="font-mono text-[10px] tracking-[0.4em] text-cyan-DEFAULT uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          404 — Page not found
        </motion.p>
        <motion.h1
          className="font-sans font-bold text-ink-100 mb-4"
          style={{ fontSize: "clamp(60px, 12vw, 120px)", lineHeight: 1 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-ink-400 text-sm mb-8 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Route not found in the agent graph.
          <br />
          Redirecting in{" "}
          <span className="text-cyan-DEFAULT">{count}s</span>...
        </motion.p>
        <motion.a
          href="/"
          className="inline-block font-mono text-[10px] tracking-[0.3em] uppercase px-8 py-4 border border-cyan-DEFAULT text-cyan-DEFAULT hover:bg-cyan-dim transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Back to Home
        </motion.a>
      </div>
    </div>
  );
}
