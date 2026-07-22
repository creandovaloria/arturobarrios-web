# Testing Strategy for arturobarrios-web

This document outlines the comprehensive testing strategy for the arturobarrios-web project, including unit tests, integration tests, E2E tests, accessibility audits, and performance testing.

## Overview

The project follows a multi-layered testing approach:

- **Unit Tests** (Vitest + React Testing Library) - Test individual components and utilities
- **Integration Tests** (Vitest + React Testing Library) - Test component combinations
- **E2E Tests** (Playwright) - Test complete user flows across browsers
- **Accessibility Tests** (pa11y-ci + axe-core) - Test WCAG AA compliance
- **Performance Tests** (Lighthouse) - Test Core Web Vitals and performance metrics

## Testing Stack

| Tool | Purpose | Config |
|------|---------|--------|
| **Vitest** | Unit & Integration tests | `vitest.config.ts` |
| **React Testing Library** | Component testing utilities | `app/__tests__/setup.ts` |
| **@testing-library/user-event** | User interaction simulation | `app/__tests__/setup.ts` |
| **Playwright** | E2E & cross-browser testing | `playwright.config.ts` |
| **pa11y-ci** | Accessibility automation | `.pa11yci.json` |
| **axe-core** | Automated a11y testing | Integrated in pa11y |
| **Lighthouse** | Performance metrics | GitHub Actions |
| **JSDOM** | DOM environment for tests | `vitest.config.ts` |

## Test Structure

```
app/__tests__/
├── setup.ts                  # Vitest global setup
├── components/
│   ├── Button.test.tsx       # Button component tests
│   ├── Card.test.tsx         # Card component tests
│   ├── Badge.test.tsx        # Badge component tests
│   └── Input.test.tsx        # Input component tests
├── hooks/
│   ├── useCountUp.test.ts    # useCountUp hook tests
│   ├── useReducedMotion.test.ts
│   ├── useMousePosition.test.ts
│   └── useInViewAnimation.test.ts
├── lib/
│   └── cn.test.ts            # Utility function tests
├── integration/
│   └── Components.test.tsx   # Component integration tests
└── e2e/
    └── homepage.spec.ts      # E2E flow tests
```

## Running Tests

### Unit & Integration Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run specific test file
npm run test -- Button.test.tsx
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui

# Run specific E2E test
npm run test:e2e -- homepage.spec.ts

# Run tests in specific browser
npm run test:e2e -- --project=chromium
```

### Accessibility Tests

```bash
# Run accessibility tests (requires dev server running)
npm run dev
npm run test:a11y
```

### Performance Tests

```bash
# Run Lighthouse tests (requires server running)
npm run build
npm run start
npm run test:lighthouse
```

### Run All Tests

```bash
npm run test:all
```

## Test Coverage Goals

| Category | Target | Current |
|----------|--------|---------|
| **Statements** | >80% | TBD |
| **Branches** | >80% | TBD |
| **Functions** | >80% | TBD |
| **Lines** | >80% | TBD |

## Testing Patterns

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Button from '@components/atoms/Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCountUp } from '@hooks/useCountUp';

describe('useCountUp Hook', () => {
  it('animates from start to end', () => {
    const { result } = renderHook(() =>
      useCountUp({ start: 0, end: 100, duration: 1000 })
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('100');
  });
});
```

### E2E Testing

```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
  test('loads homepage successfully', async ({ page }) => {
    await page.goto('/');
    expect(page.url()).toContain('/');
  });

  test('all buttons are accessible', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeVisible();
    }
  });
});
```

## Key Test Scenarios

### Button Component
- ✓ Renders with text content
- ✓ Supports multiple variants (primary, secondary, ghost, outline)
- ✓ Supports multiple sizes (sm, md, lg)
- ✓ Handles click events
- ✓ Respects disabled state
- ✓ Applies custom classes
- ✓ Supports different button types (submit, reset, button)
- ✓ Has focus ring for accessibility
- ✓ Forwards ref correctly

### Card Component
- ✓ Renders with content
- ✓ Supports multiple variants (elevated, outlined, filled)
- ✓ Supports padding variants
- ✓ Has interactive mode with hover effects
- ✓ Handles click events when interactive
- ✓ Applies custom classes
- ✓ Forwards ref correctly

### Input Component
- ✓ Renders input field
- ✓ Renders with label
- ✓ Shows error messages
- ✓ Shows hint text
- ✓ Hides hint when error is present
- ✓ Supports different sizes and variants
- ✓ Handles disabled state
- ✓ Captures user input
- ✓ Supports icons
- ✓ Has error styling

