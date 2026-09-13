import React from "react";
import "./Experience.css";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCogs,
  FaMicrochip,
} from "react-icons/fa";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  const isCurrent = experience.date.toLowerCase().includes("present");

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: isCurrent
          ? "rgba(145, 94, 255, 0.15)"
          : "rgba(29, 24, 54, 0.88)",
        color: "#fff",
        boxShadow: isCurrent
          ? "0 0 30px rgba(145, 94, 255, 0.35)"
          : "0 4px 20px rgba(0,0,0,0.25)",
        borderRadius: "18px",
        backdropFilter: "blur(10px)",
        border: isCurrent
          ? "2px solid rgba(145, 94, 255, 0.4)"
          : "1px solid rgba(145,94,255,0.2)",
        padding: "0",
        overflow: "hidden",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(29, 24, 54, 0.88)",
      }}
      date={
        <span className="flex items-center gap-2 font-medium text-secondary opacity-80 font-['Space_Mono'] text-[14px] tracking-wider">
          <FaCalendarAlt /> {experience.date}
          {isCurrent && (
            <span className="ml-2 px-2 py-0.5 bg-[#915eff] text-white text-[10px] font-bold rounded-full uppercase animate-pulse">
              Current
            </span>
          )}
        </span>
      }
      iconStyle={{
        background: experience.logo ? "#ffffff" : experience.iconBg,
        boxShadow: "0 0 25px rgba(145,94,255,0.45)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          {experience.logo ? (
            <img
              src={experience.logo}
              alt={`${experience.company_name} logo`}
              className="w-[78%] h-[78%] object-contain p-1"
              style={{
                filter:
                  "grayscale(1) brightness(0) saturate(100%) invert(18%) sepia(98%) saturate(5500%) hue-rotate(350deg) brightness(95%) contrast(105%)",
              }}
            />
          ) : (
            <FaMicrochip
              className="text-[#5b21b6] text-[30px]"
              style={{
                filter:
                  "drop-shadow(0 0 7px rgba(145,94,255,0.55))",
              }}
            />
          )}
        </div>
      }
    >
      <div className="p-0">
        <div className="grid md:grid-cols-[1fr_360px] gap-0 min-h-[300px]">
          <div className="px-6 py-6 md:px-7 md:py-7 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#915eff]/20 border border-[#915eff]/40 text-[#bca7ff] text-[11px] font-bold uppercase tracking-wider">
                {experience.company_name === "Maroc Telecom"
                  ? "IT SUPPORT"
                  : "OPEN SOURCE"}
              </span>
            </div>

            <h3 className="text-white text-[24px] sm:text-[28px] font-bold">
              {experience.title}
            </h3>

            <p className="text-[#915eff] text-[18px] font-semibold mt-1">
              {experience.company_name}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {experience.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full border border-[#915eff]/50 text-secondary text-[12px] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <ul className="mt-5 space-y-3">
              {experience.points.map((point, index) => (
                <li
                  key={`experience-point-${index}`}
                  className="flex items-start gap-3 text-secondary text-[14px] leading-6"
                >
                  <FaCogs className="text-[#915eff] mt-1 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {experience.image && (
            <div className="relative min-h-[260px] md:min-h-full overflow-hidden">
              <img
                src={experience.image}
                alt={`${experience.company_name} work environment`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1d1836] via-transparent to-transparent md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1836]/70 via-transparent to-transparent" />
            </div>
          )}
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <div className="relative">
      <motion.div variants={textVariant()} id="experience-heading">
        <p className={`${styles.sectionSubText} text-center font-["Space_Mono"] text-secondary uppercase tracking-widest text-[14px]`}>
          What I have done so far
        </p>

        <h2 className={`${styles.sectionHeadText} text-center flex justify-center items-center gap-3 font-["Oswald"] font-bold uppercase tracking-wider`}>
          <FaBriefcase className="text-[#915eff]" />
          Work Experience.
        </h2>
      </motion.div>

      <div
        className="mt-20 flex flex-col"
        aria-labelledby="experience-heading"
      >
        <VerticalTimeline className="before:bg-gradient-to-b before:from-[#915eff] before:to-transparent">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
