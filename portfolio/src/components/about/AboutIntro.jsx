import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/personalInfo';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import MagneticWrapper from '../common/MagneticWrapper';
import TechLogoRow from './TechLogoRow';

export default function AboutIntro({ inView = true }) {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    window.open(PERSONAL_INFO.cvPath, '_blank');
  };

  const itemVariants = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : {
        initial: { opacity: 0, y: 22 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: 'easeOut' },
        },
      };

  return (
    <div className="about-intro-col">
      {/* Eyebrow Label */}
      <motion.div
        variants={itemVariants}
        initial="initial"
        animate={inView ? 'animate' : 'initial'}
        className="about-eyebrow-wrapper"
      >
        <span className="about-eyebrow">WHO AM I?</span>
      </motion.div>

      {/* Main Name Heading */}
      <motion.h2
        id="about-heading"
        variants={itemVariants}
        initial="initial"
        animate={inView ? 'animate' : 'initial'}
        transition={{ delay: 0.08 }}
        className="about-name"
      >
        {PERSONAL_INFO.name}
      </motion.h2>

      {/* Role with Gradient Text & One-time Shimmer Sweep */}
      <motion.div
        variants={itemVariants}
        initial="initial"
        animate={inView ? 'animate' : 'initial'}
        transition={{ delay: 0.16 }}
        className="about-role-wrapper"
      >
        <p className={`about-role ${inView ? 'shimmer-active' : ''}`}>
          <span>AI &amp; ML Enthusiast</span>
          <span className="about-role-sep" aria-hidden="true">•</span>
          <span>Passionate Full-Stack Developer</span>
        </p>
      </motion.div>

      {/* Bio Paragraph */}
      <motion.p
        variants={itemVariants}
        initial="initial"
        animate={inView ? 'animate' : 'initial'}
        transition={{ delay: 0.24 }}
        className="about-bio"
      >
        {PERSONAL_INFO.aboutDesc}
      </motion.p>

      {/* CTA Buttons Row */}
      <motion.div
        variants={itemVariants}
        initial="initial"
        animate={inView ? 'animate' : 'initial'}
        transition={{ delay: 0.32 }}
        className="about-actions-row"
      >
        {/* Primary CV Download Button */}
        <MagneticWrapper strength={0.2} radius={50} className="about-btn-magnetic">
          <button
            type="button"
            className="about-btn about-btn-primary"
            onClick={handleDownloadCV}
            aria-label="Download CV as PDF (opens in new tab)"
          >
            <span className="about-btn-text">Download CV</span>
            <span className="about-btn-icon-wrapper" aria-hidden="true">
              <svg
                className="about-btn-icon about-btn-download-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
            <span className="about-btn-shine" aria-hidden="true" />
          </button>
        </MagneticWrapper>

        {/* Secondary Glass "View My Work" Button */}
        <MagneticWrapper strength={0.2} radius={50} className="about-btn-magnetic">
          <a
            href="#projects"
            className="about-btn about-btn-glass"
            onClick={handleScrollToProjects}
            aria-label="View My Work (scrolls to projects section)"
          >
            <span className="about-btn-text">View My Work</span>
            <span className="about-btn-icon-wrapper" aria-hidden="true">
              <svg
                className="about-btn-icon about-btn-arrow-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
            <span className="about-btn-shine" aria-hidden="true" />
          </a>
        </MagneticWrapper>
      </motion.div>

      {/* Tech Logo Row (Replacing "Trusted By") */}
      <TechLogoRow inView={inView} />
    </div>
  );
}
