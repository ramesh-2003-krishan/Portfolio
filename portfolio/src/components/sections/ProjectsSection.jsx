import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import ProjectCard from '../cards/ProjectCard';
import { PROJECTS } from '../../data/projects';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './Projects.css';

export default function ProjectsSection({
  enableScrollDepth = true,
  enableTilt = true,
  enableOrbs = true,
  enableIndicator = true,
}) {
  const containerRef = useRef(null);
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.05 });
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll-linked progress across the sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active project index (0..3) as user scrolls through the stack
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const rawIndex = Math.floor(latest * PROJECTS.length);
    const clampedIndex = Math.max(0, Math.min(PROJECTS.length - 1, rawIndex));
    setActiveIndex(clampedIndex);
  });

  // Parallax shifts for the 3 ambient orbs
  const orb1Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Click dot to smoothly navigate to specific project in the sticky stack
  const handleDotClick = (index) => {
    setActiveIndex(index);
    const targetElement = document.getElementById(
      `project-${PROJECTS[index].id}`
    );
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="projects">
      {/* 6. Ambient Background: Soft blurred gradient orbs drifting behind stack with subtle parallax */}
      {enableOrbs && (
        <div className="projects-ambient-bg" aria-hidden="true">
          <motion.div
            className="projects-orb projects-orb-1"
            style={prefersReducedMotion ? {} : { y: orb1Y }}
          />
          <motion.div
            className="projects-orb projects-orb-2"
            style={prefersReducedMotion ? {} : { y: orb2Y }}
          />
          <motion.div
            className="projects-orb projects-orb-3"
            style={prefersReducedMotion ? {} : { y: orb3Y }}
          />
        </div>
      )}

      {/* 2. Side Scroll Progress Indicator (Desktop only, hidden < 768px, visible when section is in view) */}
      {enableIndicator && isDesktop && !prefersReducedMotion && (
        <motion.nav
          className="projects-scroll-indicator"
          aria-label="Projects navigation"
          initial={{ opacity: 0, x: 20 }}
          animate={
            isSectionInView
              ? { opacity: 1, x: 0, pointerEvents: 'auto' }
              : { opacity: 0, x: 20, pointerEvents: 'none' }
          }
          transition={{ duration: 0.3 }}
        >
          {PROJECTS.map((proj, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={proj.id}
                type="button"
                className={`projects-indicator-dot ${isActive ? 'active' : ''}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Scroll to project ${idx + 1}: ${proj.title}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="indicator-pip" />
                <span className="indicator-tooltip" aria-hidden="true">
                  {proj.title}
                </span>
              </button>
            );
          })}
        </motion.nav>
      )}

      <div className="project">
        {/* 1. Section Entrance: Heading fades and slides up, gradient underline draws */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="project-title">Projects</h2>
          <motion.p
            className="line"
            initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>

        {/* Sticky stacking container (min-height: 3200px) */}
        <div ref={containerRef} className="project-cards">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={PROJECTS.length}
              scrollYProgress={scrollYProgress}
              enableScrollDepth={enableScrollDepth}
              enableTilt={enableTilt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
