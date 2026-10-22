import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CountUp({
  end,
  start = 0,
  duration = 1.6,
  prefix = '',
  suffix = '',
  inView = true,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(start);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    if (!inView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let startTime = null;
    let animationFrameId = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeOut);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [inView, end, start, duration, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {prefix}
        {end}
        {suffix}
      </span>
    );
  }

  return (
    <span className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
