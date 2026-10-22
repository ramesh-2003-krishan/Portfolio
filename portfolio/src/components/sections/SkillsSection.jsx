import React from 'react';
import { motion } from 'framer-motion';
import SkillCard from '../cards/SkillCard';
import { SKILL_CATEGORIES } from '../../data/skills';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Skills.css';

export default function SkillsSection({ openMenu, toggleMenu }) {
  const [sectionRef, inView] = useInView({ threshold: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="skills" className="skills">
      {/* Background: Soft Blurred Ambient Orbs Drifting Slowly */}
      <div className="skills-ambient-bg" aria-hidden="true">
        <motion.div
          className="skills-orb skills-orb-1"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, 35, 0],
                  y: [0, -25, 0],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="skills-orb skills-orb-2"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, -45, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="skill">
        {/* Section Heading & Animated Gradient Underline */}
        <div className="skill-tit">
          <h2 className="skill-head">Skills</h2>
          <motion.p
            className="linee"
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            animate={
              inView
                ? { scaleX: 1 }
                : prefersReducedMotion
                ? { scaleX: 1 }
                : { scaleX: 0 }
            }
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* 4 Category Cards in Staggered Zig-Zag */}
        <div className="cards">
          {SKILL_CATEGORIES.map((skill, idx) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isOpen={openMenu === skill.id}
              onToggle={() => toggleMenu(skill.id)}
              inView={inView}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
