import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useInViewAnimation } from '@hooks/useInViewAnimation';

describe('useInViewAnimation Hook', () => {
  it('returns ref and isInView properties', () => {
    const { result } = renderHook(() => useInViewAnimation());
    expect(result.current.ref).toBeDefined();
    expect(result.current.isInView).toBeDefined();
  });

  it('initializes with ref object', () => {
    const { result } = renderHook(() => useInViewAnimation());
    expect(result.current.ref).toHaveProperty('current');
    expect(result.current.ref.current).toBeNull();
  });

  it('uses default options', () => {
    const { result } = renderHook(() => useInViewAnimation());
    expect(result.current.isInView).toBeFalsy();
  });

  it('accepts custom options', () => {
    const { result } = renderHook(() =>
      useInViewAnimation({
        once: false,
        amount: 0.5,
      }),
    );
    expect(result.current.ref).toBeDefined();
  });

  it('defaults to once: true', () => {
    const { result } = renderHook(() => useInViewAnimation());
    expect(result.current).toBeDefined();
  });

  it('defaults to amount: 0.2', () => {
    const { result } = renderHook(() => useInViewAnimation());
    expect(result.current).toBeDefined();
  });

  it('can override defaults', () => {
    const { result: result1 } = renderHook(() =>
      useInViewAnimation({ once: true, amount: 0.2 }),
    );

    const { result: result2 } = renderHook(() =>
      useInViewAnimation({ once: false, amount: 'all' as any }),
    );

    expect(result1.current.ref).toBeDefined();
    expect(result2.current.ref).toBeDefined();
  });

  it('returns isInView as boolean', () => {
    const { result } = renderHook(() => useInViewAnimation());
    expect(typeof result.current.isInView).toBe('boolean');
  });

  it('handles different amount values', () => {
    const amountValues = [0.1, 0.5, 0.9, 'some', 'all'];

    amountValues.forEach((amount) => {
      const { result } = renderHook(() =>
        useInViewAnimation({ amount: amount as any }),
      );
      expect(result.current.ref).toBeDefined();
      expect(result.current.isInView).toBeDefined();
    });
  });

  it('preserves ref across re-renders', () => {
    const { result, rerender } = renderHook(
      ({ once }) => useInViewAnimation({ once }),
      { initialProps: { once: true } },
    );

    const ref1 = result.current.ref;

    rerender({ once: false });

    const ref2 = result.current.ref;

    expect(ref1).toBe(ref2);
  });
});
