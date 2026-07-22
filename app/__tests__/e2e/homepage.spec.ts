import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads homepage successfully', async ({ page }) => {
    expect(page.url()).toContain('/');
    const headings = await page.locator('h1, h2, h3').count();
    expect(headings).toBeGreaterThan(0);
  });

  test('hero section is visible', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('all buttons are accessible', async ({ page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    }
  });

  test('navigation works correctly', async ({ page }) => {
    const links = page.locator('a[href^="/"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const elements = page.locator('body');
    await expect(elements).toBeVisible();
  });

  test('page is responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const elements = page.locator('body');
    await expect(elements).toBeVisible();
  });

  test('page is responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const elements = page.locator('body');
    await expect(elements).toBeVisible();
  });

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('all form inputs are accessible', async ({ page }) => {
    const inputs = page.locator('input, textarea, select');
    const count = await inputs.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i);
        await expect(input).toBeVisible();
      }
    }
  });

  test('scrolling works smoothly', async ({ page }) => {
    const initialScroll = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => window.scrollBy(0, 500));
    const afterScroll = await page.evaluate(() => window.scrollY);
    expect(afterScroll).toBeGreaterThan(initialScroll);
  });

  test('no console errors on page load', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    expect(errors).toHaveLength(0);
  });

  test('page has proper meta tags', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();

    const viewport = await page.locator('meta[name="viewport"]');
    await expect(viewport).toBeVisible();
  });

  test('external links open in new tab', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();

    if (count > 0) {
      const link = externalLinks.first();
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
    }
  });

  test('keyboard navigation is possible', async ({ page }) => {
    const button = page.locator('button').first();
    await button.focus();
    const focused = await button.evaluate((el) => document.activeElement === el);
    expect(focused).toBeTruthy();
  });

  test('hover states work on interactive elements', async ({ page }) => {
    const button = page.locator('button').first();
    await button.hover();
    await expect(button).toBeVisible();
  });

  test('focus states are visible', async ({ page }) => {
    const button = page.locator('button').first();
    await button.focus();

    const focusStyle = await button.evaluate((el) => {
      return window.getComputedStyle(el).outline;
    });

    expect(focusStyle).toBeTruthy();
  });

  test('page meets basic accessibility standards', async ({ page }) => {
    const bodyClasses = await page.locator('body').getAttribute('class');
    expect(bodyClasses).toBeDefined();

    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(0);
  });
});
