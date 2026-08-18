import { test, expect } from '@playwright/test';

test.describe('Products Page Visual Hierarchy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/products');
  });

  test('Desktop Visuals', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page).toHaveScreenshot('products-desktop.png');
  });

  test('Mobile Visuals', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('products-mobile.png');
  });
});
