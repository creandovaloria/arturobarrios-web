'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@lib/cn';
import type { InputProps } from '@lib/types';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      variant = 'default',
      icon,
      className,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-body-sm',
      md: 'px-4 py-2.5 text-body',
      lg: 'px-6 py-3 text-body',
    };

    const variantClasses = {
      default: 'border border-neutral-300 bg-white',
      ghost: 'border-b-2 border-neutral-300 bg-transparent',
    };

    return (
      <div className={cn('w-full', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body font-medium text-fg mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'w-full font-body rounded-lg transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
              'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
              'placeholder:text-neutral-400',
              sizeClasses[size],
              variantClasses[variant],
              icon && 'pl-10',
              error && 'border-status-error focus:ring-status-error',
            )}
            {...props}
          />
          {icon && <div className="absolute left-3 text-neutral-500">{icon}</div>}
        </div>

        {error && <p className="text-body-sm text-status-error mt-1">{error}</p>}
        {hint && !error && <p className="text-body-sm text-fg-muted mt-1">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
