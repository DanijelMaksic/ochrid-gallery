'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import ReviewPreview from '@/src/ui/reviews/review-preview';

function Reviews({ user, session }) {
   const reviews = user.reviews;

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
         className="flex flex-col"
      >
         <h1 className="text-4xl 2xl:text-3xl font-semibold mb-6">
            Your reviews
         </h1>

         <div className="flex flex-col gap-5">
            {reviews &&
               reviews.map(
                  (review) =>
                     review.user_id === session.user.userId && (
                        <ReviewPreview
                           review={review}
                           key={review.id}
                        />
                     )
               )}

            {!reviews.length && (
               <div className="py-10 px-8 xs:px-2 border-2 border-primary-400 rounded-md flex bg-primary-50 items-center justify-center flex-col text-center xs:mb-32">
                  <span className="text-3xl 2xl:text-2xl md:text-3xl font-semibold mb-4">
                     No reviews found
                  </span>

                  <span className="text-2xl 2xl:text-xl md:text-2xl mb-2">
                     After you review a product, it will appear here
                  </span>

                  <span className="text-xl 2xl:text-lg md:text-xl">
                     Best way to find the product you can review is to go to the{' '}
                     <Link
                        href={'/account/order-history'}
                        className="font-semibold underlined-text"
                     >
                        Order history
                     </Link>{' '}
                     page
                  </span>
               </div>
            )}
         </div>
      </motion.div>
   );
}

export default Reviews;
