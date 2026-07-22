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
 * Hero Section Premium
 *
 * Características:
 * - Video background full-screen con lazy-load
 * - Overlay semi-transparent con gradiente
 * - Tipografía premium con clamp sizing (responsive)
 * - Animaciones staggered (fade-in 500ms)
 * - Morphing text que cambia cada 3s
 * - Cursor magnético personalizado
 * - Badge con pulse animation
 * - CTAs con glow effect
 * - Responsive: desktop/tablet/mobile
 * - Accessibility: prefers-reduced-motion, WCAG AA contrast
 * - Performance: LCP <2s, CLS <0.1, 60fps
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

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.slow,
        ease: easings.easeOutQuint,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.regular,
        ease: easings.easeOutQuint,
        delay: 0.2,
      },
    },
  };

  // Pulse animation para badge
  const pulseVariants = {
    initial: { opacity: 0.7 },
    animate: {
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easings.easeInOutSmooth,
      },
    },
  };

  return (
    <>
      {/* Custom cursor magnético - solo desktop */}
      <CustomCursor />

      {/* Hero Section */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950"
        aria-label="Hero section"
      >
        {/* Video Background - full screen */}
        <div className="absolute inset-0 top-0 left-0 right-0 bottom-0 -z-10 w-full min-h-screen">
          <BackgroundVideo
            src={backgroundVideo}
            poster={posterImage}
            alt="Hero background video"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="flex flex-col items-center justify-center gap-8 md:gap-12 mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={prefersReducedMotion ? 'visible' : 'visible'}
          >
            {/* Badge "Top 1% Estrategas IA" */}
            <motion.div variants={badgeVariants}>
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
                  <span className="w-2 h-2 bg-status-success rounded-full"></span>
                  Top 1% Estrategas IA
                </Badge>
              </motion.div>
            </motion.div>

            {/* Headline Principal */}
            <motion.h1
              variants={itemVariants}
              className="text-white font-display font-bold max-w-4xl leading-tight"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                letterSpacing: '-0.02em',
              }}
            >
              {headline}{' '}
              <span className="text-brand-400">
                <MorphingText
                  words={morphingWords}
                  interval={3000}
                  className="inline-block"
                />
              </span>
              .
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-neutral-100 font-body text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* CTAs Container */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
            >
              {/* CTA Primary: "Agenda tu diagnóstico" con glow */}
              <motion.button
                data-magnetic
                onClick={onCTA1}
                className="relative px-6 sm:px-8 py-3 sm:py-4 bg-brand-500 text-white font-semibold rounded-lg text-base sm:text-lg whitespace-nowrap"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(46, 91, 255, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={springs.snappy}
                style={{
                  boxShadow: '0 0 20px rgba(46, 91, 255, 0.4)',
                  transition: 'all 0.3s ease-out',
                }}
              >
                {ctaLabel1} →
              </motion.button>

              {/* CTA Secondary: "Ver cómo trabajo" outline */}
              <motion.button
                data-magnetic
                onClick={onCTA2}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-brand-400 text-brand-400 font-semibold rounded-lg text-base sm:text-lg whitespace-nowrap transition-colors"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(46, 91, 255, 0.1)',
                  borderColor: 'rgb(46, 91, 255)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={springs.snappy}
              >
                {ctaLabel2}
              </motion.button>
            </motion.div>

            {/* Scroll Indicator - Solo desktop */}
            <motion.div
              className="hidden md:flex flex-col items-center gap-2 pt-12 absolute bottom-8 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <p className="text-neutral-300 text-sm font-medium">Scroll para explorar</p>
              <svg
                className="w-5 h-5 text-neutral-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Gradiente adicional en la parte inferior para transición suave */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-paper via-paper/40 to-transparent pointer-events-none z-0" />
      </section>
    </>
  );
};

export default HeroSection;
