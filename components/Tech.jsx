import React from "react";
import "./Tech.css";
import { motion } from "framer-motion";
import { FaLaptopCode } from "react-icons/fa";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const levelClassNames = {
  Expert: "tech-card--expert",
  Advanced: "tech-card--advanced",
  Intermediate: "tech-card--intermediate",
};

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="tech-heading">
        <p className={styles.sectionSubText}>My technical expertise</p>

        <h2 className={styles.sectionHeadText}>
          Technologies & Tools.{" "}
          <FaLaptopCode className="tech-heading-icon" />
        </h2>
      </motion.div>

      <div className="tech-intro">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="tech-description"
        >
          The tools and technologies I use to build AI systems, backend
          services, retrieval pipelines, and reliable software.
        </motion.p>

        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="tech-legend"
        >
          <div className="tech-legend-item">
            <span className="tech-legend-dot tech-legend-dot--advanced" />
            Advanced
          </div>

          <div className="tech-legend-item">
            <span className="tech-legend-dot tech-legend-dot--intermediate" />
            Intermediate
          </div>
        </motion.div>
      </div>

      <div className="tech-grid">
        {technologies.map((technology, index) => {
          const Icon = technology.icon;

          return (
            <motion.div
              className={`tech-card ${levelClassNames[technology.level] || ""}`}
              key={technology.name}
              variants={fadeIn("up", "spring", 0.08 * index, 0.75)}
            >
              <div className="tech-icon-wrap">
                <Icon className="tech-icon text-[#915eff] text-4xl" />
              </div>

              <h3 className="tech-name">{technology.name}</h3>

              <span className="tech-level">{technology.level}</span>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
