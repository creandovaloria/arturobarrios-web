'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation, useReducedMotion } from '@hooks';
import { durations, easings } from '@lib/motion';
import { BeforeAfterSlider } from '@components/molecules';

interface TransformationSectionProps {
  beforeVideo?: string;
  afterVideo?: string;
  beforePoster?: string;
  afterPoster?: string;
  beforeLabel?: string;
  afterLabel?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  onCTA?: () => void;
}

/**
 * Transformation Section - SPRINT 5
 *
 * Características:
 * - Before/After slider interactivo con videos
 * - Lazy-load de videos con IntersectionObserver
 * - Posters fallback (JPEG)
 * - saveData detection para usuarios con datos limitados
 * - Overlay con headline y subheadline
 * - Animaciones staggered (fade-in, slide-in, scale-in)
 * - Divider smooth follow (50ms delay)
 * - Glow effect en hover del divider
 * - Responsive: desktop (full width), tablet/mobile (stack)
 * - Accessibility: WCAG AA contrast, prefers-reduced-motion
 * - Performance: LCP <3s, CLS <0.1, 60fps
 *
 * Layout:
 * Desktop: [Before/After Slider]
 * Overlay: [Headline + Subheadline] (top-left, gradient dark background)
 *
 * Animaciones:
 * 1. Container: fadeIn en scroll
 * 2. Slider: scaleIn + fade
 * 3. Overlay text: slideUp + fade
 */
export const TransformationSection: React.FC<TransformationSectionProps> = ({
  beforeVideo = '/videos/transformation-before.mp4',
  afterVideo = '/videos/transformation-after.mp4',
  beforePoster = '/images/transformation-before.jpg',
  afterPoster = '/images/transformation-after.jpg',
  beforeLabel = 'Before: Chaos',
  afterLabel = 'After: Order',
  headline = 'No necesitas aprender tecnología nueva. Usamos lo que ya tienes.',
  subheadline = 'Transforma tu operación manteniendo lo que funciona',
  ctaLabel = 'Ver más transformaciones',
  onCTA,
}) => {
  const { ref, isInView } = useInViewAnimation({ once: true, amount: 0.3 });
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const [shouldShowPosterOnly, setShouldShowPosterOnly] = useState(false);

  // Lazy-load videos con IntersectionObserver
  useEffect(() => {
    // Verificar prefers-reduced-motion
    if (prefersReducedMotion) {
      setShouldShowPosterOnly(true);
      return;
    }

    // Verificar navigator.connection para saveData
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection?.saveData || connection?.effectiveType === '2g') {
        setShouldShowPosterOnly(true);
        return;
      }
    }

    // IntersectionObserver para lazy-load
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Cargar videos cuando son visibles
            if (beforeVideoRef.current && !beforeLoaded) {
              beforeVideoRef.current.load();
              setBeforeLoaded(true);
            }
            if (afterVideoRef.current && !afterLoaded) {
              afterVideoRef.current.load();
              setAfterLoaded(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px',
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [beforeLoaded, afterLoaded, prefersReducedMotion, ref]);

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

  const sliderVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.slow,
        ease: easings.easeOutQuint,
        delay: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.regular,
        ease: easings.easeOutQuint,
        delay: 0.4,
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
        delay: 0.5,
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
        delay: 0.6,
      },
    },
  };

  // Contenido del before video
  const beforeContent = (
    <>
      {/* Poster fallback */}
      <img
        src={beforePoster}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: beforeLoaded && !shouldShowPosterOnly ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
        }}
      />

      {/* Video */}
      {!shouldShowPosterOnly && (
        <video
          ref={beforeVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster={beforePoster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          style={{
            opacity: beforeLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          <source src={beforeVideo} type="video/mp4" />
        </video>
      )}

      {/* Overlay tint */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/20 to-neutral-900/40"
        aria-hidden="true"
      />
    </>
  );

  // Contenido del after video
  const afterContent = (
    <>
      {/* Poster fallback */}
      <img
        src={afterPoster}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: afterLoaded && !shouldShowPosterOnly ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
        }}
      />

      {/* Video */}
      {!shouldShowPosterOnly && (
        <video
          ref={afterVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster={afterPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          style={{
            opacity: afterLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          <source src={afterVideo} type="video/mp4" />
        </video>
      )}

      {/* Overlay tint */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/20 to-neutral-900/40"
        aria-hidden="true"
      />
    </>
  );

  return (
    <motion.section
      ref={ref}
      className="relative w-full py-12 sm:py-16 lg:py-24 bg-neutral-900 overflow-hidden"
      aria-label="Transformation section"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Container */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Before/After Slider */}
        <motion.div
          className="relative w-full rounded-lg overflow-hidden shadow-2xl"
          variants={sliderVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <BeforeAfterSlider
            beforeContent={beforeContent}
            afterContent={afterContent}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
            className="rounded-lg"
          />

          {/* Overlay con texto - top-left corner */}
          <motion.div
            className="absolute top-0 left-0 z-20 p-6 sm:p-8 lg:p-12 max-w-xl"
            variants={overlayVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Dark gradient background para legibilidad */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-transparent rounded-lg pointer-events-none"
              aria-hidden="true"
            />

            {/* Contenido */}
            <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
              {/* Headline */}
              <motion.h2
                className="text-white font-display font-bold leading-tight"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  letterSpacing: '-0.02em',
                }}
                variants={headlineVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                {headline}
              </motion.h2>

              {/* Subheadline */}
              <motion.p
                className="text-neutral-100 font-body text-sm sm:text-base leading-relaxed max-w-md"
                variants={subheadlineVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                {subheadline}
              </motion.p>
            </div>
          </motion.div>

          {/* Labels de Before/After - esquinas opuestas */}
          <div
            className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider"
            style={{ opacity: 0.7, zIndex: 15 }}
            aria-hidden="true"
          >
            {beforeLabel}
          </div>
          <div
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider"
            style={{ opacity: 0.7, zIndex: 15 }}
            aria-hidden="true"
          >
            {afterLabel}
          </div>
        </motion.div>

        {/* CTA Button - debajo del slider */}
        <motion.div
          className="flex justify-center pt-8 sm:pt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: durations.regular,
            ease: easings.easeOutQuint,
            delay: 0.7,
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
      </div>

      {/* Background gradient accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-500/10 to-transparent rounded-full -z-10 opacity-30 blur-3xl pointer-events-none" />
    </motion.section>
  );
};

export default TransformationSection;
