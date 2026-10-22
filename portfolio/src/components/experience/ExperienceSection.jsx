import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import TimelineDot from './TimelineDot';
import { EXPERIENCES } from '../../data/experience';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Experience.css';

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  // Scroll-linked progress for timeline line fill
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 70%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const orbY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="experience-section"
      aria-labelledby="experience-heading"
    >
      {/* Background: Soft Blurred Ambient Orbs matching About section */}
      <div className="experience-ambient-bg" aria-hidden="true">
        <motion.div
          className="experience-orb experience-orb-1"
          style={prefersReducedMotion ? {} : { y: orbY }}
        />
        <motion.div
          className="experience-orb experience-orb-2"
          style={prefersReducedMotion ? {} : { y: orbY }}
        />
      </div>

      <div className="experience-container" ref={containerRef}>
        {/* Section Heading with Animated Gradient Underline */}
        <motion.div
          className="experience-heading-wrap"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="experience-eyebrow-wrapper">
            <span className="experience-eyebrow">CAREER PATH</span>
          </div>
          <h2 id="experience-heading" className="experience-title">
            Experience
          </h2>
          <motion.div
            className="experience-heading-line"
            initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
            animate={
              inView
                ? { scaleX: 1, opacity: 1 }
                : prefersReducedMotion
                ? { scaleX: 1, opacity: 1 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>

        {/* Timeline List */}
        <ol className="experience-timeline">
          {/* Base Track Line */}
          <div className="timeline-track-base" aria-hidden="true">
            {/* Scroll-Linked Gradient Fill Line */}
            <motion.div
              className="timeline-track-fill"
              style={
                prefersReducedMotion
                  ? { height: '100%' }
                  : { height: lineHeight }
              }
            />
          </div>

          {EXPERIENCES.map((job, index) => (
            <li key={job.id} className="timeline-item">
              {/* Timeline Glowing Dot */}
              <TimelineDot inView={inView} delay={0.25 + index * 0.15} />

              {/* Experience Glass Card */}
              <ExperienceCard
                job={job}
                inView={inView}
                delay={0.3 + index * 0.15}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
