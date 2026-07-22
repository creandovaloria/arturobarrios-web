import React from 'react';
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { vi } from 'vitest';

/**
 * Custom render function that wraps components with necessary providers
 * Use this instead of render() for components that need context providers
 */
const Providers = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };

/**
 * Helper to create mock props for components
 */
export const createMockProps = <T extends Record<string, any>>(
  props: Partial<T>,
): T => {
  return props as T;
};

/**
 * Helper to test responsive breakpoints
 */
export const testBreakpoint = async (
  breakpoint: 'mobile' | 'tablet' | 'desktop',
  testFn: (width: number, height: number) => Promise<void>,
) => {
  const sizes = {
    mobile: { width: 375, height: 812 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 800 },
  };

  const { width, height } = sizes[breakpoint];
  await testFn(width, height);
};

/**
 * Helper to wait for animations to complete
 */
export const waitForAnimations = () => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};

/**
 * Helper to setup form data
 */
export const createFormData = <T extends Record<string, any>>(
  data: Partial<T>,
): T => {
  return data as T;
};

/**
 * Helper to test keyboard navigation
 */
export const testKeyboardNavigation = async (
  element: HTMLElement,
  key: 'Enter' | 'Space' | 'Escape' | 'ArrowUp' | 'ArrowDown',
) => {
  const event = new KeyboardEvent('keydown', { key });
  element.dispatchEvent(event);
  return event;
};

/**
 * Helper to test focus management
 */
export const testFocusManagement = (element: HTMLElement) => {
  element.focus();
  return document.activeElement === element;
};

/**
 * Helper to create mock intersection observer
 */
export const createMockIntersectionObserver = (visible: boolean) => {
  const mockIntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: () => [
      {
        isIntersecting: visible,
        target: document.createElement('div'),
      },
    ],
  }));

  global.IntersectionObserver = mockIntersectionObserver as any;
};

/**
 * Helper for testing match media queries
 */
export const createMockMatchMedia = (matches: boolean) => {
  return vi.fn(() => ({
    matches,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};
