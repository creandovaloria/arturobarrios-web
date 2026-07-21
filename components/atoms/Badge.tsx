'use client';

import { forwardRef } from 'react';
import { cn } from '@lib/cn';
import type { BadgeProps } from '@lib/types';

const variantStyles = {
  solid: {
    brand: 'bg-brand-500 text-white',
    neutral: 'bg-neutral-500 text-white',
    success: 'bg-status-success text-white',
    warning: 'bg-status-warning text-white',
    error: 'bg-status-error text-white',
    info: 'bg-status-info text-white',
  },
  outline: {
    brand: 'border border-brand-500 text-brand-500 bg-transparent',
    neutral: 'border border-neutral-500 text-neutral-500 bg-transparent',
    success: 'border border-status-success text-status-success bg-transparent',
    warning: 'border border-status-warning text-status-warning bg-transparent',
    error: 'border border-status-error text-status-error bg-transparent',
    info: 'border border-status-info text-status-info bg-transparent',
  },
  soft: {
    brand: 'bg-brand-100 text-brand-900',
    neutral: 'bg-neutral-100 text-neutral-900',
    success: 'bg-green-100 text-green-900',
    warning: 'bg-amber-100 text-amber-900',
    error: 'bg-red-100 text-red-900',
    info: 'bg-blue-100 text-blue-900',
  },
};

const sizeVariants = {
  sm: 'px-2 py-1 text-body-xs font-medium rounded-md',
  md: 'px-3 py-1.5 text-body-sm font-medium rounded-md',
  lg: 'px-4 py-2 text-body font-semibold rounded-lg',
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = 'solid', size = 'md', color = 'brand', className, children, ...props },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center',
          sizeVariants[size],
          variantStyles[variant][color],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
