import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Typography Prototype - IBM Plex Sans Condensed', () => {
  const testPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Typography Test</title>
  <style>
    :root {
      --graphite: #0f172a;
      --off-white: #f8fafc;
      --white: #ffffff;
      --mineral-blue: #0f766e;
      --signal-orange: #f97316;
      --line: #e2e8f0;
      --text-xs: 0.75rem;
      --text-sm: 0.875rem;
      --text-base: 1rem;
      --text-lg: 1.125rem;
      --text-xl: 1.25rem;
      --text-2xl: 1.5rem;
      --text-3xl: 1.875rem;
      --text-4xl: 2.25rem;
      --space-xs: 0.25rem;
      --space-sm: 0.5rem;
      --space-md: 1rem;
      --space-lg: 1.5rem;
      --space-xl: 2rem;
      --space-2xl: 3rem;
      --radius-sm: 4px;
      --radius-md: 8px;
      --transition-fast: 150ms ease;
      --transition-normal: 250ms ease;
      --content-width: 1280px;
    }
    
    /* Baseline: Inter for everything */
    .baseline {
      font-family: 'Inter', system-ui, sans-serif;
    }
    
    /* Prototype: IBM Plex Sans Condensed for headings, Inter for body */
    .prototype {
      font-family: 'Inter', system-ui, sans-serif;
    }
    .prototype h1, .prototype h2, .prototype h3, .prototype .eyebrow, .prototype .wordmark__text {
      font-family: 'IBM Plex Sans Condensed', 'Inter', system-ui, sans-serif;
    }
    
    * { box-sizing: border-box; }
    body { margin: 0; padding: var(--space-2xl); background: var(--off-white); color: var(--graphite); }
    .container { max-width: var(--content-width); margin: 0 auto; }
    .section { margin-bottom: var(--space-2xl); padding: var(--space-xl); background: var(--white); border: 1px solid var(--line); border-radius: var(--radius-md); }
    .section-title { font-size: var(--text-sm); font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--signal-orange); margin-bottom: var(--space-lg); }
    h1 { font-size: var(--text-4xl); line-height: 1.1; margin: var(--space-sm) 0 var(--space-md); }
    h2 { font-size: var(--text-3xl); line-height: 1.15; margin: var(--space-sm) 0 var(--space-md); }
    h3 { font-size: var(--text-2xl); line-height: 1.2; margin: var(--space-sm) 0 var(--space-md); }
    .eyebrow { font-size: var(--text-xs); font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--mineral-blue); margin-bottom: var(--space-sm); }
    .lede { font-size: var(--text-lg); line-height: 1.6; color: #4a545a; max-width: 60ch; }
    .specs { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-md); margin-top: var(--space-lg); }
    .spec-item { display: flex; flex-direction: column; gap: var(--space-xs); }
    .spec-item dt { font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; color: var(--mineral-blue); letter-spacing: 0.05em; }
    .spec-item dd { margin: 0; font-weight: 600; color: var(--graphite); }
    .button { display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; background: var(--graphite); color: var(--white); font-weight: 600; text-decoration: none; border-radius: 4px; }
    .wordmark__text { font-weight: 800; letter-spacing: .04em; }
    .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2xl); }
    @media (max-width: 800px) { .comparison { grid-template-columns: 1fr; } }
    
    @font-face {
      font-family: 'IBM Plex Sans Condensed';
      src: url('https://fonts.gstatic.com/s/ibmplexsanscondensed/v19/zYXqKVElMYYaJe8bpLHnCwZ0hFqkGJYbWUY.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'IBM Plex Sans Condensed';
      src: url('https://fonts.gstatic.com/s/ibmplexsanscondensed/v19/zYXqKVElMYYaJe8bpLHnCwZ0hFqkGJYbWUY.woff2') format('woff2');
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'IBM Plex Sans Condensed';
      src: url('https://fonts.gstatic.com/s/ibmplexsanscondensed/v19/zYXpKVElMYYaJe8bpLHnCwZ0hFqkGJZLWUY.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
  </style>
  <!-- Load Inter from Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1 class="section-title">Typography Comparison</h1>
    
    <div class="comparison">
      <section class="section baseline">
        <h2 class="section-title">Baseline: Inter Only</h2>
        <p class="eyebrow">Professional Industrial Supplies</p>
        <h1>Printing & Packaging Production Supplies</h1>
        <p class="lede">Industrial consumables, sourced directly for commercial printing and packaging production.</p>
        <h2>Find supply by workflow stage</h2>
        <p class="lede">Our catalogue is organised around the three stages of print production.</p>
        <h3>Pre-sensitized Offset Plate</h3>
        <div class="specs">
          <div class="spec-item"><dt>Size</dt><dd>470 × 620 mm</dd></div>
          <div class="spec-item"><dt>Material</dt><dd>Aluminum</dd></div>
          <div class="spec-item"><dt>Type</dt><dd>Pre-sensitized</dd></div>
        </div>
        <a class="button" href="#">Request Quote</a>
      </section>
      
      <section class="section prototype">
        <h2 class="section-title">Prototype: IBM Plex Sans Condensed Headings</h2>
        <p class="eyebrow">Professional Industrial Supplies</p>
        <h1>Printing & Packaging Production Supplies</h1>
        <p class="lede">Industrial consumables, sourced directly for commercial printing and packaging production.</p>
        <h2>Find supply by workflow stage</h2>
        <p class="lede">Our catalogue is organised around the three stages of print production.</p>
        <h3>Pre-sensitized Offset Plate</h3>
        <div class="specs">
          <div class="spec-item"><dt>Size</dt><dd>470 × 620 mm</dd></div>
          <div class="spec-item"><dt>Material</dt><dd>Aluminum</dd></div>
          <div class="spec-item"><dt>Type</dt><dd>Pre-sensitized</dd></div>
        </div>
        <a class="button" href="#">Request Quote</a>
      </section>
    </div>
    
    <!-- Product Card Comparison -->
    <h2 class="section-title" style="margin-top: var(--space-2xl);">Product Card Comparison</h2>
    <div class="comparison">
      <section class="section baseline">
        <h3 class="section-title">Baseline Card</h3>
        <div style="border: 1px solid var(--line); border-radius: var(--radius-md); padding: var(--space-lg); background: var(--white);">
          <div style="height: 160px; background: var(--signal-orange); border-radius: var(--radius-sm); margin-bottom: var(--space-sm); display: grid; place-items: center; color: var(--white); font-size: 3rem;">PO</div>
          <p class="eyebrow">Pre-press</p>
          <h3 style="margin: 0; font-size: var(--text-lg);"><a href="#" style="color: var(--graphite); text-decoration: none;">Pre-sensitized Offset Plate</a></h3>
          <div style="border-top: 1px solid var(--line); padding-top: var(--space-md); margin-top: var(--space-sm);">
            <dl style="margin: 0; display: flex; flex-direction: column; gap: var(--space-xs);">
              <div style="display: flex; justify-content: space-between; gap: var(--space-sm);">
                <dt style="color: #64748b; text-transform: capitalize; font-size: var(--text-xs);">size</dt>
                <dd style="margin: 0; font-weight: 600; font-size: var(--text-sm); color: var(--graphite);">470 × 620 mm</dd>
              </div>
            </dl>
          </div>
          <div style="display: grid; grid-template-columns: 1fr auto; gap: var(--space-sm); margin-top: var(--space-md);">
            <a class="button" href="#" style="width: 100%; justify-content: center;">Request Quote</a>
            <a class="button" style="background: transparent; color: #25D366; border-color: #25D366; padding-inline: var(--space-md);" href="#">WhatsApp</a>
          </div>
        </div>
      </section>
      
      <section class="section prototype">
        <h3 class="section-title">Prototype Card</h3>
        <div style="border: 1px solid var(--line); border-radius: var(--radius-md); padding: var(--space-lg); background: var(--white); border-top: 4px solid var(--signal-orange);">
          <div style="height: 160px; background: var(--signal-orange); border-radius: var(--radius-sm); margin-bottom: var(--space-sm); display: grid; place-items: center; color: var(--white); font-size: 3rem;">PO</div>
          <p class="eyebrow">Pre-press</p>
          <h3 style="margin: 0; font-size: var(--text-lg);"><a href="#" style="color: var(--graphite); text-decoration: none;">Pre-sensitized Offset Plate</a></h3>
          <div style="border-top: 1px solid var(--line); padding-top: var(--space-md); margin-top: var(--space-sm);">
            <dl style="margin: 0; display: flex; flex-direction: column; gap: var(--space-xs);">
              <div style="display: flex; justify-content: space-between; gap: var(--space-sm);">
                <dt style="color: #64748b; text-transform: capitalize; font-size: var(--text-xs);">size</dt>
                <dd style="margin: 0; font-weight: 600; font-size: var(--text-sm); color: var(--graphite);">470 × 620 mm</dd>
              </div>
            </dl>
          </div>
          <div style="display: grid; grid-template-columns: 1fr auto; gap: var(--space-sm); margin-top: var(--space-md);">
            <a class="button" href="#" style="width: 100%; justify-content: center;">Request Quote</a>
            <a class="button" style="background: transparent; color: #25D366; border-color: #25D366; padding-inline: var(--space-md);" href="#">WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  </div>
  
  <script>
    // Wait for fonts to load
    document.fonts.ready.then(() => {
      console.log('All fonts loaded');
    });
  </script>
</body>
</html>
  `;

  test('Capture typography comparison - desktop', async ({ page }) => {
    await page.setContent(testPage);
    await page.setViewportSize({ width: 1400, height: 2000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for fonts
    
    const screenshotDir = path.join(process.cwd(), 'evidence', 'typography');
    fs.mkdirSync(screenshotDir, { recursive: true });
    
    await page.screenshot({ 
      path: path.join(screenshotDir, 'typography-comparison-desktop.png'), 
      fullPage: true 
    });
    
    // Also capture just the product card area
    const cardArea = page.locator('.comparison').nth(1);
    await cardArea.screenshot({ 
      path: path.join(screenshotDir, 'product-card-typography-comparison-desktop.png') 
    });
  });
  
  test('Capture typography comparison - mobile', async ({ page }) => {
    await page.setContent(testPage);
    await page.setViewportSize({ width: 375, height: 2000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for fonts
    
    const screenshotDir = path.join(process.cwd(), 'evidence', 'typography');
    fs.mkdirSync(screenshotDir, { recursive: true });
    
    await page.screenshot({ 
      path: path.join(screenshotDir, 'typography-comparison-mobile.png'), 
      fullPage: true 
    });
    
    // Also capture just the product card area
    const cardArea = page.locator('.comparison').nth(1);
    await cardArea.screenshot({ 
      path: path.join(screenshotDir, 'product-card-typography-comparison-mobile.png') 
    });
  });
  
  test('Font loading performance test', async ({ page }) => {
    await page.setContent(testPage);
    await page.setViewportSize({ width: 1280, height: 800 });
    
    const fontMetrics = await page.evaluate(async () => {
      // Measure font loading timing
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      await document.fonts.ready;
      
      const fontFaces = Array.from(document.fonts.values());
      const loadTimes = fontFaces.map(face => ({
        family: face.family,
        status: face.status,
        weight: face.weight,
      }));
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
        fonts: loadTimes,
        fontsReady: document.fonts.status,
      };
    });
    
    console.log('Font loading metrics:', JSON.stringify(fontMetrics, null, 2));
  });
  
  test('Readability test - character count per line', async ({ page }) => {
    await page.setContent(testPage);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const readability = await page.evaluate(() => {
      const h1 = document.querySelector('.baseline h1')!;
      const h1Proto = document.querySelector('.prototype h1')!;
      const lede = document.querySelector('.baseline .lede')!;
      const ledeProto = document.querySelector('.prototype .lede')!;
      
      const getCharCount = (el: Element) => {
        const style = getComputedStyle(el);
        const width = el.getBoundingClientRect().width;
        const fontSize = parseFloat(style.fontSize);
        // Approximate characters per line
        const avgCharWidth = fontSize * 0.6; // rough estimate
        return Math.round(width / avgCharWidth);
      };
      
      return {
        baseline: {
          h1CharsPerLine: getCharCount(h1),
          ledeCharsPerLine: getCharCount(lede),
        },
        prototype: {
          h1CharsPerLine: getCharCount(h1Proto),
          ledeCharsPerLine: getCharCount(ledeProto),
        },
        h1FontFamily: {
          baseline: getComputedStyle(h1).fontFamily,
          prototype: getComputedStyle(h1Proto).fontFamily,
        },
        ledeFontFamily: {
          baseline: getComputedStyle(lede).fontFamily,
          prototype: getComputedStyle(ledeProto).fontFamily,
        },
      };
    });
    
    console.log('Readability metrics:', JSON.stringify(readability, null, 2));
  });
});
