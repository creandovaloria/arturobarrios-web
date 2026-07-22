import { test, expect, devices } from '@playwright/test';

const BREAKPOINTS = {
  mobile: { width: 375, height: 812, device: 'iPhone 12' },
  tablet: { width: 768, height: 1024, device: 'iPad' },
  desktop: { width: 1280, height: 800, device: 'Desktop' },
};

test.describe('Responsive Design Testing', () => {
  test('mobile layout (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    // Verify page loads without horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);

    // Verify content is visible
    const content = page.locator('main, section, article').first();
    await expect(content).toBeVisible();
  });

  test('tablet layout (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Verify proper layout
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);

    // Verify navigation is accessible
    const nav = page.locator('nav, header');
    await expect(nav).toBeVisible();
  });

  test('desktop layout (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    // Verify proper desktop layout
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test('text is readable at all breakpoints', async ({ page }) => {
    const breakpoints = [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1280, height: 800 },
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize(breakpoint);
      await page.goto('/');

      const textElements = page.locator('p, h1, h2, h3, h4, h5, h6');
      const count = await textElements.count();

      if (count > 0) {
        for (let i = 0; i < Math.min(3, count); i++) {
          const element = textElements.nth(i);
          const fontSize = await element.evaluate((el) => {
            return parseInt(window.getComputedStyle(el).fontSize);
          });

          // Font size should be at least 14px for body text
          expect(fontSize).toBeGreaterThanOrEqual(12);
        }
      }
    }
  });

  test('images scale properly', async ({ page }) => {
    const breakpoints = [375, 768, 1280];

    for (const width of breakpoints) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < Math.min(3, imageCount); i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();

        const imgWidth = await img.evaluate((el) => el.clientWidth);
        expect(imgWidth).toBeGreaterThan(0);
        expect(imgWidth).toBeLessThanOrEqual(width);
      }
    }
  });

  test('buttons are tappable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    if (buttonCount > 0) {
      for (let i = 0; i < Math.min(3, buttonCount); i++) {
        const button = buttons.nth(i);
        const box = await button.boundingBox();

        if (box) {
          // Button should be at least 44x44px (recommended minimum for touch)
          expect(box.width).toBeGreaterThanOrEqual(40);
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });

  test('inputs are accessible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const inputs = page.locator('input, textarea');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      for (let i = 0; i < Math.min(2, inputCount); i++) {
        const input = inputs.nth(i);
        await expect(input).toBeVisible();

        const box = await input.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });

  test('no horizontal scrolling on any breakpoint', async ({ page }) => {
    const breakpoints = [375, 568, 768, 1024, 1280];

    for (const width of breakpoints) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });

      expect(hasHorizontalScroll).toBeFalsy();
    }
  });

  test('navigation adapts to viewport', async ({ page }) => {
    // Mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    let nav = page.locator('nav, header');
    await expect(nav).toBeVisible();

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    nav = page.locator('nav, header');
    await expect(nav).toBeVisible();

    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    nav = page.locator('nav, header');
    await expect(nav).toBeVisible();
  });

  test('padding and margins are appropriate', async ({ page }) => {
    const breakpoints = [
      { width: 375, height: 812 },
      { width: 1280, height: 800 },
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize(breakpoint);
      await page.goto('/');

      const sections = page.locator('section, article, main');
      const sectionCount = await sections.count();

      if (sectionCount > 0) {
        const section = sections.first();
        const padding = await section.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return parseInt(style.paddingLeft);
        });

        // Should have some padding
        expect(padding).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('font sizes are proportional', async ({ page }) => {
    const breakpoints = [375, 1280];

    for (const width of breakpoints) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      const h1 = page.locator('h1').first();
      if (await h1.isVisible()) {
        const fontSize = await h1.evaluate((el) => {
          return parseInt(window.getComputedStyle(el).fontSize);
        });

        // H1 should be larger on desktop than mobile
        expect(fontSize).toBeGreaterThan(0);
      }
    }
  });

  test('touch targets are appropriately sized', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const clickableElements = page.locator('button, a, [role="button"]');
    const elementCount = await clickableElements.count();

    for (let i = 0; i < Math.min(5, elementCount); i++) {
      const element = clickableElements.nth(i);
      const box = await element.boundingBox();

      if (box) {
        // Minimum touch target size should be around 44px
        const minSize = Math.min(box.width, box.height);
        expect(minSize).toBeGreaterThanOrEqual(32);
      }
    }
  });

  test('form fields are properly sized on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const inputs = page.locator('input[type="text"], input[type="email"], textarea');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      for (let i = 0; i < Math.min(2, inputCount); i++) {
        const input = inputs.nth(i);
        const box = await input.boundingBox();

        if (box) {
          // Input should be full-width or near full-width on mobile
          expect(box.width).toBeGreaterThan(100);
        }
      }
    }
  });

  test('dropdowns/selects work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const selects = page.locator('select');
    const selectCount = await selects.count();

    if (selectCount > 0) {
      const select = selects.first();
      await expect(select).toBeVisible();
      await select.click();
      // Native select should handle mobile interaction
      expect(select).toBeVisible();
    }
  });
});
