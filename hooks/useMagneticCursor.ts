'use client';

import { useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';

interface MagneticCursorState {
  isHovering: boolean;
  targetX: number;
  targetY: number;
}

/**
 * Hook para calcular el efecto magnético del cursor sobre elementos
 * El cursor se "atrae" hacia elementos con data-magnetic cuando están cerca
 *
 * @param mouseX - MotionValue con posición X del mouse
 * @param mouseY - MotionValue con posición Y del mouse
 * @param magneticStrength - Fuerza de atracción (0-1, default: 0.3)
 * @param detectionRadius - Radio de detección en píxeles (default: 80)
 * @returns Estado de magnetic cursor
 */
export function useMagneticCursor(
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>,
  magneticStrength: number = 0.3,
  detectionRadius: number = 80,
) {
  const [state, setState] = useState<MagneticCursorState>({
    isHovering: false,
    targetX: 0,
    targetY: 0,
  });

  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    // Detectar si el dispositivo soporta pointer fine
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    const animate = () => {
      const magneticElements = document.querySelectorAll('[data-magnetic]');
      let isOverAny = false;
      let targetX = mouseX.get();
      let targetY = mouseY.get();

      magneticElements.forEach((element) => {
        if (!(element instanceof HTMLElement)) return;

        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;

        const currentMouseX = mouseX.get();
        const currentMouseY = mouseY.get();

        const distX = elementCenterX - currentMouseX;
        const distY = elementCenterY - currentMouseY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Si el mouse está dentro del radio de detección
        if (distance < detectionRadius) {
          isOverAny = true;
          // Atraer el cursor hacia el elemento con la fuerza especificada
          targetX += distX * magneticStrength;
          targetY += distY * magneticStrength;
        }
      });

      setState({
        isHovering: isOverAny,
        targetX,
        targetY,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mouseX, mouseY, magneticStrength, detectionRadius]);

  return state;
}
