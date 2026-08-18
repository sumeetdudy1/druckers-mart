import { test, expect } from '@playwright/test';

test.describe('Enquiry Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/enquiries', route => {
      console.log('Mocking request to', route.request().url());
      console.log('Request body:', route.request().postData());
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'success' }),
      });
    });
    // Ensure the page is completely loaded including all scripts
    await page.goto('http://localhost:4321/enquiry', { waitUntil: 'networkidle' });
  });

  test('Desktop Visuals', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page).toHaveScreenshot('enquiry-desktop.png');
  });

  test('Mobile Visuals', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('enquiry-mobile.png');
  });

  test('Validation check', async ({ page }) => {
    await page.click('button[type="submit"]');
    // Ensure browser validation triggers
    await expect(page.locator('#quantity_requirement')).toBeFocused();
  });

  test('Submission flow', async ({ page }) => {
    await page.fill('#quantity_requirement', '100 units');
    await page.fill('#delivery_location', 'Baddi, HP');
    await page.fill('#buyer_name', 'Test User');
    await page.fill('#work_email', 'test@example.com');
    await page.fill('#phone', '9999999999');
    await page.check('#consent_contact');
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator('#success-panel')).toBeVisible();
    // Use CSS display check instead of [hidden]
    await expect(page.locator('#enquiry-form')).not.toBeVisible();
  });
});
