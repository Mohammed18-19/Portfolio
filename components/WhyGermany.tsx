"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const POINTS = [
  {
    q: "Warum eine Ausbildung, wenn ich schon Software baue?",
    a: "Alles, was ich kann, habe ich mir selbst beigebracht — aus Dokumentationen, Tutorials und durch Ausprobieren an echten Projekten. Das hat gereicht, um ein Live-SaaS-Produkt zu veröffentlichen, aber es zeigt mir auch, wo die Lücken sind: strukturierte Grundlagen, Code-Reviews von erfahrenen Entwicklern und die Erfahrung, in einem echten Team zu arbeiten statt allein. Genau das möchte ich in der Ausbildung lernen.",
  },
  {
    q: "Warum genau Deutschland?",
    a: "Das duale System ist genau das, was mir fehlt — bezahlte, praktische Ausbildung in einem echten Unternehmen, nicht nur Theorie. Deutschland hat außerdem eine der stärksten Software-Branchen Europas, und die Ausbildung ist ein klarer, strukturierter Weg dorthin, auch für jemanden, der außerhalb der EU startet.",
  },
  {
    q: "Ist das ernst gemeint, oder nur ein schneller Umweg?",
    a: "Ich lerne seit meiner Entscheidung für diesen Weg Deutsch und bin aktuell bei B1, mit dem Ziel B2. Es geht mir nicht um den schnellsten Weg, sondern um das Programm, das mich wirklich zu einem besseren Entwickler macht — und dafür rechne ich mit den vollen 2–3 Jahren, die dafür vorgesehen sind.",
  },
  {
    q: "Kann ich auch im Team arbeiten, nicht nur allein?",
    a: "Meine Softwareprojekte waren bisher meist Solo-Arbeit, aber ich habe auch reale Team-Erfahrung: ein dreimonatiges IT-Praktikum bei Maroc Telecom, im First- und Second-Level-Support, mit technischer Dokumentation nach Qualitätsstandards und Mitarbeit an nationalen IT-Rollout-Projekten in multikulturellen Teams. Ich freue mich darauf, diese Erfahrung mit echter Software-Teamarbeit zu verbinden: Pair Programming, Code-Reviews und gemeinsames Planen.",
  },
];

export default function WhyGermany() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="why-germany"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(0,102,255,0.04) 0%, transparent 65%)" }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-12">
        <div className="max-w-xl mb-14">
          <motion.p
            className="font-mono text-[10px] tracking-[0.4em] text-cyan-DEFAULT uppercase mb-4 heading-line"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Warum Deutschland
          </motion.p>
          <motion.h2
            className="font-sans font-bold leading-tight text-ink-100 mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 50px)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Ehrliche Antworten auf die
            <br />
            <span className="text-ink-400">Fragen, die Sie sich schon stellen</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.q}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-sans font-semibold text-ink-100 text-sm md:text-base mb-3">
                {p.q}
              </h3>
              <p className="text-ink-400 text-sm leading-relaxed">{p.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
