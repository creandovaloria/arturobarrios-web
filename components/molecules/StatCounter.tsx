'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCountUp, useInViewAnimation, useReducedMotion } from '@hooks';
import { durations, easings } from '@lib/motion';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * StatCounter Component
 *
 * Características:
 * - Animación de número: 0 → valor
 * - Trigger al scroll (useInViewAnimation)
 * - Duration configurable (default: 2s)
 * - Label + símbolo
 * - Responsive
 * - Respeta prefers-reduced-motion
 * - Anima solo 1 vez (once: true)
 *
 * Uso:
 * <StatCounter value={70} label="mejora en eficiencia" suffix="%" />
 */
export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  label,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
}) => {
  const { ref, isInView } = useInViewAnimation({ once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  // Hook para contar - trigger siempre activo (componente puede estar fuera de vista inicialmente)
  const displayValue = useCountUp({
    end: value,
    duration,
    start: 0,
    trigger: true,
    decimals: 0,
    prefix,
    suffix,
  });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: durations.regular,
        ease: easings.easeOutQuint,
        delay: 0.2,
      }}
    >
      {/* Número animado */}
      <motion.div
        className="text-5xl sm:text-6xl font-bold text-brand-500"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{
          duration: durations.slow,
          ease: easings.easeOutQuint,
          delay: 0.1,
        }}
      >
        {prefersReducedMotion ? `${prefix}${value}${suffix}` : displayValue}
      </motion.div>

      {/* Label */}
      <motion.p
        className="text-center text-body text-fg-muted max-w-xs"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: durations.regular,
          ease: easings.easeOutQuint,
          delay: 0.3,
        }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

export default StatCounter;
