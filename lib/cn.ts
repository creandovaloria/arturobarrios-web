import clsx, { type ClassValue } from 'clsx';

/**
 * Merge classname strings with clsx
 * Handles conditional classnames and arrays
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
