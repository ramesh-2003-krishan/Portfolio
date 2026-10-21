import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import VisualPanel from './VisualPanel';
import ContactForm from './ContactForm';

export default function ContactCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="split-contact-card"
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 35, scale: 0.98 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left Visual Panel */}
      <motion.div
        className="split-card-left"
        initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        <VisualPanel />
      </motion.div>

      {/* Right Form Panel */}
      <motion.div
        className="split-card-right"
        initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <ContactForm />
      </motion.div>
    </motion.div>
  );
}
