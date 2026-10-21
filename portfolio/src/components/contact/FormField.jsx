import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  icon,
  rows = 5,
  shakeKey = 0,
}) {
  const prefersReducedMotion = useReducedMotion();
  const hasError = touched && !!error;
  const isValid = touched && !error && (value ? value.trim().length > 0 : false);

  const isTextarea = type === 'textarea';

  return (
    <motion.div
      key={`field-${id}-${shakeKey}`}
      className={`form-field-group ${hasError ? 'field-has-error' : ''} ${
        isValid ? 'field-is-valid' : ''
      }`}
      animate={
        hasError && !prefersReducedMotion
          ? { x: [-5, 5, -3, 3, -1, 1, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <label htmlFor={id} className="form-field-label">
        {label}
        {required && <span className="required-star" aria-hidden="true">*</span>}
      </label>

      <div className={`form-input-container ${isTextarea ? 'is-textarea' : ''}`}>
        {icon && (
          <span className="input-icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            required={required}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${id}-error` : undefined}
            className="form-input form-textarea"
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${id}-error` : undefined}
            className="form-input"
          />
        )}

        {isValid && (
          <span className="input-valid-indicator" aria-hidden="true" title="Valid">
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </div>

      {hasError && (
        <span
          id={`${id}-error`}
          className="form-field-error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </motion.div>
  );
}
