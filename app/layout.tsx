import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammed Aintomar — Backend-Entwickler | Ausbildung Anwendungsentwicklung",
  description:
    "Autodidaktischer Backend-Entwickler aus Marokko. Baut echte Software-Produkte mit Python, Flask und PostgreSQL und bewirbt sich für eine Ausbildung zum Fachinformatiker Anwendungsentwicklung in Deutschland.",
  keywords: [
    "Backend Developer", "Software Developer", "Python", "Flask", "Django",
    "Fachinformatiker", "Ausbildung", "Anwendungsentwicklung", "Germany", "PostgreSQL",
    "Mohammed Aintomar", "AINTORA SYSTEMS",
  ],
  authors: [{ name: "Mohammed Aintomar" }],
  creator: "Mohammed Aintomar",
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Mohammed Aintomar — Backend-Entwickler",
    description: "Autodidaktischer Backend-Entwickler aus Marokko, auf dem Weg zur Ausbildung Anwendungsentwicklung in Deutschland.",
    siteName: "Mohammed Aintomar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Aintomar — Backend-Entwickler",
    description: "Autodidaktischer Backend-Entwickler aus Marokko, auf dem Weg zur Ausbildung Anwendungsentwicklung in Deutschland.",
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
    <html lang="de" className="scroll-smooth">
      <body className="antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
