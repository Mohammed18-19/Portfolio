"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Systems", href: "#systems" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(4,6,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,220,255,0.06)" : "none",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Home">
            <span className="w-2 h-2 rounded-full bg-cyan-DEFAULT animate-pulse-slow" />
            <span className="font-mono text-xs tracking-[0.3em] text-ink-200 uppercase group-hover:text-cyan-DEFAULT transition-colors duration-200">
              M.AINTOMAR
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="font-mono text-[10px] tracking-[0.25em] text-ink-400 uppercase hover:text-cyan-DEFAULT transition-colors duration-200 hover-underline"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@aintomar.dev"
              className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-cyan-DEFAULT uppercase border border-cyan-border px-5 py-2.5 hover:bg-cyan-dim transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT animate-pulse-slow" />
              Available
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-px bg-cyan-DEFAULT transition-transform duration-300"
                style={{ transform: menuOpen ? "rotate(45deg) translate(2px, 3px)" : "none" }}
              />
              <span
                className="block w-4 h-px bg-ink-400 transition-opacity duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-6 h-px bg-cyan-DEFAULT transition-transform duration-300"
                style={{ transform: menuOpen ? "rotate(-45deg) translate(2px, -3px)" : "none" }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-bg-primary flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="font-mono text-sm tracking-[0.3em] text-ink-200 uppercase hover:text-cyan-DEFAULT transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              href="mailto:contact@aintomar.dev"
              className="mt-4 font-mono text-xs tracking-widest text-cyan-DEFAULT border border-cyan-border px-8 py-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              contact@aintomar.dev
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
