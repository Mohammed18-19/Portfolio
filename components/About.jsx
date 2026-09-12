import React from "react";
import "./About.css";
import { FaUserGraduate } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { potrait } from "../assets";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, description, image, icon: Icon, skills }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.2, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-tertiary rounded-[20px] overflow-hidden min-h-[390px] flex flex-col">
        <div className="relative h-[145px] overflow-hidden">
          <img
            src={image}
            alt={`${title} visual`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151030] via-transparent to-transparent" />

          <div className="absolute bottom-3 left-4 w-11 h-11 rounded-xl bg-[#050816]/80 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <Icon className="text-[#915eff] text-xl" />
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col flex-1">
          <h3 className="text-white text-[20px] font-bold font-['Oswald'] tracking-wide">
            {title}
          </h3>

          <p className="text-secondary text-[13px] leading-6 mt-3 font-['Inter']">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto pt-5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-[#915eff] text-[10px] font-bold uppercase tracking-wider border border-[#915eff33] bg-[#915eff12] rounded-full px-2.5 py-1 font-['Space_Mono']"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p
          className={`${styles.sectionSubText} font-["Playfair_Display"] italic tracking-wider text-secondary text-[18px] leading-8 max-w-5xl`}
        >
          I am a software developer focused on AI/LLM and RAG engineering,
          with a strong foundation in Python backend development, PostgreSQL,
          REST APIs, and modern software systems. I build practical AI
          applications such as RepoMind, an AI codebase intelligence system
          using code-aware chunking, embeddings, hybrid retrieval, reranking,
          and citation-grounded generation.
        </p>

        <h2
          className={`${styles.sectionHeadText} font-["Oswald"] font-bold uppercase tracking-wider mt-3`}
        >
          Overview. <FaUserGraduate className="inline-block" />
        </h2>
      </motion.div>

      <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="m-[6px] p-[8px] text-secondary text-[17px] max-w-3xl leading-[30px] font-['Inter']"
        >
          My work combines{" "}
          <strong className="font-['Orbitron'] text-[#915eff]">
            AI engineering
          </strong>
          , backend development, and systems programming. I work primarily
          with{" "}
          <strong className="font-['Orbitron'] text-[#915eff]">
            Python
          </strong>
          , PostgreSQL, REST APIs, RAG pipelines, and vector search, while
          also contributing to open-source embedded software with{" "}
          <strong className="font-['Orbitron'] text-[#915eff]">C</strong>.
          <br />
          <br />
          I care about understanding systems deeply, writing maintainable code,
          testing what I build, and solving real engineering problems rather
          than simply assembling technologies.
          <br />
          <span className="text-white font-['Sacramento'] text-[32px] block mt-4 opacity-80 rotate-[-2deg]">
            Mohammed Aintomar.
          </span>
        </motion.p>

        <motion.div
          variants={fadeIn("left", "", 0.2, 1)}
          className="w-full md:w-auto flex justify-center"
        >
          <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px]">
            <img
              src={potrait}
              alt="Mohammed Aintomar"
              className="w-full h-full object-cover rounded-full border-4 border-white/10 shadow-card"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#915eff] to-transparent opacity-30" />
          </div>
        </motion.div>
      </div>

      <div className="mt-20 flex flex-wrap gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            {...service}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
