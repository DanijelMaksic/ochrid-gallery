'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { GoPencil } from 'react-icons/go';
import { Italianno } from 'next/font/google';

import ReviewForm from '@/src/ui/reviews/review-form';
import FilterReviews from '@/src/ui/reviews/filter-reviews';
import ReviewWarning from '@/src/ui/reviews/review-warning';
import ModalWindow from '@/src/ui/cart-components/modal-window';

const italianno = Italianno({
   subsets: ['latin'],
   display: 'swap',
   weight: '400',
});

function ReviewFilterAndWrite({ reviews, orders, id, session }) {
   const pathname = usePathname();
   const [isOpenWarning, setIsOpenWarning] = useState(false);
   const [isOpenWarning2, setIsOpenWarning2] = useState(false);
   const [isOpenWrite, setIsOpenWrite] = useState(false);

   const [isLarge, setIsLarge] = useState(false);

   useEffect(() => {
      const mediaQueryLarge = window.matchMedia('(max-width: 1024px)');

      setIsLarge(mediaQueryLarge.matches);
   }, [setIsLarge]);

   // Check if current item was ordered
   const userOrders = orders.filter(
      (order) => order.email === session?.user.email
   );
   const cart = userOrders.map((order) => JSON.parse(order.cart));
   const itemWasOrderedArrOfArr = cart.map((cart) =>
      cart.map((item) => item.itemId === id)
   );
   const itemWasOrderedArr = itemWasOrderedArrOfArr.map((item) =>
      item.includes(true)
   );
   const itemWasOrdered = itemWasOrderedArr.includes(true);

   // Check if current item was already reviewed
   const userReviews = reviews.filter(
      (review) => review.user_id === session?.user.id
   );
   const currentItemId = Number(pathname.slice(7));
   const wasReviewedArr = userReviews.map(
      (review) => review.item_id === currentItemId
   );
   const wasReviewed = wasReviewedArr.includes(true);

   function handleWriteReview() {
      if (!session) setIsOpenWarning(true);
      if (session && !itemWasOrdered) setIsOpenWarning(true);
      if (wasReviewed) setIsOpenWarning2(true);
      if (session && itemWasOrdered && !wasReviewed) setIsOpenWrite(true);
   }

   return (
      <div className="flex items-center justify-between gap-3 sm:gap-4">
         <FilterReviews />

         {isLarge ? (
            <button
               onClick={handleWriteReview}
               type="button"
               className="bg-primary-800 p-2 rounded-md text-xl 2xl:text-lg lg:text-2xl md:text-4xl xs:text-3xl text-primary-0 transition-custom md:p-3
               hover:bg-primary-900"
            >
               <GoPencil className="md:size-6.5" />
            </button>
         ) : (
            <button
               onClick={handleWriteReview}
               type="button"
               className={`bg-primary-800 px-6 py-1.5 rounded-md text-3xl 2xl:px-5 2xl:py-1 2xl:pb-0.5 lg:text-2xl md:text-4xl xs:text-3xl lg:py-1.5 md:py-3 md:mb-4 md:px-8 text-primary-0 transition-custom text-nowrap hover:bg-primary-900 ${italianno.className}`}
            >
               Write a review
            </button>
         )}

         {isOpenWarning && (
            <ModalWindow onClose={() => setIsOpenWarning(false)}>
               <ReviewWarning
                  onClose={() => setIsOpenWarning(false)}
                  type="review"
               />
            </ModalWindow>
         )}

         {isOpenWrite && (
            <ModalWindow onClose={() => setIsOpenWrite(false)}>
               <ReviewForm
                  onClose={() => setIsOpenWrite(false)}
                  session={session}
                  item_id={id}
               />
            </ModalWindow>
         )}

         {isOpenWarning2 && (
            <ModalWindow onClose={() => setIsOpenWarning2(false)}>
               <ReviewWarning
                  onClose={() => setIsOpenWarning2(false)}
                  type="alreadyReviewed"
               />
            </ModalWindow>
         )}
      </div>
   );
}

export default ReviewFilterAndWrite;
