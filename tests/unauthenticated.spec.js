import { test, expect } from '@playwright/test';

const protectedRoutes = [
   '/account',
   '/account/order-history',
   '/account/wishlist',
   '/account/reviews',
   '/account/address-book',
];

test.describe('unaunthenticated access', () => {
   for (const route of protectedRoutes) {
      test(`unauthenticated user is redirected from ${route}`, async ({
         page,
      }) => {
         await page.goto(route);
         await expect(page).toHaveURL(/\/login/);
      });
   }
});
