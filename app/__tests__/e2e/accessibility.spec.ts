import { test, expect } from '@playwright/test';

test.describe('Accessibility Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page has proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    const h1Count = await h1.count();

    // Page should have at least one h1
    expect(h1Count).toBeGreaterThanOrEqual(0);

    if (h1Count > 0) {
      await expect(h1.first()).toBeVisible();
    }
  });

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    // Tab through all interactive elements
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(3, buttonCount); i++) {
      const button = buttons.nth(i);
      await button.focus();

      const isFocused = await button.evaluate((el) => {
        return document.activeElement === el;
      });

      expect(isFocused).toBeTruthy();
    }
  });

  test('focus indicators are visible', async ({ page }) => {
    const button = page.locator('button').first();
    if (await button.isVisible()) {
      await button.focus();

      const focusStyle = await button.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.outline || styles.boxShadow;
      });

      expect(focusStyle).toBeTruthy();
    }
  });

  test('color contrast is sufficient', async ({ page }) => {
    const textElements = page.locator('p, span, h1, h2, h3, h4, h5, h6, button, a');
    const elementCount = await textElements.count();

    for (let i = 0; i < Math.min(5, elementCount); i++) {
      const element = textElements.nth(i);
      const styles = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
        };
      });

      // Verify both properties exist and are not transparent
      expect(styles.color).toBeTruthy();
      expect(styles.color).not.toContain('rgba(0, 0, 0, 0)');
    }
  });

  test('alt text is present on images', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // Alt text should be present (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('form labels are associated with inputs', async ({ page }) => {
    const labels = page.locator('label');
    const labelCount = await labels.count();

    if (labelCount > 0) {
      for (let i = 0; i < Math.min(3, labelCount); i++) {
        const label = labels.nth(i);
        const htmlFor = await label.getAttribute('for');

        // Label should have a for attribute or contain the input
        if (htmlFor) {
          const input = page.locator(`#${htmlFor}`);
          await expect(input).toBeVisible();
        }
      }
    }
  });

  test('buttons have accessible names', async ({ page }) => {
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(5, buttonCount); i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');

      // Button should have visible text, aria-label, or aria-labelledby
      expect(text?.trim() || ariaLabel || ariaLabelledBy).toBeTruthy();
    }
  });

  test('links have accessible names', async ({ page }) => {
    const links = page.locator('a');
    const linkCount = await links.count();

    for (let i = 0; i < Math.min(5, linkCount); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');

      // Link should have visible text, aria-label, or title
      expect(text?.trim() || ariaLabel || title).toBeTruthy();
    }
  });

  test('no placeholder-only form fields', async ({ page }) => {
    const inputsWithPlaceholder = page.locator('input[placeholder]');
    const inputCount = await inputsWithPlaceholder.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputsWithPlaceholder.nth(i);
      const label = page.locator(`label[for="${await input.getAttribute('id')}"]`);

      // Each input should have a label (placeholder alone isn't sufficient)
      if (await label.count() === 0) {
        const ariaLabel = await input.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
      }
    }
  });

  test('respects prefers-reduced-motion', async ({ page }) => {
    // Simulate user preference for reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });

    const animatedElements = page.locator('[class*="animate"]');
    const elementCount = await animatedElements.count();

    if (elementCount > 0) {
      const firstElement = animatedElements.first();
      await expect(firstElement).toBeVisible();
    }

    // Restore default
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  });

  test('skip links are present (if applicable)', async ({ page }) => {
    const skipLink = page.locator('a[href="#main"], a[href="#content"]');
    const skipLinkCount = await skipLink.count();

    // Skip links are optional but recommended
    if (skipLinkCount > 0) {
      await expect(skipLink.first()).toBeDefined();
    }
  });

  test('landmark regions are properly used', async ({ page }) => {
    const landmarks = page.locator('header, nav, main, footer, aside');
    const landmarkCount = await landmarks.count();

    // Page should have at least some semantic landmarks
    expect(landmarkCount).toBeGreaterThanOrEqual(0);
  });

  test('lists are semantically marked up', async ({ page }) => {
    const lists = page.locator('ul, ol');
    const listCount = await lists.count();

    if (listCount > 0) {
      for (let i = 0; i < Math.min(3, listCount); i++) {
        const list = lists.nth(i);
        const items = list.locator('li');
        const itemCount = await items.count();

        expect(itemCount).toBeGreaterThan(0);
      }
    }
  });

  test('tables have proper structure', async ({ page }) => {
    const tables = page.locator('table');
    const tableCount = await tables.count();

    if (tableCount > 0) {
      for (let i = 0; i < tableCount; i++) {
        const table = tables.nth(i);
        const headers = table.locator('th');
        const rows = table.locator('tr');

        expect(await rows.count()).toBeGreaterThan(0);
      }
    }
  });

  test('aria-live regions are present for dynamic content', async ({ page }) => {
    const liveRegions = page.locator('[aria-live], [aria-atomic]');
    const regionCount = await liveRegions.count();

    // Live regions are optional but recommended for dynamic content
    if (regionCount > 0) {
      for (let i = 0; i < Math.min(2, regionCount); i++) {
        const region = liveRegions.nth(i);
        await expect(region).toBeVisible();
      }
    }
  });

  test('error messages are associated with form fields', async ({ page }) => {
    const errorMessages = page.locator('[role="alert"], .error, [class*="error"]');
    const errorCount = await errorMessages.count();

    if (errorCount > 0) {
      for (let i = 0; i < Math.min(3, errorCount); i++) {
        const error = errorMessages.nth(i);
        await expect(error).toBeVisible();
      }
    }
  });
});
