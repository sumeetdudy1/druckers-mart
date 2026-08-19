import { test, expect } from '@playwright/test';

test.describe('Layout Stability Analysis', () => {
  const pages = [
    { name: 'home', url: '/' },
    { name: 'products', url: '/products' },
    { name: 'product-detail', url: '/products/pre-press-plate-470-620' },
  ];

  for (const pageInfo of pages) {
    test.describe(`${pageInfo.name} page`, () => {
      test('CLS Measurement - Desktop', async ({ page }) => {
        await page.goto(pageInfo.url);
        await page.setViewportSize({ width: 1280, height: 800 });
        
        // Wait for initial render
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Measure CLS using PerformanceObserver
        const clsResult = await page.evaluate(async () => {
          return new Promise((resolve) => {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const layoutEntry = entry as any;
                if (layoutEntry.entryType === 'layout-shift' && !layoutEntry.hadRecentInput) {
                  clsValue += layoutEntry.value;
                }
              }
            });
            observer.observe({ type: 'layout-shift', buffered: true });
            
            // Wait for potential layout shifts
            setTimeout(() => {
              observer.disconnect();
              resolve(clsValue);
            }, 3000);
          });
        });
        
        console.log(`CLS for ${pageInfo.name} (desktop): ${clsResult}`);
        expect(clsResult).toBeLessThan(0.1); // Good CLS threshold
      });

      test('CLS Measurement - Mobile (375px)', async ({ page }) => {
        await page.goto(pageInfo.url);
        await page.setViewportSize({ width: 375, height: 667 });
        
        // Wait for initial render
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Measure CLS using PerformanceObserver
        const clsResult = await page.evaluate(async () => {
          return new Promise((resolve) => {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const layoutEntry = entry as any;
                if (layoutEntry.entryType === 'layout-shift' && !layoutEntry.hadRecentInput) {
                  clsValue += layoutEntry.value;
                }
              }
            });
            observer.observe({ type: 'layout-shift', buffered: true });
            
            // Wait for potential layout shifts
            setTimeout(() => {
              observer.disconnect();
              resolve(clsValue);
            }, 3000);
          });
        });
        
        console.log(`CLS for ${pageInfo.name} (mobile): ${clsResult}`);
        expect(clsResult).toBeLessThan(0.1); // Good CLS threshold
      });

      test('Font Loading Behavior', async ({ page }) => {
        await page.goto(pageInfo.url);
        await page.setViewportSize({ width: 1280, height: 800 });
        
        // Check font loading status
        const fontInfo = await page.evaluate(async () => {
          // Check if fonts are loaded
          await document.fonts.ready;
          
          const fontFaces = Array.from(document.fonts.values());
          const fontDetails = fontFaces.map(face => ({
            family: face.family,
            status: face.status,
            weight: face.weight,
            stretch: face.stretch,
            style: face.style,
          }));
          
          // Check computed font-family on key elements
          const bodyFont = getComputedStyle(document.body).fontFamily;
          const h1Font = document.querySelector('h1') ? getComputedStyle(document.querySelector('h1')!).fontFamily : 'none';
          
          return {
            fonts: fontDetails,
            bodyFont,
            h1Font,
            documentFontsReady: document.fonts.status,
          };
        });
        
        console.log(`Font info for ${pageInfo.name}:`, JSON.stringify(fontInfo, null, 2));
      });

      test('Image Dimensions and Aspect Ratios', async ({ page }) => {
        await page.goto(pageInfo.url);
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.waitForLoadState('networkidle');
        
        const imageInfo = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'));
          return images.map(img => ({
            src: img.src,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            displayWidth: img.width,
            displayHeight: img.height,
            aspectRatio: img.naturalWidth / img.naturalHeight,
            hasExplicitDimensions: img.hasAttribute('width') && img.hasAttribute('height'),
            loading: img.loading,
          }));
        });
        
        console.log(`Images on ${pageInfo.name}:`, JSON.stringify(imageInfo, null, 2));
        
        // Check for images without explicit dimensions (potential layout shift source)
        const imagesWithoutDimensions = imageInfo.filter(img => !img.hasExplicitDimensions && img.naturalWidth > 0);
        if (imagesWithoutDimensions.length > 0) {
          console.warn(`Images without explicit dimensions on ${pageInfo.name}:`, imagesWithoutDimensions);
        }
      });

      test('Layout Shift Sources - Detailed Analysis', async ({ page }) => {
        await page.goto(pageInfo.url);
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.waitForLoadState('networkidle');
        
        const shiftDetails = await page.evaluate(async () => {
          return new Promise((resolve) => {
            const shifts: any[] = [];
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const layoutEntry = entry as any;
                if (layoutEntry.entryType === 'layout-shift' && !layoutEntry.hadRecentInput) {
                  shifts.push({
                    value: layoutEntry.value,
                    startTime: entry.startTime,
                    sources: layoutEntry.sources?.map((s: any) => ({
                      node: s.node?.nodeName,
                      nodeId: s.node?.id,
                      nodeClass: s.node?.className,
                      previousRect: s.previousRect,
                      currentRect: s.currentRect,
                    })) || [],
                  });
                }
              }
            });
            observer.observe({ type: 'layout-shift', buffered: true });
            
            setTimeout(() => {
              observer.disconnect();
              resolve(shifts);
            }, 5000);
          });
        });
        
        console.log(`Layout shifts on ${pageInfo.name}:`, JSON.stringify(shiftDetails, null, 2));
      });
    });
  }
});
