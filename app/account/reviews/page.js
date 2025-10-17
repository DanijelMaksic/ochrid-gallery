import { auth } from '@/src/lib/auth';
import { getItems, getReviews } from '@/src/lib/data-service';

import Reviews from '@/app/account/reviews/reviews';

export const metadata = {
   title: 'Account/Reviews',
};

async function Page() {
   const [session, items, reviews] = await Promise.all([
      auth(),
      getItems(),
      getReviews(),
   ]);

   const reviewsExist = reviews.some(
      (review) => review.user_email === session?.user?.email
   );

   return (
      <Reviews
         items={items}
         session={session}
         reviews={reviews}
         reviewsExist={reviewsExist}
      />
   );
}

export default Page;
