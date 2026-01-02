import { auth } from '@/src/lib/auth';

export const proxy = auth;

export const config = {
   matcher: [
      '/account',
      '/billing-info',
      '/account/orders',
      '/account/reviews',
      '/account/wishlist',
      '/payment-method',
      '/review-order',
      '/review-order/thank-you',
   ],
};
