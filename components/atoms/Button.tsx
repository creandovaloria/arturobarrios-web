'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@lib/cn';
import { springs } from '@lib/motion';
import type { ButtonProps } from '@lib/types';

const buttonVariants = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 disabled:bg-neutral-300 disabled:text-neutral-500',
  secondary:
    'bg-neutral-200 text-fg hover:bg-neutral-300 active:bg-neutral-400 disabled:bg-neutral-100 disabled:text-neutral-400',
  ghost:
    'bg-transparent text-fg hover:bg-neutral-100 active:bg-neutral-200 disabled:text-neutral-400',
  outline:
    'border-2 border-brand-500 text-brand-500 hover:bg-brand-50 active:bg-brand-100 disabled:border-neutral-300 disabled:text-neutral-300',
};

const sizeVariants = {
  sm: 'px-3 py-1.5 text-body-sm font-medium rounded-md',
  md: 'px-4 py-2.5 text-body font-medium rounded-lg',
  lg: 'px-6 py-3 text-body font-semibold rounded-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      type = 'button',
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed',
          buttonVariants[variant],
          sizeVariants[size],
          className,
        )}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        transition={springs.snappy}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
