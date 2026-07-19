"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import SocialRail from "@/components/SocialRail";
import Hero from "@/components/Hero";
import WhatIDo from "@/components/WhatIDo";
import WhyGermany from "@/components/WhyGermany";
import AgentArchitecture from "@/components/AgentArchitecture";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Avatar from "@/components/Avatar";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  useLenis();

  // No artificial boot sequence — content fades in as soon as it's ready.
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Cursor />

      <main
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <Navbar />
        <SocialRail />
        <Hero />
        <WhatIDo />
        <WhyGermany />
        <AgentArchitecture />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
        <Avatar />
      </main>
    </>
  );
}
