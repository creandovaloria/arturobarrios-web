'use client';

import { forwardRef } from 'react';
import { cn } from '@lib/cn';
import type { IconProps } from '@lib/types';

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const Icon = forwardRef<SVGSVGElement, IconProps & { children?: React.ReactNode }>(
  (
    {
      size = 'md',
      color = 'currentColor',
      strokeWidth = 2,
      fill = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const sizeValue = typeof size === 'number' ? size : sizeMap[size as keyof typeof sizeMap];

    return (
      <svg
        ref={ref}
        width={sizeValue}
        height={sizeValue}
        viewBox="0 0 24 24"
        fill={fill ? color : 'none'}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('inline-flex', className)}
        {...props}
      >
        {children}
      </svg>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
