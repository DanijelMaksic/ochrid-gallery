import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
   await page.goto('http://localhost:3000/');
   await page.getByRole('link', { name: 'Shop icons' }).click();
   await page.getByRole('link', { name: 'Christ the Savior - Sinai' }).click();
   await page
      .getByRole('button', { name: 'Increase Quanitity Button' })
      .click();
   await page.getByRole('button', { name: 'Add to Cart' }).click();
   await page.getByRole('link', { name: 'Go to Cart' }).click();
});
