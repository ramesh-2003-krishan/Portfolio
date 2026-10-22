import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import SkillIconBubble from './SkillIconBubble';

export default function SkillCard({
  skill,
  isOpen,
  onToggle,
  inView = true,
  index = 0,
}) {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, isHovered: false }));
  };

  // Alternating entrance animation (Cards A & C from left, B & D from right)
  const initialX =
    skill.entranceDirection === 'left' ? -70 : 70;

  return (
    <motion.div
      className="skill-card-unit"
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, x: initialX }
      }
      animate={
        inView
          ? { opacity: 1, x: 0 }
          : prefersReducedMotion
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: initialX }
      }
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.15 + index * 0.1,
      }}
    >
      <button
        type="button"
        className={`${skill.cardClass} skills-card-btn ${isOpen ? 'active' : ''}`}
        onClick={onToggle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-expanded={isOpen}
        aria-controls={`skills-menu-${skill.id}`}
        aria-label={`${skill.title} skills, click to ${isOpen ? 'collapse' : 'expand'}`}
      >
        {/* Dynamic Cursor Light Reflection / Spotlight */}
        {!prefersReducedMotion && (
          <div
            className="skill-card-spotlight"
            aria-hidden="true"
            style={{
              opacity: spotlight.isHovered ? 1 : 0,
              background: `radial-gradient(circle 140px at ${spotlight.x}px ${spotlight.y}px, rgba(97, 218, 251, 0.22), transparent 75%)`,
            }}
          />
        )}

        {/* Card Icon */}
        <div className="skill-card-icon-wrap" aria-hidden="true">
          <img
            src={skill.icon}
            alt={skill.iconAlt || skill.title}
            className="logoo"
          />
        </div>

        {/* Title */}
        <h4 className="skill-card-title">{skill.title}</h4>

        {/* Rotating Chevron Indicator on the right */}
        <span
          className={`skill-card-chevron-wrap ${isOpen ? 'open' : ''}`}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="skill-card-chevron-icon"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Fly-out Sub-skills */}
      <div
        id={`skills-menu-${skill.id}`}
        className={`${skill.subMenuClass} skills-sub-menu ${isOpen ? 'active' : ''}`}
        role="list"
        aria-label={`${skill.title} technologies`}
      >
        {skill.subSkills.map((sub, idx) => (
          <SkillIconBubble
            key={`${skill.id}-sub-${idx}-${sub.name}`}
            subSkill={sub}
            index={idx}
            total={skill.subSkills.length}
            isOpen={isOpen}
            isDesktop={isDesktop}
          />
        ))}
      </div>
    </motion.div>
  );
}
