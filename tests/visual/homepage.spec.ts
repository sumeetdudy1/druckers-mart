import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Hierarchy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('Desktop Visuals', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page).toHaveScreenshot('homepage-desktop.png');
  });

  test('Mobile Visuals', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });
});
