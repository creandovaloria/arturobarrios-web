'use client';

import { forwardRef } from 'react';
import { cn } from '@lib/cn';
import type { KickerProps } from '@lib/types';

const colorVariants = {
  brand: 'text-brand-500',
  neutral: 'text-neutral-600',
  success: 'text-status-success',
  warning: 'text-status-warning',
  error: 'text-status-error',
  info: 'text-status-info',
};

const Kicker = forwardRef<HTMLSpanElement, KickerProps>(
  ({ color = 'brand', uppercase = true, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'text-kicker font-semibold tracking-wide',
          uppercase && 'uppercase',
          colorVariants[color],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Kicker.displayName = 'Kicker';

export default Kicker;
