'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easings, durations } from '@lib/motion';
import { useReducedMotion } from '@hooks';

interface MorphingTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * Componente que muestra una palabra que cambia periódicamente
 * Animación: fadeOut (100ms) → cambiar palabra → fadeIn (200ms)
 * Loop cada 3 segundos (configurable)
 *
 * Respeta prefers-reduced-motion: si activo, muestra solo la primera palabra
 *
 * @param words - Array de palabras a mostrar
 * @param interval - Intervalo en ms entre cambios (default: 3000ms)
 * @param className - Clases adicionales
 */
export const MorphingText: React.FC<MorphingTextProps> = ({
  words,
  interval = 3000,
  className = '',
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || words.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval, prefersReducedMotion]);

  const currentWord = words[currentWordIndex];

  // Si prefers-reduced-motion está activo, mostrar solo la primera palabra sin animar
  if (prefersReducedMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: durations.fast,
          ease: easings.easeOutExpo,
        }}
        className={className}
      >
        {currentWord}
      </motion.span>
    </AnimatePresence>
  );
};

export default MorphingText;
