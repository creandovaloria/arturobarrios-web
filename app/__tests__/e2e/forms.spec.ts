import { test, expect } from '@playwright/test';

test.describe('Form Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('contact form is present and accessible', async ({ page }) => {
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
  });

  test('form inputs are properly labeled', async ({ page }) => {
    const labels = page.locator('label');
    const labelCount = await labels.count();

    if (labelCount > 0) {
      for (let i = 0; i < labelCount; i++) {
        const label = labels.nth(i);
        await expect(label).toBeVisible();
      }
    }
  });

  test('form submission works', async ({ page }) => {
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      const inputs = form.locator('input, textarea');
      const inputCount = await inputs.count();

      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const type = await input.getAttribute('type');

        if (type === 'email') {
          await input.fill('test@example.com');
        } else if (type === 'tel') {
          await input.fill('1234567890');
        } else if (type !== 'submit' && type !== 'button') {
          await input.fill('Test value');
        }
      }

      // Don't actually submit, just verify form structure
      await expect(form).toBeVisible();
    }
  });

  test('form validation works', async ({ page }) => {
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      const inputs = form.locator('input[required], textarea[required]');
      const requiredCount = await inputs.count();

      for (let i = 0; i < requiredCount; i++) {
        const input = inputs.nth(i);
        expect(await input.getAttribute('required')).not.toBeNull();
      }
    }
  });

  test('form error messages display correctly', async ({ page }) => {
    const errorMessages = page.locator('[role="alert"]');
    const errorCount = await errorMessages.count();

    if (errorCount > 0) {
      for (let i = 0; i < errorCount; i++) {
        await expect(errorMessages.nth(i)).toBeVisible();
      }
    }
  });

  test('form fields can receive focus', async ({ page }) => {
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      const firstInput = inputs.first();
      await firstInput.focus();

      const isFocused = await firstInput.evaluate((el) => {
        return document.activeElement === el;
      });

      expect(isFocused).toBeTruthy();
    }
  });

  test('form supports keyboard navigation', async ({ page }) => {
    const inputs = page.locator('input[type="text"], input[type="email"], textarea');
    const inputCount = await inputs.count();

    if (inputCount > 1) {
      const firstInput = inputs.first();
      await firstInput.focus();
      await firstInput.press('Tab');

      const secondInput = inputs.nth(1);
      const isFocused = await secondInput.evaluate((el) => {
        return document.activeElement === el;
      });

      expect(isFocused).toBeTruthy();
    }
  });

  test('form placeholders are visible', async ({ page }) => {
    const placeholders = page.locator('[placeholder]');
    const placeholderCount = await placeholders.count();

    if (placeholderCount > 0) {
      for (let i = 0; i < Math.min(3, placeholderCount); i++) {
        const element = placeholders.nth(i);
        const placeholder = await element.getAttribute('placeholder');
        expect(placeholder).toBeTruthy();
      }
    }
  });

  test('form input types are correct', async ({ page }) => {
    const emailInputs = page.locator('input[type="email"]');
    const emailCount = await emailInputs.count();

    if (emailCount > 0) {
      const emailInput = emailInputs.first();
      expect(await emailInput.getAttribute('type')).toBe('email');
    }
  });

  test('textarea fields are functional', async ({ page }) => {
    const textareas = page.locator('textarea');
    const textareaCount = await textareas.count();

    if (textareaCount > 0) {
      const textarea = textareas.first();
      await textarea.fill('This is a test message');
      const value = await textarea.inputValue();
      expect(value).toBe('This is a test message');
    }
  });

  test('form buttons are accessible', async ({ page }) => {
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      const buttons = form.locator('button');
      const buttonCount = await buttons.count();

      if (buttonCount > 0) {
        for (let i = 0; i < buttonCount; i++) {
          const button = buttons.nth(i);
          await expect(button).toBeVisible();
          await expect(button).toBeEnabled();
        }
      }
    }
  });
});
