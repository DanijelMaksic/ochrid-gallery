'use client';

import { useState } from 'react';

import { MdRateReview } from 'react-icons/md';

import ReviewForm from '@/src/ui/reviews/review-form';
import ReviewWarning from '@/src/ui/reviews/review-warning';
import ModalWindow from '@/src/ui/cart-components/modal-window';
import { Italianno } from 'next/font/google';

const italianno = Italianno({
   subsets: ['latin'],
   display: 'swap',
   weight: '400',
});

function NoReviewsFound({ session, item_id, orders }) {
   const [isOpenWarning, setIsOpenWarning] = useState(false);
   const [isOpenWrite, setIsOpenWrite] = useState(false);

   // Check if current item was ordered
   const userOrders = orders.filter(
      (order) => order.email === session?.user.email
   );
   const cart = userOrders.map((order) => JSON.parse(order.cart));
   const itemWasOrderedArrOfArr = cart.map((cart) =>
      cart.map((item) => item.itemId === item_id)
   );
   const itemWasOrderedArr = itemWasOrderedArrOfArr.map((item) =>
      item.includes(true)
   );
   const itemWasOrdered = itemWasOrderedArr.includes(true);

   function handleWriteReview() {
      if (session && itemWasOrdered) setIsOpenWrite(true);
      if (session && !itemWasOrdered) setIsOpenWarning(true);
      if (!session) setIsOpenWarning(true);
   }

   return (
      <div className="flex flex-col items-center justify-center bg-primary-50 border-2 text-center border-primary-500 rounded-md px-12 pb-8 pt-6">
         <MdRateReview className="size-20 2xl:size-15 lg:size-20 mb-2" />

         <h3 className="text-[1.65rem] 2xl:text-2xl font-semibold mb-2  md:mb-4">
            This product doesn&apos;t have any reviews yet
         </h3>

         <span className="mb-6 text-xl 2xl:text-lg lg:text-xl">
            Be first to write a review for this product
         </span>

         <button
            type="button"
            onClick={handleWriteReview}
            className={`bg-primary-900 rounded-md py-1.5 text-3xl 2xl:text-3xl lg:text-2xl md:text-4xl xs:text-3xl 2xl:px-6 2xl:py-2 px-6 text-primary-50 transition-custom hover:bg-primary-800 ${italianno.className}`}
         >
            Write a review
         </button>

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
                  item_id={item_id}
               />
            </ModalWindow>
         )}
      </div>
   );
}

export default NoReviewsFound;
