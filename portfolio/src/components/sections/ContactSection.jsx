import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { PERSONAL_INFO } from '../../data/personalInfo';
import { SOCIAL_LINKS } from '../../data/socialLinks';
import TiltCard from '../common/TiltCard';
import MagneticWrapper from '../common/MagneticWrapper';
import CopyToClipboard from '../common/CopyToClipboard';

export default function ContactSection() {
  const [contactRef, contactVisible] = useInView({ threshold: 0.3 });
  const prefersReducedMotion = useReducedMotion();

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

  // Brand-specific glow colors for social icons
  const getBrandGlowClass = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return 'glow-linkedin';
      case 'gmail':
        return 'glow-gmail';
      default:
        return 'glow-git';
    }
  };

  return (
    <section id="contact" className="contact">
      {/* Background Atmosphere: 3 Soft Drifting Gradient Orbs */}
      <div className="contact-ambient-background" aria-hidden="true">
        <motion.div
          className="contact-orb orb-1"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, 30, -20, 0],
                  y: [0, -35, 20, 0],
                  scale: [1, 1.1, 0.95, 1],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="contact-orb orb-2"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, -35, 25, 0],
                  y: [0, 30, -25, 0],
                  scale: [1, 0.9, 1.08, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="contact-orb orb-3"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, 20, -15, 0],
                  y: [0, 25, -20, 0],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      <div className="contact-section">
        {/* Section Entrance: Header with drawing divider line */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="contact-title">Contact</h2>
          <motion.p
            className="line"
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeInOut' }}
            style={{ originY: 0 }}
          />
        </motion.div>

        <div className="contact-info">
          {/* Section Entrance: Drawing Vertical Accent Bar */}
          <div>
            <motion.p
              className="liine"
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ originY: 0 }}
            />
          </div>

          {/* Typewriter Section with Caret and Shimmer Upgrade */}
          <div ref={contactRef} className="typing-wrapper">
            <p className={`word ${contactVisible ? 'typewriter' : ''}`}>
              <span
                className={typingPhase === 'done' ? 'shimmer-text-span' : ''}
              >
                Hire Me your{' '}
              </span>
              {showCaret && (typingPhase === 'line1' || typingPhase === 'idle') && (
                <span className="typewriter-caret caret-1" aria-hidden="true">
                  |
                </span>
              )}
            </p>
            <p
              className={`wword ${contactVisible ? 'typewriter-delayed' : ''}`}
            >
              <span
                className={typingPhase === 'done' ? 'shimmer-text-span' : ''}
              >
                Next Project!
              </span>
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

          {/* Interactive Glassmorphism Card with 3D Tilt and Spotlight */}
          <TiltCard
            className="contact-card-glass"
            maxTilt={6}
            spotlightColor="rgba(97, 218, 251, 0.15)"
          >
            <motion.div
              className="contact-links"
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView={prefersReducedMotion ? false : 'visible'}
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {/* Name Detail */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 25 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
              >
                <p className="cname">Name: {PERSONAL_INFO.contactName}</p>
              </motion.div>

              {/* Gmail with Click-to-Copy and Micro-Interaction */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 25 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
              >
                <CopyToClipboard
                  label={`Gmail: ${PERSONAL_INFO.contactEmail}`}
                  value={PERSONAL_INFO.contactEmail}
                  href={`mailto:${PERSONAL_INFO.contactEmail}`}
                  className="cemail"
                />
              </motion.div>

              {/* Phone with Click-to-Copy and Micro-Interaction */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 25 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
              >
                <CopyToClipboard
                  label={`Phone: ${PERSONAL_INFO.contactPhone}`}
                  value={PERSONAL_INFO.contactPhone}
                  href={`tel:${PERSONAL_INFO.contactPhone}`}
                  className="cphone"
                />
              </motion.div>

              {/* Social Icons with Magnetic Hover, Idle Float, Brand Glow, and Tooltips */}
              <motion.div
                className="ogo"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                {SOCIAL_LINKS.map((link, idx) => (
                  <MagneticWrapper
                    key={`contact-${link.name}`}
                    strength={0.35}
                    radius={45}
                  >
                    <motion.a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className={`social-icon-anchor ${getBrandGlowClass(
                        link.name
                      )}`}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
                      whileTap={{ scale: 0.92 }}
                      animate={
                        prefersReducedMotion
                          ? {}
                          : {
                              y: [0, -4, 0],
                            }
                      }
                      transition={{
                        y: {
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: idx * 0.4,
                        },
                      }}
                    >
                      <img src={link.icon} alt={link.name} className="logs" />
                      <span className="social-tooltip" role="status">
                        {link.name}
                      </span>
                    </motion.a>
                  </MagneticWrapper>
                ))}
              </motion.div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
