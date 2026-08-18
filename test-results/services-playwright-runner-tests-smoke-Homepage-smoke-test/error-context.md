# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: services/playwright-runner/tests/smoke.spec.ts >> Homepage smoke test
- Location: services/playwright-runner/tests/smoke.spec.ts:3:1

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test('Homepage smoke test', async ({ page }) => {
  4  |   const errors = [];
  5  |   page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  6  |   page.on('pageerror', exception => errors.push(exception.message));
  7  | 
> 8  |   await page.goto('/');
     |              ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  9  |   await expect(page).toHaveTitle(/Druckers Mart/);
  10 |   
  11 |   if (errors.length > 0) {
  12 |     throw new Error('Console errors found: ' + errors.join(', '));
  13 |   }
  14 | });
  15 | 
```