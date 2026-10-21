import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/personalInfo';
import { SOCIAL_LINKS } from '../../data/socialLinks';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import MagneticWrapper from '../common/MagneticWrapper';

export default function VisualPanel() {
  const [contactRef, contactVisible] = useInView({ threshold: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef(null);

  // Typewriter phase & caret states
  const [typingPhase, setTypingPhase] = useState('idle');
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    if (contactVisible) {
      setTypingPhase('line1');
      const timer1 = setTimeout(() => setTypingPhase('line2'), 1500);
      const timer2 = setTimeout(() => setTypingPhase('done'), 3000);
      const timer3 = setTimeout(() => setShowCaret(false), 5500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [contactVisible]);

  // Subtle Mouse Parallax on 3D Spheres
  const springConfig = { stiffness: 80, damping: 20 };
  const sphereX = useSpring(0, springConfig);
  const sphereY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    sphereX.set(normX * 18);
    sphereY.set(normY * 18);
  };

  const handleMouseLeave = () => {
    sphereX.set(0);
    sphereY.set(0);
  };

  return (
    <div
      ref={panelRef}
      className="visual-panel"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Glowing Spheres & Ambient Atmosphere */}
      <div className="visual-atmosphere" aria-hidden="true">
        {/* Soft Ambient Glow Overlay */}
        <div className="visual-glow-overlay" />

        {/* Small Floating Companion Sphere */}
        <motion.div
          className="visual-sphere sphere-small"
          style={{ x: sphereX, y: sphereY }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -10, 0],
                  scale: [1, 1.04, 1],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Large Primary 3D Sphere */}
        <motion.div
          className="visual-sphere sphere-large"
          style={{ x: sphereX, y: sphereY }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, 8, 0],
                  rotate: [0, 3, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        {/* Dune / Wave Shape along Bottom */}
        <div className="visual-dune-wave">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="dune-svg"
          >
            <path
              d="M0,80 C150,130 350,30 500,70 L500,150 L0,150 Z"
              fill="rgba(255, 255, 255, 0.08)"
            />
            <path
              d="M0,105 C180,60 320,135 500,100 L500,150 L0,150 Z"
              fill="rgba(100, 50, 220, 0.18)"
            />
          </svg>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="visual-content">
        {/* Typewriter text with vertical accent bar */}
        <div className="visual-typewriter-block">
          <div className="visual-line-container" aria-hidden="true">
            <motion.div
              className="liine"
              initial={prefersReducedMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ originY: 0 }}
            />
          </div>

          <div ref={contactRef} className="typing-wrapper visual-typing">
            <p className={`word visual-word ${contactVisible ? 'typewriter' : ''}`}>
              Hire Me your{' '}
              {showCaret && (typingPhase === 'line1' || typingPhase === 'idle') && (
                <span className="typewriter-caret caret-1" aria-hidden="true">
                  |
                </span>
              )}
            </p>
            <p
              className={`wword visual-wword ${
                contactVisible ? 'typewriter-delayed' : ''
              }`}
            >
              Next Project!
              {showCaret &&
                (typingPhase === 'line2' || typingPhase === 'done') && (
                  <span
                    className={`typewriter-caret caret-2 ${
                      typingPhase === 'done' ? 'caret-soft-fade' : ''
                    }`}
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
            </p>
          </div>
        </div>

        {/* Social Icons Row */}
        <div className="visual-social-section">
          <p className="cname visual-cname">{PERSONAL_INFO.contactName}</p>
          <div className="ogo visual-ogo">
            {SOCIAL_LINKS.map((link) => (
              <MagneticWrapper
                key={`visual-social-${link.name}`}
                strength={0.3}
                radius={40}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="visual-social-link"
                >
                  <img src={link.icon} alt={link.name} className="logs" />
                  <span className="visual-social-tooltip" role="status">
                    {link.name}
                  </span>
                </a>
              </MagneticWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
