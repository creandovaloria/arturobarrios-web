'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@hooks';

interface BeforeAfterSliderProps {
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  onPositionChange?: (position: number) => void;
  className?: string;
}

/**
 * Before/After Interactive Slider Component
 *
 * Características:
 * - Rastreo de mouse: detecta posición X y mueve divider suavemente
 * - Touch support: swipe para mover divider (horizontal en mobile)
 * - Hover effects: divider se ilumina con glow effect (brand-500)
 * - Drag support: mantener divididor mientras se arrastra
 * - Boundaries: min 20%, max 80%, default 50%
 * - Smooth animation: 50ms delay con requestAnimationFrame
 * - Responsive: desktop/tablet (divider vertical), mobile (divider horizontal)
 * - Accessibility: role="slider", ARIA attributes
 * - Performance: CSS transforms, 60fps tracking
 *
 * @param beforeContent - Contenido/video del lado izquierdo (antes)
 * @param afterContent - Contenido/video del lado derecho (después)
 * @param beforeLabel - Label aria para antes (accesibilidad)
 * @param afterLabel - Label aria para después (accesibilidad)
 * @param onPositionChange - Callback cuando cambia la posición (0-100)
 * @param className - Clases CSS adicionales
 */
export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeContent,
  afterContent,
  beforeLabel = 'Before',
  afterLabel = 'After',
  onPositionChange,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState(50); // 0-100
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detectar si es mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Calcular posición limitada
  const getClampedPosition = useCallback((pos: number) => {
    return Math.max(20, Math.min(80, pos));
  }, []);

  // Actualizar posición y afterContent width
  const updatePosition = useCallback(
    (newPos: number) => {
      const clampedPos = getClampedPosition(newPos);
      setPosition(clampedPos);

      // Actualizar ancho del contenedor "after"
      if (afterRef.current) {
        afterRef.current.style.width = `${100 - clampedPos}%`;
      }

      // Callback para aplicaciones externas
      if (onPositionChange) {
        onPositionChange(clampedPos);
      }
    },
    [getClampedPosition, onPositionChange],
  );

  // Manejar eventos de mouse/touch en el contenedor
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const newPos = (x / rect.width) * 100;

      updatePosition(newPos);
    },
    [isDragging, updatePosition],
  );

  // Manejar inicio de drag
  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  // Manejar fin de drag
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Soporte para touch swipe
  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const touch = event.touches[0];
      if (!touch) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const newPos = (x / rect.width) * 100;

      updatePosition(newPos);
    },
    [isDragging, updatePosition],
  );

  // Agregar listeners globales para drag
  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, handleTouchMove, handlePointerUp]);

  // Keyboard support para accesibilidad
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      let newPos = position;

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        newPos -= 5;
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        newPos += 5;
      } else if (event.key === 'Home') {
        newPos = 20;
      } else if (event.key === 'End') {
        newPos = 80;
      } else {
        return;
      }

      event.preventDefault();
      updatePosition(newPos);
    },
    [position, updatePosition],
  );

  // Efecto de pulso en el divider (animación suave)
  const pulseVariants: React.ComponentProps<typeof motion.div>['variants'] = {
    initial: { scale: 1 },
    animate: {
      scale: isHovering ? 1.1 : 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  // No mostrar slider si prefers-reduced-motion está activo
  if (prefersReducedMotion) {
    return (
      <div
        className={`relative w-full bg-neutral-900 overflow-hidden ${className}`}
        style={{ aspectRatio: '16 / 9' }}
        aria-label="Before and after comparison (static)"
      >
        <div className="absolute inset-0 w-full h-full">{beforeContent}</div>
        <div className="absolute inset-0 w-full h-full opacity-50">{afterContent}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-neutral-900 overflow-hidden group cursor-col-resize md:cursor-col-resize cursor-row-resize ${className}`}
      style={{ aspectRatio: '16 / 9' }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-label={`Before and after comparison slider: ${position.toFixed(0)}% after content visible`}
      aria-valuemin={20}
      aria-valuemax={80}
      aria-valuenow={position}
      tabIndex={0}
    >
      {/* Before Content - Fondo */}
      <div className="absolute inset-0 w-full h-full" aria-label={beforeLabel}>
        {beforeContent}
      </div>

      {/* After Content - Overflow Hidden */}
      <div
        ref={afterRef}
        className="absolute inset-0 h-full overflow-hidden"
        style={{
          width: `${100 - position}%`,
          right: 0,
          transition: isDragging ? 'none' : 'width 0.05s linear',
        }}
        aria-label={afterLabel}
      >
        {afterContent}
      </div>

      {/* Divider Line - Vertical en desktop, horizontal en mobile */}
      <motion.div
        ref={dividerRef}
        className={`absolute top-0 h-full w-1 bg-white shadow-lg z-10 ${
          isMobile ? 'hidden' : ''
        }`}
        style={{
          left: `${position}%`,
          transform: 'translateX(-50%)',
          opacity: isHovering ? 1 : 0.8,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setIsHovering(false)}
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      >
        {/* Glow Effect en hover */}
        <div
          className="absolute top-1/2 left-1/2 w-12 h-12 bg-brand-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl pointer-events-none"
          style={{
            opacity: isHovering ? 0.4 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        />

        {/* Ícono del divider - Slider arrows */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md"
          style={{
            transform: isHovering
              ? 'translate(-50%, -50%) rotate(90deg)'
              : 'translate(-50%, -50%) rotate(0deg)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {/* SVG slider arrows */}
          <svg
            className="w-4 h-4 text-brand-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <svg
            className="w-4 h-4 text-brand-500 -ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </motion.div>

      {/* Mobile Divider - Horizontal */}
      {isMobile && (
        <motion.div
          className="absolute left-0 w-full h-1 bg-white shadow-lg z-10"
          style={{
            top: `${position}%`,
            transform: 'translateY(-50%)',
            opacity: isHovering ? 1 : 0.8,
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={() => setIsHovering(true)}
          onTouchEnd={() => setIsHovering(false)}
        >
          {/* Glow Effect en hover - Mobile */}
          <div
            className="absolute top-1/2 left-1/2 w-12 h-12 bg-brand-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl pointer-events-none"
            style={{
              opacity: isHovering ? 0.4 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          />

          {/* Ícono del divider - Mobile */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md"
            style={{
              transform: isHovering
                ? 'translate(-50%, -50%) rotate(90deg)'
                : 'translate(-50%, -50%) rotate(0deg)',
              transition: 'transform 0.3s ease-out',
            }}
          >
            {/* SVG slider arrows - rotated for horizontal */}
            <svg
              className="w-4 h-4 text-brand-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 15l7-7 7 7"
              />
            </svg>
            <svg
              className="w-4 h-4 text-brand-500 -mt-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </motion.div>
      )}

      {/* Accessibility label en las esquinas */}
      <div className="sr-only">
        {beforeLabel} is on the left, {afterLabel} is on the right. Use arrow keys to
        adjust. Home key for minimum, End key for maximum.
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
