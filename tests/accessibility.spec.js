import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('homepage', () => {
   test('has no accessibility violations', async ({ page }) => {
      await page.goto('/');

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toEqual([]);
   });

   // test('looks correct', async ({ page }) => {
   //    // Visual regression test
   //    await page.goto('/');
   //    await page.waitForSelector('main');
   //    await expect(page).toHaveScreenshot();
   // });
});
