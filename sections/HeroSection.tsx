'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@hooks';
import { springs, easings, durations } from '@lib/motion';
import { Badge } from '@components/atoms';
import { BackgroundVideo, MorphingText, CustomCursor } from '@components/molecules';

interface HeroSectionProps {
  backgroundVideo?: string;
  posterImage?: string;
  headline?: string;
  subheadline?: string;
  morphingWords?: string[];
  ctaLabel1?: string;
  ctaLabel2?: string;
  onCTA1?: () => void;
  onCTA2?: () => void;
}

/**
 * HERO SECTION PREMIUM - ARTURO CONSULTING
 *
 * Design: Split asymmetric layout (55% text/CTA left, 45% gradient visual right)
 * - Distinctive, not templated
 * - Gradient background with glow effects
 * - Bold typography as visual thesis
 * - Interactive hover states
 * - Fully responsive & accessible
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundVideo = '/videos/hero-background.mp4',
  posterImage = '/images/hero-poster.jpg',
  headline = 'Tu negocio ya funciona. Nosotros lo hacemos',
  subheadline = 'Conectando IA • Simplificando Procesos • Empoderando Personas',
  morphingWords = ['crecer', 'escalar', 'transformar'],
  ctaLabel1 = 'Agenda tu diagnóstico gratuito',
  ctaLabel2 = 'Ver cómo trabajo',
  onCTA1,
  onCTA2,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  // Text animations
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.slow,
        ease: easings.easeOutQuint,
      },
    },
  };

  // Badge pulse
  const pulseVariants = {
    initial: { opacity: 0.7, scale: 0.95 },
    animate: {
      opacity: [0.7, 1, 0.7],
      scale: [0.95, 1, 0.95],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easings.easeInOutSmooth,
      },
    },
  };

  // CTA button glow effect
  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: {
      boxShadow: [
        '0 0 20px rgba(46, 91, 255, 0.5)',
        '0 0 40px rgba(46, 91, 255, 0.8)',
        '0 0 20px rgba(46, 91, 255, 0.5)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  // Gradient visual on right
  const gradientVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.slow,
        ease: easings.easeOutQuint,
        delay: 0.3,
      },
    },
  };

  return (
    <>
      <CustomCursor />

      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 -z-10 w-full h-full">
          <BackgroundVideo
            src={backgroundVideo}
            poster={posterImage}
            alt="Hero background"
          />
          {/* Gradient overlay: blue to black with subtle purple */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 opacity-70" />

          {/* Decorative gradient orb (right side) */}
          <motion.div
            className="absolute -right-32 top-1/2 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Blue accent glow */}
          <motion.div
            className="absolute -left-40 -top-40 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(46, 91, 255, 0.1) 0%, transparent 70%)',
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Content Container - Split Layout */}
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* LEFT: Text & CTA (55%) */}
            <motion.div
              className="flex flex-col items-start justify-center gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={prefersReducedMotion ? 'visible' : 'visible'}
            >
              {/* Badge */}
              <motion.div variants={textVariants}>
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={pulseVariants}
                >
                  <Badge
                    variant="solid"
                    color="brand"
                    size="md"
                    className="inline-flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
                    Top 1% Estrategas IA
                  </Badge>
                </motion.div>
              </motion.div>

              {/* Headline - BOLD & LARGE */}
              <motion.div variants={textVariants} className="w-full max-w-lg">
                <h1 className="text-white font-display font-bold leading-tight"
                  style={{
                    fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                    letterSpacing: '-0.03em',
                    textWrap: 'balance',
                  }}
                >
                  {headline}
                  <motion.span
                    className="block text-brand-500 mt-2"
                    style={{
                      fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                    }}
                  >
                    {prefersReducedMotion ? (
                      morphingWords[0]
                    ) : (
                      <MorphingText words={morphingWords} interval={3000} />
                    )}
                  </motion.span>
                </h1>
              </motion.div>

              {/* Subheadline - Clear hierarchy */}
              <motion.p
                variants={textVariants}
                className="text-fg-muted font-body text-base sm:text-lg leading-relaxed max-w-md"
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.6',
                }}
              >
                {subheadline}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={textVariants}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4"
              >
                {/* Primary CTA */}
                <motion.button
                  onClick={onCTA1}
                  className="px-8 py-3 bg-brand-500 text-white font-medium rounded-lg text-base sm:text-lg transition-all duration-300 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-neutral-950"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={ctaLabel1}
                >
                  {ctaLabel1}
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  onClick={onCTA2}
                  className="px-8 py-3 border border-brand-500 text-brand-300 font-medium rounded-lg text-base sm:text-lg transition-all duration-300 hover:bg-brand-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-neutral-950"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={ctaLabel2}
                >
                  {ctaLabel2}
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT: Visual Gradient (45%) - Hidden on mobile */}
            <motion.div
              className="hidden lg:flex items-center justify-center"
              variants={gradientVariants}
              initial="hidden"
              animate={prefersReducedMotion ? 'visible' : 'visible'}
            >
              <div className="relative w-full h-96">
                {/* Gradient sphere */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-brand-500 via-purple-600 to-transparent rounded-3xl opacity-80" />
                </div>

                {/* Animated elements inside */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="w-24 h-24 border-2 border-brand-300 rounded-full opacity-40" />
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="w-32 h-32 border-2 border-purple-400 rounded-full opacity-30" />
                </motion.div>

                {/* Center accent */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-16 h-16 bg-brand-500 rounded-full blur-xl opacity-60" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
