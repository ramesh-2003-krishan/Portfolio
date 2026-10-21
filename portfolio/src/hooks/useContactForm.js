import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+0-9\s\-().]{7,}$/;

export function useContactForm(initialTopic = 'Full Stack') {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    topic: initialTopic,
    honeypot: '',
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [shakeKey, setShakeKey] = useState(0);

  const validateField = useCallback((field, value) => {
    switch (field) {
      case 'name':
        if (!value || !value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value || !value.trim()) return 'Email is required';
        if (!EMAIL_REGEX.test(value.trim())) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (value && value.trim() && !PHONE_REGEX.test(value.trim())) {
          return 'Please enter a valid phone number';
        }
        return '';
      case 'message':
        if (!value || !value.trim()) return 'Message is required';
        if (value.trim().length < 5) return 'Message must be at least 5 characters';
        return '';
      default:
        return '';
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Re-validate if touched
    setTouched((prevTouched) => {
      if (prevTouched[name]) {
        const err = validateField(name, value);
        setErrors((prevErr) => ({ ...prevErr, [name]: err }));
      }
      return prevTouched;
    });
  }, [validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  }, [validateField]);

  const setTopic = useCallback((topic) => {
    setValues((prev) => ({ ...prev, topic }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();

    // Honeypot check for bots
    if (values.honeypot) {
      setStatus('success');
      return;
    }

    // Validate all fields
    const newErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      phone: validateField('phone', values.phone),
      message: validateField('message', values.message),
    };

    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => !!err);
    if (hasErrors) {
      setShakeKey((prev) => prev + 1);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        'EmailJS environment variables (REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, REACT_APP_EMAILJS_PUBLIC_KEY) are missing. Check your .env file.'
      );
      setStatus('error');
      setErrorMessage(
        'Email service is currently offline (EmailJS keys not configured in .env). Please reach out directly to sudarshanakrishan@gmail.com.'
      );
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          phone_number: values.phone ? values.phone.trim() : 'Not provided',
          topic: values.topic,
          message: values.message.trim(),
        },
        publicKey
      );

      setStatus('success');
      setValues({
        name: '',
        email: '',
        phone: '',
        message: '',
        topic: initialTopic,
        honeypot: '',
      });
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error('EmailJS submission failed:', err);
      setStatus('error');
      setErrorMessage(
        err?.text || 'Failed to send your message. Please check your connection and try again.'
      );
    }
  }, [values, validateField, initialTopic]);

  const resetStatus = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
  }, []);

  return {
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
  };
}
