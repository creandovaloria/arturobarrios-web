import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useCountUp } from '@hooks/useCountUp';

describe('useCountUp Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial formatted string', () => {
    const { result } = renderHook(() => useCountUp({ end: 100 }));
    expect(result.current).toBe('0');
  });

  it('animates from start to end', () => {
    const { result } = renderHook(() =>
      useCountUp({ start: 0, end: 100, duration: 1000 }),
    );

    expect(result.current).toBe('0');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Should be roughly halfway
    const midValue = parseInt(result.current, 10);
    expect(midValue).toBeGreaterThan(0);
    expect(midValue).toBeLessThan(100);
  });

  it('completes animation', () => {
    const { result } = renderHook(() =>
      useCountUp({ start: 0, end: 100, duration: 1000 }),
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('100');
  });

  it('respects trigger prop', () => {
    const { result, rerender } = renderHook(
      ({ trigger }) => useCountUp({ end: 100, duration: 1000, trigger }),
      { initialProps: { trigger: false } },
    );

    expect(result.current).toBe('0');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('0');

    rerender({ trigger: true });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('100');
  });

  it('formats with decimals', () => {
    const { result } = renderHook(() =>
      useCountUp({ end: 100, duration: 1000, decimals: 2 }),
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('100.00');
  });

  it('adds prefix and suffix', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 100,
        duration: 1000,
        prefix: '$',
        suffix: '%',
      }),
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('$100%');
  });

  it('uses custom start value', () => {
    const { result } = renderHook(() =>
      useCountUp({ start: 50, end: 100, duration: 1000 }),
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('100');
  });

  it('uses easing function', () => {
    const { result } = renderHook(() =>
      useCountUp({ start: 0, end: 100, duration: 1000 }),
    );

    const quarter = parseInt(result.current, 10);

    act(() => {
      vi.advanceTimersByTime(250);
    });

    const quarter1 = parseInt(result.current, 10);
    expect(quarter1).toBeLessThan(25); // Ease out quad starts slow

    act(() => {
      vi.advanceTimersByTime(750);
    });

    expect(result.current).toBe('100');
  });

  it('cleans up animation frame', () => {
    const { unmount } = renderHook(() =>
      useCountUp({ end: 100, duration: 1000 }),
    );

    unmount();

    // Should not throw
    expect(() => {
      vi.advanceTimersByTime(500);
    }).not.toThrow();
  });

  it('works with negative numbers', () => {
    const { result } = renderHook(() =>
      useCountUp({ start: 0, end: -100, duration: 1000 }),
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('-100');
  });
});
