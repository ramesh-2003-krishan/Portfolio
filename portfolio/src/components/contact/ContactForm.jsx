import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_TILES, TOPIC_CHIPS } from '../../data/contact';
import { useContactForm } from '../../hooks/useContactForm';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ContactTiles from './ContactTiles';
import TopicChips from './TopicChips';
import FormField from './FormField';
import MagneticWrapper from '../common/MagneticWrapper';

export default function ContactForm() {
  const [selectedTileId, setSelectedTileId] = useState('email');
  const prefersReducedMotion = useReducedMotion();

  const {
    values,
    touched,
    errors,
    status,
    errorMessage,
    shakeKey,
    handleChange,
    handleBlur,
    setTopic,
    handleSubmit,
    resetStatus,
  } = useContactForm(TOPIC_CHIPS[0]);

  return (
    <div className="contact-form-panel">
      {/* Header with Title and Subtitle */}
      <div className="contact-form-header">
        <h2 className="contact-title form-main-title">Contact</h2>
        <div className="line form-header-line" aria-hidden="true" />
        <p className="contact-subtitle">Let's talk about your next idea.</p>
      </div>

      {/* Row of 3 Contact Option Tiles */}
      <ContactTiles
        tiles={CONTACT_TILES}
        selectedTileId={selectedTileId}
        onSelectTile={setSelectedTileId}
      />

      {/* Topic Pill Chips */}
      <TopicChips
        chips={TOPIC_CHIPS}
        selectedChip={values.topic}
        onSelectChip={setTopic}
      />

      {/* Main Form */}
      <form onSubmit={handleSubmit} noValidate className="contact-actual-form">
        {/* Hidden Honeypot Field for Spam Bots */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="company_honeypot">Company</label>
          <input
            id="company_honeypot"
            name="honeypot"
            type="text"
            value={values.honeypot}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        {/* Two-Column Form Layout on Desktop */}
        <div className="form-grid-columns">
          {/* Left Column: Name, Email, Phone */}
          <div className="form-column-left">
            <FormField
              id="contact_name"
              name="name"
              label="Your Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              placeholder="e.g. Alex Smith"
              required={true}
              shakeKey={shakeKey}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />

            <FormField
              id="contact_email"
              name="email"
              label="Your Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              placeholder="alex@example.com"
              required={true}
              shakeKey={shakeKey}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            />

            <FormField
              id="contact_phone"
              name="phone"
              label="Your Phone Number"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
              placeholder="+1 (555) 000-0000"
              required={false}
              shakeKey={shakeKey}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              }
            />
          </div>

          {/* Right Column: Message Textarea */}
          <div className="form-column-right">
            <FormField
              id="contact_message"
              name="message"
              label="Your Message"
              type="textarea"
              rows={8}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.message}
              touched={touched.message}
              placeholder="Tell me about your project, goals, and timeline..."
              required={true}
              shakeKey={shakeKey}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Submission Feedback & Alerts */}
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.div
              className="form-alert alert-success"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="alert-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="alert-text">
                <strong>Message sent!</strong>
                <p>Thank you for reaching out. I'll get back to you shortly.</p>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              className="form-alert alert-error"
              role="alert"
              aria-live="polite"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="alert-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="alert-text">
                <strong>Submission Error</strong>
                <p>{errorMessage}</p>
              </div>
              <button
                type="button"
                className="alert-retry-btn"
                onClick={resetStatus}
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button with Magnetic Wrapper, Lift, Shine, and Loading Spinner */}
        <div className="form-submit-container">
          <MagneticWrapper strength={0.25} radius={50}>
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className="contact-submit-btn"
              whileHover={
                prefersReducedMotion || status === 'loading'
                  ? {}
                  : { y: -2, scale: 1.02 }
              }
              whileTap={
                prefersReducedMotion || status === 'loading'
                  ? {}
                  : { scale: 0.96 }
              }
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span className="submit-btn-shine" aria-hidden="true" />
              <span className="submit-btn-content">
                {status === 'loading' ? (
                  <>
                    <span className="btn-spinner" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" className="submit-arrow-icon">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>
          </MagneticWrapper>
        </div>
      </form>
    </div>
  );
}
