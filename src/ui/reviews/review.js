'use client';

import { useState } from 'react';

import { format } from 'date-fns';
import { AnimatePresence } from 'motion/react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { dislikeAction, likeAction } from '@/src/lib/actions';
import { useLikedReviews } from '@/src/contexts/liked-reviews-context';
import { useDislikedReviews } from '@/src/contexts/disliked-reviews-context';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';

import ReviewWarning from '@/src/ui/reviews/review-warning';
import ModalWindow from '@/src/ui/cart-components/modal-window';
import ReviewOperations from '@/src/ui/reviews/review-operations';

function Review({ review, session, item_id }) {
   const [isOpenWarning, setIsOpenWarning] = useState(false);
   const { likedReviews, setLikedReviews } = useLikedReviews();
   const { dislikedReviews, setDislikedReviews } = useDislikedReviews();

   const {
      title,
      content,
      recommended,
      likes,
      dislikes,
      username,
      created_at,
      user_id,
      id: review_id,
   } = review;

   const likedReview = likedReviews.find((item) => item.reviewId === review_id);
   const dislikedReview = dislikedReviews.find(
      (item) => item.reviewId === review_id,
   );

   async function handleLike() {
      if (!session) {
         setIsOpenWarning(true);
         return;
      }
      const likeCount = likes + 1;
      await likeAction(review_id, item_id, session, likeCount);
      setLikedReviews((items) => [
         ...items,
         { reviewId: review_id, isLiked: true },
      ]);

      if (dislikedReview?.isDisliked) {
         const dislikeCount = dislikes - 1;
         await dislikeAction(review_id, item_id, session, dislikeCount);
         setDislikedReviews((items) =>
            items.filter((item) => item.reviewId !== review_id),
         );
      }
   }

   async function handleUnlike() {
      if (!session) {
         setIsOpenWarning(true);
         return;
      }
      const likeCount = likes - 1;
      await likeAction(review_id, item_id, session, likeCount);
      setLikedReviews((items) =>
         items.filter((item) => item.reviewId !== review_id),
      );
   }

   async function handleDislike() {
      if (!session) {
         setIsOpenWarning(true);
         return;
      }
      const dislikeCount = dislikes + 1;
      await dislikeAction(review_id, item_id, session, dislikeCount);
      setDislikedReviews((items) => [
         ...items,
         { reviewId: review_id, isDisliked: true },
      ]);

      if (likedReview.isLiked) {
         const likeCount = likes - 1;
         await likeAction(review_id, item_id, session, likeCount);
         setLikedReviews((items) =>
            items.filter((item) => item.reviewId !== review_id),
         );
      }
   }

   async function handleUndislike() {
      if (!session) {
         setIsOpenWarning(true);
         return;
      }
      const dislikeCount = dislikes - 1;
      await dislikeAction(review_id, item_id, session, dislikeCount);
      setDislikedReviews((items) =>
         items.filter((item) => item.reviewId !== review_id),
      );
   }
   return (
      <div className="flex flex-col bg-primary-50 border-2 border-primary-500 rounded-md px-12 py-6 text-xl lg:text-2xl md:text-3xl xs:text-2xl xs:px-4 xs:py-4">
         <div className="flex items-center justify-between mb-6 xs:mb-4 xs:flex-col xs:gap-1 xs:text-center xs:items-center">
            <h3 className="font-semibold text-2xl 2xl:text-xl lg:text-2xl md:text-3xl xs:text-2xl">
               {title}
            </h3>

            <div className="flex items-center gap-3 text-primary-800 2xl:text-base lg:text-lg md:text-xl xs:text-lg">
               <span>{username},</span>
               <span>{format(created_at, 'M.d.yyyy')}</span>
            </div>
         </div>

         <p className="mb-6 md:mb-6 2xl:text-base lg:text-lg md:text-xl text-justify leading-[1.6rem] lg:leading-[1.7rem] md:leading-[2.1rem] xs:px-2">
            {content}
         </p>

         <div className="flex items-center justify-between md:flex-col 2xl:text-base lg:text-lg md:text-xl gap-8">
            {recommended === true ? (
               <div className="flex items-center gap-2 bg-primary-800 text-primary-0 rounded-md px-3 py-1">
                  <IoIosCheckmarkCircleOutline className="size-7 2xl:size-6" />

                  <span>I recommend this product</span>
               </div>
            ) : (
               <div className="flex items-center gap-2 bg-primary-800 text-primary-0 rounded-md px-3 py-1">
                  <IoCloseCircleOutline className="size-7 2xl:size-6" />

                  <span>I don&apos;t recommend this product</span>
               </div>
            )}

            <div className="flex items-center gap-14 lg:gap-4 lg:flex-col md:flex-row md:mt-6 xs:mt-4 md:gap-12 xs:gap-10">
               <div
                  className={`flex items-center gap-6 lg:text-xl ${
                     user_id === session?.user.id &&
                     'pointer-events-none opacity-80'
                  }`}
               >
                  {!likedReview?.length ? (
                     !likedReview?.isLiked ? (
                        <button
                           onClick={handleLike}
                           className="flex items-center gap-2"
                        >
                           <BiLike className="size-5 lg:size-6 md:size-7 xs:size-6" />
                           <span className="text-primary-800">{likes}</span>
                        </button>
                     ) : (
                        <button
                           onClick={handleUnlike}
                           className="flex items-center gap-2"
                        >
                           <BiSolidLike className="size-5 lg:size-6 md:size-7 xs:size-6" />
                           <span className="text-primary-800">{likes}</span>
                        </button>
                     )
                  ) : (
                     <button
                        onClick={handleLike}
                        className="flex items-center gap-2"
                     >
                        <BiLike className="size-5 lg:size-6 md:size-7 xs:size-6" />
                        <span className="text-primary-800">{likes}</span>
                     </button>
                  )}

                  {!dislikedReview?.length ? (
                     !dislikedReview?.isDisliked ? (
                        <button
                           onClick={handleDislike}
                           className="flex items-center gap-2"
                        >
                           <BiDislike className="size-5 lg:size-6 md:size-7 xs:size-6" />
                           <span className="text-primary-800">{dislikes}</span>
                        </button>
                     ) : (
                        <button
                           onClick={handleUndislike}
                           className="flex items-center gap-2"
                        >
                           <BiSolidDislike className="size-5 lg:size-6 md:size-7 xs:size-6" />
                           <span className="text-primary-800">{dislikes}</span>
                        </button>
                     )
                  ) : (
                     <button
                        onClick={handleDislike}
                        className="flex items-center gap-2"
                     >
                        <BiDislike className="size-5 lg:size-6 md:size-7 xs:size-6" />
                        <span className="text-primary-800">{dislikes}</span>
                     </button>
                  )}
               </div>

               {session?.user.email === review.user_id && (
                  <ReviewOperations review={review} />
               )}
            </div>
         </div>

         <AnimatePresence>
            {isOpenWarning && (
               <ModalWindow onClose={() => setIsOpenWarning(false)}>
                  <ReviewWarning
                     onClose={() => setIsOpenWarning(false)}
                     type="like"
                  />
               </ModalWindow>
            )}
         </AnimatePresence>
      </div>
   );
}

export default Review;
