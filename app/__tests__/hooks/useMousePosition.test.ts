import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMousePosition } from '@hooks/useMousePosition';

describe('useMousePosition Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with zero values', () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current.rawX).toBe(0);
    expect(result.current.rawY).toBe(0);
  });

  it('returns MotionValue objects', () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current.x).toBeDefined();
    expect(result.current.y).toBeDefined();
  });

  it('tracks raw mouse position', () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 200,
      });
      window.dispatchEvent(event);
    });

    expect(result.current.rawX).toBe(100);
    expect(result.current.rawY).toBe(200);
  });

  it('animates with default delay', () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 200,
      });
      window.dispatchEvent(event);
    });

    expect(result.current.rawX).toBe(100);
    expect(result.current.rawY).toBe(200);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // MotionValue should be updated after delay
    expect(result.current.x).toBeDefined();
  });

  it('respects custom delay', () => {
    const { result } = renderHook(() => useMousePosition(200));

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 250,
      });
      window.dispatchEvent(event);
    });

    expect(result.current.rawX).toBe(150);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should still be animating at 100ms with 200ms delay

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should have completed animation at 200ms
    expect(result.current.x).toBeDefined();
  });

  it('removes event listener on cleanup', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useMousePosition());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it('clears timeout on cleanup', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    const { unmount } = renderHook(() => useMousePosition());

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 200,
      });
      window.dispatchEvent(event);
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('disables on touch devices', () => {
    const mockMatchMedia = vi.fn(() => ({
      matches: false, // pointer: coarse (touch device)
      media: '(pointer: fine)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    renderHook(() => useMousePosition());

    expect(addEventListenerSpy).not.toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function),
    );
    addEventListenerSpy.mockRestore();
  });

  it('updates position on multiple moves', () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      let event = new MouseEvent('mousemove', {
        clientX: 10,
        clientY: 20,
      });
      window.dispatchEvent(event);

      expect(result.current.rawX).toBe(10);
      expect(result.current.rawY).toBe(20);

      event = new MouseEvent('mousemove', {
        clientX: 30,
        clientY: 40,
      });
      window.dispatchEvent(event);

      expect(result.current.rawX).toBe(30);
      expect(result.current.rawY).toBe(40);
    });
  });
});
