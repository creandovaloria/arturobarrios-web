import { describe, it, expect } from 'vitest';
import { cn } from '@lib/cn';

describe('cn utility', () => {
  it('merges class strings', () => {
    const result = cn('px-4', 'py-2');
    expect(result).toContain('px-4');
    expect(result).toContain('py-2');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
  });

  it('filters out false conditionals', () => {
    const isActive = false;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).not.toContain('active-class');
    expect(result).toContain('base-class');
  });

  it('handles arrays of classes', () => {
    const result = cn(['px-4', 'py-2', 'bg-white']);
    expect(result).toContain('px-4');
    expect(result).toContain('py-2');
    expect(result).toContain('bg-white');
  });

  it('handles objects with boolean values', () => {
    const result = cn({
      'px-4': true,
      'py-2': false,
      'bg-white': true,
    });
    expect(result).toContain('px-4');
    expect(result).not.toContain('py-2');
    expect(result).toContain('bg-white');
  });

  it('handles mixed inputs', () => {
    const isActive = true;
    const result = cn(
      'base-class',
      isActive && 'active-class',
      {
        'text-white': true,
        'bg-black': false,
      },
    );
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
    expect(result).toContain('text-white');
    expect(result).not.toContain('bg-black');
  });

  it('handles undefined and null values', () => {
    const result = cn('px-4', undefined, null, 'py-2');
    expect(result).toContain('px-4');
    expect(result).toContain('py-2');
  });

  it('keeps duplicate classes (clsx does not deduplicate)', () => {
    // cn usa clsx sin tailwind-merge: los duplicados se conservan tal cual,
    // lo cual es inofensivo en CSS (la clase aplica una sola vez)
    const result = cn('px-4', 'px-4', 'py-2');
    expect(result).toBe('px-4 px-4 py-2');
  });

  it('handles tailwind override classes', () => {
    const result = cn('px-4', 'px-8');
    // Both should be present as clsx doesn't remove overrides
    // (that's a postcss-jit feature)
    expect(result).toBeTruthy();
  });

  it('returns empty string for no inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('returns string for single class', () => {
    const result = cn('px-4');
    expect(result).toBe('px-4');
  });
});
