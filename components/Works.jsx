import React from "react";
import './Works.css';
import { FaCode, FaExternalLinkAlt, FaLaptopCode } from 'react-icons/fa';
import Tilt from "react-parallax-tilt";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

const ProjectCard = ({
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <div className='project-card-shell'>
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        scale={1}
        transitionSpeed={450}
        className='project-card'
        role="link"
        tabIndex={0}
        onClick={(event) => {
          if (event.target.closest("a")) return;
          window.open(source_code_link, "_blank", "noopener,noreferrer");
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            window.open(source_code_link, "_blank", "noopener,noreferrer");
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <div className='project-image-wrap'>
          <img
            src={image}
            alt={`${name} project preview`}
            className='project-image'
          />

          <div className='project-action-row'>
            <a
              href={source_code_link}
              target='_blank'
              rel='noreferrer'
              aria-label={`Open ${name} project`}
              className='project-link group'
            >
              <FaCode className='project-link-icon' aria-hidden='true' />
              <FaExternalLinkAlt className='project-link-arrow' aria-hidden='true' />
              <span className='project-tooltip'>{name === "CodeAtlas" ? "View on GitHub" : "View PR"}</span>
            </a>
          </div>
        </div>

        <div className='project-content'>
          <h3 className='project-title'>
            <FaLaptopCode className='project-title-icon' />
            {name}
          </h3>
          <p className='project-description'>{description}</p>
        </div>

        <div className='project-tags'>
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`project-tag ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </Tilt>
    </div>
  );
};

const Works = () => {
  return (
    <>
      <div className='projects-heading'>
        <p className={`${styles.sectionSubText} font-["Playfair_Display"] italic tracking-wider`}>My work</p>
        <h2 className={`${styles.sectionHeadText} font-["Oswald"] font-bold uppercase tracking-wide`}>Projects. <FaCode className="inline-block text-[#915eff]" /></h2>
      </div>

      <div className='projects-intro'>
        <p>
          These projects showcase my engineering work across AI systems,
          backend development, and open-source software. Each project highlights
          a real technical problem, the technologies involved, and the engineering
          decisions behind the implementation.
        </p>
      </div>

      <div className='projects-grid'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
