'use client';

import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  trigger?: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  trigger = true,
  decimals = 0,
  prefix = '',
  suffix = '',
}: UseCountUpOptions): string {
  const [count, setCount] = useState(start);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - (startTimeRef.current || 0);
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutQuad
      const easeProgress = 1 - Math.pow(1 - progress, 2);
      const currentCount = start + (end - start) * easeProgress;

      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      startTimeRef.current = null;
    };
  }, [end, duration, start, trigger, decimals]);

  return `${prefix}${count.toFixed(decimals)}${suffix}`;
}
