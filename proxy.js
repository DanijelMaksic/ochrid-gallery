import { auth } from '@/src/lib/auth';

export const proxy = auth;

export const config = {
   matcher: [
      '/account',
      '/account/order-history',
      '/account/wishlist',
      '/account/reviews',
      '/account/address-book',
      '/billing-info',
      '/payment-method',
      '/review-order',
      '/review-order/thank-you',
   ],
};
