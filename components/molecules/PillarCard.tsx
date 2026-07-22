'use client';

import { useRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useReducedMotion } from '@hooks';
import { easings, durations } from '@lib/motion';
import ParticleIcon from '@components/atoms/ParticleIcon';

interface PillarCardProps {
  title: string;
  description: string;
  example: string;
  iconType: 'ai' | 'process' | 'people';
  colorAccent: string;
  delay?: number;
}

/**
 * PillarCard - Tarjeta 3D con glassmorphism
 *
 * Características:
 * - Efecto 3D con perspective + preserve-3d
 * - Glassmorphism: blur(10px) + backdrop-filter
 * - Hover: rotateX(-2deg) + rotateY(5deg) + elevación
 * - Glow effect dinámico basado en color del pilar
 * - Icon animado con escala en hover
 * - Example fade-in en hover
 * - Responsive y accesible
 * - Respeta prefers-reduced-motion
 */
export const PillarCard = forwardRef<HTMLDivElement, PillarCardProps>(
  (
    {
      title,
      description,
      example,
      iconType,
      colorAccent,
      delay = 0,
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const cardRef = useRef<HTMLDivElement>(null);

    // Card entrance animation (reveal en scroll)
    const cardVariants: Variants = {
      hidden: {
        opacity: 0,
        y: 24,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: durations.slow,
          ease: easings.easeOutQuint,
          delay,
        },
      },
    };

    // Hover animation (3D rotation + elevation)
    const hoverVariants: Variants = {
      rest: {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        transition: { duration: durations.regular, ease: easings.easeInOutSmooth },
      },
      hover: {
        rotateX: -2,
        rotateY: 5,
        y: -8,
        transition: { duration: durations.regular, ease: easings.easeInOutSmooth },
      },
    };

    // Icon hover animation
    const iconVariants: Variants = {
      rest: { scale: 1, rotate: 0 },
      hover: {
        scale: 1.1,
        rotate: 360,
        transition: { duration: 1.5, ease: 'easeInOut' },
      },
    };

    // Example text fade-in
    const exampleVariants: Variants = {
      rest: { opacity: 0, y: 4 },
      hover: {
        opacity: 1,
        y: 0,
        transition: { duration: durations.fast, ease: easings.easeInOutSmooth },
      },
    };

    // Responsive container padding (32px on desktop, 24px on mobile)
    const containerPadding = 'px-6 py-8 sm:px-8 sm:py-10';

    return (
      <motion.div
        ref={ref || cardRef}
        className={containerPadding}
        variants={cardVariants}
        initial="hidden"
        animate={prefersReducedMotion ? 'visible' : 'visible'}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.article
          className={`
            relative
            h-full
            rounded-2xl
            backdrop-blur-[10px]
            border border-white/10
            overflow-hidden
            transition-all
            duration-500
            cubic-bezier(0.25, 0.46, 0.45, 0.94)
            will-change-transform
            ${prefersReducedMotion ? '' : 'hover:shadow-2xl'}
          `}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            boxShadow: `
              inset 0 0 20px rgba(255, 255, 255, 0.1),
              0 8px 32px rgba(0, 0, 0, 0.1)
            `,
          }}
          variants={prefersReducedMotion ? {} : hoverVariants}
          initial="rest"
          whileHover="hover"
          role="article"
          aria-label={`Pilar: ${title}`}
        >
          {/* Content Container */}
          <div className="p-8 sm:p-10 flex flex-col h-full gap-6">
            {/* Icon Container */}
            <motion.div
              className="w-20 h-20 flex items-center justify-center"
              variants={prefersReducedMotion ? {} : iconVariants}
              initial="rest"
              whileHover="hover"
            >
              <ParticleIcon
                type={iconType}
                size={80}
                color={colorAccent}
              />
            </motion.div>

            {/* Title */}
            <div>
              <h3 className="text-h5 font-bold text-white leading-tight">
                {title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-body-sm text-white/80 leading-relaxed flex-grow">
              {description}
            </p>

            {/* Example - Fade in on hover */}
            <motion.div
              className={`
                pt-4
                border-t
                border-white/10
              `}
              variants={prefersReducedMotion ? {} : exampleVariants}
              initial="rest"
              whileHover="hover"
            >
              <p
                className="text-body-xs font-semibold text-white/60 uppercase tracking-wider mb-2"
                style={{ letterSpacing: '0.05em' }}
              >
                Ejemplo:
              </p>
              <p
                className="text-sm font-medium text-white/90"
                style={{ color: colorAccent }}
              >
                {example}
              </p>
            </motion.div>
          </div>

          {/* Hover Glow Effect */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: `0 0 30px ${colorAccent}33, inset 0 0 20px ${colorAccent}11`,
              }}
              whileHover={{
                opacity: 0.5,
                transition: { duration: durations.regular },
              }}
            />
          )}

          {/* Accent Border Glow (subtle, always visible) */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              border: `1px solid ${colorAccent}33`,
            }}
          />
        </motion.article>
      </motion.div>
    );
  }
);

PillarCard.displayName = 'PillarCard';

export default PillarCard;