### Hooks
- ✓ useCountUp: Animates numbers with easing
- ✓ useReducedMotion: Respects user preferences
- ✓ useMousePosition: Tracks mouse with delay
- ✓ useInViewAnimation: Detects when element enters viewport

### E2E Flows
- ✓ Homepage loads successfully
- ✓ Hero section is visible
- ✓ All buttons are accessible and enabled
- ✓ Navigation works correctly
- ✓ Page is responsive on all breakpoints
- ✓ All images have alt text
- ✓ Form inputs are accessible
- ✓ Scrolling works smoothly
- ✓ No console errors
- ✓ Proper meta tags present
- ✓ Keyboard navigation works
- ✓ Focus states are visible

## Accessibility Testing

### WCAG AA Standards Checked
- ✓ Contrast Ratios (18:1 verified)
- ✓ Focus Indicators
- ✓ Semantic HTML
- ✓ ARIA Labels
- ✓ prefers-reduced-motion Support
- ✓ Alt Text for Images
- ✓ Form Labels
- ✓ Button Roles
- ✓ Link Purposes

### Pages Tested
- Homepage `/`
- About page (if available)
- Services page (if available)
- Blog page (if available)
- Contact page (if available)

## Mobile Testing

### Viewports Tested
- **Mobile**: 375px x 812px (iPhone 12)
- **Tablet**: 768px x 1024px (iPad)
- **Desktop**: 1280px x 800px (Desktop)

### Mobile Features Tested
- Touch interactions
- Swipe gestures
- Mobile keyboard behavior
- Responsive layouts
- Form input on mobile

## Performance Targets (Lighthouse)

| Metric | Target |
|--------|--------|
| **Largest Contentful Paint (LCP)** | < 2.0s |
| **First Input Delay (FID)** | < 100ms |
| **Cumulative Layout Shift (CLS)** | < 0.1 |
| **Performance Score** | ≥ 95 |
| **Accessibility Score** | ≥ 95 |
| **Best Practices Score** | ≥ 90 |
| **SEO Score** | ≥ 90 |

## CI/CD Pipeline

The testing pipeline runs on:
- **Push** to main/develop branches
- **Pull Requests** to main/develop branches
- **Node versions**: 18.x, 20.x

### Test Execution Order
1. **Linting** (ESLint) - Code quality
2. **Unit Tests** (Vitest) - Component & utility tests
3. **Coverage Report** (Codecov) - Coverage tracking
4. **Build** (Next.js) - Verify production build
5. **E2E Tests** (Playwright) - Full user flows
6. **Accessibility** (pa11y-ci) - WCAG compliance
7. **Performance** (Lighthouse) - Core Web Vitals

## Best Practices

### ✓ Do
- Write tests that focus on user behavior, not implementation
- Use `screen` queries (getByRole, getByLabelText) over container queries
- Mock external APIs and heavy computations
- Test accessibility features (focus, keyboard navigation)
- Use `userEvent` instead of `fireEvent` for realistic interactions
- Keep tests isolated and independent
- Clean up after each test (handled by setup.ts)

### ✗ Don't
- Test implementation details (avoid testing internal state)
- Use deprecated testing library queries
- Write tests that depend on execution order
- Mock too much (test real component behavior)
- Use hardcoded delays or flaky waits
- Ignore accessibility in component tests

## Troubleshooting

### Tests Failing Locally

1. **Clear cache**: `npm run test -- --clearCache`
2. **Reinstall dependencies**: `rm -rf node_modules && npm install`
3. **Check Node version**: Ensure Node 18+ is installed
4. **Update snapshots**: `npm run test -- --update`

### E2E Tests Timing Out

1. **Increase timeout**: Update playwright.config.ts
2. **Check server**: Ensure `npm run dev` is running
3. **Port conflict**: Verify port 3000 is available
4. **Network issues**: Check internet connection

### Coverage Not Meeting Goals

1. **Run coverage**: `npm run test:coverage`
2. **View report**: Open `coverage/index.html`
3. **Add tests**: Add tests for uncovered lines
4. **Check exclusions**: Update `.gitignore` patterns in vitest.config.ts

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)

## Contribution Guidelines

When contributing:

1. Write tests for new components/features
2. Ensure coverage targets are met
3. Test on mobile and desktop viewports
4. Verify accessibility with screen readers
5. Run full test suite before submitting PR
6. Fix any linting or test failures

```bash
# Before pushing
npm run test:all
```

## Maintenance

- Review test coverage monthly
- Update test snapshots with care
- Keep browser versions current in Playwright
- Monitor and optimize slow tests
- Update accessibility standards as needed
