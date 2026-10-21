import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CopyToClipboard({
  label,
  value,
  href,
  className = '',
}) {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopy = async (e) => {
    if (e) e.preventDefault();
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // Fallback if permission/focus was blocked
      try {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (e2) {
        /* ignore */
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.div
      className={`copy-contact-item-wrapper ${className}`}
      whileHover={prefersReducedMotion ? {} : { x: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <a
        href={href}
        onClick={handleCopy}
        className={`copy-contact-link ${className}`}
        title={`Click to copy ${value} (or right-click to open)`}
      >
        <span className="copy-contact-text">{label}</span>
        <span className="copy-underline" aria-hidden="true" />
      </a>

      <AnimatePresence>
        {copied && (
          <motion.span
            role="status"
            aria-live="polite"
            className="copied-tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
