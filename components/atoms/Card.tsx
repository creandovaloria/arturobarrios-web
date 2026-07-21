'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@lib/cn';
import type { CardProps } from '@lib/types';

const variantStyles = {
  elevated: 'border border-neutral-200 bg-white shadow-md',
  outlined: 'border-2 border-neutral-200 bg-paper',
  filled: 'bg-surface border-none',
};

const paddingVariants = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      padding = 'md',
      interactive = false,
      className,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = interactive ? motion.div : 'div';
    const commonProps = {
      ref,
      className: cn(
        'rounded-lg transition-all duration-200',
        variantStyles[variant],
        paddingVariants[padding],
        interactive && 'cursor-pointer hover:shadow-lg',
        className,
      ),
      onClick,
      ...props,
    };

    if (interactive) {
      return (
        <Component
          {...commonProps}
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {children}
        </Component>
      );
    }

    return <div {...commonProps}>{children}</div>;
  },
);

Card.displayName = 'Card';

export default Card;
