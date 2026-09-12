import { motion } from "framer-motion";
import './Hero.css';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { ComputersCanvas } from "./canvas";
import { fadeIn, textVariant } from "../utils/motion";
import WebGLGuard from "./WebGLGuard";

const Hero = () => {
  return (
    <section className='hero-section'>
      <div className='hero-copy-wrap'>
        <div className='hero-accent' aria-hidden='true'>
          <div className='hero-accent-dot' />
          <div className='hero-accent-line' />
        </div>

        <div className='hero-copy'>
          <h1 className='hero-title'>
            Hi, I'm{" "}
            <motion.span
              variants={textVariant(0.5)}
              initial='hidden'
              whileInView='show'
              viewport={{ once: false, amount: 0.25 }}
              className='hero-name'
            >
              Mohammed Aintomar
            </motion.span>
          </h1>

          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: false, amount: 0.25 }}
            className='hero-subtitle'
          >
            I build practical AI systems, backend <br className='hero-line-break' />
            services and RAG applications
          </motion.p>

          <motion.div
            variants={fadeIn("", "", 0.5, 1)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: false, amount: 0.25 }}
            className='hero-socials'
          >
            <a href="https://github.com/Mohammed18-19" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/mohammed-aintomar-a94a37262/" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://x.com/MohamedAin99598" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="X">
              <FaTwitter />
            </a>
          </motion.div>
        </div>
      </div>

      <WebGLGuard>


        <ComputersCanvas />


      </WebGLGuard>

      <div className='hero-scroll-indicator'>
        <a href='#about'>
          <div className='hero-scroll-shell'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='hero-scroll-dot'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
