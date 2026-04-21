import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#04060a",
          secondary: "#070c14",
          tertiary: "#0a1220",
          glass: "rgba(0,220,255,0.03)",
        },
        cyan: {
          DEFAULT: "#00dcff",
          dim: "rgba(0,220,255,0.12)",
          border: "rgba(0,220,255,0.18)",
          glow: "rgba(0,220,255,0.35)",
        },
        electric: "#0066ff",
        violet: "#7c3aed",
        ink: {
          100: "#f1f5f9",
          200: "#cbd5e1",
          400: "#64748b",
          600: "#334155",
          800: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        display: ["var(--font-clash)", "var(--font-dm-sans)", "sans-serif"],
      },
      animation: {
        "marquee-left": "marqueeLeft 20s linear infinite",
        "marquee-right": "marqueeRight 22s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "blink": "blink 1.1s step-end infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
        "scan": "scan 3s linear infinite",
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,220,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,0.04) 1px, transparent 1px)",
        "radial-glow": "radial-gradient(ellipse at center, rgba(0,220,255,0.12) 0%, transparent 70%)",
        "hero-gradient": "linear-gradient(110deg, #04060a 42%, transparent 68%)",
        "card-shine": "linear-gradient(135deg, rgba(0,220,255,0.06) 0%, transparent 50%, rgba(0,220,255,0.02) 100%)",
      },
      backgroundSize: {
        "grid": "48px 48px",
      },
    },
  },
  plugins: [],
};
export default config;
