'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseInViewAnimationOptions {
  once?: boolean;
  amount?: 'some' | 'all' | number;
  margin?: string | number;
}

export function useInViewAnimation(options: UseInViewAnimationOptions = {}) {
  const { once = true, amount = 0.2 } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount,
  });

  return { ref, isInView };
}
