import { test, expect } from '@playwright/test';

test('Homepage smoke test', async ({ page }: { page: any }) => {
  const errors: string[] = [];
  page.on('console', (msg: any) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (exception: Error) => errors.push(exception.message));

  await page.goto('/');
  await expect(page).toHaveTitle(/Druckers Mart/);
  
  if (errors.length > 0) {
    throw new Error('Console errors found: ' + errors.join(', '));
  }
});
