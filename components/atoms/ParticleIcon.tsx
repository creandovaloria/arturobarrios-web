'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useReducedMotion } from '@hooks';

interface ParticleIconProps {
  type: 'ai' | 'process' | 'people';
  size?: number;
  color?: string;
}

/**
 * ParticleIcon - Iconos SVG animados inline para los 3 pilares
 *
 * Características:
 * - 3 variantes: AI (partículas), Proceso (flujo), Personas (red)
 * - Animaciones via SVG transform + Framer Motion
 * - Respeta prefers-reduced-motion
 * - Colores parametrizados
 * - 80px default (responsive)
 */
export const ParticleIcon: React.FC<ParticleIconProps> = ({
  type = 'ai',
  size = 80,
  color = '#2E5BFF',
}) => {
  const prefersReducedMotion = useReducedMotion();

  // ========================================
  // ICON 1: IA - PARTICLE ORBIT
  // ========================================
  const AIIcon = () => {
    const orbitVariants: Variants = {
      animate: {
        rotate: 360,
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        },
      },
    };

    const pulseVariants: Variants = {
      animate: {
        scale: [1, 1.2, 1],
        opacity: [0.6, 1, 0.6],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    };

    return (
      <svg
        viewBox="0 0 80 80"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AI para simplificar - icono animado"
        role="img"
      >
        {/* Central node */}
        <motion.g
          variants={prefersReducedMotion ? {} : pulseVariants}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
        >
          <circle cx="40" cy="40" r="8" fill={color} />
        </motion.g>

        {/* Orbit container */}
        <motion.g
          variants={prefersReducedMotion ? {} : orbitVariants}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
          style={{ transformOrigin: '40px 40px' }}
        >
          {/* Particle 1 */}
          <circle cx="40" cy="16" r="4" fill={color} opacity="0.8" />

          {/* Particle 2 */}
          <circle cx="56.57" cy="56.57" r="4" fill={color} opacity="0.8" />

          {/* Particle 3 */}
          <circle cx="23.43" cy="56.57" r="4" fill={color} opacity="0.8" />

          {/* Particle 4 */}
          <circle cx="64" cy="40" r="3" fill={color} opacity="0.6" />

          {/* Particle 5 */}
          <circle cx="16" cy="40" r="3" fill={color} opacity="0.6" />
        </motion.g>

        {/* Orbit ring (subtle) */}
        <circle
          cx="40"
          cy="40"
          r="24"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.2"
        />
      </svg>
    );
  };

  // ========================================
  // ICON 2: PROCESS - FLOW DIAGRAM
  // ========================================
  const ProcessIcon = () => {
    const flowVariants: Variants = {
      animate: {
        strokeDashoffset: [0, -8],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        },
      },
    };

    const illuminateVariants = (delay: number): Variants => ({
      animate: {
        opacity: [0.4, 1, 0.4],
        transition: {
          duration: 1.5,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    });

    return (
      <svg
        viewBox="0 0 80 80"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Procesos que funcionan - icono animado"
        role="img"
      >
        {/* Box 1 (left) */}
        <motion.rect
          x="8"
          y="28"
          width="16"
          height="24"
          rx="2"
          fill={color}
          variants={prefersReducedMotion ? {} : illuminateVariants(0)}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
          opacity="0.8"
        />

        {/* Box 2 (center) */}
        <motion.rect
          x="32"
          y="28"
          width="16"
          height="24"
          rx="2"
          fill={color}
          variants={prefersReducedMotion ? {} : illuminateVariants(0.4)}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
          opacity="0.8"
        />

        {/* Box 3 (right) */}
        <motion.rect
          x="56"
          y="28"
          width="16"
          height="24"
          rx="2"
          fill={color}
          variants={prefersReducedMotion ? {} : illuminateVariants(0.8)}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
          opacity="0.8"
        />

        {/* Connection line 1→2 */}
        <motion.line
          x1="24"
          y1="40"
          x2="32"
          y2="40"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          variants={prefersReducedMotion ? {} : flowVariants}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
          strokeDasharray="8"
        />

        {/* Connection line 2→3 */}
        <motion.line
          x1="48"
          y1="40"
          x2="56"
          y2="40"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          variants={prefersReducedMotion ? {} : flowVariants}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
          strokeDasharray="8"
          style={{ transitionDelay: '0.4s' }}
        />

        {/* Accent line below */}
        <line
          x1="8"
          y1="56"
          x2="72"
          y2="56"
          stroke={color}
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    );
  };

  // ========================================
  // ICON 3: PEOPLE - NETWORK NODES
  // ========================================
  const PeopleIcon = () => {
    const pulseVariants = (delay: number): Variants => ({
      animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.1, 1],
        transition: {
          duration: 2,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    });

    const glowVariants: Variants = {
      animate: {
        opacity: [0.3, 0.8, 0.3],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    };

    return (
      <svg
        viewBox="0 0 80 80"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Equipos que innovan - icono animado"
        role="img"
      >
        {/* Center node (larger) */}
        <motion.circle
          cx="40"
          cy="40"
          r="6"
          fill={color}
          variants={prefersReducedMotion ? {} : pulseVariants(0)}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
        />

        {/* Outer nodes - positioned around circle */}
        {/* Node 1 (top) */}
        <motion.circle
          cx="40"
          cy="16"
          r="4"
          fill={color}
          variants={prefersReducedMotion ? {} : pulseVariants(0.2)}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
        />

        {/* Node 2 (top-right) */}
        <motion.circle
          cx="56"
          cy="24"
          r="4"
          fill={color}
          variants={prefersReducedMotion ? {} : pulseVariants(0.4)}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
        />

        {/* Node 3 (bottom-right) */}
        <motion.circle
          cx="56"
          cy="56"
          r="4"
          fill={color}
          variants={prefersReducedMotion ? {} : pulseVariants(0.6)}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
        />

        {/* Node 4 (bottom-left) */}
        <motion.circle
          cx="24"
          cy="56"
          r="4"
          fill={color}
          variants={prefersReducedMotion ? {} : pulseVariants(0.8)}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
        />

        {/* Node 5 (left) */}
        <motion.circle
          cx="24"
          cy="24"
          r="4"
          fill={color}
          variants={prefersReducedMotion ? {} : pulseVariants(1)}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
        />

        {/* Connecting lines */}
        <motion.g
          variants={prefersReducedMotion ? {} : glowVariants}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
          stroke={color}
          strokeWidth="1.5"
          opacity="0.4"
        >
          <line x1="40" y1="16" x2="40" y2="40" /> {/* top to center */}
          <line x1="56" y1="24" x2="40" y2="40" /> {/* top-right to center */}
          <line x1="56" y1="56" x2="40" y2="40" /> {/* bottom-right to center */}
          <line x1="24" y1="56" x2="40" y2="40" /> {/* bottom-left to center */}
          <line x1="24" y1="24" x2="40" y2="40" /> {/* left to center */}
        </motion.g>

        {/* Outer ring connection */}
        <motion.circle
          cx="40"
          cy="40"
          r="28"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          variants={prefersReducedMotion ? {} : glowVariants}
          animate={prefersReducedMotion ? 'initial' : 'animate'}
          opacity="0.2"
        />
      </svg>
    );
  };

  // Render the appropriate icon
  if (type === 'ai') return <AIIcon />;
  if (type === 'process') return <ProcessIcon />;
  return <PeopleIcon />;
};

export default ParticleIcon;
