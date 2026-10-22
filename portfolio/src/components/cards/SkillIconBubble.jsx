import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function SkillIconBubble({
  subSkill,
  index,
  total,
  isOpen,
  isDesktop,
}) {
  const prefersReducedMotion = useReducedMotion();
  const label = subSkill.label || subSkill.name;

  // Reduced motion: simple fade and scale
  if (prefersReducedMotion) {
    if (!isOpen) return null;
    return (
      <div
        className="skill-icon-bubble-wrapper"
        style={
          isDesktop
            ? {
                transform: `translate(${subSkill.desktopOffset.x}px, ${subSkill.desktopOffset.y}px)`,
              }
            : {}
        }
        role="listitem"
      >
        <div
          className="skill-icon-bubble"
          tabIndex={0}
          aria-label={label}
        >
          <img
            src={subSkill.src}
            alt={label}
            className="loggo-img"
            loading="lazy"
          />
          <span className="skill-icon-tooltip" role="tooltip">
            {label}
          </span>
        </div>
      </div>
    );
  }

  const targetX = isDesktop ? subSkill.desktopOffset.x : 0;
  const targetY = isDesktop ? subSkill.desktopOffset.y : 0;

  return (
    <motion.div
      className="skill-icon-bubble-wrapper"
      role="listitem"
      initial={false}
      animate={
        isOpen
          ? {
              x: targetX,
              y: targetY,
              scale: 1,
              opacity: 1,
              pointerEvents: 'auto',
            }
          : {
              x: 0,
              y: 0,
              scale: 0.35,
              opacity: 0,
              pointerEvents: 'none',
            }
      }
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 18,
        delay: isOpen ? index * 0.04 : (total - 1 - index) * 0.03,
      }}
    >
      {/* Inner bubble handles the idle floating oscillation and hover lift */}
      <motion.div
        className="skill-icon-bubble"
        tabIndex={0}
        aria-label={label}
        animate={
          isOpen
            ? {
                y: [0, -6, 0],
              }
            : { y: 0 }
        }
        transition={{
          duration: 3 + (index % 3) * 0.7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.15,
        }}
        whileHover={{
          scale: 1.18,
          transition: { duration: 0.2 },
        }}
      >
        <img
          src={subSkill.src}
          alt={label}
          className="loggo-img"
          loading="lazy"
        />
        <span className="skill-icon-tooltip" role="tooltip">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
