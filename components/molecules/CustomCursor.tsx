'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition, useMagneticCursor, useReducedMotion } from '@hooks';

interface CustomCursorState {
  isVisible: boolean;
  isActive: boolean;
  scale: number;
  color: string;
}

/**
 * Componente de cursor personalizado con efecto magnético
 * - Sigue el mouse con 100ms delay
 * - Efecto magnético en elementos [data-magnetic]
 * - Cambio de escala/color al hover
 * - Desactivado en mobile (pointer: coarse)
 * - Respeta prefers-reduced-motion
 *
 * Debes agregar cursor: none; al body o elemento padre para ocultar el cursor nativo
 */
export const CustomCursor: React.FC = () => {
  const [state, setState] = useState<CustomCursorState>({
    isVisible: false,
    isActive: false,
    scale: 1,
    color: '#2e5bff', // brand-500
  });

  const prefersReducedMotion = useReducedMotion();
  const { x, y } = useMousePosition(100);
  const magneticState = useMagneticCursor(x, y, 0.3, 80);

  // Detectar si es desktop (pointer: fine)
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Mostrar/ocultar cursor cuando se mueve el mouse
  useEffect(() => {
    const handleMouseEnter = () => {
      setState((prev) => ({ ...prev, isVisible: true }));
    };

    const handleMouseLeave = () => {
      setState((prev) => ({ ...prev, isVisible: false }));
    };

    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Detectar clicks en elementos interactivos
  useEffect(() => {
    const handleMouseDown = () => {
      setState((prev) => ({ ...prev, scale: 0.7 }));
    };

    const handleMouseUp = () => {
      setState((prev) => ({ ...prev, scale: magneticState.isHovering ? 1.4 : 1 }));
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [magneticState.isHovering]);

  // Actualizar scale y color basado en magnetic state
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      scale: magneticState.isHovering ? 1.4 : 1,
      color: magneticState.isHovering ? '#1e47ff' : '#2e5bff', // brand-600 on hover
    }));
  }, [magneticState.isHovering]);

  // No renderizar si:
  // 1. No es desktop
  // 2. Prefers reduced motion está activo
  if (!isDesktop || prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-50"
      style={{
        x: x,
        y: y,
        left: 0,
        top: 0,
      }}
      animate={{
        scale: state.scale,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      {/* Círculo exterior (anillo) */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 pointer-events-none"
        style={{
          width: '32px',
          height: '32px',
          borderColor: state.color,
          opacity: state.isVisible ? 1 : 0,
        }}
        animate={{
          borderColor: state.color,
          scale: state.scale,
        }}
        transition={{
          duration: 0.2,
        }}
      />

      {/* Círculo interior (punto) */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: state.color,
          opacity: state.isVisible ? 1 : 0,
        }}
        animate={{
          backgroundColor: state.color,
        }}
        transition={{
          duration: 0.2,
        }}
      />

      {/* Efecto glow (solo en hover) */}
      {magneticState.isHovering && (
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: state.color,
            filter: 'blur(8px)',
            opacity: 0.2,
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      )}
    </motion.div>
  );
};

export default CustomCursor;
