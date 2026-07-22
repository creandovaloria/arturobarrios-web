'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation, useReducedMotion } from '@hooks';
import { durations, easings } from '@lib/motion';
import { GearAnimation, StatCounter } from '@components/molecules';

interface ProblemSectionProps {
  headline?: string;
  subheadline?: string;
  statValue?: number;
  statLabel?: string;
  ctaLabel?: string;
  onCTA?: () => void;
}

/**
 * Problem Section - SPRINT 3
 *
 * Características:
 * - Layout split-screen (50% texto / 50% visual)
 * - Responsive: desktop (50/50), tablet/mobile (stack vertical)
 * - Engranajes SVG animados con 3 fases
 * - StatCounter animado
 * - Animaciones staggered con Framer Motion
 * - Accessibility: WCAG AA, prefers-reduced-motion
 * - Performance: 60fps, transform only
 *
 * Layout:
 * Desktop: [Texto (50%) | Engranajes (50%)]
 * Tablet/Mobile: [Texto] [Engranajes] (stack vertical)
 *
 * Animaciones:
 * 1. Contenedor: fadeIn al scroll
 * 2. Headline: slideUp + delay 200ms
 * 3. Subheadline: slideUp + delay 400ms
 * 4. SVG container: scaleIn + delay 600ms
 * 5. StatCounter: fadeIn + delay 800ms
 */
export const ProblemSection: React.FC<ProblemSectionProps> = ({
  headline = 'Tu empresa trabaja mucho. ¿Por qué no crece más rápido?',
  subheadline = 'La mayoría de las organizaciones no tienen problema de esfuerzo. Tienen un problema de visión, procesos y alineación. Nosotros conectamos IA, simplificamos procesos y empoderamos personas para que tu negocio crezca sin límites.',
  statValue = 70,
  statLabel = 'mejora en eficiencia',
  ctaLabel = 'Agenda una consulta gratuita',
  onCTA,
}) => {
  const { ref, isInView } = useInViewAnimation({ once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.regular,
        ease: easings.easeOutQuint,
      },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.regular,
        ease: easings.easeOutQuint,
        delay: 0.2,
      },
    },
  };

  const subheadlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.regular,
        ease: easings.easeOutQuint,
        delay: 0.4,
      },
    },
  };

  const gearContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.slow,
        ease: easings.easeOutQuint,
        delay: 0.6,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.regular,
        ease: easings.easeOutQuint,
        delay: 0.8,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="relative w-full py-20 sm:py-24 lg:py-32 bg-paper overflow-hidden"
      aria-label="Problem section"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Container con max-width */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Split-screen layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side: Texto */}
          <motion.div className="flex flex-col gap-6 sm:gap-8">
            {/* Headline */}
            <motion.h2
              className="text-fg font-display font-bold leading-tight"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                letterSpacing: '-0.02em',
              }}
              variants={headlineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {headline}
              <span className="text-brand-500 block mt-2">rápido?</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-fg-muted font-body text-base sm:text-lg leading-relaxed max-w-md"
              variants={subheadlineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {subheadline}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: durations.regular,
                ease: easings.easeOutQuint,
                delay: 0.5,
              }}
            >
              <motion.button
                onClick={onCTA}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-brand-500 text-white font-semibold rounded-lg text-base sm:text-lg whitespace-nowrap transition-shadow"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(46, 91, 255, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 0 20px rgba(46, 91, 255, 0.4)',
                  transition: 'all 0.3s ease-out',
                }}
              >
                {ctaLabel} →
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side: Engranajes */}
          <motion.div
            className="flex flex-col items-center gap-12 sm:gap-16"
            variants={gearContainerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Gear Animation */}
            <div className="w-full max-w-sm">
              <GearAnimation containerSize={400} size={120} />
            </div>

            {/* Stat Counter */}
            <motion.div
              className="w-full text-center"
              variants={statVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <StatCounter
                value={statValue}
                label={statLabel}
                suffix="%"
                duration={2000}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background gradient accent (opcional) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-50 to-transparent rounded-full -z-10 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-50 to-transparent rounded-full -z-10 opacity-20 blur-3xl pointer-events-none" />
    </motion.section>
  );
};

export default ProblemSection;
