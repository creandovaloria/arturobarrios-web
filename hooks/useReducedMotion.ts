'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    // Check initial preference
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}
