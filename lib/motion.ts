import type { Variants } from 'framer-motion';

export const springs = {
  smooth: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 1 },
  snappy: { type: 'spring' as const, stiffness: 300, damping: 24, mass: 0.8 },
  gentle: { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.1 },
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 15, mass: 1 },
  tight: { type: 'spring' as const, stiffness: 500, damping: 30, mass: 0.7 },
};

export const easings = {
  easeOutQuint: [0.23, 1, 0.32, 1] as [number, number, number, number],
  easeOutExpo: [0.19, 1, 0.22, 1] as [number, number, number, number],
  easeInOutSmooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  easeInQuad: [0.11, 0, 0.5, 0] as [number, number, number, number],
  easeStandard: [0.2, 0, 0, 1] as [number, number, number, number],
  easeLinear: [0, 0, 1, 1] as [number, number, number, number],
};

export const durations = {
  instant: 0.15,
  fast: 0.2,
  regular: 0.3,
  slow: 0.5,
  slower: 0.7,
  slowest: 1.0,
};

/* Animation variants */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.regular, ease: easings.easeOutQuint },
  },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.regular, ease: easings.easeOutQuint },
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.regular, ease: easings.easeOutQuint },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.regular, ease: easings.easeOutQuint },
  },
};

export const hoverScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: springs.snappy },
};

export const tapScaleVariants: Variants = {
  rest: { scale: 1 },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};
