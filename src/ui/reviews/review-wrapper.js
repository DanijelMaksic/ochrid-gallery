'use client';

import { useSearchParams } from 'next/navigation';

import Review from '@/src/ui/reviews/review';
import NoReviewsFound from '@/src/ui/reviews/no-reviews-found';
import ReviewFilterAndWrite from '@/src/ui/reviews/review-filter-and-write';

function ReviewWrapper({ reviews, session, id, orders, filteredItems }) {
   const searchParams = useSearchParams();
   const filter = searchParams.get('reviews') || 'all';

   let filteredReviews;

   if (filter === 'all') filteredReviews = reviews;

   if (filter === 'recommended')
      filteredReviews = reviews.filter((review) => review.recommended === true);

   if (filter === 'not-recommended')
      filteredReviews = reviews.filter(
         (review) => review.recommended === false
      );

   const reviewExists = filteredReviews.some((review) => review.item_id === id);

   return (
      <div className="flex flex-col gap-5">
         {reviewExists && (
            <ReviewFilterAndWrite
               orders={orders}
               session={session}
               id={id}
               reviews={reviews}
            />
         )}

         {filteredReviews.map(
            (review) =>
               review.item_id === id && (
                  <div key={review.id} className="flex flex-col gap-5">
                     <Review
                        item_id={review.item_id}
                        review={review}
                        key={review.id}
                        session={session}
                     />
                  </div>
               )
         )}

         {!reviewExists && filteredItems.length !== 0 && (
            <>
               <ReviewFilterAndWrite
                  orders={orders}
                  session={session}
                  id={id}
                  reviews={reviews}
               />

               <div className="border-2 rounded-md py-10 border-primary-500 flex justify-center items-center xs:mb-35">
                  <span className="text-3xl 2xl:text-[1.6rem] xs:text-[1.59rem] font-semibold md:text-4xl">
                     No reviews found!
                  </span>
               </div>
            </>
         )}

         {!filteredItems.length && (
            <NoReviewsFound session={session} item_id={id} orders={orders} />
         )}
      </div>
   );
}

export default ReviewWrapper;
