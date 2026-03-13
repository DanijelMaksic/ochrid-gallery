import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
   await page.goto('/items');
   await page.getByTestId('item-card').first().click();

   await page.getByRole('button', { name: 'Add to Cart' }).click();
   await page.getByRole('button', { name: 'Continue Shopping' }).click();
   await page.waitForTimeout(500); // small wait for localStorage to update

   // Check if item is located in localStorage
   const cart = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('cart'));
   });

   expect(cart).not.toBeNull();
   expect(cart.length).toBeGreaterThan(0);
});
