"use client";

import {
  Navbar,
  Hero,
  About,
  Experience,
  Tech,
  Works,
  Contact,
} from "@/components";

export default function Home() {
  return (
    <main className="relative z-0 bg-primary">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Tech />
      <Works />
      <Contact />
    </main>
  );
}
