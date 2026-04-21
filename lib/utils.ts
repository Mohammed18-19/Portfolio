import { type ClassValue, clsx } from "clsx";

/** Merge Tailwind class strings safely */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Shared easing curve (Apple-like) */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** Framer Motion stagger container */
export const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Framer Motion fade-up child variant */
export const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/** Framer Motion fade-in child variant */
export const fadeInItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

/** Format a date as "Apr 2026" */
export function formatMonth(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
