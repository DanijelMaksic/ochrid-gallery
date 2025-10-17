'use client';

import { useState } from 'react';

import { deleteReviewAction } from '@/src/lib/actions';
import { useLikedReviews } from '@/src/contexts/liked-reviews-context';
import { useDislikedReviews } from '@/src/contexts/disliked-reviews-context';

import DeleteReview from '@/src/ui/reviews/delete-review';
import EditReviewForm from '@/src/ui/reviews/edit-review-form';
import ModalWindow from '@/src/ui/cart-components/modal-window';

function ReviewOperations({ review }) {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const [isOpenEditModal, setIsOpenEditModal] = useState(false);
   const { setLikedReviews } = useLikedReviews();
   const { setDislikedReviews } = useDislikedReviews();

   return (
      <div className="flex items-center gap-4">
         <button
            type="button"
            onClick={() => setIsOpenEditModal(true)}
            className="underlined-text"
         >
            Edit
         </button>
         <span>|</span>
         <button
            onClick={() => setIsOpenDeleteModal(true)}
            type="button"
            className="underlined-text"
         >
            Delete
         </button>

         {isOpenDeleteModal && (
            <ModalWindow onClose={() => setIsOpenDeleteModal(false)}>
               <DeleteReview
                  onClose={() => setIsOpenDeleteModal(false)}
                  onDelete={() => {
                     deleteReviewAction(review.id);
                     setLikedReviews((prevReviews) =>
                        prevReviews.filter(
                           (item) => item.reviewId !== review.id
                        )
                     );
                     setDislikedReviews((prevReviews) =>
                        prevReviews.filter(
                           (item) => item.reviewId !== review.id
                        )
                     );
                  }}
               />
            </ModalWindow>
         )}

         {isOpenEditModal && (
            <ModalWindow onClose={() => setIsOpenEditModal(false)}>
               <EditReviewForm
                  review={review}
                  onClose={() => setIsOpenEditModal(false)}
               />
            </ModalWindow>
         )}
      </div>
   );
}

export default ReviewOperations;
