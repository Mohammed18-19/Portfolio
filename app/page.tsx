"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import LoadingScreen from "@/components/LoadingScreen";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import SocialRail from "@/components/SocialRail";
import Hero from "@/components/Hero";
import WhatIDo from "@/components/WhatIDo";
import AgentArchitecture from "@/components/AgentArchitecture";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  useLenis();

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <Cursor />

      <main
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        <Navbar />
        <SocialRail />
        <Hero />
        <WhatIDo />
        <AgentArchitecture />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
