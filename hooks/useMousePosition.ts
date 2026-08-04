'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

/**
 * Hook para rastrear la posición del mouse con delay suave
 * Ideal para efectos de cursor magnético y parallax
 *
 * @param delay - Retraso en ms para suavizar el seguimiento (default: 100ms)
 * @returns Objeto con valores MotionValue interpolados y posición raw
 */
export function useMousePosition(
  delay: number = 100,
): {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rawX: number;
  rawY: number;
} {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const posRef = useRef({ rawX: 0, rawY: 0 });

  useEffect(() => {
    // Detectar si el dispositivo soporta pointer fine (mouse, stylus)
    // En mobile (pointer: coarse) desactivamos este efecto
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleMouseMove = (event: MouseEvent) => {
      posRef.current.rawX = event.clientX;
      posRef.current.rawY = event.clientY;

      // Animar hacia la posición actual con delay
      const animate = () => {
        x.set(event.clientX);
        y.set(event.clientY);
      };

      clearTimeout(timeoutId);
      timeoutId = setTimeout(animate, delay);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [delay, x, y]);

  return {
    x,
    y,
    // Getters: leer siempre el valor actual del ref, no una copia
    // congelada en el último render (el hook no re-renderiza en mousemove)
    get rawX() {
      return posRef.current.rawX;
    },
    get rawY() {
      return posRef.current.rawY;
    },
  };
}
