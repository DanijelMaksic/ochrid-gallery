import { test, expect } from '@playwright/test';

test('empty cart fallback is displayed', async ({ page }) => {
   await page.goto('/');

   await page.getByRole('link', { name: 'To cart Page' }).click();

   await expect(page).toHaveURL('/cart');
   await expect(page.getByText('Your cart is empty')).toBeVisible();
   await expect(
      page.getByRole('button', { name: 'Back to store' }),
   ).toBeVisible();
});
