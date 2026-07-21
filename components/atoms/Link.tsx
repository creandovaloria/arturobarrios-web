'use client';

import { forwardRef } from 'react';
import React from 'react';
import NextLink from 'next/link';
import { cn } from '@lib/cn';
import type { LinkProps } from '@lib/types';

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      external = false,
      underline = 'hover',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const underlineClasses = {
      always: 'underline',
      hover: 'hover:underline',
      none: 'no-underline',
    };

    const baseClasses = cn(
      'text-brand-500 transition-colors duration-200 hover:text-brand-600',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
      underlineClasses[underline],
      className,
    );

    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink ref={ref} href={href} className={baseClasses} {...props}>
        {children}
      </NextLink>
    );
  },
);

Link.displayName = 'Link';

export default Link;
