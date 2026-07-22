'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@hooks';

interface GearProps {
  id: 'ia' | 'procesos' | 'personas';
  label: string;
  description: string;
  color: string;
  x: number;
  y: number;
  size: number;
  isHovered: boolean;
  onHoverChange: (id: string, hovered: boolean) => void;
  animationPhase: 'chaos' | 'sync' | 'acceleration';
  prefersReducedMotion: boolean;
}

/**
 * Gear SVG Component
 * Representa un engranaje individual con animaciones dinámicas
 */
const Gear: React.FC<GearProps> = ({
  id,
  label,
  description,
  color,
  x,
  y,
  size,
  isHovered,
  onHoverChange,
  animationPhase,
  prefersReducedMotion,
}) => {
  // Definir rotaciones según fase
  const getRotation = () => {
    if (prefersReducedMotion) return 0;

    switch (id) {
      case 'ia':
        if (animationPhase === 'chaos') return 180;
        if (animationPhase === 'sync') return 360;
        return 720; // acceleration
      case 'procesos':
        if (animationPhase === 'chaos') return 90;
        if (animationPhase === 'sync') return 360;
        return 720;
      case 'personas':
        if (animationPhase === 'chaos') return 270;
        if (animationPhase === 'sync') return 360;
        return 720;
      default:
        return 0;
    }
  };

  const getOpacity = () => {
    if (animationPhase === 'acceleration') return 1;
    if (animationPhase === 'sync') return 0.8;
    return 0.6;
  };

  const getScale = () => {
    if (animationPhase === 'acceleration' && isHovered) return 1.1;
    if (animationPhase === 'acceleration') return 1.05;
    return 1;
  };

  const getDuration = () => {
    if (prefersReducedMotion) return 0;
    if (animationPhase === 'chaos') return 3;
    if (animationPhase === 'sync') return 4;
    return 2; // acceleration
  };

  const getEasing = () => {
    if (animationPhase === 'chaos' || prefersReducedMotion) return 'linear';
    return 'easeInOut';
  };

  return (
    <motion.g
      x={x}
      y={y}
      onMouseEnter={() => onHoverChange(id, true)}
      onMouseLeave={() => onHoverChange(id, false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Gear SVG */}
      <motion.g
        animate={{
          rotate: prefersReducedMotion ? 0 : getRotation(),
          opacity: getOpacity(),
          scale: getScale(),
        }}
        transition={{
          duration: getDuration(),
          ease: getEasing(),
          repeat: 0,
        }}
        style={{
          transformOrigin: `${x + size / 2}px ${y + size / 2}px`,
          filter: isHovered && animationPhase === 'acceleration'
            ? `drop-shadow(0 0 12px ${color})`
            : 'none',
          transition: 'filter 0.3s ease-out',
        }}
      >
        {/* Gear circle */}
        <circle cx={x + size / 2} cy={y + size / 2} r={size / 2} fill={color} opacity={0.1} />

        {/* Gear teeth (simplified gear shape) */}
        <g>
          {/* Center circle */}
          <circle cx={x + size / 2} cy={y + size / 2} r={size / 5} fill={color} />

          {/* Teeth - 8 dientes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const outerRadius = size / 2;
            const innerRadius = size / 3;
            const centerX = x + size / 2;
            const centerY = y + size / 2;

            const x1 = centerX + Math.cos(rad) * innerRadius;
            const y1 = centerY + Math.sin(rad) * innerRadius;
            const x2 = centerX + Math.cos(rad) * outerRadius;
            const y2 = centerY + Math.sin(rad) * outerRadius;

            return (
              <line
                key={`tooth-${angle}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth={size / 20}
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </motion.g>

      {/* Label - aparece al hover en acceleration phase */}
      <motion.text
        x={x + size / 2}
        y={y + size + 30}
        textAnchor="middle"
        fontSize="12"
        fill={color}
        fontWeight="500"
        animate={{
          opacity: isHovered && animationPhase === 'acceleration' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        pointerEvents="none"
      >
        {label}
      </motion.text>

      {/* Description - aparece al hover */}
      <motion.text
        x={x + size / 2}
        y={y + size + 50}
        textAnchor="middle"
        fontSize="10"
        fill={color}
        opacity={0.7}
        animate={{
          opacity: isHovered && animationPhase === 'acceleration' ? 0.8 : 0,
        }}
        transition={{ duration: 0.2 }}
        pointerEvents="none"
      >
        {description}
      </motion.text>
    </motion.g>
  );
};

interface GearAnimationProps {
  size?: number;
  containerSize?: number;
  className?: string;
}

/**
 * GearAnimation Component
 *
 * Características:
 * - 3 engranajes (IA, Procesos, Personas)
 * - 3 fases de animación (caos → sincronización → aceleración)
 * - Conectores visuales entre engranajes
 * - Hover effects (glow, aceleración)
 * - Animación total: 10s loop infinite
 * - Responsive a prefers-reduced-motion
 * - 60fps (transform only, no paint)
 *
 * Fases:
 * 1. CAOS (0-3s): Giran desincronizados
 * 2. SINCRONIZACIÓN (3-7s): Se sincronizan lentamente
 * 3. ACELERACIÓN (7-10s): Aceleran y brillan
 */
export const GearAnimation: React.FC<GearAnimationProps> = ({
  size = 120,
  containerSize = 400,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredGear, setHoveredGear] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState<'chaos' | 'sync' | 'acceleration'>('chaos');

  // Simular cambio de fase cada 10 segundos (loop completo)
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      setAnimationPhase('sync');
    }, 3000);

    return () => clearTimeout(timer);
  }, [animationPhase, prefersReducedMotion]);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    if (animationPhase !== 'sync') return;

    const timer = setTimeout(() => {
      setAnimationPhase('acceleration');
    }, 4000);

    return () => clearTimeout(timer);
  }, [animationPhase, prefersReducedMotion]);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    if (animationPhase !== 'acceleration') return;

    const timer = setTimeout(() => {
      setAnimationPhase('chaos');
    }, 3000);

    return () => clearTimeout(timer);
  }, [animationPhase, prefersReducedMotion]);

  // Posiciones triangulares para los 3 engranajes
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  const radius = containerSize / 3;

  const gearPositions = [
    {
      id: 'ia' as const,
      label: 'IA',
      description: 'Inteligencia Artificial',
      color: '#2E5BFF', // brand-500
      x: centerX + radius * Math.cos(-Math.PI / 2),
      y: centerY + radius * Math.sin(-Math.PI / 2),
    },
    {
      id: 'procesos' as const,
      label: 'Procesos',
      description: 'Optimizados',
      color: '#10B981', // success
      x: centerX + radius * Math.cos(Math.PI / 6),
      y: centerY + radius * Math.sin(Math.PI / 6),
    },
    {
      id: 'personas' as const,
      label: 'Personas',
      description: 'Empoderadas',
      color: '#8B5CF6', // purple
      x: centerX + radius * Math.cos((5 * Math.PI) / 6),
      y: centerY + radius * Math.sin((5 * Math.PI) / 6),
    },
  ];

  // Calcular conectores (líneas entre engranajes)
  const getConnectorOpacity = () => {
    if (prefersReducedMotion) return 0;
    if (animationPhase === 'chaos') return 0;
    if (animationPhase === 'sync') return 0.5;
    return 1;
  };

  return (
    <motion.svg
      viewBox={`0 0 ${containerSize} ${containerSize}`}
      className={`w-full h-auto max-w-md mx-auto ${className}`}
      role="img"
      aria-label="Engranajes sincronizados animación"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Conectores visuales */}
      <motion.g
        animate={{
          opacity: getConnectorOpacity(),
        }}
        transition={{ duration: 0.8 }}
        stroke="currentColor"
        strokeWidth="2"
        opacity={0.3}
      >
        {/* Línea IA -> Procesos */}
        <line
          x1={gearPositions[0].x + size / 2}
          y1={gearPositions[0].y + size / 2}
          x2={gearPositions[1].x + size / 2}
          y2={gearPositions[1].y + size / 2}
        />

        {/* Línea Procesos -> Personas */}
        <line
          x1={gearPositions[1].x + size / 2}
          y1={gearPositions[1].y + size / 2}
          x2={gearPositions[2].x + size / 2}
          y2={gearPositions[2].y + size / 2}
        />

        {/* Línea Personas -> IA */}
        <line
          x1={gearPositions[2].x + size / 2}
          y1={gearPositions[2].y + size / 2}
          x2={gearPositions[0].x + size / 2}
          y2={gearPositions[0].y + size / 2}
        />
      </motion.g>

      {/* Gears */}
      {gearPositions.map((position) => (
        <Gear
          key={position.id}
          {...position}
          size={size}
          isHovered={hoveredGear === position.id}
          onHoverChange={(id, hovered) => setHoveredGear(hovered ? id : null)}
          animationPhase={animationPhase}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}

      {/* Phase Indicator (solo para debug/accesibilidad) */}
      <motion.text
        x={containerSize / 2}
        y={containerSize - 20}
        textAnchor="middle"
        fontSize="12"
        fill="currentColor"
        opacity={0.4}
        pointerEvents="none"
      >
        {animationPhase === 'chaos' && 'Fase: Caos'}
        {animationPhase === 'sync' && 'Fase: Sincronización'}
        {animationPhase === 'acceleration' && 'Fase: Aceleración'}
      </motion.text>
    </motion.svg>
  );
};

export default GearAnimation;
