import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammed Aintomar — AI Engineer & Backend Developer",
  description:
    "AI systems engineer building autonomous agents, intelligent backend APIs, and production automation pipelines with Python, Flask, Django, and modern LLM infrastructure.",
  keywords: [
    "AI Engineer", "Backend Developer", "Python", "Flask", "Django",
    "AI Agents", "Automation", "System Design", "PostgreSQL",
    "Mohammed Aintomar", "AINTORA SYSTEMS",
  ],
  authors: [{ name: "Mohammed Aintomar" }],
  creator: "Mohammed Aintomar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mohammed Aintomar — AI Engineer",
    description: "Building autonomous AI agents and intelligent backend systems.",
    siteName: "Mohammed Aintomar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Aintomar — AI Engineer",
    description: "Building autonomous AI agents and intelligent backend systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
